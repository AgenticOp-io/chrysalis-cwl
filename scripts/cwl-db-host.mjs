/**
 * Host for every engine CWL names.
 * SQLite runs in this process. Postgres, MySQL, MariaDB, SQL Server, and Oracle
 * open through their driver when that package is installed. Values stay parameters.
 */
import { DatabaseSync } from "node:sqlite";
import { CWL_DB_DRIVER, CWL_DB_ENGINES } from "./hub-ingest/cwl-db.mjs";
import {
  beginSql,
  compileDelete,
  compileInsert,
  compileSelect,
  compileUpdate,
  endSql,
  schemaSql,
} from "./cwl-db-sql.mjs";

/**
 * @param {string} [path]
 */
export function openCwlDatabase(path = ":memory:") {
  return openSqlite(path);
}

/**
 * @param {string} engine
 * @param {string} url
 */
export async function openCwlEngine(engine, url) {
  const name = String(engine ?? "").toLowerCase();
  if (!CWL_DB_ENGINES.includes(name)) throw new Error("cwl:unknown-db-engine");
  if (name === "sqlite") return openSqlite(!url || url === ":memory:" ? ":memory:" : url);
  if (!url) throw new Error("cwl:db-url");
  if (name === "postgres") return openPostgres(url);
  if (name === "mysql" || name === "mariadb") return openMysql(name, url);
  if (name === "sqlserver") return openSqlServer(url);
  return openOracle(url);
}

/**
 * @param {string} path
 */
function openSqlite(path) {
  const db = new DatabaseSync(path);
  return {
    engine: "sqlite",
    path,
    raw: db,
    exec(sql) {
      db.exec(sql);
    },
    all(sql, params) {
      return db.prepare(sql).all(...(params ?? []));
    },
    run(sql, params) {
      db.prepare(sql).run(...(params ?? []));
    },
    begin() {
      db.exec(beginSql("sqlite"));
    },
    commit() {
      db.exec(endSql("sqlite", "commit"));
    },
    rollback() {
      db.exec(endSql("sqlite", "rollback"));
    },
    close() {
      db.close();
    },
  };
}

/**
 * @param {string} specifier
 */
async function loadDriver(specifier) {
  try {
    return await import(specifier);
  } catch {
    throw new Error(`cwl:db-driver:${specifier}`);
  }
}

/**
 * @param {string} url
 */
async function openPostgres(url) {
  const mod = await loadDriver(CWL_DB_DRIVER.postgres);
  const Client = mod.default?.Client ?? mod.Client;
  const client = new Client({ connectionString: url });
  await client.connect();
  return {
    engine: "postgres",
    async exec(sql) {
      await client.query(sql);
    },
    async all(sql, params) {
      const result = await client.query(sql, params ?? []);
      return result.rows ?? [];
    },
    async run(sql, params) {
      await client.query(sql, params ?? []);
    },
    async begin() {
      await client.query(beginSql("postgres"));
    },
    async commit() {
      await client.query(endSql("postgres", "commit"));
    },
    async rollback() {
      await client.query(endSql("postgres", "rollback"));
    },
    close() {
      return client.end();
    },
  };
}

/**
 * @param {string} engine
 * @param {string} url
 */
async function openMysql(engine, url) {
  const mod = await loadDriver("mysql2/promise");
  const create = mod.createConnection ?? mod.default?.createConnection;
  const conn = await create(url);
  return {
    engine,
    async exec(sql) {
      await conn.query(sql);
    },
    async all(sql, params) {
      const [rows] = await conn.query(sql, params ?? []);
      return Array.isArray(rows) ? rows : [];
    },
    async run(sql, params) {
      await conn.query(sql, params ?? []);
    },
    async begin() {
      await conn.query(beginSql(engine));
    },
    async commit() {
      await conn.query(endSql("mysql", "commit"));
    },
    async rollback() {
      await conn.query(endSql("mysql", "rollback"));
    },
    close() {
      return conn.end();
    },
  };
}

/**
 * @param {string} url
 */
async function openSqlServer(url) {
  const mod = await loadDriver(CWL_DB_DRIVER.sqlserver);
  const sql = mod.default ?? mod;
  const pool = await sql.connect(url);
  const query = async (text, params = []) => {
    const request = pool.request();
    params.forEach((value, index) => {
      request.input(`p${index + 1}`, value);
    });
    return request.query(text);
  };
  return {
    engine: "sqlserver",
    async exec(text) {
      await query(text);
    },
    async all(text, params) {
      const result = await query(text, params ?? []);
      return result.recordset ?? [];
    },
    async run(text, params) {
      await query(text, params ?? []);
    },
    async begin() {
      await query(beginSql("sqlserver"));
    },
    async commit() {
      await query(endSql("sqlserver", "commit"));
    },
    async rollback() {
      await query(endSql("sqlserver", "rollback"));
    },
    close() {
      return pool.close();
    },
  };
}

/**
 * @param {string} url `user/password@host/service`
 */
async function openOracle(url) {
  const mod = await loadDriver(CWL_DB_DRIVER.oracle);
  const oracledb = mod.default ?? mod;
  const slash = url.indexOf("/");
  const at = url.indexOf("@");
  if (slash < 1 || at <= slash) throw new Error("cwl:db-url");
  const conn = await oracledb.getConnection({
    user: url.slice(0, slash),
    password: url.slice(slash + 1, at),
    connectString: url.slice(at + 1),
  });
  const query = async (sql, params = []) => {
    const result = await conn.execute(sql, params, { outFormat: oracledb.OUT_FORMAT_OBJECT });
    return result.rows ?? [];
  };
  return {
    engine: "oracle",
    async exec(sql) {
      try {
        await conn.execute(sql);
      } catch (error) {
        if (error && error.errorNum === 955) return;
        throw error;
      }
    },
    all: query,
    async run(sql, params) {
      await conn.execute(sql, params ?? [], { autoCommit: false });
    },
    async begin() {
      /* Oracle starts a transaction on the first write. */
    },
    async commit() {
      await conn.commit();
    },
    async rollback() {
      await conn.rollback();
    },
    close() {
      return conn.close();
    },
  };
}

/**
 * @param {object} database
 * @param {object[]} tables
 * @param {object[]} ops
 * @param {{ path?: Record<string, unknown>, query?: Record<string, unknown>, body?: Record<string, unknown> }} env
 * @param {Record<string, unknown>} data
 */
export async function applyCwlDb(database, tables, ops, env, data) {
  if (!ops?.length) return data;
  const engine = database.engine || "sqlite";
  const byName = new Map((tables ?? []).map((table) => [table.name, table]));
  for (const table of tables ?? []) {
    if (!table.columns?.length) continue;
    await database.exec(schemaSql(engine, table));
  }
  await database.begin();
  try {
    for (const op of ops) {
      const table = byName.get(op.table);
      if (!table) throw new Error("cwl:unknown-db-table");
      await runOp(database, engine, table, op, env, data);
    }
    await database.commit();
  } catch (error) {
    try {
      await database.rollback();
    } catch {
      /* the failed statement already closed the transaction */
    }
    throw error;
  }
  return data;
}

/**
 * @param {object} database
 * @param {string} engine
 * @param {object} table
 * @param {object} op
 * @param {object} env
 * @param {Record<string, unknown>} data
 */
async function runOp(database, engine, table, op, env, data) {
  if (op.op === "insert") {
    const compiled = compileInsert(engine, table, op, env, null);
    await database.run(compiled.sql, compiled.params);
    return;
  }
  if (op.op === "update") {
    const compiled = compileUpdate(engine, table, op, env, null);
    await database.run(compiled.sql, compiled.params);
    return;
  }
  if (op.op === "delete") {
    const compiled = compileDelete(engine, table, op, env, null);
    await database.run(compiled.sql, compiled.params);
    return;
  }
  if (op.into) {
    const parents = data[op.into.collection];
    if (!Array.isArray(parents)) return;
    for (const parent of parents) {
      if (parent == null || typeof parent !== "object") continue;
      const rows = await selectRows(database, engine, table, op, env, parent);
      parent[op.into.field] = op.column ? rows.map((row) => row[op.column]) : rows;
    }
    return;
  }
  const rows = await selectRows(database, engine, table, op, env, null);
  if (op.one) data[op.as] = rows[0] ?? null;
  else if (op.column) data[op.as] = rows.map((row) => row[op.column]);
  else data[op.as] = rows;
}

/**
 * @param {object} database
 * @param {string} engine
 * @param {object} table
 * @param {object} op
 * @param {object} env
 * @param {object | null} row
 */
async function selectRows(database, engine, table, op, env, row) {
  const compiled = compileSelect(engine, table, op, env, row);
  const found = await database.all(compiled.sql, compiled.params);
  return found.map((item) => readRow(table, item));
}

/**
 * @param {object} table
 * @param {object} row
 */
function readRow(table, row) {
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const [key, value] of Object.entries(row)) {
    const type = table.columns.find((col) => col.name === key)?.type ?? "text";
    if (type === "bool") out[key] = value === 1 || value === true;
    else out[key] = value === undefined ? null : value;
  }
  return out;
}

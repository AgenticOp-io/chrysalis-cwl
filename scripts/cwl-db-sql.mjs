/**
 * Bound SQL for each engine CWL names.
 * Identifiers come from the table declaration. Values are parameters.
 */
import { CWL_DB_ENGINES } from "./hub-ingest/cwl-db.mjs";

export { CWL_DB_ENGINES };

/**
 * @param {string} engine
 * @param {string} name
 */
export function quoteIdent(engine, name) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw new Error("cwl:db-ident");
  if (engine === "mysql" || engine === "mariadb") return `\`${name}\``;
  if (engine === "sqlserver") return `[${name}]`;
  return `"${name}"`;
}

/**
 * @param {string} engine
 * @param {number} index zero-based
 */
export function placeholder(engine, index) {
  const n = index + 1;
  if (engine === "postgres") return `$${n}`;
  if (engine === "sqlserver") return `@p${n}`;
  if (engine === "oracle") return `:${n}`;
  return "?";
}

/**
 * @param {string} engine
 * @param {string} type
 */
export function columnSqlType(engine, type) {
  if (type === "bool") {
    if (engine === "postgres") return "BOOLEAN";
    if (engine === "sqlserver") return "BIT";
    if (engine === "oracle") return "NUMBER(1)";
    if (engine === "mysql" || engine === "mariadb") return "TINYINT(1)";
    return "INTEGER";
  }
  if (type === "int") {
    if (engine === "oracle") return "NUMBER(10)";
    return "INTEGER";
  }
  if (type === "real") {
    if (engine === "postgres") return "DOUBLE PRECISION";
    if (engine === "sqlserver") return "FLOAT";
    if (engine === "oracle") return "BINARY_DOUBLE";
    if (engine === "mysql" || engine === "mariadb") return "DOUBLE";
    return "REAL";
  }
  if (engine === "sqlserver") return "NVARCHAR(MAX)";
  if (engine === "oracle") return "VARCHAR2(4000)";
  if (engine === "mysql" || engine === "mariadb") return "TEXT";
  return "TEXT";
}

/**
 * @param {string} engine
 * @param {{ name: string, columns: { name: string, type: string, key: boolean }[] }} table
 */
export function schemaSql(engine, table) {
  const cols = table.columns
    .map((col) => {
      const key = col.key ? " PRIMARY KEY" : "";
      return `${quoteIdent(engine, col.name)} ${columnSqlType(engine, col.type)}${key}`;
    })
    .join(", ");
  const name = quoteIdent(engine, table.name);
  const body = `${name} (${cols})`;
  if (engine === "sqlserver") {
    return `IF OBJECT_ID(N'${table.name}', N'U') IS NULL CREATE TABLE ${body}`;
  }
  if (engine === "oracle") return `CREATE TABLE ${body}`;
  return `CREATE TABLE IF NOT EXISTS ${body}`;
}

/**
 * @param {string} engine
 */
export function beginSql(engine) {
  if (engine === "mysql" || engine === "mariadb") return "START TRANSACTION";
  if (engine === "sqlserver") return "BEGIN TRANSACTION";
  return "BEGIN";
}

/**
 * @param {string} engine
 * @param {"commit" | "rollback"} kind
 */
export function endSql(engine, kind) {
  if (engine === "sqlserver") return kind === "commit" ? "COMMIT TRANSACTION" : "ROLLBACK TRANSACTION";
  return kind === "commit" ? "COMMIT" : "ROLLBACK";
}

/**
 * @param {unknown} raw
 */
function boolBit(raw) {
  if (raw === true || raw === 1 || raw === "1" || raw === "true") return 1;
  if (raw === false || raw === 0 || raw === "0" || raw === "false" || raw === "" || raw == null) return 0;
  return 0;
}

/**
 * @param {string} engine
 * @param {string} type
 * @param {object} value
 * @param {{ path?: Record<string, unknown>, query?: Record<string, unknown>, body?: Record<string, unknown> }} env
 * @param {object | null} row
 */
export function bindValue(engine, type, value, env, row) {
  let raw = null;
  if (value.kind === "literal") raw = value.value;
  else if (value.kind === "binding") raw = env[value.source]?.[value.name] ?? null;
  else if (value.kind === "row") raw = row?.[value.field] ?? null;
  if (type === "bool") {
    const bit = boolBit(raw);
    if (engine === "postgres") return bit === 1;
    return bit;
  }
  if (raw === true) return 1;
  if (raw === false) return 0;
  return raw ?? null;
}

/**
 * @param {object} table
 * @param {string} name
 */
function columnType(table, name) {
  return table.columns.find((col) => col.name === name)?.type ?? "text";
}

/**
 * @param {string} engine
 * @param {object} table
 * @param {object} op
 * @param {object} env
 * @param {object | null} row
 * @param {unknown[]} params
 */
function whereSql(engine, table, op, env, row, params) {
  if (!op.where?.length) return "";
  const join = op.join === "||" ? " OR " : " AND ";
  const parts = op.where.map((part) => {
    params.push(bindValue(engine, columnType(table, part.column), part.value, env, row));
    return `${quoteIdent(engine, part.column)} ${part.cmp === "!=" ? "<>" : "="} ${placeholder(engine, params.length - 1)}`;
  });
  return ` WHERE ${parts.join(join)}`;
}

/**
 * @param {string} engine
 * @param {object} table
 * @param {object} op
 * @param {object} env
 * @param {object | null} row
 */
export function compileInsert(engine, table, op, env, row) {
  /** @type {unknown[]} */
  const params = [];
  const cols = [];
  const marks = [];
  for (const field of op.fields) {
    params.push(bindValue(engine, columnType(table, field.column), field.value, env, row));
    cols.push(quoteIdent(engine, field.column));
    marks.push(placeholder(engine, params.length - 1));
  }
  return {
    sql: `INSERT INTO ${quoteIdent(engine, table.name)} (${cols.join(", ")}) VALUES (${marks.join(", ")})`,
    params,
  };
}

/**
 * @param {string} engine
 * @param {object} table
 * @param {object} op
 * @param {object} env
 * @param {object | null} row
 */
export function compileUpdate(engine, table, op, env, row) {
  /** @type {unknown[]} */
  const params = [];
  const sets = op.fields.map((field) => {
    params.push(bindValue(engine, columnType(table, field.column), field.value, env, row));
    return `${quoteIdent(engine, field.column)} = ${placeholder(engine, params.length - 1)}`;
  });
  const where = whereSql(engine, table, op, env, row, params);
  return {
    sql: `UPDATE ${quoteIdent(engine, table.name)} SET ${sets.join(", ")}${where}`,
    params,
  };
}

/**
 * @param {string} engine
 * @param {object} table
 * @param {object} op
 * @param {object} env
 * @param {object | null} row
 */
export function compileDelete(engine, table, op, env, row) {
  /** @type {unknown[]} */
  const params = [];
  const where = whereSql(engine, table, op, env, row, params);
  return {
    sql: `DELETE FROM ${quoteIdent(engine, table.name)}${where}`,
    params,
  };
}

/**
 * @param {string} engine
 * @param {object} table
 * @param {object} op
 * @param {object} env
 * @param {object | null} row
 */
export function compileSelect(engine, table, op, env, row) {
  /** @type {unknown[]} */
  const params = [];
  const cols = op.column
    ? quoteIdent(engine, op.column)
    : table.columns.map((col) => quoteIdent(engine, col.name)).join(", ");
  const where = whereSql(engine, table, op, env, row, params);
  if (engine === "sqlserver" && op.one) {
    return {
      sql: `SELECT TOP 1 ${cols} FROM ${quoteIdent(engine, table.name)}${where}`,
      params,
    };
  }
  const limit = op.one ? (engine === "oracle" ? " FETCH FIRST 1 ROWS ONLY" : " LIMIT 1") : "";
  return {
    sql: `SELECT ${cols} FROM ${quoteIdent(engine, table.name)}${where}${limit}`,
    params,
  };
}

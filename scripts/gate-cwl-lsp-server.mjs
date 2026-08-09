#!/usr/bin/env node
/**
 * Smoke: stdio LSP initialize + didOpen diagnostics on a language gold.
 * Speaks Content-Length JSON-RPC with scripts/cwl-lsp-server.mjs.
 */
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { hoverAt, completionsAt, definitionAt, documentSymbols, renameAt, prepareRenameAt } from "./cwl-lsp-server.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SERVER = join(ROOT, "scripts/cwl-lsp-server.mjs");
const GOLD = join(ROOT, "fixtures/language-gold/11-holes/routes.cwl");
const LITERALS = join(ROOT, "fixtures/language-gold/01-literals/routes.cwl");

/**
 * @param {import('node:child_process').ChildProcessWithoutNullStreams} child
 */
function makeClient(child) {
  let buf = Buffer.alloc(0);
  /** @type {Map<number, { resolve: (v: any) => void, reject: (e: Error) => void }>} */
  const pending = new Map();
  /** @type {Array<any>} */
  const notifications = [];
  let nextId = 1;

  child.stdout.on("data", (chunk) => {
    buf = Buffer.concat([buf, chunk]);
    while (true) {
      const headerEnd = buf.indexOf("\r\n\r\n");
      if (headerEnd < 0) return;
      const header = buf.slice(0, headerEnd).toString("utf8");
      const m = /Content-Length:\s*(\d+)/i.exec(header);
      if (!m) {
        buf = buf.slice(headerEnd + 4);
        continue;
      }
      const length = Number(m[1]);
      const total = headerEnd + 4 + length;
      if (buf.length < total) return;
      const body = buf.slice(headerEnd + 4, total).toString("utf8");
      buf = buf.slice(total);
      let msg;
      try {
        msg = JSON.parse(body);
      } catch {
        continue;
      }
      if (msg.id !== undefined && (msg.result !== undefined || msg.error !== undefined)) {
        const p = pending.get(msg.id);
        if (p) {
          pending.delete(msg.id);
          if (msg.error) p.reject(new Error(JSON.stringify(msg.error)));
          else p.resolve(msg.result);
        }
      } else if (msg.method) {
        notifications.push(msg);
      }
    }
  });

  /**
   * @param {unknown} msg
   */
  function write(msg) {
    const body = Buffer.from(JSON.stringify(msg), "utf8");
    child.stdin.write(`Content-Length: ${body.length}\r\n\r\n`);
    child.stdin.write(body);
  }

  /**
   * @param {string} method
   * @param {unknown} [params]
   */
  function request(method, params) {
    const id = nextId++;
    return new Promise((resolvePromise, reject) => {
      pending.set(id, { resolve: resolvePromise, reject });
      write({ jsonrpc: "2.0", id, method, params });
      setTimeout(() => {
        if (pending.has(id)) {
          pending.delete(id);
          reject(new Error(`timeout waiting for ${method}`));
        }
      }, 8000);
    });
  }

  /**
   * @param {string} method
   * @param {unknown} [params]
   */
  function notify(method, params) {
    write({ jsonrpc: "2.0", method, params });
  }

  /**
   * @param {string} method
   * @param {number} [ms]
   */
  async function waitNotify(method, ms = 5000) {
    const start = Date.now();
    while (Date.now() - start < ms) {
      const idx = notifications.findIndex((n) => n.method === method);
      if (idx >= 0) {
        const [n] = notifications.splice(idx, 1);
        return n;
      }
      await new Promise((r) => setTimeout(r, 20));
    }
    throw new Error(`timeout waiting for notification ${method}`);
  }

  return { request, notify, waitNotify, notifications };
}

async function main() {
  /** @type {string[]} */
  const failures = [];

  const holesSrc = await readFile(GOLD, "utf8");
  const litSrc = await readFile(LITERALS, "utf8");

  // Unit: hover helper (no process)
  const hoverMod = hoverAt(litSrc, pathToFileURL(LITERALS).href, { line: 1, character: 0 });
  if (!hoverMod?.contents?.value?.includes("module")) {
    failures.push("hover-module");
  }
  const hoverRoute = hoverAt(litSrc, pathToFileURL(LITERALS).href, { line: 3, character: 0 });
  if (!hoverRoute?.contents?.value?.includes("@route")) {
    failures.push("hover-route");
  }

  // Unit: completion helper (no process) — empty prefix yields catalog
  const compEmpty = completionsAt("", { line: 0, character: 0 });
  if (!Array.isArray(compEmpty) || compEmpty.length < 1) {
    failures.push("completion-empty-prefix");
  }
  const compAt = completionsAt("@", { line: 0, character: 1 });
  if (!Array.isArray(compAt) || !compAt.some((i) => i.label === "@route")) {
    failures.push("completion-at-route");
  }

  // Unit: definition — handler name / path string → @route line (01-literals)
  const litUri = pathToFileURL(LITERALS).href;
  // `handler health` is line 4 (0-based); cursor on "health"
  const defByName = definitionAt(litSrc, litUri, { line: 4, character: 10 });
  if (!Array.isArray(defByName) || defByName.length < 1) {
    failures.push("definition-handler-name");
  } else if (defByName[0].range?.start?.line !== 3) {
    // @route GET "/health" is line 4 (1-based) → LSP line 3
    failures.push("definition-handler-name-wrong-line");
  }
  // path string on @route line
  const defByPath = definitionAt(litSrc, litUri, { line: 3, character: 14 });
  if (!Array.isArray(defByPath) || defByPath.length < 1) {
    failures.push("definition-path-string");
  }

  // Unit: documentSymbol ≥1 on 01-literals
  const syms = documentSymbols(litSrc, litUri);
  if (!Array.isArray(syms) || syms.length < 1) {
    failures.push("documentSymbol-empty");
  }

  // Unit: rename — handler name declaration on 01-literals → ≥1 edit
  const prep = prepareRenameAt(litSrc, litUri, { line: 4, character: 10 });
  if (!prep?.range || prep.placeholder !== "health") {
    failures.push("prepareRename-handler-name");
  }
  const ren = renameAt(litSrc, litUri, { line: 4, character: 10 }, "healthz");
  const renEdits = ren?.changes?.[litUri] ?? [];
  if (!Array.isArray(renEdits) || renEdits.length < 1) {
    failures.push("rename-handler-empty");
  } else if (renEdits[0].newText !== "healthz") {
    failures.push("rename-handler-wrong-text");
  }

  const child = spawn(process.execPath, [SERVER], {
    cwd: ROOT,
    stdio: ["pipe", "pipe", "pipe"],
  });
  let stderr = "";
  child.stderr.on("data", (d) => {
    stderr += d.toString();
  });

  const client = makeClient(child);

  try {
    const init = await client.request("initialize", {
      processId: process.pid,
      rootUri: pathToFileURL(ROOT).href,
      capabilities: {},
      clientInfo: { name: "gate-cwl-lsp-server", version: "0.1.13" },
    });
    if (!init?.capabilities?.textDocumentSync) {
      failures.push("missing-textDocumentSync");
    }
    if (!init?.capabilities?.documentFormattingProvider) {
      failures.push("missing-formatting");
    }
    if (!init?.capabilities?.completionProvider) {
      failures.push("missing-completionProvider");
    }
    if (!init?.capabilities?.hoverProvider) {
      failures.push("missing-hoverProvider");
    }
    if (!init?.capabilities?.definitionProvider) {
      failures.push("missing-definitionProvider");
    }
    if (!init?.capabilities?.documentSymbolProvider) {
      failures.push("missing-documentSymbolProvider");
    }
    if (!init?.capabilities?.renameProvider) {
      failures.push("missing-renameProvider");
    }
    if (!init?.serverInfo?.name) {
      failures.push("missing-serverInfo");
    }

    client.notify("initialized", {});

    const uri = pathToFileURL(GOLD).href;
    client.notify("textDocument/didOpen", {
      textDocument: {
        uri,
        languageId: "cwl",
        version: 1,
        text: holesSrc,
      },
    });

    const pub = await client.waitNotify("textDocument/publishDiagnostics");
    const diags = pub.params?.diagnostics ?? [];
    if (!Array.isArray(diags) || diags.length < 1) {
      failures.push("expected-diagnostics-on-holes-gold");
    } else {
      const d0 = diags[0];
      if (typeof d0.severity !== "number") failures.push("diag-severity-not-number");
      if (!d0.range?.start || typeof d0.range.start.line !== "number") {
        failures.push("diag-bad-range");
      }
      if (!d0.message) failures.push("diag-empty-message");
    }

    const completion = await client.request("textDocument/completion", {
      textDocument: { uri },
      position: { line: 0, character: 0 },
    });
    const items = Array.isArray(completion)
      ? completion
      : Array.isArray(completion?.items)
        ? completion.items
        : [];
    if (items.length < 1) {
      failures.push("completion-empty");
    }

    // RPC: definition + documentSymbol on 01-literals (prove ≥1 location / symbol)
    const litUriRpc = pathToFileURL(LITERALS).href;
    client.notify("textDocument/didOpen", {
      textDocument: {
        uri: litUriRpc,
        languageId: "cwl",
        version: 1,
        text: litSrc,
      },
    });
    await client.waitNotify("textDocument/publishDiagnostics");

    const defRpc = await client.request("textDocument/definition", {
      textDocument: { uri: litUriRpc },
      position: { line: 4, character: 10 },
    });
    const defLocs = Array.isArray(defRpc) ? defRpc : defRpc ? [defRpc] : [];
    if (defLocs.length < 1) {
      failures.push("rpc-definition-empty");
    }

    const symRpc = await client.request("textDocument/documentSymbol", {
      textDocument: { uri: litUriRpc },
    });
    if (!Array.isArray(symRpc) || symRpc.length < 1) {
      failures.push("rpc-documentSymbol-empty");
    }

    const renameRpc = await client.request("textDocument/rename", {
      textDocument: { uri: litUriRpc },
      position: { line: 4, character: 10 },
      newName: "healthz",
    });
    const renameEdits =
      renameRpc?.changes?.[litUriRpc] ??
      renameRpc?.documentChanges?.flatMap((c) => c.edits ?? []) ??
      [];
    if (!Array.isArray(renameEdits) || renameEdits.length < 1) {
      failures.push("rpc-rename-empty");
    }

    await client.request("shutdown", null);
    client.notify("exit");

    await new Promise((r) => {
      child.on("close", r);
      setTimeout(r, 2000);
    });
  } catch (e) {
    failures.push(`rpc:${e instanceof Error ? e.message : String(e)}`);
    try {
      child.kill();
    } catch {
      /* ignore */
    }
  }

  const ok = failures.length === 0;
  const report = {
    kind: "chrysalis.cwl.lsp-server.gate",
    schemaVersion: 1,
    ok,
    token: ok ? "CWL_LSP_SERVER_OK" : "CWL_LSP_SERVER_FAIL",
    gold: GOLD,
    failures,
    stderrTail: stderr.slice(-400),
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (ok) process.stdout.write("CWL_LSP_SERVER_OK\n");
  process.exit(ok ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

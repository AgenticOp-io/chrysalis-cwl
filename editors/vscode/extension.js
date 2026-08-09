/**
 * CWL editor: TextMate + thin stdio LSP client (zero npm deps).
 * Spawns pillar `scripts/cwl-lsp-server.mjs` — see docs/language/CWL-LSP.md.
 */
const vscode = require("vscode");
const { spawn } = require("child_process");
const path = require("path");

/** @returns {string} */
function pillarRoot() {
  return path.resolve(__dirname, "../..");
}

/**
 * Minimal LSP client over Content-Length framed stdio.
 */
class ThinLspClient {
  /**
   * @param {string} serverPath
   * @param {string} cwd
   */
  constructor(serverPath, cwd) {
    this._nextId = 1;
    /** @type {Map<number, { resolve: (v: any) => void, reject: (e: Error) => void }>} */
    this._pending = new Map();
    /** @type {((method: string, params: any) => void)[]} */
    this._handlers = [];
    this._buf = Buffer.alloc(0);
    this._child = spawn(process.execPath, [serverPath], {
      cwd,
      stdio: ["pipe", "pipe", "pipe"],
    });
    this._child.stdout.on("data", (chunk) => this._onData(chunk));
    this._child.stderr.on("data", (d) => {
      // Keep quiet unless debugging; surface parse failures via diagnostics.
      if (process.env.CWL_LSP_DEBUG) console.error(String(d));
    });
    this._child.on("exit", (code) => {
      if (process.env.CWL_LSP_DEBUG) console.error(`cwl-lsp-server exited ${code}`);
    });
  }

  /**
   * @param {(method: string, params: any) => void} fn
   */
  onNotification(fn) {
    this._handlers.push(fn);
  }

  /**
   * @param {Buffer} chunk
   */
  _onData(chunk) {
    this._buf = Buffer.concat([this._buf, chunk]);
    while (true) {
      const headerEnd = this._buf.indexOf("\r\n\r\n");
      if (headerEnd < 0) return;
      const header = this._buf.slice(0, headerEnd).toString("utf8");
      const m = /Content-Length:\s*(\d+)/i.exec(header);
      if (!m) {
        this._buf = this._buf.slice(headerEnd + 4);
        continue;
      }
      const length = Number(m[1]);
      const total = headerEnd + 4 + length;
      if (this._buf.length < total) return;
      const body = this._buf.slice(headerEnd + 4, total).toString("utf8");
      this._buf = this._buf.slice(total);
      let msg;
      try {
        msg = JSON.parse(body);
      } catch {
        continue;
      }
      if (msg.id !== undefined && (msg.result !== undefined || msg.error !== undefined)) {
        const p = this._pending.get(msg.id);
        if (p) {
          this._pending.delete(msg.id);
          if (msg.error) p.reject(new Error(msg.error.message || JSON.stringify(msg.error)));
          else p.resolve(msg.result);
        }
      } else if (msg.method) {
        for (const h of this._handlers) h(msg.method, msg.params);
      }
    }
  }

  /**
   * @param {unknown} msg
   */
  _write(msg) {
    const body = Buffer.from(JSON.stringify(msg), "utf8");
    this._child.stdin.write(`Content-Length: ${body.length}\r\n\r\n`);
    this._child.stdin.write(body);
  }

  /**
   * @param {string} method
   * @param {unknown} [params]
   */
  request(method, params) {
    const id = this._nextId++;
    return new Promise((resolvePromise, reject) => {
      this._pending.set(id, { resolve: resolvePromise, reject });
      this._write({ jsonrpc: "2.0", id, method, params });
      setTimeout(() => {
        if (this._pending.has(id)) {
          this._pending.delete(id);
          reject(new Error(`LSP timeout: ${method}`));
        }
      }, 15000);
    });
  }

  /**
   * @param {string} method
   * @param {unknown} [params]
   */
  notify(method, params) {
    this._write({ jsonrpc: "2.0", method, params });
  }

  async dispose() {
    try {
      await this.request("shutdown", null);
      this.notify("exit");
    } catch {
      /* ignore */
    }
    try {
      this._child.kill();
    } catch {
      /* ignore */
    }
  }
}

/**
 * @param {number} severity
 * @returns {vscode.DiagnosticSeverity}
 */
function toVsSeverity(severity) {
  if (severity === 1) return vscode.DiagnosticSeverity.Error;
  if (severity === 2) return vscode.DiagnosticSeverity.Warning;
  if (severity === 4) return vscode.DiagnosticSeverity.Hint;
  return vscode.DiagnosticSeverity.Information;
}

/**
 * @param {import('vscode').ExtensionContext} context
 */
async function activate(context) {
  const collection = vscode.languages.createDiagnosticCollection("cwl");
  context.subscriptions.push(collection);

  const serverPath = path.join(pillarRoot(), "scripts/cwl-lsp-server.mjs");
  const client = new ThinLspClient(serverPath, pillarRoot());
  context.subscriptions.push({ dispose: () => client.dispose() });

  client.onNotification((method, params) => {
    if (method !== "textDocument/publishDiagnostics") return;
    const uri = vscode.Uri.parse(params.uri);
    /** @type {vscode.Diagnostic[]} */
    const diags = [];
    for (const d of params.diagnostics ?? []) {
      const start = d.range?.start ?? { line: 0, character: 0 };
      const end = d.range?.end ?? { line: start.line, character: 1000 };
      const vs = new vscode.Diagnostic(
        new vscode.Range(start.line, start.character, end.line, Math.min(end.character, 1000)),
        d.message,
        toVsSeverity(d.severity),
      );
      vs.code = d.code;
      vs.source = d.source || "cwl";
      diags.push(vs);
    }
    collection.set(uri, diags);
  });

  await client.request("initialize", {
    processId: process.pid,
    rootUri: vscode.workspace.workspaceFolders?.[0]?.uri?.toString() ?? null,
    capabilities: {
      textDocument: {
        publishDiagnostics: {},
        hover: { contentFormat: ["markdown", "plaintext"] },
        formatting: {},
        completion: { completionItem: { snippetSupport: false } },
        definition: {},
        documentSymbol: {},
        rename: { prepareSupport: true },
      },
    },
    clientInfo: { name: "cwl-vscode", version: "0.1.13" },
  });
  client.notify("initialized", {});

  /**
   * @param {import('vscode').TextDocument} doc
   */
  function openDoc(doc) {
    if (doc.languageId !== "cwl") return;
    client.notify("textDocument/didOpen", {
      textDocument: {
        uri: doc.uri.toString(),
        languageId: "cwl",
        version: doc.version,
        text: doc.getText(),
      },
    });
  }

  /** @type {NodeJS.Timeout|undefined} */
  let debounce;
  /**
   * @param {import('vscode').TextDocument} doc
   */
  function changeDoc(doc) {
    if (doc.languageId !== "cwl") return;
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      client.notify("textDocument/didChange", {
        textDocument: { uri: doc.uri.toString(), version: doc.version },
        contentChanges: [{ text: doc.getText() }],
      });
    }, 250);
  }

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(openDoc),
    vscode.workspace.onDidChangeTextDocument((e) => changeDoc(e.document)),
    vscode.workspace.onDidCloseTextDocument((doc) => {
      if (doc.languageId !== "cwl") return;
      client.notify("textDocument/didClose", {
        textDocument: { uri: doc.uri.toString() },
      });
      collection.delete(doc.uri);
    }),
  );

  for (const doc of vscode.workspace.textDocuments) openDoc(doc);

  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      { language: "cwl" },
      {
        async provideDocumentFormattingEdits(doc) {
          if (doc.languageId !== "cwl") return [];
          // Ensure server has latest buffer
          client.notify("textDocument/didChange", {
            textDocument: { uri: doc.uri.toString(), version: doc.version },
            contentChanges: [{ text: doc.getText() }],
          });
          try {
            const edits = await client.request("textDocument/formatting", {
              textDocument: { uri: doc.uri.toString() },
              options: { tabSize: 2, insertSpaces: true },
            });
            return (edits ?? []).map(
              (e) =>
                new vscode.TextEdit(
                  new vscode.Range(
                    e.range.start.line,
                    e.range.start.character,
                    e.range.end.line,
                    e.range.end.character,
                  ),
                  e.newText,
                ),
            );
          } catch (err) {
            vscode.window.showErrorMessage(`CWL fmt failed: ${err.message || err}`);
            return [];
          }
        },
      },
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      { language: "cwl" },
      {
        async provideHover(doc, position) {
          if (doc.languageId !== "cwl") return null;
          try {
            const result = await client.request("textDocument/hover", {
              textDocument: { uri: doc.uri.toString() },
              position: { line: position.line, character: position.character },
            });
            if (!result?.contents) return null;
            const value =
              typeof result.contents === "string"
                ? result.contents
                : result.contents.value || "";
            const md = new vscode.MarkdownString(value);
            md.isTrusted = false;
            if (result.range) {
              return new vscode.Hover(
                md,
                new vscode.Range(
                  result.range.start.line,
                  result.range.start.character,
                  result.range.end.line,
                  result.range.end.character,
                ),
              );
            }
            return new vscode.Hover(md);
          } catch {
            return null;
          }
        },
      },
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { language: "cwl" },
      {
        async provideCompletionItems(doc, position) {
          if (doc.languageId !== "cwl") return [];
          try {
            const result = await client.request("textDocument/completion", {
              textDocument: { uri: doc.uri.toString() },
              position: { line: position.line, character: position.character },
            });
            const items = Array.isArray(result)
              ? result
              : Array.isArray(result?.items)
                ? result.items
                : [];
            return items.map((item) => {
              const ci = new vscode.CompletionItem(
                item.label,
                item.kind === 14
                  ? vscode.CompletionItemKind.Keyword
                  : vscode.CompletionItemKind.Text,
              );
              if (item.detail) ci.detail = item.detail;
              if (item.insertText) ci.insertText = item.insertText;
              return ci;
            });
          } catch {
            return [];
          }
        },
      },
      "@",
      ".",
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      { language: "cwl" },
      {
        async provideDefinition(doc, position) {
          if (doc.languageId !== "cwl") return null;
          try {
            const result = await client.request("textDocument/definition", {
              textDocument: { uri: doc.uri.toString() },
              position: { line: position.line, character: position.character },
            });
            const locs = Array.isArray(result) ? result : result ? [result] : [];
            if (locs.length < 1) return null;
            return locs.map(
              (loc) =>
                new vscode.Location(
                  vscode.Uri.parse(loc.uri),
                  new vscode.Range(
                    loc.range.start.line,
                    loc.range.start.character,
                    loc.range.end.line,
                    loc.range.end.character,
                  ),
                ),
            );
          } catch {
            return null;
          }
        },
      },
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerDocumentSymbolProvider(
      { language: "cwl" },
      {
        async provideDocumentSymbols(doc) {
          if (doc.languageId !== "cwl") return [];
          try {
            const result = await client.request("textDocument/documentSymbol", {
              textDocument: { uri: doc.uri.toString() },
            });
            if (!Array.isArray(result)) return [];
            return result.map((s) => {
              const range = new vscode.Range(
                s.range.start.line,
                s.range.start.character,
                s.range.end.line,
                s.range.end.character,
              );
              const sel = s.selectionRange
                ? new vscode.Range(
                    s.selectionRange.start.line,
                    s.selectionRange.start.character,
                    s.selectionRange.end.line,
                    s.selectionRange.end.character,
                  )
                : range;
              return new vscode.DocumentSymbol(
                s.name,
                s.detail || "",
                vscode.SymbolKind.Function,
                range,
                sel,
              );
            });
          } catch {
            return [];
          }
        },
      },
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerRenameProvider(
      { language: "cwl" },
      {
        async prepareRename(doc, position) {
          if (doc.languageId !== "cwl") throw new Error("not a CWL handler name");
          try {
            const result = await client.request("textDocument/prepareRename", {
              textDocument: { uri: doc.uri.toString() },
              position: { line: position.line, character: position.character },
            });
            if (!result?.range) throw new Error("not a renamable handler name");
            return {
              range: new vscode.Range(
                result.range.start.line,
                result.range.start.character,
                result.range.end.line,
                result.range.end.character,
              ),
              placeholder: result.placeholder || doc.getText(
                new vscode.Range(
                  result.range.start.line,
                  result.range.start.character,
                  result.range.end.line,
                  result.range.end.character,
                ),
              ),
            };
          } catch (err) {
            throw err instanceof Error ? err : new Error(String(err));
          }
        },
        async provideRenameEdits(doc, position, newName) {
          if (doc.languageId !== "cwl") return null;
          try {
            const result = await client.request("textDocument/rename", {
              textDocument: { uri: doc.uri.toString() },
              position: { line: position.line, character: position.character },
              newName,
            });
            const uriKey = doc.uri.toString();
            const edits = result?.changes?.[uriKey] ?? [];
            if (!Array.isArray(edits) || edits.length < 1) return null;
            const we = new vscode.WorkspaceEdit();
            for (const e of edits) {
              we.replace(
                doc.uri,
                new vscode.Range(
                  e.range.start.line,
                  e.range.start.character,
                  e.range.end.line,
                  e.range.end.character,
                ),
                e.newText,
              );
            }
            return we;
          } catch {
            return null;
          }
        },
      },
    ),
  );

  const cmd = vscode.commands.registerCommand("cwl.checkActive", async () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed || ed.document.languageId !== "cwl") {
      vscode.window.showWarningMessage("Open a .cwl file first.");
      return;
    }
    await ed.document.save();
    const file = ed.document.uri.fsPath;
    const cli = path.join(pillarRoot(), "scripts/cwl-cli.mjs");
    const { spawn: sp } = require("child_process");
    await new Promise((resolvePromise) => {
      const child = sp(process.execPath, [cli, "check", file], { cwd: pillarRoot() });
      let stdout = "";
      let stderr = "";
      child.stdout.on("data", (d) => {
        stdout += d;
      });
      child.stderr.on("data", (d) => {
        stderr += d;
      });
      child.on("close", (code) => {
        if (code === 0) {
          vscode.window.showInformationMessage(`CWL check OK: ${path.basename(file)}`);
        } else {
          vscode.window.showErrorMessage(`CWL check failed (${code}). See output.`);
          const ch = vscode.window.createOutputChannel("CWL");
          ch.appendLine(stdout);
          ch.appendLine(stderr);
          ch.show(true);
        }
        resolvePromise(undefined);
      });
    });
    changeDoc(ed.document);
  });
  context.subscriptions.push(cmd);
}

function deactivate() {}

module.exports = { activate, deactivate };

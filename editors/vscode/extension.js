/**
 * CWL editor: TextMate + push diagnostics (diagnose map) + format (cwl fmt).
 * Full stdio Language Server is a later slice — see docs/language/CWL-LSP.md.
 */
const vscode = require("vscode");
const { spawn } = require("child_process");
const path = require("path");

/** @returns {string} */
function pillarRoot() {
  return path.resolve(__dirname, "../..");
}

/**
 * @param {string[]} args
 * @param {{ input?: string, cwd?: string }} [opts]
 * @returns {Promise<{ code: number|null, stdout: string, stderr: string }>}
 */
function runNode(args, opts = {}) {
  return new Promise((resolvePromise) => {
    const child = spawn(process.execPath, args, {
      cwd: opts.cwd || pillarRoot(),
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => {
      stdout += d.toString();
    });
    child.stderr.on("data", (d) => {
      stderr += d.toString();
    });
    if (opts.input != null) {
      child.stdin.write(opts.input);
      child.stdin.end();
    }
    child.on("close", (code) => resolvePromise({ code, stdout, stderr }));
  });
}

/**
 * @param {string} severity
 * @returns {vscode.DiagnosticSeverity}
 */
function toVsSeverity(severity) {
  if (severity === "Error") return vscode.DiagnosticSeverity.Error;
  if (severity === "Warning") return vscode.DiagnosticSeverity.Warning;
  if (severity === "Hint") return vscode.DiagnosticSeverity.Hint;
  return vscode.DiagnosticSeverity.Information;
}

/**
 * @param {import('vscode').ExtensionContext} context
 */
function activate(context) {
  const collection = vscode.languages.createDiagnosticCollection("cwl");
  context.subscriptions.push(collection);

  const cli = path.join(pillarRoot(), "scripts/cwl-cli.mjs");
  /** @type {NodeJS.Timeout|undefined} */
  let debounce;

  /**
   * @param {import('vscode').TextDocument} doc
   */
  async function refreshDiagnostics(doc) {
    if (doc.languageId !== "cwl") return;
    const uri = doc.uri.toString();
    const result = await runNode([cli, "diagnose", "--stdin", "--lsp", "--name", doc.uri.fsPath], {
      input: doc.getText(),
    });
    let report;
    try {
      report = JSON.parse(result.stdout);
    } catch {
      collection.set(doc.uri, [
        new vscode.Diagnostic(
          new vscode.Range(0, 0, 0, 1),
          `CWL diagnose failed to parse JSON (${result.code}). ${result.stderr || result.stdout}`.trim(),
          vscode.DiagnosticSeverity.Error,
        ),
      ]);
      return;
    }
    const mapped = report.diagnostics ?? report.raw?.diagnostics ?? [];
    // Prefer lsp-map when CLI returns mapped shape; else map client-side from diagnose
    /** @type {vscode.Diagnostic[]} */
    const diags = [];
    if (report.kind === "chrysalis.cwl.lsp-map" || (mapped[0] && mapped[0].range)) {
      for (const d of mapped) {
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
    } else {
      for (const d of report.diagnostics ?? []) {
        const line = Math.max(0, (d.line ?? 1) - 1);
        const vs = new vscode.Diagnostic(
          new vscode.Range(line, 0, line, 1000),
          d.message,
          d.severity === "error"
            ? vscode.DiagnosticSeverity.Error
            : d.severity === "warn"
              ? vscode.DiagnosticSeverity.Warning
              : vscode.DiagnosticSeverity.Information,
        );
        vs.code = d.code;
        vs.source = "cwl";
        diags.push(vs);
      }
    }
    collection.set(doc.uri, diags);
    void uri;
  }

  /**
   * @param {import('vscode').TextDocument} doc
   */
  function schedule(doc) {
    if (doc.languageId !== "cwl") return;
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      refreshDiagnostics(doc).catch((e) => {
        console.error(e);
      });
    }, 300);
  }

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(schedule),
    vscode.workspace.onDidChangeTextDocument((e) => schedule(e.document)),
    vscode.workspace.onDidCloseTextDocument((doc) => collection.delete(doc.uri)),
  );

  for (const doc of vscode.workspace.textDocuments) schedule(doc);

  const fmtProvider = {
    /**
     * @param {import('vscode').TextDocument} doc
     */
    async provideDocumentFormattingEdits(doc) {
      if (doc.languageId !== "cwl") return [];
      const result = await runNode([cli, "fmt", "--stdin", "--stdout"], {
        input: doc.getText(),
      });
      if (result.code !== 0) {
        vscode.window.showErrorMessage("CWL fmt failed. See Output → CWL.");
        const ch = vscode.window.createOutputChannel("CWL");
        ch.appendLine(result.stderr || result.stdout);
        ch.show(true);
        return [];
      }
      const formatted = result.stdout;
      const full = new vscode.Range(doc.positionAt(0), doc.positionAt(doc.getText().length));
      return [vscode.TextEdit.replace(full, formatted)];
    },
  };
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider({ language: "cwl" }, fmtProvider),
  );

  const cmd = vscode.commands.registerCommand("cwl.checkActive", async () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed || ed.document.languageId !== "cwl") {
      vscode.window.showWarningMessage("Open a .cwl file first.");
      return;
    }
    await ed.document.save();
    const file = ed.document.uri.fsPath;
    const result = await runNode([cli, "check", file]);
    if (result.code === 0) {
      vscode.window.showInformationMessage(`CWL check OK: ${path.basename(file)}`);
    } else {
      vscode.window.showErrorMessage(`CWL check failed (${result.code}). See output.`);
      const ch = vscode.window.createOutputChannel("CWL");
      ch.appendLine(result.stdout);
      ch.appendLine(result.stderr);
      ch.show(true);
    }
    await refreshDiagnostics(ed.document);
  });
  context.subscriptions.push(cmd);
}

function deactivate() {}

module.exports = { activate, deactivate };

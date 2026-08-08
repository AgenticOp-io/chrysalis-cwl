/**
 * Minimal VS Code extension: CWL language id + Check active file → `cwl check`.
 * Full LSP (diagnostics streaming) is a later slice — see docs/language/CWL-LSP.md.
 */
const vscode = require("vscode");
const { spawn } = require("child_process");
const path = require("path");

/**
 * @param {import('vscode').ExtensionContext} context
 */
function activate(context) {
  const cmd = vscode.commands.registerCommand("cwl.checkActive", () => {
    const ed = vscode.window.activeTextEditor;
    if (!ed || ed.document.languageId !== "cwl") {
      vscode.window.showWarningMessage("Open a .cwl file first.");
      return;
    }
    const file = ed.document.uri.fsPath;
    const pillar = path.resolve(__dirname, "../..");
    const cli = path.join(pillar, "scripts/cwl-cli.mjs");
    const child = spawn(process.execPath, [cli, "check", file], {
      cwd: pillar,
    });
    let out = "";
    child.stdout.on("data", (d) => {
      out += d.toString();
    });
    child.stderr.on("data", (d) => {
      out += d.toString();
    });
    child.on("close", (code) => {
      if (code === 0) {
        vscode.window.showInformationMessage(`CWL check OK: ${path.basename(file)}`);
      } else {
        vscode.window.showErrorMessage(`CWL check failed (${code}). See output.`);
        const ch = vscode.window.createOutputChannel("CWL");
        ch.appendLine(out);
        ch.show(true);
      }
    });
  });
  context.subscriptions.push(cmd);
}

function deactivate() {}

module.exports = { activate, deactivate };

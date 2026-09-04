#!/usr/bin/env node
/**
 * Pack private CWL VS Code extension as a .vsix (zip) without Marketplace publish.
 * Output: dist-editors/cwl-lsp-<version>.vsix
 */
import { createWriteStream, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const EXT = join(ROOT, "editors", "vscode");
const OUT_DIR = join(ROOT, "dist-editors");
const pkg = JSON.parse(readFileSync(join(EXT, "package.json"), "utf8"));
const version = pkg.version || "0.0.0";
const name = pkg.name || "cwl-lsp";
const vsix = join(OUT_DIR, `${name}-${version}.vsix`);
const stage = join(OUT_DIR, `.vsix-stage-${name}`);

function must(p) {
  if (!existsSync(p)) {
    console.error(`missing: ${p}`);
    process.exit(1);
  }
}

must(join(EXT, "package.json"));
must(join(EXT, "extension.js"));
must(join(ROOT, "scripts", "cwl-lsp-server.mjs"));

rmSync(stage, { recursive: true, force: true });
mkdirSync(join(stage, "extension"), { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const files = [
  "package.json",
  "extension.js",
  "language-configuration.json",
  "syntaxes/cwl.tmLanguage.json",
];
for (const f of files) {
  const src = join(EXT, f);
  must(src);
  const dest = join(stage, "extension", f);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, readFileSync(src));
}

const manifest = `<?xml version="1.0" encoding="utf-8"?>
<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011">
  <Metadata>
    <Identity Language="en-US" Id="${name}" Version="${version}" Publisher="${pkg.publisher || "agenticop"}" />
    <DisplayName>${pkg.displayName || name}</DisplayName>
    <Description>${pkg.description || "CWL"}</Description>
    <Tags></Tags>
    <Categories>Programming Languages</Categories>
    <GalleryFlags>Preview</GalleryFlags>
    <Properties>
      <Property Id="Microsoft.VisualStudio.Code.Engine" Value="${(pkg.engines && pkg.engines.vscode) || "^1.85.0"}" />
    </Properties>
  </Metadata>
  <Installation>
    <InstallationTarget Id="Microsoft.VisualStudio.Code"/>
  </Installation>
  <Dependencies/>
  <Assets>
    <Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true" />
  </Assets>
</PackageManifest>
`;
writeFileSync(join(stage, "extension.vsixmanifest"), manifest);
writeFileSync(join(stage, "[Content_Types].xml"), `<?xml version="1.0" encoding="utf-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension=".json" ContentType="application/json"/>
  <Default Extension=".js" ContentType="application/javascript"/>
  <Default Extension=".xml" ContentType="text/xml"/>
  <Default Extension=".vsixmanifest" ContentType="text/xml"/>
</Types>
`);

rmSync(vsix, { force: true });

// Prefer tar → zip via PowerShell Compress-Archive (Windows) or zip
if (process.platform === "win32") {
  const ps = `
$ErrorActionPreference='Stop'
$stage='${stage.replace(/'/g, "''")}'
$vsix='${vsix.replace(/'/g, "''")}'
if (Test-Path $vsix) { Remove-Item $vsix -Force }
Compress-Archive -Path (Join-Path $stage '*') -DestinationPath ($vsix -replace '\\.vsix$','.zip') -Force
Move-Item ($vsix -replace '\\.vsix$','.zip') $vsix -Force
`;
  const r = spawnSync("powershell", ["-NoProfile", "-Command", ps], { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(r.stdout || r.stderr || "Compress-Archive failed");
    process.exit(r.status ?? 1);
  }
} else {
  const r = spawnSync("zip", ["-r", vsix, "."], { cwd: stage, encoding: "utf8" });
  if (r.status !== 0) {
    console.error(r.stdout || r.stderr || "zip failed");
    process.exit(r.status ?? 1);
  }
}

rmSync(stage, { recursive: true, force: true });
console.log(`CWL_VSIX_OK ${vsix}`);

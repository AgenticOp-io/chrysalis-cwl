#!/usr/bin/env node
/**
 * Serve a CWL module as HTML composed on each request.
 * Usage: node scripts/cwl-live.mjs <file.cwl> [--engine sqlite] [--db file-or-url] [--data data.json] [--host 127.0.0.1] [--port 8791]
 */
import { startCwlLiveServer } from "./cwl-live-document.mjs";

const args = process.argv.slice(2);
let file = null;
let dataPath = null;
let dbPath = null;
let engine = null;
let host = "127.0.0.1";
let port = 8791;
for (let i = 0; i < args.length; i += 1) {
  const arg = args[i];
  if (arg === "--host" && args[i + 1]) host = args[++i];
  else if (arg === "--port" && args[i + 1]) port = Number(args[++i]);
  else if (arg === "--data" && args[i + 1]) dataPath = args[++i];
  else if (arg === "--db" && args[i + 1]) dbPath = args[++i];
  else if (arg === "--engine" && args[i + 1]) engine = args[++i];
  else if (!arg.startsWith("--") && !file) file = arg;
}
if (!file) {
  console.error("usage: node scripts/cwl-live.mjs <file.cwl> [--engine sqlite] [--db file-or-url] [--data data.json] [--host 127.0.0.1] [--port 8791]");
  process.exit(1);
}

const server = await startCwlLiveServer({
  file,
  host,
  port,
  ...(dataPath ? { dataPath } : {}),
  ...(dbPath ? { dbPath } : {}),
  ...(engine ? { engine } : {}),
});
console.log(
  JSON.stringify({
    kind: "chrysalis.cwl.live-document",
    schemaVersion: 1,
    host: server.host,
    port: server.port,
    file,
  }),
);

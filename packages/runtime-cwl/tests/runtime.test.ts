import { describe, expect, it } from "vitest";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createCwlRuntime, loadModuleFromCwlFile } from "../src/index.js";

const ROOT = resolve(fileURLToPath(new URL("../../..", import.meta.url)));
const LITERALS = resolve(ROOT, "fixtures/language-gold/01-literals/routes.cwl");
const FULLSTACK = resolve(ROOT, "fixtures/language-gold/09-fullstack-page/routes.cwl");
const HTML_INTERP = resolve(ROOT, "fixtures/language-gold/15-html-interpolation/routes.cwl");
const AUTH = resolve(ROOT, "fixtures/language-gold/07-auth-effects/routes.cwl");
const PAGE_LOAD = resolve(ROOT, "fixtures/language-gold/10-page-load/routes.cwl");
const REQ_CTX = resolve(ROOT, "fixtures/language-gold/04-request-context/routes.cwl");
const CONTENT_TYPE = resolve(ROOT, "fixtures/language-gold/08-response-content-type/routes.cwl");
const ISLANDS = resolve(ROOT, "fixtures/language-gold/25-island-kinds/routes.cwl");

describe("@chrysalis/runtime-cwl (language-gold)", () => {
  it("serves 01-literals routes via fetch", () => {
    const module = loadModuleFromCwlFile(LITERALS, ROOT);
    const runtime = createCwlRuntime({ module });
    expect(runtime.routes.length).toBeGreaterThanOrEqual(3);
  });

  it("GET /health returns literal true", async () => {
    const module = loadModuleFromCwlFile(LITERALS, ROOT);
    const runtime = createCwlRuntime({ module });
    const res = await runtime.fetch({ method: "GET", url: "http://127.0.0.1/health" });
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("true");
  });

  it("GET /meta returns JSON object", async () => {
    const module = loadModuleFromCwlFile(LITERALS, ROOT);
    const runtime = createCwlRuntime({ module });
    const res = await runtime.fetch({ method: "GET", url: "http://127.0.0.1/meta" });
    expect(res.status).toBe(200);
    const body = JSON.parse(await res.text());
    expect(body.ok).toBe(true);
    expect(body.version).toBe(1);
  });

  it("GET / on fullstack gold returns HTML", async () => {
    const module = loadModuleFromCwlFile(FULLSTACK, ROOT);
    const runtime = createCwlRuntime({ module });
    const res = await runtime.fetch({ method: "GET", url: "http://127.0.0.1/" });
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("<h1>Home</h1>");
    expect(res.headers.get("content-type")).toMatch(/text\/html/);
  });

  it("interpolates path params in page HTML", async () => {
    const module = loadModuleFromCwlFile(HTML_INTERP, ROOT);
    const runtime = createCwlRuntime({ module });
    const res = await runtime.fetch({ method: "GET", url: "http://127.0.0.1/docs/intro" });
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("intro");
  });

  it("injects configured session map", async () => {
    const module = loadModuleFromCwlFile(LITERALS, ROOT);
    const runtime = createCwlRuntime({
      module,
      session: { user_id: { kind: "num", value: 42 }, role: { kind: "str", value: "admin" } },
    });
    expect(runtime.routes.length).toBeGreaterThanOrEqual(3);
    const res = await runtime.fetch({ method: "GET", url: "http://127.0.0.1/health" });
    expect(res.status).toBe(200);
  });

  it("resolveSession maps cookies into handler session", async () => {
    const module = loadModuleFromCwlFile(AUTH, ROOT);
    let sawCookie = false;
    const runtime = createCwlRuntime({
      module,
      resolveSession: ({ cookies }) => {
        sawCookie = cookies.session_id === "abc123";
        return { user_id: { kind: "str", value: cookies.session_id ?? "" } };
      },
    });
    const res = await runtime.fetch({
      method: "GET",
      url: "http://127.0.0.1/me",
      headers: { cookie: "session_id=abc123" },
    });
    expect(res.status).toBe(200);
    expect(sawCookie).toBe(true);
  });

  it("request-context echoes cookie sid in JSON body", async () => {
    const module = loadModuleFromCwlFile(REQ_CTX, ROOT);
    const runtime = createCwlRuntime({ module });
    const res = await runtime.fetch({
      method: "GET",
      url: "http://127.0.0.1/auth",
      headers: { cookie: "session_id=42", Authorization: "Bearer tok" },
    });
    expect(res.status).toBe(200);
    const body = JSON.parse(await res.text()) as { sid?: string; auth?: string };
    expect(body.sid).toBe("42");
    expect(body.auth).toBe("Bearer tok");
  });

  it("page load sidecar in HTML", async () => {
    const module = loadModuleFromCwlFile(PAGE_LOAD, ROOT);
    const runtime = createCwlRuntime({ module });
    const res = await runtime.fetch({ method: "GET", url: "http://127.0.0.1/blog/hello" });
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("cwl-page-load");
    expect(body).toContain('"slug":"hello"');
  });

  it("authored content-type only (no body sniff invent)", async () => {
    const module = loadModuleFromCwlFile(CONTENT_TYPE, ROOT);
    const runtime = createCwlRuntime({ module });
    const json = await runtime.fetch({ method: "GET", url: "http://127.0.0.1/json" });
    expect(json.headers.get("content-type")).toBe("application/json");
    const plain = await runtime.fetch({ method: "GET", url: "http://127.0.0.1/plain" });
    expect(plain.headers.get("content-type")).toMatch(/text\/plain/);
  });

  it("attachment-hole pages return HTML soft-path (not 501)", async () => {
    const module = loadModuleFromCwlFile(ISLANDS, ROOT);
    const runtime = createCwlRuntime({ module });
    const res = await runtime.fetch({ method: "GET", url: "http://127.0.0.1/map" });
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("<h1>Map</h1>");
  });
});

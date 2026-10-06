/**
 * Deploy a CWL-emitted static site to a Firebase Hosting demo site.
 * Refuses live agenticop.io targets. Does not invent a Cloud Function.
 * Usage: node scripts/cwl-deploy-site.mjs --dir <emit-dir> --site agenticop-cwl-demo [--project <id>]
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

/** Live production Hosting names — never deploy from this CWL demo path. */
export const CWL_FORBIDDEN_HOSTING_SITES = Object.freeze([
  "agenticops",
  "agenticops-production",
  "agenticop-io",
  "agenticop.io",
]);

export const CWL_DEMO_HOSTING_SITE = "agenticop-cwl-demo";

/**
 * @param {string} site
 */
export function assertCwlDemoHostingSite(site) {
  const name = String(site ?? "").trim();
  if (!name) throw new Error("cwl:host-site-missing");
  const lower = name.toLowerCase();
  if (CWL_FORBIDDEN_HOSTING_SITES.some((bad) => lower === bad || lower.includes(bad))) {
    throw new Error(`cwl:host-site-forbidden:${name}`);
  }
  if (lower !== CWL_DEMO_HOSTING_SITE) {
    throw new Error(`cwl:host-site-not-demo:${name}`);
  }
  return name;
}

/**
 * @param {{ dir: string, site: string, project?: string, dryRun?: boolean }} opts
 */
export function deployCwlSite(opts) {
  const dir = resolve(opts.dir);
  const site = assertCwlDemoHostingSite(opts.site);
  if (!existsSync(join(dir, "firebase.json"))) {
    throw new Error("cwl:host-site-firebase-json");
  }
  if (!existsSync(join(dir, "index.html"))) {
    throw new Error("cwl:host-site-index");
  }
  const firebaserc = {
    projects: {
      default: opts.project || process.env.CWL_DEMO_FIREBASE_PROJECT || "agenticop-io",
    },
    targets: {
      [opts.project || process.env.CWL_DEMO_FIREBASE_PROJECT || "agenticop-io"]: {
        hosting: {
          demo: [site],
        },
      },
    },
  };
  writeFileSync(join(dir, ".firebaserc"), `${JSON.stringify(firebaserc, null, 2)}\n`, "utf8");
  const hosting = JSON.parse(readFileSync(join(dir, "firebase.json"), "utf8"));
  if (Array.isArray(hosting.hosting)) {
    hosting.hosting = hosting.hosting[0] ?? { public: "." };
  }
  hosting.hosting = {
    ...hosting.hosting,
    target: "demo",
    public: hosting.hosting.public ?? ".",
  };
  writeFileSync(join(dir, "firebase.json"), `${JSON.stringify(hosting, null, 2)}\n`, "utf8");
  const args = ["deploy", "--only", "hosting:demo", "--project", firebaserc.projects.default];
  if (opts.dryRun) {
    return {
      kind: "chrysalis.cwl.host-site-deploy",
      ok: true,
      dryRun: true,
      site,
      dir,
      args,
      token: "CWL_HOST_SITE_DEPLOY_DRY_OK",
    };
  }
  const result = spawnSync("firebase", args, { cwd: dir, stdio: "inherit", shell: true });
  if ((result.status ?? 1) !== 0) {
    throw new Error(`cwl:host-site-deploy:${result.status ?? 1}`);
  }
  return {
    kind: "chrysalis.cwl.host-site-deploy",
    ok: true,
    dryRun: false,
    site,
    dir,
    args,
    token: "CWL_HOST_SITE_DEPLOY_OK",
  };
}

function main(argv) {
  let dir = null;
  let site = CWL_DEMO_HOSTING_SITE;
  let project = null;
  let dryRun = false;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dir" && argv[i + 1]) dir = argv[++i];
    else if (arg === "--site" && argv[i + 1]) site = argv[++i];
    else if (arg === "--project" && argv[i + 1]) project = argv[++i];
    else if (arg === "--dry-run") dryRun = true;
  }
  if (!dir) {
    console.error(
      "usage: node scripts/cwl-deploy-site.mjs --dir <emit-dir> [--site agenticop-cwl-demo] [--project agenticop-io] [--dry-run]",
    );
    process.exit(1);
  }
  const report = deployCwlSite({ dir, site, ...(project ? { project } : {}), dryRun });
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (report.token) process.stdout.write(`${report.token}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

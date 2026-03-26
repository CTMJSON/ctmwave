import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const MIN_NODE_MAJOR = 22;
const MIN_NPM_MAJOR = 10;

let failures = 0;

function pass(msg) {
    console.log(`[OK]   ${msg}`);
}

function warn(msg) {
    console.log(`[WARN] ${msg}`);
}

function fail(msg) {
    failures += 1;
    console.log(`[FAIL] ${msg}`);
}

const [nodeMajor] = process.versions.node.split(".").map(Number);
if (Number.isFinite(nodeMajor) && nodeMajor >= MIN_NODE_MAJOR) {
    pass(`Node version ${process.version}`);
} else {
    fail(`Node ${MIN_NODE_MAJOR}+ required (detected ${process.version})`);
}

const npmVersionResult = spawnSync("npm", ["-v"], { encoding: "utf-8" });
if (npmVersionResult.status === 0) {
    const npmVersion = npmVersionResult.stdout.trim();
    const [npmMajor] = npmVersion.split(".").map(Number);
    if (Number.isFinite(npmMajor) && npmMajor >= MIN_NPM_MAJOR) {
        pass(`npm version ${npmVersion}`);
    } else {
        fail(`npm ${MIN_NPM_MAJOR}+ required (detected ${npmVersion || "unknown"})`);
    }
} else {
    fail("npm was not found in PATH");
}

const nodeModulesPresent = existsSync(path.join(process.cwd(), "node_modules"));
if (nodeModulesPresent) {
    pass("Dependencies directory `node_modules/` exists");
} else {
    fail("Missing `node_modules/` (run `npm install`)");
}

const binName = process.platform === "win32" ? "electron-vite.cmd" : "electron-vite";
const electronViteBin = path.join(process.cwd(), "node_modules", ".bin", binName);
if (existsSync(electronViteBin)) {
    pass("Found local `electron-vite` binary");
} else {
    fail("Missing local `electron-vite` binary (run `npm install`)");
}

const goVersionResult = spawnSync("go", ["version"], { encoding: "utf-8" });
if (goVersionResult.status === 0) {
    pass(`Go available: ${goVersionResult.stdout.trim()}`);
} else {
    warn("Go not found; backend rebuilds will be unavailable (dev can still run with prebuilt binaries)");
}

console.log("");
if (failures > 0) {
    console.log(`[ctmwave] Doctor found ${failures} blocking issue(s).`);
    process.exit(1);
}
console.log("[ctmwave] Environment looks good.");
console.log("[ctmwave] Start with: npm run dev");

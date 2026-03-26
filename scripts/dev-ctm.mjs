import { existsSync } from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const MIN_NODE_MAJOR = 22;

function fail(msg) {
    console.error(`[ctmwave] ${msg}`);
    process.exit(1);
}

const [nodeMajor] = process.versions.node.split(".").map(Number);
if (!Number.isFinite(nodeMajor) || nodeMajor < MIN_NODE_MAJOR) {
    fail(
        `Node ${MIN_NODE_MAJOR}+ is required. Detected ${process.version}. ` +
            `Please install Node 22 and rerun (for example: \`nvm install 22 && nvm use 22\`).`
    );
}

const binName = process.platform === "win32" ? "electron-vite.cmd" : "electron-vite";
const electronViteBin = path.join(process.cwd(), "node_modules", ".bin", binName);
if (!existsSync(electronViteBin)) {
    fail("Dependencies are missing. Run `npm install` first.");
}

const defaultEnv = {
    WCLOUD_PING_ENDPOINT: "https://ping-dev.waveterm.dev/central",
    WCLOUD_ENDPOINT: "https://api-dev.waveterm.dev/central",
    WCLOUD_WS_ENDPOINT: "wss://wsapi-dev.waveterm.dev",
};

const applied = [];
for (const [key, value] of Object.entries(defaultEnv)) {
    if (!process.env[key]) {
        process.env[key] = value;
        applied.push(`${key}=${value}`);
    }
}
if (applied.length > 0) {
    console.log("[ctmwave] Applied default dev cloud endpoints:");
    for (const entry of applied) {
        console.log(`[ctmwave]   ${entry}`);
    }
}

const goCheck = spawnSync("go", ["version"], { stdio: "ignore" });
if (goCheck.error || goCheck.status !== 0) {
    console.warn(
        "[ctmwave] `go` was not found in PATH. Dev mode can still start using prebuilt binaries in `dist/bin`, " +
            "but rebuilding backend binaries requires Go."
    );
}

const child = spawn(electronViteBin, ["dev"], {
    stdio: "inherit",
    env: process.env,
});

child.on("error", (err) => {
    fail(`Failed to launch electron-vite: ${err.message}`);
});

child.on("exit", (code) => {
    process.exit(code ?? 1);
});

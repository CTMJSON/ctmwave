<p align="center">
  <img alt="CTMWave Terminal Logo" src="./public/logos/wave-logo-dark.png" width="360">
</p>

# CTMWave Terminal (CTM Fork)

This repository is the CTM-branded fork of Wave Terminal:

- Upstream project: https://github.com/wavetermdev/waveterm
- CTM fork: https://github.com/CTMJSON/ctmwave

This fork focuses on CTM branding and fork-specific defaults while retaining core Wave functionality.

## What Is Different In This Fork

- Product identity is branded as **CTMWave Terminal**
- User-visible assistant naming is branded as **CTMWave AI**
- First-run onboarding and GitHub links point to `CTMJSON/ctmwave`
- Community/Discord prompts are removed from onboarding/help surfaces
- Fork-specific dev startup wrappers are included (see below)

## Local Development Quick Start

### Prerequisites

- Node.js **22+** (an `.nvmrc` is included)
- npm **10+**
- Go is optional for local dev startup, but required for backend binary rebuilds

### 1) Use Node 22

```bash
nvm install
nvm use
```

### 2) Install Dependencies

```bash
npm install
```

### 3) Validate Environment

```bash
npm run doctor
```

### 4) Start CTMWave Dev

```bash
npm run dev
```

`npm run dev` uses a CTM wrapper script that:

- Verifies Node version compatibility
- Applies default dev cloud endpoints if not already set:
  - `WCLOUD_PING_ENDPOINT=https://ping-dev.waveterm.dev/central`
  - `WCLOUD_ENDPOINT=https://api-dev.waveterm.dev/central`
  - `WCLOUD_WS_ENDPOINT=wss://wsapi-dev.waveterm.dev`
- Launches `electron-vite dev`

If you need raw upstream behavior without wrapper defaults:

```bash
npm run dev:raw
```

### Optional: Adjust Dev Tab Init Timeout

When startup is slow on a busy machine, you can increase the dev init timeout:

```bash
CTMWAVE_DEV_INIT_TIMEOUT_MS=20000 npm run dev
```

Default is `12000` ms.

## Useful Paths

- Config dir (dev): `~/.config/ctmwave-dev`
- Data dir (dev): `~/Library/Application Support/ctmwave-dev` (macOS)
- Backend/desktop logs (dev): `.../ctmwave-dev/waveapp.log`

## Key Features (Inherited Core)

- CTMWave AI context-aware terminal assistant
- Durable SSH sessions with reconnection support
- Terminal + widget layout with drag/drop block UI
- Built-in editor and file preview workflows
- `wsh` command workflows for connected local/remote operations

## Building From Source

See [BUILD.md](BUILD.md).

## License

This fork remains Apache-2.0 licensed. See [LICENSE](./LICENSE).

<p align="center">
  <img alt="CTMWave Terminal Logo" src="./public/logos/wave-logo-dark.png" width="360">
</p>

# CTMWave Terminal
<img width="1339" height="784" alt="Gemini_Generated_Image_jyjqzejyjqzejyjq" src="https://github.com/user-attachments/assets/e8503109-bf3f-41fe-992f-2334f86b4411" />


CTMWave Terminal is a modified fork of the open-source project [Wave Terminal](https://github.com/wavetermdev/waveterm), licensed under the Apache License 2.0.

This fork adapts the original project for internal CTM team use, including branding changes, default configuration updates, and improvements to the local development workflow.

---

## Attribution

This project is based on Wave Terminal, originally developed by wavetermdev.

Original project:
[https://github.com/wavetermdev/waveterm](https://github.com/wavetermdev/waveterm)

Wave Terminal is an open-source, AI-integrated terminal supporting macOS, Linux, and Windows, with features including AI-assisted workflows, durable SSH sessions, and a flexible terminal UI.

All original copyrights and licensing remain in effect under the Apache-2.0 License.

---

## What Is Different In This Fork

* Product identity is branded as **CTMWave Terminal**
* Assistant naming is branded as **CTMWave AI**
* Default configuration and onboarding tailored for CTM workflows
* Internal support and repository links updated to CTMJSON/ctmwave
* Community-facing language removed from onboarding surfaces
* Added development tooling:

  * `npm run dev` (CTM wrapper)
  * `npm run doctor` (environment validation)
* Improved local development startup experience

---

## Local Development Quick Start

### Prerequisites

* Node.js 22+ (see `.nvmrc`)
* npm 10+
* Go (optional for development, required for backend rebuilds)

### 1) Use Node 22

```
nvm install
nvm use
```

### 2) Install Dependencies

```
npm install
```

### 3) Validate Environment

```
npm run doctor
```

### 4) Start Development

```
npm run dev
```

The `dev` script:

* Verifies Node compatibility
* Applies default development endpoints
* Launches electron-vite

To run without CTM-specific defaults:

```
npm run dev:raw
```

---

## Optional: Adjust Dev Startup Timeout

```
CTMWAVE_DEV_INIT_TIMEOUT_MS=20000 npm run dev
```

Default: 12000 ms

---

## Desktop Shortcut (macOS)

```
cat > ~/Desktop/Start-CTMWave.command <<'EOF'
#!/bin/zsh
set -euo pipefail

REPO="$HOME/Scripts/ctmwave"
cd "$REPO"

export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
elif [ -s "/opt/homebrew/opt/nvm/nvm.sh" ]; then
  . "/opt/homebrew/opt/nvm/nvm.sh"
fi

if command -v nvm >/dev/null 2>&1; then
  nvm use 22 >/dev/null 2>&1 || nvm install 22
fi

npm install
npm run doctor
npm run dev
EOF

chmod +x ~/Desktop/Start-CTMWave.command
```

---

## Useful Paths

* Config (dev): `~/.config/ctmwave-dev`
* Data (macOS): `~/Library/Application Support/ctmwave-dev`
* Logs: `.../ctmwave-dev/waveapp.log`

---

## Key Features (Inherited from Wave Terminal)

* Context-aware AI terminal assistant
* Durable SSH sessions with reconnection support
* Drag-and-drop terminal and widget interface
* Built-in editor and file preview system
* CLI integration via command workflows

---

## Building From Source

See `BUILD.md`.

---

## License

This project remains licensed under the Apache License 2.0.

* Original work: Copyright (c) wavetermdev
* Modifications: Copyright (c) 2026 CTMJSON

See `LICENSE` and `NOTICE` for full details.

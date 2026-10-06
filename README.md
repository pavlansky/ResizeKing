# Resize-King 

**Magic that shrinks your files.**

A browser-based video compressor and watermarking tool — no server-side processing, no upload to a backend. Your video never leaves your device; everything runs client-side via WebAssembly.

> 🔗 Live: [www.resizeking.com](https://www.resizeking.com)
 
---

## What it does

- Drag-and-drop a video file (up to 1.9 GB)
- Optionally add a text watermark
- Compress and transcode it entirely in the browser
- Download the result — the original file is never uploaded anywhere
---
## Architecture

State is managed with a **controller + reducer** pattern rather than scattering `useState` across components:

```
useFFmpeg          — thin wrapper around @ffmpeg/ffmpeg (load/exec/read/write, sanitized progress)
FFmpegContext      — provides a single shared useFFmpeg instance app-wide, mounted once in the shell layout
useVideoResize     — feature-level reducer: file selection, watermark options, job status, wizard step
StepperResizeVideo — presentational wizard (upload → watermark → processing)
``` 
---
## Tech stack

|                  |                                                         |
|------------------|---------------------------------------------------------|
| Framework        | Next.js (App Router)                                    |
| Language         | TypeScript                                              |
| UI               | Mantine                                                 |
| i18n             | next-intl                                               |
| Video processing | `@ffmpeg/ffmpeg` + `@ffmpeg/util` (multi-threaded core) |
| Icons            | Tabler Icons                                            |
 
---

## Getting started

```bash
git clone <https://github.com/Qwertin/ResizeKing.git>
cd resize-king
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Requirements

- A watermark font file at `public/fonts/` (checked into the repo) — required for the `drawtext` filter, since the WASM sandbox has no system fonts.
- Any browser with `SharedArrayBuffer` support (all modern evergreen browsers). The required COOP/COEP headers are already configured in `next.config.ts`.
---

## Known limitations

- Files over 1.9 GB are rejected client-side (practical ceiling for in-browser WASM memory).
- Encoding speed is bound by the user's own device — there's no server fallback for lower-end hardware.
- Image compression (visible as a second option on the landing page) is not yet implemented.
---

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
 
---

Built by **Tomáš Pavlanský** — © 2026
 

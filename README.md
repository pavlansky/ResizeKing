# Resize-King 👑

**Magic that shrinks your files.**

A browser-based video compressor and watermarking tool — no server-side processing, no upload to a backend. Your video never leaves your device; everything runs client-side via WebAssembly.

> 🔗 Live demo: 
 
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

Each piece only knows about the layer directly below it — components never touch `@ffmpeg/ffmpeg` or the Context directly, only the `useVideoResize` controller.
 
---


## Why this project is more than it looks like

On the surface this is a small wizard-style form. Under the hood, it solves a handful of problems:

- **Defensive progress handling.** FFmpeg.wasm's own progress reporting is known to be unreliable upstream — it can briefly report wildly implausible values, or reset mid-transcode as its internal duration estimate corrects itself. Progress is sanitized at the source (clamped to a plausible range, never allowed to move backward) rather than trusted raw.
- **Thread count is capped deliberately, not left to "auto."** Left unbounded, encoder buffer allocation scales with thread count — on a high-core-count machine this can exhaust the WASM worker's memory and crash it outright rather than just running slower. Threads are capped to the device's core count minus one, leaving a core free for the UI thread.
---

## Tech stack

| | |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI | Mantine |
| i18n | next-intl |
| Video processing | `@ffmpeg/ffmpeg` + `@ffmpeg/util` (multi-threaded core) |
| Icons | Tabler Icons |
 
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


 
---

Built by **Tomáš Pavlanský** — © 2026
 

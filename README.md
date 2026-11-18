# Shivansh Thakral — Beyond the Interface

A complete React + TypeScript portfolio built around an original copper orbital sculpture, ivory editorial typography, olive accents, three illustrative project worlds, a technology constellation, and a grounded portfolio explorer.

## Run locally

Requires Node.js 22.12+ (verified with Node 24) and npm.

```powershell
cd C:\Users\DELL\Desktop\PORTFOLIO\apex
npm.cmd ci
npm.cmd run dev
```

Open the local URL printed by Vite. On systems without PowerShell's script-execution restriction, `npm` works in place of `npm.cmd`.

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

Deploy `dist/` to any static host. The existing Sites project identity is preserved in `.openai/hosting.json`; use its source workflow to publish subsequent revisions to the same site. Do not create another Site for this checkout.

## Experience and architecture

- `src/data.ts`: supplied profile, project, experience, and certification facts.
- `src/components/Orbit.tsx`: a single lazy-loaded Three.js scene with custom GLSL, orbital lines, dust, material modes, visibility awareness, adaptive pixel ratio, and resource disposal. CSS artwork handles WebGL loss/unavailability.
- `src/components/ProjectArt.tsx`: three original illustrative project environments.
- `src/useSceneScroll.ts`: native-scroll motion, one scheduled paint per scroll event, visible scenes only.
- `src/components/Dialog.tsx`: native modal focus containment, Escape, and focus restoration.
- `src/components/Explorer.tsx` and `src/explorer.mjs`: local fact retrieval, suggested questions, safe React text rendering, honest unknown-answer state, and section links. Questions are never sent over the network or stored persistently.
- `src/styles.css`, `responsive.css`, `polish.css`: visual system, dedicated mobile layouts, and final readability/accessibility adjustments.
- `docs/RESEARCH.md`: research sources, component evaluation, motion rationale, and license notes.

## AI status

No AI provider or credentials were supplied. **Ask Shivansh is a clearly labeled, functional on-device portfolio explorer, not generative AI.** It matches questions to validated knowledge topics and cannot answer general questions or infer personal facts. This follows the explicit fallback in the brief.

For future live AI, replace the retrieval adapter with a same-origin server endpoint. Keep credentials exclusively in server environment secrets; never use `VITE_*` for a secret. Send only allowlisted profile facts and bounded conversation input, enforce server-side length/role checks, rate limits, timeouts, and output bounds, and treat user messages as untrusted. Keep the local explorer available on service errors. A provider endpoint is intentionally not simulated in this static build.

## Assets still needed

The chat photographs were visible in the request, but no image files were available in the workspace or attachment directory. The GitHub avatar was checked and is an identicon, so it was not used as a portrait. The About section uses a bespoke typographic identity artwork. Replace that artwork with the supplied original photo once a local file is available; never generate a substitute face.

No original resume asset was supplied. The site therefore has no misleading download button. Add the real PDF to `public/` and a matching download link when supplied.

## Browser and performance verification

`npm.cmd run qa` requires installed Google Chrome and the dev server on port 5173. It covers all requested widths (320–1920), interactions, keyboard tabs and Escape, focus restoration, clipboard, short mobile chat viewport, reduced motion, and WebGL fallback. Axe scans cover the main page and explorer.

`node scripts/inspect.mjs` and `node scripts/review.mjs` capture visual evidence. `node scripts/performance.mjs` measures the production preview on port 4173 with Lighthouse. Reports and screenshots are generated in ignored `qa/`.

Tests use desktop Chrome and emulated viewport sizes. Physical iOS Safari/Android devices and their actual soft keyboards have not been tested. No hardware FPS claim is made.

Final production Lighthouse run: desktop performance 99, mobile performance 82; accessibility, best practices, and SEO 100 on both. Desktop LCP 0.3 s / TBT 100 ms / CLS 0.001; simulated mobile LCP 0.9 s / TBT 740 ms / CLS 0. These are local lab measurements, not field guarantees. Mobile's remaining bottleneck is initial page and WebGL setup under CPU throttling. The scene detects software graphics and renders on demand, and adapts to persistently slow frames. Hardware-rendered mobile uses a short 1.2-second introduction and then responds to material controls.

Production dependency audit: zero known vulnerabilities in the tested install. npm reported a high-severity picomatch advisory through the Vite development toolchain. The registry's latest picomatch version was still 4.0.7, within the reported range; do not force the suggested unrelated major Vite downgrade. This is not included in the static client bundle. Keep the development server local and update tooling when a compatible patch is available.

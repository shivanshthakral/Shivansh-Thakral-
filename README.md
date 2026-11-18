# Shivansh Thakral — Beyond the Interface

A personal React + TypeScript portfolio led by a photo-based full-body character, oversized name typography, warm amber art direction, a four-act cinematic entrance, original photographs, interactive project worlds, and a grounded portfolio explorer.

Website: https://shivansh-apex-universe.airystingray2.chatgpt.site/

Source repository: https://github.com/shivanshthakral/Shivansh-Thakral-

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
- `src/components/PersonalHero.tsx` and `Entrance.tsx`: a full-body illustrated likeness, pointer response, greeting interaction, and a 4.3-second typographic/photo/character entrance with skip, Escape, replay, and reduced-motion support. The earlier orbital scene is retained in source but is no longer loaded.
- `src/components/LifeGallery.tsx`: all four original photographs, animated photo stack, swipe and keyboard/button navigation, and accessible enlargement.
- `src/components/ProjectShowcase.tsx`: three interactive, character-led project workflows. `ProjectArt.tsx` provides the cinematic illustrations inside their detail dialogs.
- `src/useSceneScroll.ts`: native-scroll motion, one scheduled paint per scroll event, visible scenes only.
- `src/components/Dialog.tsx`: native modal focus containment, Escape, and focus restoration.
- `src/components/Explorer.tsx` and `src/explorer.mjs`: local fact retrieval, suggested questions, safe React text rendering, honest unknown-answer state, and section links. Questions are never sent over the network or stored persistently.
- `src/styles.css`, `responsive.css`, `polish.css`: visual system, dedicated mobile layouts, and final readability/accessibility adjustments.
- `docs/RESEARCH.md`: research sources, component evaluation, motion rationale, and license notes.

## AI status

No AI provider or credentials were supplied. **Ask Shivansh is a clearly labeled, functional on-device portfolio explorer, not generative AI.** It matches questions to validated knowledge topics and cannot answer general questions or infer personal facts. This follows the explicit fallback in the brief.

For future live AI, replace the retrieval adapter with a same-origin server endpoint. Keep credentials exclusively in server environment secrets; never use `VITE_*` for a secret. Send only allowlisted profile facts and bounded conversation input, enforce server-side length/role checks, rate limits, timeouts, and output bounds, and treat user messages as untrusted. Keep the local explorer available on service errors. A provider endpoint is intentionally not simulated in this static build.

## Personal assets

All four original photographs are included in `public/photos/` and appear in the camera-roll gallery. About uses a distinct generated engineering-studio illustration. `public/images/shivansh-character.png` is an AI-generated illustrated likeness based on the four supplied references, not an original photograph. The built-in image generation tool created it; the final prompt is recorded in `docs/PERSONAL-REDESIGN.md`. Original source files added at the repository root remain untouched.

No original resume asset was supplied. The site therefore has no misleading download button. Add the real PDF to `public/` and a matching download link when supplied.

## Browser and performance verification

`npm.cmd run qa` requires installed Google Chrome and the dev server on port 5173. It covers all requested widths (320–1920), interactions, keyboard tabs and Escape, focus restoration, clipboard, short mobile chat viewport, reduced motion, cinematic entrance, and the personal photo gallery. Axe scans cover the main page and explorer.

`node scripts/review-personal.mjs` and `node scripts/photo-review.mjs` capture the redesigned opening, photographs, mobile gallery and enlarged view. `node scripts/performance.mjs` measures the production preview on port 4173 with Lighthouse. Reports and screenshots are generated in ignored `qa/`.

Tests use desktop Chrome and emulated viewport sizes. Physical iOS Safari/Android devices and their actual soft keyboards have not been tested. No hardware FPS claim is made.

The earlier orbital version's Lighthouse scores do not describe this redesign. The cinematic entrance intentionally occupies 4.3 seconds; performance results must include that experience rather than bypassing it. Latest local reports are in `qa/`.


Production dependency audit: zero known vulnerabilities in the tested install. npm reported a high-severity picomatch advisory through the Vite development toolchain. The registry's latest picomatch version was still 4.0.7, within the reported range; do not force the suggested unrelated major Vite downgrade. This is not included in the static client bundle. Keep the development server local and update tooling when a compatible patch is available.

## Interactive story chapters

The approved opening is followed by interactive illustrated project workflows, a three-step build workbench, an engineering-studio portrait with three narrative chapters, the original-photo gallery, and a portrait-led Ask Shivansh section. Implementation lives in `ProjectShowcase.tsx`, `BuildLab.tsx`, `AboutStory.tsx`, `AskPortal.tsx`, and the corresponding stylesheets. All source photographs and generated PNG masters are preserved; the page serves optimized WebP copies.

Run `node scripts/review-story.mjs` with the dev server to verify the new chapter and process interactions and capture desktop/mobile compositions. The original opening is unchanged by this expansion. See `docs/PERSONAL-REDESIGN.md` for artwork provenance and verification scope.

## Final local experience

`ProjectShowcase.tsx` replaces static project posters with three bright, interactive illustrated workflows. Each project has its own character and three stages; source/contact choices add small explorations. These are labeled conceptual previews. `AboutStory.tsx` now uses a separate engineering portrait; the original personal photographs remain in `LifeGallery.tsx`.

`JourneyNote.tsx`, `ToolStudio.tsx`, and `ContactNote.tsx` complete the lower-page experience with career field notes, selectable technologies, and a safely encoded email draft. `playgrounds.css` carries the final brighter art direction. New illustration roles are imaginative, not factual credentials.

Run `node scripts/review-playgrounds.mjs` and `node scripts/review-closing.mjs` for project stages, example selectors, character loading, About identity, technology links, email-draft encoding, and desktop/mobile visual checks. Production hosting uses the existing Sites identity; source is also maintained in the GitHub repository linked above.

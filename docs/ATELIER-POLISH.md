# Personal portfolio visual refinement

The brief prioritizes UI, art direction and light storytelling over adding application features. The original entrance, hero, personal photographs and Gemini conversation are preserved.

## Artwork

Generated with the built-in image-generation tool using `public/images/shivansh-builder.webp` as the identity/style reference. New composition, not a replacement for the original.

Master: `public/images/shivansh-maker.png`.
Website asset: `public/images/shivansh-maker.webp` (800 × 1200, alpha preserved, 101,376 bytes).
`scripts/prepare-maker.mjs` reproduces the WebP conversion with a local Vite server running.

Prompt:

> New full-body 3D editorial caricature asset for this same man's elegant portfolio. Image is identity/style reference. Preserve recognizable young Indian adult face, curly black hair, black rectangular glasses, warm skin, mustard yellow textured short sleeve shirt, silver necklace, black trousers, chunky black and white sneakers. NEW POSE: standing, relaxed three-quarter view facing slightly right, friendly thoughtful smile; right hand holds a small luminous amber translucent glass cube at chest level, left hand open presenting the cube. It represents the spark of an idea. Sophisticated detailed tactile 3D caricature, believable fabrics, soft warm studio light. Entire head and feet comfortably visible. High-end polished character design, natural hands. Absolutely no laptop, chair, robot, text, watermark, scenery or ground plane. Truly transparent background, isolated character for website compositing. Portrait format.

## Behavior and review

- Three manually selectable process scenes with opt-in playback; no new backend or AI calls.
- Playback runs only while the section is visible, the browser tab is active, and motion is enabled. It finishes after three scenes.
- Existing project artwork is reused as decorative backdrops behind distinct character illustrations. These are conceptual illustrations, not product screenshots or professional credentials.
- CSS folded ribbons transform with existing philosophy controls. No canvas rendering or extra animation library.
- New image lazy loads below the projects; existing images are reused from cache.
- Automated Chrome checks cover 320, 390, 768 and 1440 pixel widths, accessibility, overflow, controls and motion. This does not substitute for physical iPhone testing.
- Canonical URL, social image URL, sitemap and robots now use the active Vercel domain.

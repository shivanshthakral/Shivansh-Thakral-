# Personal portfolio redesign

The revision centers Shivansh's identity: warm charcoal and amber, a custom ST monogram, oversized name typography, a full-body illustrated likeness, and all four original photographs. The previous orbital scene remains in source but is not imported or shipped on the page.

## Directed interactions

- 4.3-second opening: WELCOME typography, photographic film passage, TO MY UNIVERSE reveal, character entrance, then split shutters opening onto the hero. Skip and Escape exit immediately. Replay is available in the hero. System reduced motion skips autoplay. The page remains inert until the entrance ends.
- Hero: eased pointer parallax for the character, rotating typographic asterisk, tactile greeting sticker, staggered name/copy reveal.
- Camera roll: four animated photo prints with next/previous, touch swipe, keyboard-accessible controls, and native dialog enlargement. Original images are preserved in `public/photos/`.
- Existing project stages, navigation, scene drift, technology tabs, timeline disclosures, and grounded portfolio explorer remain functional.

## Personal image provenance

Originals supplied by the user:

- `8734962a-c8b8-4be6-a349-55b40ed1542c.jpeg` → `public/photos/suit.jpeg`
- `2ee21e98-8fe4-469b-8ec0-067c1eb25932.jpeg` → `public/photos/adventure.jpeg`
- `81800838-a9c0-4d02-af43-1733e64ea141.jpeg` → `public/photos/off-duty.jpeg`
- `e84e5444-1ab6-4a8a-b4bb-64c842a0e568.jpeg` → `public/photos/yellow-shirt.jpeg`

Generated illustration: `public/images/shivansh-character.png`. Created with the built-in image generation tool, transparent-background mode, using all four attached photographs as likeness references. This is an illustrated interpretation, not an original photograph or a rigged 3D model.

Web delivery uses alpha-preserving `public/images/shivansh-character.webp` (144 KB versus the 1.84 MB master) and WebP copies of all four photographs. Original files remain preserved. `scripts/optimize-images.mjs` performs only format conversion and proportional resizing, with no creative edits.

Final generation prompt:

> Use case: stylized-concept. Create one premium full-body human caricature of Shivansh, the same young adult man appearing in all four reference photos. Reference photos provide his actual likeness: thick wavy black hair with faded sides, black rectangular glasses, medium warm skin, clean shaven face, small stud earrings. Preserve his recognizable facial features and build. Editorial 3D clay-meets-fashion illustration, expressive but sophisticated, slightly oversized head, physically detailed fabric, beautiful studio lighting. Wearing his mustard yellow open-collar textured shirt from the fourth reference, black tailored trousers and contemporary black/cream sneakers. Relaxed standing pose, one hand in trouser pocket and other hand casually raised greeting the visitor. Face unobscured, no phone. Entire human visible from hair to soles, centered with generous transparent margin, slight three-quarter stance facing viewer. True transparent background. No robot, no spacesuit, no planet, no props, no text, no watermarks. Intended as the main personal portrait cutout on a high-end designer/developer portfolio.

## Verification

Production build and four unit tests pass. The updated browser suite checks 11 widths from 320 to 1920 pixels, navigation, project stages, chat, keyboard controls, clipboard, mobile modal layouts, reduced motion, photo selection/enlargement, and entrance autoplay/skip/replay/unlock. Axe checks the main page and chat. Visual captures are in ignored `qa/`.

No physical-device or rigged-character animation claim is made. Ask Shivansh still uses local deterministic fact retrieval; no provider is connected. No original résumé was supplied.

Earlier personal-redesign Lighthouse baseline, with the cinematic entrance enabled: performance 97 desktop / 70 simulated mobile; accessibility, best practices and SEO 100 on both. The final interactive revision is measured below. These are local lab results, not field measurements.

## Storytelling expansion — November 18, 2026

The approved Entrance and PersonalHero components are unchanged in this expansion.

- ProjectArt now uses three original AI-generated cinematic environments: an emerald anatomical heart for HealthPredict, flowing papers through a bronze gateway for Contentstack, and connected human glass busts for CRM. These are labeled concept art, not product screenshots or medical evidence. Image reveal, native-scroll parallax, hover zoom/scanning light, and detail-stage camera framing give each scene movement.
- AboutStory replaces the flat About layout with three keyboard-accessible chapters: engineer, builder, and human. Each changes its narrative and photo composition. Original photographs are preserved and also remain in LifeGallery.
- BuildLab adds an interactive Question / Connect / Create process screen. Step buttons change the diagram, pseudocode, and explanation; an animated signal connects the pieces. This describes a creative process, not measured project results.
- AskPortal introduces a large illustrated portrait and a direct invitation to explore the portfolio. The same face appears in the persistent dock and chatbot header. The explorer remains explicitly local fact retrieval; no live AI service is claimed.
- story.css provides dedicated layouts down to 320px and respects the existing motion toggle and system reduced-motion setting.

New generated image masters are in public/images/projects/*.png and public/images/agent-portrait.png. WebP display copies total approximately 490 KB. The project prompts requested original, cinematic 3D concept art with dark negative space for typography, warm or emerald/lilac material palettes, and no text/logos. The agent portrait was generated from the existing approved illustrated character, preserving the recognizable glasses, hair, yellow shirt, and warm editorial treatment.

Validation: production TypeScript/Vite build; four retrieval tests; 28 browser checks at 11 viewport widths (320–1920px); no browser runtime errors; zero axe violations on the page and chatbot. scripts/review-story.mjs additionally verifies all three project images load, About chapters update, process controls update, and the face-led portal opens chat on desktop and mobile. Desktop and mobile section screenshots are in ignored qa/story/. Physical device testing is not claimed.

## Final interactive direction (local only)

The final project section is implemented by `ProjectShowcase.tsx`: three bright, character-led, interactive concept previews. HealthPredict uses mint and a fictional healthcare-role illustration; Contentstack uses peach and a creative technologist; CRM uses lavender and a connection-builder. Each has three selectable workflow stages. Contentstack also switches Document / URL / API examples; CRM switches illustrative contacts. These animations explain workflows and are explicitly labeled concepts, not working product demos or clinical predictions. The previous cinematic concept worlds remain in the project-detail dialogs.

About now has an original blue engineering-studio illustration and changing thought cards, replacing the repeated personal photos. The four original photographs remain in the camera-roll gallery, and small versions appear in the approved intro filmstrip. The entrance choreography and hero composition are preserved.

The rest of the page now includes illustrated career field notes, a bright interactive technology studio with a second seated character, a warm recognition composition, expandable principles, a face-led portfolio guide, and a postcard-style email composer. The composer builds a URL-encoded mailto draft; nothing is sent by the site. Animation work is paused outside visible chapters, and the existing motion control and reduced-motion setting remain supported.

All illustrated roles are imaginative representations, not evidence of professional credentials. New PNG masters and optimized WebP display copies are preserved in public/images. The four final artworks were generated with the approved character as an identity reference: white-coat/mint healthcare role, cream-and-orange creative technologist with laptop/paper, lavender connection-builder with linked blocks, and cobalt-shirt engineering-studio portrait. A separate seated yellow-shirt laptop illustration appears in the toolkit. No original personal photos were altered.

The user requested local completion before deployment. No new version was published. Run on http://localhost:5173; the production output is rebuilt in dist. Final QA scripts: qa.mjs, review-playgrounds.mjs, review-closing.mjs, review-story.mjs, and performance.mjs. Generated reports are in ignored qa/; physical-device testing is not claimed.

Final verification: TypeScript/Vite production build passed; all four retrieval tests and 28 regression checks passed across 11 widths (320-1920px). The project, About, workbench, technology, career, contact, and guide interaction suites passed. Axe reported zero violations in the main page, chat, and the individually scanned new sections. Desktop and mobile screenshots were visually inspected.

Final production Lighthouse run with the cinematic entrance enabled: performance 98 desktop / 71 simulated mobile; accessibility, best practices, and SEO 100 on both. Desktop LCP 1.1 s, TBT 30 ms, CLS 0.009. Mobile LCP 5.2 s, TBT 420 ms, CLS 0. Intro photo delivery was reduced with separate 480px WebP assets, and offscreen animation is paused. Throttled mobile startup remains the main measured limitation; the approved intro is skippable and reduced motion bypasses it. These are local lab measurements, not physical-device or field results.

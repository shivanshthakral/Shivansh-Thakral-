# APEX — research and motion direction

Research performed for this build on 18 November 2026 (Asia/Calcutta). The workspace was empty: no framework, resume, photographs, or existing source files were present. The supplied master brief is the primary content source.

## References and access

- [21st component catalog](https://21st.dev/community/components), [text catalog](https://21st.dev/community/components/s/text), [animated components](https://21st.dev/community/components/explore/animated-components), and [backgrounds](https://21st.dev/community/components/explore/background-ui-components) were inspected. The latter two exposed category text but not working interactive previews through the research browser.
- [Cnippet Text Reveal](https://21st.dev/@cnippet-dev/components/text-reveal): inspected description, usage, Motion dependency, and MIT license. The full component source requires an account. Its line/stagger mechanic informed the original CSS hero reveal.
- [Animbits Split Reveal](https://21st.dev/@animbits/components/text-split-reveal): catalog listing accessible; full implementation not exposed.
- [Cnippet Text Scramble](https://21st.dev/@cnippet-dev/components/text-scramble/click-retrigger): inspected as an alternate interaction, rejected to keep navigation immediately readable.
- [Official 21st agent integration](https://github.com/21st-dev/skill) and its `21st-cli-use` instructions were read. Ran the documented `npx @21st-dev/cli search 'text reveal' --limit 5 --json`; it reported that authentication was required. No account was signed in, and no gated source was copied.
- [Aceternity Container Scroll](https://ui.aceternity.com/components/container-scroll-animation): examined perspective transform mechanics and component props. Used a simpler original native-scroll implementation without an extra animation dependency.
- [Magic UI Particles](https://magicui.design/docs/components/particles): examined quantity, easing, size, and pointer-response controls. The portfolio instead has a custom Three.js particle distribution and shader.
- Official [Three.js](https://threejs.org/docs/), [Motion scroll animations](https://motion.dev/docs/react-scroll-animations), and [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) informed the engineering choice. One Three.js scene plus native scroll and CSS keeps the rendering model coherent.
- The requested `fsd.rijakarora.in` inspiration was inaccessible through the research browser. It was not replicated.

## Candidate evaluation

| Candidate                        | Source catalog                 | Decision and implementation implications                                                            |
| -------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------- |
| Text Reveal                      | 21st / Cnippet                 | **Selected mechanic**: masked line entrance, fixed layout, restrained stagger. Custom CSS.          |
| Vertical Cut Reveal Characters   | 21st text                      | Considered; many character wrappers unnecessary for the short editorial headline.                   |
| Split Reveal Text                | 21st / Animbits                | **Selected mechanic**: clipped navigation entrances. Custom CSS.                                    |
| Motion Blur Text                 | 21st text                      | Rejected: softness competes with typography and small-screen legibility.                            |
| Text Scramble                    | 21st / Cnippet                 | Rejected: delays recognition of meaningful labels.                                                  |
| Text Rotate                      | 21st text                      | Rejected: identity should remain stable.                                                            |
| Text Gradient Scroll             | 21st text                      | Considered; replaced with simple readable section transitions.                                      |
| Scroll media expansion hero      | 21st main                      | Considered; no original video asset available.                                                      |
| Scroll Morph Hero                | 21st main                      | Considered; avoided pinned hero and long touch scroll.                                              |
| Container Scroll Animation       | 21st / Aceternity              | **Selected mechanic**: shallow project-scene movement on native scroll.                             |
| Interactive Image Accordion      | 21st main                      | Considered; no accessible original photography files.                                               |
| Shader Animation                 | 21st main                      | **Selected foundation**: custom GLSL banded copper core. No external shader copied.                 |
| Spline Scene                     | 21st main                      | Rejected: custom Three.js scene gives control over particles, geometry, disposal, and fallback.     |
| Aurora Background                | 21st main                      | Rejected: would dilute the copper/olive visual language.                                            |
| Liquid Glass Button              | 21st main                      | Rejected: avoids decorative glass and extra filter work.                                            |
| Motion Footer                    | 21st main                      | **Selected mechanic**: typographic finale with focused directional CTA.                             |
| Particles                        | Magic UI                       | **Selected mechanic**: controlled orbital dust, original Three.js implementation.                   |
| Orbiting Circles / Animated Beam | Magic UI catalog               | **Selected mechanic**: connected SVG technology map with three selectable disciplines.              |
| Magnetic Button                  | Aceternity catalog             | Considered; tactile color and directional arrow feedback chosen to preserve pointer predictability. |
| Floating Dock                    | Aceternity / Magic UI catalogs | **Selected mechanic**: persistent compact navigation, motion control, and explorer entry.           |

Catalog inspection is not claimed to be live browser verification of every external demo. Original site screenshots and interactions were tested locally.

## Choreography

| Interaction              | Timing and purpose                                                                                   | Mobile / motion off                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Hero line masks          | 1.3 s entrance, 120 ms line offset; introduces the identity without blocking interaction             | Short stacked composition; intro can be skipped and is session-aware. Off means immediate text.                 |
| Intelligence core        | Slow orbital movement, eased pointer response, material selection; represents connected systems      | 500 rather than 1,300 particles, fewer geometry segments, DPR capped at 0.9; 1.2-second introduction, then on-demand material changes. Software graphics render on demand. Material buttons work with touch. |
| Project worlds           | Shallow native-scroll drift plus perspective response; conveys the distinct workflow of each project | Less scroll displacement, click/tap details and stage controls; no hover dependency.                            |
| Navigation               | Native modal, staggered masked rows, active section tracking                                         | Persistent thumb-accessible menu, keyboard focus trap and Escape provided by native dialog.                     |
| Technology constellation | Selection replaces technologies and explanatory context                                              | Same content accessible by touch and arrow keys.                                                                |
| Journey                  | Disclosure expands one chapter at a time                                                             | Large full-width touch target; dates retained as years in collapsed view.                                       |
| Portfolio explorer       | Immediate fact retrieval; no artificial typing delay                                                 | Fullscreen `100dvh` dialog, independent conversation scrolling, 16 px input to avoid iOS zoom.                  |

## Content verification

The GitHub API verified the public repositories `HealthPredict-AI-MAIN`, `contentstack-accelerator-main`, and `AI-Powered-CRM`. Read available READMEs for HealthPredict and CRM; newer versions differ from the brief (including storage/provider choices). The site keeps the supplied project stack, labels descriptions as grounded in that brief, and notes that linked repositories may show newer iterations. No additional accuracy, clinical, production-scale, or impact claims from README marketing were adopted. Contentstack's README was unavailable.

Repository links are real. Live demos are not asserted. Project visuals are original illustrative SVG/CSS compositions, never represented as product screenshots.

## Licenses

No 21st.dev or third-party component source was copied. React, React DOM, Three.js, Vite, and the relevant type packages are MIT licensed. TypeScript and Playwright use Apache-2.0; Lucide uses ISC. Manrope and Instrument Serif fonts use SIL Open Font License 1.1. Fontsource package license files remain under their respective installed packages. Axe core is MPL-2.0; Lighthouse is Apache-2.0. Their packages are development-only. Preserve dependency license notices when redistributing package contents.

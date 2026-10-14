# Akshaj Nadimpalli — Portfolio

Personal portfolio for Summer 2027 software engineering internships. Hosted on GitHub Pages at https://www.akshajnad.tech/.

## Local preview

Run `python3 -m http.server 4173` and open http://localhost:4173. There is no build step; GitHub Pages serves the root of `main`.

## How it's organised

The site is built around one idea, "the stack": a hero with three system layers, an experience tower with one floor per role, and a skill explorer that traces each technology to the projects that used it.

- `index.html`: page structure, metadata, and static sections (hero, about, contact).
- `assets/js/data.js`: the single source of truth. Experiences, projects, skills, awards, architecture diagrams, and media all live here. The tower, project cards, skill explorer, and case studies are rendered from it, so edit content here.
- `assets/js/main.js`: entry point. Renders lists, text reveals, magnetic buttons, scroll-linked effects, and lazy-loads the 3D scenes.
- `assets/js/tower.js` + `scene/tower-scene.js`: the experience tower (Three.js) with its floor index, focus card, and list-view fallback.
- `assets/js/scene/hero-scene.js`: the hero's layered system visual.
- `assets/js/skills.js`: skill explorer (tiles, project rail, connecting wires, mobile bottom sheet).
- `assets/js/case-study.js`: case-study dialog, interactive architecture diagrams, media frames, and lightbox. Deep links work at `#/work/<id>`.
- `assets/js/icons.js`: brand glyphs from [Simple Icons](https://simpleicons.org) (CC0).
- `assets/vendor/three.js`: a tree-shaken, minified Three.js r186 build (MIT) containing only the classes the scenes use.
- `script.js`: the local "Ask about my work" search. No external API; nothing is sent anywhere.
- `assets/css/site.css`: all styles, including responsive, reduced-motion, and print rules.

## Accessibility and fallbacks

- The tower is never required: the floor index, focus card, and a "List" view expose everything, and phones/tablets under 900px get the stacked list automatically.
- No WebGL: the hero shows a static SVG, and the experience section falls back to the list view.
- `prefers-reduced-motion`: scroll reveals, count-ups, wire animations, and camera easing are disabled; the 3D scenes render static frames.
- All interactive elements are buttons or links with visible focus states. Case studies are native `<dialog>`s (Esc or browser Back closes them).

## Content provenance

Role and project facts come from the previous portfolio and `resume.pdf`. Award labels were checked against Devpost: [Graption](https://devpost.com/software/graption), [EchoLocate](https://devpost.com/software/echolocate-e4k3dg), [Gridly](https://devpost.com/software/gridly-0h29vm), and [FinMate](https://devpost.com/software/finmate-gj93c8). Signifi uses a capture of the authenticated Designer showing a generated WaitLess screen at https://www.signifi.tech/. Graption uses the "Deaf Individual POV" app capture and the Hacklytics architecture diagram from its Devpost gallery; the demo video is the team's Hacklytics submission on YouTube. EchoLocate's screenshot is from https://www.echolocate.us/.

## Reverting

The pre-redesign site is preserved on the `legacy/pre-redesign` branch and the `v1-pre-redesign` tag. To restore it without rewriting history: `git checkout main && git checkout v1-pre-redesign -- . && git commit -m "Restore pre-redesign site" && git push`.

Keep `CNAME` set to `www.akshajnad.tech`.

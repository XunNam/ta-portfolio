# Motion Usage

## Library
- Used the already installed Motion package from `motion/react`

## Added Motion Areas
- Hero content reveal with restrained stagger
- Hero visual and floating badge entrance
- About cards staggered reveal
- Skills shell reveal
- Technical skill rows staggered reveal
- Soft skill chips staggered reveal
- Project cards staggered reveal
- Contact section reveal
- Mobile menu open/close animation with `AnimatePresence`
- Subtle hover/tap polish for:
  - hero/contact buttons
  - about/project cards
  - skill chips
  - social links

## Motion Style Rules Applied
- short durations
- small movement distances
- restrained scaling
- no bounce-heavy interactions
- reduced-motion aware defaults through `useReducedMotion`

## Implementation Note
- Motion was added through small client-side wrapper components so the main portfolio page can remain server-rendered.

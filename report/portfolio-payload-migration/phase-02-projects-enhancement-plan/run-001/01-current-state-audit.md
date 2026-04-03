# Current State Audit

## Relevant `projects` Collection Fields
- `title`
- `slug`
- `shortDescription`
- `fullDescription`
- `visualType`
- `previewImage`
- `iconName`
- `svgCode`
- `tags[] -> tag`
- `sortOrder`
- `featured`
- `status`
- `buttonLabel`
- `buttonUrl`
- `openInNewTab`

## Current Frontend Rendering
- Homepage cards are rendered in `src/components/portfolio/PortfolioPage.tsx`.
- The card visual area uses:
  - uploaded preview image when `visualType = image` and media URL exists
  - sanitized SVG when `visualType = svg`
  - named icon when `visualType = namedIcon`
  - generic fallback icon when image mode has no usable image
- Tags render as chip-style labels only when tags exist.

## Current CTA Behavior
- If `buttonUrl` resolves to a valid custom URL, the CTA renders as a clickable link.
- `openInNewTab` controls `target="_blank"` and `rel="noreferrer noopener"` when URL exists.
- If URL is empty, the CTA renders as a non-clickable visual affordance.
- This pass refined the disabled state so it still falls back to `Xem chi tiết` when `buttonLabel` is empty.

## Current Fallback Behavior
- Missing preview image in image mode falls back to icon/SVG handling through `VisualIcon`.
- Empty tags omit the entire tag row.
- Empty CTA URL does not create fake navigation.

## Current Seed / Default Content
- Seeded projects in `src/lib/portfolio/defaults.ts` already include:
  - title
  - short description
  - tags
  - icon-first visuals
  - default `Xem chi tiết` label
  - empty `buttonUrl`
- Seed content remained compatible; no migration was required.

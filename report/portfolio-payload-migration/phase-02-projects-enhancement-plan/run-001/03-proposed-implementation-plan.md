# Implemented Plan

## Schema / Admin UX
- Kept the existing `projects` field set intact.
- Reordered and grouped fields into a more natural edit flow:
  1. title + slug
  2. short description + full description
  3. visual mode and visual-source fields
  4. tags
  5. CTA row
  6. publishing row
- Added admin descriptions so editors understand how card description, preview image, tags, and CTA behavior affect the homepage.
- Added conditional visibility for `openInNewTab` so it only appears when `buttonUrl` has a usable value.

## Frontend Rendering
- Preserved the existing project-card structure and fallback visual behavior.
- Kept:
  - uploaded preview images
  - named icon mode
  - sanitized SVG mode
  - generic fallback icon for missing image-mode assets
- Updated CTA rendering so:
  - clickable state still uses `buttonLabel || 'Xem chi tiết'`
  - disabled state now also uses `buttonLabel || 'Xem chi tiết'`

## Minimal Safe Implementation Order Used
1. refine collection edit UX
2. adjust frontend CTA fallback logic
3. regenerate Payload types
4. run typecheck, build, and automated tests

## Validation Focus
- image mode still renders correctly
- tags still render as chip labels
- empty tags still omit the tag row
- empty CTA URL still does not create navigation
- public reads still exclude draft projects

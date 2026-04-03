# Next Step Checklist

## Reuse Confirmed
- Reuse the existing `projects` collection.
- Reuse the shared `media` collection for preview images.
- Reuse the existing project-card frontend and visual fallback logic.
- Reuse the existing published-only access behavior.

## Changed Carefully In This Pass
- Admin field grouping/order
- admin descriptions/help text
- conditional visibility for `openInNewTab`
- disabled CTA label fallback

## Post-Implementation QA
- In Payload admin:
  - create/edit a project in image mode
  - confirm `previewImage` help text is clear
  - confirm tags can be added freely
  - confirm `openInNewTab` only appears when URL exists
- On the homepage:
  - verify a project with tags renders chips cleanly
  - verify a project with no tags has no empty gap
  - verify a project with empty URL shows a non-clickable CTA
  - verify a project with URL + new-tab opens correctly
- Regression:
  - confirm draft projects still do not appear publicly
  - confirm seeded projects still render correctly

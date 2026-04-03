# Gap Analysis

## Requirements Already Satisfied Before This Pass
- Preview image support existed through `previewImage -> media`.
- Editors could add unlimited tags.
- Title and description were editable.
- CTA URL and `openInNewTab` already existed.
- Frontend already handled missing preview images with visual fallback logic.
- Public project visibility already respected published-only access.

## Missing or Weak Areas Before This Pass
- Admin form structure was flat and less editor-friendly than needed.
- CTA helper text was missing, so the no-URL behavior was not obvious in admin.
- `openInNewTab` remained visible even when there was no CTA URL.
- Disabled CTA rendering depended on `buttonLabel` being filled, which made the no-URL state less consistent.

## What This Pass Addressed
- Grouped related fields into clearer editing rows.
- Added descriptions for:
  - short description
  - preview image
  - tags
  - button label
  - button URL
- Made `openInNewTab` conditional on the presence of a URL.
- Aligned disabled CTA rendering with the same `Xem chi tiết` fallback used by clickable CTAs.

## What Was Intentionally Not Changed
- No new fields were added.
- Tags were not reshaped into a different data format.
- `previewImage` remained a relationship to `media`.
- No project detail pages or route system were introduced.

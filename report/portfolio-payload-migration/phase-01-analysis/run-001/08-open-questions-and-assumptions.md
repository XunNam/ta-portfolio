# Open Questions And Assumptions

## Purpose
This file separates what is already decided from what still needs confirmation before implementation.

## Assumptions Locked During Planning
- The target architecture will use:
  - `media`
  - `projects`
  - `siteSettings`
  - `homePage`
- V1 remains single-page only.
- There will be no project detail pages in v1.
- There will be no Payload preview/draft mode in v1.
- Hero and footer social links share one reusable `SocialLink` group.
- About items and project cards need icon-first support because the static reference currently relies on icons.
- Missing media should remain `null` rather than being replaced with invented placeholder uploads.

## Open Questions That Do Not Block Planning
- Should the footer preserve the hardcoded reference year `2026`, or switch to dynamic current-year behavior in implementation?
- Should the optional `viewAllLink` in the Projects section remain hidden in v1 unless a real destination is supplied?
- Should uploaded SVG files stay disabled in v1, or be reconsidered later after raw SVG sanitization is in place?

These do not block the official planning package because the current plan already defines safe defaults.

## Questions That Block Implementation But Not Planning
- What is the real MongoDB connection string?
- What are the real Cloudflare R2 values?
  - bucket
  - endpoint
  - access key id
  - secret access key
  - public URL
- What is the final destination for the `Xem CV` CTA?
- Can the missing hero/avatar asset be provided, or should the implementation ship with a designed fallback only?

## Additional Non-Blocking Observations
- The reference footer does not currently show footer quick links or footer social links, but the content model includes them to future-proof the site.
- The current repo does not include Tailwind as a dependency, even though the reference uses Tailwind CDN classes. This affects implementation mechanics, not planning structure.

## Explicit Non-Goals Confirmed
- do not implement schema in Phase 01
- do not rebuild the frontend in Phase 01
- do not pretend storage is connected in Phase 01
- do not alter `.env` automatically in Phase 01

## Assumptions Considered Acceptable

### `siteSettings` And `homePage` Are Publicly Readable
Acceptable because:
- the public site needs these values to render
- these globals contain public-facing content, not private admin-only secrets

### `projects` Uses A Simple `status` Field In V1
Acceptable because:
- it satisfies public/private publishing needs
- it avoids introducing a larger draft-preview workflow too early

### Icon-First Seed Data For Some Sections
Acceptable because:
- the reference site itself is icon-first for About and Projects
- it avoids fake images and reduces seed ambiguity

## Input Summary Needed From The User Before Implementation
- MongoDB URI
- Cloudflare R2 credentials
- public media URL/domain
- final CV destination
- hero/avatar asset decision

## Conclusion
No unresolved planning ambiguity remains that should delay the official package. The remaining open items are implementation inputs and content assets.

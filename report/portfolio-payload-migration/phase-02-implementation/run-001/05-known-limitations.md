# Known Limitations

## Runtime Inputs Still Missing
- Real Cloudflare R2 credentials were not available, so upload/read behavior against R2 remains unverified.
- A final CV target was not provided, so the `Xem CV` CTA is modeled but intentionally unresolved.
- The hero/avatar asset referenced by `reference/index.html` is still missing, so the frontend uses the planned placeholder fallback.
- No brand logo asset was provided, so branding currently falls back to editable brand text.

## Scope Limits Preserved Intentionally
- No project detail page exists in v1.
- No project detail route was introduced.
- No Payload preview mode or drafts workflow was introduced.

## Current Fallback Behavior
- Missing logo image: render `brandText`.
- Missing hero avatar: render placeholder visual card.
- Missing about/project image visual: use named-icon fallback flow.
- Incomplete/raw invalid SVG input: sanitized output or named-icon/default-icon fallback.
- Project button without usable URL: render non-navigating affordance instead of inventing a route.

## Operational Notes
- Storage integration is honest but conditional; if S3/R2 env values are incomplete, R2 storage remains disabled.
- Seed defaults mirror the reference content but do not invent unavailable media assets.
- Public project reads depend on access-safe Local API usage with `overrideAccess: false`; that intent is implemented in the public data loader and should be preserved in future additions.

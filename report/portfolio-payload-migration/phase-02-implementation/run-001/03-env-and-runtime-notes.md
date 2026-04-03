# Environment and Runtime Notes

## `.env` Safety Policy Applied
- Existing `.env` was inspected indirectly through runtime behavior only.
- Existing `.env` was not overwritten.
- No backup file was needed because no destructive rewrite was performed.

## `.env.example`
- `.env.example` was updated as the safe committed template.
- It now documents the MongoDB transition and Cloudflare R2 placeholders:
  - `PAYLOAD_SECRET`
  - `NEXT_PUBLIC_SITE_URL`
  - `DATABASE_URI`
  - `DATABASE_URL`
  - `S3_BUCKET`
  - `S3_REGION`
  - `S3_ENDPOINT`
  - `S3_ACCESS_KEY_ID`
  - `S3_SECRET_ACCESS_KEY`
  - `R2_PUBLIC_URL`

## Database Resolution
- Runtime config now resolves MongoDB using:
  - `process.env.DATABASE_URI || process.env.DATABASE_URL || ''`
- This keeps the project compatible with both the starter convention and the planning-package convention.

## Cloudflare R2 Wiring
- Payload now includes `@payloadcms/storage-s3`.
- Storage is conditionally enabled only when all required S3/R2 env values are present.
- Public media URL generation is wired through `R2_PUBLIC_URL` when available.
- If the required env values are missing, the storage plugin remains disabled and the app does not pretend R2 is active.

## Runtime Behavior Verified
- Local MongoDB-backed Payload runtime was exercised through:
  - type generation
  - seed script
  - integration tests
  - end-to-end tests
  - production build

## Runtime Behavior Not Verified
- Real Cloudflare R2 upload/write/read behavior was not verified because valid R2 credentials/public URL were not available during implementation.

## Implementation Deviation Worth Noting
- The planning package preferred strict resolved targets for all `LinkTarget` instances.
- Implementation keeps that strict behavior by default, but selected fields intentionally use `requireResolvedTarget: false` where the planning package also declared the target unresolved for v1:
  - hero secondary CTA (`Xem CV`)
  - contact secondary CTA (`Sao chép Email`)
  - `projectsSection.viewAllLink`
- This avoids schema rework while still keeping the data model aligned with the approved contract.

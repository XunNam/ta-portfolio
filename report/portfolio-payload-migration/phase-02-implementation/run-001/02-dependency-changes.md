# Dependency Changes

## Added Runtime Dependencies
- `@payloadcms/storage-s3`: Payload storage adapter used for Cloudflare R2's S3-compatible API.
- `lucide-react`: named icon system used for seeded visuals and fallback-safe rendering.
- `sanitize-html`: server-side and render-time SVG sanitization.

## Added Development Dependency
- `@types/sanitize-html`: TypeScript types for the SVG sanitization utility.

## No Removals
- No existing dependencies were removed in this implementation phase.

## Why These Additions Were Necessary
- R2 integration required a supported Payload storage adapter that can target an S3-compatible endpoint.
- The approved content model included `named` icon support across hero/footer/about/projects/floating badge.
- Raw SVG support required a real sanitization layer rather than trusting pasted markup.

# Media And Storage Plan

## Purpose
This document defines the planned media handling strategy for the future Payload implementation. No live Cloudflare R2 integration is performed in Phase 01.

## Planned `media` Collection Role
The `media` collection will be the shared asset store for the following use cases:
- site logo
- hero avatar
- About item illustrative images
- project preview images
- custom social icon images
- meta / OG image

The existing starter `media` collection already gives a usable base, but it is not yet wired to Cloudflare R2 and does not yet reflect the full editorial usage planned for the portfolio.

## Media Types Expected In V1

### Preferred Upload Types
- png
- jpg / jpeg
- webp

### Conditional / Later Review
- svg uploads

Reason:
- raster and web image formats cover the current v1 visual needs
- SVG carries a higher XSS/sanitization burden and does not need to be enabled on day one because raw SVG text entry is already modeled in controlled fields for social and icon-like visuals

## Cloudflare R2 Strategy

### Planned Integration Approach
Use Cloudflare R2 through Payload's S3-compatible storage approach in the later implementation phase.

Planned direction:
- install and configure the Payload S3 storage adapter
- point it to the Cloudflare R2 S3-compatible endpoint
- store media assets in the R2 bucket

### Why S3-Compatible R2 Is A Good Fit Here
- Payload already supports S3-style storage flows cleanly
- R2 exposes an S3-compatible endpoint
- it avoids inventing a custom storage layer for a straightforward portfolio use case

## Public Media URL Strategy

### Planned Public URL Input
Use `R2_PUBLIC_URL` as the canonical base for public asset delivery.

This can represent:
- a custom domain, such as `https://assets.example.com`
- or the chosen public R2 bucket URL pattern

### Reason For Separating Public URL From Endpoint
- `S3_ENDPOINT` is for write/read API access
- `R2_PUBLIC_URL` is for frontend asset delivery

Keeping them separate avoids coupling the public rendering URL to the internal storage endpoint details.

## Planned Env Inputs

| Variable | Planned Use |
| --- | --- |
| `S3_BUCKET` | bucket name used by Payload storage adapter |
| `S3_REGION` | R2-compatible region value, typically `auto` |
| `S3_ENDPOINT` | R2 S3-compatible endpoint |
| `S3_ACCESS_KEY_ID` | R2 access key |
| `S3_SECRET_ACCESS_KEY` | R2 secret key |
| `R2_PUBLIC_URL` | public base URL for delivered assets |

## Current Repo Reality
- No storage adapter dependency is installed yet.
- No Cloudflare R2 credentials are present.
- No storage plugin configuration exists in `src/payload.config.ts`.
- Therefore:
  - uploads are **not** configured for R2 yet
  - public asset delivery via R2 is **not** verified
  - CORS behavior is **not** verified
  - custom-domain delivery is **not** verified

## SVG Handling And Security Notes

### Raw SVG In Content Model
Raw SVG is planned only for explicitly controlled content fields such as:
- `SocialLink.svgCode`
- project `svgCode`
- About item `svgCode`
- floating badge `svgCode`

### Required Future Safety Rule
Raw SVG must be sanitized before persistence and rendered with defense in depth.

Planned safe handling approach:
- validate and sanitize SVG server-side before save
- keep sanitization in shared utility code
- reuse the same sanitization logic across all fields that accept raw SVG

### Uploaded SVG Files
Uploaded SVG files should remain out of scope for v1 unless explicitly reviewed. This keeps the initial attack surface smaller and avoids conflating file-upload sanitization with raw content sanitization.

## Local Development Assumptions

### During Early Implementation
Until real R2 credentials are provided, local development can still proceed in one of two ways:
- implement config placeholders only and leave storage untested
- temporarily use local file storage during code assembly, then switch to R2 once credentials are available

### Recommendation
For this project, prefer:
- schema and frontend implementation first
- real storage wiring only once the actual R2 credentials and public URL are supplied

This avoids pretending integration works and avoids wasting time debugging fake storage settings.

## Unresolved Items Until Credentials Are Supplied
- bucket name
- access key pair
- exact R2 endpoint
- public delivery URL
- whether a custom asset domain will be used
- cache policy / CDN behavior

## Media Plan Conclusion
The storage direction is clear and low risk:
- keep `media` as the central asset collection
- use Cloudflare R2 through S3-compatible Payload storage
- defer actual wiring until real credentials exist
- treat raw SVG as a controlled, sanitized content path rather than a default upload format

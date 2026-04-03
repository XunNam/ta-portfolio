# Environment Config Plan

## Purpose
This document explains the planned environment variables for the portfolio migration and the file-handling policy for `.env` and `.env.example`.

## Current State
- `.env.example` originally contained only starter values
- `.env` already exists locally
- `.gitignore` already excludes `.env`
- the current codebase references `DATABASE_URL`

In this planning run:
- `.env.example` has been updated with placeholder-only values
- `.env` was inspected but intentionally not modified

## Planned Variables

| Variable | Purpose | Expected Consumer Later |
| --- | --- | --- |
| `PAYLOAD_SECRET` | Payload application secret | `src/payload.config.ts` |
| `NEXT_PUBLIC_SITE_URL` | canonical site URL for metadata and frontend links | metadata helpers, canonical URLs, share links |
| `DATABASE_URI` | preferred future naming for Mongo connection string | future config standard |
| `DATABASE_URL` | current starter naming used by repo | current `src/payload.config.ts` |
| `S3_BUCKET` | Cloudflare R2 bucket name | storage adapter config |
| `S3_REGION` | R2-compatible region value | storage adapter config |
| `S3_ENDPOINT` | R2 S3-compatible endpoint | storage adapter config |
| `S3_ACCESS_KEY_ID` | R2 access key id | storage adapter config |
| `S3_SECRET_ACCESS_KEY` | R2 secret access key | storage adapter config |
| `R2_PUBLIC_URL` | public asset delivery base URL | media URL generation / frontend rendering |

## `DATABASE_URL` vs `DATABASE_URI`

### Current Repo Reality
`src/payload.config.ts` currently reads:
- `process.env.DATABASE_URL || ''`

### Planned Direction
The planning package standardizes on `DATABASE_URI` as the clearer long-term name, but documents both keys to avoid ambiguity during the transition.

### Recommended Implementation Transition
During implementation, the config can safely move to:
- `process.env.DATABASE_URI || process.env.DATABASE_URL || ''`

This avoids immediate breakage while allowing the naming transition to be completed deliberately.

## `.env.example` Policy
- safe to commit
- must contain placeholders only
- should be the canonical onboarding template for future implementation
- must not include working secrets, real bucket names, or production URLs

## `.env` Policy
- `.env` is local-only
- do not silently destroy or normalize it during planning
- if the implementation phase later needs a standardized placeholder `.env`, the safe policy is:
  1. create `.env.backup.phase-01`
  2. then overwrite `.env` only with explicit user approval

This phase intentionally does **not** overwrite `.env`.

## What Must Never Be Committed
- real `PAYLOAD_SECRET`
- real MongoDB URI
- real R2 access key id
- real R2 secret access key
- real internal/public infrastructure URLs that should remain private

## Recommended Usage By Phase

### Planning Phase
- document variables only
- keep `.env.example` placeholder-only
- avoid connection claims

### Implementation Phase
- read actual Mongo and R2 values from local `.env`
- keep `.env.example` as documentation
- do not check real secrets into source control

### Validation Phase
- confirm that:
  - Mongo connection works with the supplied URI
  - R2 credentials can upload/read assets
  - public media URLs resolve correctly

## Why `NEXT_PUBLIC_SITE_URL` Is Included Now
Even though the current starter app does not use it yet, the target site will likely need it for:
- canonical URLs
- metadata generation
- Open Graph fallback links
- environment-aware frontend URL construction

## Environment Plan Conclusion
The environment strategy is intentionally conservative:
- expand `.env.example`
- preserve `.env`
- document the naming transition for Mongo
- defer all real connectivity claims until credentials are actually provided and tested

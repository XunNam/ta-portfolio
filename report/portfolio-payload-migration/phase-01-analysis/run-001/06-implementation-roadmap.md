# Implementation Roadmap

## Purpose
This roadmap defines the recommended execution order after Phase 01 planning is approved. It separates schema, storage, frontend, and validation so scope stays controlled.

## Guiding Rule
Do not combine schema modeling, R2 integration, and full frontend rebuild in a single uncontrolled step. The implementation should move in ordered layers.

## Recommended Phase Sequence

### Phase 02A - Implementation Preparation
Goal:
- confirm final approvals and required inputs before code mutation

Tasks:
- confirm this official planning package is approved
- confirm final CV destination
- confirm whether footer year should preserve `2026` or become dynamic
- obtain real MongoDB URI
- obtain real Cloudflare R2 credentials and public URL
- confirm whether uploaded SVG support remains deferred

Validation checkpoint:
- all required external inputs are present
- implementation can proceed without pausing for planning questions

### Phase 02B - Schema Foundation
Goal:
- add the Payload content structures without yet rebuilding the full frontend

Tasks:
- create reusable field groups/modules:
  - `LinkTarget`
  - `SocialLink`
  - `MetaFields`
- expand `media` collection only if needed
- create `projects` collection
- create `siteSettings` global
- create `homePage` global
- encode the explicit access rules
- encode conditional field logic for visuals and links

Validation checkpoint:
- `pnpm run generate:types`
- `pnpm exec tsc --noEmit`
- verify no access-control regression in code review

### Phase 02C - Seed Defaults And Editorial Baseline
Goal:
- seed the future CMS with content that mirrors the static reference honestly

Tasks:
- enter default global content
- create project documents for the three reference projects
- leave missing assets null instead of fabricating files
- use icon-based seed data for About items and project visuals

Validation checkpoint:
- admin forms show expected fields and conditional controls
- stored content matches the static reference where data exists
- missing assets are represented safely

### Phase 02D - Media Storage Wiring
Goal:
- connect Payload media uploads to Cloudflare R2

Tasks:
- install and configure Payload S3 storage adapter
- wire env-backed R2 configuration
- define public media URL strategy using `R2_PUBLIC_URL`
- verify upload/read flow with real credentials

Validation checkpoint:
- upload succeeds
- admin preview works
- frontend can resolve media URLs
- no fake success claims

### Phase 02E - Frontend Rebuild
Goal:
- replace the starter landing page with the CMS-driven portfolio UI

Tasks:
- build the one-page portfolio in Next.js
- preserve section order and overall design intent from `reference/index.html`
- render navbar/mobile menu from `siteSettings.navbarLinks`
- render hero/about/skills/projects/contact/footer from Payload data
- implement fallback rules for missing media and icon modes
- keep project detail pages out of scope

Validation checkpoint:
- the page renders from Payload content
- missing hero avatar does not break layout
- anchor navigation works
- mobile navigation reuses the same source data as desktop

### Phase 02F - Security And Hardening
Goal:
- make the CMS-driven site safe and maintainable

Tasks:
- implement shared SVG sanitization utility
- ensure public Local API reads respect access rules
- review any user-passed links and rendering boundaries
- verify no unsafe raw HTML/SVG rendering shortcuts exist

Validation checkpoint:
- code review focuses on XSS and access rules
- controlled SVG paths are sanitized before persistence

### Phase 02G - Test Refresh And Final Validation
Goal:
- replace the starter assertions with migration-specific checks

Tasks:
- update integration tests for new collections/globals
- update e2e tests for the portfolio homepage
- validate admin can edit globals and projects
- validate public rendering behavior for published projects only

Validation checkpoint:
- `pnpm run generate:types`
- `pnpm exec tsc --noEmit`
- relevant tests pass
- no starter-template assertions remain

## Dependencies Between Tasks

| Depends On | Needed For |
| --- | --- |
| approved Phase 01 package | all implementation work |
| real MongoDB URI | runtime validation, seeded content verification |
| real R2 values | storage wiring and media validation |
| schema foundation | frontend rebuild |
| seed content | meaningful frontend parity checks |
| SVG sanitization utility | any raw SVG-enabled fields |

## Review Gates Before Moving Forward
- after schema foundation: review field shapes and access rules
- after seed/default content: review parity with `reference/index.html`
- after storage wiring: review actual upload behavior
- after frontend rebuild: review scope boundaries and fallback behavior
- after testing: confirm starter assumptions are fully removed

## Roadmap Conclusion
The safest implementation path is:
1. approve this planning package
2. build schema first
3. wire data defaults
4. connect storage
5. rebuild frontend
6. harden and validate

This order minimizes rework and keeps each class of risk isolated.

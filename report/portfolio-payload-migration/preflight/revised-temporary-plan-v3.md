# Revised Temporary Preflight Plan v3

## Purpose
This document is the final micro-refinement before generating the official Phase 01 planning package.

It intentionally does **not** implement Payload schema, frontend rendering, or the 12-file official report pack.

This v3 document only closes the last two schema ambiguities from v2:
- `homePage.about.items[]`
- `homePage.hero.floatingBadge`

It also makes `SocialLink` reuse explicit so the future schema does not drift between hero and footer.

## Scope Of This Artifact
- Applies to the current repo at `D:\Đồ án\ta-portfolio`
- Uses `reference/index.html` as the design and content source of truth
- Stays aligned with the previously locked v2 decisions:
  - `media` and `projects` collections
  - `siteSettings` and `homePage` globals
  - typed link targeting
  - icon/image/svg visual modeling
  - non-destructive `.env` handling policy
  - explicit public-read and admin-write rules
  - V1 locked to a single-page site without project detail pages

## What Stayed The Same From v2
- `LinkTarget` remains typed with `linkType: section | custom | email`
- `SocialLink` remains the reusable icon-capable social item group
- `projects` keeps `visualType: image | namedIcon | svg`
- seed/default content still mirrors `reference/index.html`
- V1 still excludes project detail pages and preview/draft mode
- `.env.example` remains the canonical placeholder template
- existing `.env` must not be silently destroyed

## What Changed From v2
- `homePage.about.items[]` is now fully defined at field level
- `homePage.hero.floatingBadge` is now fully defined at field level
- `homePage.hero.socialLinks[]` and `siteSettings.footer.socialLinks[]` are now explicitly locked to the same `SocialLink` group
- fallback rules and preferred v1 seed mode are now explicit for both structures

## Inherited v2 Baseline Decisions

### Core Content Model
- Collection: `media`
- Collection: `projects`
- Global: `siteSettings`
- Global: `homePage`

### Shared Reusable Groups
- `LinkTarget`
- `SocialLink`
- `MetaFields`

### Link Strategy
- one-page anchor links must be modeled explicitly
- section links use controlled `sectionId` values instead of freeform anchors
- custom URLs and email targets remain supported

### Access Strategy
- `siteSettings`: public read, admin update
- `homePage`: public read, admin update
- `projects`: public read only when `status = published`, admin manages all states

### Seed Strategy
- seed content should mirror the static reference honestly
- missing assets remain null
- do not invent uploads that are not present in the repo

## Explicit Reuse Rule For Social Links
Both of the following arrays must reuse the exact same `SocialLink` group definition:
- `homePage.hero.socialLinks[]`
- `siteSettings.footer.socialLinks[]`

Do not introduce separate `HeroSocialLink` or `FooterSocialLink` schemas.

Reason:
- shared validation
- shared icon handling
- shared SVG sanitization rules
- less schema drift in future edits

## Fully Specified `homePage.about`

### Group Fields
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `sectionTitle` | text | yes | Heading for the About section |
| `sectionIntro` | textarea | no | Optional intro copy above the item grid |
| `items` | array | yes | Recommended `minRows: 1` |

### `homePage.about.items[]` Field Specification
| Field | Type | Required | Condition | Notes |
| --- | --- | --- | --- | --- |
| `title` | text | yes | always | Card title |
| `description` | textarea | yes | always | Card body text |
| `visualType` | select | yes | always | Allowed: `namedIcon`, `svg`, `image`; default `namedIcon` |
| `iconName` | text or constrained select | yes | when `visualType = namedIcon` | Preferred v1 icon source |
| `svgCode` | textarea/code | yes | when `visualType = svg` | Must be sanitized before save |
| `image` | relationship -> `media` | yes | when `visualType = image` | Uses shared media alt text on the media doc |

### About Item Behavior Rules
- `namedIcon` is the preferred v1 seed/default mode because the static reference uses icon-based cards.
- `svg` is allowed for future flexibility but is not the preferred v1 mode because it adds sanitization risk.
- `image` exists to satisfy the original requirement that an editor may attach an illustrative image to an About item.
- The item model is intentionally flexible enough for later visual upgrades without schema changes.

### About Item Fallback Rules
- If `visualType = image` and the linked `image` cannot be rendered:
  1. use `iconName` if one is present
  2. otherwise use a neutral frontend default icon
- If `visualType = svg` and `svgCode` is invalid or stripped during sanitization:
  1. use `iconName` if one is present
  2. otherwise use a neutral frontend default icon
- If `visualType = namedIcon` and `iconName` is empty:
  1. use the neutral frontend default icon

### About Item Seed And Editorial Rules
- Seed the three static-reference About cards as `namedIcon` entries.
- Do not fabricate uploaded About images during seed.
- Editors may later switch any item from `namedIcon` to `image` or `svg`.
- Keep image alt text in the `media` record, not duplicated in the About item.

## Fully Specified `homePage.hero.floatingBadge`

### Group Intention
The floating badge exists in the static reference and should be present by default in V1, but it should still be removable without schema refactoring.

### `homePage.hero.floatingBadge` Field Specification
| Field | Type | Required | Condition | Notes |
| --- | --- | --- | --- | --- |
| `enabled` | checkbox | no | always | Default `true` |
| `label` | text | yes | when `enabled = true` | Small descriptor text |
| `value` | text | yes | when `enabled = true` | Main badge value |
| `iconType` | select | yes | when `enabled = true` | Allowed: `named`, `svg`, `image`; default `named` |
| `iconName` | text or constrained select | yes | when `enabled = true` and `iconType = named` | Preferred v1 icon source |
| `svgCode` | textarea/code | yes | when `enabled = true` and `iconType = svg` | Must be sanitized before save |
| `iconImage` | relationship -> `media` | yes | when `enabled = true` and `iconType = image` | Optional future customization path |

### Floating Badge Behavior Rules
- The badge is expected by default in v1 because it is part of the static reference.
- `named` is the preferred v1 visual mode.
- `svg` is permitted but secondary to `named`.
- `image` is supported for future customization, not because it is required for reference parity.

### Floating Badge Fallback Rules
- If `enabled = false`, do not render the badge.
- If `enabled = true` but the selected visual mode is incomplete:
  1. use `iconName` if one is present
  2. otherwise use a frontend default named icon suitable for an achievement/experience badge
- If `label` or `value` is empty while `enabled = true`, suppress the badge instead of rendering a broken shell.

### Floating Badge Seed Rules
- Seed the badge as enabled
- Seed `label = "Kinh nghiem"`
- Seed `value = "1+ Nam"`
- Seed `iconType = named`
- Seed a named icon matching the static-reference concept

## Remaining Readiness Check
The temporary plan is now ready to be expanded into the official Phase 01 planning package.

The remaining unknowns are implementation inputs, not planning ambiguities:
- real MongoDB credentials
- real Cloudflare R2 credentials
- final CV target
- missing hero/avatar asset referenced by `reference/index.html`

## Non-Goals Of This Document
- no schema files created
- no globals or collections implemented
- no frontend refactor started
- no environment files changed here
- no official Phase 01 report pack generated here

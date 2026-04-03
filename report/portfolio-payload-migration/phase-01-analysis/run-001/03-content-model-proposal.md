# Content Model Proposal

## Purpose
This document formalizes the v1 Payload content architecture for the portfolio migration. It inherits the locked preflight v3 decisions and turns them into an implementation-ready schema specification.

## V1 Scope Boundary
- V1 is a single-page portfolio site.
- V1 includes:
  - editable branding
  - editable one-page navigation
  - editable hero/about/skills/projects/contact/footer content
  - editable media-backed logo/avatar/project visuals
- V1 excludes:
  - dedicated project detail routes
  - project detail page templates
  - Payload preview mode
  - Payload draft versions workflow

The schema may include forward-compatible fields, but the implementation roadmap must not invent out-of-scope routes.

## Proposed Content Architecture

### Collections
- `media`
- `projects`

### Globals
- `siteSettings`
- `homePage`

### Shared Reusable Groups
- `LinkTarget`
- `SocialLink`
- `MetaFields`

## Access And Publishing Rules

### `siteSettings`
- read: public
- update: admin-only
- rationale:
  - public rendering needs branding, metadata, and navigation
  - these settings are site-wide and should not require privileged local API bypass

### `homePage`
- read: public
- update: admin-only
- rationale:
  - the public homepage must be able to fetch its section data safely

### `projects`
- read:
  - public: only documents where `status = published`
  - admin: all documents
- create/update/delete: admin-only
- rationale:
  - prevents unfinished content from leaking publicly
  - avoids introducing full preview/draft complexity in v1

### Preview/Draft Policy
- no Payload versions/draft mode in v1
- use an explicit `status` field on `projects`
- global documents are treated as the live public source

## Reusable Group Definitions

### `LinkTarget`
Use for navigation items, CTA buttons, and future footer quick links.

| Field | Type | Required | Condition | Notes |
| --- | --- | --- | --- | --- |
| `label` | text | yes | always | Display text |
| `linkType` | select | yes | always | `section`, `custom`, `email` |
| `sectionId` | select | yes | when `linkType = section` | Controlled values only |
| `url` | text | yes | when `linkType = custom` | Supports external or internal URL |
| `emailAddress` | email/text | yes | when `linkType = email` | Used to build `mailto:` |
| `openInNewTab` | checkbox | no | when `linkType = custom` | Ignored for section links |

#### Allowed `sectionId` Values
- `top`
- `about`
- `skills`
- `projects`
- `contact`

#### Rendering Rules
- `section` -> `#${sectionId}`
- `custom` -> `url`
- `email` -> `mailto:${emailAddress}`
- `openInNewTab` applies only to `custom`

#### Why This Model Is Required
The reference site is anchor-driven. A plain freeform URL field would let editors create malformed or inconsistent section targets.

### `SocialLink`
Use for both hero social links and footer social links. This group is intentionally shared and must not be duplicated.

| Field | Type | Required | Condition | Notes |
| --- | --- | --- | --- | --- |
| `label` | text | yes | always | Accessible label / tooltip |
| `linkType` | select | yes | always | `custom`, `email` |
| `url` | text | yes | when `linkType = custom` | External/social URL |
| `emailAddress` | email/text | yes | when `linkType = email` | `mailto:` target |
| `openInNewTab` | checkbox | no | when `linkType = custom` | Usually `true` for external URLs |
| `iconType` | select | yes | always | `named`, `svg`, `image` |
| `iconName` | text/select | yes | when `iconType = named` | Preferred v1 mode |
| `svgCode` | textarea/code | yes | when `iconType = svg` | Must be sanitized before save |
| `iconImage` | relationship -> `media` | yes | when `iconType = image` | Optional future customization |

#### Shared Reuse Rule
Use the exact same group definition for:
- `homePage.hero.socialLinks[]`
- `siteSettings.footer.socialLinks[]`

### `MetaFields`
Use inside `siteSettings`.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `metaTitle` | text | no | Default page title fallback |
| `metaDescription` | textarea | no | SEO description |
| `metaKeywords` | array of text | no | Optional keywords |
| `metaImage` | relationship -> `media` | no | OG / share image |
| `canonicalUrl` | text | no | Canonical override if needed |
| `robots` | text/select | no | Optional robots policy |

## Collection Proposals

### `media`
Purpose:
- logo image
- avatar image
- About item image
- project preview image
- custom social icon image
- meta image

#### Proposed Fields
Keep the current required `alt` field and consider adding only lightweight metadata in Phase 02 if needed:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `alt` | text | yes | already present, should remain required |
| `caption` | textarea | no | optional editorial helper |

#### Upload Policy
- v1 preferred uploads:
  - png
  - jpg/jpeg
  - webp
  - svg only if later explicitly approved

#### SVG Position
- prefer raw SVG text fields in controlled schema fields over uploaded SVG files in v1
- uploaded SVG support can be added later only after a separate sanitization review

### `projects`

| Field | Type | Required | Condition | Notes |
| --- | --- | --- | --- | --- |
| `title` | text | yes | always | Card title |
| `slug` | text | yes | always | Stable identifier; unique |
| `shortDescription` | textarea | yes | always | Card description |
| `fullDescription` | richText | no | always | Future-facing only; no detail page in v1 |
| `visualType` | select | yes | always | `image`, `namedIcon`, `svg` |
| `previewImage` | relationship -> `media` | yes | when `visualType = image` | True thumbnail mode |
| `iconName` | text/select | yes | when `visualType = namedIcon` | Preferred seed mode |
| `svgCode` | textarea/code | yes | when `visualType = svg` | Must be sanitized before save |
| `tags` | array of text | no | always | Tag pills |
| `sortOrder` | number | no | always | Default `0` |
| `featured` | checkbox | no | always | Default `true` for highlighted items |
| `status` | select | yes | always | `draft`, `published` |
| `buttonLabel` | text | no | always | Future-compatible |
| `buttonUrl` | text | no | always | Optional future expansion |
| `openInNewTab` | checkbox | no | when `buttonUrl` exists | CTA behavior |

#### Project Visual Rules
- Preferred v1 seed mode: `namedIcon`
- Preferred long-term editorial mode: `image`
- `svg` remains available but secondary

#### Project Visual Fallback Rules
- If `visualType = image` and `previewImage` is missing at render time:
  1. use `iconName` if available
  2. else use a neutral project fallback icon
- If `visualType = svg` and sanitization removes `svgCode`:
  1. use `iconName` if available
  2. else use a neutral project fallback icon
- If `visualType = namedIcon` and `iconName` is empty:
  1. use a neutral project fallback icon

#### Project CTA Rule
- `buttonLabel` and `buttonUrl` are modeled for future expansion
- v1 must not infer or create a detail page route from `slug`
- if `buttonLabel` exists but `buttonUrl` does not, the frontend should either suppress the link or render a non-navigating visual affordance

## Global Proposals

### `siteSettings`

#### Top-Level Fields
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `siteName` | text | yes | Canonical site name |
| `brandText` | text | yes | Text fallback when no logo is present |
| `brandLogo` | relationship -> `media` | no | Uploaded logo |
| `meta` | group (`MetaFields`) | no | Site-wide metadata |
| `navbarLinks` | array of `LinkTarget` | yes | Main desktop/mobile nav source |
| `footer` | group | yes | Footer content container |

#### `siteSettings.footer`
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `links` | array of `LinkTarget` | no | Optional footer quick links |
| `socialLinks` | array of `SocialLink` | no | Reuses shared `SocialLink` |
| `noticeText` | textarea | no | Long disclaimer / warning block |
| `copyrightText` | text | yes | Base copyright string |
| `showYear` | checkbox | no | Default `true` |
| `useCurrentYear` | checkbox | no | Default `true`; shown when `showYear = true` |
| `customYear` | number | no | Used when `showYear = true` and `useCurrentYear = false` |

#### Footer Rendering Rules
- If `brandLogo` is missing, render `brandText`
- If `showYear = true`:
  - use current year when `useCurrentYear = true`
  - use `customYear` when `useCurrentYear = false`
- If `showYear = false`, render only `copyrightText`
- Render `links` and `socialLinks` only when populated

#### Seed Rules
- `brandText` default: `Portfolio.`
- `brandLogo` seed: `null`
- `navbarLinks` seed to the four anchor links from the reference
- `footer.noticeText` seed from the long reference disclaimer
- `footer.links` seed empty
- `footer.socialLinks` seed empty
- footer year behavior should be documented during implementation review:
  - exact reference parity uses a fixed custom year `2026`
  - dynamic year display is a reasonable enhancement if approved

### `homePage`

#### `hero`
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `eyebrow` | text | no | Greeting line |
| `name` | text | yes | Main hero name |
| `roleTitle` | text | yes | Subtitle/role |
| `description` | textarea | yes | Intro copy |
| `avatar` | relationship -> `media` | no | Missing in current repo, so optional |
| `primaryCTA` | group (`LinkTarget`) | no | Usually section link to contact |
| `secondaryCTA` | group (`LinkTarget`) | no | CV or future custom destination |
| `socialLinks` | array of `SocialLink` | no | Reuses shared group |
| `floatingBadge` | group | no | Optional visual badge with default enabled |

#### `hero.floatingBadge`
| Field | Type | Required | Condition | Notes |
| --- | --- | --- | --- | --- |
| `enabled` | checkbox | no | always | Default `true` |
| `label` | text | yes | when `enabled = true` | Small descriptor |
| `value` | text | yes | when `enabled = true` | Main badge value |
| `iconType` | select | yes | when `enabled = true` | `named`, `svg`, `image` |
| `iconName` | text/select | yes | when `enabled = true` and `iconType = named` | Preferred v1 mode |
| `svgCode` | textarea/code | yes | when `enabled = true` and `iconType = svg` | Must be sanitized |
| `iconImage` | relationship -> `media` | yes | when `enabled = true` and `iconType = image` | Future customization |

#### Hero Fallback Rules
- if `avatar` is missing:
  - keep the styled placeholder container
- if `floatingBadge.enabled = false`:
  - do not render the badge
- if badge visual data is incomplete:
  - fallback to `iconName` if present
  - else use a safe default badge icon
- if badge `label` or `value` is missing:
  - suppress the badge

#### Hero Seed Rules
- seed name, role, description, and CTA labels from the reference
- seed avatar as `null`
- seed hero social links from GitHub + email in the reference
- seed floating badge as enabled with:
  - label `Kinh nghiệm`
  - value `1+ Năm`
  - visual mode `named`

#### `about`
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `sectionTitle` | text | yes | From reference |
| `sectionIntro` | textarea | no | Not present in reference, but allowed |
| `items` | array | yes | Recommended `minRows: 1` |

#### `about.items[]`
| Field | Type | Required | Condition | Notes |
| --- | --- | --- | --- | --- |
| `title` | text | yes | always | Card title |
| `description` | textarea | yes | always | Card copy |
| `visualType` | select | yes | always | `namedIcon`, `svg`, `image` |
| `iconName` | text/select | yes | when `visualType = namedIcon` | Preferred v1 mode |
| `svgCode` | textarea/code | yes | when `visualType = svg` | Must be sanitized |
| `image` | relationship -> `media` | yes | when `visualType = image` | Illustrative image support |

#### About Item Fallback Rules
- `namedIcon` is the preferred v1 seed mode
- if `visualType = image` and image fails:
  - use `iconName` if present
  - else use a neutral About fallback icon
- if `visualType = svg` and sanitization removes the SVG:
  - use `iconName` if present
  - else use a neutral About fallback icon
- if `visualType = namedIcon` and `iconName` is empty:
  - use a neutral About fallback icon

#### About Seed Rules
- seed the three existing static cards as `namedIcon`
- do not fabricate uploaded images for About cards
- keep the model flexible so editors can later switch an item to `image`

#### `skills`
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `sectionTitle` | text | yes | Section heading |
| `sectionIntro` | textarea | no | Subheading |
| `technicalSkills` | array | yes | Editable list; no percentages in data model |
| `softSkills` | array | yes | Editable list |
| `workPhilosophyTitle` | text | no | Optional callout title |
| `workPhilosophyQuote` | textarea | no | Optional quote |

#### `skills.technicalSkills[]`
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | text | yes | Skill name such as `React / Next.js` |
| `sortOrder` | number | no | Optional ordering helper |

#### `skills.softSkills[]`
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `label` | text | yes | Skill chip label |
| `sortOrder` | number | no | Optional ordering helper |

#### Skills Modeling Rule
The reference shows progress bars and percentages, but v1 intentionally does not model percentages. The future UI can present skills as labels, chips, grouped cards, or other non-progress visual treatments.

#### `projectsSection`
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `sectionTitle` | text | yes | Heading |
| `sectionIntro` | textarea | no | Intro copy |
| `viewAllLink` | group (`LinkTarget`) | no | Optional and likely unused in v1 |
| `featuredOnly` | checkbox | no | Default `true` |
| `limit` | number | no | Default `3` |

#### `contact`
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `sectionTitle` | text | yes | Contact CTA heading |
| `description` | textarea | yes | Supporting copy |
| `emailAddress` | email/text | yes | Primary contact target |
| `primaryCTA` | group (`LinkTarget`) | no | Often email-based |
| `secondaryCTA` | group (`LinkTarget`) | no | Label may be used even if behavior is later simplified |
| `copyValue` | text | no | Optional explicit clipboard value; defaults to `emailAddress` if empty |

#### Contact Modeling Rule
- `primaryCTA` can use `linkType = email`
- `secondaryCTA` may be rendered as a non-link button in v1 even if its underlying model remains link-capable for future reuse
- if `copyValue` is empty, the implementation should copy `emailAddress`

## Seed / Default Mapping Summary
- mirror the static reference where concrete values exist
- leave missing assets null
- do not fabricate media that is not in the repo
- use icon-first seed states for About items and project visuals
- keep footer quick links and footer social links empty unless the implementation phase is given new content

## Content Model Conclusion
This model supports:
- direct parity with the current reference
- safe editorial flexibility
- low-risk v1 implementation
- future growth without immediate schema rework

It deliberately avoids over-modeling areas that the reference does not prove necessary, such as multi-page project routing or full draft/preview workflows.

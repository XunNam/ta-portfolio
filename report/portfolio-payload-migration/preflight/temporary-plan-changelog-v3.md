# Temporary Plan Changelog v3

## Purpose
This changelog records the final ambiguity closures between temporary preflight plan v2 and v3.

## Changes

### 1. `homePage.about.items[]` was still underspecified in v2
- Missing ambiguity:
  - v2 declared `items[]` but did not fully lock the item field set
- Why it matters:
  - implementation would still need to invent conditional field logic
  - image/icon/svg fallback behavior could drift
  - seed content could diverge from the static reference
- Final resolved decision:
  - define each About item with:
    - `title`
    - `description`
    - `visualType`
    - `iconName`
    - `svgCode`
    - `image`
  - require fields conditionally based on `visualType`
  - prefer `namedIcon` for v1 seed content
  - use image support for future editorial flexibility

### 2. `homePage.hero.floatingBadge` was still underspecified in v2
- Missing ambiguity:
  - v2 referenced the group but did not fully define its fields and optional behavior
- Why it matters:
  - implementation would still need to guess how the badge is turned off
  - icon configuration could become inconsistent with the rest of the model
  - rendering behavior for incomplete badge data would remain unclear
- Final resolved decision:
  - define the badge with:
    - `enabled`
    - `label`
    - `value`
    - `iconType`
    - `iconName`
    - `svgCode`
    - `iconImage`
  - default `enabled = true`
  - prefer `named` icon mode in v1
  - suppress rendering if core text fields are incomplete

### 3. Social link reuse needed to be explicit
- Missing ambiguity:
  - v2 implied reuse but did not lock hero/footer social arrays to the same schema object
- Why it matters:
  - duplicated schema logic would create validation drift
  - icon and SVG handling could diverge between hero and footer
- Final resolved decision:
  - `homePage.hero.socialLinks[]` and `siteSettings.footer.socialLinks[]` must both reuse the same `SocialLink` group
  - no separate hero/footer-specific social schemas should be introduced later

## Outcome
With these three clarifications, the temporary preflight plan is now complete enough to generate the official Phase 01 planning package without further schema-shape rework.

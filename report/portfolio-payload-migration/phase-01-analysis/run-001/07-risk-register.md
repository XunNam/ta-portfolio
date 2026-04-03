# Risk Register

## Purpose
This register captures the most important risks discovered during planning and the mitigation expected during implementation.

## Risk Table

| Risk | Type | Impact | Why It Matters | Mitigation |
| --- | --- | --- | --- | --- |
| Missing hero avatar asset from `reference/index.html` | asset/content | medium | exact visual parity cannot be completed from current repo inputs | treat avatar as optional, seed `null`, render placeholder, request asset before final polish |
| Freeform anchor links could be entered incorrectly | modeling/editorial | medium | broken one-page navigation would be easy to create | use typed `LinkTarget` with controlled `sectionId` values |
| Project cards currently rely on icons, not images | modeling/parity | medium | an image-only project schema would force rework or fake seed data | keep `visualType: image | namedIcon | svg` |
| About cards may need both icons and images | modeling/parity | medium | the original requirement allows optional uploaded images | keep About item `visualType` flexible with conditional fields |
| Raw SVG can introduce XSS | security | high | unsanitized SVG can execute unwanted behavior in admin or frontend | sanitize server-side before save, reuse shared utility, keep uploaded SVG support deferred |
| Public reads could bypass access unintentionally | security | high | unpublished projects could leak if Local API access is bypassed | use explicit access rules and ensure later public reads use `overrideAccess: false` |
| `.env` could be overwritten by accident | environment | medium | local working values could be destroyed | never silently overwrite `.env`; back up first if standardization is explicitly approved |
| `DATABASE_URL` vs `DATABASE_URI` naming drift | environment/config | low | confusion during implementation could cause misconfiguration | document both names and transition deliberately in implementation |
| R2 credentials may be incomplete or incorrect | storage | high | uploads and media delivery would fail late in the process | do not claim integration works before testing with real credentials |
| `R2_PUBLIC_URL` may not match actual delivery domain | storage | medium | uploaded files may exist but frontend URLs could still break | verify public URL strategy separately from storage endpoint |
| Starter tests assert blank-template behavior | test/process | medium | tests will fail or become misleading once frontend changes | refresh tests only during implementation after schema and UI exist |
| Footer requirements could be underspecified | content/editorial | low | long disclaimer and copyright need separate editorial control | use explicit footer group with separate fields |
| Scope creep into project detail pages | scope | high | would expand routing, templates, and data requirements | lock v1 to single-page only and treat button fields as future-facing |
| Tailwind CDN implementation differs from repo stack | frontend/process | low | exact implementation approach may differ from the reference | preserve design intent rather than the exact CDN-based setup |

## Highest-Priority Risks

### 1. SVG / XSS
This is the most important technical risk because the planned model allows raw SVG in controlled fields.

Required mitigation:
- shared sanitization utility
- no direct trust of pasted SVG
- code review focused on render boundaries

### 2. Access-Control Leakage
The future `projects` collection must not leak drafts publicly.

Required mitigation:
- explicit read rules
- careful use of Local API access flags
- public rendering paths must respect collection access

### 3. Missing Runtime Inputs
Without real MongoDB and R2 credentials, the migration can be coded but not verified end to end.

Required mitigation:
- collect runtime inputs before storage validation
- keep implementation honest about what is untested

## Risk Register Conclusion
The project does not have high planning uncertainty anymore. The remaining material risks are mostly implementation and environment risks, and all of them have clear mitigation paths.

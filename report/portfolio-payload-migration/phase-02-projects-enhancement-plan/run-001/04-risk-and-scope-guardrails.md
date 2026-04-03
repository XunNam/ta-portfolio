# Risk And Scope Guardrails

## Overengineering Risks Avoided
- Did not replace the current `projects` model.
- Did not migrate `tags` to a new structure.
- Did not introduce special CTA object groups or route logic.
- Did not add new project detail schemas or detail-page assumptions.

## Scope Guardrails
- Homepage-card scope only.
- No project detail pages.
- No new routes.
- `slug` remains a content identifier, not a public routing contract.

## Seed / Compatibility Risks
- Existing seeded projects remained valid.
- No data migration or reseeding requirement was introduced.
- Current media architecture stayed intact by keeping `previewImage` tied to the shared `media` collection.

## Frontend Safety Guardrails
- Empty CTA URL continues to render a non-clickable affordance rather than fake navigation.
- Missing preview images continue to fall back gracefully.
- Published-only public access remains unchanged.

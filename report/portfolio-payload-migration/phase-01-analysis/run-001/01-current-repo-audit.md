# Current Repo Audit

## Audit Scope
This audit is based on direct inspection of the current repository and related planning inputs. It does not assume missing features exist.

## Top-Level Structure

| Path | Current Role | Notes |
| --- | --- | --- |
| `.cursor/rules/` | local context docs | Payload guidance files are present and useful for later implementation |
| `reference/` | static source of truth | Contains `index.html` only |
| `report/portfolio-payload-migration/preflight/` | preflight planning inputs | v3 preflight docs already created |
| `src/` | Next.js + Payload app source | still close to blank starter |
| `tests/` | starter integration/e2e tests | still assert blank template behavior |
| `.env` | local runtime values | exists and was not modified in this phase |
| `.env.example` | env template | expanded in this phase with placeholders |
| `docker-compose.yml` | local Mongo development helper | starter file still references Mongo service |
| `Dockerfile` | production image scaffold | starter Next standalone image setup |

## Relevant Source Files

### Payload Core
- `src/payload.config.ts`
  - uses `mongooseAdapter`
  - uses `lexicalEditor`
  - registers `Users` and `Media`
  - references `process.env.PAYLOAD_SECRET || ''`
  - references `process.env.DATABASE_URL || ''`

### Collections
- `src/collections/Users.ts`
  - starter auth collection
  - no role field
  - no custom access rules yet
- `src/collections/Media.ts`
  - upload-enabled
  - public read
  - only custom field is required `alt`

### Frontend
- `src/app/(frontend)/page.tsx`
  - default welcome screen
  - reads auth state
  - links to admin and docs
  - does not model the portfolio layout yet
- `src/app/(frontend)/layout.tsx`
  - starter metadata
  - generic `html lang="en"`
- `src/app/(frontend)/styles.css`
  - blank-starter visual style, not portfolio styling

### Payload/Admin App
- `src/app/(payload)/layout.tsx`
  - standard Payload admin layout wrapper
- `src/app/(payload)/admin/[[...segments]]/page.tsx`
  - generated Payload admin root page
- `src/app/(payload)/api/[...slug]/route.ts`
  - generated REST API routes
- `src/app/(payload)/api/graphql/route.ts`
  - generated GraphQL route
- `src/app/(payload)/api/graphql-playground/route.ts`
  - generated GraphQL playground route

### Miscellaneous Starter File
- `src/app/my-route/route.ts`
  - sample custom route
  - not part of the portfolio migration target

## Package And Stack Observations

### Confirmed Dependencies
- Payload 3.81.0
- Next 16.2.1
- React 19.2.4
- `@payloadcms/db-mongodb`
- `@payloadcms/richtext-lexical`
- `sharp`

### Missing From The Current Repo
- no Tailwind dependency in `package.json`
- no Cloudflare R2 / S3 storage adapter dependency yet
- no portfolio-specific collections or globals
- no shared field-group modules
- no content seed scripts
- no admin custom components

### Implication
The repo is currently a starter scaffold, not a partially migrated site. Phase 02 can proceed cleanly without unpicking earlier portfolio implementation work.

## Frontend And Reference Gap Analysis
- The design source of truth is entirely inside `reference/index.html`.
- The repo does **not** include the referenced hero image asset path from that file:
  - static HTML points to `./imgs/IMG_0421.PNG`
  - `reference/imgs/` does not exist
- Result:
  - hero/avatar parity cannot be finalized until the asset is supplied
  - the plan must model the avatar as optional with a fallback presentation

## Current Test Scaffolding

| Test File | Current Assumption | Migration Impact |
| --- | --- | --- |
| `tests/e2e/frontend.e2e.spec.ts` | homepage title is "Payload Blank Template" | must be rewritten later |
| `tests/e2e/admin.e2e.spec.ts` | starter admin dashboard/users flow | can be partly reused |
| `tests/int/api.int.spec.ts` | only checks that users can be fetched | too minimal for future schema validation |

### Test Risk
The current tests are not wrong for the starter, but they will become misleading after the migration starts. They should be updated only during implementation, not in this planning phase.

## Current Env And Config Observations
- `.env.example` originally documented only:
  - `DATABASE_URL`
  - `PAYLOAD_SECRET`
- `.env` exists and contains non-placeholder local values
- `.gitignore` already ignores `.env`
- Current code expects `DATABASE_URL`
- Planning direction standardizes on `DATABASE_URI` for clarity while documenting the transition

## Missing Pieces Needed For The Target Architecture
- `projects` collection
- `siteSettings` global
- `homePage` global
- shared field groups for typed links, social links, and metadata
- media storage plugin wiring for Cloudflare R2
- updated homepage frontend
- later seed/default content strategy implementation

## Risks Discovered In The Current Repo
- The starter frontend and starter tests may create false confidence if not replaced during implementation.
- The repo currently uses a minimal `media` model that is not enough for the target visual system.
- The current config name `DATABASE_URL` differs from the planned documentation name `DATABASE_URI`.
- The static reference depends on at least one missing asset.
- No access-control strategy beyond the starter defaults has been implemented yet.

## Audit Conclusion
The repo is clean, predictable, and implementation-ready from an architectural standpoint. The main missing pieces are intentional: content structure, storage wiring, final assets, and production credentials.

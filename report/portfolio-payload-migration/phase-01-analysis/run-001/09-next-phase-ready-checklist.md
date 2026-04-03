# Next-Phase Ready Checklist

## Purpose
Use this checklist before starting Phase 02 implementation.

## Implementation Mode Requirement
- Plan Mode should be off for implementation.
- The implementation phase requires real file mutations, schema work, and validation commands.
- The current planning package is intended to reduce ambiguity so implementation can proceed in normal execution mode.

## Required Inputs To Supply Next
- [ ] Real MongoDB connection string
- [ ] Real Cloudflare R2 bucket name
- [ ] Real Cloudflare R2 endpoint
- [ ] Real Cloudflare R2 access key id
- [ ] Real Cloudflare R2 secret access key
- [ ] Real public media URL / asset domain
- [ ] Final `Xem CV` destination
- [ ] Decision on whether the missing hero/avatar image will be supplied

## Planning Review Checklist
- [ ] Review `03-content-model-proposal.md`
- [ ] Confirm the typed link model is acceptable
- [ ] Confirm no project detail page should be built in v1
- [ ] Confirm icon-first project/About seed strategy is acceptable
- [ ] Confirm footer structure and disclaimer handling are acceptable
- [ ] Confirm access rules are acceptable

## Repo/Config Checklist Before Implementation
- [ ] Confirm `.env.example` is acceptable as the placeholder template
- [ ] Confirm `.env` should remain untouched until real implementation wiring begins
- [ ] Confirm the future `DATABASE_URI || DATABASE_URL` transition strategy
- [ ] Confirm Cloudflare R2 should be integrated via S3-compatible Payload storage

## Safe Execution Preconditions
- [ ] The implementer has read the preflight v3 documents
- [ ] The implementer has read this run folder in full
- [ ] The implementer understands that starter tests will need replacement
- [ ] The implementer will not invent extra scope such as project detail routes
- [ ] The implementer will keep missing assets as null/fallbacks instead of fabricating files

## Optional But Helpful Before Phase 02
- [ ] Confirm preferred footer year behavior
- [ ] Confirm whether uploaded SVG files remain deferred in v1
- [ ] Confirm whether `projectsSection.viewAllLink` should stay empty in v1

## Readiness Decision
Implementation should start only after:
- this planning package is approved
- the required runtime inputs are supplied

Once those two conditions are met, the repo is ready for Phase 02 work.

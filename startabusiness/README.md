# startabusiness · Opensourceware D:// Computer

**Repository-first formation. Business driven. Human governed.**

> Prompt → Plan → Repo^DAO → Actions → /doola → Business ↺

This is an **incubating reference implementation**, intended to graduate into a standalone `startabusiness` template repository. It does not replace doola's formation workflow, execute purchases, or create a legal DAO.

## Two starting lines
- **Bring your repository:** adopt the manifests and workflows without replacing existing software.
- **Fork Opensourceware:** copy this starter into a new GitHub repository and customize the business plan.

## Components
- `dao/constitution.json` — HUMAN://ROOT, scoped agent delegation, approval gates
- `ae/capabilities.json` — capability index and permission semantics
- `dao/qr/printer-001.json` — QR-resolved example asset, no QR bearer authorization
- `doola/services.json` — proposed discovery-only provider catalog; no live doola API
- `business/plan.md` — customizable business plan
- `.github/workflows/startabusiness-review.yml` — validate manifests and create review artifact
- `scripts/validate.mjs` — dependency-free manifest validation

## Local review
```bash
node startabusiness/scripts/validate.mjs
```

## Formation boundary
Customer reviews official doola terms and purchases through a verified provider-controlled checkout after explicit authorization. Partner attribution must use a validated PartnerStack link and must not be presented as guaranteed. No private data, credentials, formation documents, or API secrets belong in a public repository.

## Governance invariant
**Context may propagate; authority does not.** GitHub review is engineering governance, not a substitute for LLC governance or state filings.

## Collaboration
æ maintains generic Opensourceware infrastructure; doola may optionally contribute an official provider adapter or workflow after technical and commercial agreement.

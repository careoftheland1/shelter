# Shelter ecosystem launch preparation

## Purpose

Shelter, Space It, Shape It and See It are separate public experiences and independently deployed software. Shelter's launch-prep pass does not automatically make the other tools launch-ready. Each tool needs a smaller version of the same review, shaped around what that tool actually does and the risks created by its outputs.

The shared objective is one coherent ecosystem: honest claims, dependable handoffs, minimal data collection, consistent contact and privacy language, and no dead ends between tools.

## Shared launch pass

Run these checks for each public app:

1. Confirm the product pitch matches the capabilities that are live.
2. Review navigation, footer, contact and cross-tool links.
3. Add a unique title, description, canonical URL and social image.
4. Check `robots.txt`, sitemap needs, redirects and not-found behavior.
5. Test desktop and mobile layouts, keyboard use, accessibility basics and browser errors.
6. Measure initial payload, loading behavior and expensive interactions.
7. Install and verify lightweight analytics without duplicating beacons.
8. Link to a privacy notice that accurately covers the tool's data practices.
9. Test saves, imports, exports, downloads, resets and failure states.
10. Build, deploy and verify the production hostname rather than relying only on local tests.

## Tool-specific emphasis

### Shape It

Review Shape It first because its measurements, material quantities and exports are closest to construction decisions.

- Make clear which quantities are calculated and which remain assumptions.
- Verify dimension, opening, roof, material and unit calculations.
- Test project save/load, autosave, undo/redo and Space It imports.
- Test dimensioned-plan and takeoff exports across representative projects.
- Build the designed `.xlsx` project workbook in `SHAPE-IT-PROJECT-WORKBOOK.md` when approved.
- Add visible estimating and construction limitations without making the interface defensive.
- Review the large 3D/application payload and loading failures.

### Space It

- Confirm that generated arrangements are presented as explorations, not finished plans.
- Test generation, regeneration, edits, reset, save/export and handoff into Shape It.
- Verify that exported dimensions, rotations, volume states and site information survive the handoff.
- Review mobile usability for a spatial tool and clearly state any practical desktop requirement.
- Preserve and correctly attribute the design research described in the active specification.
- Treat experimental fenestration as opt-in until real exports have been reviewed in Shape It.

### See It

- Explain what the visualization preserves, what it may invent and what should not guide construction.
- Review source-image and depth-map handling, storage, retention and deletion.
- Disclose AI processing and relevant providers in the shared privacy notice.
- Test generation failures, fidelity failures, retries, credits, limits and downloads.
- Confirm real render cost and geometry fidelity before setting pricing or building billing infrastructure.
- Do not launch accounts, uploads or Stripe until their security, support and privacy paths are ready.

## Shared privacy approach

Prefer one expanded On the Land privacy notice over three near-duplicate policies. Each app should link to that notice, while the notice names the practices that differ by tool.

The current Shelter notice covers the marketing site, Cloudflare Web Analytics and email correspondence. Before the tools introduce accounts, cloud persistence, uploaded plans or images, AI processing, scheduling or Stripe, expand the notice to cover:

- Which service receives each kind of information
- Why it is processed
- Whether it is stored and for how long
- How deletion or access requests work
- International processing where applicable
- Payment, scheduling, authentication and email providers
- Whether uploaded material is used for model training

## Recommended order

1. **Shape It** — core calculations, project files, exports and construction-facing language.
2. **Space It** — generation, editing and a dependable Shape It handoff.
3. **See It** — fidelity gate first, followed by privacy-sensitive backend and billing work only if the gate passes.

## Current documents waiting for a go

### Shelter repository

- `STARTING-POINT-FLOW.md` — implement Stripe Payment Link and post-payment scheduling for the $200 Starting Point session.
- `SHAPE-IT-PROJECT-WORKBOOK.md` — implement the populated, editable `.xlsx` export in Shape It.
- `ANALYTICS-AND-ERROR-REPORTING.md` — Cloudflare analytics and the privacy notice are live; the minimal Sentry phase remains optional and unstarted.
- `SHELTER-ECOSYSTEM-LAUNCH-PREP.md` — run the launch-prep passes described here, beginning with Shape It.

### Shape It repository

- `FUTURE-BUILDS.md` — choose whether and when to build adjustable roof pitch, the foundation estimator and interior partitions.

### See It documents in the Shape It repository

- `NEXT-PHASE-BACKEND-BILLING.md` — build-ready specification for fidelity evaluation, identity, storage, rendering, credits and billing.
- `EXECUTION-CHECKLIST.md` — operational sequence for that specification; Phase 0 requires explicit approval and paid Replicate usage before infrastructure work begins.

### Space It repository

- `spec/fenestration-addendum-v1.md` together with `spec/fenestration-resolutions-v2.md` — implement the experimental, opt-in drylands fenestration export into Shape It.
- `spec/fenestration-research-brief.md` — supporting design/research record for the fenestration build; reference rather than a separate implementation authorization.

## Documents not waiting for a new go

- Repository `README.md` files describe the current projects.
- Shelter's `archive/` documents are intentionally parked.
- Space It's `REPAIR-QUEUE.md` currently says nothing is outstanding.
- Space It's compound-lattice specifications and gate addendum are retained as the design and implementation record; they are not counted here as a new launch authorization.
- Shape It's `archive/README.md` is archival.

## Go boundaries

A “go” should name the document and the release slice. Paid services, production accounts, DNS changes, sending email, accepting payments and storing user uploads still require the relevant account setup and explicit authorization even when their implementation is already specified.

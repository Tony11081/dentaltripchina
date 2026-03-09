---
name: dtc-site-imagery
description: Audit, generate, and wire illustrations for the DentalTripChina Next.js website. Use when working in this repository and the user asks to decide where images are needed, refresh page or card visuals, run OpenClaw with baoyu-article-illustrator or baoyu-image-gen, update the site image manifest, replace old /editorial/*.svg references, or verify that generated assets are fully connected to app/ and components/.
---

# DTC Site Imagery

Use this skill only for the DentalTripChina repository. The site-level image pipeline already exists; reuse it instead of inventing a parallel flow.

## Core Files

- Use [../../lib/site-images.ts](../../lib/site-images.ts) as the single source of truth for generated asset ids, prompts, alts, aspect ratios, and helper lookups.
- Use [../../scripts/generate-site-images.ts](../../scripts/generate-site-images.ts) to batch-generate or selectively regenerate assets.
- Use [../../components/card-media.tsx](../../components/card-media.tsx) for card-level imagery.
- Use [../../image-requirements.json](../../image-requirements.json) as the current image slot inventory.

## Workflow

1. If the user wants a fresh placement judgment, run OpenClaw locally with `baoyu-article-illustrator`. Use the prompt template in [references/workflow.md](references/workflow.md).
2. Update `lib/site-images.ts` first. Add or edit asset entries, prompts, alts, and helper mappings there before touching pages.
3. Generate images with `npx -y bun scripts/generate-site-images.ts --force` or a scoped `--only <asset-id>`.
4. Visually inspect a representative sample with `view_image`. Reject images with readable text, fake UI labels, nameplates, charts with letters, gore, or broken anatomy.
5. Wire assets into pages and cards through `pageImageAssets` and helper functions, not hardcoded string duplication.
6. Remove stale `/editorial/*.svg` references and confirm metadata `imagePath` values follow the generated assets.
7. Run the coverage check script and finish with `npx eslint app components lib data scripts --max-warnings=0` plus `npm run build`.

## Rules

- Keep prompts premium, calm, editorial, and non-graphic.
- Explicitly ban readable text in prompts. Portraits need an extra ban on nameplates, certificates, screens, eye charts, and printed documents.
- Prefer one shared asset manifest over page-local constants.
- Reuse existing generated assets on low-value policy pages unless the user asks for bespoke artwork.
- If one generated image is bad, regenerate only that asset instead of rerunning the whole set.

## References

- Read [references/workflow.md](references/workflow.md) for prompt templates, file map, and final QA checklist.
- Run [scripts/check-image-coverage.sh](scripts/check-image-coverage.sh) after edits to surface stale references and missing generated files.

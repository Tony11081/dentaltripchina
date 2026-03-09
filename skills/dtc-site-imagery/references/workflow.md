# Workflow

## OpenClaw Planning Prompt

Use this when the user wants a fresh image placement plan:

```text
Use the baoyu-article-illustrator skill to analyze this DentalTripChina Next.js repository.
Focus on app/ and components/.
Return a structured image plan covering:
- page heroes
- editorial banners
- procedure cards
- hospital cards
- case study cards
- city-guide cards
- author portraits
For each slot, give a stable id, recommended asset type, subject, composition notes, prompt direction, and priority.
Avoid decorative filler. Prefer images that reduce scanning friction or increase trust.
```

Recommended command pattern:

```bash
openclaw agent --local --agent main --json --thinking low --timeout 180 --message "<prompt>"
```

## Repo File Map

- `lib/site-images.ts`: add all generated assets here first
- `scripts/generate-site-images.ts`: generation entrypoint
- `components/card-media.tsx`: reusable card image wrapper
- `app/page.tsx`: homepage hero and city guide cards
- `app/[slug]/page.tsx`: procedure and city guide detail pages
- `app/hospital/[slug]/page.tsx`: hospital detail pages
- `app/blog/[slug]/page.tsx`: article cover and article schema image
- `app/blog/category/[slug]/page.tsx`: category hero and article cards
- `app/authors/page.tsx` and `app/authors/[slug]/page.tsx`: author banners and portraits

## Wiring Pattern

1. Update metadata `imagePath` to the generated asset.
2. Pass hero art through `heroImageSrc` and `heroImageAlt`.
3. Use helper functions for dynamic pages:
   - `getBlogPostImage`
   - `getBlogCategoryImage`
   - `getProcedureImage`
   - `getHospitalImage`
   - `getCaseStudyImage`
   - `getCityGuideImage`
   - `getAuthorPortrait`
4. Use `CardMedia` for card grids instead of ad hoc image markup.

## QA Checklist

- `rg -n '/editorial/' app components data lib -g '!public/**'` returns nothing.
- `view_image` checks pass on:
  - one homepage or hero image
  - one hospital or procedure image
  - one author portrait
- `public/generated/` contains the expected assets and no test leftovers.
- `npx eslint app components lib data scripts --max-warnings=0` passes.
- `npm run build` passes.

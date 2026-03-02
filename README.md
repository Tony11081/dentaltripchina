# DentalTripChina (Non-WordPress Implementation)

This repository now includes a full **Next.js** implementation of the requirement document (`DentalTripChina Architecture.docx`) without using WordPress.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Server API routes for forms
- Optional SMTP email via Nodemailer
- Nginx reverse proxy for production

## What is implemented

- Required URL structure:
  - `/`
  - `/about`
  - `/how-it-works`
  - `/hospitals`
  - `/pricing`
  - `/contact`
  - `/testimonials`
  - `/thank-you` (noindex)
  - `/transport`
  - `/hotels`
  - `/china-visa-free-medical-tourism`
  - `/blog`
  - `/blog/{slug}`
  - `/blog/category/{slug}`
  - `/{procedure-slug}` root-level procedure pages
  - `/{city-guide-slug}` root-level city guide pages
  - `/hospital/{slug}` hospital detail pages
- Form logic:
  - Inquiry form with required fields, honeypot, server validation, auto reply
  - Transport quote form with conditional airport + return date
- SEO and schema:
  - Per-page metadata
  - MedicalProcedure / FAQPage / Hospital / Article JSON-LD
  - `robots.ts` + `sitemap.ts`
- Analytics hooks:
  - GA4 script support (`NEXT_PUBLIC_GA_ID`)
  - form and WhatsApp click events
- Ops:
  - Nginx config for main domain
  - Redirect domain config (`gochinamedtrip.com -> dentaltripchina.com`)
  - Systemd service template for running Next.js

## Project structure

- App routes: `app/`
- Components: `components/`
- Content/data: `data/`
- Helpers: `lib/`
- Deployment config: `ops/`

## Quick start

1. Install dependencies:
   - `npm install`
2. Copy env template:
   - `cp .env.example .env.local`
3. Start dev server:
   - `npm run dev`
4. Build and run production:
   - `npm run build`
   - `npm run start`

## Environment variables

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `DTC_OPERATOR_EMAIL`
- `DTC_SMTP_HOST`
- `DTC_SMTP_PORT`
- `DTC_SMTP_USER`
- `DTC_SMTP_PASS`
- `DTC_SMTP_SECURE`

`DTC_OPERATOR_EMAIL` is required for inquiry submissions.  
If it is missing, the API returns `503` to prevent silent lead loss.

## Deployment notes

- Run the app on port `3000` via systemd/pm2.
- Use `ops/nginx/dentaltripchina.conf` as reverse proxy.
- Use `ops/nginx/gochinamedtrip-redirect.conf` for redirect domain.

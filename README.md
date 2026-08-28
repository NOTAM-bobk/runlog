# RunLog

A focused weekly running log for Sawyer, powered by Garmin snapshots.

## What is included

- / — searchable home page with week navigation and a transparent first-sync state
- /week/YYYY-MM-DD — permanent URL for each training week
- Installable PWA with browser and Apple icons
- Offline shell caching for the home screen
- app/data/garmin.ts — source of truth for normalized Garmin weeks

## Structure

- app/components/week-browser.tsx — client-side week search and navigation
- app/manifest.ts — web app manifest and install metadata
- public/sw.js — small service worker for offline shell support
- lib/garmin/ — Garmin data schema and normalization helpers

## Vercel

This is a standard Next.js app and is ready to deploy on Vercel.

1. Import NOTAM-bobk/runlog into Vercel.
2. Framework preset: Next.js (Vercel should detect it automatically).
3. Build command: next build.
4. No environment variables are required for the current version.

To add a new week, add a normalized object to garminWeeks in app/data/garmin.ts. Each week automatically gets its own URL based on its slug.

RunLog intentionally does not show placeholder training values: only Garmin snapshot data is rendered.

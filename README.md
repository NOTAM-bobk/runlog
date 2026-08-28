# RunLog

A simple weekly running-coach site for Sawyer.

## Structure

- `/` — minimal home page with week navigation and search field
- `/week/YYYY-MM-DD` — permanent URL for each training week
- `app/data/weeks.ts` — source of truth for weekly plans

## Vercel

This is a standard Next.js app and is ready to deploy on Vercel.

1. Import `NOTAM-bobk/runlog` into Vercel.
2. Framework preset: **Next.js** (Vercel should detect it automatically).
3. Build command: `next build`.
4. No environment variables are required for the current version.

To add a new week, add a new object to `weeks` in `app/data/weeks.ts`. Each week automatically gets its own URL based on its `slug`.

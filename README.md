# npm.sounakdas.in

Personal npm package portfolio — a registry-style showcase of all public packages published by [Sounak Das](https://sounakdas.in) on npm.

Live at **[npm.sounakdas.in](https://npm.sounakdas.in)**

---

## Stack

- React 19 + TypeScript + Vite
- Framer Motion for animations
- Plain CSS (no Tailwind)
- Bun as package manager

## Getting started

```bash
bun install
bun run dev
```

## Commands

| Command | What it does |
|---|---|
| `bun run dev` | Start local dev server |
| `bun run build` | Type-check + build to `dist/` |
| `bun run sync` | Fetch live data from npm API and update `src/data/` |
| `bun run deploy` | Sync live data, then build |

## How data works

All content is static JSON — no runtime API calls.

- [`src/data/packages.json`](src/data/packages.json) — package metadata (name, description, version, download counts, tags, links, color, icon)
- [`src/data/site.json`](src/data/site.json) — author info and site metadata

The sync script (`scripts/sync-packages.js`) hits the npm downloads API and registry to refresh download counts, versions, and publish dates — then writes the results back to the JSON files. Run `bun run sync` before a deploy to keep numbers accurate.

## Adding a new package

1. Add an entry to `src/data/packages.json`:

```json
{
  "id": "package-name",
  "name": "package-name",
  "description": "One sentence description.",
  "version": "1.0.0",
  "weeklyDownloads": 0,
  "totalDownloads": 0,
  "license": "MIT",
  "tags": ["tag1", "tag2"],
  "npm": "https://www.npmjs.com/package/package-name",
  "github": "https://github.com/sounakdas/package-name",
  "homepage": "https://...",
  "publishedAt": "2026-01-01",
  "color": "#hexcolor",
  "icon": "PN"
}
```

2. Pick a distinct `color` (hex) — used for card accents and icon backgrounds. `icon` is a 2-letter abbreviation shown in the card.

3. Run `bun run sync` to populate real download counts.

The tag filter bar, hero marquee, and SEO structured data all update automatically from the data.

## Project structure

```
src/
  components/       React components (one .css per component)
  data/             packages.json + site.json
  types.ts          TypeScript interfaces
scripts/
  sync-packages.js  npm API sync script
public/
  favicon.svg
  og.svg            Social preview card (1200×630)
  robots.txt
  sitemap.xml
```

## Deployment

Hosted on Vercel. Push to `main` and Vercel deploys automatically.

The build command is `bun run deploy` — it fetches fresh download counts and versions from the npm API before building, so every deployment has up-to-date data.

Config lives in [`vercel.json`](vercel.json).

## License

MIT

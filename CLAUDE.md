# npm.sounakdas.in — Claude Instructions

## What this project is
A static npm author portfolio site — a registry-style showcase of public npm packages published by Sounak Das. Built with React + TypeScript + Vite. No backend, no database, no auth.

## Stack
- **Framework:** React 19 + TypeScript + Vite
- **Animations:** Framer Motion
- **Package manager:** Bun
- **Fonts:** Space Grotesk (body), JetBrains Mono (code/mono)
- **Styling:** Plain CSS modules (one `.css` per component, no Tailwind, no CSS-in-JS)

## Key commands
```bash
bun run dev       # local dev server
bun run build     # TypeScript check + Vite build (no network calls)
bun run sync      # fetch live data from npm API → update src/data/
bun run deploy    # sync + build (what CI should run)
```

## Data layer
All content lives in two JSON files — no API calls at runtime.

- `src/data/packages.json` — one object per package: name, description, version, weeklyDownloads, totalDownloads, publishedAt, tags, npm/github/homepage URLs, color, icon
- `src/data/site.json` — author info (name, github, website, npm, tagline) and meta (title, description, verifiedAt)

`scripts/sync-packages.js` hits the npm downloads API + registry API and rewrites both files with fresh data. It also bumps `verifiedAt` and the `<lastmod>` in `public/sitemap.xml`.

## Adding a new package
1. Run `bun run sync` — if the package is already on npm under `sounakdas`, add it to `packages.json` manually first (sync will then keep it updated).
2. Add an entry to `src/data/packages.json`:
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
3. Pick a distinct hex `color` (used for card accents, icon backgrounds). `icon` is a 2-letter abbreviation shown in the card avatar.
4. Run `bun run sync` to populate real download counts.

## Component structure
```
src/components/
  Header.tsx / .css         — sticky nav
  HeroScene.tsx / .css      — hero with stats panel, cycling npm command, marquee ticker
  AboutStrip.tsx / .css     — author bio between hero and grid
  PackageGrid.tsx / .css    — filterable package grid
  PackageModal.tsx / .css   — detail modal (opens on card click)
  Footer.tsx / .css         — simple footer
  Seo.tsx                   — injects JSON-LD structured data into <head>
```

## CSS conventions
- Global variables in `src/index.css` under `:root` — use them (`var(--accent)`, `var(--font-mono)`, etc.), don't hardcode values
- Accent color: `#cb3837` (npm red) via `var(--accent)`
- Each component has its own `.css` file — no shared utility classes
- `color-mix()` used for derived colors (card borders, icon backgrounds) — this requires a modern browser, which is fine for this portfolio

## SEO
- Static meta tags in `index.html` (title, description, OG, Twitter)
- JSON-LD structured data injected by `src/components/Seo.tsx` — `Person` + `WebSite` + `ItemList` of `SoftwareSourceCode`
- `public/sitemap.xml` and `public/robots.txt` are in public/
- `public/og.svg` is the social preview card (1200×630)

## Deployment
Hosted on Vercel. Config is in `vercel.json`:
- **Build command:** `bun run deploy` — runs the npm sync script then builds. This means every Vercel deployment pulls fresh download counts and versions from the npm registry automatically.
- **Output directory:** `dist/`
- **Install command:** `bun install`

`dist/` is gitignored — Vercel builds from source, never commit the built files.

To deploy: push to `main` → Vercel picks it up automatically.

## What NOT to do
- Do not add Three.js or heavy 3D libraries — they were removed intentionally (bundle size)
- Do not add a backend or runtime API calls — keep it fully static
- Do not add routing — this is a single-page site, no need
- Do not use Tailwind or CSS-in-JS — plain CSS only
- Do not hardcode download counts or version numbers — they come from `packages.json`, kept fresh by the sync script

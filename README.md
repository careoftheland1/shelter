# Shelter on the Land

The public website for [shelter.onthe.land](https://shelter.onthe.land): free plans, browser-based design tools and experienced guidance for small rammed-earth and lavacrete shelters.

## Public pages

- `/` — Shelter on the Land landing page
- `/shelters/the-four-walls/` — The Four Walls
- `/shelters/the-courtyard/` — The Courtyard
- `/shelters/the-long-house/` — The Long House
- `/plans/` — the Shelter building language
- `/tools/` — Space It, Shape It and See It workflow
- `/packages/` — free plans and paid ways of working
- `/offgrid/` — small off-grid and off-pipe systems
- `/privacy/` — website privacy notice

Shelter School is preserved in `src/SchoolPage.jsx` for a later phase but is not part of the public site. Requests to `/school` are redirected home by `public/_redirects`.

## Related tools

The design tools are separate applications:

- [spaceit.onthe.land](https://spaceit.onthe.land) — arrange rooms and courtyards
- [shapeit.onthe.land](https://shapeit.onthe.land) — create a measured model and preliminary material takeoff
- [See It](https://shapeit.onthe.land/see-it.html) — visualize light, material and place

Their source code is maintained outside this repository.

## Development

Requirements: a current Node.js release and npm.

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run lint
npm run preview
```

The production build is written to `dist/`.

## Architecture

This is a Vite and React single-page application. `src/App.jsx` selects a page from `window.location.pathname`; larger pages are lazy-loaded into separate chunks.

Key files:

- `src/App.jsx` — route selection and landing page
- `src/ShelterPage.jsx` — the three shelter detail pages and 3D model viewer
- `src/OffgridPage.jsx` — building-language page
- `src/ToolsPage.jsx` — design-tools workflow
- `src/PackagesPage.jsx` — support and commission paths
- `src/OffgridSystemsPage.jsx` — off-grid systems page
- `src/PrivacyPage.jsx` — website privacy notice
- `src/SiteFooter.jsx` — shared footer
- `src/PageMeta.jsx` — route-specific titles, descriptions and canonical URLs
- `src/index.css` — sitewide and page-specific styles

## Public assets and routing

Files in `public/` are copied directly into the production build.

- `_redirects` defines Cloudflare Pages redirects and valid SPA rewrites.
- `404.html` is the branded not-found page.
- `robots.txt` and `sitemap.xml` provide crawler guidance.
- `downloads/` contains public plan and specification downloads.

Photographic assets used by the live site have full-size and 800-pixel WebP variants. Original PNG source images remain in `src/assets/`.

## Metadata and social images

Every live route sets a unique title, description and canonical URL through `PageMeta`. Open Graph and Twitter titles, descriptions and URLs follow the same page metadata.

The site currently shares `public/thumbnail.jpg` as its social image. Page-specific social images can be added later by extending `PageMeta` with an image property.

## Planning documents

- `STARTING-POINT-FLOW.md` — proposed Stripe and scheduling flow for the $200 Starting Point session
- `SHAPE-IT-PROJECT-WORKBOOK.md` — designed XLSX export specification for Shape It
- `ANALYTICS-AND-ERROR-REPORTING.md` — launch analytics, monitoring and privacy posture
- `archive/` — preserved earlier sections and implementation notes

## Deployment

The production site is hosted on Cloudflare Pages and deployed from the repository. Before publishing a significant change:

1. Run `npm run build`.
2. Run `npm run lint`.
3. Check `git diff --check`.
4. Review the landing, shelter, tools, plans and packages pages at desktop and mobile widths.
5. Verify downloads, email links and external tool destinations.

## Construction notice

Shelter plans, model quantities, cost ranges and planning documents are preliminary resources. They are not permits or final engineering. Site conditions, materials, assemblies and applicable codes must be verified locally with the authority having jurisdiction and qualified professionals where required.

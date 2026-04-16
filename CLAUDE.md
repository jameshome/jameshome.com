# jameshome.com — Claude Instructions

Astro >< Obsidian-based worldview billboard

## Tech Stack

- **Framework:** Astro (v5+) — static site generation
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **Typography:** `@tailwindcss/typography` (prose plugin)
- **Content:** Obsidian vault loaded via `astro-loader-obsidian`
- **Formatting:** Prettier with `prettier-plugin-astro` and `prettier-plugin-tailwindcss`
- **TypeScript:** strict mode (`astro/tsconfigs/strict`)
- **Hosting:** Netlify (see `public/_redirects`)

## Development Commands

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build static site to dist/
npm run preview  # Preview production build locally
```

## Project Structure

```
src/
  assets/        # WOFF2 font files
  components/    # Reusable Astro components
  content/       # Content collections
    vagabondage/ # Git submodule — Obsidian vault (jameshome/vagabondage)
  layouts/       # Page layout templates
  pages/         # File-based routing
    notes/       # Dynamic routes from Obsidian docs
  styles/
    global.css   # Custom Tailwind theme variables and fonts
public/          # Static assets (SVGs, images, _redirects)
```

## Content Management

Notes and writing live in a separate Obsidian vault repository (`src/content/vagabondage/` submodule). Do not edit vault content directly in this repo — changes belong in the `vagabondage` repo. A GitHub Actions workflow (`sync.yml`) auto-syncs on `repository_dispatch` events with type `notes_updated`.

The `documents` content collection is loaded by `astro-loader-obsidian` and made available at `/notes/[slug]`.

## Styling Conventions

Custom theme variables defined in `src/styles/global.css`:

- `--font-serif`: EB Garamond — body text
- `--font-sans`: Barlow Semi Condensed — UI elements
- `--color-graphite`: `rgba(42, 57, 61, 1)` — primary dark
- `--color-red`: `rgba(226, 0, 0, 1)` — accent/links

The `Prose` component wraps content in Tailwind typography styles with customized red links and list markers.

## Components

- `Homestars.astro` — decorative star separator
- `Timeline.astro` — career/milestone timeline
- `Prose.astro` — typography wrapper for markdown content

## Git Workflow

- Main branch: `main`
- Worktrees for Claude work: `.claude/worktrees/`
- Submodule: `src/content/vagabondage` → `git@github.com:jameshome/vagabondage.git`
- Auto-sync commits use message: `chore: auto-sync vagabondage`

## Important Notes

- Vite is pinned to 6.4.1 via `overrides` in package.json — do not change this without testing
- The `.astro/` generated types directory is gitignored; run `npm run dev` to regenerate
- Format files with Prettier before committing — Tailwind class order is auto-sorted

## Submodule / Netlify Auth

**Do not change `.gitmodules` to use HTTPS.** The `vagabondage` submodule must use the SSH URL (`git@github.com:jameshome/vagabondage.git`). HTTPS fails on Netlify for private repos because there are no credentials available at clone time.

Netlify accesses the submodule via a deploy key:
1. Netlify deploy key lives at: **Site settings → Build & deploy → Deploy key**
2. That key must be present in: **`jameshome/vagabondage` → Settings → Deploy keys**

If Netlify builds start failing with submodule auth errors, check that the deploy key is still present in `vagabondage` — it may have been removed.

# JAMES HOME

Astro >< Obsidian-based worldview billboard

## Architecture

```
jameshome/vagabondage     →     jameshome/jameshome.com     →     Netlify
  (Obsidian repo)                  (this repo)                  (build + deploy)
       ↓                                  ↑
  Obsidian plugin                  repository_dispatch
  fires webhook                    (notes_updated)
```

1. Notes are written and edited in Obsidian
2. An Obsidian plugin fires a webhook when notes change
3. The webhook triggers a `repository_dispatch` event on this repo
4. The `sync.yml` GitHub Actions workflow pulls the updated submodule and commits it
5. The commit triggers a Netlify build, which builds and deploys the site

## Tech Stack

- **Framework:** Astro — static site generation
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **Typography:** `@tailwindcss/typography` (prose plugin)
- **Content:** Obsidian vault loaded via `astro-loader-obsidian`
- **Hosting:** Netlify

## Project Structure

```
src/
  assets/        # WOFF2 font files
  components/    # Reusable Astro components
  content/
    vagabondage/ # Git submodule — Obsidian vault (jameshome/vagabondage)
  layouts/       # Page layout templates
  pages/         # File-based routing
    notes/       # Dynamic routes from Obsidian docs
  styles/
    global.css   # Custom Tailwind theme variables and fonts
public/          # Static assets (SVGs, images, _redirects)
.github/
  workflows/
    sync.yml     # Pulls updated submodule and commits on notes_updated dispatch
```

## Development

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Build static site to dist/
npm run preview  # Preview production build locally
```

## Secrets & Keys

### GitHub Actions (`sync.yml`)

`GH_PAT` must be set in **both repos**:

- `jameshome/jameshome.com` → Settings → Secrets and variables → Actions
- `jameshome/vagabondage` → Settings → Secrets and variables → Actions

The PAT is used by `sync.yml` to pull the submodule and push the updated commit, and by `vagabondage`'s workflow to fire the `repository_dispatch` event.

### Netlify Submodule Access

`vagabondage` is a private repo. Netlify accesses it via a deploy key:

1. Copy the deploy key from **Netlify → Site settings → Build & deploy → Deploy key**
2. Add it to **`jameshome/vagabondage` → Settings → Deploy keys** (read-only)

The submodule URL in `.gitmodules` must use SSH (`git@github.com:jameshome/vagabondage.git`). Do not change it to HTTPS — Netlify has no credentials to clone a private repo over HTTPS.

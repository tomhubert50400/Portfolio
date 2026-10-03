# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with hot reload
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
npm run lint      # ESLint across .js/.jsx files
npm test          # Playwright browser regression tests with mocked services
```

Use Node.js 22+ (24 in `.nvmrc`) and `npm ci`. Copy `.env.example` to
`.env.local` for local development and supply the existing public Supabase URL
and anon/publishable key. Never commit environment secrets or put privileged
keys/passwords in `VITE_` variables. Browser tests supply placeholders and mock
backend requests; install Chromium with `npx playwright install chromium`.

## Architecture

Single-page React 18 portfolio site (JavaScript/JSX, no TypeScript) built with Vite 6. No client-side router: navigation uses anchor links (`#about`, `#projects`, `#contact`) with smooth scrolling, and `#admin` selects the admin screen.

**Entry flow:** `main.jsx` → `App.jsx` (loads i18n) → `Home.jsx` (assembles all sections sequentially)

**Sections rendered in order:** Header → Banner (hero) → About → Projects → Contact → Footer

### Key Patterns

- **Styling:** styled-components v6 exclusively. Styles are co-located in each component file. CSS variables defined in `index.css` (`--background-black`, `--purple-color`, `--white`) are referenced inside styled templates. Main responsive breakpoint: `1023.99px`.
- **Internationalization:** i18next with three languages (EN/FR/KO). UI strings live in `src/config/i18n.js` as inline translation resources. Language cycles EN→FR→KO→EN via a flag button in the nav. Preference stored in `localStorage` as `"preferredLanguage"`.
- **Project data:** `ProjectCards.jsx` reads the `projects` table using `src/lib/supabaseClient.js` and selects translated fields with `i18n.language`. `src/assets/data.json` is a legacy static dataset, not the live data source.
- **Admin:** `AdminPage.jsx` loads and reorders projects; `AdminProjectForm.jsx` creates/edits them and uploads images through existing Supabase Edge Functions. Server-side password checks and database policies live outside this repository and must enforce authorization; the local admin form does not establish server authentication.
- **Contact form:** Submits to Formspree (`formspree.io`) via `fetch` with `FormData`. No backend.
- **Modals:** `react-modal` in `ProjectCards.jsx` for project detail popups with a manual image carousel.

### Vite Config

`base: "./"` — relative asset paths for static hosting compatibility.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with hot reload
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
npm run lint      # ESLint across .js/.jsx files
```

No test framework is configured.

## Architecture

Single-page React 18 portfolio site (JavaScript/JSX, no TypeScript) built with Vite 5. No client-side router — navigation uses anchor links (`#about`, `#projects`, `#contact`) with smooth scrolling.

**Entry flow:** `main.jsx` → `App.jsx` (loads i18n) → `Home.jsx` (assembles all sections sequentially)

**Sections rendered in order:** Header → Banner (hero) → About → Projects → Contact → Footer

### Key Patterns

- **Styling:** styled-components v6 exclusively. Styles are co-located in each component file. CSS variables defined in `index.css` (`--background-black`, `--purple-color`, `--white`) are referenced inside styled templates. Main responsive breakpoint: `1023.99px`.
- **Internationalization:** i18next with three languages (EN/FR/KO). UI strings live in `src/config/i18n.js` as inline translation resources. Language cycles EN→FR→KO→EN via a flag button in the nav. Preference stored in `localStorage` as `"preferredLanguage"`.
- **Project data:** `src/assets/data.json` holds all project entries with per-language title/description fields. `ProjectCards.jsx` reads `i18n.language` directly to select the correct field (not via i18next resources).
- **Contact form:** Submits to Formspree (`formspree.io`) via `fetch` with `FormData`. No backend.
- **Modals:** `react-modal` in `ProjectCards.jsx` for project detail popups with a manual image carousel.

### Vite Config

`base: "./"` — relative asset paths for static hosting compatibility.

# Portfolio Website

A modern, responsive portfolio website built with React and Vite, featuring multi-language support and a showcase of personal projects.

## ✨ Features

- 🌐 **Multi-language Support** - Available in English, French, and Korean using i18next
- 📱 **Fully Responsive** - Optimized for desktop and mobile devices
- 🎨 **Modern UI/UX** - Built with styled-components for a polished design
- 🚀 **Fast Performance** - Powered by Vite for lightning-fast development and builds
- 📦 **Project Showcase** - Interactive project cards with image carousels
- 📧 **Contact Form** - Integrated contact section for easy communication
- 🎯 **SEO Optimized** - Clean structure and semantic HTML

## 🛠️ Tech Stack

### Core

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Styled Components** - CSS-in-JS styling

### Libraries & Tools

- **i18next** & **react-i18next** - Internationalization
- **react-modal** - Modal components
- **@supabase/supabase-js** - Project data from the existing Supabase backend
- **prop-types** - Runtime component prop validation
- **@fontsource/dm-sans** - Custom typography

## Local setup and checks

Use Node.js 22 or newer (Node.js 24 is selected by `.nvmrc`). From this directory:

```bash
npm ci
cp .env.example .env.local
# Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY for the existing project.
npm run dev
```

Only put the project's public anon/publishable key in the browser environment.
Never put a service-role key or admin password in a `VITE_` variable. Project
reads require the existing database policies; administrative writes must be
authorized by the deployed Supabase Edge Functions. Those functions and their
security policies are not part of this repository. The admin screen's local
password form is not a server-side authentication boundary.

```bash
npm run lint
npm run build
npm audit
npx playwright install chromium
npm test
```

Browser tests use local placeholder configuration, mock project responses and
images, and block backend writes. They do not require or validate production
credentials or services. To use an existing Chromium installation, set
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. GitHub Actions runs
the same lint, build, audit and browser checks on pull requests and main.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── assets/          # Images, icons, and data files
│   ├── components/       # Reusable React components
│   ├── config/          # Configuration files (i18n)
│   ├── pages/           # Page components
│   ├── sections/        # Main section components
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── tests/               # Isolated browser regression tests
├── dist/                # Production build output
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## 🌍 Internationalization

The portfolio supports three languages:

- 🇬🇧 English
- 🇫🇷 French
- 🇰🇷 Korean

Language preference is saved in localStorage and persists across sessions.

## 📝 License

This project is private and personal.

## 👤 Author

Built with ❤️ as a personal portfolio showcase.

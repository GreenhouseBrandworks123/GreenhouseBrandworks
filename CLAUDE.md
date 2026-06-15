# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `frontend/` directory:

```bash
npm run dev       # Start dev server at localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

## Architecture

**React + Vite SPA** deployed on Vercel. All source code lives in `frontend/src/`.

### Routing

There is **no React Router**. Page routing is handled manually in `App.jsx` via a `currentPage` useState. Pages are rendered conditionally, and `setCurrentPage` is passed as a prop to `Header` and any component that needs to navigate. `vercel.json` rewrites all routes to `index.html` for SPA support.

### Pages

`src/pages/` contains: `Home`, `Services`, `Portfolio`, `About`, `Careers`, `Contact`. Each is a standalone component receiving `setCurrentPage` and `darkMode` as props.

### Styling

Pure CSS with CSS custom properties — no Tailwind, no CSS-in-JS. Global design tokens (`--bg`, `--text`, `--accent`, `--border`, etc.) are defined in `index.css`. Dark mode is toggled by adding/removing the `.dark` class on `<html>`, which flips the CSS variable values. Theme preference is persisted in `localStorage`.

### Firebase Integration

`src/firebase.js` initializes Firebase. `src/firebaseUtils.js` exports the helper functions used by forms:
- **Firestore**: contact submissions (`contactSubmissions` collection) and job applications (`jobApplications` collection)
- **Cloud Storage**: resume and portfolio file uploads (`resumes/`, `portfolios/` paths)

Firebase credentials are loaded from `.env.local` (gitignored). See `.env.example` for required variable names and `FIREBASE_SETUP.md` for full setup instructions.

### reCAPTCHA

Google reCAPTCHA v2 (`react-google-recaptcha`) is used on the Careers page application form. The site key is stored in an env variable.

### Key Components

- `Header.jsx` — navigation, theme toggle, mobile menu
- `Modal.jsx` — reusable modal used by Services (detail view) and Careers (application form)
- `Lightbox.jsx` — full-screen image viewer used in Portfolio
- `SVGIcon.jsx` — centralized SVG icon system; add new icons here rather than inline SVGs

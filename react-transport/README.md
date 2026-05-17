# League of Legends Champions Hub

League of Legends Champions Hub is a React and Vite single-page application. The project was fully migrated from the earlier static HTML/CSS version, and the React app is now the only active version of the project.

## Overview

The application brings multiple League of Legends themed modules together under a single client-side routed experience:

- Home
- Champions
- Lore
- Updates
- Quiz
- Auth
- Profile
- Draft Builder
- Counter Analyzer
- About Us

## Tech Stack

- React
- Vite
- React Router
- CSS
- ESLint

## Features

- Multi-page SPA architecture with React Router
- Shared layout structure with reusable styling utilities
- Riot Data Dragon integration for champion data
- Champion browsing, filtering, and detail modal flow
- LocalStorage-based auth and profile persistence
- Quiz flow
- Draft Builder with live analysis and PDF export
- Counter Analyzer with enemy team pressure analysis
- Responsive layouts for mobile, tablet, and desktop

## Routes

- `/`
- `/champions`
- `/lore`
- `/updates`
- `/quiz`
- `/auth`
- `/profile`
- `/draft-builder`
- `/counter-analyzer`
- `/about-us`

## Project Structure

```text
react-transport/
  public/
  src/
    assets/
    components/
    data/
    pages/
    styles/
    utils/
    App.jsx
    main.jsx
  package.json
  vite.config.js
```

## API Usage

The project mainly uses Riot Data Dragon data.

Example endpoint:

```text
https://ddragon.leagueoflegends.com/cdn/16.8.1/data/en_US/championFull.json
```

This data is used in:

- Champions page
- Profile favorite composition picker
- Draft Builder analysis flow
- Counter Analyzer analysis flow

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Default local address:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Notes

- The legacy static HTML/CSS version has been removed from the active project structure.
- User session and profile data are currently stored in `localStorage`.
- `node_modules` and `dist` should not be included in final submission archives.
- This project is intended for course and final project use.

## Known Limitations

- PDF export behavior may vary depending on browser and device support.
- Authentication is frontend-only and does not use a real backend.
- Some large image assets can still be optimized further.

## Future Improvements

- Backend and database integration
- Real authentication flow
- Automated tests
- Stronger form validation
- Public deployment
- Further performance and asset optimization

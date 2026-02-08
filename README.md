# UEFA Champions League Players & Statistics

A Next.js application that displays UEFA Champions League players and their statistics using the ESPN API.

## Features

- **Player Profiles** — Browse detailed profiles for Champions League athletes
- **Search & Filter** — Find players by name, position, nationality, or team
- **Player Details** — View individual player pages with personal info and stats
- **Responsive Design** — Mobile-first design using Tailwind CSS
- **API Proxy** — Server-side API routes to handle ESPN data fetching
- **Loading States** — Skeleton loading UI for seamless experience
- **Error Handling** — Graceful error boundaries and user-friendly messages

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Fetching:** SWR (client), Axios (server)
- **API:** ESPN Sports Core API

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/athletes/       # API proxy routes
│   ├── players/            # Players listing & detail pages
│   ├── error.tsx           # Error boundary
│   ├── layout.tsx          # Root layout with nav & footer
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # Reusable UI components
│   ├── FilterPanel.tsx
│   ├── LoadingSkeleton.tsx
│   ├── PlayerCard.tsx
│   ├── PlayerGrid.tsx
│   ├── SearchBar.tsx
│   └── StatsTable.tsx
├── hooks/                  # Custom React hooks
│   ├── useAthleteDetails.ts
│   ├── useAthletes.ts
│   └── useFilteredAthletes.ts
├── lib/api/                # API service layer
│   └── espn.ts
└── types/                  # TypeScript interfaces
    └── athlete.ts
```

## API

The app uses the ESPN Sports Core API:

- **Base URL:** `https://sports.core.api.espn.com/v2/sports/soccer/leagues/uefa.champions`
- **Athletes List:** `/athletes?limit=1000`
- **Athlete Details:** `/athletes/{id}`

API requests are proxied through Next.js API routes at `/api/athletes` to avoid CORS issues.

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_ESPN_API_BASE_URL=https://sports.core.api.espn.com/v2/sports/soccer/leagues/uefa.champions
```

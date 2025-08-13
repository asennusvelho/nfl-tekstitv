# nfl-tekstitv

Monorepo for a Next.js app that renders NFL scores in a Teletext-style grid with live data from ESPN's API.

## What's inside

- apps/web: Next.js 14 (App Router, TS), TailwindCSS, ESLint/Prettier
- packages/core: Domain types and adapters (ESPN API + mock fixtures)
- Shared TS base config and path aliases
- Testing: Vitest (unit + component) and Playwright (E2E)
- CI: GitHub Actions for lint, type-check, unit/component, and E2E tests

## Requirements

- Node.js LTS (recommended)
- pnpm 10.14.x (workspace is pinned via packageManager)

## Install

```bash
pnpm install
```

## Develop

Run the app with live ESPN data:

```bash
pnpm dev:espn
```

Or with mock data for development:

```bash
pnpm dev:mock
```

Open http://localhost:3000/2025/week/1

## Scripts

- pnpm dev: start dev server (uses default data source)
- pnpm dev:mock: start dev with mock data
- pnpm dev:espn: start dev with live ESPN API data
- pnpm lint: lint web app (fails on warnings)
- pnpm lint:fix: automatically fix linting errors
- pnpm format: format code with Prettier
- pnpm format:check: check code formatting
- pnpm fix: run format + lint:fix (auto-fix all issues)
- pnpm check: run all checks (format, lint, type-check, tests)
- pnpm type-check: TS type checking across packages
- pnpm build: build the web app
- pnpm build:mock: build with mock data
- pnpm build:espn: build with ESPN API data
- pnpm start: start prod server
- pnpm test:unit: run unit tests across packages
- pnpm test:unit:cov: run unit tests with coverage
- pnpm playwright:install: install Playwright browsers
- pnpm test:e2e: run E2E tests
- pnpm test:e2e:mock: run E2E with mock data
- pnpm test:e2e:espn: run E2E with ESPN API data

## Testing details

- Unit tests (core/web) via Vitest. Coverage optional via apps/web script `test:unit:cov`.
- Component tests under apps/web/test with jsdom + RTL.
- E2E via Playwright:
  - Local: Playwright starts next dev automatically.
  - CI: Builds first and runs next start (prod) for stability.
  - Supports both mock and ESPN data sources for testing.
  - Base URL defaults to http://127.0.0.1:3000 and DATA_SOURCE=mock by default.

## Teletext page

Route: `/[season]/week/[week]` renders `TeletextGrid` using either live ESPN data or mock scores from `packages/core/fixtures`.

Example: http://localhost:3000/2025/week/1

## CI

Workflow runs on push/PR:

1. Install deps with a cached pnpm store (frozen lockfile)
2. Lint and type-check
3. Unit and component tests
4. Install Playwright browsers, build web, run E2E tests (with mock data for stability)

## Notes

- Tailwind and PostCSS configs use CJS to avoid ESM module issues in type:module projects.
- Next config is ESM (next.config.mjs) and transpiles the core workspace package.
- Path alias `@core/*` maps to `packages/core/src/*`.

## Data sources

The app supports multiple data sources via the `NEXT_PUBLIC_DATA_SOURCE` Environment Variable:

- `espn` – live scores from ESPN's public API
- `mock` – local fixtures from `packages/core/fixtures` (default for dev and CI)

## Data Sources

The application supports multiple data sources:

### Mock Data (Default)

Uses fixtures from `packages/core/fixtures` for development and testing.

```bash
pnpm dev:mock
# or set environment variable
NEXT_PUBLIC_DATA_SOURCE=mock pnpm dev
```

### ESPN API (Live Data)

Integrates with ESPN's public NFL scoreboard API for real-time game data.

```bash
# Use convenient script
pnpm dev:espn

# Or set environment variable manually
NEXT_PUBLIC_DATA_SOURCE=espn pnpm dev
```

Or create a `.env.local` file:

```
NEXT_PUBLIC_DATA_SOURCE=espn
```

**API Details:**

- Endpoint: `http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard`
- Data includes: game schedules, live scores, game status, team information
- Supports all NFL weeks (1-18) and seasons
- No authentication required

## Local development with mock data

```bash
pnpm dev:mock
# → serves mock data from packages/core/fixtures
```

You can edit fixture JSON files to test different game states, including:

- Upcoming games (status: "SCHEDULED")
- Live games with partial scores (status: "IN_PROGRESS")
- Completed games (status: "FINAL")

Changes are picked up without restarting the dev server.

## Browser support

Tested on latest Chrome, Firefox, and Safari.
E2E suite runs on Chromium in CI for speed and determinism.

## Accessibility & UX

- High contrast teletext theme
- Monospace font with fixed cell grid
- Touch swipe and keyboard navigation between weeks
- Responsive layout optimized for mobile

## Roadmap

- ✅ Week-by-week navigation with keyboard shortcuts
- ✅ Live API data source (ESPN integration)
- ✅ Real-time NFL game data with scores, status, and timing
- Enhanced game information display
- Auto-refresh for live games
- Season overview page
- Improved error handling and loading states
- Team- and season-level stats views
- Game history view (scoring timeline)
- Minimal AWS backend for ingest + DynamoDB history

## License

MIT

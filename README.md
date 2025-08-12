# nfl-tekstitv

Monorepo for a Next.js app that renders NFL scores in a Teletext-style grid.
You can edit fixture JSON fi## Roadmap

## Roadmap
• ✅ Week-by-week navigation with keyboard shortcuts
• Integrate live API data source
• Team- and season-level stats views
• Game history view (scoring timeline)
• Minimal AWS backend for ingest + DynamoDB history test different game states, including:

- Upcoming games (status: "SCHEDULED")
- Live games with partial scores (status: "IN_PROGRESS")
- Completed games (status: "FINAL")hat’s inside
• Minimal AWS backend for ingest + DynamoDB history
• Test different game states, including:
  - Upcoming games (status: "SCHEDULED")
  - Live games with partial scores (status: "IN_PROGRESS")
  - Completed games (status: "FINAL")
- apps/web: Next.js 14 (App Router, TS), TailwindCSS, ESLint/Prettier
- packages/core: Domain types and adapters (mock fixture reader)
- Shared TS base config and path aliases
- Testing: Vitest (unit + component) and Playwright (E2E)
- CI: GitHub Actions for lint, type-check, unit/component, and E2E (mock)

## Requirements

- Node.js LTS (recommended)
- pnpm 10.14.x (workspace is pinned via packageManager)

## Install

```bash
pnpm install
```

## Develop

Run the app with mock data:

```bash
pnpm dev:mock
```

Open http://localhost:3000/2025/week/1

## Scripts

- pnpm dev: start dev server
- pnpm dev:mock: start dev with mock data
- pnpm lint: lint web app (fails on warnings)
- pnpm lint:fix: automatically fix linting errors
- pnpm format: format code with Prettier
- pnpm format:check: check code formatting
- pnpm fix: run format + lint:fix (auto-fix all issues)
- pnpm check: run all checks (format, lint, type-check, tests)
- pnpm type-check: TS type checking across packages
- pnpm build: build the web app
- pnpm start: start prod server
- pnpm test:unit: run unit tests across packages
- pnpm test:unit:cov: run unit tests with coverage
- pnpm playwright:install: install Playwright browsers
- pnpm test:e2e: run E2E tests
- pnpm test:e2e:mock: run E2E (defaults to mock data)

## Testing details

- Unit tests (core/web) via Vitest. Coverage optional via apps/web script `test:unit:cov`.
- Component tests under apps/web/test with jsdom + RTL.
- E2E via Playwright:
  - Local: Playwright starts next dev automatically.
  - CI: Builds first and runs next start (prod) for stability.
  - Base URL defaults to http://127.0.0.1:3000 and DATA_SOURCE=mock by default.

## Teletext page

Route: `/[season]/week/[week]` renders `TeletextGrid` using mock scores from `packages/core/fixtures`.

Example: http://localhost:3000/2025/week/1

## CI

Workflow runs on push/PR:

1. Install deps with a cached pnpm store (frozen lockfile)
2. Lint and type-check
3. Unit and component tests
4. Install Playwright browsers, build web, run E2E (mock)

## Notes

- Tailwind and PostCSS configs use CJS to avoid ESM module issues in type:module projects.
- Next config is ESM (next.config.mjs) and transpiles the core workspace package.
- Path alias `@core/*` maps to `packages/core/src/*`.


## Data sources

The app supports multiple data sources via the `DATA_SOURCE` env variable:

- `mock` – local fixtures from `packages/core/fixtures` (default for dev and CI)
- `api` – live scores from a backend adapter (to be implemented)

## Local mock development

```bash
pnpm dev:mock
# → serves mock data from packages/core/fixtures
```

You can edit fixture JSON files to test different game states, including:

- Upcoming games (status: “SCHEDULED”)
- Live games with partial scores (status: "IN_PROGRESS")
- Completed games (status: “FINAL”)

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

- Integrate live API data source
- Team- and season-level stats views
- Game history view (scoring timeline)
- Minimal AWS backend for ingest + DynamoDB history

## License

MIT

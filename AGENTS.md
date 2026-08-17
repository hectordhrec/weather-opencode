# AGENTS.md

## Runtime & Toolchain

- **Bun only** — never use Node, npm, npx, yarn, pnpm, or vite.
  - Run: `bun <file>` | Install: `bun install` | Test: `bun test` | Type-check: `bunx tsc --noEmit`
  - Build binary: `bun build --compile index.ts --outfile weather`
  - Bun auto-loads `.env` files — no dotenv package needed.

## Project Structure

- Single-file app: `index.ts` (entry point). No `src/` or `lib/` directories.
- ESM (`"type": "module"`). Strict TypeScript with `verbatimModuleSyntax` — use explicit `type` keyword on type-only imports.

## Commands

No scripts defined in `package.json` yet. Use direct Bun commands above.

## API

- **Open-Meteo** (free, no auth required):
  - Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1&language=es&format=json`
  - Forecast: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m`

## Conventions

- TypeScript strict mode with `noFallthroughCasesInSwitch`, `noUncheckedIndexedAccess`, `noImplicitOverride` enabled.
- Target: ESNext, module resolution: bundler mode.
- Cursor rules in `.cursor/rules/` enforce Bun-native patterns — follow them.

## Status

Scaffolded only (`bun init`). No app logic, tests, linter, or CI configured yet.

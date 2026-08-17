# AGENTS.md

## Runtime & Toolchain

- **Bun only** — never use Node, npm, npx, yarn, pnpm, or vite.
  - Run: `bun <file>` | Install: `bun install` | Test: `bun test` | Type-check: `bunx tsc --noEmit`
  - Build binary: `bun build --compile index.ts --outfile weather`
  - Bun auto-loads `.env` files — no dotenv package needed.

## Project Structure

- Entry point: `index.ts`. Modules in `src/` (`types.ts`, `storage.ts`, `geocoding.ts`, `forecast.ts`, `readline.ts`, `menu.ts`).
- ESM (`"type": "module"`). Strict TypeScript with `verbatimModuleSyntax` — use explicit `type` keyword on type-only imports.

## Commands

No scripts defined in `package.json` yet. Use direct Bun commands above.

## Config & Persistence

- App stores data in `~/.config/weather-cli/config.json` (cities, default city, temperature units).
- Uses `node:fs`, `node:path`, `node:os` for config management — no external storage libraries.

## API

- **Open-Meteo** (free, no auth required):
  - Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1&language=es&format=json`
  - Forecast: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m`

## Conventions

- TypeScript strict mode with `noFallthroughCasesInSwitch`, `noUncheckedIndexedAccess`, `noImplicitOverride` enabled.
- Target: ESNext, module resolution: bundler mode.
- Cursor rules in `.cursor/rules/` enforce Bun-native patterns — follow them.

## Status

CLI weather app implemented. No tests, linter, or CI configured yet.

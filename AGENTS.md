# AGENTS.md

## Runtime & Toolchain

- **Bun only** — never use Node, npm, npx, yarn, pnpm, or vite.
  - Run: `bun <file>` | Install: `bun install` | Test: `bun test` | Type-check: `bunx tsc --noEmit`
  - Build binary: `bun build --compile index.ts --outfile weather`
  - Bun auto-loads `.env` files — no dotenv package needed.

## Project Structure

- Entry point: `index.ts`. Modules in `src/` (`types.ts`, `storage.ts`, `geocoding.ts`, `forecast.ts`, `readline.ts`, `menu.ts`, `colors.ts`, `spinner.ts`, `weather-codes.ts`).
- ESM (`"type": "module"`). Strict TypeScript with `verbatimModuleSyntax` — use explicit `type` keyword on type-only imports.

## Commands

No scripts defined in `package.json` yet. Use direct Bun commands above.

## Config & Persistence

- App stores data in `~/.config/weather-cli/config.json` (cities, default city, temperature units).
- Uses `node:fs`, `node:path`, `node:os` for config management — no external storage libraries.

## API

- **Open-Meteo** (free, no auth required):
  - Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=5&language=es&format=json`
  - Forecast (current): `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m`
  - Forecast (7 días): `.../forecast?latitude={lat}&longitude={lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days={days}`
    - `timezone=auto` is required so each city's dates match its own local day, not UTC.
    - The `daily` payload is parallel arrays; index them by position.

## Conventions

- TypeScript strict mode with `noFallthroughCasesInSwitch`, `noUncheckedIndexedAccess`, `noImplicitOverride` enabled.
- Target: ESNext, module resolution: bundler mode.
- Cursor rules in `.cursor/rules/` enforce Bun-native patterns — follow them.
- **Colores ANSI** en `src/colors.ts`: `cyan()` (menú), `yellow()` (temperatura), `green()` (éxito ✓), `red()` (error ⚠). Sin dependencias externas.
- **Los módulos de `src/` nunca lanzan excepciones.** Toda función de datos devuelve un centinela (`null` escalar, `[]` lista) y `index.ts` muestra el error con `red(...)`. Mantener ese contrato al añadir features.
- **Presentación pura en `src/menu.ts`** (`show*`), **datos en `src/weather-codes.ts`** (mapa WMO → emoji + etiqueta en español). No mezclar.
- `src/spinner.ts` tiene un timer singleton a nivel de módulo: no es concurrency-safe. Para varias peticiones en paralelo usar `spinStart`/`spinStop` alrededor de un `Promise.all`, no `spin.run`.

## Status

CLI weather app implemented, including the 7-day forecast (menu option 6). No tests, linter, or CI configured yet.

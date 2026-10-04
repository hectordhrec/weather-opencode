# AGENTS.md

## Runtime & Toolchain

- **Bun only** — never use Node, npm, npx, yarn, pnpm, or vite.
  - Run: `bun <file>` | Install: `bun install` | Test: `bun test` | Type-check: `bunx tsc --noEmit`
  - Build binary: `bun build --compile src/index.ts --outfile weather`
  - Bun auto-loads `.env` files — no dotenv package needed.

## Project Structure

Entry point: `src/index.ts`. Capas en `src/` (las dependencias fluyen en este orden: `types` ← `utils` ← `api`/`presentation` ← `storage` ← `actions` ← `index`).

| Carpeta         | Responsabilidad                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------- |
| `types/`        | Contratos: `City.ts`, `Weather.ts` (`DailyForecast`, `Units`, `WeatherDescription`), `Config.ts`, `MenuOption.ts`, `index.ts` (barrel con `export type`). |
| `utils/`        | `colors.ts`, `constants.ts` (URLs de la API, `DEFAULT_CONFIG`, `LINE`, frames del spinner), `format.ts` (`formatTemp`, `formatLocation`, `formatDate`, `defaultMarker`), `weather-codes.ts` (mapa WMO). |
| `api/`          | `geocoding.ts`, `weather.ts`. Clientes HTTP de Open-Meteo; devuelven centinelas, nunca lanzan.        |
| `storage/`      | `jsonStore.ts` (primitivas JSON + rutas), `citiesStorage.ts`, `settingsStorage.ts`.                 |
| `presentation/` | `menu.ts` (vistas del menú), `output.ts` (mensajes al usuario), `input.ts` (prompts + validación), `spinner.ts`. |
| `actions/`      | Un archivo por opción del menú: `getWeather.ts`, `getDailyForecast.ts`, `addCity.ts`, `removeCity.ts`, `setDefaultCity.ts`, `listCities.ts`, `settings.ts`. |

- ESM (`"type": "module"`). Strict TypeScript with `verbatimModuleSyntax` — use explicit `type` keyword on type-only imports.

## Commands

`bun run start` | `bun run dev` (watch) | `bun run build` (binario `weather`). Sin tests, linter ni CI.

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
- **Colores ANSI** en `src/utils/colors.ts`: `cyan()` (menú), `yellow()` (temperatura), `green()` (éxito ✓), `red()` (error ⚠). Sin dependencias externas.
- **Los módulos de `src/` nunca lanzan excepciones.** Toda función de datos devuelve un centinela (`null` escalar, `[]` lista) y la capa que la consume muestra el error con `showError`/`showErrorBlock`. Mantener ese contrato al añadir features.
- **Las `actions/` orquestan**: importan `api/`, `storage/` y `presentation/`, mutan el `Config` recibido y devuelven `Promise<void>`; `src/index.ts` se limita a armar el `Config` y despachar el `switch` de `MenuOption`.
- **Presentación pura en `src/presentation/menu.ts`** (`showMenu`/`showWeather`/`showDailyForecast`), **mensajes en `presentation/output.ts`**, **datos WMO en `src/utils/weather-codes.ts`** (emoji + etiqueta en español). No mezclar.
- `src/presentation/spinner.ts` tiene un timer singleton a nivel de módulo: no es concurrency-safe. Para varias peticiones en paralelo usar `spinStart`/`spinStop` alrededor de un `Promise.all`, no `spin.run`.

## Status

CLI weather app implemented, including the 7-day forecast (menu option 6). Structure refactored into `types`/`utils`/`api`/`storage`/`presentation`/`actions`. No tests, linter, or CI configured yet.

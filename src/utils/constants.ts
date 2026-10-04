import type { Config } from "../types/Config";

export const LINE = "═".repeat(40);

export const DEFAULT_CONFIG: Config = {
  cities: [],
  defaultCity: null,
  units: "celsius",
};

export const CONFIG_FILE_NAME = "config.json";

export const FORECAST_DAYS = 7;
export const GEOCODING_COUNT = 5;

export const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";
export const FORECAST_API_URL = "https://api.open-meteo.com/v1/forecast";

export const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
export const SPINNER_FRAME_MS = 80;

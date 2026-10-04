export interface City {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

export interface Config {
  cities: City[];
  defaultCity: string | null;
  units: "celsius" | "fahrenheit";
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
}

export const DEFAULT_CONFIG: Config = {
  cities: [],
  defaultCity: null,
  units: "celsius",
};

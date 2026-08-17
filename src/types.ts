export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Config {
  cities: City[];
  defaultCity: string | null;
  units: "celsius" | "fahrenheit";
}

export const DEFAULT_CONFIG: Config = {
  cities: [],
  defaultCity: null,
  units: "celsius",
};

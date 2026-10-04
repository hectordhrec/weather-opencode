import type { City } from "./City";
import type { Units } from "./Weather";

export interface Config {
  cities: City[];
  defaultCity: string | null;
  units: Units;
}

export interface Settings {
  defaultCity: string | null;
  units: Units;
}

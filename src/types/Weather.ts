export type Units = "celsius" | "fahrenheit";

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationProbability: number;
}

export interface WeatherDescription {
  emoji: string;
  label: string;
}

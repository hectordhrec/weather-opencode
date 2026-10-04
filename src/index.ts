import type { Config } from "./types/Config";
import { addCity } from "./actions/addCity";
import { getAllCitiesDailyForecast } from "./actions/getDailyForecast";
import { getAllCitiesWeather, getDefaultCityWeather } from "./actions/getWeather";
import { removeCity } from "./actions/removeCity";
import { setDefaultCity } from "./actions/setDefaultCity";
import { openSettings } from "./actions/settings";
import { promptMenuOption } from "./presentation/input";
import { showMenu } from "./presentation/menu";
import { showFarewell } from "./presentation/output";
import { loadCities } from "./storage/citiesStorage";
import { loadSettings } from "./storage/settingsStorage";
import { DEFAULT_CONFIG } from "./utils/constants";

async function loadConfig(): Promise<Config> {
  const [cities, settings] = await Promise.all([loadCities(), loadSettings()]);
  return { ...DEFAULT_CONFIG, cities, ...settings };
}

async function main(): Promise<void> {
  const config = await loadConfig();

  while (true) {
    showMenu(config.cities.length, config.units);

    const option = await promptMenuOption("  Selecciona una opción: ");

    switch (option) {
      case "1":
        await getDefaultCityWeather(config);
        break;
      case "2":
        await getAllCitiesWeather(config);
        break;
      case "3":
        await addCity(config);
        break;
      case "4":
        await removeCity(config);
        break;
      case "5":
        await setDefaultCity(config);
        break;
      case "6":
        await getAllCitiesDailyForecast(config);
        break;
      case "8":
        await openSettings(config);
        break;
      case "9":
        showFarewell();
        process.exit(0);
      default:
        break;
    }
  }
}

main();

import type { City, Config } from "./src/types";
import { DEFAULT_CONFIG } from "./src/types";
import { getConfigPath, loadJson, saveJson } from "./src/storage";
import { prompt } from "./src/readline";
import { geocode } from "./src/geocoding";
import { getWeather } from "./src/forecast";
import { showMenu, showWeather } from "./src/menu";
import { cyan, green, red } from "./src/colors";
import { start as spinStart, stop as spinStop, run as spin } from "./src/spinner";

async function loadConfig(): Promise<Config> {
  const configPath = getConfigPath("config.json");
  const data = await loadJson<Config>(configPath);
  return { ...DEFAULT_CONFIG, ...data };
}

async function saveConfig(config: Config): Promise<void> {
  const configPath = getConfigPath("config.json");
  await saveJson(configPath, config);
}

function formatTemp(celsius: number, units: string): string {
  if (units === "fahrenheit") {
    return `${((celsius * 9) / 5 + 32).toFixed(1)}°F`;
  }
  return `${celsius.toFixed(1)}°C`;
}

function formatLocation(city: City): string {
  const parts = [city.name];
  if (city.admin1) parts.push(city.admin1);
  if (city.country) parts.push(city.country);
  return parts.join(", ");
}

async function handleDefaultWeather(config: Config): Promise<void> {
  if (!config.defaultCity) {
    console.log(red("\n  ⚠ No hay ciudad por defecto configurada.\n"));
    return;
  }
  const city = config.cities.find((c) => c.name === config.defaultCity);
  if (!city) {
    console.log(red(`\n  ⚠ La ciudad "${config.defaultCity}" no está registrada.\n`));
    return;
  }
  const temp = await spin(`Obteniendo clima de ${city.name}...`, () => getWeather(city.latitude, city.longitude));
  if (temp === null) {
    console.log(red("\n  ⚠ No se pudo obtener el clima.\n"));
    return;
  }
  showWeather(city.name, formatTemp(temp, config.units));
}

async function handleAllCitiesWeather(config: Config): Promise<void> {
  if (config.cities.length === 0) {
    console.log(red("\n  ⚠ No hay ciudades registradas.\n"));
    return;
  }
  console.log("");
  for (const city of config.cities) {
    spinStart(`Obteniendo clima de ${city.name}...`);
    const temp = await getWeather(city.latitude, city.longitude);
    spinStop();
    if (temp !== null) {
      const def = city.name === config.defaultCity ? " ★" : "";
      showWeather(`${city.name}${def}`, formatTemp(temp, config.units));
    } else {
      console.log(red(`  ${city.name}: Error al obtener clima`));
    }
  }
  console.log("");
}

async function handleAddCity(config: Config): Promise<Config> {
  const name = await prompt("\n  Nombre de la ciudad: ");
  if (!name.trim()) {
    console.log(red("  ⚠ Nombre no válido.\n"));
    return config;
  }

  const results = await spin(`Buscando "${name}"...`, () => geocode(name.trim()));
  if (results.length === 0) {
    console.log(red("  ⚠ Ciudad no encontrada.\n"));
    return config;
  }

  let selected: City;
  if (results.length === 1) {
    selected = results[0]!;
  } else {
    console.log(`\n  Se encontraron varias ciudades:`);
    results.forEach((c, i) => {
      console.log(`    ${i + 1}. ${formatLocation(c)}`);
    });
    const input = await prompt("\n  Selecciona una opción: ");
    const idx = parseInt(input, 10) - 1;
    if (isNaN(idx) || idx < 0 || idx >= results.length) {
      console.log(red("  ⚠ Opción no válida.\n"));
      return config;
    }
    selected = results[idx]!;
  }

  const exists = config.cities.some(
    (c) => c.name.toLowerCase() === selected!.name.toLowerCase()
  );
  if (exists) {
    console.log(red(`  ⚠ "${selected!.name}" ya está registrada.\n`));
    return config;
  }

  config.cities.push({
    name: selected!.name,
    latitude: selected!.latitude,
    longitude: selected!.longitude,
    country: selected!.country,
    admin1: selected!.admin1,
  });

  if (config.cities.length === 1) {
    config.defaultCity = selected!.name;
    console.log(green(`  ✓ "${formatLocation(selected!)}" agregada como ciudad por defecto.\n`));
  } else {
    console.log(green(`  ✓ "${formatLocation(selected!)}" agregada.\n`));
  }

  await saveConfig(config);
  return config;
}

async function handleDeleteCity(config: Config): Promise<Config> {
  if (config.cities.length === 0) {
    console.log(red("\n  ⚠ No hay ciudades registradas.\n"));
    return config;
  }

  console.log("\n  Ciudades registradas:");
  config.cities.forEach((c, i) => {
    const def = c.name === config.defaultCity ? " (default)" : "";
    console.log(`    ${i + 1}. ${c.name}${def}`);
  });

  const input = await prompt("\n  Número de la ciudad a eliminar: ");
  const idx = parseInt(input, 10) - 1;

  if (isNaN(idx) || idx < 0 || idx >= config.cities.length) {
    console.log(red("  ⚠ Opción no válida.\n"));
    return config;
  }

  const removed = config.cities.splice(idx, 1)[0]!;
  if (config.defaultCity === removed.name) {
    config.defaultCity = config.cities.length > 0 ? config.cities[0]!.name : null;
    if (config.defaultCity) {
      console.log(green(`  ✓ "${removed.name}" eliminada. Default ahora: ${config.defaultCity}\n`));
    } else {
      console.log(green(`  ✓ "${removed.name}" eliminada. No hay default.\n`));
    }
  } else {
    console.log(green(`  ✓ "${removed.name}" eliminada.\n`));
  }

  await saveConfig(config);
  return config;
}

async function handleSetDefault(config: Config): Promise<Config> {
  if (config.cities.length === 0) {
    console.log(red("\n  ⚠ No hay ciudades registradas.\n"));
    return config;
  }

  console.log("\n  Ciudades disponibles:");
  config.cities.forEach((c, i) => {
    const def = c.name === config.defaultCity ? " (actual default)" : "";
    console.log(`    ${i + 1}. ${c.name}${def}`);
  });

  const input = await prompt("\n  Número de la nueva ciudad default: ");
  const idx = parseInt(input, 10) - 1;

  if (isNaN(idx) || idx < 0 || idx >= config.cities.length) {
    console.log(red("  ⚠ Opción no válida.\n"));
    return config;
  }

  config.defaultCity = config.cities[idx]!.name;
  console.log(green(`  ✓ Default cambiado a "${config.defaultCity}".\n`));
  await saveConfig(config);
  return config;
}

async function handleSettings(config: Config): Promise<Config> {
  const current = config.units === "celsius" ? "°C" : "°F";
  const next = config.units === "celsius" ? "°F" : "°C";
  console.log(`\n  Unidades actuales: ${current}`);
  const input = await prompt(`  Cambiar a ${next}? (s/n): `);
  if (input.toLowerCase() === "s") {
    config.units = config.units === "celsius" ? "fahrenheit" : "celsius";
    await saveConfig(config);
    console.log(green(`  ✓ Unidades cambiadas a ${next}.\n`));
  } else {
    console.log("  Sin cambios.\n");
  }
  return config;
}

async function main(): Promise<void> {
  let config = await loadConfig();

  while (true) {
    showMenu(config.cities.length, config.units);

    const option = await prompt("  Selecciona una opción: ");

    switch (option) {
      case "1":
        await handleDefaultWeather(config);
        break;
      case "2":
        await handleAllCitiesWeather(config);
        break;
      case "3":
        config = await handleAddCity(config);
        break;
      case "4":
        config = await handleDeleteCity(config);
        break;
      case "5":
        config = await handleSetDefault(config);
        break;
      case "8":
        config = await handleSettings(config);
        break;
      case "9":
        console.log(cyan("\n  ¡Hasta luego! 👋\n"));
        process.exit(0);
      default:
        console.log(red("\n  ⚠ Opción no válida.\n"));
    }
  }
}

main();

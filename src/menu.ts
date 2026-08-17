import { cyan, yellow } from "./colors";

const LINE = "═".repeat(40);

export function showMenu(cityCount: number, units: string): void {
  const unitLabel = units === "celsius" ? "°C" : "°F";
  console.log(cyan(`
${LINE}
         WEATHER CLI
${LINE}
  1. Clima de ciudad default
  2. Clima de todas las ciudades (${cityCount})
  3. Buscar y agregar ciudad
  4. Eliminar ciudad
  5. Establecer ciudad default
  8. Ajustes (${unitLabel})
  9. Salir
${LINE}`));
}

export function showWeather(city: string, temp: string): void {
  console.log(`  Clima en ${city}: ${yellow(temp)}`);
}

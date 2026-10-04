import type { City } from "../types/City";
import { cyan, green, red } from "../utils/colors";
import { formatLocation } from "../utils/format";

export function showError(message: string): void {
  console.log(red(`  ⚠ ${message}\n`));
}

export function showErrorBlock(message: string): void {
  console.log(red(`\n  ⚠ ${message}\n`));
}

export function showDetailError(message: string): void {
  console.log(red(`  ${message}`));
}

export function showSuccess(message: string): void {
  console.log(green(`  ✓ ${message}\n`));
}

export function showTitle(message: string): void {
  console.log(`\n  ${message}`);
}

export function showOptionLine(index: number, text: string): void {
  console.log(`    ${index + 1}. ${text}`);
}

export function showMessage(message: string): void {
  console.log(message);
}

export function showBlankLine(): void {
  console.log("");
}

export function showFarewell(): void {
  console.log(cyan("\n  ¡Hasta luego! 👋\n"));
}

export function showCityOptions(
  cities: City[],
  defaultCity: string | null,
  title: string,
  badge: string
): void {
  showTitle(title);
  cities.forEach((city, i) => {
    const mark = city.name === defaultCity ? ` ${badge}` : "";
    showOptionLine(i, `${formatLocation(city)}${mark}`);
  });
}

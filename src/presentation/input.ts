import * as readline from "node:readline";
import type { City } from "../types/City";
import type { MenuOption } from "../types/MenuOption";
import { isMenuOption } from "../types/MenuOption";
import { formatLocation } from "../utils/format";
import { showError, showErrorBlock, showOptionLine, showTitle } from "./output";

function readInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

export function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readInterface();
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export async function promptMenuOption(question: string): Promise<MenuOption | null> {
  const input = await prompt(question);
  if (isMenuOption(input)) return input;
  showErrorBlock("Opción no válida.");
  return null;
}

export async function promptIndex(question: string, length: number): Promise<number | null> {
  const input = await prompt(question);
  const index = Number.parseInt(input, 10) - 1;
  if (Number.isNaN(index) || index < 0 || index >= length) {
    showError("Opción no válida.");
    return null;
  }
  return index;
}

export async function promptCityName(question: string): Promise<string | null> {
  const name = (await prompt(question)).trim();
  if (!name) {
    showError("Nombre no válido.");
    return null;
  }
  return name;
}

export async function promptYesNo(question: string): Promise<boolean> {
  const input = await prompt(question);
  return input.toLowerCase() === "s";
}

export async function promptCityOption(results: City[]): Promise<City | null> {
  showTitle("Se encontraron varias ciudades:");
  results.forEach((city, i) => showOptionLine(i, formatLocation(city)));
  const index = await promptIndex("\n  Selecciona una opción: ", results.length);
  if (index === null) return null;
  return results[index] ?? null;
}

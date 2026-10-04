import * as readline from "node:readline";
import type { City } from "../types/City";
import type { MenuOption } from "../types/MenuOption";
import { isMenuOption } from "../types/MenuOption";
import { formatLocation } from "../utils/format";
import { showError, showErrorBlock, showOptionLine, showTitle } from "./output";

export interface PromptOptions {
  input?: NodeJS.ReadableStream;
  output?: NodeJS.WritableStream;
}

function readInterface(options: PromptOptions = {}): readline.Interface {
  return readline.createInterface({
    input: options.input ?? process.stdin,
    output: options.output ?? process.stdout,
  });
}

export function prompt(question: string, options: PromptOptions = {}): Promise<string> {
  return new Promise((resolve) => {
    const rl = readInterface(options);
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export async function promptMenuOption(question: string, options: PromptOptions = {}): Promise<MenuOption | null> {
  const input = await prompt(question, options);
  if (isMenuOption(input)) return input;
  showErrorBlock("Opción no válida.");
  return null;
}

export async function promptIndex(question: string, length: number, options: PromptOptions = {}): Promise<number | null> {
  const input = await prompt(question, options);
  const index = Number.parseInt(input, 10) - 1;
  if (Number.isNaN(index) || index < 0 || index >= length) {
    showError("Opción no válida.");
    return null;
  }
  return index;
}

export async function promptCityName(question: string, options: PromptOptions = {}): Promise<string | null> {
  const name = (await prompt(question, options)).trim();
  if (!name) {
    showError("Nombre no válido.");
    return null;
  }
  return name;
}

export async function promptYesNo(question: string, options: PromptOptions = {}): Promise<boolean> {
  const input = await prompt(question, options);
  return input.toLowerCase() === "s";
}

export async function promptCityOption(results: City[], options: PromptOptions = {}): Promise<City | null> {
  showTitle("Se encontraron varias ciudades:");
  results.forEach((city, i) => showOptionLine(i, formatLocation(city)));
  const index = await promptIndex("\n  Selecciona una opción: ", results.length, options);
  if (index === null) return null;
  return results[index] ?? null;
}

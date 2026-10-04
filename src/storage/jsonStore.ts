import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { CONFIG_FILE_NAME } from "../utils/constants";

export function getConfigDir(): string {
  return path.join(os.homedir(), ".config", "weather-cli");
}

export function getConfigPath(filename: string = CONFIG_FILE_NAME): string {
  return path.join(getConfigDir(), filename);
}

export async function ensureConfigDir(): Promise<void> {
  const dir = getConfigDir();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export async function loadJson<T>(filePath: string): Promise<T | null> {
  try {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

export async function saveJson(filePath: string, data: unknown): Promise<void> {
  await ensureConfigDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

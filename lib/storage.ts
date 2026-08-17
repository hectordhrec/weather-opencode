import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

const CONFIG_DIR = path.join(os.homedir(), ".config", "weather-cli");

export function getConfigDir(): string {
  return CONFIG_DIR;
}

export function getConfigPath(filename: string): string {
  return path.join(CONFIG_DIR, filename);
}

export async function ensureConfigDir(): Promise<void> {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
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

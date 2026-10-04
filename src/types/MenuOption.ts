export type MenuOption = "1" | "2" | "3" | "4" | "5" | "6" | "8" | "9";

const VALID_OPTIONS: readonly string[] = ["1", "2", "3", "4", "5", "6", "8", "9"];

export function isMenuOption(value: string): value is MenuOption {
  return VALID_OPTIONS.includes(value);
}

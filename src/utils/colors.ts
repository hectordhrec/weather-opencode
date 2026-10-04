const RESET = "\x1b[0m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";

export const cyan = (text: string): string => `${CYAN}${text}${RESET}`;
export const yellow = (text: string): string => `${YELLOW}${text}${RESET}`;
export const green = (text: string): string => `${GREEN}${text}${RESET}`;
export const red = (text: string): string => `${RED}${text}${RESET}`;

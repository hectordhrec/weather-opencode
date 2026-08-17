import * as readline from "node:readline";

export function readInterface(): readline.Interface {
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

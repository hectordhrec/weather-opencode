import { SPINNER_FRAMES, SPINNER_FRAME_MS } from "../utils/constants";

const FRAMES = SPINNER_FRAMES;
const FRAME_MS = SPINNER_FRAME_MS;

let timer: ReturnType<typeof setInterval> | null = null;
let frameIndex = 0;

export function start(message: string): void {
  frameIndex = 0;
  process.stderr.write(`\r  ${FRAMES[0]} ${message}`);
  timer = setInterval(() => {
    frameIndex = (frameIndex + 1) % FRAMES.length;
    process.stderr.write(`\r  ${FRAMES[frameIndex]!} ${message}`);
  }, FRAME_MS);
}

export function stop(finalMessage?: string): void {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  process.stderr.write("\r\x1B[K");
  if (finalMessage) {
    process.stderr.write(`  ${finalMessage}\n`);
  }
}

export async function run<T>(message: string, fn: () => Promise<T>): Promise<T> {
  start(message);
  try {
    return await fn();
  } finally {
    stop();
  }
}

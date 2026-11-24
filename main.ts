import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const JOKE =
  'My predecessor carved "HELP" under my office desk, and six months in I\'m still too embarrassed to ask what it stands for.';

function validateJoke(text: string): string {
  const charCount = [...text].length;
  if (charCount < 1 || charCount > MAX_CHARS) {
    throw new Error(`Joke length ${charCount} outside allowed range 1..${MAX_CHARS}`);
  }
  if (text.trim().length === 0) {
    throw new Error("Joke must not be only whitespace");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Joke must be a single line with no embedded newlines");
  }
  return text;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const entry = validateJoke(JOKE);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), entry, { encoding: "utf8" });
}

main();

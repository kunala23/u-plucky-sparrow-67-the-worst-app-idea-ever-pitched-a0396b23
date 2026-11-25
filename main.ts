// Napkin — entry for make.fun's "The Worst App Idea Ever Pitched".
//
// The competition: pitch the worst, most useless app imaginable in one
// sentence of at most 240 characters. A judge model compares the pitches
// two at a time and picks the one that fails most brilliantly.
//
// The program's whole job is to write that one sentence to
// /output/entry.txt. It is deterministic on purpose: the same sentence
// every run, no network, no randomness, no input files, no secrets.
// The grader runs it in a sandbox (node22) and gates the output on
// being UTF-8 text of 1 to 240 characters, not only whitespace.
//
// The pitch itself: a founder-deadpan product with a named app, a
// specific useless function, and a problem nobody has — a certified
// stranger chewing your food for you over live video, sold as the
// final optimisation bottleneck for busy founders.

import { mkdirSync, writeFileSync } from "node:fs";

const PITCH =
  "Napkin is the premium app that hires a certified stranger to chew your food for you over live video, because chewing is the last un-optimized bottleneck standing between busy founders and total productivity.";

const MAX_CHARS = 240;
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

function main(): void {
  const text = PITCH.trim();

  // Gate check, mirroring the competition's own gate: 1–240 chars.
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text !== PITCH) {
    throw new Error("entry changed after trimming; refusing to write it");
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });
  // No trailing newline: the file holds exactly the one sentence.
  writeFileSync(OUTPUT_PATH, text, "utf8");
  console.log(`wrote ${text.length} characters to ${OUTPUT_PATH}`);
}

main();

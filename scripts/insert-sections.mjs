#!/usr/bin/env bun
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { exit, argv } from "node:process";

const MARKER = "<!-- ##SECTION_INSERT## -->";

const USAGE = `
Usage:
  bun scripts/insert-sections.mjs <target-html> <fragment-html> [--final]

Behavior:
  - Locates the marker "${MARKER}" in <target-html>.
  - Replaces the marker with the contents of <fragment-html>.
  - By default the marker is kept (appended after the fragment) for the next phase.
  - With --final, the marker is removed entirely (no trailing marker).

Exits non-zero if the marker is not found, so a missing or already-finalized
target fails loudly rather than silently appending nothing.
`;

/**
 * Insert the contents of a fragment HTML file into a target HTML file at the SECTION_INSERT marker.
 *
 * Parses CLI arguments from `argv` (expects `<target> <fragment>`), supports `--final` to remove the marker after insertion and `--help`/`-h` to print usage. Reads both files, locates a single occurrence of the marker (`<!-- ##SECTION_INSERT## -->`), replaces that marker with the fragment (trimming trailing whitespace from the fragment), writes the updated target file, and logs the number of lines inserted and whether the marker was preserved.
 *
 * Exits the process with non-zero codes on error:
 * - 2 for insufficient or invalid arguments,
 * - 3 if the marker is not found in the target,
 * - 4 if the marker appears multiple times.
 */
async function main() {
  const args = argv.slice(2);
  if (args.length < 2 || args.includes("--help") || args.includes("-h")) {
    console.log(USAGE);
    exit(args.length < 2 ? 2 : 0);
  }
  const final = args.includes("--final");
  const positional = args.filter((a) => !a.startsWith("--"));
  if (positional.length !== 2) {
    console.error("Expected exactly 2 positional args: <target> <fragment>");
    console.error(USAGE);
    exit(2);
  }
  const [targetPath, fragmentPath] = positional.map((p) => resolve(p));

  const [target, fragment] = await Promise.all([
    readFile(targetPath, "utf8"),
    readFile(fragmentPath, "utf8"),
  ]);

  const idx = target.indexOf(MARKER);
  if (idx === -1) {
    console.error(`Marker not found in ${targetPath}: ${MARKER}`);
    exit(3);
  }
  if (target.indexOf(MARKER, idx + 1) !== -1) {
    console.error(
      `Marker appears multiple times in ${targetPath} — refusing to insert ambiguously.`,
    );
    exit(4);
  }

  const fragmentTrimmed = fragment.replace(/\s+$/u, "");
  const replacement = final
    ? fragmentTrimmed + "\n"
    : fragmentTrimmed + "\n\n" + MARKER;

  const next = target.slice(0, idx) + replacement + target.slice(idx + MARKER.length);
  await writeFile(targetPath, next, "utf8");

  const addedLines = fragmentTrimmed.split("\n").length;
  console.log(
    `Inserted ${addedLines} lines into ${targetPath}${final ? " (marker removed)" : " (marker preserved)"}`,
  );
}

main().catch((err) => {
  console.error(err);
  exit(1);
});

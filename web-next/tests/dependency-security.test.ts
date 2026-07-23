import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

type PackageManifest = {
  dependencies: Record<string, string>;
};

function numericVersion(version: string): number[] {
  return version
    .replace(/^[^\d]*/, "")
    .split(".")
    .map((part) => Number.parseInt(part, 10));
}

function isAtLeast(actual: string, minimum: string): boolean {
  const actualParts = numericVersion(actual);
  const minimumParts = numericVersion(minimum);
  const length = Math.max(actualParts.length, minimumParts.length);

  for (let index = 0; index < length; index += 1) {
    const actualPart = actualParts[index] ?? 0;
    const minimumPart = minimumParts[index] ?? 0;
    if (actualPart !== minimumPart) return actualPart > minimumPart;
  }

  return true;
}

describe("dependency security baselines", () => {
  it("uses a Next.js release containing the July 2026 security fixes", () => {
    const manifest = JSON.parse(readFileSync("package.json", "utf8")) as PackageManifest;

    expect(isAtLeast(manifest.dependencies.next, "16.2.11")).toBe(true);
  });
});

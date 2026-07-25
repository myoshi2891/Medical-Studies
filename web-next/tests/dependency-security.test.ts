import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

type PackageManifest = {
  packageManager: string;
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

function lockedVersions(lockfile: string, packageName: string): string[] {
  const escapedName = packageName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`"[^"]*${escapedName}": \\["${escapedName}@([^"]+)"`, "g");

  return [...lockfile.matchAll(pattern)].map((match) => match[1]);
}

describe("dependency security baselines", () => {
  it("uses a Next.js release containing the July 2026 security fixes", () => {
    const manifest = JSON.parse(readFileSync("package.json", "utf8")) as PackageManifest;

    expect(isAtLeast(manifest.dependencies.next, "16.2.11")).toBe(true);
  });

  it("loads a patched Mermaid CDN bundle with subresource integrity", () => {
    const legacyApp = readFileSync(path.resolve("..", "prom-checker/index.html"), "utf8");
    const scriptTag = legacyApp.match(
      /<script[^>]+mermaid(?:\/|@)(\d+\.\d+\.\d+)[^"]*mermaid\.min\.js[^>]*>/
    );

    expect(scriptTag).not.toBeNull();
    expect(isAtLeast(scriptTag?.[1] ?? "0.0.0", "10.9.6")).toBe(true);
    expect(scriptTag?.[0]).toMatch(/\sintegrity="sha512-[^"]+"/);
  });

  it("uses patched Bun and pytest releases in CI", () => {
    const manifest = JSON.parse(readFileSync("package.json", "utf8")) as PackageManifest;
    const workflow = readFileSync(path.resolve("..", ".github/workflows/ci.yml"), "utf8");
    const bunVersions = [...workflow.matchAll(/bun-version:\s*([0-9.]+)/g)].map(
      (match) => match[1]
    );
    const pytestVersion = workflow.match(/pip install pytest==([0-9.]+)/)?.[1] ?? "0.0.0";

    expect(isAtLeast(manifest.packageManager, "1.3.14")).toBe(true);
    expect(bunVersions.length).toBeGreaterThan(0);
    expect(bunVersions.every((version) => isAtLeast(version, "1.3.14"))).toBe(true);
    expect(isAtLeast(pytestVersion, "9.0.3")).toBe(true);
  });

  it("locks patched DOMPurify and protobufjs releases", () => {
    const lockfile = readFileSync("bun.lock", "utf8");
    const baselines = [
      ["dompurify", "3.4.12"],
      ["protobufjs", "8.6.6"],
    ] as const;

    for (const [packageName, minimum] of baselines) {
      const versions = lockedVersions(lockfile, packageName);
      expect(versions.length).toBeGreaterThan(0);
      expect(versions.every((version) => isAtLeast(version, minimum))).toBe(true);
    }
  });
});

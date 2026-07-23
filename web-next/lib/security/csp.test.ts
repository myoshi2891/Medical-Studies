import { describe, expect, it } from "vitest";
import { buildContentSecurityPolicy } from "./csp";

/** CSP 文字列から指定 directive の値部分を取り出す（"; " 区切り）。 */
function directive(csp: string, name: string): string {
  const found = csp.split("; ").find((d) => d.startsWith(`${name} `));
  expect(found, `${name} directive が存在する`).toBeDefined();
  if (!found) throw new Error(`${name} が CSP に無い`);
  return found.slice(name.length + 1);
}

describe("buildContentSecurityPolicy: wasm 実行許可", () => {
  it("prod でも script-src に 'wasm-unsafe-eval' を含む（DRACO デコーダのため）", () => {
    const scriptSrc = directive(buildContentSecurityPolicy(false), "script-src");
    expect(scriptSrc).toContain("'wasm-unsafe-eval'");
  });

  it("dev でも script-src に 'wasm-unsafe-eval' を含む", () => {
    const scriptSrc = directive(buildContentSecurityPolicy(true), "script-src");
    expect(scriptSrc).toContain("'wasm-unsafe-eval'");
  });

  it("'unsafe-eval' は dev のみ付与し prod では付与しない", () => {
    expect(directive(buildContentSecurityPolicy(true), "script-src")).toContain("'unsafe-eval'");
    // prod は 'unsafe-eval'（前後空白付き）を含まないこと。'wasm-unsafe-eval' との部分一致を避けて検証。
    expect(directive(buildContentSecurityPolicy(false), "script-src")).not.toContain(
      " 'unsafe-eval'"
    );
  });
});

describe("buildContentSecurityPolicy: 自己ホスト方針の担保", () => {
  it("connect-src は 'self' を含み gstatic を含まない（外部 CDN 依存ゼロ）", () => {
    const connectSrc = directive(buildContentSecurityPolicy(false), "connect-src");
    expect(connectSrc).toContain("'self'");
    expect(connectSrc).not.toContain("gstatic");
  });

  it("CSP 全体に gstatic は一切現れない", () => {
    expect(buildContentSecurityPolicy(false)).not.toContain("gstatic");
    expect(buildContentSecurityPolicy(true)).not.toContain("gstatic");
  });
});

describe("buildContentSecurityPolicy: 既存許可の非退行", () => {
  it("script-src が accounts.google.com と cdnjs を許可し続ける", () => {
    const scriptSrc = directive(buildContentSecurityPolicy(false), "script-src");
    expect(scriptSrc).toContain("https://accounts.google.com");
    expect(scriptSrc).toContain("https://cdnjs.cloudflare.com");
  });

  it("connect-src が sheets.googleapis.com と accounts.google.com を許可し続ける", () => {
    const connectSrc = directive(buildContentSecurityPolicy(false), "connect-src");
    expect(connectSrc).toContain("https://sheets.googleapis.com");
    expect(connectSrc).toContain("https://accounts.google.com");
  });

  it("主要 directive（default-src / frame-ancestors / worker-src）が維持される", () => {
    const csp = buildContentSecurityPolicy(false);
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("worker-src 'self' blob:");
  });
});

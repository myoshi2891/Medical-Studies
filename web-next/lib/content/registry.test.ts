/**
 * コンテンツレジストリの契約テスト（plans/007 Step 1）。
 *
 * レジストリはサイト横断機能（相互リンク・サイトマップ・鮮度棚卸し）の単一データ源であり、
 * 登録漏れ・dangling 参照は検索/sitemap/棚卸しからの欠落として静かに劣化する。
 * ここでは実ファイルツリー（app/**\/page.tsx）との突き合わせまで含めて機械検知する。
 */

import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { isSafeHref } from "@/components/site/nav-links";
import { CONTENT_REGISTRY, getEntry, getRelated } from "./registry";
import { CONTENT_CATEGORIES } from "./types";

/** レジストリ管理外のルート（コンテンツページではない静的・ツールページ）。 */
const NON_CONTENT_ROUTES: readonly string[] = ["/", "/privacy", "/terms", "/prom-checker"];

/** ISO 8601 の日付（YYYY-MM-DD）。 */
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * 形式だけでなく暦日として実在するかを検証する。
 *
 * 正規表現は形しか見ないため `2026-02-31` を通してしまい、`new Date()` は
 * これを 3/3 へ黙って丸める。パース結果を ISO へ戻して原文と一致するか
 * （round-trip）を見ることで、存在しない日付を弾く。
 */
function isRealIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return false;
  return parsed.toISOString().slice(0, 10) === value;
}

/** app/ 配下を走査し、page.tsx を持つルートを列挙する。 */
function listAppRoutes(dir: string, prefix: string): string[] {
  const routes: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name === "page.tsx") {
      routes.push(prefix === "" ? "/" : prefix);
      continue;
    }
    // ルートグループ・プライベートディレクトリは対象外。
    if (!entry.isDirectory() || entry.name.startsWith("_") || entry.name.startsWith("(")) continue;
    routes.push(...listAppRoutes(join(dir, entry.name), `${prefix}/${entry.name}`));
  }
  return routes;
}

const APP_ROUTES = listAppRoutes(join(process.cwd(), "app"), "");
const REGISTERED_HREFS = new Set(CONTENT_REGISTRY.map((e) => e.href));

describe("CONTENT_REGISTRY: エントリ単体の不変条件", () => {
  it("全 href が安全な内部パス（isSafeHref）である", () => {
    for (const entry of CONTENT_REGISTRY) {
      expect(isSafeHref(entry.href), `unsafe href: ${entry.href}`).toBe(true);
    }
  });

  it("href が一意である", () => {
    expect(REGISTERED_HREFS.size).toBe(CONTENT_REGISTRY.length);
  });

  it("必須メタ（title / category / lastReviewed）が揃っている", () => {
    for (const entry of CONTENT_REGISTRY) {
      expect(entry.title.length, `empty title: ${entry.href}`).toBeGreaterThan(0);
      expect(CONTENT_CATEGORIES, `unknown category: ${entry.href}`).toContain(entry.category);
      expect(entry.lastReviewed, `bad lastReviewed: ${entry.href}`).toMatch(ISO_DATE);
    }
  });

  it("lastReviewed / sourcesAsOf が実在する暦日である（2026-02-31 等を弾く）", () => {
    for (const entry of CONTENT_REGISTRY) {
      expect(
        isRealIsoDate(entry.lastReviewed),
        `not a real date (lastReviewed): ${entry.href} -> ${entry.lastReviewed}`
      ).toBe(true);
      if (entry.sourcesAsOf === undefined) continue;
      expect(
        isRealIsoDate(entry.sourcesAsOf),
        `not a real date (sourcesAsOf): ${entry.href} -> ${entry.sourcesAsOf}`
      ).toBe(true);
    }
  });

  it("検索索引語（keywords）を 1 件以上持つ", () => {
    for (const entry of CONTENT_REGISTRY) {
      expect(entry.keywords?.length ?? 0, `no keywords: ${entry.href}`).toBeGreaterThan(0);
    }
  });

  it("keywords に空文字・空白のみの語が含まれない", () => {
    for (const entry of CONTENT_REGISTRY) {
      for (const keyword of entry.keywords ?? []) {
        expect(keyword.trim().length, `blank keyword: ${entry.href}`).toBeGreaterThan(0);
      }
    }
  });

  it("keywords がエントリ内で重複しない", () => {
    for (const entry of CONTENT_REGISTRY) {
      const keywords = entry.keywords ?? [];
      expect(new Set(keywords).size, `duplicated keyword: ${entry.href}`).toBe(keywords.length);
    }
  });

  it("href がカテゴリと整合する（/anatomy カテゴリは /anatomy で始まる）", () => {
    for (const entry of CONTENT_REGISTRY) {
      if (entry.category === "anatomy") {
        // インデックス（/anatomy 完全一致）か配下ページのみを許容し、
        // /anatomy-archive のような前方一致だけの別ルートは弾く
        const isAnatomyRoute = entry.href === "/anatomy" || entry.href.startsWith("/anatomy/");
        expect(isAnatomyRoute, `mismatch: ${entry.href}`).toBe(true);
        continue;
      }
      expect(entry.href.startsWith(`/${entry.category}/`), `mismatch: ${entry.href}`).toBe(true);
    }
  });
});

describe("CONTENT_REGISTRY: 相互リンク（plans/002 Step 3）", () => {
  it("各ページが最低 2 本の関連リンクを持つ", () => {
    for (const entry of CONTENT_REGISTRY) {
      expect(entry.related.length, `too few related: ${entry.href}`).toBeGreaterThanOrEqual(2);
    }
  });

  it("related の参照先がすべて登録済みである（dangling 参照なし）", () => {
    for (const entry of CONTENT_REGISTRY) {
      for (const href of entry.related) {
        expect(REGISTERED_HREFS.has(href), `dangling: ${entry.href} -> ${href}`).toBe(true);
      }
    }
  });

  it("related に自己参照が含まれない", () => {
    for (const entry of CONTENT_REGISTRY) {
      expect(entry.related, `self reference: ${entry.href}`).not.toContain(entry.href);
    }
  });

  it("related に重複が含まれない", () => {
    for (const entry of CONTENT_REGISTRY) {
      expect(new Set(entry.related).size, `duplicated related: ${entry.href}`).toBe(
        entry.related.length
      );
    }
  });

  it("plans/004 が要求する MOH 系の双方向リンクが張られている", () => {
    const moh = "/headaches/medication-overuse-headache";
    const acute = "/treatment/acute-treatment-of-headache";
    const useDays = "/treatment/moh-acute-use-days";

    expect(getEntry(acute)?.related).toContain(moh);
    expect(getEntry(moh)?.related).toContain(acute);
    expect(getEntry(useDays)?.related).toContain(moh);
    expect(getEntry(moh)?.related).toContain(useDays);
  });
});

describe("CONTENT_REGISTRY: 実ファイルツリーとの突き合わせ", () => {
  it("app/ 配下の全コンテンツルートが登録済みである（登録漏れ検知）", () => {
    const missing = APP_ROUTES.filter(
      (route) => !NON_CONTENT_ROUTES.includes(route) && !REGISTERED_HREFS.has(route)
    );
    expect(missing).toEqual([]);
  });

  it("登録済み href がすべて実在するルートである（幽霊エントリ検知）", () => {
    const ghosts = [...REGISTERED_HREFS].filter((href) => !APP_ROUTES.includes(href));
    expect(ghosts).toEqual([]);
  });
});

describe("getEntry / getRelated", () => {
  it("登録済み href のエントリを返す", () => {
    const entry = getEntry("/treatment/moh-acute-use-days");
    expect(entry?.category).toBe("treatment");
    expect(entry?.title.length).toBeGreaterThan(0);
  });

  it("未登録 href には undefined を返す", () => {
    expect(getEntry("/does-not-exist")).toBeUndefined();
  });

  it("related をタイトル付きエントリとして解決する", () => {
    const related = getRelated("/treatment/moh-acute-use-days");
    expect(related.length).toBeGreaterThanOrEqual(2);
    expect(related.map((e) => e.href)).toContain("/headaches/medication-overuse-headache");
    for (const entry of related) {
      expect(entry.title.length).toBeGreaterThan(0);
    }
  });

  it("未登録 href には空配列を返す", () => {
    expect(getRelated("/does-not-exist")).toEqual([]);
  });

  it("related の順序をレジストリ宣言順で保つ", () => {
    const declared = getEntry("/treatment/moh-acute-use-days")?.related ?? [];
    expect(getRelated("/treatment/moh-acute-use-days").map((e) => e.href)).toEqual([...declared]);
  });
});

import { describe, expect, it } from "vitest";
import { formatCreatedAtJst } from "./datetime";

/**
 * 記録時刻 JST 整形の契約テスト。ICU 非依存・決定論を検証する。AAA パターン。
 */
describe("formatCreatedAtJst", () => {
  it("UTC を +9h した JST の yyyy/MM/dd HH:mm を返す", () => {
    expect(formatCreatedAtJst("2026-07-01T08:00:00.000Z")).toBe("2026/07/01 17:00");
  });

  it("日付をまたぐ UTC を正しく翌日 JST へ繰り上げる", () => {
    expect(formatCreatedAtJst("2026-07-01T15:30:00.000Z")).toBe("2026/07/02 00:30");
  });

  it("秒・ミリ秒は切り捨て、分までを表示する", () => {
    expect(formatCreatedAtJst("2026-12-31T14:59:59.999Z")).toBe("2026/12/31 23:59");
  });

  it("解析不能な入力はそのまま返す（握りつぶさない）", () => {
    expect(formatCreatedAtJst("not-a-date")).toBe("not-a-date");
  });
});

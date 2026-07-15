import { describe, expect, it } from "vitest";
import { CSV_BOM, CsvExporter, toCsv } from "./csv";
import type { SheetTable } from "./types";

/**
 * CSV シリアライザ（純粋）の契約テスト（設計書 第 7 章・第 11 章）。
 * RFC 4180 のエスケープ・UTF-8 BOM・空表を検証する。AAA パターン。
 */

function table(rows: SheetTable["rows"]): SheetTable {
  return {
    name: "T",
    columns: [
      { key: "a", header: "日付" },
      { key: "b", header: "合計" },
    ],
    rows,
    keyColumnKey: "a",
  };
}

describe("toCsv", () => {
  it("ヘッダ行とデータ行を CRLF 区切りで出力する", () => {
    expect(toCsv(table([["2026-07-01", 42]]))).toBe("日付,合計\r\n2026-07-01,42");
  });

  it("カンマ・改行・引用符を含むセルは引用し " + '" を "" にエスケープする', () => {
    // Arrange
    const t: SheetTable = {
      name: "T",
      columns: [{ key: "a", header: "A" }],
      rows: [["x,y"], ['q"r'], ["m\nn"]],
      keyColumnKey: "a",
    };
    // Act / Assert
    expect(toCsv(t)).toBe('A\r\n"x,y"\r\n"q""r"\r\n"m\nn"');
  });

  it("null は空セル、number/boolean はそのまま文字列化する", () => {
    const t: SheetTable = {
      name: "T",
      columns: [
        { key: "a", header: "A" },
        { key: "b", header: "B" },
        { key: "c", header: "C" },
      ],
      rows: [[null, 5, true]],
      keyColumnKey: "a",
    };
    expect(toCsv(t)).toBe("A,B,C\r\n,5,true");
  });

  it("空表はヘッダ行のみを返す", () => {
    expect(toCsv(table([]))).toBe("日付,合計");
  });
});

describe("CSV_BOM", () => {
  it("UTF-8 BOM は U+FEFF", () => {
    expect(CSV_BOM).toBe("﻿");
  });
});

describe("CsvExporter", () => {
  it("id / label / available を持つ", () => {
    const exporter = new CsvExporter();
    expect(exporter.id).toBe("csv");
    expect(exporter.label.length).toBeGreaterThan(0);
    expect(exporter.available).toBe(true);
  });
});

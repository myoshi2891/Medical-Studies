/**
 * エクスポータの宣言的レジストリ（設計書 第 4.3 章）。
 * PROM の registry.ts に倣い、宣言のみで一覧化する。
 * 将来の xlsx / fhir は buildExporters の配列へ 1 要素追加するだけで UI に現れる。
 */
import { CsvExporter } from "./csv";
import { GoogleSheetsExporter } from "./google/googleSheetsExporter";
import type { ReportExporter } from "./types";

/** 表示順に並べた全エクスポータ。 */
export function buildExporters(): ReportExporter[] {
  return [new GoogleSheetsExporter(), new CsvExporter()];
}

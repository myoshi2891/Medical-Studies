/**
 * 著作権保護 PROM オーバーレイの API Route（開発専用）。
 *
 * `data/prom-restricted.local.json` はサーバ側でしかアクセスできないため、
 * Client Component（PROM チェッカー SPA）からの fetch を中継する。
 * 本番モード（NODE_ENV=production）ではファイルの有無にかかわらず 404 を返す。
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isOverlayEnabled } from "@/lib/prom/restricted-loader";

/** オーバーレイのファイルパス（web-next/data/ 配下）。 */
const OVERLAY_FILE = path.join(process.cwd(), "data", "prom-restricted.local.json");

export async function GET(): Promise<NextResponse> {
  if (!isOverlayEnabled()) {
    return NextResponse.json(null, { status: 404 });
  }

  let raw: string;
  try {
    raw = await readFile(OVERLAY_FILE, "utf8");
  } catch (error) {
    // ファイル未配置（ENOENT）が既定の正常系
    if (isErrnoException(error) && error.code === "ENOENT") {
      return NextResponse.json(null, { status: 404 });
    }
    console.error("[prom] オーバーレイの読み込みに失敗しました", error);
    return NextResponse.json(null, { status: 500 });
  }

  try {
    return NextResponse.json(JSON.parse(raw));
  } catch (error) {
    console.error("[prom] オーバーレイの JSON 解析に失敗しました", error);
    return NextResponse.json(null, { status: 500 });
  }
}

function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}

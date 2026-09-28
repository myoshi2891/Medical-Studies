"use client";

import Link from "next/link";
import { ErrorPageShell } from "@/components/site/ErrorPageShell";

/** 子ルートで予期しないエラーが発生した場合の復旧画面。 */
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPageShell
      code="500"
      label="SOMETHING WENT WRONG / 500"
      title="ページを表示できませんでした"
      description="一時的な問題が発生しました。少し時間をおいて、もう一度お試しください。"
      actions={
        <>
          <button
            className="error-page-button error-page-button-primary"
            type="button"
            onClick={reset}
          >
            もう一度試す <span aria-hidden="true">↻</span>
          </button>
          {/* "/" も /prom-checker へリダイレクトするため、障害経路を避けて静的ページへ案内する。 */}
          <Link
            className="error-page-button error-page-button-secondary"
            href="/headaches/migraine"
          >
            頭痛について学ぶ <span aria-hidden="true">→</span>
          </Link>
        </>
      }
      note="繰り返し表示される場合は、時間をおいてからアクセスしてください。"
    />
  );
}

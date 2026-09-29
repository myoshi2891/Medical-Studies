import Link from "next/link";
import { ErrorPageShell } from "@/components/site/ErrorPageShell";

/** 存在しない URL と notFound() の案内を表示する。 */
export default function NotFound() {
  return (
    <ErrorPageShell
      code="404"
      label="PAGE NOT FOUND / 404"
      title="ページが見つかりません"
      description="URL が変更されたか、ページが移動した可能性があります。下のリンクから引き続きご利用ください。"
      actions={
        <>
          <Link className="error-page-button error-page-button-primary" href="/prom-checker">
            ホームへ戻る <span aria-hidden="true">↗</span>
          </Link>
          <Link
            className="error-page-button error-page-button-secondary"
            href="/headaches/migraine"
          >
            頭痛について学ぶ <span aria-hidden="true">→</span>
          </Link>
        </>
      }
      note="お探しの内容が見つからない場合は、上部の検索もお試しください。"
    />
  );
}

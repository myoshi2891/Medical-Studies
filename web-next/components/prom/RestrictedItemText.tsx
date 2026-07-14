import { readRestrictedOverlay } from "@/lib/prom/restricted-server";

/**
 * 権利者所有の質問票（HIT-6 / MSQ v2.1）の設問文セル。
 *
 * ローカル専用オーバーレイがある開発環境でのみ実文言を描画し、
 * 公開リポジトリ・本番ビルドでは「非掲載」と表示する。
 * オーバーレイの有無で DOM 構造が変わらないよう、常に同じ span を返す。
 */
export function RestrictedItemText({
  instrumentId,
  index,
}: {
  instrumentId: string;
  index: number;
}) {
  const label = readRestrictedOverlay()?.[instrumentId]?.items[index];
  return (
    <span data-restricted-item={instrumentId} className={label ? undefined : "c-muted"}>
      {label ?? "非掲載（公式配布元を参照）"}
    </span>
  );
}

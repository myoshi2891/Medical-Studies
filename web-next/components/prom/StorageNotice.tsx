"use client";

import { usePromContext } from "./PromContext";

/**
 * localStorage 保存に関する常設の注意喚起（監査所見 F4/F5）。
 * 健康データが端末に残ること・共有端末のリスク・消去導線を 1 箇所で案内する。
 */
export function StorageNotice() {
  const { navigate } = usePromContext();
  return (
    <p className="c-small c-muted" role="note">
      記録（頭痛日誌・PROM スコア）は通常この端末のブラウザに保存されます。 Google Sheets
      への同期を実行した場合は、選択したデータ（頭痛日誌および PROM スコア）が Google
      に送信されます。 共有・公共の端末では利用を控えるか、利用後に{" "}
      <button type="button" className="c-link" onClick={() => navigate("#/data")}>
        データ管理
      </button>{" "}
      から「すべてのデータを削除」を実行してください。
    </p>
  );
}

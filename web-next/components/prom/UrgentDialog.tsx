"use client";

import { useEffect, useRef } from "react";

/**
 * 緊急受診アラート（SNOOP4 陽性時に遷移をブロックするゲート）。元 index.html の c-urgent。
 * Escape・背景クリックでは閉じない（ゲートの性質を維持）。再スクリーニングのみ脱出口。
 */
export function UrgentDialog({
  open,
  flags,
  onRescreen,
}: {
  open: boolean;
  flags: string[];
  onRescreen: () => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) btnRef.current?.focus();
  }, [open]);

  const items = flags.length > 0 ? flags : ["（詳細は再確認してください）"];

  return (
    <div
      className="c-urgent"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="urgentTitle"
      aria-hidden={open ? "false" : "true"}
    >
      <div className="c-urgent-box">
        <h2 id="urgentTitle">⚠️ 至急、医療機関の受診を検討してください</h2>
        <p>
          SNOOP4
          スクリーニングで、重大な二次性頭痛を示唆する可能性のある項目に該当しました。これらは緊急の評価が必要な場合があります。頭痛の自己記録よりも
          <strong>受診を最優先</strong>してください。
        </p>
        <div className="c-urgent-flags">
          <strong>該当した項目:</strong>
          <ul style={{ margin: "6px 0 0", paddingLeft: "18px" }}>
            {items.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div className="c-alert c-alert--danger" style={{ marginTop: "14px" }}>
          突然の激しい頭痛・意識障害・手足の麻痺・けいれんなどがある場合は、ためらわず
          <strong>救急要請（119）</strong>
          を検討してください。受診時には「いつから・どのように始まったか」「最も強い時の様子」「随伴症状」を伝えられるようにしてください。
        </div>
        <div className="c-btnrow">
          <button type="button" className="c-btn c-btn--ghost" ref={btnRef} onClick={onRescreen}>
            スクリーニングをやり直す
          </button>
        </div>
        <p className="c-small c-muted" style={{ marginTop: "12px" }}>
          SNOOP4 はスコア化せず<strong>関門（ゲート）</strong>
          として機能します。該当がある限り、ダッシュボードへは進めません。
        </p>
      </div>
    </div>
  );
}

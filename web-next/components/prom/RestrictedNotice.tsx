import type { Instrument } from "@/lib/prom/types";

/**
 * 権利者所有の質問票（license.status = "restricted"）の代替表示。
 * 質問票の代わりに「非掲載の理由 + 公式取得先」を示す。
 * 尺度の概要は呼び出し側の見出し、帰属表示は LicenseBlock が担うため、ここでは重複させない。
 */
export function RestrictedNotice({ def }: { def: Instrument }) {
  const { license } = def;
  return (
    <div className="c-card">
      <div className="c-alert c-alert--info">
        <strong>質問文は本アプリには収載していません。</strong>
        <div className="c-small" style={{ marginTop: "6px" }}>
          {def.title}（{def.items.length} 項目 / 想起期間: {def.recallLabel}
          ）の質問文は権利者所有の著作物です。
          本リポジトリ・本サイトでは質問文を掲載せず、尺度の概要・採点方法・解釈の解説のみを提供します。
          実際の質問票は下記の公式配布元から入手してください。
        </div>
      </div>

      {license.officialUrl ? (
        <div className="c-btnrow">
          <a className="c-btn" href={license.officialUrl} target="_blank" rel="noopener noreferrer">
            公式配布元で質問票を入手する
          </a>
        </div>
      ) : null}
    </div>
  );
}

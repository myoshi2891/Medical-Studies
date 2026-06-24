"use client";

import { COMMON_DISCLAIMER, REGISTRY } from "@/lib/prom/registry";
import { MermaidDiagram } from "../MermaidDiagram";
import { usePromContext } from "../PromContext";
import { BackButton } from "./BackButton";

// ラベル内の \n（リテラルのバックスラッシュ + n）は mermaid がノード内改行として解釈する。
// 文の区切りは実際の改行。
const FLOW_APP = `flowchart TD
  Start(["アプリ起動"]) --> Setup{"保存データが\\n存在するか？"}
  Setup -- "いいえ（初回）" --> Snoop["SNOOP4 レッドフラッグ\\nスクリーニング（必須）"]
  Setup -- "はい（再起動）" --> Dash["統合ダッシュボード"]
  Snoop --> Check{"レッドフラッグに\\n該当するか？"}
  Check -- "はい" --> Alert["緊急受診アラート\\n（遷移をブロック）"]
  Check -- "いいえ" --> Dash
  Dash --> D1["頭痛日誌"]
  Dash --> D2["定期PROM評価\\nHIT-6 / MIDAS / MSQ / PGIC"]
  Dash --> D3["疼痛強度\\nNRS / VAS"]
  Dash --> D4["レポート出力 / データ管理"]`;

const FLOW_ARCH = `flowchart LR
  subgraph Core["コア（環境非依存・移植対象）"]
    R["① 宣言的レジストリ\\n質問票定義（JSON）"]
    E["② スコアリングエンジン\\n純粋関数（副作用なし）"]
  end
  subgraph Shell["シェル（環境ごとに差し替え）"]
    U["③a 描画レイヤ\\nHTML/JS → React/TSX"]
    S["③b 永続化アダプタ\\nLocalStorage → IndexedDB → 同期"]
  end
  R --> E
  R --> U
  E --> U
  U --> S
  S --> U`;

/**
 * Renders a license table row for a registered scale.
 *
 * @param id - Registry key for the scale entry to display
 */
function LicenseRow({ id }: { id: string }) {
  const d = REGISTRY[id];
  return (
    <tr>
      <td>{d.title}</td>
      <td>
        {d.license.holder}
        <div className="c-small c-muted">{d.license.note}</div>
      </td>
      <td>{d.recallLabel}</td>
    </tr>
  );
}

/**
 * Renders the About view with design notes, architecture diagrams, and source and license information.
 */
export function About() {
  const { isDark } = usePromContext();
  return (
    <>
      <BackButton />
      <div className="c-viewhead">
        <div className="c-eyebrow">このアプリについて</div>
        <h1>設計・アーキテクチャ・出典</h1>
        <p>
          ローカルファースト（端末内完結）。コアロジックは Next.js への 1:1
          移植を前提に「質問票＝データ」「スコアリング＝純粋関数」「描画/永続化＝差し替え可能なシェル」の
          3 層に分離しています（設計書 第8章）。
        </p>
      </div>
      <div className="c-card">
        <h2>アプリ構成フロー（設計書 第2章）</h2>
        <div className="c-mmd">
          <div className="c-mmd-lbl">起動から記録・出力までの基本フロー</div>
          <MermaidDiagram chart={FLOW_APP} isDark={isDark} />
        </div>
      </div>
      <div className="c-card">
        <h2>アーキテクチャ（設計書 第8章）</h2>
        <div className="c-mmd">
          <div className="c-mmd-lbl">コア（移植対象）とシェル（差し替え可能）の分離</div>
          <MermaidDiagram chart={FLOW_ARCH} isDark={isDark} />
        </div>
      </div>
      <div className="c-card">
        <h2>収録尺度と出典・著作権</h2>
        <table className="c-tbl">
          <thead>
            <tr>
              <th>尺度</th>
              <th>著作権 / ライセンス</th>
              <th>リコール期間</th>
            </tr>
          </thead>
          <tbody>
            <LicenseRow id="hit6" />
            <LicenseRow id="midas" />
            <LicenseRow id="msq-v2.1" />
            <LicenseRow id="pgic" />
            <tr>
              <td>NRS / VAS</td>
              <td>一般尺度（IHS / FDA が PRO エンドポイントとして承認）</td>
              <td>随時</td>
            </tr>
          </tbody>
        </table>
        <div className="c-license" style={{ marginTop: "14px" }}>
          {COMMON_DISCLAIMER}
        </div>
      </div>
    </>
  );
}

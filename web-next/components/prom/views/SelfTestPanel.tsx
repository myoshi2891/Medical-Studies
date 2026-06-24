"use client";

import { useMemo } from "react";
import { runSelfTests } from "../self-tests";
import { BackButton } from "./BackButton";

/**
 * スコアリング自己テストの結果画面を表示します。
 *
 * @returns スコアリング自己テストの実行結果を表示する要素。
 */
export function SelfTestPanel() {
  const results = useMemo(() => runSelfTests(), []);
  const passed = results.filter((r) => r.pass).length;

  return (
    <>
      <BackButton />
      <div className="c-viewhead">
        <div className="c-eyebrow">開発者向け</div>
        <h1>スコアリング自己テスト</h1>
        <p>設計書 第11章のシナリオを純粋関数に対して実行（AAA パターン）。</p>
      </div>
      <div className="c-card">
        <div className={`c-result ${passed === results.length ? "is-success" : "is-danger"}`}>
          <div className="c-num">
            {passed} / {results.length}
          </div>
          <div>テスト合格</div>
        </div>
        <div className="c-selftest" style={{ marginTop: "14px", lineHeight: 2 }}>
          {results.map((r) => (
            <div key={r.name}>
              <span className={r.pass ? "ok" : "ng"}>{r.pass ? "✅" : "❌"}</span> {r.name}
              {r.detail ? <span className="c-muted"> — {r.detail}</span> : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

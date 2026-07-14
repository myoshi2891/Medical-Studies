# web-next

頭痛疾患の医療教育コンテンツと PROM（患者報告アウトカム）ツールの Next.js アプリ（App Router）。

## コマンド

| コマンド | 内容 |
|---|---|
| `bun run dev` | 開発サーバ起動 |
| `bun run build` | 本番ビルド |
| `bun run test` | テスト（Vitest） |
| `bun run typecheck` | 型チェック（`tsc --noEmit`） |
| `bun run lint` | Lint / Format（Biome） |

## 著作権保護 PROM のローカル専用オーバーレイ

HIT-6 と MSQ v2.1 は**質問文が権利者所有の著作物**のため、このリポジトリには掲載していない
（`lib/prom/registry.ts` は中立プレースホルダのみを持ち、`license.status = "restricted"`）。
公開リポジトリ・本番ビルドでは、質問票の代わりに「概要 ＋ 公式取得先リンク ＋ 帰属表示」が表示される。

ローカル開発で実際の質問票を表示したい場合は、**自身が正規に入手した文言**を使って
オーバーレイ JSON を用意する。

```bash
cp public/prom-restricted.example.json public/prom-restricted.local.json
# 公式配布元から入手した質問文を prom-restricted.local.json に記入する
bun run dev
```

- `public/*.local.json` は `.gitignore` 済みで、コミットされない。
- 項目数・順序は `registry.ts` の定義と一致させること。**件数が食い違うオーバーレイは破棄され**、
  プレースホルダ表示のままになる（採点との不整合を防ぐフェイルセーフ）。
- ファイルが無い場合はエラーにならず、代替表示にフォールバックする（これが既定の正常系）。
- **本番モード（`NODE_ENV=production`）では読み込まれない**（`bun run build && bun run start`
  でも質問文は表示されない）。ファイル不在と合わせた二重ゲート。

質問票の入手先:

- HIT-6: [QualityMetric](https://www.qualitymetric.com/health-surveys/the-headache-impact-test-hit-6/)（商用利用は要許諾）
- MSQ v2.1: [ePROVIDE / Mapi Research Trust](https://eprovide.mapi-trust.org/instruments/migraine-specific-quality-of-life-questionnaire)（事前の書面許諾が必須）

背景と運用の詳細は [`THIRD_PARTY_NOTICES.md` §2](../THIRD_PARTY_NOTICES.md) および
[`docs/publishing/01-urgent-exposure.md`](../docs/publishing/01-urgent-exposure.md)（F1）を参照。

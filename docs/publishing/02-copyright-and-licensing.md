# 02. 著作権とライセンス方針（P0）

> [!NOTE]
> **本文書は法務助言ではない。** ライセンスの選択・適用範囲の確定、CC-BY-SA の ShareAlike 適合、第三者尺度の許諾は最終的に権利者確認および専門家レビューを要する。本文書は方針と是正案の整理である。

- **対象監査所見**: F2（LICENSE 不在＋CC-BY-SA 派生資産の再配布）。F1 の受け皿でもある。
- **成果物**: ルート `LICENSE`（新設）、ルート `THIRD_PARTY_NOTICES.md`（新設）、本文書。
- **記載時点コミット**: `0fced4f`

---

## 1. 問題の構造

このリポジトリは 3 種類の異なる権利状態の資産を 1 つの公開リポジトリに同梱している。

1. **自作コード** — スクリプト、`web-next/` アプリ、ビルドツール。ライセンス未指定だった。
2. **自作コンテンツ** — 頭痛教育の Markdown/HTML（`Types-of-headache/`）。著者に著作権があるが利用条件が未宣言。
3. **第三者資産** — CC-BY-SA の BodyParts3D 派生 `.glb`、権利者所有の PROM 尺度、出典不明の MRI 画像。

単一ライセンスでは扱えない。とりわけ CC-BY-SA（コピーレフト）の資産を含むため、リポジトリ全体を MIT と宣言すると第三者義務と矛盾する。

## 2. 採用方針：デュアルライセンス（分離宣言）

| 区分 | 対象パス（例） | ライセンス（推奨） | 根拠 |
|---|---|---|---|
| ソースコード | `scripts/`、`web-next/`（アプリコード）、ビルドツール | **MIT** | 教育プロジェクトの再利用促進。寛容型で貢献受け入れが容易 |
| 教育コンテンツ | `Types-of-headache/`、生成 HTML | **CC BY-SA 4.0**（推奨・要確定） | 医療教育の共有と改変継承。著者帰属を維持 |
| 派生 3D モデル | `web-next/public/models/*.glb` | **CC BY-SA 2.1 JP 継承**（義務） | 原著 BodyParts3D の ShareAlike に従う。選択の余地なし |
| PROM 尺度 | `web-next/lib/prom/**` の質問文 | **権利者所有（再ライセンス不可）** | F1 参照。掲載可否は許諾次第 |
| MRI 画像 | `web-next/public/mri/*` | **未確定** | F3 参照。出典確認まで宣言不可 |

> [!IMPORTANT]
> コンテンツを CC BY-SA 4.0 とする場合でも、`.glb` 派生物は原著の CC BY-SA **2.1 JP** に拘束される。両者は自動的には統合されないため、`THIRD_PARTY_NOTICES.md` で個別に義務を明記する。

## 3. 成果物の内容

### 3.1 ルート `LICENSE`（MIT・スコープ注記付き）

- MIT 本文に加え、冒頭へ **SCOPE NOTE** を付し「本 MIT はソースコードのみに適用され、コンテンツ／`.glb`／PROM には適用されない」ことを明示した。
- 著作権表記は個人情報（実名・メール）を避け `Medical-Studies project contributors` とした（PII 混入防止）。

### 3.2 ルート `THIRD_PARTY_NOTICES.md`

- BodyParts3D 帰属（原文・ShareAlike 義務・掲示状況）、PROM 尺度の権利者、MRI 画像の未確定状態、主要 npm 依存ライセンスを一元集約。
- 一次台帳 `web-next/public/models/LICENSES.md` は温存し、本ファイルから参照・統合する（重複記述を避ける）。

## 4. BodyParts3D 帰属の掲示確認（F2 派生）

- **確認結果**: 帰属表示は公開 UI に**掲示済み**。`web-next/app/anatomy/page.tsx` の ATTRIBUTION セクションが CC-BY-SA 2.1 JP 原文（"BodyParts3D, © The Database Center for Life Science, licensed under CC BY-SA 2.1 JP"）をレンダリングしている。
- **残 TODO**: `.glb` 派生物を再配布する以上、ShareAlike に従い派生物自体を CC-BY-SA 2.1 JP 互換で公開する旨を、リポジトリ利用者が認識できる形（本 `THIRD_PARTY_NOTICES.md` 記載で充足）にした。原著ライセンス全文への到達性（リンク）も確認済み。

## 5. チェックリスト

- [ ] コードのライセンス（MIT 推奨）をユーザーが確定した
- [ ] コンテンツのライセンス（CC BY-SA 4.0 推奨）をユーザーが確定した
- [x] ルート `LICENSE` を配置した（スコープ注記付き）
- [x] ルート `THIRD_PARTY_NOTICES.md` を配置した
- [x] BodyParts3D 帰属が公開 UI に掲示されていることを確認した
- [ ] `.glb` の ShareAlike 適合（再配布ライセンス互換性）を最終確認した
- [x] npm 依存ライセンスの棚卸しを実施した（2026-07-15。GPL/AGPL の混入なし。結果は
  [`THIRD_PARTY_NOTICES.md`](../../THIRD_PARTY_NOTICES.md) §4。実施手順は
  [`plans/009-dependency-license-inventory.md`](../../plans/009-dependency-license-inventory.md)）

## 関連文書

- 緊急露出（F1/F2 の即時対応）: [`01-urgent-exposure.md`](01-urgent-exposure.md)
- MRI 画像出典: [`03-mri-image-provenance.md`](03-mri-image-provenance.md)
- 依存ライセンス棚卸し手順: [`06-infrastructure-and-deployment.md`](06-infrastructure-and-deployment.md)

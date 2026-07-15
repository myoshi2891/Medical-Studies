# Third-Party Notices / 第三者資産の帰属

本リポジトリは第三者の著作物・オープンソース資産を再配布・依存している。ルート `LICENSE`（MIT）はリポジトリのソースコードにのみ適用され、以下の資産はそれぞれの原ライセンスに従う。詳細な方針は [`docs/publishing/02-copyright-and-licensing.md`](docs/publishing/02-copyright-and-licensing.md) を参照。

> [!IMPORTANT]
> 本ファイルは帰属と義務の集約台帳である。資産を追加・更新した際は必ず本ファイルと該当する一次台帳（`web-next/public/models/LICENSES.md` 等）を同時に更新すること。

---

## 1. 3D 解剖モデル（再配布・改変あり）

- **資産**: `web-next/public/models/{nerves,vessels,brain,bones,muscles}.glb`（5 点）
- **出典**: BodyParts3D v4.0 — The Database Center for Life Science（DBCLS）
- **原ライセンス**: CC BY-SA 2.1 JP（表示 - 継承）
- **改変内容**: 複数 OBJ の統合・単一マテリアル色付け・原点中心化・単位変換（mm→m）・座標系変換（Z-up→Y-up）・Draco 圧縮
- **一次台帳**: `web-next/public/models/LICENSES.md`（改変詳細・候補ソースを含む）

### 帰属表示（必須・原文）

> BodyParts3D, © The Database Center for Life Science licensed under
> CC Attribution-Share Alike 2.1 Japan.

- ライセンス全文: <http://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html>
- **掲示状況**: 公開 UI（`/anatomy` ページ）に帰属表示を実掲示済み（`web-next/app/anatomy/page.tsx` の ATTRIBUTION セクション）。
- **ShareAlike 義務**: 改変済み `.glb` を再配布する本リポジトリは、当該派生物を CC BY-SA 2.1 JP 互換ライセンスで公開する義務を負う。この義務は MIT ライセンスによって上書きされない。

---

## 2. 臨床アウトカム尺度（PROM）— 権利者所有・再ライセンス不可

以下は本リポジトリが再ライセンスできない第三者著作物である。掲載継続の可否・許諾状況は [`docs/publishing/01-urgent-exposure.md`](docs/publishing/01-urgent-exposure.md)（F1）で管理する。

| 尺度 | 権利者 | 制約 | 確認状態（`license.status`） |
|---|---|---|---|
| HIT-6 | QualityMetric Incorporated（© 2001, 2015） | 商用利用は要許諾 | **restricted**（2026-07-15 レダクション済み） |
| MSQ v2.1 | Mapi Research Trust（専有） | 事前の書面許諾が必須 | **restricted**（2026-07-15 レダクション済み） |
| MIDAS | 出典元（ICHD-3 系） | 帰属表示の要否を要確認 | 未設定（掲載継続） |
| PGIC / NRS / VAS | 汎用スケール | 特定バージョンの帰属を確認 | 未設定（掲載継続） |

出典参照: `web-next/lib/prom/registry.ts` の各尺度 `license` フィールド。

### 2-1. レダクション運用（restricted の尺度）

`license.status = "restricted"` の尺度は、**質問文・回答選択肢の文言をリポジトリに一切掲載しない**。

- 公開レジストリ（`web-next/lib/prom/registry.ts`）は中立プレースホルダのみを持つ。項目数・`id`・`value` は
  採点および保存済み `ScoreRecord` との互換のため不変。
- 実文言は git 管理外のローカル専用オーバーレイ `web-next/public/prom-restricted.local.json`
  （`.gitignore` 済み）に置き、**開発環境（`NODE_ENV !== "production"`）でのみ**画面に注入される。
  形式のテンプレートは `web-next/public/prom-restricted.example.json` を参照。
- オーバーレイが無い状態（公開リポジトリ・本番ビルド）では、質問票の代わりに
  「尺度の概要 ＋ 公式取得先リンク ＋ 帰属表示」の代替表示になる。
- 教育ページ（`web-next/app/prom/*`・`Types-of-headache/**`）およびレガシー SPA
  （`prom-checker/index.html`）からも逐語引用を除去済み。測定ドメイン・スコアリング方法・解釈バンド・
  MCID の解説は一般的知識のため掲載を継続する。
- **権利者照会は未了**（`docs/publishing/01-urgent-exposure.md` F1 参照）。許諾取得後に文言を
  `registry.ts` へ戻し `status: "verified"` とする。
- 新しい尺度を追加する際は `license.status` の設定と本表への行追加をセットで行う。

---

## 3. MRI 画像

- **資産**: `web-next/public/mri/{brain,cervical}/*.png`（16 枚）
- **状態**: PHI 匿名化済み（`web-next/public/mri/manifest.json`）。**ただし著作権者・出典は未文書化**。
- 詳細・是正手順: [`docs/publishing/03-mri-image-provenance.md`](docs/publishing/03-mri-image-provenance.md)（F3）

---

## 4. npm 依存（機械的棚卸し済み）

各パッケージのライセンス条項は各配布物に同梱される。

### 4-1. 棚卸しメタデータ

| 項目 | 値 |
|---|---|
| 実施日 | 2026-07-15 |
| 対象 | `web-next/`（`bun install --frozen-lockfile` 後の `node_modules`） |
| ツール | `license-checker-rseidelsohn`（`bunx` 経由で実行） |
| production 依存総数 | 141 パッケージ（`web-next` 自身を除く） |
| 強コピーレフト検査 | `--failOn "GPL-2.0;GPL-3.0;AGPL-1.0;AGPL-3.0"` → **exit 0（検出なし）** |

再現手順（`web-next/` で実行）:

```bash
bun install --frozen-lockfile
bunx license-checker-rseidelsohn --production --summary
bunx license-checker-rseidelsohn --production --failOn "GPL-2.0;GPL-3.0;AGPL-1.0;AGPL-3.0"
```

### 4-2. 直接依存（dependencies 6 件・検証済み）

| パッケージ | バージョン | ライセンス | 用途 |
|---|---|---|---|
| `next` | 16.2.6 | MIT | アプリ基盤（App Router） |
| `react` | 19.2.4 | MIT | UI ライブラリ |
| `react-dom` | 19.2.4 | MIT | DOM レンダラ |
| `mermaid` | 10.9.6 | MIT | 図表描画 |
| `@google/model-viewer` | 4.3.1 | Apache-2.0 | 3D モデル表示 |
| `@tabler/icons-react` | 3.44.0 | MIT | アイコン |

### 4-3. 推移的依存を含む種別別件数（production）

| ライセンス | 件数 |
|---|---|
| MIT | 77 |
| ISC | 35 |
| BSD-3-Clause | 13 |
| Apache-2.0 | 8 |
| LGPL-3.0-or-later | 1 |
| CC-BY-4.0 | 1 |
| MPL-2.0 OR Apache-2.0 | 1 |
| EPL-2.0 | 1 |
| MIT\*（LICENSE 同梱だが package.json に宣言なし） | 1 |
| Unlicense | 1 |
| 0BSD | 1 |

### 4-4. 要注意判定の個別記録

| パッケージ | ライセンス | 判断 |
|---|---|---|
| `@img/sharp-libvips-darwin-arm64@1.2.4` | LGPL-3.0-or-later | Next.js の画像最適化が使うネイティブバイナリ（プラットフォーム固有の optional dependency）。クライアントバンドルに含まれず**動的リンク**されるため、LGPL の義務は本リポジトリのソースへ伝播しない。バイナリを改変・静的リンクする場合は再評価が必要。 |
| `elkjs@0.9.3` | EPL-2.0 | `mermaid` のレイアウトエンジン。EPL はファイル単位コピーレフトであり、**当該ファイルを改変しない限り**独自コードへの開示義務は生じない。改変していない。 |
| `caniuse-lite@1.0.30001799` | CC-BY-4.0 | ブラウザ互換データ。**帰属表示が条件**。ビルドツールチェーンの一部として同梱される（`browserslist` 経由）。 |
| `dompurify@3.4.11` | MPL-2.0 OR Apache-2.0 | デュアルライセンス。**Apache-2.0 を選択**することでファイル単位コピーレフトの適用を回避できる。 |
| `khroma@2.1.0` | MIT\* | リポジトリの LICENSE ファイルは MIT。`package.json` に `license` フィールドが無いためツールが `*` を付与している。実質 MIT。 |

> [!NOTE]
> 本表は 2026-07-15 時点の機械的棚卸しに基づく。依存を追加・更新した際は上記の再現手順を再実行し、本節を更新すること（`plans/014-minimal-ci-pipeline.md` で同じ `--failOn` ゲートを CI 化する予定）。`@google/model-viewer`（Apache-2.0）は NOTICE 条項を持つため、バンドル形態を変更する場合は帰属表示の同梱要否を再確認すること。

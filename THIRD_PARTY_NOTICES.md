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

| 尺度 | 権利者 | 制約 |
|---|---|---|
| HIT-6 | QualityMetric Incorporated（© 2001, 2015） | 商用利用は要許諾 |
| MSQ v2.1 | Mapi Research Trust（専有） | 事前の書面許諾が必須 |
| MIDAS | 出典元（ICHD-3 系） | 帰属表示の要否を要確認 |
| PGIC / NRS / VAS | 汎用スケール | 特定バージョンの帰属を確認 |

出典参照: `web-next/lib/prom/registry.ts` の各尺度 `license` フィールド。

---

## 3. MRI 画像

- **資産**: `web-next/public/mri/{brain,cervical}/*.png`（16 枚）
- **状態**: PHI 匿名化済み（`web-next/public/mri/manifest.json`）。**ただし著作権者・出典は未文書化**。
- 詳細・是正手順: [`docs/publishing/03-mri-image-provenance.md`](docs/publishing/03-mri-image-provenance.md)（F3）

---

## 4. npm 依存（主要・再配布時に注意を要するもの）

各パッケージのライセンス条項は各配布物に同梱される。代表的なもの:

| パッケージ | 用途 | ライセンス（要検証） |
|---|---|---|
| `next` / `react` / `react-dom` | アプリ基盤 | MIT |
| `mermaid` | 図表描画 | MIT |
| `@google/model-viewer` | 3D モデル表示 | Apache-2.0 |
| `@tabler/icons-react` | アイコン | MIT |

> [!NOTE]
> 上表は代表例であり網羅ではない。公開・配布前に `web-next/` で依存ライセンスの棚卸し（例: ライセンスチェッカ）を行い、コピーレフト系（GPL/LGPL 等）の混入がないことを確認すること。実行手順は [`docs/publishing/06-infrastructure-and-deployment.md`](docs/publishing/06-infrastructure-and-deployment.md) を参照。

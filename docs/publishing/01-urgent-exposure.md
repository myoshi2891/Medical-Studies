# 01. 緊急リスクと即時対応（P0）

> [!CAUTION]
> **本リポジトリは既に GitHub 上で PUBLIC 公開済みである**（`myoshi2891/Medical-Studies`、`gh repo view --json visibility` で `PUBLIC` を確認）。
> 本文書の F1・F2 は「将来の公開準備」ではなく、**現在進行中の露出**である。掲載継続の可否は権利者確認を要する法的判断であり、下記は是正の選択肢を整理したものであって、法務助言ではない。最終判断はユーザーおよび権利者・専門家に委ねる。

- **対象監査所見**: F1（著作権保護 PROM 質問票の全文公開）、F2（LICENSE 不在＋CC-BY-SA 派生資産の再配布）
- **本文書の性質**: 現状・リスク・是正案・チェックリストの提示のみ。**コードは変更しない**（質問票の削除・差し替えは行わず、方針のみ記述する）。
- **記載時点コミット**: `0fced4f`（2026-07-04）

---

## F1. 著作権保護 PROM 質問票が公開リポジトリに全文掲載

### 現状

以下の患者報告アウトカム尺度（PROM）が、質問文全文を含む形で実装・公開されている。

| 尺度 | 権利者 | ライセンス上の制約（コード内 `license` フィールド自身の記載） |
|---|---|---|
| **HIT-6**（Headache Impact Test） | QualityMetric Incorporated（© 2001, 2015） | 「学術利用は可、**商用利用は要許諾**」 |
| **MSQ v2.1**（Migraine-Specific QoL） | Mapi Research Trust（専有） | 「**事前の書面による許諾が必須**（eprovide.mapi-trust.org）。**公開配布時は許諾状況に注意**」 |

コード自身が要許諾を明記している点が最重要である。すなわち、リポジトリは自らのメタデータでコンプライアンス上の注意を記録した状態で公開されている。

### 露出箇所の棚卸し（`file:line`）

> [!NOTE]
> 以下は**レダクション実施前（記載時点）の棚卸し**である。2026-07-15 にすべての箇所から質問文を除去した
> （後述「実施済みの是正」）。記録として残す。

以下はデータとしての参照であり、変更対象ではない。

- レジストリ定義（尺度メタデータ・質問項目・`license` フィールド）
  - `web-next/lib/prom/registry.ts`（HIT-6 の `license` は 87–91 行付近、MSQ v2.1 の `license` は 220–224 行付近）
- 公開ページ（質問文がレンダリングされる箇所）
  - `prom-checker/index.html`（HIT-6/MSQ セクション）
  - `web-next/app/prom/headache-impact-test/page.tsx`（HIT-6 ページ）
  - `web-next/app/prom/**`（MSQ を含む各 PROM ページ）

> [!NOTE]
> 上記の行番号は記載時点コミット `0fced4f` の目安である。是正着手時に必ず該当ファイルを開いて最新の位置を再確認すること（ファイル編集により行はずれる）。

### 参考尺度の扱い（別途評価）

- **MIDAS**（Migraine Disability Assessment）: 出典表示を条件に教育利用可能とされることが多いが、権利表記の要否を要確認。
- **PGIC / NRS / VAS**: 単純な汎用スケール（自由に利用可能とされることが一般的）だが、採用した特定バージョンの帰属を確認。
- **SNOOP4 等の危険兆候チェック**: 教育的記述であり尺度の全文複製ではないが、出典（ICHD-3 等）の帰属を明記。

各尺度の掲載継続可否は個別に権利者・出典を確認する。

### リスク

- 権利者からの削除要請（DMCA テイクダウン等）・利用停止・損害賠償請求の可能性。
- 公開リポジトリはフォーク・ミラー・アーカイブにより**削除後も残存**しうる（後述の是正でも完全消去は保証されない）。
- 医療 PROM は臨床解釈の正確性が要件であり、無許諾改変・翻訳は権利問題に加え臨床的誤用リスクも伴う。

### 是正案（決定はユーザー／権利者確認事項）

いずれもトレードオフを含む。順序は推奨度ではなく検討フロー。

1. **許諾状況の確認（最優先の事実確認）**
   - HIT-6: QualityMetric に対し、現在の公開態様（オープンソース・無償教育 Web での全文掲載）が許諾範囲かを照会する。
   - MSQ v2.1: Mapi Research Trust（ePROVIDE / eprovide.mapi-trust.org）へ書面許諾の要否・取得手順を照会する。
   - 照会結果を `docs/publishing/` に記録し、本文書のチェックリストを更新する。

2. **許諾が得られない／不明な場合の代替設計（方針のみ・コードは変更しない）**
   - 質問文全文を教育ページ・レジストリから外し、**「尺度の概要＋公式取得先リンク＋帰属表示」**へ差し替える設計へ移行する。
   - スコアリング・解釈バンド等の一般的アルゴリズム記述と、著作権で保護される質問文の逐語複製を分離する。
   - 実装は別途プラン化する（本文書では方針の提示に留める）。

3. **暫定的にリポジトリを非公開へ戻す判断材料**
   - 露出を即時に縮小できる最短手段。ただしフォーク済みコピーには効果がなく、過去コミットの履歴も含めた露出は残りうる。
   - 公開を維持したまま許諾照会を進めるか、照会が済むまで非公開に戻すかは、露出継続のリスク許容度に依存する。

### 実施済みの是正（2026-07-15）

> [!IMPORTANT]
> **ユーザー指示により、権利者照会の結果を待たずにレダクションを実施した**（上記「是正案 2」の先行実施）。
> 権利者照会自体は未了であり、下記チェックリストの照会項目は `[ ]` のまま残る。

- 公開レジストリ（`web-next/lib/prom/registry.ts`）の HIT-6 / MSQ v2.1 の質問文・回答選択肢を中立
  プレースホルダへ差し替え、`license.status = "restricted"` と `license.officialUrl` を付与した。
  項目数・`id`・`value` は不変のため、採点と保存済み `ScoreRecord` の互換は保たれる。
- 実文言は git 管理外のローカル専用オーバーレイ（`web-next/public/prom-restricted.local.json`）へ退避し、
  **開発環境でのみ**画面に注入される二重ゲート（ファイル不在／`NODE_ENV=production`）を実装した。
  公開リポジトリ・公開デプロイでは「概要＋公式取得先リンク＋帰属表示」の代替表示になる。
- 教育ページ（`web-next/app/prom/{headache-impact-test,migraine-specific-quality-of-life}`、
  `Types-of-headache/{md-files,html-files}/Patient-Reported-Outcome-Measures/`）およびレガシー SPA
  （`prom-checker/index.html`）から逐語引用を除去した。スコアリング方法・解釈バンド・MCID の解説は
  一般的知識のため温存している。
- 運用の詳細は [`THIRD_PARTY_NOTICES.md` §2-1](../../THIRD_PARTY_NOTICES.md) を参照。

> [!WARNING]
> **git 履歴には過去コミットの質問文が残存する**（今回の変更では消えない）。フォーク・ミラー・
> アーカイブ済みコピーにも効果はない。履歴書き換え（`git filter-repo`）による対応は別プランで扱う。

### チェックリスト

- [ ] HIT-6 の許諾状況を QualityMetric に照会し、結果を記録した
- [ ] MSQ v2.1 の許諾状況を Mapi Research Trust に照会し、結果を記録した
- [ ] MIDAS / PGIC / NRS / VAS / SNOOP4 の帰属・利用条件を個別確認した
- [x] 許諾不可の場合の代替設計（概要＋公式リンク化）を別プランとして起票した →
  [`plans/008-prom-license-gate-and-alternative-display.md`](../../plans/008-prom-license-gate-and-alternative-display.md)
  （Phase A は即実行可、Phase B は照会結果の決定ゲート付き）
- [x] 質問文のレダクションを実施し、ローカル専用オーバーレイ運用へ移行した（2026-07-15。照会結果を
  待たずユーザー指示により実施）
- [ ] git 履歴からの質問文除去（`git filter-repo` による履歴書き換え）を実施した
- [ ] 露出継続 or 一時非公開の判断をユーザーが下した

---

## F2. ルート LICENSE 不在＋CC-BY-SA 派生資産の再配布

### 現状

- リポジトリルートに `LICENSE` ファイルが存在しない（`ls LICENSE*` 該当なし）。ライセンス未指定の公開リポジトリは、既定では**第三者にいかなる利用権も付与しない**（利用者は複製・改変・再配布の法的根拠を持たない）一方、リポジトリ自身が取り込む第三者資産の義務は残る。
- CC-BY-SA 2.1 JP の派生 3D モデル `.glb` を 5 点再配布している。
  - `web-next/public/models/{nerves,vessels,brain,bones,muscles}.glb`
  - 出典: BodyParts3D v4.0（DBCLS）。改変内容・帰属原文は `web-next/public/models/LICENSES.md` に記録済み。
- **CC-BY-SA の ShareAlike 義務**: 改変済み `.glb` を再配布する場合、**同一（CC-BY-SA 2.1 JP 互換）ライセンスでの公開義務**が生じうる。LICENSE 不在はこの義務との整合が取れていない状態を意味する。

### リスク

- ShareAlike 不履行は BodyParts3D 提供元（DBCLS）のライセンス違反となりうる。
- コードのライセンスが未指定のため、貢献者・利用者の権利範囲が不明確（貢献受け入れ・再利用の障害）。

### 是正案（詳細は `02-copyright-and-licensing.md`）

- **デュアルライセンス方針**を採用する: コード（推奨: MIT）とコンテンツ／派生 3D モデル（CC-BY-SA 2.1 JP 継承）を分離。
- ルート `LICENSE`（コード用）と `THIRD_PARTY_NOTICES.md`（第三者資産の帰属集約）を新設する。
- BodyParts3D 帰属表示が公開 UI（`/anatomy` またはフッター）に実掲示されているかを確認する（未掲示なら是正 TODO）。

### チェックリスト

- [ ] コードのライセンス（MIT 等）をユーザーが確定した
- [ ] ルート `LICENSE` を配置した（`02` 参照）
- [ ] `THIRD_PARTY_NOTICES.md` に BodyParts3D 帰属を集約した（`02` 参照）
- [ ] `.glb` 派生物の ShareAlike 適合方針（再配布ライセンス）を明記した
- [ ] BodyParts3D 帰属が公開 UI に掲示されているか確認した

---

## 関連文書

- 著作権・ライセンス方針の詳細: [`02-copyright-and-licensing.md`](02-copyright-and-licensing.md)
- MRI 画像の出典（別リスク F3）: [`03-mri-image-provenance.md`](03-mri-image-provenance.md)
- 索引・全体ステータス: [`README.md`](README.md)

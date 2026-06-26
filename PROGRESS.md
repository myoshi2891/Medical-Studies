# 移行進捗状況

頭痛疾患医療教育コンテンツの Markdown から HTML への移行進捗を管理します。

## 現在地

- **最新 HEAD**: `d42912a` chore(web-next): scaffold public/models and public/mri assets
- **ビルド状態**: web-next 75 tests pass / typecheck・lint クリーン / 本番ビルドで `/anatomy` 静的プリレンダリング確認
- **次の作業**: `/anatomy` 3D解剖アトラス雛形（Phase 0）完了。Phase 1（匿名化済みMRI投入）/ Phase 2（オープンソースglTFモデル投入）待ち。設計書: `docs/architecture.md`
- **未移行 HTML 残数**: 0

## 移行ステータス

| 分類 | 疾患/ブロック名 | Markdown ソース | HTML 成果物 | ステータス | 備考 |
|---|---|---|---|---|---|
| Headaches | 片頭痛 (Migraine) | [Migraine.md](Types-of-headache/md-files/Headaches/Migraine.md) | [Migraine.html](Types-of-headache/html-files/Headaches/Migraine.html) | ✅ 完了 | デザインの権威ソース |
| Headaches | 緊張型頭痛 (TTH) | [Tension-Type-Headache.md](Types-of-headache/md-files/Headaches/Tension-Type-Headache.md) | [Tension-Type-Headache.html](Types-of-headache/html-files/Headaches/Tension-Type-Headache.html) | ✅ 完了 | |
| Headaches | 薬物乱用頭痛 (MOH) | [Medication-Overuse-Headache.md](Types-of-headache/md-files/Headaches/Medication-Overuse-Headache.md) | [Medication-Overuse-Headache.html](Types-of-headache/html-files/Headaches/Medication-Overuse-Headache.html) | ✅ 完了 | |
| Headaches | 頸原性頭痛 (CEH) | [Cervicogenic-Headache.md](Types-of-headache/md-files/Headaches/Cervicogenic-Headache.md) | [Cervicogenic-Headache.html](Types-of-headache/html-files/Headaches/Cervicogenic-Headache.html) | ✅ 完了 | ディープ・スパイン ヒーロー（navy-slate→periwinkle→ice）/ Mermaid 6図 / 16セクション / .moh-grid・.src-grid 5群 / 参考文献31リンク / 4フェーズ分割 |
| Blocks | 星状神経節ブロック (SGB) | [Stellate-Ganglion-Block.md](Types-of-headache/md-files/Blocks/Stellate-Ganglion-Block.md) | [Stellate-Ganglion-Block.html](Types-of-headache/html-files/Blocks/Stellate-Ganglion-Block.html) | ✅ 完了 | |
| Blocks | 後頭神経ブロック (ONB) | [Occipital-Nerve-Block.md](Types-of-headache/md-files/Blocks/Occipital-Nerve-Block.md) | [Occipital-Nerve-Block.html](Types-of-headache/html-files/Blocks/Occipital-Nerve-Block.html) | ✅ 完了 | Deep Teal→Cyan ヒーロー / Mermaid 10図 / 4フェーズ分割 |
| Blocks | 頸椎神経叢ブロック (CPB) | [Cervical-Plexus-Block.md](Types-of-headache/md-files/Blocks/Cervical-Plexus-Block.md) | [Cervical-Plexus-Block.html](Types-of-headache/html-files/Blocks/Cervical-Plexus-Block.html) | ✅ 完了 | ガーネット→ローズヒーロー / Mermaid 12図 / 18セクション / 4フェーズ分割 |
| Physical Therapy | 頭痛に対する理学療法 (PT) | [Physical Therapy-for-Headache.md](Types-of-headache/md-files/Physical-Therapy/Physical%20Therapy-for-Headache.md) | [Physical-Therapy-for-Headache.html](Types-of-headache/html-files/Physical-Therapy/Physical-Therapy-for-Headache.html) | ✅ 完了 | Amber→Coral ヒーロー / Mermaid 9図 / .steps で ASCII 代替 / 4フェーズ分割 |
| Nutrition & Supplements | 頭痛と栄養・サプリメント療法 | [Nutrition-and-Supplements.md](Types-of-headache/md-files/Nutrition-and-Supplements/Nutrition-and-Supplements.md) | [Nutrition-and-Supplements.html](Types-of-headache/html-files/Nutrition-and-Supplements/Nutrition-and-Supplements.html) | ✅ 完了 | Jewel Emerald ヒーロー / Mermaid 8図 / .nut-rx 処方カード / 4フェーズ分割 |
| Psychological & Behavioral | 頭痛の心理・行動療法 | [Psychological-Behavioral-Therapy.md](Types-of-headache/md-files/Psychological-Behavioral-Therapy/Psychological-Behavioral-Therapy.md) | [Psychological-Behavioral-Therapy.html](Types-of-headache/html-files/Psychological-Behavioral-Therapy/Psychological-Behavioral-Therapy.html) | ✅ 完了 | トワイライト藍紫ヒーロー / Mermaid 8図 / .snoop-grid・.therapy-grid / 14セクション / 4フェーズ分割 |
| Patient Reported Outcome Measures | 頭痛ダイアリー | [Headache-Diary.md](Types-of-headache/md-files/Patient-Reported-Outcome-Measures/Headache-Diary.md) | [Headache-Diary.html](Types-of-headache/html-files/Patient-Reported-Outcome-Measures/Headache-Diary.html) | ✅ 完了 | セピア・ブロンズ系ヒーロー / Mermaid 9図（mindmap 含む）/ 16セクション / 外部リンク46 / 4フェーズ分割 |
| Patient Reported Outcome Measures | Headache Impact Test (HIT-6) | [Headache-Impact-Test.md](Types-of-headache/md-files/Patient-Reported-Outcome-Measures/Headache-Impact-Test.md) | [Headache-Impact-Test.html](Types-of-headache/html-files/Patient-Reported-Outcome-Measures/Headache-Impact-Test.html) | ✅ 完了 | Deep Amethyst ヒーロー / Mermaid 3図（IRT採点・グレード分類・臨床フロー）/ 14セクション / 参考文献34リンク / 4フェーズ分割 |
| Patient Reported Outcome Measures | Migraine Disability Assessment (MIDAS) | [Migraine-Disability-Assessment.md](Types-of-headache/md-files/Patient-Reported-Outcome-Measures/Migraine-Disability-Assessment.md) | [Migraine-Disability-Assessment.html](Types-of-headache/html-files/Patient-Reported-Outcome-Measures/Migraine-Disability-Assessment.html) | ✅ 完了 | ボルドー→ローズ ヒーロー / Mermaid 3図 / 15セクション＋付録 / ASCII図3箇所をHTML化 / 参考文献25リンク / 4フェーズ分割 |
| Patient Reported Outcome Measures | Migraine-Specific Quality of Life (MSQ) | [Migraine-Specific-Quality-of-Life.md](Types-of-headache/md-files/Patient-Reported-Outcome-Measures/Migraine-Specific-Quality-of-Life.md) | [Migraine-Specific-Quality-of-Life.html](Types-of-headache/html-files/Patient-Reported-Outcome-Measures/Migraine-Specific-Quality-of-Life.html) | ✅ 完了 | Sunrise Vitality ヒーロー（プラム→ローズ→マリーゴールド）/ Mermaid 6図 / 15セクション / .snoop-grid・.src-grid 4群 / 参考文献26リンク / 4フェーズ分割 |
| Patient Reported Outcome Measures | NRS / VAS | [Numerical-Rating-Scale-Visual-Analogue-Scale.md](Types-of-headache/md-files/Patient-Reported-Outcome-Measures/Numerical-Rating-Scale-Visual-Analogue-Scale.md) | [Numerical-Rating-Scale-Visual-Analogue-Scale.html](Types-of-headache/html-files/Patient-Reported-Outcome-Measures/Numerical-Rating-Scale-Visual-Analogue-Scale.html) | ✅ 完了 | 疼痛スペクトラム配色（深緑→アンバー→深紅）/ Mermaid 8図 / 15セクション / 参考文献 .src-grid 20リンク / 4フェーズ分割 |
| Patient Reported Outcome Measures | Patient Global Impression of Change (PGIC) | [Patient-Global-Impression-of-Change.md](Types-of-headache/md-files/Patient-Reported-Outcome-Measures/Patient-Global-Impression-of-Change.md) | [Patient-Global-Impression-of-Change.html](Types-of-headache/html-files/Patient-Reported-Outcome-Measures/Patient-Global-Impression-of-Change.html) | ✅ 完了 | ペトロール→ティール→アクアマリン ヒーロー / Mermaid 8図（timeline・gantt 含む）/ 14セクション / .src-grid 参考文献16リンク / 4フェーズ分割 |

---

## web-next（Next.js アプリ移行・別系統）

`prom-checker/index.html`（患者向け PROM 統合チェッカー・単一 HTML SPA）を
`web-next/`（Next.js App Router）へ TDD 移行。`nextjs-page-migration` スキルの
**アーキタイプ B（インタラクティブ SPA）参照実装**。

| フェーズ | 内容 | ステータス |
|---|---|---|
| Phase 0 | bootstrap（手書き設定・空 app） | ✅ 完了 |
| Phase 1 | コア: registry + scoring（環境非依存の純粋関数） | ✅ 完了 |
| Phase 2 | 永続化: StorageAdapter + schema migration | ✅ 完了 |
| Phase 3 | シェル: prom-checker.css + PromApp（ハッシュルーター）+ 全ビュー + Mermaid | ✅ 完了 |
| Phase 4 | SKILL を 2 アーキタイプ対応へ拡張 + docs sync | ✅ 完了 |

- **テスト**: 36 passed（コア 33 + シェル契約 3）。lint / typecheck / build 全通過。
- **構成**: `lib/prom/`（コア = registry/scoring/storage/types）+
  `components/prom/`（シェル = PromApp + 9 ビュー + Header/Toast/UrgentDialog/Mermaid）+
  `app/prom-checker/`（page + scoped CSS）。
- **視覚確認（ユーザー手動）**: `cd web-next && bun run dev` → `/prom-checker`。

### アーキタイプ A（静的教育ガイドページ）

`Types-of-headache/html-files/**/*.html` の教育ページを Server Component として忠実転記する系統。

| ページ | ルート | ステータス | 備考 |
|---|---|---|---|
| Cervical-Plexus-Block | `/blocks/cervical-plexus-block` | ✅ 完了 | **A 参照実装**。18 section / Mermaid 12図 / table 22 / 外部リンク 15 |
| Occipital-Nerve-Block | `/blocks/occipital-nerve-block` | ✅ 完了 | 17 section / Mermaid 10図 / table 24 / 外部リンク 31 |
| 3D解剖アトラス | `/anatomy` | 🟡 Phase 0（雛形） | **新設・data-driven**（HTML転記ではない）。`lib/anatomy` manifest 駆動で6構造（神経/血管/脳/骨/筋/総覧）。ModelViewer（3Dプレースホルダ＋ホットスポット凡例）/ MriSliceViewer（2Dスクラバ）をクライアントアイランド遅延配置。設計書 `docs/architecture.md`。Phase1=匿名化MRI投入 / Phase2=glTFモデル投入 |

- **共有コンポーネント（A 共通・本移行で新設）**: `components/MermaidDiagram.tsx`（default export・
  lazy import・`themeVariables` 上書き可）/ `components/Ext.tsx`（外部リンク安全化）。
- **chrome のみクライアント化**: `components/blocks/CpbSidebar.tsx`（scroll-spy = IntersectionObserver）。
  本文は Server Component のまま。スタイルは `app/blocks/<slug>/<slug>.css` に `.cervical-accent` でスコープ。
- **テスト**: 計 57 passed（B 系 33 + A 契約 16 + その他）。lint / typecheck 全通過。
- **視覚確認（ユーザー手動）**: `cd web-next && bun run dev` → `/blocks/cervical-plexus-block`。

---

## 次回セッションでの再開プロンプト

```text
進捗管理ファイルに基づき、次回セッションを再開します。
- 最新 HEAD: eec36e4
- 次の作業: Headaches/Cervicogenic-Headache.html 完了。新規コンテンツ待ち
- 未移行 HTML 残数: 0
```

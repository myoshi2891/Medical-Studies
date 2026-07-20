# 移行進捗状況

頭痛疾患医療教育コンテンツの Markdown から HTML への移行進捗を管理します。

## 現在地

- **最新 HEAD**: `127d95a` docs(publishing): record PROM redaction and local-only overlay operation
- **ビルド状態**: web-next 全体で typecheck クリーン・build 成功。テスト 412 passed（48 ファイル。アーキタイプ A 全ページ契約＋ anatomy〈検索コア＋autocomplete＋scroll-spy 左ナビ＋セマンティックタグ〉／PROM 各尺度＋用語集＋ export モジュール〈flatten/workbook/csv/sheetsClient/upsert/DataManager 同期 UI〉が green）
- **次の作業**: `/anatomy` 実 glTF 資産投入（`public/models/LICENSES.md`）・Lighthouse 実測／Google Sheets 同期の実機確認（`NEXT_PUBLIC_GOOGLE_CLIENT_ID` 設定後）／新規コンテンツ移行待ち
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
| Phase 5 | 外部連携: Google スプレッドシート同期 + CSV エクスポート | ✅ 完了 |

- **テスト**: アーキタイプ B（prom）はコア + シェル契約に加え、export モジュール（flatten/workbook/csv/sheetsClient/upsert/DataManager 同期 UI）を TDD 追加。加えて制限尺度 overlay（`restricted.test`）・save-flow 契約（PromForm/Diary）・`upsert` dedupe を追加。B 系統 128 passed（web-next 全体で 399 passed）/ typecheck / build 全通過。
- **構成**: `lib/prom/`（コア = registry/scoring/storage/types）+
  `components/prom/`（シェル = PromApp + 9 ビュー + Header/Toast/UrgentDialog/Mermaid + `useExporters`）+
  `app/prom-checker/`（page + scoped CSS）。
- **外部連携（Phase 5・新設）**: `lib/export/`（`ExportPayload` → 純粋 `ExportWorkbook` → `ReportExporter` の三層分離）。
  `flatten.ts`/`workbook.ts`（純粋変換コア）/ `csv.ts`（RFC 4180 + UTF-8 BOM）/
  `google/{gis,sheetsClient,googleSheetsExporter}.ts`（GIS トークンモデル・fetch 注入・純粋 `computeUpsert`）/
  `registry.ts`（宣言的 `buildExporters`）。`DataManager` に「外部連携・同期」カードを配線。
  設定は `Settings.syncTargets.googleSheets`（`spreadsheetId`/`lastSyncedAt`）のみ保持しトークンは非永続（`normalizeSyncTargets`）。
  設計書 `docs/google-sheets-sync-design.md`。有効化には `NEXT_PUBLIC_GOOGLE_CLIENT_ID`（`.env.example` 参照）が必要。
- **視覚確認（ユーザー手動）**: `cd web-next && bun run dev` → `/prom-checker` → データ管理。

### アーキタイプ A（静的教育ガイドページ）

`Types-of-headache/html-files/**/*.html` の教育ページを Server Component として忠実転記する系統。

| ページ | ルート | ステータス | 備考 |
|---|---|---|---|
| Cervicogenic-Headache | `/headaches/cervicogenic-headache` | ✅ 完了 | 16 section / Mermaid 6図 / table 19 / 外部リンク 31 |
| Medication-Overuse-Headache | `/headaches/medication-overuse-headache` | ✅ 完了 | 18 section / Mermaid 5図 / table 24 / 外部リンク 18 |
| Cervical-Plexus-Block | `/blocks/cervical-plexus-block` | ✅ 完了 | **A 参照実装**。18 section / Mermaid 12図 / table 22 / 外部リンク 15 |
| Occipital-Nerve-Block | `/blocks/occipital-nerve-block` | ✅ 完了 | 17 section / Mermaid 10図 / table 24 / 外部リンク 31 |
| Stellate-Ganglion-Block | `/blocks/stellate-ganglion-block` | ✅ 完了 | 11 section / Mermaid 11図 / table 22 / 外部リンク 25 |
| Migraine | `/headaches/migraine` | ✅ 完了 | 14 section / Mermaid 9図 / table 20 / 外部リンク 32 |
| Tension-Type-Headache | `/headaches/tension-type-headache` | ✅ 完了 | 15 section / Mermaid 8図 / table 29 / 外部リンク 38 |
| Physical-Therapy-for-Headache | `/therapies/physical-therapy-for-headache` | ✅ 完了 | 15 section / Mermaid 9図 / table 33 / 外部リンク 57 |
| Nutrition-and-Supplements | `/therapies/nutrition-and-supplements` | ✅ 完了 | 12 section / Mermaid 8図 / table 31 / 外部リンク 46 |
| Psychological-Behavioral-Therapy | `/therapies/psychological-behavioral-therapy` | ✅ 完了 | 14 section / Mermaid 8図 / table 28 / 外部リンク 51 |
| Headache-Acupoints-Trigger-Points | `/therapies/headache-acupoints-trigger-points` | ✅ 完了 | 9 section / Mermaid 2図 / table 4 / 外部リンク 10 |
| Trigger-points-and-headache | `/therapies/trigger-points-and-headache` | ✅ 完了 | 9 section / Mermaid 3図 / table 5 / 外部リンク 10 |
| Headache-Diary | `/prom/headache-diary` | ✅ 完了 | 16 section / Mermaid 9図 / table 29 / 外部リンク 46 |
| Headache-Impact-Test | `/prom/headache-impact-test` | ✅ 完了 | 14 section / Mermaid 3図 / table 24 / 外部リンク 37 |
| Migraine-Disability-Assessment | `/prom/migraine-disability-assessment` | ✅ 完了 | 16 section（s1-s15+appendix）/ Mermaid 3図 / table 31 / 外部リンク 25 |
| Migraine-Specific-Quality-of-Life | `/prom/migraine-specific-quality-of-life` | ✅ 完了 | 15 section（s1-s15）/ Mermaid 6図 / table 29 / 外部リンク 26 |
| Numerical-Rating-Scale-Visual-Analogue-Scale | `/prom/numerical-rating-scale-visual-analogue-scale` | ✅ 完了 | 15 section / Mermaid 8図 / table 30 / 外部リンク 20 |
| Patient-Global-Impression-of-Change | `/prom/patient-global-impression-of-change` | ✅ 完了 | 14 section / Mermaid 8図 / table 16 / 外部リンク 17 |
| 3D解剖アトラス | `/anatomy` | 🟢 Phase 2 コード完了 | **新設・data-driven**（HTML転記ではない）。`lib/anatomy` manifest 駆動で6構造（神経/血管/脳/骨/筋/総覧）。ModelViewer（`@google/model-viewer` 遅延描画＋3Dホットスポット注釈＋読込失敗時の降格）/ MriSliceViewer（読影風2Dスクラバ）をクライアントアイランド遅延配置。Phase1=匿名化MRI投入（脳/頚椎 各8枚・`sanitizePng`+`scripts/curate-mri.mjs`）／Phase2=glTFビューア実装（`types/model-viewer.d.ts`・7テスト）完了。設計書 `docs/architecture.md`。Phase3=用語ツールチップ基盤（`lib/glossary`＋`components/glossary/Term.tsx`／読み仮名＋やさしい解説、ホバー・フォーカス・タップ対応）を新設し `/anatomy` 凡例＋主要ガイド（`app/headaches/` 4ページ）へ適用（残り画面は `.claude/skills/glossary-term-tooltip` の手順で展開）。Phase4=UX/IA/A11y ブラッシュアップ完了（manifest 駆動の検索コア `lib/anatomy/search.ts`＋WAI-ARIA autocomplete `AnatomySearch`、scroll-spy 左ナビ `AnatomySidebar`、`.anatomy-layout` 化、Hero 検索/カテゴリチップ/skip リンク、教育リンクのセマンティックタグ `data-cat`、`prefers-color-scheme` ダークモード、reduced-motion、focus-visible）。残=実 glTF 資産投入（`public/models/LICENSES.md`）・Lighthouse 実測 |

- **共有コンポーネント（A 共通・本移行で新設）**: `components/MermaidDiagram.tsx`（default export・
  lazy import・`themeVariables` 上書き可）/ `components/Ext.tsx`（外部リンク安全化）。
- **chrome のみクライアント化**: 各ページのサイドバー（scroll-spy = IntersectionObserver）を Client Component 化。
  `components/blocks/CpbSidebar.tsx` / `components/blocks/OnbSidebar.tsx` / `components/blocks/SgbSidebar.tsx` /
  `components/headaches/CehSidebar.tsx` / `components/headaches/MohSidebar.tsx` / `components/headaches/MigraineSidebar.tsx` /
  `components/headaches/TthSidebar.tsx` / `components/therapies/NutritionSidebar.tsx` /
  `components/therapies/PsychologicalBehavioralTherapySidebar.tsx` / `components/prom/HeadacheDiarySidebar.tsx` /
  `components/prom/HeadacheImpactTestSidebar.tsx` / `components/prom/MigraineDisabilityAssessmentSidebar.tsx` /
  `components/prom/MigraineSpecificQualityOfLifeSidebar.tsx` /
  `components/prom/PatientGlobalImpressionOfChangeSidebar.tsx`。
  本文は Server Component のまま。スタイルは `app/<area>/<slug>/<slug>.css` に `.cervical-accent` / `.occipital-accent` / `.ceh-accent` /
  `.moh-accent` / `.migraine-accent` / `.tth-accent` / `.psychological-behavioral-accent` / `.headache-diary-accent` / `.pgic-accent` などでスコープ。
- **テスト**: アーキタイプ A（静的教育ガイド + 共有コンポーネント + `/anatomy`）は計 271 passed（PROM 各尺度の静的ガイドページ契約を含む。anatomy 検索コア 9・AnatomySearch 6・AnatomySidebar 4・page 契約 +1 を追加）。lint / typecheck 全通過。
- **視覚確認（ユーザー手動）**: `web-next` で開発サーバ（`npm run dev`）を起動 → `/headaches/cervicogenic-headache`。

---

## 次回セッションでの再開プロンプト

```text
進捗管理ファイルに基づき、次回セッションを再開します。
- 最新 HEAD: 127d95a
- 次の作業: `/anatomy` 実 glTF 資産投入・Lighthouse 実測／Google Sheets 同期の実機確認／新規コンテンツ移行待ち
- 未移行 HTML 残数: 0
```

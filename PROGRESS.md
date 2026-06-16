# 移行進捗状況

頭痛疾患医療教育コンテンツの Markdown から HTML への移行進捗を管理します。

## 現在地

- **最新 HEAD**: `eec36e4` feat(Types-of-headache): Cervicogenic-Headache.html — Phase 4/4: finalize — Progress: 16/16 sections complete
- **ビルド状態**: Mermaid 修正スクリプト正常 / Mermaid テスト 4/4 パス（python3.12）/ Mermaid 6図（TCC収束/ICHD-3診断フロー/SNOOP4/身体評価フロー/神経ブロック確証/治療アルゴリズム）/ 外部リンク31件すべて target="_blank" rel="noopener noreferrer" 付与 / SRI 付与済 / 国際公認ソース（ICHD-3/IHS/NICE/AAN/Cochrane/PubMed）.src-grid 5群明示
- **次の作業**: Headaches/Cervicogenic-Headache.html 完了。新規コンテンツ待ち
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

## 次回セッションでの再開プロンプト

```text
進捗管理ファイルに基づき、次回セッションを再開します。
- 最新 HEAD: eec36e4
- 次の作業: Headaches/Cervicogenic-Headache.html 完了。新規コンテンツ待ち
- 未移行 HTML 残数: 0
```

# 移行進捗状況

頭痛疾患医療教育コンテンツの Markdown から HTML への移行進捗を管理します。

## 現在地

- **最新 HEAD**: `8bb9f6f` feat(Types-of-headache): Psychological-Behavioral-Therapy.html — Phase 4/4: finalize
- **ビルド状態**: Mermaid 修正スクリプト pytest 4 passed / Mermaid 8図 / 外部リンク 51 件すべて rel 付与 / SRI 付与済 / HTMLパースエラー0 / ASCII 図解残存ゼロ
- **次の作業**: `Cervical-Plexus-Block.html` 移行（作成）
- **未移行 HTML 残数**: 1

## 移行ステータス

| 分類 | 疾患/ブロック名 | Markdown ソース | HTML 成果物 | ステータス | 備考 |
|---|---|---|---|---|---|
| Headaches | 片頭痛 (Migraine) | [Migraine.md](Types-of-headache/md-files/Headaches/Migraine.md) | [Migraine.html](Types-of-headache/html-files/Headaches/Migraine.html) | ✅ 完了 | デザインの権威ソース |
| Headaches | 緊張型頭痛 (TTH) | [Tension-Type-Headache.md](Types-of-headache/md-files/Headaches/Tension-Type-Headache.md) | [Tension-Type-Headache.html](Types-of-headache/html-files/Headaches/Tension-Type-Headache.html) | ✅ 完了 | |
| Headaches | 薬物乱用頭痛 (MOH) | [Medication-Overuse-Headache.md](Types-of-headache/md-files/Headaches/Medication-Overuse-Headache.md) | [Medication-Overuse-Headache.html](Types-of-headache/html-files/Headaches/Medication-Overuse-Headache.html) | ✅ 完了 | |
| Blocks | 星状神経節ブロック (SGB) | [Stellate-Ganglion-Block.md](Types-of-headache/md-files/Blocks/Stellate-Ganglion-Block.md) | [Stellate-Ganglion-Block.html](Types-of-headache/html-files/Blocks/Stellate-Ganglion-Block.html) | ✅ 完了 | |
| Blocks | 後頭神経ブロック (ONB) | [Occipital-Nerve-Block.md](Types-of-headache/md-files/Blocks/Occipital-Nerve-Block.md) | [Occipital-Nerve-Block.html](Types-of-headache/html-files/Blocks/Occipital-Nerve-Block.html) | ✅ 完了 | Deep Teal→Cyan ヒーロー / Mermaid 10図 / 4フェーズ分割 |
| Blocks | 頸椎神経叢ブロック (CPB) | [Cervical-Plexus-Block.md](Types-of-headache/md-files/Blocks/Cervical-Plexus-Block.md) | - | ⏳ 未着手 | |
| Physical Therapy | 頭痛に対する理学療法 (PT) | [Physical Therapy-for-Headache.md](Types-of-headache/md-files/Physical-Therapy/Physical%20Therapy-for-Headache.md) | [Physical-Therapy-for-Headache.html](Types-of-headache/html-files/Physical-Therapy/Physical-Therapy-for-Headache.html) | ✅ 完了 | Amber→Coral ヒーロー / Mermaid 9図 / .steps で ASCII 代替 / 4フェーズ分割 |
| Nutrition & Supplements | 頭痛と栄養・サプリメント療法 | [Nutrition-and-Supplements.md](Types-of-headache/md-files/Nutrition-and-Supplements/Nutrition-and-Supplements.md) | [Nutrition-and-Supplements.html](Types-of-headache/html-files/Nutrition-and-Supplements/Nutrition-and-Supplements.html) | ✅ 完了 | Jewel Emerald ヒーロー / Mermaid 8図 / .nut-rx 処方カード / 4フェーズ分割 |
| Psychological & Behavioral | 頭痛の心理・行動療法 | [Psychological-Behavioral-Therapy.md](Types-of-headache/md-files/Psychological-Behavioral-Therapy/Psychological-Behavioral-Therapy.md) | [Psychological-Behavioral-Therapy.html](Types-of-headache/html-files/Psychological-Behavioral-Therapy/Psychological-Behavioral-Therapy.html) | ✅ 完了 | トワイライト藍紫ヒーロー / Mermaid 8図 / .snoop-grid・.therapy-grid / 14セクション / 4フェーズ分割 |

---

## 次回セッションでの再開プロンプト

```text
進捗管理ファイルに基づき、次回セッションを再開します。
- 最新 HEAD: 8bb9f6f
- 次の作業: Cervical-Plexus-Block.html 移行
- 未移行 HTML 残数: 1
```

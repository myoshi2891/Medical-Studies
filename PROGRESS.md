# 移行進捗状況

頭痛疾患医療教育コンテンツの Markdown から HTML への移行進捗を管理します。

## 現在地

- **最新 HEAD**: `524b93c` feat(Types-of-headache): Occipital-Nerve-Block.html — Phase 3/4: sections 9-16 + summary
- **ビルド状態**: Markdown lint 正常 / Mermaid 修正スクリプト pytest 4 passed
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

---

## 次回セッションでの再開プロンプト

```text
進捗管理ファイルに基づき、次回セッションを再開します。
- 最新 HEAD: 524b93c
- 次の作業: Cervical-Plexus-Block.html 移行
- 未移行 HTML 残数: 1
```

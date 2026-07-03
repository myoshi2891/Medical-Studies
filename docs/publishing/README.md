# 公開準備ドキュメント（一般公開に向けたガバナンス）

本ディレクトリは、本リポジトリの一般公開に向けたセキュリティ・著作権・法/規制・インフラのガバナンス文書を集約する。`.agents/skills/improve`（senior advisor・読み取り専用監査）の方針に沿い、**成果物はドキュメントのみ。コード・質問票・設定は変更していない**（各是正は文書内の方針提示に留める）。

> [!CAUTION]
> **本リポジトリは既に GitHub 上で PUBLIC 公開済みである。**
> したがって **F1（著作権保護 PROM 質問票の全文掲載）と F2（LICENSE 不在＋CC-BY-SA 派生資産の再配布）は、将来の公開準備ではなく、現在進行中の露出**である。最優先で [`01-urgent-exposure.md`](01-urgent-exposure.md) を参照すること。

> [!NOTE]
> 法務系文書（01/02/03/05）は**法務助言ではない**。最終判断は権利者確認および専門家レビューに委ねる。

- **監査時点コミット**: `0fced4f`（2026-07-04）

---

## 監査所見サマリ（F1–F7）

| # | 所見 | カテゴリ | 深刻度 | 文書 |
|---|------|---------|--------|------|
| F1 | 公開済みリポジトリに著作権保護 PROM 質問票が全文掲載（HIT-6 / MSQ v2.1） | 法務/著作権 | **P0（進行中の露出）** | [`01`](01-urgent-exposure.md) |
| F2 | ルート LICENSE 不在。CC-BY-SA 2.1 JP 派生 `.glb` を再配布（ShareAlike 未整合） | 法務/著作権 | **P0** | [`01`](01-urgent-exposure.md) / [`02`](02-copyright-and-licensing.md) |
| F3 | 公開 MRI 画像 16 枚の著作権・出典が未文書化（PHI 匿名化は済） | 法務 | P1 | [`03`](03-mri-image-provenance.md) |
| F4 | CSP／セキュリティヘッダ未設定、`SECURITY.md`・脆弱性開示方針なし | セキュリティ | P1 | [`04`](04-security-policy.md) |
| F5 | 規制ポジショニング（SaMD 非該当根拠・管轄・利用規約）が単一文書に未集約 | 法務/規制 | P1 | [`05`](05-legal-and-regulatory.md) |
| F6 | CI／デプロイ／インフラ文書なし | インフラ/DX | P2 | [`06`](06-infrastructure-and-deployment.md) |
| F7 | git 履歴に実メールアドレス 1 件（author）が残存 | プライバシー | P2 | [`06`](06-infrastructure-and-deployment.md) |

### 良好な点（記録のみ・是正不要）

- 生データ・患者データ（`images/`・`diagnosis/`・`BodyParts3D/`）は `.gitignore` で除外済み。
- 全ページ共通の医療免責バナーを整備済み。
- Google 連携はゼロ知識設計（サーバ・秘密情報なし、`drive.file` 最小スコープ、トークンはメモリのみ）。
- `.env.example` は公開値のみ。ハードコード秘密情報は検出されず（テスト内ダミーを除く）。
- BodyParts3D の CC-BY-SA 帰属表示は公開 UI（`/anatomy`）に掲示済み。

---

## 文書一覧とステータス

| 文書 | 対象 | 優先度 | ステータス |
|---|---|---|---|
| [`01-urgent-exposure.md`](01-urgent-exposure.md) | F1・F2 の即時対応 | P0 | 起草済（要ユーザー判断） |
| [`02-copyright-and-licensing.md`](02-copyright-and-licensing.md) | デュアルライセンス方針 | P0 | 起草済＋`LICENSE`/`THIRD_PARTY_NOTICES.md` 配置済 |
| [`03-mri-image-provenance.md`](03-mri-image-provenance.md) | MRI 画像出典 | P1 | 起草済（出典は要確認） |
| [`04-security-policy.md`](04-security-policy.md) | セキュリティ姿勢・CSP 骨子 | P1 | 起草済＋`SECURITY.md` 配置済 |
| [`05-legal-and-regulatory.md`](05-legal-and-regulatory.md) | SaMD 非該当・規約骨子 | P1 | 起草済 |
| [`06-infrastructure-and-deployment.md`](06-infrastructure-and-deployment.md) | CI・デプロイ・F7 | P2 | 起草済 |

### ルート標準ファイル（本計画で新設）

- `LICENSE` — コード用 MIT（スコープ注記でコンテンツ／`.glb`／PROM を除外）
- `THIRD_PARTY_NOTICES.md` — 第三者資産の帰属集約
- `SECURITY.md` — 脆弱性報告・開示方針

---

## 推奨対応順序と依存関係

```text
P0  01（緊急露出の棚卸し・判断）
     └─ 02（ライセンス方針・LICENSE/THIRD_PARTY_NOTICES）← 01 の是正の受け皿
P1  03（MRI 出典）／ 04（セキュリティ・SECURITY.md）／ 05（法務・規制）  ← 並行可
P2  06（インフラ・CI・F7）
```

- **01 → 02**: 質問票の掲載可否判断（01）が、ライセンス分離方針（02）の前提。
- **02 は 03/04/05 に先行**: 全資産のライセンス境界が定まってから個別是正へ進む。
- **F7（06）**: 履歴書き換えを選ぶ場合は全ブランチ一括処理（過去の教訓）。破壊的操作のため最後に判断。

## 本計画のスコープ外（変更しない）

- `web-next/lib/prom/registry.ts`・`prom-checker/index.html`・`web-next/app/prom/**`（質問票の削除／差し替えは行わない）
- `web-next/next.config.ts`（CSP は設計記述のみ）
- `.gitignore` 除外済みディレクトリ

各是正の実装は、本文書群を入力として別途プラン化・実行する。

# Medical Studies - 頭痛疾患 医療教育 ＆ PROM 統合プラットフォーム

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Bun](https://img.shields.io/badge/Bun-Latest-orange)](https://bun.sh/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](https://www.typescriptlang.org/)

本リポジトリは、頭痛疾患（Types of Headache）に関する体系的な医療教育コンテンツの提供と、患者報告アウトカム（PROM: Patient-Reported Outcome Measures）の収集・評価を行うためのオープンソース Web アプリケーションプラットフォームです。

国際頭痛分類第3版（ICHD-3）等の国際ガイドライン・学術的エビデンスに基づき、片頭痛をはじめとする各種頭痛の病態生理、神経ブロック、薬物・非薬物療法を網羅しています。また、完全クライアントサイド動作による高いプライバシー保護を備えた頭痛日誌・PROM 管理機能を備えています。

---

## 🌟 主な機能と特徴

### 1. 体系的な医療教育コンテンツ
- **疾患別解説**: 片頭痛、緊張型頭痛（TTH）、薬物乱用頭痛（MOH）、頸原性頭痛（CEH）、ストレートネックに伴う頭痛など
- **病態生理と解剖学**: 頭痛に関与する脳神経・末梢神経系、血管系、三叉神経血管説などの詳細な解説
- **多面的治療アプローチ**:
  - 急性期治療薬の選択基準と使用日数管理（MOH予防）
  - 予防薬物療法（CGRP関連製剤等を含むエビデンスベース）
  - 神経ブロック療法（星状神経節ブロック、後頭神経ブロック、頸椎神経叢ブロック等）
  - 非薬物療法（理学療法、トリガーポイント、栄養療法、心理行動療法、生活習慣管理 SEEDS）
- **学習補助機能**:
  - 医療専門用語のルビ・やさしい解説を表示するツールチップ（`AutoGlossary`）
  - サイト横断インクリメンタル検索（`SiteSearch`）

### 2. PROM（患者報告アウトカム）統合評価ツール
頭痛診療で標準的に用いられる主要尺度を Web 上で記録・可視化できます。
- **対応尺度**:
  - **HIT-6** (Headache Impact Test) ※
  - **MIDAS** (Migraine Disability Assessment)
  - **MSQ v2.1** (Migraine-Specific Quality of Life Questionnaire) ※
  - **NRS / VAS** (Numerical Rating Scale / Visual Analogue Scale)
  - **PGIC** (Patient Global Impression of Change)
  - **頭痛ダイアリー** (日々の頭痛記録・薬剤服薬管理)
- **プライバシー保護**: Google スプレッドシート同期を有効にしていない場合、入力されたスコアや日誌データは利用者の端末内（ブラウザの `localStorage`）にのみ保存され、外部サーバへ送信されません。同期を有効にして実行した場合は、選択したデータ（頭痛日誌および PROM スコア）が Google スプレッドシートへ送信されます。
- **データ連携**: CSV エクスポート機能および Google スプレッドシート同期機能（Google Drive の `drive.file` 最小スコープで連携）を搭載。

> ※ HIT-6 および MSQ v2.1 は権利者所有の著作物であるため、公開リポジトリ・本番環境では中立プレースホルダが表示されます（詳細は後述の「著作権保護 PROM の取り扱い」を参照）。

### 3. 3D 解剖ビジュアライザー
- BodyParts3D（ライフサイエンス統合データベースセンター: DBCLS）由来のモデルを用いた 3D 解剖ビジュアライザーを搭載し、頭痛と関連する骨格・神経の立体的な把握を支援します。

---

## 📁 ディレクトリ構成

```text
.
├── web-next/             # Next.js App Router アプリケーション（現行の主戦場）
│   ├── app/              # ルーティング・各コンテンツページ (Server/Client Components)
│   ├── components/       # UI コンポーネント (PROM, Glossary, 3D Anatomy, SiteSearch 等)
│   ├── lib/              # コアロジック (PROM 採点計算, 用語集, データ連携, CSP セキュリティ)
│   ├── public/           # 静的アセット (3D モデル, PROM 定義等)
│   └── tests/            # Vitest テストスイート
├── docs/                 # 詳細仕様書・設計書・公開ガイドライン
│   ├── google-sheets-sync-design.md # Google スプレッドシート連携仕様
│   └── publishing/       # セキュリティ・法的免責・知的財産権等の運用方針
├── BodyParts3D/          # 3D 解剖モデルの元データおよび変換スクリプト
├── scripts/              # コンテンツ変換・自動整形スクリプト群
├── AGENTS.md             # AI エージェント（Cursor, Antigravity, Claude Code 等）共通規約
├── GEMINI.md / CLAUDE.md # 開発規約・プロジェクト詳細仕様（SSoT）
├── PROGRESS.md           # 開発・移行進捗トラッキング
├── SECURITY.md           # セキュリティ方針と脆弱性報告窓口
├── THIRD_PARTY_NOTICES.md# サードパーティライセンス・著作権表示
└── LICENSE               # MIT ライセンス（ソースコード適用）
```

---

## 🚀 クイックスタート (開発環境のセットアップ)

アプリケーションの本体は `web-next/` ディレクトリにあります。
パッケージマネージャには **Bun** を使用します。

### 前提条件
- [Bun](https://bun.sh/) 1.3+ (推奨 / パッケージマネージャ)
- [Node.js](https://nodejs.org/) 22+ (動作確認: v22.23.2)

### セットアップ手順

```bash
# 1. リポジトリのクローン
git clone https://github.com/myoshi2891/Medical-Studies.git
cd Medical-Studies

# 2. web-next ディレクトリへ移動
cd web-next

# 3. 依存パッケージのインストール
bun install

# 4. 環境変数の設定 (必要に応じて)
cp .env.example .env.local

# 5. 開発サーバーの起動
bun run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くとアプリケーションが起動します。

---

## 🛠️ 開発コマンド (`web-next/`)

本リポジトリでは品質担保のため、厳格な型安全とテスト駆動開発（TDD）を採用しています。

| コマンド | 説明 |
|---|---|
| `bun run dev` | 開発サーバーを起動（ローカルポート 3000） |
| `bun run build` | 本番用プロダクションビルド |
| `bun run test` | Vitest による単体・結合テストの実行 |
| `bun run test:watch` | テストのウォッチモード起動 |
| `bun run typecheck` | TypeScript 型チェック（`tsc --noEmit`） |
| `bun run lint` | Biome によるコード構文チェックおよびフォーマット |

---

## ⚖️ 著作権保護 PROM の取り扱い（開発者向け）

HIT-6 および MSQ v2.1 は著作権保護された質問票です。このため、本リポジトリおよび本番デプロイでは文言が直接コミットされておらず、概要と公式リンクのみが表示されます。

ローカル開発環境で質問票の完全な文言を表示・検証したい場合は、**正規の手続きで入手した文言**を用いてローカルオーバーレイファイルを作成します。

```bash
cd web-next
cp public/prom-restricted.example.json public/prom-restricted.local.json
# 公式配布元から取得した質問文を prom-restricted.local.json に記入
bun run dev
```

- `public/*.local.json` は `.gitignore` に指定されており、Git にコミットされません。
- 本番ビルド（`NODE_ENV=production`）では安全策として読み込みが無効化されます。
- 詳細および配布元リンクは [`web-next/README.md`](web-next/README.md) および [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) を参照してください。

---

## 🔒 セキュリティとプライバシー

- **クライアントサイド完結**: Google スプレッドシート同期を有効にしていない場合、ユーザーの頭痛記録や PROM 回答データはサーバーへ送信されず、すべてブラウザの `localStorage` で保持されます。同期を有効にして実行した場合は、選択したデータ（頭痛日誌および PROM スコア）が Google スプレッドシートへ送信されます。
- **厳格な CSP (Content Security Policy)**: 外部通信やスクリプト実行を厳格に制限しています。
- **脆弱性報告**: セキュリティに関する懸念を発見された場合は、公開 Issue ではなく GitHub の [Private Vulnerability Reporting](https://github.com/myoshi2891/Medical-Studies/security/advisories) を通じてご連絡ください。詳細は [`SECURITY.md`](SECURITY.md) に記載されています。

---

## ⚠️ 医療上の免責事項 (Medical Disclaimer)

本リポジトリが提供するすべてのコンテンツ（テキスト、図表、3Dモデル、PROM スコア計算等）は、**教育および学術研究、一般的な情報提供のみを目的**として作成されています。

- 医師による医学的診断、治療、助言を代替するものではありません。
- 突然の激しい頭痛、発熱や麻痺・しびれ・ろれつが回らないなどを伴う頭痛といった危険な徴候（レッドフラッグ）がある場合は、専門外来の予約を待たず、**直ちに救急外来を受診するか、地域の救急番号（日本では 119）へ連絡してください**。
- 危険な徴候がなくても頭痛が続く・悪化する場合は、医療機関（脳神経内科、脳神経外科、頭痛外来など）を受診してください。
- 詳細は [`docs/publishing/05-legal-and-regulatory.md`](docs/publishing/05-legal-and-regulatory.md) をご確認ください。

---

## 📄 ライセンス

- **ソースコード**: [MIT License](LICENSE)
- **教育コンテンツ・ドキュメント**: 各種著作権・免責事項が適用されます。
- **3D 解剖モデル**: [BodyParts3D](https://dbcls.rois.ac.jp/)（ライフサイエンス統合データベースセンター）を加工して作成されています（[CC BY-SA 2.1 JP](https://creativecommons.org/licenses/by-sa/2.1/jp/)）。

詳細なサードパーティライセンスおよび帰属表示については、[`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) をご覧ください。

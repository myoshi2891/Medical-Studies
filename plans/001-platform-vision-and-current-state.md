# Plan 001: 頭痛専門プラットフォームの全体ビジョンと現状分析を確立する

> **Executor instructions**: 本ファイルは plans/002〜007 すべての前提となるビジョン・現状分析文書である。
> 後続プランを実行する前に必ず本ファイルを通読すること。本プラン自体にコード変更は含まれない。
> 「STOP conditions」に該当する事態が起きたら、改変せず報告すること。
>
> **Drift check (run first)**: `git diff --stat a9e470c..HEAD -- web-next/ docs/ PROGRESS.md`
> 上記で web-next のルート構成（app/ 配下のディレクトリ増減）や docs/ の設計書が変わっている場合、
> 「Current state」の記述と実態を突き合わせ、乖離があれば本ファイルの改訂を先に提案すること。

## Status

- **Priority**: P1
- **Effort**: S（参照文書。読了と合意のみ）
- **Risk**: LOW
- **Depends on**: none
- **Category**: direction
- **Planned at**: commit `a9e470c`, 2026-07-09

## Why this matters

web-next は「頭痛疾患の教育コンテンツ集」として成長してきたが、疾患 4 種・療法 3 種・PROM 6 種という
現在の構成は、頭痛診療の全体像（ICHD-3 が定義する一次性・二次性頭痛の広がり、薬物・非薬物治療の選択肢、
患者の療養生活）のごく一部にとどまる。今後「頭痛を専門とするプラットフォーム」へ拡張するには、
(1) 何を柱とするか、(2) 既存資産のどこに接ぎ木するか、(3) 何を恒久的にやらないか、を先に文書として
固定する必要がある。本プランはその共通前提であり、後続の 002（カテゴリ体系）、003（情報収集運用）、
004〜006（コンテンツ拡張）、007（技術基盤）はすべて本ファイルのビジョンを参照する。

## Current state（現状分析）

### ディレクトリ構成（web-next、commit `a9e470c` 時点）

```text
web-next/                    # Next.js 16 / React 19 / Bun 1.3 / Tailwind v4 / Biome / Vitest（356 tests green）
├── app/
│   ├── page.tsx             # ホーム（/prom-checker へ誘導）
│   ├── anatomy/             # 3D 解剖アトラス（glTF + MRI PNG。docs/architecture.md v1.3 準拠）
│   ├── headaches/           # 疾患 4: migraine / tension-type-headache /
│   │                        #   medication-overuse-headache / cervicogenic-headache
│   ├── blocks/              # 神経ブロック 3: occipital-nerve-block / cervical-plexus-block /
│   │                        #   stellate-ganglion-block
│   ├── therapies/           # 療法 3: physical-therapy-for-headache /
│   │                        #   nutrition-and-supplements / psychological-behavioral-therapy
│   ├── prom/                # PROM 解説 6: headache-diary / headache-impact-test(HIT-6) /
│   │                        #   migraine-disability-assessment(MIDAS) /
│   │                        #   migraine-specific-quality-of-life(MSQ) /
│   │                        #   numerical-rating-scale-visual-analogue-scale(NRS/VAS) /
│   │                        #   patient-global-impression-of-change(PGIC)
│   └── prom-checker/        # 患者向け PROM 統合チェッカー（クライアント SPA）
├── lib/
│   ├── prom/                # scoring / registry / storage / upsert / datetime（純関数コア + テスト）
│   ├── anatomy/             # manifest / search / types / png-sanitize
│   ├── glossary/            # 用語集レジストリ（読み仮名＋やさしい解説ツールチップ）
│   └── export/              # ExportWorkbook 中間表現 → CSV / Google Sheets（google/ 配下）
├── components/
│   ├── site/                # SiteHeader / nav-links.ts / DisclaimerBanner
│   ├── headaches/ blocks/ therapies/ prom/ anatomy/ glossary/
│   └── prom/views/
├── public/                  # 静的資産（3D モデル・MRI PNG 等）
├── scripts/ tests/ types/
└── package.json             # scripts: dev / build / lint(biome) / test(vitest) / typecheck(tsc)
```

### 既存カテゴリと成熟度

| カテゴリ | ルート | ページ数 | 成熟度 |
|---|---|---|---|
| 疾患解説 | `/headaches/*` | 4 | 一次性 2 + 二次性 2。ICHD-3 の主要疾患のうち群発頭痛等が未着手 |
| 神経ブロック | `/blocks/*` | 3 | 主要 3 手技は完了 |
| 療法 | `/therapies/*` | 3 | 理学療法・栄養/サプリ・心理行動療法。薬物療法の独立ページなし |
| PROM 解説 | `/prom/*` | 6 | 主要尺度は網羅 |
| PROM ツール | `/prom-checker` | 1 | スコアリング・保存・CSV/Sheets エクスポートまで実装済み |
| 解剖 | `/anatomy` | 1 | 3D アトラス実装済み。実 glTF 資産投入が残作業（PROGRESS.md 参照） |

### 既存の設計・運用資産（コードから読み取れない決定事項）

- `docs/architecture.md`（v1.3）— `/anatomy` を **教育専用・診断補助なし・薬機法 SaMD 非該当** に
  意図的リスコープした設計書。DICOM 読込・患者固有再構築・AI 診断は **恒久的に非対象** と宣言済み。
- `docs/google-sheets-sync-design.md` — 頭痛日誌・PROM スコアの Google Sheets 同期／CSV
  エクスポート詳細設計（`ExportWorkbook` 中間表現の三層分離）。実装済み・実機確認が残作業。
- `docs/publishing/01〜06` — 公開に向けた法務・著作権・MRI 画像出所・セキュリティ・薬機法/医療広告・
  インフラの検討記録。コンテンツ拡張時の法的制約はここが権威。
- コンテンツパイプライン: `Types-of-headache/md-files/`（ICHD-3 準拠の教育 Markdown）→ 教育 HTML →
  `nextjs-page-migration` スキルで web-next へ TDD 移行。**未移行 HTML 残 0**（PROGRESS.md）。
  つまり新規拡張は「新しい md を書く」ところから始まる。
- ナビ: `web-next/components/site/nav-links.ts` に `disabled: true`（準備中表示）機構があり、
  未実装ルートを 404 にせず事前掲示できる。段階公開の受け皿として利用する。
- 全ページ共通の免責: `components/site/DisclaimerBanner.tsx`（教育目的・医療助言ではない旨）。

## ビジョン：頭痛専門プラットフォームの 4 本柱

対象読者は **医学生・研修医・コメディカル・患者と家族**（`docs/architecture.md` のユーザーストーリーを踏襲）。
すべてのコンテンツはこの順で成立させる：**正確性（エビデンス準拠）→ 分かりやすさ（用語集・図解）→ 網羅性**。

| 柱 | 内容 | 既存資産 | 拡張の方向（詳細は各プラン） |
|---|---|---|---|
| 1. 情報収集 | 権威ソースの監視と教育コンテンツへの反映 | md-files 執筆フロー | ソース一覧・監視周期・鮮度メタデータの運用化 → plans/003 |
| 2. 研究 | ガイドライン・主要論文・病態生理の要約発信 | 各ページの参考文献網 | `/research` カテゴリ新設 → plans/005 |
| 3. 治療 | 薬物（急性期・予防・サプリ）＋非薬物（ブロック・理学・心理・ニューロモジュレーション） | blocks 3 / therapies 3 | 薬物療法カテゴリ新設・サプリ拡充 → plans/004 |
| 4. 療養 | 患者の生活・セルフケア・記録（ダイアリー/PROM） | prom-checker / prom 6 | `/care` カテゴリ新設・PROM との導線 → plans/006 |

横串として：**カテゴリ体系そのもの**（ICHD-3 軸＋ライフステージ軸）は plans/002、
**技術基盤**（横断検索・鮮度メタデータ・nav 再設計）は plans/007 が定義する。

### 不変の原則（後続プラン共通の制約）

1. **教育専用・診断補助なし・SaMD 非該当**を維持する。診断アルゴリズム提供・個別用量推奨・
   AI 診断は追加しない（`docs/architecture.md` 1.3 節、`docs/publishing/05` と整合）。
2. **エビデンス準拠**: 疾患・治療の記述は ICHD-3 と主要ガイドラインに根拠を持たせ、参考文献を付す。
3. **単一コンテンツパイプライン**: 新規ページは `Types-of-headache/md-files/` の Markdown を SSoT とし、
   `nextjs-page-migration` スキル（アーキタイプ A/B）で web-next 化する。web-next 直書きの
   コンテンツを作らない。
4. **段階公開**: 新カテゴリは nav-links.ts の `disabled` で先に骨格を掲示し、ページ完成ごとに開放する。
5. **やさしい言い換え**: 専門用語は `lib/glossary` レジストリに登録し `<Term>` ツールチップで注釈する。

## Scope

**In scope**（本プランの成果物）:

- 本ファイル（ビジョン・現状分析の合意文書）

**Out of scope**（本プランでは行わない）:

- `web-next/` 配下のあらゆるコード変更
- カテゴリの具体的な追加順序・ルート名の確定（plans/002 の責務）
- `docs/` や `PROGRESS.md` の改訂

## Steps（本ファイルの使い方）

### Step 1: 後続プラン実行前の通読

plans/002〜007 の実行者は、着手前に本ファイルの「不変の原則」5 項目を読み、
自プランの成果物がこれに反しないことを確認する。

**Verify**: 各後続プランの Done criteria に「001 の不変の原則に反していない」チェックがあること。

### Step 2: 乖離時の改訂提案

web-next の実態（カテゴリ増減・技術スタック変更）が本ファイルの「Current state」と乖離したら、
後続プランの実行より先に本ファイルの改訂を提案する。

**Verify**: `git diff --stat a9e470c..HEAD -- web-next/app` の出力にディレクトリ追加が含まれる場合、
本ファイルのカテゴリ表が更新済みであること。

## Done criteria

- [ ] 本ファイルが `plans/` に存在し、`npx markdownlint-cli -c .markdownlint.json` でエラー 0
- [ ] plans/README.md のステータス表に本プランの行がある
- [ ] 後続プラン（002〜007）がすべて本ファイルを「Depends on」または本文中で参照している

## STOP conditions

以下の場合は作業を止めて報告する（改変・忖度しない）:

- `docs/architecture.md` のスコープ宣言（教育専用・SaMD 非該当）と矛盾する拡張要求を受けた場合
- `docs/publishing/05-legal-and-regulatory.md` が禁じる表現（診断・治療効果の保証等）を
  含むコンテンツ計画を求められた場合
- コンテンツパイプライン（md-files → web-next）を迂回して web-next に直接コンテンツを
  書く指示を受けた場合

## Maintenance notes

- 本ファイルは「プラットフォームの憲法」に相当する。カテゴリの増減・対象読者の変更・
  法規制環境の変化（薬機法・医療広告ガイドライン改訂）があれば最初に本ファイルを改訂する。
- レビュー観点: 新規プラン・新規ページが 4 本柱のどれに属するか一意に言えるか。言えない場合は
  柱の定義（または plans/002 のカテゴリ体系）の見直しシグナルである。
- 意図的に先送りした論点: 多言語化・収益化・ユーザーアカウント制はいずれも本ビジョンに含めない
  （plans/007 の将来スパイク候補として管理する）。

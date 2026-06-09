---
paths:
  - "Types-of-headache/md-files/**/*.md"
  - "Types-of-headache/html-files/**/*.html"
---

# 編集・変換の必須サイクル & コミット分割ルール

頭痛医療教育コンテンツの品質とトレーサビリティを担保するため、以下の編集・検証サイクルおよびコミット分割を**絶対的な強制ルール**として適用する。

## 核心原則

<ai_agent_directive>
**AI エージェントへの厳格な指示**:

1. **検証チェック（Lint/テスト）を経ないコミットや、無秩序な一括コミットは禁止。**
2. **ステップバイステップでの実装・コミットの厳守。** 「Markdown の修正」と「HTML の作成・変換」など、異なる作業フェーズを一括で実装・コミットしてはならない。必ず 1 つのステップが完了し、検証（Lint/テスト）を通過した段階で個別にコミットを実行し、その後に次のステップへ進むこと。
3. **大規模 HTML 作成時は 4 フェーズ分割コミット戦略の徹底。**
4. **違反検知時は即時報告。** サイクルを飛ばしたことに気づいた場合、独断で `git reset` 等を実行せず、直ちにユーザーへ報告し、承認を得たうえでリカバリ手順を実施すること。
</ai_agent_directive>

## 必須ワークフロー

### ステップ 1: Markdown 編集 & 品質チェック (Lint & Format)

Markdown ファイルを新規作成または編集した場合、必ずコミット前に自動整形と Lint 検証を実行する。

- **実行**:
  1. 自動整形: `bun scripts/format-markdown.mjs <ファイルパス>`
  2. Lint検証: `npx markdownlint-cli -c .markdownlint.json <ファイルパス>`
- **コミット**: `docs(Types-of-headache): <作業内容の要約 (例: update Stellate-Ganglion-Block.md)>`

### ステップ 2: HTML 変換・作成とテスト

Markdown から HTML を作成または修正する場合、デザインシステム（`Migraine.html`）を継承し、Mermaid 構文のチェックを実施する。

- **HTML 変換**:
  - `md-to-medical-html` スキルを活用して、Markdown から HTML への変換を正しく行う。
- **Mermaid 構文の自動修正とテスト**:
  - `python3 .claude/skills/fix-mermaid/scripts/fix_mermaid.py <HTMLファイルパス>` を実行して Mermaid の HTML エンティティエスケープと構文の自動修正を行う。
  - `python3 -m pytest .claude/skills/fix-mermaid/scripts/test_fix_mermaid.py` を実行し、修正スクリプトのテストスイートがすべてパスすることを確認する。
- **コミット（大規模 HTML 新規作成時）**:
  - 以下の 4 フェーズに分割してコミットする。コミットメッセージには必ず `Progress: N/M sections complete` を含める。
  - **詳細手順とスクリプト引数の完全仕様は `.claude/skills/md-to-medical-html/SKILL.md` を参照**（重複定義禁止）。
    - **Phase 1**: スケルトン自動生成 — `bun scripts/build-html-skeleton.mjs --page=… --hero=… ...`
    - **Phase 2**: 前半セクション断片を `tmp/<page>-phase2.html` に書き出し → `bun scripts/insert-sections.mjs <target> <fragment>` で挿入
    - **Phase 3**: 後半セクションを同様に挿入（最後の挿入では `--final` でマーカー除去）
    - **Phase 4**: `python3 .claude/skills/fix-mermaid/scripts/fix_mermaid.py <target>` で Mermaid 検証 + 最終チェックリスト確認

### ステップ 3: 最終検証 (Verify)

成果物となる HTML ファイルが正常に動作するか、完成確認チェックリストを満たしているかを確認する。

- **チェック項目**:
  - ブラウザで開き、Mermaid 図がすべてレンダリングされているか
  - サイドバーのスクロールリンクが機能しているか
  - モバイル幅（<900px）でナビゲーションが非表示になり、コンテンツの視認性が保たれているか
  - 外部リンクに `target="_blank" rel="noopener noreferrer"` が付与されているか
  - `<script>` タグ（Mermaid 等）に正しい integrity ハッシュと crossorigin が付与されているか

## 違反時の対応

万が一、このルールに違反（手順のスキップや一括コミットなど）したことに気づいた場合は、以下の手順を徹底すること：

1. **即座に報告**: ユーザーに対して、どの手順をスキップしたか、どのコミットが不適切であったかを直ちに報告する。
2. **勝手な修復の禁止**: ユーザーの承認を得る前に `git reset` や修正コミットを自律的に実行してはならない。
3. **リカバリ案の提示**: 正しい状態に戻すための手順を提案し、承認を得てから実行する。

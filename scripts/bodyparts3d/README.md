# BodyParts3D → 頭痛教材 3D パイプライン

頭痛医学教材用の 3D アセット（`web-next/public/models/<id>.glb`）を、
[BodyParts3D](https://lifesciencedb.jp/bp3d/) v4.0 の OBJ から生成するパイプライン。
`promp.md`（リポジトリ直下）の要求を実データに合わせて是正した実装。

> 出典: BodyParts3D, © The Database Center for Life Science, licensed under
> **CC BY-SA 2.1 JP**。帰属表示は必須（`web-next/public/models/LICENSES.md` 参照）。

## 前提

- 入力データ `BodyParts3D/`（`.gitignore` 済・非配布）をリポジトリ直下に配置:
  - `partof_BP3D_4.0_obj_99/`（1258 OBJ）/ `isa_BP3D_4.0_obj_99/`（2234 OBJ）
- Python 3.12（標準ライブラリのみ）/ Node + bun（web-next の devDependencies）

## 実行手順

```bash
# 1) マスター表・抽出リスト・未検出レポートを生成
python3 scripts/bodyparts3d/build_master.py            # 高速（ヘッダのみ）
python3 scripts/bodyparts3d/build_master.py --geometry # 頂点/面数も集計（低速）

# 2) 抽出 OBJ を Collection 別にコピー（Blender 用。GLB ビルドには必須ではない）
python3 scripts/bodyparts3d/extract_headache_parts.py

# 3) GLB を生成（web-next 本線）
cd web-next && bun scripts/build-anatomy-glb.mjs        # 全構造
cd web-next && bun scripts/build-anatomy-glb.mjs bones  # 特定構造のみ

# 4) （任意）Blender でシーン構築・色分け（bpy 必須）
blender --background --python scripts/bodyparts3d/import_headache_parts.py
```

### 生成物

| ファイル | 内容 |
|---|---|
| `output/master_bodyparts.csv` | 全 OBJ（3492 行）のメタデータ＋派生分類 |
| `output/headache_parts.csv` | 頭痛関連としてホワイトリスト該当した部位 |
| `output/blender_collection.csv` | Collection ごとの部位一覧 |
| `output/extract_list.csv` | 抽出対象（OBJ File / Collection / Source Set） |
| `output/not_found_report.txt` | ホワイトリスト未検出の記録 |
| `output/glb_report.json` | 各 GLB の最終 bbox・部位のモデル空間座標（ホットスポット校正の根拠） |
| `web-next/public/models/{bones,muscles,nerves,vessels,brain}.glb` | 最終 3D アセット |

## テスト

```bash
python3 -m pytest scripts/bodyparts3d/test_build_master.py
```

## 座標変換（重要）

BodyParts3D は **Z-up・mm・原点足元**（頭頚部は z≈1300–1585mm）。glTF/model-viewer は
**Y-up・メートル・原点中心**。`build-anatomy-glb.mjs` は各構造ごとに:

1. スケール ×0.001（mm→m）
2. Z-up→Y-up（X 軸 −90°回転: `(x,y,z)→(x,z,-y)`）
3. 統合 bbox 中心を原点へ移動

を wrapper ノード変換として適用する。結果は「顔が +Z（視点側）/ 上が +Y / 解剖学的右が −X」。
`manifest.ts` のホットスポット `position` は `glb_report.json` の実測座標から設定する。

---

## `promp.md` レビュー（実データ検証で判明した誤り・欠落と是正）

1. **マッピング源の誤り（最重要）**: `promp.md` は同梱 txt/csv を「公式対応表」として解析させるが、
   実際の `partof_parts_list_e.txt` / `isa_parts_list_e.txt` は `FMA / BP(representation) / 英語名`
   の 3 列のみで **OBJ 名(FJxxxx)への対応列を持たない**。per-OBJ の正本は**各 OBJ ヘッダのコメント
   ブロック**（`File ID` / `Representation ID` / `Concept ID` / `English name` / `Bounds(mm)`）。
   → パーサはヘッダを読む。
2. **ディレクトリ構成の誤り**: 「FJ0001..FJ3659 連番」は誤り。欠番多数・非連番で、`FJ1452M` 等の
   左右ミラー派生があり（例: `FJ1725`=右椎骨動脈 / `FJ1725M`=左椎骨動脈、別 FMA）、`part_of` と
   `is_a` で同一 FMA 概念が重複する（839 概念すべてが両在）。また 1 概念が複数メッシュ断片に分割
   される例（左PICA=13 断片）もある。→ 両セット統合し、抽出時は「同一 FMA が両セットにある時だけ
   `is_a` を落とす（採用側の断片・左右は全保持）」。
3. **推論項目のハルシネーション対策欠如**: 日本語名は同梱物に皆無。Category/Region/頭痛関連度/型は
   出典が無く AI 推論依存。→ Category/Region は英語名キーワードと Bounds の z 座標から**規則ベース**、
   日本語名・頭痛属性・Collection は**明示ホワイトリスト**（`build_master.py` の `HEADACHE_WHITELIST`）
   で決定論化。未検出パターンは `not_found_report.txt` へ。
4. **座標・スケール・軸が未定義**: `promp.md` は「原点合わせ」としか書かず、全身 Z-up・mm 座標から
   glTF Y-up・m への変換仕様が無い。→ 上記「座標変換」で明示実装。
5. **全件処理の非効率**: 全 OBJ を LLM で分類させる前提だが規則ベースなら全件でも安価。マスターは
   全 3492 行を出力しつつ、GLB/抽出はホワイトリスト該当のみに絞る。
6. **欠落データの黙殺**: `headache_parts` の対象例に挙がる**三叉神経本幹・大後頭神経(GON)・小後頭神経・
   硬膜**は BodyParts3D に**非在**（眼窩枝 31 種はある）。→ `nerves.glb` は三叉神経第1枝(V1)・眼窩枝で
   近似構成し、`manifest.ts` の概要と本レポートに明記（幻の行を作らない）。
7. **スキーマ不整合**: `Category` に `Ligament` があるが Blender Collection 列挙に Ligament が無い。
   → Collection に `Ligaments`（色=緑）を追加して整合。
8. **glTF/LOD の後回し**: web-next（`docs/architecture.md` §7）は Draco 圧縮が必須。→ 本パイプラインの
   本体成果物として Draco 圧縮 GLB を生成。

（採用した妥当な点）型ヒント・例外処理・ログ・関数分割・マテリアル色分けの品質要求は踏襲。
`promp.md` に欠けていたテスト要求は `test_build_master.py` で補完した。

### `extract_list.csv` のスキーマ是正

`promp.md` は「OBJ File だけ並べる」とするが、同一 FJ ファイル名が part_of / is_a 両ディレクトリに
実在するため読み込み元を一意化できない。是正として `Source Set`（実ディレクトリ名）と `Collection`
を併記している。

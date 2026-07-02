# 3D 解剖モデル ライセンス台帳

`/anatomy`（頭痛 3D 解剖アトラス）で使用するオープンソース解剖モデルの
出典・ライセンス・改変有無を記録する。設計書: `docs/architecture.md` §5.2 / §8.3。

> [!IMPORTANT]
> CC-BY-SA 系は**帰属表示（Attribution）が必須**。改変モデルを再配布する場合は
> **同一ライセンスでの公開義務（ShareAlike）**が生じうる。モデル追加時は必ず本表に記載すること。

## 配置済みモデル

いずれも BodyParts3D v4.0（OBJ）から `scripts/bodyparts3d/` ＋ `web-next/scripts/build-anatomy-glb.mjs`
のパイプラインで生成。改変内容は共通で **複数 OBJ の統合・単一マテリアル色付け・原点中心化・
単位変換(mm→m)・座標系変換(Z-up→Y-up)・Draco 圧縮**。帰属表示は下記「帰属表示（必須）」を参照。

| ファイル | 構造(id) | 出典 | ライセンス | 改変 | 帰属表示 |
|---|---|---|---|---|---|
| `nerves.glb` | nerves | BodyParts3D v4.0 (DBCLS) | CC-BY-SA 2.1 JP | あり | 必須（下記） |
| `vessels.glb` | vessels | BodyParts3D v4.0 (DBCLS) | CC-BY-SA 2.1 JP | あり | 必須（下記） |
| `brain.glb` | brain | BodyParts3D v4.0 (DBCLS) | CC-BY-SA 2.1 JP | あり | 必須（下記） |
| `bones.glb` | bones | BodyParts3D v4.0 (DBCLS) | CC-BY-SA 2.1 JP | あり | 必須（下記） |
| `muscles.glb` | muscles | BodyParts3D v4.0 (DBCLS) | CC-BY-SA 2.1 JP | あり | 必須（下記） |

> [!NOTE]
> `nerves.glb` は三叉神経本幹・大後頭神経(GON)が BodyParts3D に非在のため、三叉神経第1枝(V1)・
> 眼窩枝で近似構成している（`manifest.ts` の nerves 概要と `scripts/bodyparts3d/output/not_found_report.txt` 参照）。

### 帰属表示（必須・CC-BY-SA 2.1 JP）

各 OBJ ヘッダが規定する原文を UI（`/anatomy`）またはページフッターに掲示する:

> BodyParts3D, © The Database Center for Life Science licensed under
> CC Attribution-Share Alike 2.1 Japan.

- ライセンス全文: <http://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html>
- **ShareAlike**: 改変済み `.glb` を再配布する場合は同一（CC-BY-SA 2.1 JP 互換）ライセンスで公開する。

## 候補ソース（合法・教育利用可）

| ソース | 提供元 | ライセンス | 備考 |
|---|---|---|---|
| BodyParts3D / Anatomography | DBCLS（ライフサイエンス統合DBセンター） | CC-BY-SA 2.1 JP | 日本語解剖モデル |
| Z-Anatomy | Z-Anatomy プロジェクト | CC-BY-SA 4.0 | 全身・Blender ベース |
| Sketchfab（CC モデル） | 各作者 | CC-BY 等 | 個別にライセンス確認 |

## 投入手順（Phase 2）

> [!NOTE]
> 手順 4（`ModelViewer` の `@google/model-viewer` 遅延ロード・ホットスポット注釈・
> 読込失敗時の降格）は**実装済**。あとは手順 1〜3（実 glTF 資産の取得・配置・帰属表示）を
> 行えば、該当構造の `<model-viewer>` が自動で描画される。
> `<id>.glb` 投入後は、ホットスポット `position` を実モデル座標へ要キャリブレーション
> （`lib/anatomy/manifest.ts`）。

1. 上記ソースから対象構造のモデルを取得し、glTF/GLB へ変換（Draco/Meshopt 圧縮）。
2. `web-next/public/models/<id>.glb` に配置（id は `lib/anatomy/manifest.ts` と一致）。
3. 本表へ出典・ライセンス・改変有無・帰属表示を追記。
4. ~~`ModelViewer` の遅延ロード（model-viewer）を有効化。~~ ✅ 実装済（Phase 2 コード）。

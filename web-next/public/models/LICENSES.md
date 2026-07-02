# 3D 解剖モデル ライセンス台帳

`/anatomy`（頭痛 3D 解剖アトラス）で使用するオープンソース解剖モデルの
出典・ライセンス・改変有無を記録する。設計書: `docs/architecture.md` §5.2 / §8.3。

> [!IMPORTANT]
> CC-BY-SA 系は**帰属表示（Attribution）が必須**。改変モデルを再配布する場合は
> **同一ライセンスでの公開義務（ShareAlike）**が生じうる。モデル追加時は必ず本表に記載すること。

## 配置済みモデル

| ファイル | 構造(id) | 出典 | ライセンス | 改変 | 帰属表示 |
|---|---|---|---|---|---|
| _(未配置)_ | nerves | — | — | — | — |
| _(未配置)_ | vessels | — | — | — | — |
| _(未配置)_ | brain | — | — | — | — |
| _(未配置)_ | bones | — | — | — | — |
| _(未配置)_ | muscles | — | — | — | — |

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

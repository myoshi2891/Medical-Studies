#!/usr/bin/env python3
"""Blender へ頭痛関連 OBJ を取り込み、Collection 分類・色分けまで自動化する。

promp.md の import_headache_parts.py に相当（Blender Python / bpy 前提）。実行すると
extract/<Collection>/ の OBJ を読み込み、Collection を自動生成して分類し、日本語名へ
リネーム、原点を原点合わせ、法線を再計算、スムーズシェード、Collection ごとに
マテリアル色分けする。

実行例（リポジトリルートで）::

    blender --background --python scripts/bodyparts3d/import_headache_parts.py
    # GLB も書き出す場合:
    blender --background --python scripts/bodyparts3d/import_headache_parts.py -- --export out.glb

> [!NOTE]
> web-next の ``public/models/*.glb`` は Node パイプライン（``build-anatomy-glb.mjs``）で
> 生成する。本スクリプトは Blender での編集・確認用の別系統。

色（promp.md パレット。:data:`build_master.COLLECTION_META` を単一ソースとして参照）:
Bone=白 / Muscle=赤 / Nerve=黄 / Blood Vessel=青 / Brain=薄ピンク / Ligament=緑。
"""

from __future__ import annotations

import csv
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from build_master import COLLECTION_META  # noqa: E402  (bpy 実行時に sys.path 調整後 import)

try:
    import bpy  # type: ignore
except ImportError:  # pragma: no cover - Blender 外での import ガード
    bpy = None  # type: ignore

EXTRACT_DIR = SCRIPT_DIR / "extract"
MASTER_CSV = SCRIPT_DIR / "output" / "master_bodyparts.csv"


def load_japanese_names() -> dict[str, str]:
    """master_bodyparts.csv から OBJ ID → 日本語名（無ければ英語名）のマップを作る。"""
    names: dict[str, str] = {}
    if not MASTER_CSV.is_file():
        return names
    with MASTER_CSV.open(encoding="utf-8", newline="") as fh:
        for row in csv.DictReader(fh):
            label = row.get("Japanese Name") or row.get("English Name") or row["OBJ ID"]
            names[row["OBJ ID"]] = label
    return names


def reset_scene() -> None:
    """既存オブジェクトを全消去して決定論的な初期状態にする。"""
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()
    for block in (bpy.data.meshes, bpy.data.materials):
        for item in list(block):
            if item.users == 0:
                block.remove(item)


def get_or_create_collection(name: str) -> "bpy.types.Collection":
    """名前付き Collection を取得（無ければ作成しシーンにリンク）。"""
    existing = bpy.data.collections.get(name)
    if existing is not None:
        return existing
    collection = bpy.data.collections.new(name)
    bpy.context.scene.collection.children.link(collection)
    return collection


def make_material(collection_name: str) -> "bpy.types.Material":
    """Collection の色で Principled BSDF マテリアルを作る（半透明で内部が見える）。"""
    material = bpy.data.materials.new(name=f"MAT_{collection_name}")
    material.use_nodes = True
    bsdf = material.node_tree.nodes.get("Principled BSDF")
    r, g, b = COLLECTION_META[collection_name]["rgb"]  # type: ignore[misc]
    if bsdf is not None:
        bsdf.inputs["Base Color"].default_value = (r, g, b, 1.0)
        if "Roughness" in bsdf.inputs:
            bsdf.inputs["Roughness"].default_value = 0.6
    return material


def import_obj(filepath: Path) -> list["bpy.types.Object"]:
    """OBJ を読み込み、生成された Mesh オブジェクト群を返す（Blender 3.3+ API）。"""
    before = set(bpy.context.scene.objects)
    bpy.ops.wm.obj_import(filepath=str(filepath))
    return [o for o in bpy.context.scene.objects if o not in before and o.type == "MESH"]


def normalize_object(obj: "bpy.types.Object", label: str,
                     material: "bpy.types.Material") -> None:
    """リネーム・原点合わせ・法線再計算・スムーズシェード・マテリアル割当。"""
    obj.name = label
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)

    # 原点をジオメトリ中心へ。
    bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="MEDIAN")

    # 法線を外向きに再計算。
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.mesh.normals_make_consistent(inside=False)
    bpy.ops.object.mode_set(mode="OBJECT")

    # スムーズシェード（Blender 4.1+ は use_auto_smooth 廃止のため shade_smooth で代替）。
    bpy.ops.object.shade_smooth()
    mesh = obj.data
    if hasattr(mesh, "use_auto_smooth"):  # 4.0 以前のみ
        mesh.use_auto_smooth = True

    obj.data.materials.clear()
    obj.data.materials.append(material)
    obj.select_set(False)


def link_to_collection(obj: "bpy.types.Object", collection: "bpy.types.Collection") -> None:
    """オブジェクトを指定 Collection のみに所属させる。"""
    for parent in list(obj.users_collection):
        parent.objects.unlink(obj)
    collection.objects.link(obj)


def build() -> int:
    """extract/ 配下を走査してシーンを構築し、取り込み個数を返す。"""
    if not EXTRACT_DIR.is_dir():
        raise FileNotFoundError(
            f"extract/ がありません: {EXTRACT_DIR}\n先に extract_headache_parts.py を実行してください。"
        )
    reset_scene()
    labels = load_japanese_names()
    total = 0
    for collection_dir in sorted(EXTRACT_DIR.iterdir()):
        if not collection_dir.is_dir():
            continue
        name = collection_dir.name
        if name not in COLLECTION_META:
            print(f"[skip] 未知の Collection: {name}")
            continue
        collection = get_or_create_collection(name)
        material = make_material(name)
        for obj_path in sorted(collection_dir.glob("*.obj")):
            label = labels.get(obj_path.stem, obj_path.stem)
            for obj in import_obj(obj_path):
                normalize_object(obj, label, material)
                link_to_collection(obj, collection)
                total += 1
        print(f"[{name}] 取り込み完了")
    print(f"完了: 計 {total} オブジェクト")
    return total


def export_glb(path: Path) -> None:
    """全シーンを 1 つの GLB として書き出す（任意）。"""
    bpy.ops.export_scene.gltf(filepath=str(path), export_format="GLB")
    print(f"GLB 出力: {path}")


def parse_export_arg() -> Path | None:
    """``blender ... -- --export out.glb`` の -- 以降を解釈する。"""
    if "--" not in sys.argv:
        return None
    extra = sys.argv[sys.argv.index("--") + 1:]
    if "--export" in extra:
        idx = extra.index("--export")
        if idx + 1 < len(extra):
            return Path(extra[idx + 1])
    return None


def main() -> int:
    if bpy is None:
        print("エラー: このスクリプトは Blender 内（bpy 利用可能環境）で実行してください。",
              file=sys.stderr)
        return 1
    build()
    export_path = parse_export_arg()
    if export_path is not None:
        export_glb(export_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

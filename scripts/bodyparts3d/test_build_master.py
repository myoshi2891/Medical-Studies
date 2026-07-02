"""build_master.py の単体テスト（AAA パターン・正常/異常系）。

BodyParts3D 本体（gitignore 済・大容量）に依存せず、合成ヘッダと最小 OBJ で検証する。
"""

from __future__ import annotations

from pathlib import Path

import pytest

import build_master as bm

# --- parse_bounds ----------------------------------------------------------

def test_parse_bounds_正常() -> None:
    # Arrange
    raw = "(-37.9285,-102.3873,1529.2406)-(-17.8965,-59.4933,1551.2589)"
    # Act
    lo, hi = bm.parse_bounds(raw)
    # Assert
    assert lo == pytest.approx((-37.9285, -102.3873, 1529.2406))
    assert hi == pytest.approx((-17.8965, -59.4933, 1551.2589))


def test_parse_bounds_不正形式は例外() -> None:
    # Arrange / Act / Assert
    with pytest.raises(ValueError):
        bm.parse_bounds("not-a-bounds")


def test_parse_bounds_次元不足は例外() -> None:
    with pytest.raises(ValueError):
        bm.parse_bounds("(1,2)-(3,4)")


# --- parse_header / count_geometry（一時 OBJ を生成） ------------------------

_SAMPLE_OBJ = """#
# The license ...
# File ID : FJ0001
# Representation ID : BP0001
# Build-up logic : FMA 3.0 part_of
# Concept ID : FMA12519
# English name : Atlas
# Bounds(mm): (-40.0,-64.0,1462.0)-(41.6,-17.0,1481.0)
v 0.0 0.0 0.0
v 1.0 0.0 0.0
v 0.0 1.0 0.0
f 1 2 3
"""


def _write_obj(tmp_path: Path, name: str, text: str) -> Path:
    path = tmp_path / name
    path.write_text(text, encoding="utf-8")
    return path


def test_parse_header_キー値を抽出() -> None:
    # Arrange
    import tempfile

    with tempfile.TemporaryDirectory() as d:
        path = _write_obj(Path(d), "FJ0001.obj", _SAMPLE_OBJ)
        # Act
        header = bm.parse_header(path)
    # Assert
    assert header["File ID"] == "FJ0001"
    assert header["English name"] == "Atlas"
    assert header["Concept ID"] == "FMA12519"


def test_count_geometry_頂点面を数える(tmp_path: Path) -> None:
    # Arrange
    path = _write_obj(tmp_path, "FJ0001.obj", _SAMPLE_OBJ)
    # Act
    vertices, faces = bm.count_geometry(path)
    # Assert
    assert vertices == 3
    assert faces == 1


# --- match_whitelist（最長一致・具体性） ------------------------------------

def test_match_whitelist_最長一致を優先() -> None:
    # "hypothalamus" は "thalamus" を含むが、より具体的（長い）方を採用する。
    entry = bm.match_whitelist("Hypothalamus")
    assert entry is not None
    assert entry.pattern == "hypothalamus"
    assert entry.japanese == "視床下部"


def test_match_whitelist_椎間板は椎骨より優先() -> None:
    # "Intervertebral disk of axis" は "axis" ではなく "intervertebral disk of" にマッチ。
    entry = bm.match_whitelist("Intervertebral disk of axis")
    assert entry is not None
    assert entry.pattern == "intervertebral disk of"


def test_match_whitelist_該当なしはNone() -> None:
    assert bm.match_whitelist("Right femur") is None


# --- classify_category / classify_region -----------------------------------

def test_classify_category_血管は骨より優先() -> None:
    # "vertebral artery" は "vertebra" を含むが Vessel に分類する（規則の評価順）。
    assert bm.classify_category("Right vertebral artery") == "Vessel"


def test_classify_category_不明はOther() -> None:
    assert bm.classify_category("Some unknown structure") == "Other"


def _make_part(name: str, z_center: float, buildup: str = "part_of",
               fma: str = "FMA1") -> bm.BodyPart:
    return bm.BodyPart(
        obj_file="FJ0001.obj", obj_id="FJ0001", representation_id="BP1", fma_id=fma,
        english_name=name, buildup=buildup, source_set="partof_BP3D_4.0_obj_99",
        bounds_min=(0.0, 0.0, z_center - 5), bounds_max=(1.0, 1.0, z_center + 5),
        is_mirror=False,
    )


def test_classify_region_z座標で頭部頚部を判定() -> None:
    assert bm.classify_region(_make_part("Occipital bone", 1531.0)) == "Head"
    assert bm.classify_region(_make_part("Atlas", 1472.0)) == "Neck"
    assert bm.classify_region(_make_part("Right femur", 500.0)) == "Other"


def test_classify_脳キーワードは常にHead() -> None:
    # z が低くても脳キーワードがあれば Head。
    assert bm.classify_region(_make_part("Cerebellum", 100.0)) == "Head"


def test_classify_ホワイトリスト適用() -> None:
    # Arrange
    part = _make_part("Atlas", 1472.0)
    # Act
    bm.classify(part)
    # Assert
    assert part.category == "Bone"
    assert part.collection == "Bones"
    assert part.importance == 5
    assert part.japanese == "環椎（第1頚椎 C1）"
    assert part.stars == "★★★★★"


# --- select_extract（cross-set dedup） --------------------------------------

def test_select_extract_同一fmaはpart_of優先() -> None:
    # Arrange: 同じ FMA が part_of と is_a に存在。
    po = _make_part("Atlas", 1472.0, buildup="part_of", fma="FMA12519")
    isa = _make_part("Atlas", 1472.0, buildup="is_a", fma="FMA12519")
    for p in (po, isa):
        bm.classify(p)
    # Act
    selected = bm.select_extract([po, isa])
    # Assert: is_a 側は落ちる。
    assert po in selected
    assert isa not in selected


def test_select_extract_isaのみのfmaは残る() -> None:
    # Arrange: part_of に存在しない FMA は is_a を採用。
    isa = _make_part("Atlas", 1472.0, buildup="is_a", fma="FMA99999")
    bm.classify(isa)
    # Act
    selected = bm.select_extract([isa])
    # Assert
    assert isa in selected


def test_select_extract_断片は全て保持() -> None:
    # Arrange: 同一 FMA でも複数メッシュ断片（別 obj）は両方残す。
    frag1 = bm.BodyPart(
        obj_file="FJ1700M.obj", obj_id="FJ1700M", representation_id="BP1", fma_id="FMA50520",
        english_name="Left posterior inferior cerebellar artery", buildup="part_of",
        source_set="partof_BP3D_4.0_obj_99", bounds_min=(0, 0, 1490), bounds_max=(1, 1, 1500),
        is_mirror=True,
    )
    frag2 = bm.BodyPart(
        obj_file="FJ1701M.obj", obj_id="FJ1701M", representation_id="BP2", fma_id="FMA50520",
        english_name="Left posterior inferior cerebellar artery", buildup="part_of",
        source_set="partof_BP3D_4.0_obj_99", bounds_min=(0, 0, 1490), bounds_max=(1, 1, 1500),
        is_mirror=True,
    )
    for p in (frag1, frag2):
        bm.classify(p)
    # Act
    selected = bm.select_extract([frag1, frag2])
    # Assert
    assert frag1 in selected and frag2 in selected

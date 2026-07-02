#!/usr/bin/env python3
"""BodyParts3D v4.0 OBJ から頭痛教材用マスター表を生成する。

promp.md の指示を実データに合わせて是正した実装（詳細は README.md のレビュー節）:

- マッピングの正本は **各 OBJ ヘッダのコメントブロック**。同梱の
  ``partof_parts_list_e.txt`` / ``isa_parts_list_e.txt`` は ``FMA / BP(representation) /
  英語名`` の 3 列で、OBJ ファイル名(FJxxxx)への対応列を持たないため per-OBJ の正本には
  ならない。したがってヘッダ（File ID / Representation ID / Concept ID / English name /
  Bounds(mm)）を直接読む。
- ``part_of`` / ``is_a`` 両セットを統合する。同一 FMA 概念は両セットに重複しうるため
  （検証: 839 概念すべてが両在）、抽出(extract)時は ``part_of`` を優先し ``is_a`` の重複を
  落とす。ただし 1 概念が複数メッシュ断片に分割される例（例: 左PICA=13 断片）があるため、
  fma 単純 dedup では断片を失う。よって「同一 fma が両セットにある時だけ is_a を落とし、
  採用側の全断片は保持」する。
- Category / Region は英語名キーワードと Bounds の z 座標から**規則ベース**で決定論的に付与。
- 日本語名 / 頭痛関連度 / 頭痛型 / Blender Collection は **明示ホワイトリスト**
  (:data:`HEADACHE_WHITELIST`) で付与し、AI 推論に依存しない。ホワイトリストのうち
  データセットに実在しなかったパターンは ``not_found_report.txt`` に出力する（幻の行を作らない）。

標準ライブラリのみ。Python 3.12。
"""

from __future__ import annotations

import argparse
import csv
import logging
import re
import sys
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Final

LOG = logging.getLogger("build_master")

# --- パス解決（リポジトリ相対のみ。絶対パスはハードコードしない） ---------------
SCRIPT_DIR: Final[Path] = Path(__file__).resolve().parent
REPO_ROOT: Final[Path] = SCRIPT_DIR.parents[1]
DEFAULT_SRC_ROOT: Final[Path] = REPO_ROOT / "BodyParts3D"
DEFAULT_OUT_DIR: Final[Path] = SCRIPT_DIR / "output"

# BodyParts3D の 2 つの build-up 別 OBJ ディレクトリと、その build-up ラベル。
SRC_DIRS: Final[dict[str, str]] = {
    "part_of": "partof_BP3D_4.0_obj_99",
    "is_a": "isa_BP3D_4.0_obj_99",
}

# 頭部 / 頚部を分ける Bounds z 中心のしきい値（mm）。BodyParts3D は Z-up・原点足元のため
# 頭頚部は z≈1300–1585mm に分布する（実測: 後頭骨中心 z≈1531, 胸鎖乳突筋中心 z≈1403）。
Z_HEAD_MIN: Final[float] = 1480.0
Z_NECK_MIN: Final[float] = 1330.0

# Blender Collection のメタ情報（色は promp.md のパレット。GLB/Import スクリプトと共有）。
# promp.md のスキーマ不整合（Ligament の Collection 欠落）を是正して Ligaments を追加。
COLLECTION_META: Final[dict[str, dict[str, object]]] = {
    "Bones": {"category": "Bone", "rgb": (0.90, 0.90, 0.88)},
    "Muscles": {"category": "Muscle", "rgb": (0.72, 0.13, 0.13)},
    "Nerves": {"category": "Nerve", "rgb": (0.95, 0.82, 0.15)},
    "BloodVessels": {"category": "Vessel", "rgb": (0.15, 0.35, 0.80)},
    "Brain": {"category": "Brain", "rgb": (0.98, 0.80, 0.83)},
    "Ligaments": {"category": "Ligament", "rgb": (0.20, 0.60, 0.25)},
    "Others": {"category": "Other", "rgb": (0.70, 0.70, 0.70)},
}


@dataclass(frozen=True)
class WhitelistEntry:
    """頭痛関連部位の明示分類 1 件（英語名の部分一致で適用）。"""

    pattern: str  # 英語名に対する小文字部分一致キー
    japanese: str
    importance: int  # 1–5（★の数）
    headache_type: str  # Migraine / Tension / Cervicogenic / Cluster / Multiple / None
    collection: str  # COLLECTION_META のキー
    description: str


# 医学的に検証したホーム頚部の頭痛関連部位（実データに存在するもののみ）。
# マッチは「長いパターン優先」で最も具体的な 1 件を採用する（下の match_whitelist 参照）。
HEADACHE_WHITELIST: Final[tuple[WhitelistEntry, ...]] = (
    # --- 骨 ---
    WhitelistEntry("intervertebral disk of", "椎間板", 2, "Cervicogenic", "Others",
                   "頚椎の椎間板。椎間関節性の頸原性頭痛に関与。"),
    WhitelistEntry("occipital bone", "後頭骨", 4, "Cervicogenic", "Bones",
                   "大後頭神経が近接する頭蓋後方の骨。頸原性頭痛の起点。"),
    WhitelistEntry("cervical vertebra", "頚椎", 4, "Cervicogenic", "Bones",
                   "C1–C7。頸原性頭痛の解剖学的基盤。"),
    WhitelistEntry("atlas", "環椎（第1頚椎 C1）", 5, "Cervicogenic", "Bones",
                   "頭蓋を支える第1頚椎。環軸関節の可動性が頸原性頭痛に関与。"),
    WhitelistEntry("axis", "軸椎（第2頚椎 C2）", 5, "Cervicogenic", "Bones",
                   "第2頚椎。大後頭神経(C2)の出口で回旋運動の要。"),
    WhitelistEntry("mandible", "下顎骨", 3, "Tension", "Bones",
                   "顎関節。咀嚼筋を介して緊張型頭痛に関与。"),
    WhitelistEntry("temporal bone", "側頭骨", 3, "Migraine", "Bones",
                   "側頭部の骨。側頭動脈・側頭筋が近接。"),
    WhitelistEntry("parietal bone", "頭頂骨", 2, "Multiple", "Bones", "頭頂部の骨。"),
    WhitelistEntry("frontal bone", "前頭骨", 3, "Multiple", "Bones",
                   "前頭部の骨。前頭洞性頭痛に関与。"),
    WhitelistEntry("sphenoid bone", "蝶形骨", 3, "Cluster", "Bones",
                   "頭蓋底中央の骨。海綿静脈洞・下垂体が近接。"),
    # --- 筋（後頭下筋群を含む） ---
    WhitelistEntry("rectus capitis posterior major", "大後頭直筋", 5, "Cervicogenic", "Muscles",
                   "後頭下筋群。硬膜と連結(myodural bridge)し頸原性頭痛に強く関与。"),
    WhitelistEntry("rectus capitis posterior minor", "小後頭直筋", 5, "Cervicogenic", "Muscles",
                   "後頭下筋群。硬膜橋を形成。"),
    WhitelistEntry("obliquus capitis superior", "上頭斜筋", 4, "Cervicogenic", "Muscles",
                   "後頭下筋群。"),
    WhitelistEntry("obliquus capitis inferior", "下頭斜筋", 4, "Cervicogenic", "Muscles",
                   "後頭下筋群。大後頭神経が交差する。"),
    WhitelistEntry("rectus capitis anterior", "前頭直筋", 2, "Cervicogenic", "Muscles",
                   "後頭下前方の小筋。"),
    WhitelistEntry("rectus capitis lateralis", "外側頭直筋", 2, "Cervicogenic", "Muscles",
                   "後頭下外側の小筋。"),
    WhitelistEntry("trapezius", "僧帽筋", 5, "Tension", "Muscles",
                   "頸部から肩の大きな筋。緊張型頭痛の主要な関与筋。"),
    WhitelistEntry("sternocleidomastoid", "胸鎖乳突筋", 4, "Tension", "Muscles",
                   "頸部前外側の筋。緊張型・頸原性頭痛に関与。"),
    WhitelistEntry("splenius capitis", "頭板状筋", 4, "Cervicogenic", "Muscles",
                   "頸部後面の筋。"),
    WhitelistEntry("splenius cervicis", "頚板状筋", 3, "Cervicogenic", "Muscles",
                   "頸部後面の筋。"),
    WhitelistEntry("semispinalis capitis", "頭半棘筋", 4, "Cervicogenic", "Muscles",
                   "頸部後面深層の筋。大後頭神経が貫通する。"),
    WhitelistEntry("semispinalis cervicis", "頚半棘筋", 3, "Cervicogenic", "Muscles",
                   "頸部後面深層の筋。"),
    WhitelistEntry("levator scapulae", "肩甲挙筋", 3, "Tension", "Muscles",
                   "肩甲骨挙上筋。緊張型頭痛に関与。"),
    WhitelistEntry("longus capitis", "頭長筋", 3, "Cervicogenic", "Muscles",
                   "頸部前面深層の筋。"),
    WhitelistEntry("longus colli", "頚長筋", 3, "Cervicogenic", "Muscles",
                   "頸部前面深層の筋。"),
    # --- 脳・脳幹 ---
    WhitelistEntry("medulla oblongata", "延髄", 4, "Multiple", "Brain",
                   "脳幹下部。三叉頚椎複合体(TCC)の座で頭頸部の痛覚が収束。"),
    WhitelistEntry("hypothalamus", "視床下部", 4, "Cluster", "Brain",
                   "群発頭痛の発作に関与する中枢。"),
    WhitelistEntry("thalamus", "視床", 3, "Multiple", "Brain",
                   "感覚中継核。中枢性感作に関与。"),
    WhitelistEntry("midbrain", "中脳", 3, "Multiple", "Brain", "脳幹上部。"),
    WhitelistEntry("cerebellum", "小脳", 3, "Multiple", "Brain",
                   "運動協調の中枢。後頭蓋窩に位置。"),
    WhitelistEntry("pons", "橋", 3, "Migraine", "Brain",
                   "脳幹。片頭痛発作で活性化する(migraine generator)。"),
    WhitelistEntry("pituitary", "下垂体", 3, "Cluster", "Brain",
                   "下垂体。群発頭痛・二次性頭痛に関与。"),
    # --- 神経（三叉神経本幹・GON は非在。V1/眼窩枝で近似） ---
    WhitelistEntry("ophthalmic nerve", "眼神経（三叉神経第1枝 V1）", 4, "Migraine", "Nerves",
                   "三叉神経第1枝。前頭部の感覚。非在の三叉神経本幹の代替として提示。"),
    WhitelistEntry("supra-orbital nerve", "眼窩上神経", 4, "Migraine", "Nerves",
                   "V1 終枝。前頭部頭痛・神経ブロックの標的。"),
    WhitelistEntry("supratrochlear nerve", "滑車上神経", 3, "Migraine", "Nerves",
                   "V1 終枝。前額内側の感覚。"),
    WhitelistEntry("infratrochlear nerve", "滑車下神経", 2, "Migraine", "Nerves", "V1 終枝。"),
    WhitelistEntry("frontal nerve", "前頭神経", 3, "Migraine", "Nerves", "V1 の主要枝。"),
    WhitelistEntry("lacrimal nerve", "涙腺神経", 2, "Cluster", "Nerves",
                   "V1 枝。群発頭痛の自律神経症状に関連。"),
    WhitelistEntry("nasociliary nerve", "鼻毛様体神経", 2, "Migraine", "Nerves", "V1 枝。"),
    WhitelistEntry("anterior ethmoidal nerve", "前篩骨神経", 1, "Migraine", "Nerves", "V1 枝。"),
    WhitelistEntry("posterior ethmoidal nerve", "後篩骨神経", 1, "Migraine", "Nerves", "V1 枝。"),
    WhitelistEntry("long ciliary nerve", "長毛様体神経", 1, "Cluster", "Nerves", "V1 枝。"),
    WhitelistEntry("ciliary ganglion", "毛様体神経節", 2, "Cluster", "Nerves", "副交感神経節。"),
    WhitelistEntry("optic nerve", "視神経", 3, "Multiple", "Nerves",
                   "第2脳神経。視覚前兆の関連構造として。"),
    WhitelistEntry("oculomotor nerve", "動眼神経", 3, "Cluster", "Nerves",
                   "第3脳神経。群発頭痛の眼症状に関連。"),
    WhitelistEntry("trochlear nerve", "滑車神経", 2, "Multiple", "Nerves", "第4脳神経。"),
    # --- 血管 ---
    WhitelistEntry("vertebral artery", "椎骨動脈", 5, "Multiple", "BloodVessels",
                   "頚椎を貫き脳幹へ至る。椎骨脳底動脈系。後頭部・頸原性痛に関与。"),
    WhitelistEntry("basilar artery", "脳底動脈", 4, "Migraine", "BloodVessels",
                   "左右椎骨動脈の合流。脳幹を灌流。脳底型片頭痛。"),
    WhitelistEntry("internal carotid artery", "内頚動脈", 4, "Cluster", "BloodVessels",
                   "前方循環の主幹。海綿静脈洞内で群発頭痛に関与。"),
    WhitelistEntry("posterior inferior cerebellar artery", "後下小脳動脈(PICA)", 3, "Multiple",
                   "BloodVessels", "椎骨動脈の枝。"),
    WhitelistEntry("posterior cerebral artery", "後大脳動脈", 3, "Migraine", "BloodVessels",
                   "後方循環。視覚前兆に関連。"),
    WhitelistEntry("middle cerebral artery", "中大脳動脈", 3, "Migraine", "BloodVessels",
                   "前方循環の主要枝。"),
    WhitelistEntry("anterior cerebral artery", "前大脳動脈", 2, "Migraine", "BloodVessels",
                   "前方循環。"),
    WhitelistEntry("internal jugular vein", "内頚静脈", 2, "Multiple", "BloodVessels",
                   "頭頸部の主要静脈路。"),
)

# 非ホワイトリスト部位の Category 推定（優先順に評価。血管/神経/脳を骨より先に判定）。
_CATEGORY_RULES: Final[tuple[tuple[str, tuple[str, ...]], ...]] = (
    ("Vessel", ("artery", "arteri", "vein", "venous", "vascular", "aorta", "vena ", "sinus")),
    ("Nerve", ("nerve", "ganglion", "plexus of nerve")),
    ("Brain", ("brain", "cerebr", "cerebell", "pons", "medulla", "midbrain", "thalamus",
               "hippocampus", "gyrus", "lobe of", "ventricle", "corpus callosum",
               "white matter", "gray matter", "pituitary", "tegmentum", "colliculus")),
    ("Bone", ("bone", "vertebra", "skull", "mandible", "maxilla", "rib", "sternum",
              "scapula", "clavicle", "sacrum", "coccyx", "phalanx", "carpal", "tarsal",
              "femur", "tibia", "fibula", "humerus", "radius", "ulna", "ilium", "ischium",
              "pubis", "patella", "hyoid", "malleus", "incus", "stapes", "atlas", "axis")),
    ("Ligament", ("ligament",)),
    ("Muscle", ("muscle", "trapezius", "deltoid", "biceps", "triceps", "masseter",
                "temporalis", "splenius", "semispinalis", "rectus capitis", "obliquus capitis",
                "longus", "levator", "scalene", "sternocleidomastoid", "oblique", "pectoralis")),
)


@dataclass
class BodyPart:
    """OBJ ファイル 1 個のメタデータ（ヘッダ由来）と派生分類。"""

    obj_file: str
    obj_id: str
    representation_id: str
    fma_id: str
    english_name: str
    buildup: str  # part_of / is_a
    source_set: str
    bounds_min: tuple[float, float, float]
    bounds_max: tuple[float, float, float]
    is_mirror: bool
    # 派生（classify で確定）
    japanese: str = ""
    category: str = "Other"
    region: str = "Other"
    importance: int = 0
    headache_type: str = "None"
    collection: str = "Others"
    description: str = ""
    vertices: int | None = None
    faces: int | None = None

    @property
    def size_mm(self) -> tuple[float, float, float]:
        return tuple(round(self.bounds_max[i] - self.bounds_min[i], 1) for i in range(3))  # type: ignore[return-value]

    @property
    def center_mm(self) -> tuple[float, float, float]:
        return tuple(round((self.bounds_max[i] + self.bounds_min[i]) / 2, 3) for i in range(3))  # type: ignore[return-value]

    @property
    def stars(self) -> str:
        return "★" * self.importance + "☆" * (5 - self.importance) if self.importance else ""


# --- パース ---------------------------------------------------------------

_BOUNDS_RE: Final[re.Pattern[str]] = re.compile(r"\(([^)]+)\)\s*-\s*\(([^)]+)\)")
_MIRROR_RE: Final[re.Pattern[str]] = re.compile(r"^FJ\d+M$")


def parse_header(path: Path) -> dict[str, str]:
    """OBJ 先頭のコメントブロックを ``{キー: 値}`` へ。最初の非コメント行で打ち切る。"""
    header: dict[str, str] = {}
    with path.open(encoding="utf-8", errors="replace") as fh:
        for line in fh:
            if not line.startswith("#"):
                break
            body = line[1:].strip()
            if ":" in body:
                key, _, value = body.partition(":")
                header[key.strip()] = value.strip()
    return header


def parse_bounds(raw: str) -> tuple[tuple[float, float, float], tuple[float, float, float]]:
    """``(x,y,z)-(x,y,z)`` 形式の Bounds を 2 つの 3 次元タプルへ。"""
    match = _BOUNDS_RE.search(raw)
    if match is None:
        raise ValueError(f"Bounds を解析できません: {raw!r}")
    lo = tuple(float(v) for v in match.group(1).split(","))
    hi = tuple(float(v) for v in match.group(2).split(","))
    if len(lo) != 3 or len(hi) != 3:
        raise ValueError(f"Bounds の次元が不正です: {raw!r}")
    return lo, hi  # type: ignore[return-value]


def count_geometry(path: Path) -> tuple[int, int]:
    """OBJ の頂点(``v ``)・面(``f ``)行数を数える。"""
    vertices = faces = 0
    with path.open(encoding="utf-8", errors="replace") as fh:
        for line in fh:
            if line.startswith("v "):
                vertices += 1
            elif line.startswith("f "):
                faces += 1
    return vertices, faces


def load_parts(src_root: Path, *, with_geometry: bool) -> list[BodyPart]:
    """両 build-up セットの全 OBJ を走査して :class:`BodyPart` のリストを返す。"""
    parts: list[BodyPart] = []
    for buildup, dir_name in SRC_DIRS.items():
        src_dir = src_root / dir_name
        if not src_dir.is_dir():
            raise FileNotFoundError(f"OBJ ディレクトリが見つかりません: {src_dir}")
        files = sorted(src_dir.glob("*.obj"), key=lambda p: p.name)
        LOG.info("走査: %s（%d ファイル, build-up=%s）", dir_name, len(files), buildup)
        for path in files:
            header = parse_header(path)
            try:
                lo, hi = parse_bounds(header["Bounds(mm)"])
            except (KeyError, ValueError) as exc:
                LOG.warning("Bounds 欠落/不正のためスキップ: %s (%s)", path.name, exc)
                continue
            obj_id = path.stem
            part = BodyPart(
                obj_file=path.name,
                obj_id=obj_id,
                representation_id=header.get("Representation ID", ""),
                fma_id=header.get("Concept ID", ""),
                english_name=header.get("English name", ""),
                buildup=buildup,
                source_set=dir_name,
                bounds_min=lo,
                bounds_max=hi,
                is_mirror=bool(_MIRROR_RE.match(obj_id)),
            )
            if with_geometry:
                part.vertices, part.faces = count_geometry(path)
            parts.append(part)
    LOG.info("読み込み完了: 計 %d 部位", len(parts))
    return parts


# --- 分類 -----------------------------------------------------------------

def match_whitelist(english_name: str) -> WhitelistEntry | None:
    """英語名に最も具体的（=最長パターン）にマッチするホワイトリスト項目を返す。"""
    lower = english_name.lower()
    best: WhitelistEntry | None = None
    for entry in HEADACHE_WHITELIST:
        if entry.pattern in lower and (best is None or len(entry.pattern) > len(best.pattern)):
            best = entry
    return best


def classify_category(english_name: str) -> str:
    """非ホワイトリスト部位の Category を英語名キーワードで推定する。"""
    lower = english_name.lower()
    for category, keywords in _CATEGORY_RULES:
        if any(kw in lower for kw in keywords):
            return category
    return "Other"


def classify_region(part: BodyPart) -> str:
    """Bounds の z 中心（と一部キーワード）から Head / Neck / Other を判定する。"""
    lower = part.english_name.lower()
    if any(kw in lower for kw in ("brain", "cerebr", "cerebell", "skull", "cranial", "orbital")):
        return "Head"
    z = part.center_mm[2]
    if z >= Z_HEAD_MIN:
        return "Head"
    if z >= Z_NECK_MIN:
        return "Neck"
    return "Other"


def classify(part: BodyPart) -> None:
    """1 部位に Category / Region / 頭痛属性 / Collection / 日本語名を確定して書き込む。"""
    part.region = classify_region(part)
    entry = match_whitelist(part.english_name)
    if entry is not None:
        part.japanese = entry.japanese
        part.importance = entry.importance
        part.headache_type = entry.headache_type
        part.collection = entry.collection
        part.description = entry.description
        part.category = str(COLLECTION_META[entry.collection]["category"])
    else:
        part.category = classify_category(part.english_name)
        part.collection = "Others"
        part.headache_type = "None"


# --- 抽出選定（cross-set dedup） --------------------------------------------

def select_extract(parts: list[BodyPart]) -> list[BodyPart]:
    """ホワイトリスト該当部位から GLB/Blender 用に採用する部位を選ぶ。

    同一 FMA 概念が part_of / is_a 両方にある場合は part_of を優先し is_a を落とす。
    採用側の全メッシュ断片・左右・ミラーは保持する（断片欠落を防ぐ）。
    """
    whitelisted = [p for p in parts if p.importance > 0]
    part_of_fmas = {p.fma_id for p in whitelisted if p.buildup == "part_of" and p.fma_id}
    selected = [
        p for p in whitelisted
        if p.buildup == "part_of" or p.fma_id not in part_of_fmas
    ]
    dropped = len(whitelisted) - len(selected)
    LOG.info("抽出選定: 該当 %d → 採用 %d（is_a 重複 %d 件を除外）",
             len(whitelisted), len(selected), dropped)
    return selected


def find_missing_patterns(parts: list[BodyPart]) -> list[WhitelistEntry]:
    """データセットに 1 件も現れなかったホワイトリスト項目を返す。"""
    matched_patterns = {
        entry.pattern
        for p in parts
        if (entry := match_whitelist(p.english_name)) is not None
    }
    return [e for e in HEADACHE_WHITELIST if e.pattern not in matched_patterns]


# --- CSV 出力 --------------------------------------------------------------

_MASTER_HEADER: Final[list[str]] = [
    "OBJ File", "OBJ ID", "English Name", "Japanese Name", "FMA ID", "Category", "Region",
    "Headache Importance", "Headache Type", "Recommended Blender Collection", "Description",
    "BBox(mm)", "Buildup", "Mirror", "Vertices", "Faces",
]


def _master_row(part: BodyPart) -> list[str]:
    sx, sy, sz = part.size_mm
    return [
        part.obj_file, part.obj_id, part.english_name, part.japanese, part.fma_id,
        part.category, part.region, part.stars, part.headache_type, part.collection,
        part.description, f"{sx:g}×{sy:g}×{sz:g}", part.buildup,
        "yes" if part.is_mirror else "",
        "" if part.vertices is None else str(part.vertices),
        "" if part.faces is None else str(part.faces),
    ]


def write_csv(path: Path, header: list[str], rows: list[list[str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.writer(fh)
        writer.writerow(header)
        writer.writerows(rows)
    LOG.info("出力: %s（%d 行）", path.relative_to(REPO_ROOT), len(rows))


def write_master(out_dir: Path, parts: list[BodyPart]) -> None:
    rows = [_master_row(p) for p in sorted(parts, key=lambda p: p.obj_id)]
    write_csv(out_dir / "master_bodyparts.csv", _MASTER_HEADER, rows)


def write_headache_parts(out_dir: Path, parts: list[BodyPart]) -> None:
    picked = sorted((p for p in parts if p.importance > 0),
                    key=lambda p: (-p.importance, p.collection, p.english_name))
    write_csv(out_dir / "headache_parts.csv", _MASTER_HEADER, [_master_row(p) for p in picked])


def write_blender_collection(out_dir: Path, selected: list[BodyPart]) -> None:
    """Collection ごとに部位を並べた CSV（promp.md の blender_collection.csv）。"""
    header = ["Collection", "OBJ ID", "English Name", "Japanese Name"]
    rows: list[list[str]] = []
    grouped: dict[str, list[BodyPart]] = defaultdict(list)
    for part in selected:
        grouped[part.collection].append(part)
    for collection in COLLECTION_META:
        for part in sorted(grouped.get(collection, []), key=lambda p: p.english_name):
            rows.append([collection, part.obj_id, part.english_name, part.japanese])
    write_csv(out_dir / "blender_collection.csv", header, rows)


def write_extract_list(out_dir: Path, selected: list[BodyPart]) -> None:
    """抽出対象 OBJ 一覧（promp.md の extract_list.csv）。

    promp.md は「OBJ File だけ並べる」とするが、同一 FJ ファイル名が part_of / is_a 両
    ディレクトリに実在するため、それだけでは読み込み元を一意化できない。是正として
    ``Source Set``（実ディレクトリ名）と ``Collection`` を併記する。
    """
    rows = [
        [p.obj_file, p.collection, p.source_set]
        for p in sorted(selected, key=lambda p: p.obj_id)
    ]
    write_csv(out_dir / "extract_list.csv", ["OBJ File", "Collection", "Source Set"], rows)


def write_not_found(out_dir: Path, missing: list[WhitelistEntry]) -> None:
    """ホワイトリストのうち実在しなかった項目のレポート。"""
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / "not_found_report.txt"
    lines = [
        "# ホワイトリスト未検出レポート",
        "# データセットに 1 件も現れなかった頭痛関連パターン。",
        "# （三叉神経本幹・大後頭神経(GON)・硬膜などは BodyParts3D に非在）。",
        "",
    ]
    if not missing:
        lines.append("（未検出なし: すべてのパターンが最低 1 件マッチしました）")
    else:
        lines.extend(f"- {e.pattern}  … {e.japanese}（{e.collection}）" for e in missing)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    LOG.info("出力: %s（未検出 %d 件）", path.relative_to(REPO_ROOT), len(missing))


# --- CLI -------------------------------------------------------------------

def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="BodyParts3D → 頭痛教材マスター表ビルダー")
    parser.add_argument("--src-root", type=Path, default=DEFAULT_SRC_ROOT,
                        help="BodyParts3D のルート（既定: リポジトリ直下 BodyParts3D）")
    parser.add_argument("--out-dir", type=Path, default=DEFAULT_OUT_DIR,
                        help="CSV 出力先（既定: scripts/bodyparts3d/output）")
    parser.add_argument("--geometry", action="store_true",
                        help="頂点数/面数を集計する（全 OBJ を読むため遅い）")
    parser.add_argument("--log-level", default="INFO",
                        choices=("DEBUG", "INFO", "WARNING", "ERROR"))
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_arg_parser().parse_args(argv)
    logging.basicConfig(level=args.log_level, format="%(levelname)s %(message)s",
                        stream=sys.stderr)
    try:
        parts = load_parts(args.src_root, with_geometry=args.geometry)
    except FileNotFoundError as exc:
        LOG.error("%s", exc)
        return 1
    if not parts:
        LOG.error("有効な部位が 0 件でした。--src-root を確認してください。")
        return 1

    for part in parts:
        classify(part)

    selected = select_extract(parts)
    missing = find_missing_patterns(parts)

    write_master(args.out_dir, parts)
    write_headache_parts(args.out_dir, parts)
    write_blender_collection(args.out_dir, selected)
    write_extract_list(args.out_dir, selected)
    write_not_found(args.out_dir, missing)

    rated = sum(1 for p in parts if p.importance > 0)
    LOG.info("完了: 全 %d 部位 / 頭痛関連 %d 部位 / 抽出採用 %d 部位",
             len(parts), rated, len(selected))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

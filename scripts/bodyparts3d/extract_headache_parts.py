#!/usr/bin/env python3
"""extract_list.csv に従い、頭痛関連 OBJ を Collection 別ディレクトリへコピーする。

promp.md の extract_headache_parts.py に相当する。是正点として、同一 FJ ファイル名が
part_of / is_a 両ディレクトリに実在するため、``extract_list.csv`` の ``Source Set`` 列
（実ディレクトリ名）を使って読み込み元を一意に決める。

出力構成（既定 ``scripts/bodyparts3d/extract/``。中間物のため gitignore 済）::

    extract/
        Bones/  Muscles/  Nerves/  BloodVessels/  Brain/  Others/

標準ライブラリのみ。Python 3.12。
"""

from __future__ import annotations

import argparse
import csv
import logging
import shutil
import sys
from pathlib import Path
from typing import Final

from build_master import DEFAULT_SRC_ROOT, REPO_ROOT, SCRIPT_DIR

LOG = logging.getLogger("extract_headache_parts")

DEFAULT_EXTRACT_LIST: Final[Path] = SCRIPT_DIR / "output" / "extract_list.csv"
DEFAULT_EXTRACT_DIR: Final[Path] = SCRIPT_DIR / "extract"


def read_extract_list(path: Path) -> list[dict[str, str]]:
    """extract_list.csv を読み、必要列を持つ行の辞書リストを返す。"""
    if not path.is_file():
        raise FileNotFoundError(
            f"extract_list.csv がありません: {path}\n"
            "先に build_master.py を実行してください。"
        )
    with path.open(encoding="utf-8", newline="") as fh:
        rows = list(csv.DictReader(fh))
    required = {"OBJ File", "Collection", "Source Set"}
    if rows and not required.issubset(rows[0].keys()):
        raise ValueError(f"必須列 {required} が不足しています: {list(rows[0].keys())}")
    return rows


def copy_parts(rows: list[dict[str, str]], src_root: Path, extract_dir: Path) -> int:
    """各行の OBJ を ``extract/<Collection>/`` へコピーし、コピー数を返す。"""
    if extract_dir.exists():
        shutil.rmtree(extract_dir)  # 決定論的な再生成のため毎回クリーン。
    copied = 0
    missing: list[str] = []
    for row in rows:
        src = src_root / row["Source Set"] / row["OBJ File"]
        if not src.is_file():
            missing.append(str(src.relative_to(REPO_ROOT)) if src.is_relative_to(REPO_ROOT)
                           else str(src))
            continue
        dest_dir = extract_dir / row["Collection"]
        dest_dir.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest_dir / row["OBJ File"])
        copied += 1
    if missing:
        LOG.warning("コピー元が見つからない OBJ が %d 件あります:", len(missing))
        for path in missing[:10]:
            LOG.warning("  - %s", path)
    return copied


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="頭痛関連 OBJ の Collection 別抽出")
    parser.add_argument("--extract-list", type=Path, default=DEFAULT_EXTRACT_LIST)
    parser.add_argument("--src-root", type=Path, default=DEFAULT_SRC_ROOT)
    parser.add_argument("--out-dir", type=Path, default=DEFAULT_EXTRACT_DIR,
                        help="extract/ の出力先（既定: scripts/bodyparts3d/extract）")
    parser.add_argument("--log-level", default="INFO",
                        choices=("DEBUG", "INFO", "WARNING", "ERROR"))
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_arg_parser().parse_args(argv)
    logging.basicConfig(level=args.log_level, format="%(levelname)s %(message)s",
                        stream=sys.stderr)
    try:
        rows = read_extract_list(args.extract_list)
        copied = copy_parts(rows, args.src_root, args.out_dir)
    except (FileNotFoundError, ValueError) as exc:
        LOG.error("%s", exc)
        return 1

    by_collection: dict[str, int] = {}
    for row in rows:
        by_collection[row["Collection"]] = by_collection.get(row["Collection"], 0) + 1
    for collection, count in sorted(by_collection.items()):
        LOG.info("  %-14s %d", collection, count)
    LOG.info("完了: %d / %d 部位を %s へコピー",
             copied, len(rows), args.out_dir.relative_to(REPO_ROOT)
             if args.out_dir.is_relative_to(REPO_ROOT) else args.out_dir)
    return 0 if copied > 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())

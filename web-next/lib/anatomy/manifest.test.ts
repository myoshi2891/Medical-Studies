import { describe, expect, it } from "vitest";
import { ANATOMY_MANIFEST, getStructure } from "./manifest";
import { validateManifest } from "./types";

/** 設計書 §3 コンテンツ・マッピングの 6 構造を期待順で固定。 */
const EXPECTED_IDS = ["overview", "nerves", "vessels", "brain", "bones", "muscles"];

describe("ANATOMY_MANIFEST", () => {
  it("6 構造を期待順で含む", () => {
    expect(ANATOMY_MANIFEST.map((s) => s.id)).toEqual(EXPECTED_IDS);
  });

  it("validateManifest を例外なく通過する", () => {
    expect(() => validateManifest(ANATOMY_MANIFEST)).not.toThrow();
  });

  it("各構造が概要と最低1つの md リンクを持つ", () => {
    for (const s of ANATOMY_MANIFEST) {
      expect(s.summary.length).toBeGreaterThan(0);
      expect(s.links.length).toBeGreaterThan(0);
    }
  });

  it("md リンクの href はすべて非空", () => {
    for (const s of ANATOMY_MANIFEST) {
      for (const link of s.links) {
        expect(link.href.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("ANATOMY_MANIFEST: MRI 配線（Phase 1）", () => {
  /** 設計書 §3 のマッピング: 脳系は brain、頚椎系は cervical を割り当てる。 */
  const BODY_PART: Record<string, "brain" | "cervical"> = {
    overview: "brain",
    nerves: "cervical",
    vessels: "brain",
    brain: "brain",
    bones: "cervical",
    muscles: "cervical",
  };

  it("全 6 構造に MRI シリーズが配線されている（null なし）", () => {
    for (const s of ANATOMY_MANIFEST) {
      expect(s.mri, `${s.id} の mri が未配線`).not.toBeNull();
    }
  });

  it("構造の身体部位がマッピングと一致する", () => {
    for (const s of ANATOMY_MANIFEST) {
      expect(s.mri?.bodyPart).toBe(BODY_PART[s.id]);
    }
  });

  it("全スライスが /mri/ 始まりの .png 非空パスである", () => {
    for (const s of ANATOMY_MANIFEST) {
      const slices = s.mri?.slices ?? [];
      expect(slices.length).toBeGreaterThan(0);
      for (const path of slices) {
        expect(path).toMatch(/^\/mri\/(brain|cervical)\/\d{2}\.png$/);
      }
    }
  });
});

describe("getStructure", () => {
  it("既知 id で構造を返す", () => {
    expect(getStructure("nerves")?.id).toBe("nerves");
  });

  it("未知 id では undefined", () => {
    expect(getStructure("nope")).toBeUndefined();
  });
});

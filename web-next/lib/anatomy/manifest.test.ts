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

  it("全スライスが /mri/ 始まりの .png 非空パスであり、枚数が8枚固定である", () => {
    for (const s of ANATOMY_MANIFEST) {
      const slices = s.mri?.slices ?? [];
      expect(slices).toHaveLength(8);
      for (const path of slices) {
        expect(path).toMatch(/^\/mri\/(brain|cervical)\/\d{2}\.png$/);
      }
    }
  });
});

describe("ANATOMY_MANIFEST: 出典メタデータ（provenance / F3）", () => {
  /** permission が取りうる 4 値。 */
  const PERMISSIONS = ["own", "granted", "unverified", "denied"];

  it("全 6 構造の MRI シリーズに provenance が定義されている", () => {
    for (const s of ANATOMY_MANIFEST) {
      expect(s.mri?.provenance, `${s.id} の provenance が未定義`).toBeDefined();
    }
  });

  it("permission が 4 値のいずれかである", () => {
    for (const s of ANATOMY_MANIFEST) {
      expect(PERMISSIONS).toContain(s.mri?.provenance?.permission);
    }
  });

  it("本リポジトリの現状値として全シリーズの permission が own である", () => {
    for (const s of ANATOMY_MANIFEST) {
      expect(s.mri?.provenance?.permission, `${s.id} の permission`).toBe("own");
    }
  });

  it("不正な permission 値を含む mri は理由付き Error で弾かれる", () => {
    const bad = [
      {
        id: "overview",
        title: "t",
        summary: "s",
        modelSrc: null,
        hotspots: [],
        mri: {
          id: "brain",
          bodyPart: "brain",
          slices: ["/mri/brain/01.png"],
          provenance: { source: "x", copyrightHolder: "y", permission: "maybe" },
        },
        links: [{ label: "l", href: "/x" }],
      },
    ];
    expect(() => validateManifest(bad)).toThrow(/permission/);
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

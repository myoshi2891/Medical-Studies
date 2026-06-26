import { describe, expect, it } from "vitest";
import { type AnatomyStructure, validateManifest } from "./types";

/** 妥当な最小構造（正常系の基準値）。 */
const validStructure: AnatomyStructure = {
  id: "nerves",
  title: "神経",
  summary: "後頭神経・三叉神経など、頭痛に関わる神経。",
  modelSrc: null,
  hotspots: [
    {
      id: "gon",
      label: "大後頭神経 (GON)",
      plain: "後頭部の感覚を伝える神経",
      position: "0 0.1 0",
    },
  ],
  mri: null,
  links: [{ label: "後頭神経ブロック", href: "/blocks/occipital-nerve-block" }],
};

describe("validateManifest", () => {
  it("正常系: 妥当な構造配列をそのまま返す", () => {
    const result = validateManifest([validStructure]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("nerves");
  });

  it("異常系: 配列でない場合は例外", () => {
    expect(() => validateManifest({})).toThrow();
    expect(() => validateManifest(null)).toThrow();
  });

  it("異常系: 未知の id は例外", () => {
    expect(() => validateManifest([{ ...validStructure, id: "unknown" }])).toThrow();
  });

  it("異常系: title 欠落は例外", () => {
    const missingTitle = {
      id: "nerves",
      summary: "x",
      modelSrc: null,
      hotspots: [],
      mri: null,
      links: validStructure.links,
    };
    expect(() => validateManifest([missingTitle])).toThrow();
  });

  it("異常系: hotspot の position 欠落は例外", () => {
    const bad = { ...validStructure, hotspots: [{ id: "x", label: "y", plain: "z" }] };
    expect(() => validateManifest([bad])).toThrow();
  });

  it("異常系: links の href 空文字は例外", () => {
    const bad = { ...validStructure, links: [{ label: "a", href: "" }] };
    expect(() => validateManifest([bad])).toThrow();
  });

  it("異常系: 空配列は例外（最低1構造を要求）", () => {
    expect(() => validateManifest([])).toThrow();
  });
});

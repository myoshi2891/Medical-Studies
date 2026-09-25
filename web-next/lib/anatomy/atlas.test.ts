import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ATLAS_LAYERS, ATLAS_PARTS } from "./atlas";
import models from "./atlas-models.json";

function glbJson(id: string) {
  const bytes = readFileSync(resolve("public/models/atlas", `${id}.glb`));
  expect(bytes.readUInt32LE(0)).toBe(0x46546c67);
  return JSON.parse(bytes.subarray(20, 20 + bytes.readUInt32LE(12)).toString()) as {
    materials: { name: string }[];
    nodes: { name?: string; translation?: number[]; rotation?: number[]; scale?: number[] }[];
  };
}

describe("統合アトラスのデータと実モデル", () => {
  it("7系統が部位を持ち、日英の位置・機能と臨床解説を備える", () => {
    expect(ATLAS_LAYERS.map((l) => l.id)).toEqual([
      "nerves",
      "vessels",
      "brain",
      "brainstem",
      "skull",
      "cervical",
      "muscles",
    ]);
    expect(new Set(ATLAS_PARTS.map((p) => p.id)).size).toBe(ATLAS_PARTS.length);
    for (const layer of ATLAS_LAYERS)
      expect(ATLAS_PARTS.some((p) => p.layer === layer.id)).toBe(true);
    for (const part of ATLAS_PARTS) {
      for (const lang of ["ja", "en"] as const) {
        expect(part.description[lang].length).toBeGreaterThan(40);
        expect(part.clinical[lang].length).toBeGreaterThan(20);
      }
      expect(part.sources.length).toBeGreaterThan(0);
    }
  });
  it("全体・各レイヤー・各部位のGLBが実在し、全体に全ての部位を収録する", () => {
    const overview = glbJson("overview");
    expect(overview.materials.map((m) => m.name).sort()).toEqual(
      ATLAS_PARTS.map((p) => p.id).sort()
    );
    for (const layer of ATLAS_LAYERS) {
      expect(
        glbJson(layer.id)
          .materials.map((m) => m.name)
          .sort()
      ).toEqual(
        ATLAS_PARTS.filter((p) => p.layer === layer.id)
          .map((p) => p.id)
          .sort()
      );
    }
    for (const part of ATLAS_PARTS)
      expect(glbJson(part.id).materials.map((m) => m.name)).toEqual([part.id]);
  });
  it("統合と個別モデルで共通座標を使い、元OBJを重複収録しない", () => {
    const entries = Object.values(models.parts);
    const ids = entries.flatMap((p) => p.sourceIds);
    expect(new Set(ids).size).toBe(ids.length);
    expect(entries.length).toBe(ATLAS_PARTS.length);
    const overviewRoot = glbJson("overview").nodes.find((n) => n.name === "atlas-root");
    expect(overviewRoot).toBeDefined();
    for (const part of ATLAS_PARTS) {
      const root = glbJson(part.id).nodes.find((n) => n.name === "atlas-root");
      expect(root?.translation).toEqual(overviewRoot?.translation);
      expect(root?.rotation).toEqual(overviewRoot?.rotation);
      expect(root?.scale).toEqual([0.001, 0.001, 0.001]);
    }
  });
});

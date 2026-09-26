import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AnatomyViewers } from "@/components/anatomy/AnatomyViewers";
import { ANATOMY_MANIFEST } from "@/lib/anatomy/manifest";
import { getRelated } from "@/lib/content/registry";
import AnatomyPage from "./page";

// 重いクライアント部品はモック化（既存 page.test.tsx 規約）。
vi.mock("@/components/anatomy/ModelViewer", () => ({
  default: ({ src }: { src: string | null }) => (
    <div data-testid="model-viewer" data-src={src ?? ""} />
  ),
}));
vi.mock("@/components/anatomy/MriSliceViewer", () => ({
  default: () => <div data-testid="mri-viewer" />,
}));

vi.mock("@/components/anatomy/AnatomyAtlas", () => ({
  default: () => <div data-testid="model-viewer" data-atlas="integrated" />,
  AtlasSectionButton: () => <button type="button">部位を拡大</button>,
}));
vi.mock("@/components/anatomy/AtlasSectionViewer", () => ({
  default: ({ layerId }: { layerId: string }) => (
    <div data-testid="model-viewer" data-atlas-layers={layerId} />
  ),
  AtlasSectionGroup: ({ layers }: { layers: string[] }) => (
    <div data-testid="model-viewer" data-atlas-layers={layers.join(",")} />
  ),
}));

const HERO_H1 = "頭痛 3D 解剖アトラス";

afterEach(async () => {
  await vi.dynamicImportSettled();
});

describe("AnatomyPage: 契約", () => {
  it("hero の <h1> がページタイトルと一致する", () => {
    const { container } = render(<AnatomyPage />);
    expect(container.querySelector(".anatomy-hero h1")?.textContent).toBe(HERO_H1);
  });

  it("Academic Disclaimer を表示する", () => {
    const { container } = render(<AnatomyPage />);
    expect(container.querySelector(".anatomy-disclaimer")).not.toBeNull();
  });

  it("BodyParts3D の帰属表示（CC-BY-SA）を掲示する", () => {
    const { container } = render(<AnatomyPage />);
    const credits = container.querySelector(".anatomy-credits");
    expect(credits).not.toBeNull();
    expect(credits?.textContent).toContain("BodyParts3D");
    expect(credits?.textContent).toContain("CC BY-SA 2.1 JP");
  });

  it("section.anatomy-sec の id が manifest と一致する", () => {
    const { container } = render(<AnatomyPage />);
    const ids = Array.from(container.querySelectorAll("section.anatomy-sec")).map((s) => s.id);
    expect(ids).toEqual(ANATOMY_MANIFEST.map((s) => s.id));
  });

  it("各構造に3Dを表示し、MRIビューアは初期状態で描画しない", async () => {
    const { getAllByTestId, queryAllByTestId } = render(<AnatomyPage />);
    await waitFor(() => {
      expect(getAllByTestId("model-viewer")).toHaveLength(ANATOMY_MANIFEST.length);
      expect(queryAllByTestId("mri-viewer")).toHaveLength(0);
    });
  });

  it("ヒーローから全体像へ進め、MRI表示を案内しない", () => {
    const { getByRole, container } = render(<AnatomyPage />);
    expect(getByRole("link", { name: "全体像を探索" })).toHaveAttribute("href", "#overview");
    expect(container.querySelector(".anatomy-hero")?.textContent).not.toContain("MRI");
  });

  it("各教育リンクが href に応じたセマンティックカテゴリ(data-cat)を持つ", () => {
    const { container } = render(<AnatomyPage />);
    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>("a.anatomy-link"));
    expect(links.length).toBeGreaterThan(0);
    const expected = (href: string): string => {
      if (href.startsWith("/headaches")) return "疾患";
      if (href.startsWith("/blocks")) return "神経ブロック";
      if (href.startsWith("/therapies") || href.startsWith("/physical-therapy")) return "治療";
      return "教育";
    };
    for (const a of links) {
      const href = a.getAttribute("href") ?? "";
      expect(a.getAttribute("data-cat")).toBe(expected(href));
    }
  });

  it("manifest の全 md リンクを内部リンクとして描画する（.html を含まない）", () => {
    const { container } = render(<AnatomyPage />);
    const hrefs = Array.from(container.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    );
    const expectedHrefs = ANATOMY_MANIFEST.flatMap((s) => s.links.map((l) => l.href));
    for (const href of expectedHrefs) {
      expect(hrefs).toContain(href);
    }
    for (const href of hrefs) {
      expect(href).not.toContain(".html");
    }
  });
});

/**
 * 関連ページ導線の契約（plans/002 Step 3）。
 * リンク関係は本文ではなく lib/content/registry.ts が持つため、
 * ここではレジストリとの結線のみを固定する。
 */
describe("AnatomyPage: 関連ページ導線", () => {
  const HREF = "/anatomy";

  it("レジストリの関連ページをすべてリンクとして描画する", () => {
    const { container } = render(<AnatomyPage />);
    const hrefs = Array.from(container.querySelectorAll(".related-links a")).map((a) =>
      a.getAttribute("href")
    );
    expect(hrefs).toEqual(getRelated(HREF).map((e) => e.href));
  });

  it("内部リンクを最低 2 本持つ（plans/002 Step 3）", () => {
    const { container } = render(<AnatomyPage />);
    const links = container.querySelectorAll(".related-links a");
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const link of links) {
      expect(link.getAttribute("href")?.startsWith("/")).toBe(true);
    }
  });
});

// 総覧が既存の空モデルへ退行しないことを固定する。
it("総覧に統合アトラスを接続する", () => {
  const { container } = render(<AnatomyPage />);
  expect(container.querySelector('#overview [data-atlas="integrated"]')).not.toBeNull();
});

it.each([
  ["nerves", "nerves"],
  ["vessels", "vessels"],
  ["brain", "brain,brainstem"],
  ["bones", "skull,cervical"],
  ["muscles", "muscles"],
])("%s欄を系統別アトラスに接続し、MRIを非表示にする", async (id, layers) => {
  const { container } = render(<AnatomyPage />);
  await waitFor(() => {
    expect(container.querySelector(`#${id} [data-atlas-layers="${layers}"]`)).not.toBeNull();
    expect(container.querySelector(`#${id} [data-testid="mri-viewer"]`)).toBeNull();
    expect(container.querySelector(`#${id} [data-src]`)).toBeNull();
  });
});

it.each([
  "overview",
  "brain",
] as const)("%sのMRIデータは保持し、明示指定時だけ再表示できる", async (structureId) => {
  const structure = ANATOMY_MANIFEST.find((item) => item.id === structureId);
  if (!structure) throw new Error("対象の構造がありません");
  const { queryByTestId, rerender } = render(
    <AnatomyViewers structureId={structureId} mri={structure.mri} title={structure.title} showMri />
  );
  await waitFor(() => expect(queryByTestId("mri-viewer")).not.toBeNull());
  rerender(
    <AnatomyViewers structureId={structureId} mri={structure.mri} title={structure.title} />
  );
  expect(queryByTestId("mri-viewer")).toBeNull();
});

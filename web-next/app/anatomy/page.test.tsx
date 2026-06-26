import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ANATOMY_MANIFEST } from "@/lib/anatomy/manifest";
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

const HERO_H1 = "頭痛 3D 解剖アトラス";

describe("AnatomyPage: 契約", () => {
  it("hero の <h1> がページタイトルと一致する", () => {
    const { container } = render(<AnatomyPage />);
    expect(container.querySelector(".anatomy-hero h1")?.textContent).toBe(HERO_H1);
  });

  it("Academic Disclaimer を表示する", () => {
    const { container } = render(<AnatomyPage />);
    expect(container.querySelector(".anatomy-disclaimer")).not.toBeNull();
  });

  it("section.anatomy-sec の id が manifest と一致する", () => {
    const { container } = render(<AnatomyPage />);
    const ids = Array.from(container.querySelectorAll("section.anatomy-sec")).map((s) => s.id);
    expect(ids).toEqual(ANATOMY_MANIFEST.map((s) => s.id));
  });

  it("各構造に ModelViewer と MriSliceViewer を配置する", () => {
    const { getAllByTestId } = render(<AnatomyPage />);
    expect(getAllByTestId("model-viewer")).toHaveLength(ANATOMY_MANIFEST.length);
    expect(getAllByTestId("mri-viewer")).toHaveLength(ANATOMY_MANIFEST.length);
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

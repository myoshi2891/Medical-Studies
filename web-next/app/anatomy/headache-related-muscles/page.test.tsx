import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HeadacheRelatedMusclesPage from "./page";

// MermaidDiagram はコンポーネントテストでモック化
vi.mock("@/components/MermaidDiagram", () => ({
  default: ({ chart }: { chart: string }) => (
    <div className="mermaid" data-chart={chart} />
  ),
}));

const SECTION_IDS = [
  "s1",
  "s2",
  "s3",
  "s4",
  "s5",
  "s6",
  "s7",
  "s8",
  "s9",
  "s10",
];

describe("HeadacheRelatedMusclesPage: 契約テスト", () => {
  it("h1 タイトルが正確に描画される", () => {
    render(<HeadacheRelatedMusclesPage />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("頭痛に関連する筋肉");
  });

  it("セクションタイトル h2 が 10 個存在する", () => {
    const { container } = render(<HeadacheRelatedMusclesPage />);
    const h2List = container.querySelectorAll("h2.sec-title");
    expect(h2List.length).toBe(10);
  });

  it("各セクション ID (s1〜s10) が正しく存在する", () => {
    const { container } = render(<HeadacheRelatedMusclesPage />);
    SECTION_IDS.forEach((id) => {
      const section = container.querySelector(`section#${id}`);
      expect(section).not.toBeNull();
    });
  });

  it("h3 サブ見出しが 3 個存在する", () => {
    const { container } = render(<HeadacheRelatedMusclesPage />);
    const h3List = container.querySelectorAll("h3");
    expect(h3List.length).toBe(3);
  });

  it("Mermaid 図が 4 個存在する", () => {
    const { container } = render(<HeadacheRelatedMusclesPage />);
    const mermaids = container.querySelectorAll(".mermaid");
    expect(mermaids.length).toBe(4);
  });

  it("テーブルが 8 個存在する", () => {
    const { container } = render(<HeadacheRelatedMusclesPage />);
    const tables = container.querySelectorAll("table");
    expect(tables.length).toBe(8);
  });

  it("アラートが 10 個存在する", () => {
    const { container } = render(<HeadacheRelatedMusclesPage />);
    const alerts = container.querySelectorAll(".alert");
    expect(alerts.length).toBe(10);
  });

  it("すべての外部リンク (20個) に target='_blank' と rel='noopener noreferrer' が付与されている", () => {
    const { container } = render(<HeadacheRelatedMusclesPage />);
    const extLinks = container.querySelectorAll("a[href^='http']");
    expect(extLinks.length).toBe(20);
    extLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("サイドバー目次リンクが 10 個描画される", () => {
    const { container } = render(<HeadacheRelatedMusclesPage />);
    const navLinks = container.querySelectorAll("nav.sidebar a.nav-a");
    expect(navLinks.length).toBe(10);
  });

  it("免責事項とフッターが描画される", () => {
    const { container } = render(<HeadacheRelatedMusclesPage />);
    expect(container.querySelector(".disclaimer")).not.toBeNull();
    expect(container.querySelector(".footer")).not.toBeNull();
  });
});

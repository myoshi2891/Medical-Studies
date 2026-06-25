import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * 外部リンク共有コンポーネント。
 *
 * `target="_blank"` と `rel="noopener noreferrer"` を必ず付与し、reverse tabnabbing を防ぐ。
 * 内部アンカー（`#...`）には使わず、素の `<a>` を用いること。
 *
 * @param href - 外部 URL（http/https）。
 * @param children - リンク本文。
 * @returns 安全な外部リンク `<a>`。
 */
export function Ext({
  href,
  children,
  ...rest
}: { href: string; children: ReactNode } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel"
>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

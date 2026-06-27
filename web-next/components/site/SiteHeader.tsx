"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isDropdown, type NavLink, navLinks } from "./nav-links";
import { SiteHeaderClient } from "./SiteHeaderClient";

/**
 * usePathname は Client 専用のため、SiteHeader も Client Component とし、
 * usePathname() で現在地を取得する。テストは pathname プロップで上書き可能。
 */
function isActivePath(href: string, pathname: string): boolean {
  return href === pathname;
}

function isParentActive(link: NavLink, pathname: string): boolean {
  if (!isDropdown(link)) return false;
  return link.children.some((c) => !c.disabled && isActivePath(c.href, pathname));
}

/**
 * 全ページ共通のヘッダ。サイトブランド・ハンバーガートグル・
 * navLinks 由来のナビゲーション（子を持つ項目はドロップダウン）を描画し、
 * 現在地に一致するリンクへ active クラスと aria-current="page" を付与する。
 *
 * @param pathname - ルーター由来 pathname の上書き（省略時は usePathname()、最終フォールバックは "/"）。
 */
export function SiteHeader({ pathname: pathnameProp }: { pathname?: string } = {}) {
  const fromHook = usePathname();
  const pathname = pathnameProp ?? fromHook ?? "/";

  return (
    <SiteHeaderClient>
      <nav id="common-header" aria-label="Main Navigation" className="ch-nav">
        <Link className="ch-brand" href="/">
          Medical Studies
        </Link>
        <button
          type="button"
          className="ch-hamburger"
          aria-controls="ch-menu"
          aria-expanded="false"
          aria-label="メニューを開閉"
        >
          <span className="ch-bar" />
          <span className="ch-bar" />
          <span className="ch-bar" />
        </button>
        <ul id="ch-menu" className="ch-links">
          {navLinks.map((link) => {
            if (isDropdown(link)) {
              const parentActive = isParentActive(link, pathname);
              return (
                <li key={link.name} className="ch-dropdown">
                  <button
                    type="button"
                    className={`ch-dropdown-toggle${parentActive ? " ch-active" : ""}`}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span>{link.name}</span>
                  </button>
                  <ul className="ch-submenu">
                    {link.children.map((c) => {
                      if (c.disabled) {
                        return (
                          <li key={c.href}>
                            <span className="ch-disabled" aria-disabled="true">
                              {c.name}
                              <span className="ch-soon">（準備中）</span>
                            </span>
                          </li>
                        );
                      }
                      const active = isActivePath(c.href, pathname);
                      return (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={active ? "ch-active" : undefined}
                            aria-current={active ? "page" : undefined}
                          >
                            {c.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }
            if (link.disabled) {
              return (
                <li key={link.name}>
                  <span className="ch-disabled" aria-disabled="true">
                    {link.name}
                    <span className="ch-soon">（準備中）</span>
                  </span>
                </li>
              );
            }
            const active = isActivePath(link.href, pathname);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={active ? "ch-active" : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </SiteHeaderClient>
  );
}

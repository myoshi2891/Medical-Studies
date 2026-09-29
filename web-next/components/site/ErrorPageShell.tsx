import type { ReactNode } from "react";

type ErrorPageShellProps = {
  code: "404" | "500";
  label: string;
  title: string;
  description: string;
  actions: ReactNode;
  note: string;
};

/** 404 と実行時エラーで共通の案内レイアウトを表示する。 */
export function ErrorPageShell({
  code,
  label,
  title,
  description,
  actions,
  note,
}: ErrorPageShellProps) {
  return (
    <main className={`error-page error-page-${code}`}>
      <div className="error-page-inner">
        <div className="error-page-copy">
          <p className="error-page-eyebrow">
            <span className="error-page-status" aria-hidden="true" />
            {label}
          </p>
          <h1>{title}</h1>
          <p className="error-page-description">{description}</p>
          <div className="error-page-actions">{actions}</div>
          <p className="error-page-note">{note}</p>
        </div>
        <div className="error-page-art" aria-hidden="true">
          <div className="error-page-art-grid" />
          <div className="error-page-art-ring error-page-art-ring-outer" />
          <div className="error-page-art-ring error-page-art-ring-inner" />
          <div className="error-page-art-core">
            <span>{code}</span>
            <small>MEDICAL STUDIES</small>
          </div>
          <span className="error-page-art-dot error-page-art-dot-one" />
          <span className="error-page-art-dot error-page-art-dot-two" />
          <span className="error-page-art-line error-page-art-line-one" />
          <span className="error-page-art-line error-page-art-line-two" />
        </div>
      </div>
    </main>
  );
}

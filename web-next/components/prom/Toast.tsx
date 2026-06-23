"use client";

/** 一時通知トースト（元 index.html の c-toast）。表示状態は PromApp が保持する。 */
export function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div className={`c-toast${show ? " is-show" : ""}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}

/**
 * 「上書き確認 → commit → toast」の共通骨格（PainTracker/PromForm/Diary で共通の保存フロー）。
 * window.confirm・PromContext(commit/toast) という副作用を扱うため upsert.ts（純粋関数専用）とは分離する。
 */
import type { AppData } from "@/components/prom/state";

export interface ConfirmAndCommitOptions {
  /** 既に同一キー（日付単位 or 日付+指標単位）のデータが存在するか。 */
  isOverwrite: boolean;
  /** isOverwrite=true のときのみ提示する確認ダイアログの文言。 */
  confirmMessage: string;
  /** 次状態を計算する純粋関数（PromContextValue.commit にそのまま渡される）。 */
  updater: (prev: AppData) => AppData;
  /** PromContextValue.commit をそのまま渡す。 */
  commit: (next: AppData | ((prev: AppData) => AppData)) => Promise<void>;
  /** PromContextValue.toast をそのまま渡す。 */
  toast: (msg: string) => void;
  /** commit 成功後に表示するトースト文言（isOverwrite を受け取り呼び出し元で文言分岐）。 */
  successMessage: (isOverwrite: boolean) => string;
  /** commit 成功後に実行する追加の副作用（フォームリセットや結果表示の更新）。省略可。 */
  onCommitted?: () => void;
}

/** Error 相当（message: string を持つオブジェクト）かどうかの型ガード。 */
function hasMessage(value: unknown): value is { message: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof (value as { message: unknown }).message === "string"
  );
}

/**
 * 上書き確認（必要な場合のみ）→ commit → 成功トースト、を実行する。
 * 確認でキャンセルされた場合は何もしない。commit が失敗した場合はエラートーストを表示する。
 */
export function confirmAndCommit(options: ConfirmAndCommitOptions): void {
  if (options.isOverwrite && !window.confirm(options.confirmMessage)) {
    return;
  }
  options
    .commit(options.updater)
    .then(() => {
      options.toast(options.successMessage(options.isOverwrite));
      options.onCommitted?.();
    })
    .catch((err: unknown) => {
      options.toast(hasMessage(err) ? err.message : String(err));
    });
}

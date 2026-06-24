"use client";

/**
 * Displays a toast message with optional visibility styling.
 *
 * @param message - The text to display inside the toast
 * @param show - Controls whether the visible state class is applied
 */
export function Toast({ message, show }: { message: string; show: boolean }) {
  return (
    <div className={`c-toast${show ? " is-show" : ""}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}

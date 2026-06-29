import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * `@google/model-viewer`（Web Component）を JSX で型安全に扱うための宣言。
 * `<model-viewer>` を React 19 の JSX `IntrinsicElements` に追加する。
 * tsconfig の include 設定（TS 拡張子の glob）で自動取込される。`any` は用いない。
 *
 * 参照: docs/architecture.md §4 / §11（3D ライブラリ）。
 */
interface ModelViewerAttributes
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  /** glTF/GLB の公開パス（例: /models/nerves.glb）。 */
  src?: string;
  /** 代替テキスト（アクセシビリティ）。 */
  alt?: string;
  /** 読込中に表示するポスター画像。 */
  poster?: string;
  /** カメラ操作（回転・ズーム）を許可する。 */
  "camera-controls"?: boolean;
  /** 自動回転。 */
  "auto-rotate"?: boolean;
  /** タッチ操作のスクロール挙動。 */
  "touch-action"?: string;
  /** 影の強さ。 */
  "shadow-intensity"?: string | number;
  /** 露出。 */
  exposure?: string | number;
  /** 操作プロンプトの表示制御。 */
  "interaction-prompt"?: string;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}

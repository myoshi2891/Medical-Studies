/** ブラウザ専用の登録処理。テストではこの境界を置き換え、WebGLを起動しない。 */
export async function loadModelViewer(): Promise<void> {
  const g = self as unknown as { ModelViewerElement?: { dracoDecoderLocation?: string } };
  g.ModelViewerElement ??= {};
  g.ModelViewerElement.dracoDecoderLocation = "/draco/";
  await import("@google/model-viewer");
}

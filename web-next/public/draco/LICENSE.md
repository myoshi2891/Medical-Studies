# Draco 3D デコーダ（自己ホスト）

このディレクトリの DRACO デコーダは、`@google/model-viewer` が DRACO 圧縮
（`KHR_draco_mesh_compression`）された glTF/GLB を復号するために使用します。

外部 CDN（`https://www.gstatic.com/draco/...`）への接続を避け、同一オリジンから
配信する目的で自己ホストしています（CSP `connect-src 'self'` 準拠）。デコーダ位置は
`components/anatomy/ModelViewer.tsx` で `dracoDecoderLocation = "/draco/"` として指定します。

## ファイル

- `draco_decoder.wasm` — WebAssembly デコーダ本体
- `draco_wasm_wrapper.js` — WASM デコーダの JavaScript ラッパ

## 出典・ライセンス

- プロジェクト: Draco 3D Data Compression — <https://github.com/google/draco>
- ライセンス: Apache License 2.0 — <https://github.com/google/draco/blob/master/LICENSE>
- 取得元: `three` パッケージ同梱の glTF ビルド（`three/examples/jsm/libs/draco/gltf/`）

Copyright The Draco Authors. Licensed under the Apache License, Version 2.0.

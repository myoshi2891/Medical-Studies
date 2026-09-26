# 系統別3Dを統合アトラスへ揃える手順

頭頸部の全体像で使っているモデル・視点操作・部位解説を、神経・血管などの既存欄へ適用する手順。
最初の適用先は `/anatomy` の神経欄。旧ビューアの自動回転を残し、通常表示と拡大画面に
「3Dラベルを表示」チェックボックスを設けた。MRIと教育ページへのリンクは引き継ぐ。

## 参照する実装

| 役割 | ファイル（リポジトリルートからの相対パス） |
| --- | --- |
| ページと各系統の接続 | `web-next/components/anatomy/AnatomyViewers.tsx` |
| 再利用する系統別ビューア | `web-next/components/anatomy/AtlasSectionViewer.tsx` |
| 全体像・拡大画面・共通のラベル切替 | `web-next/components/anatomy/AnatomyAtlas.tsx` |
| モデル描画・視点・回転・再読込 | `web-next/components/anatomy/AtlasModel.tsx` |
| 系統・部位・日英解説 | `web-next/lib/anatomy/atlas.ts` |
| アトラスのラベル座標 | `web-next/lib/anatomy/atlas-models.json` |
| MRI・ページ概要・教育リンク・旧モデル用情報 | `web-next/lib/anatomy/manifest.ts` |
| 共通スタイル | `web-next/app/anatomy/anatomy.css` |

モデル生成、収録範囲、ライセンスは [統合3Dアトラスの仕様](anatomy-atlas.md) を参照する。

## 1. 対象と維持する動作を確認する

対象のページ上のIDと、アトラスの系統IDを照合する。

| ページの構造ID | アトラスの系統ID | 適用状況 |
| --- | --- | --- |
| `nerves` | `nerves` | 系統別ビューアへ移行済み |
| `vessels` | `vessels` | 旧ビューア。次回の適用候補 |
| `brain` | `brain`, `brainstem` | 旧ビューア。2系統の切替・併置を別途設計する |
| `bones` | `skull`, `cervical` | 旧ビューア。2系統の切替・併置を別途設計する |
| `muscles` | `muscles` | 旧ビューア |

自動回転、ドラッグ回転、ズーム、MRIスライス、教育リンク、表示限界の注記を確認する。
既存のアニメーションは `auto-rotate` による自動回転であり、GLB内のアニメーションクリップではない。
将来クリップを持つモデルを扱う際は、再生・停止・クリップ選択を別の契約として検証する。

## 2. モデルと座標を一組で選ぶ

`AtlasSectionViewer` は `public/models/atlas/{layerId}.glb` を使い、該当系統の部位を
`ATLAS_PARTS` から取得する。ピンの座標は `atlas-models.json` の `parts[part.id].center` を使う。
全体像・系統・単独部位は共通座標を保っている。

旧 `public/models/{structureId}.glb` 用の `manifest.ts` の `hotspots[].position` を
新しいアトラスモデルへ流用しない。座標系が異なるため、ラベル位置がずれる。
現在の神経欄では描画情報をアトラスから取得し、manifestの既存情報は検索などのために保持する。

生成済みの系統を表示するだけなら、GLBの再生成は不要。
部位やモデル範囲を変える場合のみ、元OBJと `atlas.ts` の定義を確認して
`bun scripts/build-head-neck-atlas.mjs` を `web-next/` で実行する。
生成ファイルと `atlas-models.json` を同じ変更として確認する。

## 3. 先に契約テストを追加する（Red）

`web-next/components/anatomy/AnatomyAtlas.test.tsx` と
`web-next/app/anatomy/page.test.tsx` を参照し、対象系統について次を固定する。

- 正しいアトラスGLBを読む。ページに系統別ビューアとMRIが接続される。
- 初期状態はラベル表示・自動回転ともにオン。
- ラベルをオフにすると3Dピンのみ消え、同じモデル要素・回転状態・部位一覧を保持する。
- ラベルを再表示でき、自動回転は別のチェックボックスで停止・再開できる。
- ラベル非表示やモデル読込失敗でも一覧から日英の解説へ進める。
- 拡大画面でラベルを消し、単独表示から系統全体へ戻っても設定を保持する。
- 閉じる・Escapeで元のボタンへフォーカスが戻る。
- 対象外の欄の既存ビューア・MRI・リンクを維持する。

該当テストを実行し、意図した機能が未実装で失敗することを確認してから実装する。
遅延読込のページテストでは `waitFor` と `vi.dynamicImportSettled()` を使い、
WebGLを必要とする表示部品は境界でモック化する。

## 4. 共通ビューアを接続する（Green）

既存のクライアント境界 `AnatomyViewers.tsx` から、遅延読込した `AtlasSectionViewer` へ
対象系統の `layerId` を渡す。血管の表示例は次のとおり。

```tsx
<AtlasSectionViewer layerId="vessels" />
```

現在は `structureId === "nerves"` の条件で接続している。
血管へ適用する場合は、この条件を神経または血管へ広げる。系統別のコピーは作らない。
`brain` や `bones` をそのまま `layerId` に渡して済ませず、上の対応表に従って対象を選ぶ。
未登録の系統IDはエラーになる。

`AtlasSectionViewer` がラベルと回転の状態を持つ。
ラベルをオフにする場合は `pins=[]` を渡し、ラベル設定を `key` に含めない。
モデル再マウントによる視点のリセットを避けるためである。
`AtlasModel` の `autoRotate` は省略時オフ。系統別ビューアのみ初期状態でオンにする。

拡大画面は `AtlasDetail` を共用する。
通常表示と拡大画面のラベル設定は独立しており、拡大画面は開くたびにオンになる。
同じ拡大画面内では部位を切り替えても設定を保つ。設定の永続保存は行わない。
単独表示にはピンがなく、系統全体へ戻ると選択中の設定が反映される。

既存の `AtlasSectionButton`、MRIビューア、教育リンクは継続して接続する。
CSSは `.atlas-section-viewer` 内へ限定し、全体像や他の旧ビューアに影響させない。
部位の解説・出典・表示限界を変更する場合は、表示変更とは別に医学的な確認を行う。

## 5. 自動検証とブラウザ確認

`web-next/` で次を実行する。

```bash
bun run typecheck
bun run test
bun run lint
bun run build
```

Node.js 22のWeb Storageがjsdomと競合する環境では、テストを
`NODE_OPTIONS=--no-experimental-webstorage bun run test` で実行する。
本番ビルド用の `NEXT_PUBLIC_SITE_URL` は `.env.local.example` を参照する。

jsdomだけでは実際の3D描画を確認できないため、ブラウザでも確認する。
モデルは画面内に入ってから読み込まれる場合があるので、対象欄へスクロールして待つ。

- PC幅と390px幅でモデルが読み込め、画面・モーダルに横方向のはみ出しがない。
- ラベルのチェックを外してもモデルが消えず、実際に回転が続く。
- 自動回転を停止・再開でき、視点ボタン・ドラッグ・ズームを操作できる。
- ラベル非表示でも部位一覧から単独表示・日英解説を開ける。
- 拡大画面でもラベルを切り替え、系統全体へ戻れる。
- Escape・閉じる・背景クリックとフォーカス復帰が機能する。
- MRIのスライス操作と教育リンクを維持している。
- コンソールに新しいエラーがない。

## 6. 手順書・変更履歴を更新する

適用済み系統をこの文書の表へ追記し、`docs/anatomy-atlas.md` から参照できる状態にする。
Markdownを整形・Lintし、差分にローカル絶対パスがないことを確認する。
コミットする場合は `.claude/rules/tdd-mandatory-cycle.md` に従い、テスト・実装・文書を分離し、
必要な全体検証を通す。新しい外部依存やCSP許可先が必要になった場合はユーザー確認を取る。

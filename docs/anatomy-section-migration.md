# 系統別3Dを統合アトラスへ揃える手順

頭頸部の全体像で使っているモデル・視点操作・部位解説を、神経・血管などの既存欄へ適用する手順。
`/anatomy` の神経・血管・脳／脳幹・骨／頚椎・筋の全欄へ適用済み。旧ビューアの自動回転を残し、通常表示と詳細画面に
「3Dラベルを表示」チェックボックスを設けた。教育ページへのリンクは引き継ぐ。
MRIのデータとビューアは保持しているが、現在はユーザー指定で全欄とも非表示。
`AnatomyViewers` の `showMri` は省略時 `false` で、画像自体を読み込まない。
再表示するときだけ `showMri` を明示し、既定の非表示を移行作業で戻さない。

## 参照する実装

| 役割 | ファイル（リポジトリルートからの相対パス） |
| --- | --- |
| ページと各系統の接続 | `web-next/components/anatomy/AnatomyViewers.tsx` |
| 系統切替（`AtlasSectionGroup`）と系統別ビューア | `web-next/components/anatomy/AtlasSectionViewer.tsx` |
| 全体像・詳細画面・共通のラベル切替 | `web-next/components/anatomy/AnatomyAtlas.tsx` |
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
| `vessels` | `vessels` | 系統別ビューアへ移行済み |
| `brain` | `brain`, `brainstem` | 移行済み。「脳／脳幹」を切替。初期表示は脳 |
| `bones` | `skull`, `cervical` | 移行済み。「頭蓋骨／頸椎」を切替。初期表示は頭蓋骨 |
| `muscles` | `muscles` | 系統別ビューアへ移行済み |

自動回転、ドラッグ回転、ズーム、MRIスライス、教育リンク、表示限界の注記を確認する。
既存のアニメーションは `auto-rotate` による自動回転であり、GLB内のアニメーションクリップではない。
将来クリップを持つモデルを扱う際は、再生・停止・クリップ選択を別の契約として検証する。

## 2. モデルと座標を一組で選ぶ

`AtlasSectionViewer` は `public/models/atlas/{layerId}.glb` を使い、該当系統の部位を
`ATLAS_PARTS` から取得する。ピンの座標は `atlas-models.json` の `parts[part.id].center` を使う。
全体像・系統・単独部位は共通座標を保っている。

旧 `public/models/{structureId}.glb` 用の `manifest.ts` の `hotspots[].position` を
新しいアトラスモデルへ流用しない。座標系が異なるため、ラベル位置がずれる。
全欄の描画情報をアトラスから取得し、manifestの既存情報は検索などのために保持する。
`AnatomyViewers` には旧モデルの `modelSrc` と `hotspots` を渡さず、構造ID・MRI・欄名を渡す。

生成済みの系統を表示するだけなら、GLBの再生成は不要。
部位やモデル範囲を変える場合のみ、元OBJと `atlas.ts` の定義を確認して
`bun scripts/build-head-neck-atlas.mjs` を `web-next/` で実行する。
生成ファイルと `atlas-models.json` を同じ変更として確認する。

## 3. 先に契約テストを追加する（Red）

`web-next/components/anatomy/AnatomyAtlas.test.tsx` と
`web-next/app/anatomy/page.test.tsx` を参照し、対象系統について次を固定する。

- 正しいアトラスGLBを読む。ページに系統別ビューアが接続され、MRIは既定で描画されない。
- MRIデータは保持し、`showMri` を明示した場合のみ表示できる。
- 初期状態はラベル表示・自動回転ともにオン。
- ラベルをオフにすると3Dピンのみ消え、同じモデル要素・回転状態・部位一覧を保持する。
- ラベルを再表示でき、自動回転は別のチェックボックスで停止・再開できる。
- ラベル非表示やモデル読込失敗でも一覧から日英の解説へ進める。
- 詳細画面でラベルを消しても系統全体を維持し、一覧から選択部位を強調できる。
- 部位一覧は内部スクロールなしで全件を表示し、選択後は右の観察欄を日英解説へ切り替える。
- 閉じる・Escapeで元のボタンへフォーカスが戻る。
- 対象外の欄の既存ビューアとリンクを維持する。MRI は `showMri` 未指定（既定 `false`）なら描画しない。
- 複数系統の欄では切替ボタンの選択状態・モデル・ラベル座標・部位一覧・詳細画面を連動する。
- 系統を切り替えてもラベル表示・自動回転の設定を保ち、同時に描画する通常モデルは1つとする。

該当テストを実行し、意図した機能が未実装で失敗することを確認してから実装する。
遅延読込のページテストでは `waitFor` と `vi.dynamicImportSettled()` を使い、
WebGLを必要とする表示部品は境界でモック化する。
共通部品だけのテストが通っても、ページ側が旧ビューアのままの場合がある。
`page.test.tsx` のモックで対象欄の `data-atlas-layers` とMRIの非表示を確認し、旧モデルの `data-src` が
残らないことも検証する。移行する系統の旧ビューアを期待していたテストは、この段階で更新する。

血管の適用では、ページの接続テストを神経・血管の両方で実行し、血管のみ失敗することを
確認してから接続条件を変更した。ラベルの再表示、回転の停止・再開、読込失敗時の部位選択、
詳細内のラベル非表示・日英解説・フォーカス復帰も検証対象とする。

## 4. 共通ビューアを接続する（Green）

既存のクライアント境界 `AnatomyViewers.tsx` から、遅延読込した `AtlasSectionGroup` へ
対象系統の `layers` と欄名 `title` を渡す。単一系統と複数系統の表示例は次のとおり。

```tsx
<AtlasSectionGroup layers={["vessels"]} title="血管" />
<AtlasSectionGroup layers={["brain", "brainstem"]} title="脳・脳幹" />
<AtlasSectionGroup layers={["skull", "cervical"]} title="骨・頚椎" />
```

欄と系統の対応は `AnatomyViewers.tsx` の `SECTION_LAYERS` にまとめてあり、
通常表示と `AtlasSectionButton` の詳細導線で共用する。新しい欄を追加する場合は、この対応表を更新する。
`layers` は空にできず、先頭の系統を初期表示する。未登録の系統IDはエラーになる。
`brain` は脳・脳幹の2系統、`bones` は頭蓋骨・頸椎の2系統へ対応させる。

`AtlasSectionGroup` は複数系統の場合だけ「表示する系統」のボタンを表示する。
CSSは `.atlas-system-switcher`（fieldset）と `.atlas-system-options`（内部のボタン列）を使う。
fieldset内のlegendとボタンが干渉しないよう、flexは内部のボタン列へ指定する。
視点用の `.atlas-camera` や `width: max-content` を系統切替へ流用しない。
選択状態は `aria-pressed` で示し、ネイティブボタンとしてTab・Enter・Spaceで操作できる。
選択したIDを内側の `AtlasSectionViewer` に渡し、系統別のコピーは作らない。
系統を変えても `AtlasSectionViewer` を再マウントしないため、ラベル・回転の設定を保持する。
モデルは選択系統のGLBへ切り替わり、部位一覧・ラベル座標も同じ系統へ更新する。

`AtlasSectionViewer` がラベルと回転の状態を持つ。
ラベルをオフにする場合は `pins=[]` を渡し、ラベル設定を `key` に含めない。
モデル再マウントによる視点のリセットを避けるためである。
`AtlasModel` の `autoRotate` は省略時オフ。系統別ビューアのみ初期状態でオンにする。

詳細画面は `AtlasDetail` を共用する。
通常表示と詳細画面のラベル設定は独立しており、詳細画面は開くたびにオンになる。
同じ詳細画面内では部位を切り替えても設定を保つ。設定の永続保存は行わない。
選択後も系統全体のGLBと3Dピンを維持し、該当する名前付きマテリアルだけを強調色にする。
別の部位を選ぶと、直前のマテリアルは元の色へ戻す。

既存の `AtlasSectionButton` と教育リンクは継続して接続する。MRIは `showMri` の指定に従う。
CSSは系統別ビューア・系統切替の専用クラスへ限定し、全体像や視点操作へ意図せず影響させない。
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
- 脳／脳幹・頭蓋骨／頸椎を往復でき、切替後の部位一覧・解説が系統に一致する。
- 系統切替の前後でラベル・回転のチェック状態を保ち、キーボードでも系統を選べる。
- ラベル非表示でも部位一覧から選択部位を強調し、日英解説を開ける。
- 詳細画面でもラベルを切り替え、選択後に系統全体が維持される。
- 同じ系統の全部位が一覧内のスクロールなしで表示される。
- Escape・閉じる・背景クリックとフォーカス復帰が機能する。
- MRIが通常画面に表示されず、画像リクエストも発生しない。明示的な再表示時はスライス操作を確認する。
- 教育リンクを維持している。
- コンソールに新しいエラーがない。

## 6. 手順書・変更履歴を更新する

適用済み系統をこの文書の表へ追記し、`docs/anatomy-atlas.md` から参照できる状態にする。
Markdownを整形・Lintし、差分にローカル絶対パスがないことを確認する。
コミットする場合は `.claude/rules/tdd-mandatory-cycle.md` に従い、テスト・実装・文書を分離し、
必要な全体検証を通す。新しい外部依存やCSP許可先が必要になった場合はユーザー確認を取る。

## 次回の作業依頼テンプレート

```text
docs/anatomy-section-migration.md に従って、/anatomy の［対象欄］を
頭頸部の全体像と共通の3Dモデル・操作へ移行する。
既存の自動回転を維持し、3Dラベルの表示・非表示をチェックボックスで切り替える。
MRI・教育リンク・部位解説を保持し、モデルとラベル座標はアトラスの組を使う。
ページへの接続を含む失敗テストを先に確認し、実装後に全体検証を行う。
PC・モバイルの実描画を確認し、この手順書の適用状況を更新する。
```

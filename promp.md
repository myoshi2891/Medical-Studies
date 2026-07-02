最終的に作ろうとしているものは、

> **「頭痛に関する医学教材用の3Dアセットデータベース」**

なので、最初にマスター表を作ることが成功の鍵になります。

---

# BodyParts3D解析プロンプト（完全版）

```text
あなたは世界トップクラスのPythonエンジニア・医学CGエンジニア・BodyParts3D解析の専門家です。

# 目的

BodyParts3D v4.0 のOBJデータから、
頭痛の3D教材制作で利用するためのマスター表を作成してください。

このマスター表は今後BlenderやThree.jsで利用する基礎データになります。

## ディレクトリ構成

project/

    partof_BP3D_4.0_obj_99/
        FJ0001.obj
        FJ0002.obj
        ...
        FJ3659.obj

    isa_BP3D_4.0_obj_99/
        FJ0001.obj
        ...

    *.txt
    *.csv
    README*

OBJ以外に存在するtxt/csvは
BodyParts3D公式の対応表・Ontology・Mapping情報である。

必ずそれらを解析して利用すること。

---

# やってほしいこと

BodyParts3D内の全OBJについて

OBJ番号

↓

人体名称

↓

日本語名

↓

カテゴリ

↓

頭痛との関連

↓

Blender Collection

まで自動で整理してください。

---

# 出力してほしいCSV

master_bodyparts.csv

列は以下とする。

|列名|内容|
|------|------|
|OBJ File|FJ3659.obj|
|OBJ ID|FJ3659|
|English Name|Skull|
|Japanese Name|頭蓋骨|
|FMA ID|FMAxxxxx|
|Category|Bone / Muscle / Nerve / Vessel / Brain / Organ / Ligament / Other|
|Region|Head / Neck / Shoulder / Thorax / Upper Limb / Lower Limb|
|Headache Importance|★★★★★〜★☆☆☆☆|
|Headache Type|Migraine / Tension / Cervicogenic / Cluster / Multiple / None|
|Recommended Blender Collection|Bones / Muscles / Nerves / Brain / BloodVessels / Others|
|Description|簡潔な説明|

---

# さらに作成するCSV

headache_parts.csv

これは頭痛に関係する部位だけ抽出する。

対象例

Skull

Mandible

Occipital Bone

Temporal Bone

Atlas

Axis

C3〜C7

Brain

Brainstem

Cerebellum

Pituitary

Meninges

Trigeminal nerve

Greater occipital nerve

Lesser occipital nerve

Accessory nerve

Facial nerve

Vagus nerve

Vertebral artery

Basilar artery

Internal carotid artery

External carotid artery

Jugular vein

Trapezius

Sternocleidomastoid

Levator scapulae

Splenius capitis

Semispinalis capitis

Rectus capitis posterior major

Rectus capitis posterior minor

Obliquus capitis superior

Obliquus capitis inferior

Longus capitis

Longus colli

Scalenes

Suboccipital muscles

---

# Blender用CSVも生成

blender_collection.csv

例

Bones
    Skull
    C1
    C2
    C3

Muscles
    Trapezius
    SCM
    Levator Scapulae

Nerves
    Trigeminal
    Greater Occipital

BloodVessels
    Vertebral Artery

Brain
    Brain
    Cerebellum

---

# OBJ抽出用CSV

extract_list.csv

OBJ File

だけ並べる。

例

FJ3659.obj
FJ3632.obj
FJ3610.obj

---

# Pythonも生成

extract_headache_parts.py

このPythonは

master_bodyparts.csv

を読み込み

extract_list.csv

を利用して

extract/

以下へOBJをコピーする。

完成後

extract/

    Bones/

    Muscles/

    Nerves/

    Brain/

    BloodVessels/

という構成になるようにする。

---

# Blender用

さらに

Blender Python

(import_headache_parts.py)

も生成してください。

実行すると

・OBJを読み込む
・Collectionを自動作成
・Collectionへ自動分類
・名前変更
・原点合わせ
・法線修正
・Auto Smooth
・マテリアル色分け

まで自動化してください。

色

Bone
白

Muscle
赤

Nerve
黄色

Blood Vessel
青

Brain
薄ピンク

Ligament
緑

---

# 品質

医学英語名は
BodyParts3Dの名称を優先。

日本語名は一般的医学用語を使用。

FMA情報があれば利用。

頭痛との関連度は

★★★★★
★★★★☆
★★★☆☆
★★☆☆☆
★☆☆☆☆

で評価してください。

Descriptionは医学的に簡潔に。

---

# 最終成果物

master_bodyparts.csv

headache_parts.csv

blender_collection.csv

extract_list.csv

extract_headache_parts.py

import_headache_parts.py

README.md

---

コードは保守性を重視し、

Python 3.12

型ヒントあり

コメント充実

関数分割

例外処理

ログ出力

で実装してください。
```

---

## さらにおすすめしたい「上位版」

このプロンプトをさらに発展させるなら、**OBJファイルを実際に解析して自動判定**させます。

例えば以下の項目も追加すると、品質が大幅に向上します。

```text
追加要件

・各OBJの頂点数
・面数
・Bounding Box
・体積
・重心
・左右判定
・メッシュの健全性
・OBJプレビュー画像(PNG)
・glTF変換
・LOD(Level of Detail)生成
```

最終的には次のようなマスター表になります。

| OBJ        | 英語名   | 日本語 | カテゴリ | 頭痛関連  | Collection |    頂点数 |  ポリゴン数 | Bounding Box  | プレビュー |
| ---------- | ----- | --- | ---- | ----- | ---------- | -----: | -----: | ------------- | ----- |
| FJ3659.obj | Skull | 頭蓋骨 | Bone | ★★★★★ | Bones      | 18,432 | 36,512 | 120×150×180mm | ✓     |

このレベルまで作っておけば、今後は**「片頭痛モデル」「緊張型頭痛モデル」「頚椎性頭痛モデル」**などを数分で組み立てられる、再利用性の高い3Dアセット基盤になります。

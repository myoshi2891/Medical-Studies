/** 頭頸部の学習用データ。モデルの対象は pattern で元OBJ名と照合する。 */
export interface BilingualText {
  ja: string;
  en: string;
}
export interface AtlasLayer {
  id: string;
  ja: string;
  en: string;
  color: string;
  opacity: number;
  summary: BilingualText;
}
export interface AtlasPart {
  id: string;
  layer: string;
  ja: string;
  en: string;
  pattern: string;
  description: BilingualText;
  clinical: BilingualText;
  sources: string[];
}
export const ATLAS_LAYERS: AtlasLayer[] = [
  {
    id: "nerves",
    ja: "神経",
    en: "Nerves",
    color: "#ebbd36",
    opacity: 1,
    summary: {
      ja: "眼窩の神経を中心に、感覚と眼球運動の経路を確認します。",
      en: "Explore orbital sensory and motor pathways.",
    },
  },
  {
    id: "vessels",
    ja: "血管",
    en: "Vessels",
    color: "#e75c70",
    opacity: 1,
    summary: {
      ja: "脳への動脈供給と内頸静脈への還流を確認します。",
      en: "Follow arterial supply and internal jugular venous drainage.",
    },
  },
  {
    id: "brain",
    ja: "脳",
    en: "Brain",
    color: "#e6a6bd",
    opacity: 0.28,
    summary: {
      ja: "大脳の表面・白質、小脳、間脳と下垂体の位置関係を確認します。",
      en: "Explore cerebral surfaces, white matter, cerebellum and deep structures.",
    },
  },
  {
    id: "brainstem",
    ja: "脳幹",
    en: "Brainstem",
    color: "#bc91ed",
    opacity: 1,
    summary: {
      ja: "中脳・橋・延髄を分けて、脳と脊髄をつなぐ領域を確認します。",
      en: "Inspect the midbrain, pons and medulla separately.",
    },
  },
  {
    id: "skull",
    ja: "頭蓋骨",
    en: "Skull",
    color: "#d9d4bc",
    opacity: 0.18,
    summary: {
      ja: "脳を囲む頭蓋と顔面の骨を確認します。",
      en: "Explore the cranial enclosure and facial skeleton.",
    },
  },
  {
    id: "cervical",
    ja: "頸椎",
    en: "Cervical spine",
    color: "#8bc6d7",
    opacity: 1,
    summary: {
      ja: "環椎から第7頸椎まで、頭部を支える骨を確認します。",
      en: "Inspect C1 through C7, supporting the head and protecting the cord.",
    },
  },
  {
    id: "muscles",
    ja: "筋",
    en: "Muscles",
    color: "#c97c65",
    opacity: 0.35,
    summary: {
      ja: "浅層の大きな筋から後頭下の深層筋まで確認します。",
      en: "Explore superficial neck muscles and deep suboccipital muscles.",
    },
  },
];
export const ATLAS_PARTS: AtlasPart[] = [
  {
    id: "ophthalmic",
    layer: "nerves",
    ja: "眼神経（V1）",
    en: "Ophthalmic nerve (V1)",
    pattern: "ophthalmic nerve",
    description: {
      ja: "三叉神経の第1枝で、上眼窩裂を通って眼窩に入り、額・上眼瞼・角膜などの感覚を伝えます。運動線維を持たない感覚枝です。",
      en: "The first trigeminal division enters the orbit through the superior orbital fissure and carries sensation from the forehead, upper eyelid and cornea. It is a sensory division.",
    },
    clinical: {
      ja: "眼窩・前頭部の感覚分布を理解する目印です。三叉神経本幹や髄膜枝はこのモデルには含まれません。",
      en: "Use this structure to orient forehead and orbital sensation. The trigeminal trunk and meningeal branches are not included in this model.",
    },
    sources: [
      "https://www.ncbi.nlm.nih.gov/books/NBK470353/",
      "https://www.ncbi.nlm.nih.gov/books/NBK549919/",
    ],
  },
  {
    id: "frontal-nerve",
    layer: "nerves",
    ja: "前頭神経・眼窩上神経",
    en: "Frontal and supraorbital nerves",
    pattern: "frontal nerve|supra-orbital nerve|supratrochlear nerve",
    description: {
      ja: "前頭神経は眼神経の枝で、眼窩上神経と滑車上神経へ分かれます。眼窩上縁を越えて額と前頭部の頭皮へ広がる感覚神経です。",
      en: "The frontal nerve branches from V1 into the supraorbital and supratrochlear nerves. These sensory branches pass beyond the superior orbital margin toward the forehead and scalp.",
    },
    clinical: {
      ja: "前頭部の感覚と末梢神経の走行を対応させます。モデルは穿刺位置や深さの決定には用いません。",
      en: "These branches help relate frontal sensation to peripheral nerve anatomy. Their displayed paths do not determine injection sites or depth.",
    },
    sources: [
      "https://www.ncbi.nlm.nih.gov/books/NBK470353/",
      "https://www.ncbi.nlm.nih.gov/books/NBK549919/",
    ],
  },
  {
    id: "nasociliary",
    layer: "nerves",
    ja: "鼻毛様体神経と関連枝",
    en: "Nasociliary nerve and related branches",
    pattern: "nasociliary|ethmoidal nerve|infratrochlear|long ciliary|ciliary ganglion",
    description: {
      ja: "鼻毛様体神経は眼神経の枝で、眼窩内を走り角膜・眼球・鼻腔の一部の感覚に関与します。関連する毛様体神経節と眼窩内の細い枝も表示します。",
      en: "The nasociliary branch of V1 supplies sensory pathways to the cornea, globe and parts of the nasal cavity. The view also includes associated fine orbital branches and the ciliary ganglion.",
    },
    clinical: {
      ja: "角膜反射の求心路を理解するための解剖です。毛様体神経節は副交感性神経節であり、感覚神経節ではありません。",
      en: "This anatomy helps locate the afferent pathway of the corneal reflex. The ciliary ganglion is parasympathetic, not a sensory ganglion.",
    },
    sources: [
      "https://www.ncbi.nlm.nih.gov/books/NBK470353/",
      "https://www.ncbi.nlm.nih.gov/books/NBK549919/",
    ],
  },
  {
    id: "lacrimal",
    layer: "nerves",
    ja: "涙腺神経",
    en: "Lacrimal nerve",
    pattern: "lacrimal nerve",
    description: {
      ja: "眼神経から分かれ、眼窩の外側壁に沿って涙腺と上眼瞼外側へ向かいます。感覚線維に加え、他の経路から合流した涙液分泌に関わる線維が伴走します。",
      en: "The lacrimal nerve follows the lateral orbit toward the lacrimal gland and lateral upper eyelid. It carries sensation and receives communicating secretomotor fibers from another pathway.",
    },
    clinical: {
      ja: "眼周囲の感覚と自律神経の交通を考える目印です。涙液分泌の全経路を表示したものではありません。",
      en: "This branch illustrates sensory and autonomic connections around the eye; the full lacrimal secretomotor pathway is not modeled.",
    },
    sources: [
      "https://www.ncbi.nlm.nih.gov/books/NBK470353/",
      "https://www.ncbi.nlm.nih.gov/books/NBK549919/",
    ],
  },
  {
    id: "optic",
    layer: "nerves",
    ja: "視神経（II）",
    en: "Optic nerve (II)",
    pattern: "optic nerve",
    description: {
      ja: "網膜の情報を中枢へ伝える第II脳神経で、眼球後方から視神経管を通って視交叉へ向かいます。三叉神経の感覚枝とは働きも経路も異なります。",
      en: "Cranial nerve II carries retinal information toward the brain, passing behind the globe through the optic canal toward the chiasm. Its visual function differs from trigeminal sensation.",
    },
    clinical: {
      ja: "眼窩内の神経の位置関係を比較します。視神経そのものが顔面の痛覚を伝えるわけではありません。",
      en: "Compare its orbital position with neighboring nerves. The optic nerve does not carry facial pain sensation.",
    },
    sources: [
      "https://www.ncbi.nlm.nih.gov/books/NBK470353/",
      "https://www.ncbi.nlm.nih.gov/books/NBK549919/",
    ],
  },
  {
    id: "oculomotor",
    layer: "nerves",
    ja: "動眼神経（III）の眼窩内枝",
    en: "Orbital branches of the oculomotor nerve (III)",
    pattern: "oculomotor nerve",
    description: {
      ja: "動眼神経は多くの外眼筋と上眼瞼挙筋を支配し、副交感線維は縮瞳・調節に関与します。ここでは眼窩内の上枝と下枝を表示しています。",
      en: "The oculomotor nerve supplies most extraocular muscles and the levator of the upper eyelid. Its parasympathetic fibers support constriction and accommodation; the model shows its orbital divisions.",
    },
    clinical: {
      ja: "眼球運動神経と感覚神経を区別して観察します。脳幹から眼窩までの全長は収録されていません。",
      en: "Distinguish these motor branches from sensory nerves. The complete path from the brainstem to the orbit is not represented.",
    },
    sources: [
      "https://www.ncbi.nlm.nih.gov/books/NBK470353/",
      "https://www.ncbi.nlm.nih.gov/books/NBK549919/",
    ],
  },
  {
    id: "trochlear",
    layer: "nerves",
    ja: "滑車神経（IV）",
    en: "Trochlear nerve (IV)",
    pattern: "(Left|Right) trochlear nerve$",
    description: {
      ja: "滑車神経は上斜筋を支配する第IV脳神経です。中脳背側から出て眼窩へ向かう細い神経で、この表示は元データに収録された部分です。",
      en: "Cranial nerve IV supplies the superior oblique muscle. It is a slender nerve originating dorsally from the midbrain; the displayed geometry covers the segment available in the source dataset.",
    },
    clinical: {
      ja: "複雑な眼窩内の経路を把握する目印です。複視などの症状をこの模型だけで判断することはできません。",
      en: "Use its course as an orbital landmark. The model alone cannot establish the cause of diplopia or other symptoms.",
    },
    sources: [
      "https://www.ncbi.nlm.nih.gov/books/NBK470353/",
      "https://www.ncbi.nlm.nih.gov/books/NBK549919/",
    ],
  },
  {
    id: "carotid",
    layer: "vessels",
    ja: "内頸動脈",
    en: "Internal carotid arteries",
    pattern: "internal carotid artery",
    description: {
      ja: "左右の内頸動脈は頭蓋底へ入り、大脳への前方循環を担います。頭蓋内で前大脳動脈・中大脳動脈などへ続き、後方循環と連絡します。",
      en: "The internal carotid arteries enter the skull base and provide the anterior cerebral circulation, continuing into major cerebral branches and communicating with posterior circulation.",
    },
    clinical: {
      ja: "頸部から頭蓋内へ血管が続く位置関係を確認します。血管径や蛇行には個人差があり、病変は表示していません。",
      en: "Follow the transition from neck to cranial circulation. Vessel caliber and curvature vary between individuals; no vascular pathology is depicted.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/20-5-circulatory-pathways",
    ],
  },
  {
    id: "vertebral",
    layer: "vessels",
    ja: "椎骨動脈",
    en: "Vertebral arteries",
    pattern: "vertebral artery",
    description: {
      ja: "左右の椎骨動脈は頸椎の横突孔を上行し、環椎付近を回って大後頭孔から頭蓋内へ入ります。延髄の前方で合流して脳底動脈になります。",
      en: "The paired vertebral arteries ascend through cervical transverse foramina, curve near the atlas and enter through the foramen magnum. They unite anterior to the medulla to form the basilar artery.",
    },
    clinical: {
      ja: "上位頸椎と血管の近接関係が重要です。頸部の運動や施術の安全性をこのモデルから判断してはいけません。",
      en: "Their proximity to the upper cervical spine is clinically important. This model cannot determine the safety of neck movement or manipulation.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/20-5-circulatory-pathways",
    ],
  },
  {
    id: "basilar",
    layer: "vessels",
    ja: "脳底動脈",
    en: "Basilar artery",
    pattern: "^Basilar artery$",
    description: {
      ja: "左右の椎骨動脈が合流してできる動脈で、橋の腹側に沿って上行します。脳幹・小脳への枝を出し、上端で左右の後大脳動脈へ分かれます。",
      en: "Formed by the vertebral arteries, the basilar artery ascends on the ventral surface of the pons. It gives brainstem and cerebellar branches before dividing into posterior cerebral arteries.",
    },
    clinical: {
      ja: "橋の前面と動脈の位置を比較します。表示されない細い穿通枝も実際の脳幹灌流に関与します。",
      en: "Compare the artery with the anterior pons. Small perforating branches absent from the model also contribute to brainstem perfusion.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/20-5-circulatory-pathways",
    ],
  },
  {
    id: "cerebral-arteries",
    layer: "vessels",
    ja: "大脳動脈群",
    en: "Cerebral arteries",
    pattern: "cerebral artery",
    description: {
      ja: "前・中・後大脳動脈と収録された枝をまとめて表示します。前・中大脳動脈は主に内頸動脈系、後大脳動脈は主に脳底動脈系から血液を受けます。",
      en: "This group contains anterior, middle and posterior cerebral arteries and available branches. Anterior and middle arteries arise from carotid circulation, while posterior arteries usually arise from the basilar system.",
    },
    clinical: {
      ja: "大脳表面に広がる血管を観察します。全ての交通動脈や末梢枝を含む完全なWillis動脈輪の模型ではありません。",
      en: "Observe the vessels distributed over the cerebrum. The model does not include every communicating artery or distal branch of a complete circle of Willis.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/20-5-circulatory-pathways",
    ],
  },
  {
    id: "pica",
    layer: "vessels",
    ja: "後下小脳動脈",
    en: "Posterior inferior cerebellar arteries",
    pattern: "posterior inferior cerebellar artery",
    description: {
      ja: "通常は椎骨動脈から分かれ、延髄の周囲を走り、小脳下面や延髄の一部に血液を送ります。左右の走行や分枝は個人差の大きい領域です。",
      en: "Usually arising from the vertebral artery, PICA courses around the medulla and supplies inferior cerebellar and medullary territories. Its course and branching are variable.",
    },
    clinical: {
      ja: "延髄・小脳・椎骨動脈の立体関係を観察します。表示された分枝は一例であり、灌流域の境界ではありません。",
      en: "Inspect its relationship to the medulla, cerebellum and vertebral artery. The displayed branches are a reference example, not perfusion boundaries.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/20-5-circulatory-pathways",
    ],
  },
  {
    id: "jugular",
    layer: "vessels",
    ja: "内頸静脈",
    en: "Internal jugular veins",
    pattern: "internal jugular vein",
    description: {
      ja: "頭蓋内からの静脈血を受け、頸部を下行する大きな静脈です。頸部では頸動脈や迷走神経と近接して走行し、胸郭入口へ向かいます。",
      en: "The internal jugular veins receive intracranial venous drainage and descend through the neck near the carotid arteries and vagus nerves toward the thoracic inlet.",
    },
    clinical: {
      ja: "動脈は赤系、静脈は青系で表示しています。頸動脈鞘の全内容や静脈洞はこのモデルに含まれません。",
      en: "Arteries are shown in red and these veins in blue. The complete contents of the carotid sheath and dural sinuses are not modeled.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/20-5-circulatory-pathways",
    ],
  },
  {
    id: "cerebrum",
    layer: "brain",
    ja: "大脳（表面・白質）",
    en: "Cerebrum (surface and white matter)",
    pattern:
      "White matter of .*cerebral hemisphere|^(Left|Right) .*gyrus$|^Orbital gyrus$|lobule|occipital lobe",
    description: {
      ja: "左右の大脳半球の皮質表面と白質を表示します。前頭・頭頂・側頭・後頭の各領域が感覚、運動、認知などを分担します。収録された脳回を組み合わせた表現です。",
      en: "This view combines available cortical surfaces and white matter from both hemispheres. Frontal, parietal, temporal and occipital regions contribute to movement, sensation and cognition; not every gyrus is separately modeled.",
    },
    clinical: {
      ja: "脳そのものの輪郭と周囲の血管・頭蓋骨を比較します。痛みの知覚に関わる領域と痛みの発生源は同一ではありません。",
      en: "Compare the cerebral contour with vessels and skull. Regions involved in pain perception should not be equated with the tissue generating pain.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/13-2-the-central-nervous-system",
    ],
  },
  {
    id: "cerebellum",
    layer: "brain",
    ja: "小脳",
    en: "Cerebellum",
    pattern: "^Cerebellum$",
    description: {
      ja: "小脳は脳幹の後方、後頭葉の下方に位置し、運動の協調や平衡の調節に関与します。左右の小脳半球と正中部が脳幹を囲む配置を確認できます。",
      en: "The cerebellum lies behind the brainstem and below the occipital cerebrum. It contributes to coordinated movement and balance; its hemispheres flank the midline region posterior to the brainstem.",
    },
    clinical: {
      ja: "後頭蓋窩での脳幹・後頭骨との位置関係を学びます。小脳を頭痛の単独の原因部位とみなす表示ではありません。",
      en: "Study its relationship to the brainstem and occipital bone in the posterior fossa. The display does not identify the cerebellum as a sole headache generator.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/13-2-the-central-nervous-system",
    ],
  },
  {
    id: "thalamus",
    layer: "brain",
    ja: "視床",
    en: "Thalamus",
    pattern: "(Left|Right) thalamus$",
    description: {
      ja: "間脳の左右にある灰白質の構造で、多くの感覚情報や運動に関わる情報を大脳皮質へ中継します。第3脳室の両側に位置する深部構造です。",
      en: "The thalami are paired gray-matter structures in the diencephalon, beside the third ventricle. They relay many sensory and motor-related signals to the cerebral cortex.",
    },
    clinical: {
      ja: "痛覚を含む感覚情報の中継を考える目印です。核ごとの境界や三叉神経視床路は描出していません。",
      en: "These structures orient sensory relay pathways, including pain processing. Individual nuclei and the trigeminothalamic tract are not resolved.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/13-2-the-central-nervous-system",
    ],
  },
  {
    id: "hypothalamus",
    layer: "brain",
    ja: "視床下部",
    en: "Hypothalamus",
    pattern: "^Hypothalamus$",
    description: {
      ja: "視床の下方で第3脳室の底部を囲む領域です。体温・睡眠覚醒・自律神経・内分泌などの恒常性維持に関わり、下垂体と密接に連絡します。",
      en: "The hypothalamus lies below the thalamus around the floor of the third ventricle. It regulates homeostatic processes including temperature, sleep-wake rhythms, autonomic activity and endocrine signaling.",
    },
    clinical: {
      ja: "睡眠や自律神経と頭痛の関係を学ぶための位置の目印です。個別の核や機能活動は表示していません。",
      en: "Use it to orient discussions of sleep, autonomic function and headache. Individual nuclei and functional activity are not displayed.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/13-2-the-central-nervous-system",
    ],
  },
  {
    id: "pituitary",
    layer: "brain",
    ja: "下垂体",
    en: "Pituitary gland",
    pattern: "^Pituitary gland$",
    description: {
      ja: "下垂体は蝶形骨のトルコ鞍に収まり、視床下部と下垂体茎でつながります。前葉と後葉は異なる仕組みでホルモン調節に関与します。",
      en: "The pituitary sits in the sella turcica of the sphenoid and connects to the hypothalamus through its stalk. Its anterior and posterior portions participate in endocrine regulation through different mechanisms.",
    },
    clinical: {
      ja: "蝶形骨や視神経系に近い位置を確認します。下垂体の病変やホルモン異常を示すモデルではありません。",
      en: "Inspect its proximity to the sphenoid and visual pathways. This model does not show pituitary disease or hormone abnormalities.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/13-2-the-central-nervous-system",
    ],
  },
  {
    id: "midbrain",
    layer: "brainstem",
    ja: "中脳",
    en: "Midbrain",
    pattern: "^Midbrain$|Peduncle of midbrain",
    description: {
      ja: "脳幹の最上部で、間脳と橋の間に位置します。大脳脚などの伝導路や眼球運動に関わる核を含み、背側には視覚・聴覚反射に関わる領域があります。",
      en: "The midbrain is the upper brainstem between the diencephalon and pons. It contains major tracts, ocular motor nuclei and dorsal regions involved in visual and auditory reflexes.",
    },
    clinical: {
      ja: "痛みの調節に関わる中脳水道周囲灰白質はこの外形モデルでは個別に示していません。位置と機能を区別して学びます。",
      en: "The periaqueductal gray involved in pain modulation is not individually resolved in this surface model. Separate regional anatomy from specific functional nuclei.",
    },
    sources: ["https://www.ncbi.nlm.nih.gov/books/NBK544297/"],
  },
  {
    id: "pons",
    layer: "brainstem",
    ja: "橋",
    en: "Pons",
    pattern: "^Pons$",
    description: {
      ja: "中脳と延髄の間にある膨らんだ脳幹の部分です。小脳との連絡や上行・下行路が通り、顔面の感覚や運動などに関わる脳神経核を含みます。",
      en: "The pons is the expanded brainstem segment between midbrain and medulla. It carries ascending and descending pathways, cerebellar connections and cranial nerve nuclei involved in facial functions.",
    },
    clinical: {
      ja: "橋の腹側を脳底動脈が走ります。三叉神経核などの内部構造は、この表面モデルから直接観察できません。",
      en: "The basilar artery runs along its ventral surface. Internal structures such as trigeminal nuclei cannot be directly inspected in this surface model.",
    },
    sources: ["https://www.ncbi.nlm.nih.gov/books/NBK544297/"],
  },
  {
    id: "medulla",
    layer: "brainstem",
    ja: "延髄",
    en: "Medulla oblongata",
    pattern: "^Medulla oblongata$",
    description: {
      ja: "橋の下方で脊髄へ移行する脳幹の最下部です。呼吸・循環などの調節に関わる領域と、感覚・運動の伝導路、複数の脳神経核を含みます。",
      en: "The medulla is the lowest brainstem segment, continuing from the pons into the spinal cord. It contains autonomic regulatory regions, sensory and motor pathways, and several cranial nerve nuclei.",
    },
    clinical: {
      ja: "三叉頸椎複合体は尾側の三叉神経脊髄路核と上位頸髄の機能的な連続領域です。延髄全体と同一ではなく、この模型では境界を示していません。",
      en: "The trigeminocervical complex spans the caudal spinal trigeminal nucleus and upper cervical dorsal horn. It is not the entire medulla and its boundaries are not delineated here.",
    },
    sources: ["https://www.ncbi.nlm.nih.gov/books/NBK544297/"],
  },
  {
    id: "frontal-bone",
    layer: "skull",
    ja: "前頭骨",
    en: "Frontal bone",
    pattern: "^Frontal bone$",
    description: {
      ja: "額と眼窩上壁をつくる骨で、前頭蓋窩の一部を構成します。左右の頭頂骨や蝶形骨などと接し、前方から大脳を保護します。",
      en: "The frontal bone forms the forehead, orbital roofs and part of the anterior cranial fossa. It articulates with neighboring cranial bones and protects the anterior cerebrum.",
    },
    clinical: {
      ja: "眼窩上縁と額の神経との関係を確認します。骨表面だけから副鼻腔や神経孔の全容を判断することはできません。",
      en: "Compare the superior orbital margin with forehead nerves. The bone surface alone does not define all sinus spaces or neural foramina.",
    },
    sources: ["https://www.ncbi.nlm.nih.gov/books/NBK499834/"],
  },
  {
    id: "parietal",
    layer: "skull",
    ja: "頭頂骨",
    en: "Parietal bones",
    pattern: "parietal bone",
    description: {
      ja: "左右の頭頂骨は頭蓋の上面と側面の大部分をつくり、正中で矢状縫合を形成します。前方の前頭骨と後方の後頭骨の間に位置します。",
      en: "The paired parietal bones form much of the cranial roof and sides, meeting at the sagittal suture. They lie between the frontal and occipital bones.",
    },
    clinical: {
      ja: "頭頂部で脳を覆う骨の配置を確認します。頭痛の位置と直下の骨や脳の病変は一対一には対応しません。",
      en: "Observe the cranial roof over the brain. The location of headache does not map one-to-one to an underlying bone or brain lesion.",
    },
    sources: ["https://www.ncbi.nlm.nih.gov/books/NBK499834/"],
  },
  {
    id: "temporal",
    layer: "skull",
    ja: "側頭骨",
    en: "Temporal bones",
    pattern: "temporal bone",
    description: {
      ja: "頭蓋の側面と底部をつくり、内耳などを収める骨です。下顎骨と顎関節を形成し、乳様突起などが頸部の筋の付着部になります。",
      en: "The temporal bones form parts of the lateral skull and skull base and house the inner ear. They articulate with the mandible, while processes provide neck muscle attachments.",
    },
    clinical: {
      ja: "顎関節周辺と胸鎖乳突筋の付着部の位置関係を確認します。関節円板や内耳の微細構造は表示していません。",
      en: "Inspect the temporomandibular region and sternocleidomastoid attachment. The articular disc and fine inner-ear structures are not included.",
    },
    sources: ["https://www.ncbi.nlm.nih.gov/books/NBK499834/"],
  },
  {
    id: "occipital",
    layer: "skull",
    ja: "後頭骨",
    en: "Occipital bone",
    pattern: "^Occipital bone$",
    description: {
      ja: "頭蓋の後下部をつくり、大後頭孔を囲む骨です。後頭顆で環椎と関節をつくり、後面には後頭下筋など頭頸部の筋が付着します。",
      en: "The occipital bone forms the posteroinferior skull around the foramen magnum. Its condyles articulate with the atlas, and its posterior surface anchors head and neck muscles.",
    },
    clinical: {
      ja: "後頭骨・環椎・後頭下筋の近接関係を学びます。大後頭神経の走行そのものは本モデルでは表示していません。",
      en: "Study the relationship of occiput, atlas and suboccipital muscles. The greater occipital nerve itself is not represented.",
    },
    sources: ["https://www.ncbi.nlm.nih.gov/books/NBK499834/"],
  },
  {
    id: "sphenoid",
    layer: "skull",
    ja: "蝶形骨",
    en: "Sphenoid bone",
    pattern: "^Sphenoid bone$",
    description: {
      ja: "頭蓋底中央にある複雑な形の骨で、眼窩の一部をつくります。中央のトルコ鞍に下垂体を収め、周囲には神経や血管が通る孔や裂があります。",
      en: "The sphenoid is a complex central skull-base bone contributing to the orbit. Its sella houses the pituitary, while nearby openings transmit cranial nerves and vessels.",
    },
    clinical: {
      ja: "下垂体・眼窩内神経・内頸動脈と骨の関係を確認します。全ての孔の内容物を収録したモデルではありません。",
      en: "Compare bone with pituitary, orbital nerves and carotid arteries. Not all structures passing through its openings are modeled.",
    },
    sources: ["https://www.ncbi.nlm.nih.gov/books/NBK499834/"],
  },
  {
    id: "mandible",
    layer: "skull",
    ja: "下顎骨",
    en: "Mandible",
    pattern: "^Mandible$",
    description: {
      ja: "下顎をつくる骨で、左右の下顎頭が側頭骨と関節を形成します。歯列を支え、咀嚼筋の力を受けて口の開閉や前後・左右の運動を行います。",
      en: "The mandible supports the lower dentition and articulates with both temporal bones. Masticatory muscles move it during opening, closing, protrusion and lateral excursion.",
    },
    clinical: {
      ja: "顎関節領域と頭蓋の関係を確認します。咀嚼筋や関節円板の全てを表示しているわけではありません。",
      en: "Observe its relationship to the temporomandibular region. The complete masticatory musculature and articular discs are not shown.",
    },
    sources: ["https://www.ncbi.nlm.nih.gov/books/NBK499834/"],
  },
  {
    id: "face-bones",
    layer: "skull",
    ja: "顔面骨・篩骨",
    en: "Facial bones and ethmoid",
    pattern: "maxilla|zygomatic bone|nasal bone|^Ethmoid$",
    description: {
      ja: "上顎骨・頬骨・鼻骨・篩骨を表示します。眼窩や鼻腔の壁をつくる骨が、神経や血管の周囲で頭蓋前方の立体的な枠組みを形成します。",
      en: "The maxillae, zygomatic and nasal bones, and ethmoid form parts of the orbits and nasal cavity. Together they define an anterior bony framework around nerves and vessels.",
    },
    clinical: {
      ja: "眼窩の位置を神経や前頭骨と比較するための骨格です。副鼻腔の粘膜や病変は描出していません。",
      en: "Use this framework to locate the orbits relative to nerves and frontal bone. Sinus mucosa and sinus disease are not depicted.",
    },
    sources: ["https://www.ncbi.nlm.nih.gov/books/NBK499834/"],
  },
  {
    id: "atlas-c1",
    layer: "cervical",
    ja: "環椎（C1）",
    en: "Atlas (C1)",
    pattern: "^Atlas$",
    description: {
      ja: "第1頸椎は輪状の骨で、椎体を持ちません。上面で後頭顆を支え、下面で軸椎と関節をつくり、頭部のうなずきと回旋に関与します。",
      en: "C1 is a ring-shaped vertebra without a vertebral body. It supports the occipital condyles and articulates with the axis, participating in nodding and head rotation.",
    },
    clinical: {
      ja: "後頭骨と軸椎の間にある配置を確認します。環椎横靱帯などの靱帯は表示されていません。",
      en: "Inspect its position between occiput and axis. Stabilizing ligaments, including the transverse ligament, are not shown.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column",
    ],
  },
  {
    id: "axis-c2",
    layer: "cervical",
    ja: "軸椎（C2）",
    en: "Axis (C2)",
    pattern: "^Axis$",
    description: {
      ja: "第2頸椎は上方へ突出する歯突起を持ち、環椎がその周囲を回ることで頭部の回旋を支えます。棘突起には深部の頸筋が付着します。",
      en: "C2 carries the upward-projecting dens around which the atlas rotates. Its posterior processes provide attachments for deep neck muscles involved in head control.",
    },
    clinical: {
      ja: "上位頸椎と後頭下筋の関係を確認します。関節の可動域や不安定性を評価する動的モデルではありません。",
      en: "Inspect upper cervical and suboccipital relationships. This is not a dynamic model for assessing range of motion or instability.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column",
    ],
  },
  {
    id: "c3",
    layer: "cervical",
    ja: "第3頸椎（C3）",
    en: "Cervical vertebra C3",
    pattern: "^Third cervical vertebra$",
    description: {
      ja: "第3頸椎は頸椎列の一部として頭部を支え、椎孔を通る脊髄を囲みます。隣接椎との関節や椎間板を介して頸部の屈伸・回旋を分担します。",
      en: "C3 supports the cervical column and surrounds the vertebral canal. Its articulations and intervening discs contribute to distributed neck motion and load transfer.",
    },
    clinical: {
      ja: "椎骨ごとの形と配列を確認します。椎間板・神経根・靱帯は含まれず、この骨形状だけで症状や原因を判断できません。",
      en: "Compare vertebral shape and alignment. Discs, nerve roots and ligaments are absent; bone geometry alone cannot identify the cause of symptoms.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column",
    ],
  },
  {
    id: "c4",
    layer: "cervical",
    ja: "第4頸椎（C4）",
    en: "Cervical vertebra C4",
    pattern: "^Fourth cervical vertebra$",
    description: {
      ja: "第4頸椎は頸椎列の一部として頭部を支え、椎孔を通る脊髄を囲みます。隣接椎との関節や椎間板を介して頸部の屈伸・回旋を分担します。",
      en: "C4 supports the cervical column and surrounds the vertebral canal. Its articulations and intervening discs contribute to distributed neck motion and load transfer.",
    },
    clinical: {
      ja: "椎骨ごとの形と配列を確認します。椎間板・神経根・靱帯は含まれず、この骨形状だけで症状や原因を判断できません。",
      en: "Compare vertebral shape and alignment. Discs, nerve roots and ligaments are absent; bone geometry alone cannot identify the cause of symptoms.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column",
    ],
  },
  {
    id: "c5",
    layer: "cervical",
    ja: "第5頸椎（C5）",
    en: "Cervical vertebra C5",
    pattern: "^Fifth cervical vertebra$",
    description: {
      ja: "第5頸椎は頸椎列の一部として頭部を支え、椎孔を通る脊髄を囲みます。隣接椎との関節や椎間板を介して頸部の屈伸・回旋を分担します。",
      en: "C5 supports the cervical column and surrounds the vertebral canal. Its articulations and intervening discs contribute to distributed neck motion and load transfer.",
    },
    clinical: {
      ja: "椎骨ごとの形と配列を確認します。椎間板・神経根・靱帯は含まれず、この骨形状だけで症状や原因を判断できません。",
      en: "Compare vertebral shape and alignment. Discs, nerve roots and ligaments are absent; bone geometry alone cannot identify the cause of symptoms.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column",
    ],
  },
  {
    id: "c6",
    layer: "cervical",
    ja: "第6頸椎（C6）",
    en: "Cervical vertebra C6",
    pattern: "^Sixth cervical vertebra$",
    description: {
      ja: "第6頸椎は頸椎列の一部として頭部を支え、椎孔を通る脊髄を囲みます。隣接椎との関節や椎間板を介して頸部の屈伸・回旋を分担します。",
      en: "C6 supports the cervical column and surrounds the vertebral canal. Its articulations and intervening discs contribute to distributed neck motion and load transfer.",
    },
    clinical: {
      ja: "椎骨ごとの形と配列を確認します。椎間板・神経根・靱帯は含まれず、この骨形状だけで症状や原因を判断できません。",
      en: "Compare vertebral shape and alignment. Discs, nerve roots and ligaments are absent; bone geometry alone cannot identify the cause of symptoms.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column",
    ],
  },
  {
    id: "c7",
    layer: "cervical",
    ja: "第7頸椎（C7）",
    en: "Cervical vertebra C7",
    pattern: "^Seventh cervical vertebra$",
    description: {
      ja: "第7頸椎は頸椎列の一部として頭部を支え、椎孔を通る脊髄を囲みます。隣接椎との関節や椎間板を介して頸部の屈伸・回旋を分担します。",
      en: "C7 supports the cervical column and surrounds the vertebral canal. Its articulations and intervening discs contribute to distributed neck motion and load transfer.",
    },
    clinical: {
      ja: "椎骨ごとの形と配列を確認します。椎間板・神経根・靱帯は含まれず、この骨形状だけで症状や原因を判断できません。",
      en: "Compare vertebral shape and alignment. Discs, nerve roots and ligaments are absent; bone geometry alone cannot identify the cause of symptoms.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/7-3-the-vertebral-column",
    ],
  },
  {
    id: "suboccipital-muscles",
    layer: "muscles",
    ja: "後頭下筋群",
    en: "Suboccipital muscles",
    pattern: "obliquus capitis|rectus capitis posterior",
    description: {
      ja: "大・小後頭直筋と上・下頭斜筋は、後頭骨・環椎・軸椎の間にある深い筋です。頭部の伸展や回旋、姿勢の微調整に働き、主にC1後枝の支配を受けます。",
      en: "The posterior rectus and oblique suboccipital muscles connect occiput, atlas and axis. They support extension, rotation and fine postural control and are mainly supplied by the C1 dorsal ramus.",
    },
    clinical: {
      ja: "椎骨動脈や上位頸椎に近い領域です。筋の描出から圧痛点や大後頭神経の位置を推定することはできません。",
      en: "This region lies near the vertebral artery and upper cervical spine. Muscle surfaces do not establish tender points or locate the greater occipital nerve.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-3-axial-muscles-of-the-head-neck-and-back",
      "https://www.ncbi.nlm.nih.gov/books/NBK567762/",
    ],
  },
  {
    id: "scm",
    layer: "muscles",
    ja: "胸鎖乳突筋",
    en: "Sternocleidomastoid",
    pattern: "sternocleidomastoid",
    description: {
      ja: "胸骨・鎖骨から側頭骨の乳様突起へ走る頸部の表層筋です。片側では反対側への回旋と同側への側屈に、両側では頸部の姿勢調節に関与します。",
      en: "This superficial neck muscle runs from sternum and clavicle to the mastoid region. Unilateral action contributes to contralateral rotation and ipsilateral lateral flexion; bilateral action helps control neck posture.",
    },
    clinical: {
      ja: "側頸部の輪郭と深部の血管の位置を比較します。関連痛の有無はモデルだけでは判断できません。",
      en: "Compare the lateral neck contour with deeper vessels. The model cannot determine whether this muscle produces referred pain.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-3-axial-muscles-of-the-head-neck-and-back",
      "https://www.ncbi.nlm.nih.gov/books/NBK567762/",
    ],
  },
  {
    id: "trapezius",
    layer: "muscles",
    ja: "僧帽筋",
    en: "Trapezius",
    pattern: "trapezius",
    description: {
      ja: "後頭部・項部から肩甲帯と胸部背面に広がる表層筋です。上・中・下部で作用が異なり、肩甲骨の運動と頭頸部の姿勢保持を支えます。",
      en: "The trapezius spans the posterior head, neck and upper trunk to the shoulder girdle. Its regions act together in scapular movement and head and neck postural support.",
    },
    clinical: {
      ja: "筋の付着と広がりを保つため上背部まで表示します。局所的な筋緊張やトリガーポイントは描出していません。",
      en: "The upper back remains visible to preserve muscle extent and attachments. Local tension and trigger points are not depicted.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-3-axial-muscles-of-the-head-neck-and-back",
      "https://www.ncbi.nlm.nih.gov/books/NBK567762/",
    ],
  },
  {
    id: "splenius",
    layer: "muscles",
    ja: "頭板状筋・頸板状筋",
    en: "Splenius capitis and cervicis",
    pattern: "splenius",
    description: {
      ja: "頸部後面で斜め上外側に走る筋で、頭板状筋は頭蓋へ、頸板状筋は上位頸椎へ向かいます。両側で伸展、片側で同側への回旋に関与します。",
      en: "The splenius muscles run superolaterally in the posterior neck toward the skull or upper cervical vertebrae. Bilateral activity extends the region; unilateral activity assists ipsilateral rotation.",
    },
    clinical: {
      ja: "僧帽筋の深層にある頸部伸筋として観察します。筋の厚さや色は収縮・炎症の程度を示していません。",
      en: "Inspect them as neck extensors deep to trapezius. Their displayed thickness and color do not indicate contraction or inflammation.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-3-axial-muscles-of-the-head-neck-and-back",
      "https://www.ncbi.nlm.nih.gov/books/NBK567762/",
    ],
  },
  {
    id: "semispinalis",
    layer: "muscles",
    ja: "頭半棘筋・頸半棘筋",
    en: "Semispinalis capitis and cervicis",
    pattern: "semispinalis",
    description: {
      ja: "頸部後面の深層にあり、複数の椎骨を越えて上方へ走行します。頭半棘筋は後頭骨へ達し、頸部・頭部の伸展と姿勢保持に関与します。",
      en: "These deep posterior muscles span multiple vertebral levels. Semispinalis capitis reaches the occiput, contributing with cervicis to extension and postural stabilization.",
    },
    clinical: {
      ja: "後頭部に向かう深部筋の層を確認します。大後頭神経との交差部を個別に示す模型ではありません。",
      en: "Inspect the deep muscular layer approaching the occiput. Crossings with the greater occipital nerve are not individually represented.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-3-axial-muscles-of-the-head-neck-and-back",
      "https://www.ncbi.nlm.nih.gov/books/NBK567762/",
    ],
  },
  {
    id: "levator",
    layer: "muscles",
    ja: "肩甲挙筋",
    en: "Levator scapulae",
    pattern: "levator scapulae",
    description: {
      ja: "上位頸椎の横突起から肩甲骨上内側へ走る筋です。肩甲骨を挙上し、肩甲骨が固定されると頸部の側屈などにも関与します。",
      en: "The levator scapulae runs from upper cervical transverse processes to the superomedial scapula. It elevates the scapula and can assist cervical lateral flexion when the scapula is fixed.",
    },
    clinical: {
      ja: "頸椎と肩甲帯の連続性を観察します。肩こりや頭痛への寄与は個別の臨床評価が必要です。",
      en: "Observe the connection between cervical spine and shoulder girdle. Its contribution to neck discomfort or headache requires individual assessment.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-3-axial-muscles-of-the-head-neck-and-back",
      "https://www.ncbi.nlm.nih.gov/books/NBK567762/",
    ],
  },
  {
    id: "prevertebral",
    layer: "muscles",
    ja: "椎前筋群",
    en: "Prevertebral muscles",
    pattern: "longus colli|longus capitis|rectus capitis anterior|rectus capitis lateralis",
    description: {
      ja: "頸椎の前方にある頸長筋・頭長筋などを表示します。深部で頸椎や頭部の屈曲と安定化に関与し、表層の胸鎖乳突筋とは異なる層を形成します。",
      en: "This group includes longus colli, longus capitis and short anterior/lateral rectus muscles. They assist deep cervical stabilization and head or neck flexion, forming a different layer from the sternocleidomastoid.",
    },
    clinical: {
      ja: "頸椎前方の筋と血管の関係を学びます。運動療法で用いる筋機能の評価をこの静的模型で代替することはできません。",
      en: "Study anterior cervical muscles in relation to vessels. A static model cannot replace functional assessment used in exercise therapy.",
    },
    sources: [
      "https://openstax.org/books/anatomy-and-physiology-2e/pages/11-3-axial-muscles-of-the-head-neck-and-back",
      "https://www.ncbi.nlm.nih.gov/books/NBK567762/",
    ],
  },
];

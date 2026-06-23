import { redirect } from "next/navigation";

// ルートは現状 prom-checker アプリへ誘導する（将来 Types-of-headache ページ追加時に変更）。
export default function Home() {
  redirect("/prom-checker");
}

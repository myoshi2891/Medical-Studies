import { PromApp } from "@/components/prom/PromApp";

// Server Component。クライアント完結の PromApp を描画するだけ（元 index.html の Shell を内包）。
export default function PromCheckerPage() {
  return <PromApp />;
}

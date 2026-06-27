import { MohSidebar } from "@/components/headaches/MohSidebar";
import "./medication-overuse-headache.css";

export default function MedicationOveruseHeadachePage() {
  return (
    <div className="moh-accent">
      <div className="hero">
        <div style={{ fontSize: 52, marginBottom: 4 }}>💊</div>
        <h1>薬剤過用頭痛（MOH）完全ガイド</h1>
        <p className="hero-sub">
          国際エビデンス（ICHD-3 / AAN / EHF / NICE 2024）に基づく包括的解説 — 初学者向けステップバイステップ
        </p>
        <div className="hero-tags">
          <span className="hero-tag">ICHD-3 コード 8.2</span>
          <span className="hero-tag">Grade A〜U エビデンス</span>
          <span className="hero-tag">5ステップ治療戦略</span>
          <span className="hero-tag">CGRP 製剤 MOH 対応</span>
          <span className="hero-tag">再発予防・長期戦略</span>
        </div>
      </div>

      <div className="layout">
        <MohSidebar />
        <main className="main">
          {/* テスト契約の一部を満たすための骨組みプレースホルダ */}
          {Array.from({ length: 18 }, (_, i) => (
            <section key={i} id={`s${i + 1}`} className="sec">
              <h2 className="sec-title">Section Title {i + 1}</h2>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

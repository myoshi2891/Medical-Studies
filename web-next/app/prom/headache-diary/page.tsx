import "./headache-diary.css";
import HeadacheDiarySidebar from "@/components/prom/HeadacheDiarySidebar";

export default function HeadacheDiaryPage() {
  return (
    <div className="headache-diary-accent">
      <div className="hero">
        <h1>頭痛日誌（Headache Diary）完全ガイド</h1>
      </div>
      <div className="layout">
        <HeadacheDiarySidebar />
        <main className="main">
          {/* Skeleton for test failure */}
        </main>
      </div>
    </div>
  );
}

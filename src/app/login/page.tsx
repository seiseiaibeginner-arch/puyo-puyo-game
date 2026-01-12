"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [guestName, setGuestName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const playerName = guestName.trim() || `ゲスト${Math.floor(Math.random() * 10000)}`;

    // ローカルストレージにゲスト情報を保存
    localStorage.setItem("puyoPlayer", JSON.stringify({
      id: `guest_${Date.now()}`,
      name: playerName,
      isGuest: true,
      createdAt: new Date().toISOString(),
    }));

    // ゲームページへ遷移
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: "linear-gradient(180deg, #000020 0%, #000040 100%)",
    }}>
      {/* 星空エフェクト */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
              animationDuration: Math.random() * 2 + 2 + "s",
            }}
          />
        ))}
      </div>

      {/* ログインパネル */}
      <div
        className="relative z-10 p-8 rounded-lg border-4"
        style={{
          background: "linear-gradient(180deg, #4A4A8C 0%, #2A2A5C 100%)",
          borderColor: "#8888CC",
          boxShadow: "0 0 20px rgba(136, 136, 204, 0.5)",
          minWidth: "320px",
        }}
      >
        {/* タイトル */}
        <h1
          className="text-center text-3xl font-bold mb-8 font-mono"
          style={{
            color: "#FFD700",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 215, 0, 0.5)",
          }}
        >
          PUYO PUYO
        </h1>

        {/* ゲスト名入力 */}
        <div className="mb-6">
          <label
            className="block text-sm mb-2 font-mono"
            style={{ color: "#CCCCFF" }}
          >
            プレイヤー名（任意）
          </label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="ゲスト"
            maxLength={12}
            className="w-full px-4 py-3 rounded font-mono text-lg focus:outline-none focus:ring-2"
            style={{
              background: "#1a1a3e",
              color: "#FFFFFF",
              borderColor: "#6666AA",
              border: "2px solid #6666AA",
            }}
          />
        </div>

        {/* ゲストログインボタン */}
        <button
          onClick={handleGuestLogin}
          disabled={isLoading}
          className="w-full py-4 rounded font-mono text-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
          style={{
            background: "linear-gradient(180deg, #FF6F60 0%, #E53935 100%)",
            color: "#FFFFFF",
            boxShadow: "0 4px 0 #AB000D, 0 6px 10px rgba(0, 0, 0, 0.3)",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          {isLoading ? "ログイン中..." : "ゲストでプレイ"}
        </button>

        {/* 説明テキスト */}
        <p
          className="text-center text-xs mt-6 font-mono"
          style={{ color: "#8888AA" }}
        >
          ゲストデータはブラウザに保存されます
        </p>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

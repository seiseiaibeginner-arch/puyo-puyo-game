"use client";

import { useState } from "react";

interface LoginFormProps {
  onLogin: (playerName: string) => void;
  isLoading?: boolean;
}

export default function LoginForm({ onLogin, isLoading = false }: LoginFormProps) {
  const [guestName, setGuestName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const playerName = guestName.trim() || `ゲスト${Math.floor(Math.random() * 10000)}`;
    onLogin(playerName);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        type="submit"
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
    </form>
  );
}

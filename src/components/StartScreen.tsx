'use client';

import { PuyoCell } from './PuyoCell';

// Fixed star positions to avoid hydration mismatch
const STARS = [
  { width: 2, height: 2, left: 8, top: 12, opacity: 0.5, duration: 3, delay: 0 },
  { width: 1, height: 1, left: 18, top: 28, opacity: 0.4, duration: 4, delay: 1 },
  { width: 3, height: 3, left: 28, top: 8, opacity: 0.6, duration: 2.5, delay: 0.5 },
  { width: 2, height: 2, left: 38, top: 48, opacity: 0.5, duration: 3.5, delay: 1.5 },
  { width: 1, height: 1, left: 48, top: 18, opacity: 0.3, duration: 4.5, delay: 0.2 },
  { width: 2, height: 2, left: 58, top: 68, opacity: 0.7, duration: 2, delay: 0.8 },
  { width: 3, height: 3, left: 68, top: 38, opacity: 0.4, duration: 3, delay: 1.2 },
  { width: 1, height: 1, left: 78, top: 83, opacity: 0.5, duration: 3.8, delay: 0.3 },
  { width: 2, height: 2, left: 88, top: 23, opacity: 0.6, duration: 2.8, delay: 1.8 },
  { width: 1, height: 1, left: 98, top: 58, opacity: 0.4, duration: 4.2, delay: 0.6 },
  { width: 2, height: 2, left: 13, top: 73, opacity: 0.5, duration: 3.2, delay: 1.1 },
  { width: 3, height: 3, left: 23, top: 93, opacity: 0.3, duration: 2.6, delay: 0.4 },
  { width: 1, height: 1, left: 33, top: 33, opacity: 0.6, duration: 3.6, delay: 1.6 },
  { width: 2, height: 2, left: 43, top: 78, opacity: 0.4, duration: 4, delay: 0.9 },
  { width: 1, height: 1, left: 53, top: 53, opacity: 0.7, duration: 2.2, delay: 1.4 },
  { width: 3, height: 3, left: 63, top: 3, opacity: 0.5, duration: 3.4, delay: 0.1 },
  { width: 2, height: 2, left: 73, top: 63, opacity: 0.3, duration: 4.4, delay: 1.7 },
  { width: 1, height: 1, left: 83, top: 43, opacity: 0.6, duration: 2.4, delay: 0.7 },
  { width: 2, height: 2, left: 93, top: 88, opacity: 0.4, duration: 3.1, delay: 1.3 },
  { width: 1, height: 1, left: 6, top: 98, opacity: 0.5, duration: 3.9, delay: 0 },
  { width: 2, height: 2, left: 16, top: 6, opacity: 0.6, duration: 2.7, delay: 0.6 },
  { width: 1, height: 1, left: 26, top: 56, opacity: 0.4, duration: 3.3, delay: 1.0 },
  { width: 3, height: 3, left: 36, top: 16, opacity: 0.5, duration: 4.1, delay: 0.4 },
  { width: 2, height: 2, left: 46, top: 86, opacity: 0.3, duration: 2.9, delay: 1.9 },
  { width: 1, height: 1, left: 56, top: 36, opacity: 0.7, duration: 3.7, delay: 0.2 },
];

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #000020 0%, #000040 50%, #000030 100%)',
      }}
    >
      {/* Starfield background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {STARS.map((star, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: star.width,
              height: star.height,
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <div
        style={{
          textAlign: 'center',
          padding: 32,
          margin: 16,
          background: 'linear-gradient(180deg, #4A4A8C 0%, #2A2A5C 100%)',
          borderRadius: 12,
          border: '4px solid #8888CC',
          boxShadow: 'inset 0 0 0 4px #2A2A5C, 0 8px 32px rgba(0,0,0,0.8)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            background: '#1A1A3C',
            border: '3px solid #0A0A2C',
            borderRadius: 8,
            padding: 32,
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-noto-sans-jp), sans-serif',
              fontSize: 48,
              fontWeight: 'bold',
              color: '#FFD700',
              textShadow: '4px 4px 0 #8B4513, 8px 8px 0 rgba(0,0,0,0.5)',
              marginBottom: 24,
              letterSpacing: 8,
            }}
          >
            ぷよぷよ
          </h1>

          {/* Decorative puyos */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              marginBottom: 32,
            }}
          >
            <PuyoCell puyo={{ color: 'red', id: 'deco-1' }} size={40} />
            <PuyoCell puyo={{ color: 'blue', id: 'deco-2' }} size={40} />
            <PuyoCell puyo={{ color: 'green', id: 'deco-3' }} size={40} />
            <PuyoCell puyo={{ color: 'yellow', id: 'deco-4' }} size={40} />
            <PuyoCell puyo={{ color: 'purple', id: 'deco-5' }} size={40} />
          </div>

          {/* Start button */}
          <button
            onClick={onStart}
            style={{
              fontFamily: 'var(--font-noto-sans-jp), sans-serif',
              fontSize: 24,
              fontWeight: 'bold',
              color: '#FFFFFF',
              textShadow: '2px 2px 0 #000',
              padding: '16px 48px',
              background: 'linear-gradient(180deg, #66CC66 0%, #44AA44 50%, #226622 100%)',
              border: '4px solid #88EE88',
              borderRadius: 8,
              boxShadow: 'inset 0 2px 0 #88EE88, inset 0 -2px 0 #226622, 0 6px 0 #226622',
              cursor: 'pointer',
              transition: 'transform 0.1s, box-shadow 0.1s',
              marginBottom: 24,
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'translateY(4px)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 0 #88EE88, inset 0 -2px 0 #226622, 0 2px 0 #226622';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 0 #88EE88, inset 0 -2px 0 #226622, 0 6px 0 #226622';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'inset 0 2px 0 #88EE88, inset 0 -2px 0 #226622, 0 6px 0 #226622';
            }}
          >
            スタート
          </button>

          {/* Instructions */}
          <div
            style={{
              fontFamily: 'var(--font-noto-sans-jp), sans-serif',
              fontSize: 12,
              color: '#AAAACC',
              textAlign: 'left',
              lineHeight: 1.8,
            }}
          >
            <div style={{ marginBottom: 8, color: '#88CCFF', fontWeight: 'bold' }}>
              操作方法
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 4 }}>
              <span style={{ color: '#FFD700' }}>← →</span><span>移動</span>
              <span style={{ color: '#FFD700' }}>Z X</span><span>回転</span>
              <span style={{ color: '#FFD700' }}>↓</span><span>落下</span>
              <span style={{ color: '#FFD700' }}>↑ / Space</span><span>即落下</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

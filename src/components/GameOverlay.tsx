'use client';

interface GameOverlayProps {
  isGameOver: boolean;
  isPaused: boolean;
  score: number;
  onRestart: () => void;
  onResume: () => void;
}

export function GameOverlay({
  isGameOver,
  isPaused,
  score,
  onRestart,
  onResume,
}: GameOverlayProps) {
  if (!isGameOver && !isPaused) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 20, 0.85)',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: 24,
          margin: 16,
          background: 'linear-gradient(180deg, #4A4A8C 0%, #2A2A5C 100%)',
          borderRadius: 8,
          border: '4px solid #8888CC',
          boxShadow: 'inset 0 0 0 4px #2A2A5C, 0 8px 32px rgba(0,0,0,0.8)',
        }}
      >
        <div
          style={{
            background: '#1A1A3C',
            border: '3px solid #0A0A2C',
            borderRadius: 4,
            padding: 24,
          }}
        >
          {isGameOver ? (
            <>
              <h2
                style={{
                  fontFamily: 'var(--font-noto-sans-jp), sans-serif',
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: '#FF4444',
                  textShadow: '3px 3px 0 #880000, -1px -1px 0 #FFAAAA',
                  marginBottom: 16,
                }}
              >
                ゲームオーバー
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-noto-sans-jp), sans-serif',
                  fontSize: 12,
                  color: '#88CCFF',
                  marginBottom: 8,
                }}
              >
                最終得点
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-noto-sans-jp), sans-serif',
                  fontSize: 36,
                  fontWeight: 'bold',
                  color: '#FFD700',
                  textShadow: '2px 2px 0 #8B4513',
                  marginBottom: 24,
                }}
              >
                {score.toString().padStart(8, '0')}
              </p>
              <button
                onClick={onRestart}
                style={{
                  fontFamily: 'var(--font-noto-sans-jp), sans-serif',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textShadow: '1px 1px 0 #000',
                  padding: '12px 32px',
                  background: 'linear-gradient(180deg, #66CC66 0%, #44AA44 50%, #226622 100%)',
                  border: '3px solid #88EE88',
                  borderRadius: 6,
                  boxShadow: 'inset 0 2px 0 #88EE88, inset 0 -2px 0 #226622, 0 4px 0 #226622',
                  cursor: 'pointer',
                }}
              >
                もう一度 (R)
              </button>
            </>
          ) : (
            <>
              <h2
                style={{
                  fontFamily: 'var(--font-noto-sans-jp), sans-serif',
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: '#FFD700',
                  textShadow: '3px 3px 0 #8B4513, -1px -1px 0 #FFEE88',
                  marginBottom: 24,
                }}
              >
                ポーズ
              </h2>
              <button
                onClick={onResume}
                style={{
                  fontFamily: 'var(--font-noto-sans-jp), sans-serif',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  textShadow: '1px 1px 0 #000',
                  padding: '12px 32px',
                  background: 'linear-gradient(180deg, #6688EE 0%, #4466CC 50%, #223388 100%)',
                  border: '3px solid #88AAFF',
                  borderRadius: 6,
                  boxShadow: 'inset 0 2px 0 #88AAFF, inset 0 -2px 0 #223388, 0 4px 0 #223388',
                  cursor: 'pointer',
                }}
              >
                再開 (P)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

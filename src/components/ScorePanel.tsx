'use client';

interface ScorePanelProps {
  score: number;
  level: number;
  clearedPuyos: number;
}

export function ScorePanel({ score, level, clearedPuyos }: ScorePanelProps) {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #4A4A8C 0%, #2A2A5C 100%)',
        padding: 6,
        borderRadius: 4,
        border: '3px solid #8888CC',
        boxShadow: 'inset 0 0 0 3px #2A2A5C, 0 4px 8px rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          background: '#1A1A3C',
          border: '2px solid #0A0A2C',
          borderRadius: 2,
          padding: 8,
        }}
      >
        {/* Score */}
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              fontFamily: 'var(--font-noto-sans-jp), sans-serif',
              fontSize: 10,
              fontWeight: 'bold',
              color: '#88CCFF',
              textShadow: '1px 1px 0 #004488',
              marginBottom: 2,
            }}
          >
            得点
          </div>
          <div
            style={{
              fontFamily: 'var(--font-noto-sans-jp), sans-serif',
              fontSize: 20,
              fontWeight: 'bold',
              color: '#FFFFFF',
              textShadow: '2px 2px 0 #333',
              textAlign: 'right',
            }}
          >
            {score.toString().padStart(8, '0')}
          </div>
        </div>

        {/* Level & Cleared */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-noto-sans-jp), sans-serif',
                fontSize: 10,
                fontWeight: 'bold',
                color: '#88FF88',
                textShadow: '1px 1px 0 #004400',
                marginBottom: 2,
              }}
            >
              レベル
            </div>
            <div
              style={{
                fontFamily: 'var(--font-noto-sans-jp), sans-serif',
                fontSize: 16,
                fontWeight: 'bold',
                color: '#FFFFFF',
                textShadow: '2px 2px 0 #333',
              }}
            >
              {level.toString().padStart(2, '0')}
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-noto-sans-jp), sans-serif',
                fontSize: 10,
                fontWeight: 'bold',
                color: '#FF88CC',
                textShadow: '1px 1px 0 #880044',
                marginBottom: 2,
              }}
            >
              消去数
            </div>
            <div
              style={{
                fontFamily: 'var(--font-noto-sans-jp), sans-serif',
                fontSize: 16,
                fontWeight: 'bold',
                color: '#FFFFFF',
                textShadow: '2px 2px 0 #333',
              }}
            >
              {clearedPuyos.toString().padStart(4, '0')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

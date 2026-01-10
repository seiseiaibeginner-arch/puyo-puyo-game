'use client';

interface ControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onSoftDrop: () => void;
  onHardDrop: () => void;
  onPause: () => void;
  isPaused: boolean;
}

function RetroButton({
  children,
  onClick,
  color = 'blue',
  size = 'md',
}: {
  children: React.ReactNode;
  onClick: () => void;
  color?: 'blue' | 'red' | 'green' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
}) {
  const colors = {
    blue: { bg: '#4444AA', border: '#6666CC', shadow: '#222266' },
    red: { bg: '#AA4444', border: '#CC6666', shadow: '#662222' },
    green: { bg: '#44AA44', border: '#66CC66', shadow: '#226622' },
    yellow: { bg: '#AAAA44', border: '#CCCC66', shadow: '#666622' },
  };

  const sizes = {
    sm: { width: 36, height: 36, fontSize: 14 },
    md: { width: 48, height: 48, fontSize: 18 },
    lg: { width: 56, height: 56, fontSize: 22 },
  };

  const c = colors[color];
  const s = sizes[size];

  return (
    <button
      onClick={onClick}
      style={{
        width: s.width,
        height: s.height,
        fontSize: s.fontSize,
        fontFamily: 'var(--font-noto-sans-jp), sans-serif',
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadow: '1px 1px 0 #000',
        background: `linear-gradient(180deg, ${c.border} 0%, ${c.bg} 50%, ${c.shadow} 100%)`,
        border: `3px solid ${c.border}`,
        borderRadius: 6,
        boxShadow: `inset 0 2px 0 ${c.border}, inset 0 -2px 0 ${c.shadow}, 0 4px 0 ${c.shadow}`,
        cursor: 'pointer',
        transition: 'transform 0.05s, box-shadow 0.05s',
        touchAction: 'manipulation',
        userSelect: 'none',
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(2px)';
        e.currentTarget.style.boxShadow = `inset 0 2px 0 ${c.border}, inset 0 -2px 0 ${c.shadow}, 0 2px 0 ${c.shadow}`;
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = `inset 0 2px 0 ${c.border}, inset 0 -2px 0 ${c.shadow}, 0 4px 0 ${c.shadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = `inset 0 2px 0 ${c.border}, inset 0 -2px 0 ${c.shadow}, 0 4px 0 ${c.shadow}`;
      }}
    >
      {children}
    </button>
  );
}

export function Controls({
  onMoveLeft,
  onMoveRight,
  onRotateLeft,
  onRotateRight,
  onSoftDrop,
  onHardDrop,
  onPause,
  isPaused,
}: ControlsProps) {
  return (
    <div>
      {/* Keyboard hints */}
      <div
        style={{
          background: 'linear-gradient(180deg, #4A4A8C 0%, #2A2A5C 100%)',
          padding: 6,
          borderRadius: 4,
          border: '3px solid #8888CC',
          boxShadow: 'inset 0 0 0 3px #2A2A5C, 0 4px 8px rgba(0,0,0,0.5)',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-noto-sans-jp), sans-serif',
            fontSize: 10,
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '1px 1px 0 #8B4513',
            marginBottom: 6,
          }}
        >
          操作方法
        </div>
        <div
          style={{
            background: '#1A1A3C',
            border: '2px solid #0A0A2C',
            borderRadius: 2,
            padding: 8,
            fontFamily: 'var(--font-noto-sans-jp), sans-serif',
            fontSize: 10,
            color: '#CCCCCC',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr', gap: 4 }}>
            <span style={{ color: '#88CCFF' }}>← →</span><span>移動</span>
            <span style={{ color: '#88CCFF' }}>Z X</span><span>回転</span>
            <span style={{ color: '#88CCFF' }}>↓</span><span>落下</span>
            <span style={{ color: '#88CCFF' }}>↑</span><span>即落下</span>
            <span style={{ color: '#88CCFF' }}>P</span><span>ポーズ</span>
          </div>
        </div>
      </div>

      {/* Touch controls */}
      <div className="md:hidden">
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <RetroButton onClick={onRotateLeft} color="green" size="md">↺</RetroButton>
          <RetroButton onClick={onHardDrop} color="red" size="md">⇓</RetroButton>
          <RetroButton onClick={onRotateRight} color="green" size="md">↻</RetroButton>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <RetroButton onClick={onMoveLeft} color="blue" size="lg">◀</RetroButton>
          <RetroButton onClick={onSoftDrop} color="blue" size="lg">▼</RetroButton>
          <RetroButton onClick={onMoveRight} color="blue" size="lg">▶</RetroButton>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RetroButton onClick={onPause} color="yellow" size="md">
            {isPaused ? '▶' : '❚❚'}
          </RetroButton>
        </div>
      </div>
    </div>
  );
}

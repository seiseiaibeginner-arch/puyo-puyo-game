'use client';

import { Puyo } from '@/types/game';

interface PuyoCellProps {
  puyo: Puyo;
  isGhost?: boolean;
  size?: number;
}

const colorStyles = {
  red: {
    base: '#E53935',
    light: '#FF6F60',
    dark: '#AB000D',
  },
  blue: {
    base: '#1E88E5',
    light: '#6AB7FF',
    dark: '#005CB2',
  },
  green: {
    base: '#43A047',
    light: '#76D275',
    dark: '#00701A',
  },
  yellow: {
    base: '#FDD835',
    light: '#FFFF6B',
    dark: '#C6A700',
  },
  purple: {
    base: '#8E24AA',
    light: '#C158DC',
    dark: '#5C007A',
  },
};

export function PuyoCell({ puyo, isGhost = false, size = 36 }: PuyoCellProps) {
  if (!puyo.color) {
    return <div style={{ width: size, height: size }} />;
  }

  const colors = colorStyles[puyo.color];
  const isClearing = puyo.isClearing;

  if (isGhost) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: colors.base,
          opacity: 0.3,
          border: '2px dashed rgba(255,255,255,0.5)',
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        animation: isClearing ? 'puyo-clear 0.3s ease-out forwards' : undefined,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 36 36">
        {/* Shadow */}
        <ellipse cx="18" cy="34" rx="12" ry="3" fill="rgba(0,0,0,0.3)" />

        {/* Body shadow/outline */}
        <circle cx="18" cy="19" r="16" fill={colors.dark} />

        {/* Main body */}
        <circle cx="18" cy="18" r="16" fill={colors.base} />

        {/* Body highlight - top */}
        <ellipse cx="12" cy="10" rx="8" ry="6" fill={colors.light} opacity="0.6" />

        {/* Shine spot */}
        <circle cx="9" cy="8" r="4" fill="#FFFFFF" opacity="0.8" />
        <circle cx="7" cy="6" r="2" fill="#FFFFFF" opacity="0.9" />

        {/* Left eye - white with black pupil */}
        <ellipse cx="12" cy="16" rx="5" ry="6" fill="#FFFFFF" />
        <ellipse cx="12" cy="17" rx="3" ry="4" fill="#000000" />
        <circle cx="10" cy="14" r="1.5" fill="#FFFFFF" />

        {/* Right eye - white with black pupil */}
        <ellipse cx="24" cy="16" rx="5" ry="6" fill="#FFFFFF" />
        <ellipse cx="24" cy="17" rx="3" ry="4" fill="#000000" />
        <circle cx="22" cy="14" r="1.5" fill="#FFFFFF" />

        {/* Cute mouth - ω shape */}
        <path
          d="M12 26 Q14 29 18 26 Q22 29 24 26"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Chain number indicator */}
      {puyo.chainNumber && puyo.chainNumber > 1 && (
        <div
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            width: 18,
            height: 18,
            borderRadius: '50%',
            backgroundColor: '#FFD700',
            color: '#000',
            fontSize: 11,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #FFF',
            fontFamily: 'var(--font-noto-sans-jp), sans-serif',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {puyo.chainNumber}
        </div>
      )}
    </div>
  );
}

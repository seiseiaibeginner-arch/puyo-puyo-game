'use client';

import { FallingPuyo } from '@/types/game';
import { PuyoCell } from './PuyoCell';

interface NextPuyoProps {
  nextPuyo: FallingPuyo;
}

export function NextPuyo({ nextPuyo }: NextPuyoProps) {
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
          fontFamily: 'var(--font-noto-sans-jp), sans-serif',
          fontSize: 12,
          fontWeight: 'bold',
          color: '#FFD700',
          textShadow: '1px 1px 0 #8B4513',
          textAlign: 'center',
          marginBottom: 4,
        }}
      >
        NEXT
      </div>
      <div
        style={{
          background: '#1A1A3C',
          border: '2px solid #0A0A2C',
          borderRadius: 2,
          padding: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <PuyoCell puyo={{ color: nextPuyo.sub, id: 'next-sub' }} size={36} />
        <PuyoCell puyo={{ color: nextPuyo.main, id: 'next-main' }} size={36} />
      </div>
    </div>
  );
}

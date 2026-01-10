'use client';

import { useGameEngine } from '@/hooks/useGameEngine';
import { GameBoard } from './GameBoard';
import { NextPuyo } from './NextPuyo';
import { ScorePanel } from './ScorePanel';
import { Controls } from './Controls';
import { GameOverlay } from './GameOverlay';
import { StartScreen } from './StartScreen';

// Fixed star positions to avoid hydration mismatch
const STARS = [
  { width: 2, height: 2, left: 5, top: 10, opacity: 0.5, duration: 3, delay: 0 },
  { width: 1, height: 1, left: 15, top: 25, opacity: 0.4, duration: 4, delay: 1 },
  { width: 3, height: 3, left: 25, top: 5, opacity: 0.6, duration: 2.5, delay: 0.5 },
  { width: 2, height: 2, left: 35, top: 45, opacity: 0.5, duration: 3.5, delay: 1.5 },
  { width: 1, height: 1, left: 45, top: 15, opacity: 0.3, duration: 4.5, delay: 0.2 },
  { width: 2, height: 2, left: 55, top: 65, opacity: 0.7, duration: 2, delay: 0.8 },
  { width: 3, height: 3, left: 65, top: 35, opacity: 0.4, duration: 3, delay: 1.2 },
  { width: 1, height: 1, left: 75, top: 80, opacity: 0.5, duration: 3.8, delay: 0.3 },
  { width: 2, height: 2, left: 85, top: 20, opacity: 0.6, duration: 2.8, delay: 1.8 },
  { width: 1, height: 1, left: 95, top: 55, opacity: 0.4, duration: 4.2, delay: 0.6 },
  { width: 2, height: 2, left: 10, top: 70, opacity: 0.5, duration: 3.2, delay: 1.1 },
  { width: 3, height: 3, left: 20, top: 90, opacity: 0.3, duration: 2.6, delay: 0.4 },
  { width: 1, height: 1, left: 30, top: 30, opacity: 0.6, duration: 3.6, delay: 1.6 },
  { width: 2, height: 2, left: 40, top: 75, opacity: 0.4, duration: 4, delay: 0.9 },
  { width: 1, height: 1, left: 50, top: 50, opacity: 0.7, duration: 2.2, delay: 1.4 },
  { width: 3, height: 3, left: 60, top: 8, opacity: 0.5, duration: 3.4, delay: 0.1 },
  { width: 2, height: 2, left: 70, top: 60, opacity: 0.3, duration: 4.4, delay: 1.7 },
  { width: 1, height: 1, left: 80, top: 40, opacity: 0.6, duration: 2.4, delay: 0.7 },
  { width: 2, height: 2, left: 90, top: 85, opacity: 0.4, duration: 3.1, delay: 1.3 },
  { width: 1, height: 1, left: 3, top: 95, opacity: 0.5, duration: 3.9, delay: 0 },
];

export function PuyoGame() {
  const { gameState, actions } = useGameEngine();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #000020 0%, #000040 50%, #000030 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        overflow: 'hidden',
      }}
    >
      {/* Starfield background effect */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
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

      {/* Title */}
      <h1
        style={{
          fontFamily: 'var(--font-noto-sans-jp), sans-serif',
          fontSize: 36,
          fontWeight: 'bold',
          color: '#FFD700',
          textShadow: '3px 3px 0 #8B4513, 6px 6px 0 rgba(0,0,0,0.5)',
          marginBottom: 24,
          letterSpacing: 8,
          position: 'relative',
          zIndex: 1,
        }}
      >
        ぷよぷよ
      </h1>

      {/* Game container - horizontal layout */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 16,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left panel - Score & Controls */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <ScorePanel
            score={gameState.score}
            level={gameState.level}
            clearedPuyos={gameState.clearedPuyos}
          />
          <Controls
            onMoveLeft={actions.moveLeft}
            onMoveRight={actions.moveRight}
            onRotateLeft={() => actions.rotate(false)}
            onRotateRight={() => actions.rotate(true)}
            onSoftDrop={actions.softDrop}
            onHardDrop={actions.hardDrop}
            onPause={actions.togglePause}
            isPaused={gameState.isPaused}
          />
        </div>

        {/* Center - Game board */}
        <GameBoard gameState={gameState} />

        {/* Right panel - Next */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <NextPuyo nextPuyo={gameState.nextPuyo} />
        </div>
      </div>

      {/* Start Screen */}
      {!gameState.isStarted && (
        <StartScreen onStart={actions.startGame} />
      )}

      {/* Game Over / Pause Overlay */}
      <GameOverlay
        isGameOver={gameState.isGameOver}
        isPaused={gameState.isPaused}
        score={gameState.score}
        onRestart={actions.resetGame}
        onResume={actions.togglePause}
      />

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @keyframes puyo-clear {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.8; }
          100% { transform: scale(0); opacity: 0; }
        }

        @keyframes chain-pop {
          0% { transform: translate(-50%, -50%) scale(0); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}

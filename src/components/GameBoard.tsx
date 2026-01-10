'use client';

import { GameState, VISIBLE_HEIGHT, BOARD_WIDTH, FallingPuyo } from '@/types/game';
import { PuyoCell } from './PuyoCell';

interface GameBoardProps {
  gameState: GameState;
}

const getSubPosition = (main: { row: number; col: number }, rotation: 0 | 1 | 2 | 3) => {
  switch (rotation) {
    case 0:
      return { row: main.row - 1, col: main.col };
    case 1:
      return { row: main.row, col: main.col + 1 };
    case 2:
      return { row: main.row + 1, col: main.col };
    case 3:
      return { row: main.row, col: main.col - 1 };
  }
};

function FallingPuyoDisplay({ puyo }: { puyo: FallingPuyo }) {
  const subPos = getSubPosition(puyo.position, puyo.rotation);
  const cellSize = 40;

  return (
    <>
      {puyo.position.row >= 0 && (
        <div
          className="absolute"
          style={{
            left: puyo.position.col * cellSize + 2,
            top: (puyo.position.row - 1) * cellSize + 2,
          }}
        >
          <PuyoCell puyo={{ color: puyo.main, id: 'main' }} size={cellSize - 4} />
        </div>
      )}
      {subPos.row >= 0 && (
        <div
          className="absolute"
          style={{
            left: subPos.col * cellSize + 2,
            top: (subPos.row - 1) * cellSize + 2,
          }}
        >
          <PuyoCell puyo={{ color: puyo.sub, id: 'sub' }} size={cellSize - 4} />
        </div>
      )}
    </>
  );
}

export function GameBoard({ gameState }: GameBoardProps) {
  const visibleBoard = gameState.board.slice(1, VISIBLE_HEIGHT + 1);
  const cellSize = 40;

  return (
    <div className="relative">
      {/* SFC-style board frame */}
      <div
        style={{
          background: 'linear-gradient(180deg, #4A4A8C 0%, #2A2A5C 100%)',
          padding: 8,
          borderRadius: 4,
          border: '4px solid #8888CC',
          boxShadow: 'inset 0 0 0 4px #2A2A5C, 0 4px 8px rgba(0,0,0,0.5)',
        }}
      >
        {/* Inner frame */}
        <div
          style={{
            background: '#1A1A3C',
            border: '2px solid #0A0A2C',
            borderRadius: 2,
            padding: 2,
          }}
        >
          {/* Board area */}
          <div
            className="relative"
            style={{
              width: BOARD_WIDTH * cellSize,
              height: VISIBLE_HEIGHT * cellSize,
              background: 'linear-gradient(180deg, #2C2C5C 0%, #1C1C4C 100%)',
            }}
          >
            {/* Grid lines - SFC style */}
            <div className="absolute inset-0 pointer-events-none">
              {Array(VISIBLE_HEIGHT)
                .fill(null)
                .map((_, row) => (
                  <div
                    key={row}
                    className="flex"
                    style={{ height: cellSize }}
                  >
                    {Array(BOARD_WIDTH)
                      .fill(null)
                      .map((_, col) => (
                        <div
                          key={col}
                          style={{
                            width: cellSize,
                            height: cellSize,
                            borderRight: col < BOARD_WIDTH - 1 ? '1px solid rgba(100,100,150,0.2)' : 'none',
                            borderBottom: row < VISIBLE_HEIGHT - 1 ? '1px solid rgba(100,100,150,0.2)' : 'none',
                          }}
                        />
                      ))}
                  </div>
                ))}
            </div>

            {/* Placed puyos */}
            <div className="relative z-10">
              {visibleBoard.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="flex items-center justify-center"
                      style={{ width: cellSize, height: cellSize }}
                    >
                      {cell.color && (
                        <PuyoCell puyo={cell} size={cellSize - 4} />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Falling puyo */}
            {gameState.currentPuyo && (
              <FallingPuyoDisplay puyo={gameState.currentPuyo} />
            )}

            {/* Danger zone - X mark at top */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: 2,
                left: 2 * cellSize + cellSize / 2 - 8,
                color: '#FF4444',
                fontSize: 16,
                fontWeight: 'bold',
                textShadow: '0 0 4px #FF0000',
                opacity: 0.6,
              }}
            >
              ×
            </div>
          </div>
        </div>
      </div>

      {/* Chain display - SFC retro style */}
      {gameState.chainCount > 0 && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
          style={{
            background: 'linear-gradient(180deg, #FFD700 0%, #FF8C00 100%)',
            padding: '8px 16px',
            borderRadius: 4,
            border: '3px solid #FFF',
            boxShadow: '0 0 0 3px #8B4513, 0 4px 8px rgba(0,0,0,0.5)',
            animation: 'chain-pop 0.3s ease-out',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-noto-sans-jp), sans-serif',
              fontSize: 24,
              fontWeight: 'bold',
              color: '#FFF',
              textShadow: '2px 2px 0 #8B4513, -1px -1px 0 #8B4513',
              whiteSpace: 'nowrap',
            }}
          >
            {gameState.chainCount} 連鎖!
          </div>
        </div>
      )}
    </div>
  );
}

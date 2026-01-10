'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  GameState,
  FallingPuyo,
  Puyo,
  PuyoColor,
  Position,
  BOARD_WIDTH,
  BOARD_HEIGHT,
  COLORS,
} from '@/types/game';

const createEmptyBoard = (): Puyo[][] => {
  return Array(BOARD_HEIGHT)
    .fill(null)
    .map(() =>
      Array(BOARD_WIDTH)
        .fill(null)
        .map(() => ({ color: null, id: crypto.randomUUID() }))
    );
};

const getRandomColor = (): PuyoColor => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

const createNewPuyo = (): FallingPuyo => ({
  main: getRandomColor(),
  sub: getRandomColor(),
  position: { row: 2, col: 2 },
  rotation: 0,
});

const getSubPosition = (main: Position, rotation: 0 | 1 | 2 | 3): Position => {
  switch (rotation) {
    case 0:
      return { row: main.row - 1, col: main.col }; // up
    case 1:
      return { row: main.row, col: main.col + 1 }; // right
    case 2:
      return { row: main.row + 1, col: main.col }; // down
    case 3:
      return { row: main.row, col: main.col - 1 }; // left
  }
};

export function useGameEngine() {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createEmptyBoard(),
    currentPuyo: createNewPuyo(),
    nextPuyo: createNewPuyo(),
    score: 0,
    chainCount: 0,
    isGameOver: false,
    isPaused: false,
    isStarted: false,
    level: 1,
    clearedPuyos: 0,
  }));

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const clearingRef = useRef(false);

  const isValidPosition = useCallback(
    (board: Puyo[][], main: Position, sub: Position): boolean => {
      const isInBounds = (pos: Position) =>
        pos.col >= 0 &&
        pos.col < BOARD_WIDTH &&
        pos.row >= 0 &&
        pos.row < BOARD_HEIGHT;

      const isEmpty = (pos: Position) =>
        isInBounds(pos) && board[pos.row][pos.col].color === null;

      return (
        isInBounds(main) &&
        isInBounds(sub) &&
        (main.row < 0 || isEmpty(main)) &&
        (sub.row < 0 || isEmpty(sub))
      );
    },
    []
  );

  const findConnectedPuyos = useCallback(
    (board: Puyo[][], startRow: number, startCol: number, visited: Set<string>): Position[] => {
      const color = board[startRow][startCol].color;
      if (!color) return [];

      const connected: Position[] = [];
      const stack: Position[] = [{ row: startRow, col: startCol }];

      while (stack.length > 0) {
        const pos = stack.pop()!;
        const key = `${pos.row},${pos.col}`;

        if (visited.has(key)) continue;
        if (pos.row < 0 || pos.row >= BOARD_HEIGHT || pos.col < 0 || pos.col >= BOARD_WIDTH) continue;
        if (board[pos.row][pos.col].color !== color) continue;

        visited.add(key);
        connected.push(pos);

        stack.push({ row: pos.row - 1, col: pos.col });
        stack.push({ row: pos.row + 1, col: pos.col });
        stack.push({ row: pos.row, col: pos.col - 1 });
        stack.push({ row: pos.row, col: pos.col + 1 });
      }

      return connected;
    },
    []
  );

  const checkAndClearChains = useCallback(
    async (board: Puyo[][]): Promise<{ newBoard: Puyo[][]; totalCleared: number; chains: number }> => {
      let totalCleared = 0;
      let chains = 0;
      let currentBoard = board.map(row => row.map(cell => ({ ...cell })));

      const processChain = async (): Promise<boolean> => {
        const visited = new Set<string>();
        const toClear: Position[] = [];

        for (let row = 0; row < BOARD_HEIGHT; row++) {
          for (let col = 0; col < BOARD_WIDTH; col++) {
            if (currentBoard[row][col].color && !visited.has(`${row},${col}`)) {
              const connected = findConnectedPuyos(currentBoard, row, col, visited);
              if (connected.length >= 4) {
                toClear.push(...connected);
              }
            }
          }
        }

        if (toClear.length === 0) return false;

        chains++;
        totalCleared += toClear.length;

        // Mark puyos as clearing
        toClear.forEach(pos => {
          currentBoard[pos.row][pos.col] = {
            ...currentBoard[pos.row][pos.col],
            isClearing: true,
            chainNumber: chains,
          };
        });

        setGameState(prev => ({ ...prev, board: currentBoard, chainCount: chains }));
        await new Promise(resolve => setTimeout(resolve, 300));

        // Clear puyos
        toClear.forEach(pos => {
          currentBoard[pos.row][pos.col] = { color: null, id: crypto.randomUUID() };
        });

        // Apply gravity
        for (let col = 0; col < BOARD_WIDTH; col++) {
          let writeRow = BOARD_HEIGHT - 1;
          for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
            if (currentBoard[row][col].color !== null) {
              if (row !== writeRow) {
                currentBoard[writeRow][col] = { ...currentBoard[row][col], isClearing: false };
                currentBoard[row][col] = { color: null, id: crypto.randomUUID() };
              }
              writeRow--;
            }
          }
        }

        setGameState(prev => ({ ...prev, board: currentBoard }));
        await new Promise(resolve => setTimeout(resolve, 200));

        return true;
      };

      while (await processChain()) {
        // Continue processing chains
      }

      return { newBoard: currentBoard, totalCleared, chains };
    },
    [findConnectedPuyos]
  );

  const placePuyo = useCallback(
    async (puyo: FallingPuyo, board: Puyo[][]) => {
      clearingRef.current = true;
      const newBoard = board.map(row => row.map(cell => ({ ...cell })));
      const subPos = getSubPosition(puyo.position, puyo.rotation);

      if (puyo.position.row >= 0 && puyo.position.row < BOARD_HEIGHT) {
        newBoard[puyo.position.row][puyo.position.col] = {
          color: puyo.main,
          id: crypto.randomUUID(),
        };
      }
      if (subPos.row >= 0 && subPos.row < BOARD_HEIGHT) {
        newBoard[subPos.row][subPos.col] = {
          color: puyo.sub,
          id: crypto.randomUUID(),
        };
      }

      // Apply gravity first
      for (let col = 0; col < BOARD_WIDTH; col++) {
        let writeRow = BOARD_HEIGHT - 1;
        for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
          if (newBoard[row][col].color !== null) {
            if (row !== writeRow) {
              newBoard[writeRow][col] = newBoard[row][col];
              newBoard[row][col] = { color: null, id: crypto.randomUUID() };
            }
            writeRow--;
          }
        }
      }

      setGameState(prev => ({ ...prev, board: newBoard, currentPuyo: null }));

      const { newBoard: clearedBoard, totalCleared, chains } = await checkAndClearChains(newBoard);

      const scoreMultiplier = chains > 0 ? Math.pow(2, chains - 1) : 1;
      const scoreGain = totalCleared * 10 * scoreMultiplier;

      // Check game over
      const isGameOver = clearedBoard[1][2].color !== null || clearedBoard[0][2].color !== null;

      setGameState(prev => ({
        ...prev,
        board: clearedBoard,
        currentPuyo: isGameOver ? null : prev.nextPuyo,
        nextPuyo: createNewPuyo(),
        score: prev.score + scoreGain,
        chainCount: 0,
        isGameOver,
        clearedPuyos: prev.clearedPuyos + totalCleared,
        level: Math.floor((prev.clearedPuyos + totalCleared) / 30) + 1,
      }));
      clearingRef.current = false;
    },
    [checkAndClearChains]
  );

  const moveLeft = useCallback(() => {
    if (gameState.isGameOver || gameState.isPaused || clearingRef.current) return;

    setGameState(prev => {
      if (!prev.currentPuyo) return prev;
      const newPos = { ...prev.currentPuyo.position, col: prev.currentPuyo.position.col - 1 };
      const subPos = getSubPosition(newPos, prev.currentPuyo.rotation);
      if (isValidPosition(prev.board, newPos, subPos)) {
        return { ...prev, currentPuyo: { ...prev.currentPuyo, position: newPos } };
      }
      return prev;
    });
  }, [gameState.isGameOver, gameState.isPaused, isValidPosition]);

  const moveRight = useCallback(() => {
    if (gameState.isGameOver || gameState.isPaused || clearingRef.current) return;

    setGameState(prev => {
      if (!prev.currentPuyo) return prev;
      const newPos = { ...prev.currentPuyo.position, col: prev.currentPuyo.position.col + 1 };
      const subPos = getSubPosition(newPos, prev.currentPuyo.rotation);
      if (isValidPosition(prev.board, newPos, subPos)) {
        return { ...prev, currentPuyo: { ...prev.currentPuyo, position: newPos } };
      }
      return prev;
    });
  }, [gameState.isGameOver, gameState.isPaused, isValidPosition]);

  const rotate = useCallback((clockwise: boolean) => {
    if (gameState.isGameOver || gameState.isPaused || clearingRef.current) return;

    setGameState(prev => {
      if (!prev.currentPuyo) return prev;
      const newRotation = ((prev.currentPuyo.rotation + (clockwise ? 1 : 3)) % 4) as 0 | 1 | 2 | 3;
      let newPos = prev.currentPuyo.position;
      let subPos = getSubPosition(newPos, newRotation);

      // Wall kick
      if (subPos.col < 0) {
        newPos = { ...newPos, col: newPos.col + 1 };
        subPos = getSubPosition(newPos, newRotation);
      } else if (subPos.col >= BOARD_WIDTH) {
        newPos = { ...newPos, col: newPos.col - 1 };
        subPos = getSubPosition(newPos, newRotation);
      }

      if (isValidPosition(prev.board, newPos, subPos)) {
        return { ...prev, currentPuyo: { ...prev.currentPuyo, position: newPos, rotation: newRotation } };
      }
      return prev;
    });
  }, [gameState.isGameOver, gameState.isPaused, isValidPosition]);

  const hardDrop = useCallback(() => {
    if (gameState.isGameOver || gameState.isPaused || !gameState.currentPuyo || clearingRef.current) return;

    const currentPuyo = gameState.currentPuyo;
    const board = gameState.board;

    let newPos = { ...currentPuyo.position };

    while (true) {
      const nextPos = { ...newPos, row: newPos.row + 1 };
      const nextSubPos = getSubPosition(nextPos, currentPuyo.rotation);
      if (!isValidPosition(board, nextPos, nextSubPos)) break;
      newPos = nextPos;
    }

    placePuyo({ ...currentPuyo, position: newPos }, board);
  }, [gameState.isGameOver, gameState.isPaused, gameState.currentPuyo, gameState.board, isValidPosition, placePuyo]);

  const softDrop = useCallback(() => {
    if (gameState.isGameOver || gameState.isPaused || !gameState.currentPuyo || clearingRef.current) return;

    const currentPuyo = gameState.currentPuyo;
    const board = gameState.board;
    const newPos = { ...currentPuyo.position, row: currentPuyo.position.row + 1 };
    const subPos = getSubPosition(newPos, currentPuyo.rotation);

    if (isValidPosition(board, newPos, subPos)) {
      setGameState(prev => {
        if (!prev.currentPuyo) return prev;
        return { ...prev, currentPuyo: { ...prev.currentPuyo, position: newPos } };
      });
    } else {
      placePuyo(currentPuyo, board);
    }
  }, [gameState.isGameOver, gameState.isPaused, gameState.currentPuyo, gameState.board, isValidPosition, placePuyo]);

  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPuyo: createNewPuyo(),
      nextPuyo: createNewPuyo(),
      score: 0,
      chainCount: 0,
      isGameOver: false,
      isPaused: false,
      isStarted: false,
      level: 1,
      clearedPuyos: 0,
    });
    clearingRef.current = false;
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, isStarted: true }));
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameState.isStarted || gameState.isGameOver || gameState.isPaused || clearingRef.current) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const speed = Math.max(100, 800 - (gameState.level - 1) * 50);

    gameLoopRef.current = setInterval(() => {
      softDrop();
    }, speed);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.isStarted, gameState.isGameOver, gameState.isPaused, gameState.level, softDrop]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveLeft();
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveRight();
          break;
        case 'ArrowDown':
          e.preventDefault();
          softDrop();
          break;
        case 'ArrowUp':
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        case 'z':
        case 'Z':
          e.preventDefault();
          rotate(false);
          break;
        case 'x':
        case 'X':
          e.preventDefault();
          rotate(true);
          break;
        case 'p':
        case 'P':
        case 'Escape':
          e.preventDefault();
          togglePause();
          break;
        case 'r':
        case 'R':
          if (gameState.isGameOver) {
            e.preventDefault();
            resetGame();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight, softDrop, hardDrop, rotate, togglePause, resetGame, gameState.isGameOver]);

  return {
    gameState,
    actions: {
      moveLeft,
      moveRight,
      rotate,
      softDrop,
      hardDrop,
      togglePause,
      resetGame,
      startGame,
    },
  };
}

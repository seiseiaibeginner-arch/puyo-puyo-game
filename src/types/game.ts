export type PuyoColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | null;

export interface Position {
  row: number;
  col: number;
}

export interface Puyo {
  color: PuyoColor;
  id: string;
  isClearing?: boolean;
  chainNumber?: number;
}

export interface FallingPuyo {
  main: PuyoColor;
  sub: PuyoColor;
  position: Position;
  rotation: 0 | 1 | 2 | 3; // 0: up, 1: right, 2: down, 3: left
}

export interface GameState {
  board: Puyo[][];
  currentPuyo: FallingPuyo | null;
  nextPuyo: FallingPuyo;
  score: number;
  chainCount: number;
  isGameOver: boolean;
  isPaused: boolean;
  isStarted: boolean;
  level: number;
  clearedPuyos: number;
}

export const BOARD_WIDTH = 6;
export const BOARD_HEIGHT = 13;
export const VISIBLE_HEIGHT = 12;
export const COLORS: PuyoColor[] = ['red', 'blue', 'green', 'yellow', 'purple'];

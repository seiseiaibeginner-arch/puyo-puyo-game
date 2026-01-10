# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 project using:
- **App Router** with pages in `src/app/`
- **TypeScript** with strict mode
- **Tailwind CSS v4** for styling
- **React 19**

### Import Alias

Use `@/*` to import from `src/*`:
```typescript
import { Component } from "@/components/Component";
```

### Fonts

Geist and Geist Mono fonts are configured via `next/font/google` in `layout.tsx` using CSS variables `--font-geist-sans` and `--font-geist-mono`.

---

## Puyo Puyo Game Requirements

### Overview

初代スーパーファミコン版ぷよぷよ風のレトロデザインを持つパズルゲーム。

### Game Rules

#### Board
- **サイズ**: 6列 × 13行 (上部1行は非表示のバッファ)
- **表示領域**: 6列 × 12行
- **ゲームオーバー条件**: 3列目の上部2行にぷよが積まれた場合

#### Puyo
- **色**: 5色 (赤、青、緑、黄、紫)
- **形状**: 2つのぷよが縦に連結した組ぷよ
- **消去条件**: 同色4つ以上が隣接で消去

#### Chain System
- 消去後に落下したぷよが再度4つ以上連結すると連鎖発生
- 連鎖数に応じてスコア倍率が増加 (2^(chain-1))
- スコア = 消去数 × 10 × 倍率

#### Level System
- 30個消去ごとにレベルアップ
- レベルが上がると落下速度が増加
- 落下間隔: max(100ms, 800ms - (level-1) × 50ms)

### Controls

| Input | Action |
|-------|--------|
| ← → | 左右移動 |
| ↓ | ソフトドロップ (1段落下) |
| ↑ / Space | ハードドロップ (即座に設置) |
| Z | 反時計回り回転 |
| X | 時計回り回転 |
| P / Escape | ポーズ切替 |
| R | リスタート (ゲームオーバー時のみ) |

モバイルではタッチボタンによる操作も可能。

### UI/UX Requirements

#### Visual Design (SFC Retro Style)
- 宇宙をイメージしたダーク背景 (#000020 ~ #000040)
- 星空エフェクト (瞬く星)
- パネル: 紫系グラデーション (#4A4A8C ~ #2A2A5C) + 枠線 (#8888CC)
- フォント: monospace、ゴールド (#FFD700) のテキストシャドウ
- ぷよ: SVGで描画、大きな目とハイライト付き

#### Color Palette
- **Red**: #E53935 (light: #FF6F60, dark: #AB000D)
- **Blue**: #1E88E5 (light: #6AB7FF, dark: #005CB2)
- **Green**: #43A047 (light: #76D275, dark: #00701A)
- **Yellow**: #FDD835 (light: #FFFF6B, dark: #C6A700)
- **Purple**: #8E24AA (light: #C158DC, dark: #5C007A)

#### Animations (CSS)
- `twinkle`: 星の瞬きアニメーション
- `puyo-clear`: 消去時の拡大→縮小→フェードアウト
- `chain-pop`: 連鎖表示のポップアップ

#### Panels
- **Next Panel**: 次の組ぷよを表示
- **Score Panel**: スコア (8桁0埋め)、レベル、消去数を表示
- **Controls Panel**: 操作説明 (PC) / レトロボタン (モバイル)

### File Structure

```
src/
├── app/
│   ├── page.tsx          # Entry point
│   └── layout.tsx        # Root layout with metadata
├── components/
│   ├── PuyoGame.tsx      # Main game container
│   ├── GameBoard.tsx     # Board rendering
│   ├── PuyoCell.tsx      # Individual puyo rendering
│   ├── NextPuyo.tsx      # Next piece preview
│   ├── ScorePanel.tsx    # Score/level display
│   ├── Controls.tsx      # Control hints & touch buttons
│   └── GameOverlay.tsx   # Pause/GameOver screens
├── hooks/
│   └── useGameEngine.ts  # Game logic & state management
└── types/
    └── game.ts           # TypeScript type definitions
```

### State Management

`useGameEngine` hook manages:
- `board`: 2D array of Puyo cells
- `currentPuyo`: Currently falling piece
- `nextPuyo`: Next piece preview
- `score`, `level`, `chainCount`, `clearedPuyos`
- `isGameOver`, `isPaused`

Game loop runs via `setInterval`, speed adjusts by level.

# NEXUS TTT — Master Reference Manual

> **Legendary-Grade Enterprise Tic Tac Toe System**
> Version 1.0.0 · Production-grade, zero global chaos

---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Configuration System](#2-configuration-system)
3. [Logging Framework](#3-logging-framework)
4. [Error Handling Framework](#4-error-handling-framework)
5. [Core Game Engine](#5-core-game-engine)
6. [Board Management System](#6-board-management-system)
7. [AI Framework](#7-ai-framework)
8. [Difficulty Abstraction Layer](#8-difficulty-abstraction-layer)
9. [Sound Manager](#9-sound-manager)
10. [Persistent Storage Layer](#10-persistent-storage-layer)
11. [Player Profile Manager](#11-player-profile-manager)
12. [Statistics & Analytics Engine](#12-statistics--analytics-engine)
13. [Replay System](#13-replay-system)
14. [Theme Engine](#14-theme-engine)
15. [Central State Machine](#15-central-state-machine)
16. [UI Component Framework](#16-ui-component-framework)
17. [Root Application Orchestrator](#17-root-application-orchestrator)

---

## 1. System Architecture Overview

NEXUS TTT is a single-file React application composed of 16 modular subsystems. The architecture follows a strict separation of concerns: pure game logic, AI computation, data persistence, and UI rendering are isolated into independent, testable units. No subsystem directly mutates another's state. Communication flows through a central `useReducer` state machine and singleton service instances.

### Architecture Layers

```
┌─────────────────────────────────────────────────┐
│           SECTION 16 — Root Orchestrator        │
│   (Subsystem init, persistence wiring, render)  │
├─────────────────────────────────────────────────┤
│           SECTION 15 — UI Components            │
│   (Theme-aware React presentation layer)        │
├─────────────────────────────────────────────────┤
│           SECTION 14 — State Machine            │
│   (useReducer central state + action dispatch)  │
├────────┬──────────┬─────────┬──────────┬────────┤
│  13    │   12     │   11    │   10     │   09   │
│ Theme  │ Replay   │ Stats   │ Storage  │ Sound  │
│ Engine │ System   │ Engine  │ Manager  │ Manager│
├────────┴──────────┴─────────┴──────────┴────────┤
│           SECTION 08 — AI Controller            │
│   (Difficulty abstraction + async orchestration) │
├─────────────────────────────────────────────────┤
│           SECTION 07 — AI Framework             │
│   (Minimax α-β / Heuristic / Weighted Random)   │
├─────────────────────────────────────────────────┤
│           SECTION 06 — Board Manager            │
│   (Mutable board state + undo history)          │
├─────────────────────────────────────────────────┤
│           SECTION 05 — Game Engine              │
│   (Pure functional game logic, zero UI)         │
├─────────────────────────────────────────────────┤
│   04 — Error Handling  │  03 — Logging  │  02  │
├────────────────────────┼─────────────────┼──────┤
│          SECTION 01 — Configuration System      │
│   (Immutable constants, enums, theme tokens)    │
└─────────────────────────────────────────────────┘
```

### Dependency Flow

- **Configuration** is consumed by all subsystems. No magic values exist outside `APP_CONFIG`.
- **Logging** and **Error Handling** are cross-cutting concerns used throughout.
- **Game Engine** is a pure static class — no instantiation, no side effects.
- **AI Framework** consumes only `GameEngine` methods; it never touches the DOM.
- **State Machine** is the sole source of truth for the UI; components dispatch actions and never call business logic directly.

---

## 2. Configuration System

**Location:** Section 01 · Lines 32–131

The configuration system is the single source of truth for all application constants. Every value that would otherwise be a "magic number" is declared here as a frozen, immutable property.

### Global Configuration

```js
APP_CONFIG = Object.freeze({
  version: "1.0.0",
  schemaVersion: 2,
  appName: "NEXUS TTT",
  maxReplayHistory: 50,
  aiThinkingDelayMs: { easy: 500, medium: 750, hard: 1100 },
  animationDurationMs: {
    cellReveal: 350, winLine: 600, boardReset: 400,
    screenTransition: 500, replayStep: 700,
  },
  sounds: { enabled: true, volume: 0.4 },
  defaultTheme: "dark",
  defaultDifficulty: "medium",
  defaultGameMode: "vs-ai",
  storageKey: "nexus_ttt_v2",
  storageBackupKey: "nexus_ttt_backup",
});
```

### Enum Definitions

| Enum | Values | Purpose |
|------|--------|---------|
| `GAME_MODES` | `VS_AI`, `VS_HUMAN`, `AI_VS_AI` | Game mode identifiers |
| `DIFFICULTY` | `EASY`, `MEDIUM`, `HARD` | AI difficulty tiers |
| `PLAYER` | `X`, `O`, `NONE` | Player marker identifiers |

### Board Geometry

- `CELL_COUNT = 9` — total cells on the board.
- `BOARD_SIZE = 3` — grid dimension (3×3).
- `WIN_PATTERNS` — all 8 winning index sets (3 rows, 3 columns, 2 diagonals).
- `MOVE_PRIORITY = [4, 0, 2, 6, 8, 1, 3, 5, 7]` — center → corners → edges ordering for minimax move evaluation.

### Theme Token System

Three theme palettes are defined, each providing a complete design-system token set:

| Theme | Name | Character |
|-------|------|-----------|
| `dark` | Obsidian | Deep black background, gold accent |
| `light` | Ivory | Warm parchment surface, brown accent |
| `neon` | Synthwave | Ultra-dark purple, magenta/cyan players |

Each theme defines 19 tokens: `bg`, `surface`, `surfaceAlt`, `border`, `accent`, `accentLight`, `accentDark`, `text`, `textMuted`, `textDim`, `playerX`, `playerO`, `win`, `gridLine`, `cellHover`, `shadow`, `glow`, `particleColor`.

---

## 3. Logging Framework

**Location:** Section 02 · Lines 133–189

A structured, levelled, context-tagged logging system. Each subsystem receives its own `Logger` instance, maintaining a rolling in-memory history of up to 250 entries.

### Log Levels

| Level | Value | Use Case |
|-------|-------|----------|
| `DEBUG` | 0 | Verbose operational traces (filtered in production) |
| `INFO` | 1 | Normal operational events |
| `WARN` | 2 | Recoverable anomalies |
| `ERROR` | 3 | Exceptional conditions |

### Logger Instances

```js
const LOG = Object.freeze({
  engine:  new Logger("GameEngine"),
  ai:      new Logger("AIFramework"),
  storage: new Logger("Storage"),
  ui:      new Logger("UI"),
  replay:  new Logger("Replay"),
  sound:   new Logger("Sound"),
  stats:   new Logger("Stats"),
  app:     new Logger("App"),
});
```

### Output Format

Each log entry emits a formatted console message with a timestamp (ISO 8601, millisecond precision), module tag, and color-coded severity label. The internal history buffer stores `{ ts, level, module, msg, data }` objects for programmatic access via `getHistory()`.

---

## 4. Error Handling Framework

**Location:** Section 03 · Lines 191–243

Typed application errors with machine-readable codes, diagnostic context, and timestamps. The framework provides a `safeExecute` utility for wrapping risky operations with structured fallback behavior.

### AppError

Extends `Error` with:
- `code` — machine-readable error code (e.g., `E001`)
- `context` — additional diagnostic metadata
- `timestamp` — creation time as Unix ms

### Error Code Registry

| Code | Identifier | Description |
|------|------------|-------------|
| E001 | `STORAGE_READ` | Failed to read from localStorage |
| E002 | `STORAGE_WRITE` | Failed to write to localStorage |
| E003 | `STORAGE_CORRUPT` | Both primary and backup storage corrupted |
| E004 | `AI_COMPUTE` | AI strategy computation failure |
| E005 | `REPLAY_INVALID` | Invalid replay data encountered |
| E006 | `PROFILE_MISS` | Player profile not found |
| E007 | `MOVE_INVALID` | Attempt to place on occupied cell |

### safeExecute

```
safeExecute(fn, fallback, code, logger) → T
```

Wraps a function in a try/catch. On failure, wraps the original error in an `AppError`, logs it via the provided `Logger`, and returns the caller-supplied `fallback`. This is used pervasively across storage, AI, and sound subsystems to prevent uncaught exceptions from crashing the application.

---

## 5. Core Game Engine

**Location:** Section 04 · Lines 245–381

Pure functional game logic with zero UI coupling. All methods are static — the engine has no mutable state. This design makes every operation deterministic and independently testable.

### API Reference

| Method | Signature | Description |
|--------|-----------|-------------|
| `checkWin` | `(board, player) → { won, pattern }` | Tests all 8 win patterns for the given player |
| `checkDraw` | `(board) → boolean` | Returns `true` if no empty cells remain |
| `getEmptyCells` | `(board) → number[]` | Collects indices of all unoccupied cells |
| `getOpponent` | `(player) → string` | Returns `O` for `X` and vice versa |
| `createEmptyBoard` | `() → Array<null>` | Allocates a fresh 9-cell board |
| `applyMove` | `(board, index, player) → Array` | Immutably applies a move; throws `AppError` if cell occupied |
| `evaluateBoard` | `(board) → { status, winner, winPattern }` | Full board state evaluation |
| `countThreats` | `(board, player) → number` | Counts lines with 2 pieces + 1 empty (used by Medium AI) |
| `heuristicScore` | `(board, player) → number` | Positional scoring heuristic (center = +3, corners = +1, threats = +10) |

### Board Representation

The board is a flat 9-element array indexed 0–8:

```
 0 │ 1 │ 2
───┼───┼───
 3 │ 4 │ 5
───┼───┼───
 6 │ 7 │ 8
```

Each cell is either `PLAYER.X` (`"X"`), `PLAYER.O` (`"O"`), or `PLAYER.NONE` (`null`).

### Immutable Move Application

`applyMove` creates a shallow copy of the board array before placing the marker, preserving immutability. This ensures the original board is never mutated — critical for the AI's minimax tree traversal.

---

## 6. Board Management System

**Location:** Section 05 · Lines 383–454

Encapsulates mutable board state, move history, and undo capability. Provides a clean API for the game loop while maintaining snapshot-based history for undo support.

### Core State

| Property | Type | Description |
|----------|------|-------------|
| `board` | `Array<string\|null>` | Current board state |
| `history` | `Array<{ board, player, index, ts }>` | Snapshot history for undo |
| `currentPlayer` | `string` | Active player marker |
| `moveCount` | `number` | Total moves made |

### Operations

- **`makeMove(index)`** — Takes a snapshot of the current board, applies the move via `GameEngine.applyMove`, appends to history, and toggles the active player.
- **`undoMove()`** — Pops the last snapshot from history and restores the board to its prior state.
- **`getState()`** — Returns a read-only copy of the current board state.
- **`getMoveLog()`** — Returns the compressed move log (player + index + timestamp).

---

## 7. AI Framework

**Location:** Section 06 · Lines 456–658

Three pluggable strategy implementations, each conforming to a common interface: `getBestMove(board, aiPlayer) → number`.

### 7.1 Transposition Table

A memoization cache for minimax. Encodes board state + maximizing player into a compact string key (`board.join("") + "1"/"0"`). Tracks hit/miss statistics for diagnostics.

```
diagnostics() → { size, hits, misses, hitRate }
```

### 7.2 Hard AI — Minimax α-β + Memo

**Algorithm:** Minimax with alpha-beta pruning and transposition table memoization.

**Behavior:**
- Provably optimal — cannot be defeated.
- Move ordering: center → corners → edges (reduces tree depth via early cutoffs).
- Depth-aware scoring: `10 - depth` for AI wins, `depth - 10` for opponent wins, `0` for draws.
- Evaluates all possible moves and selects the one with the highest minimax score.

**Key implementation details:**
- Alpha-beta cutoffs: `if (beta <= alpha) break;`
- Transposition table lookups before recursion to skip redundant subtrees.
- Full game tree exploration for 3×3 board (at most 9! = 362,880 leaf nodes, practically far fewer with pruning).

### 7.3 Medium AI — Heuristic + Noise

**Algorithm:** Rule-based priority system with probabilistic error injection.

**Decision cascade:**
1. Take immediate win if available (100%).
2. Block opponent's winning move (88% probability — intentionally imperfect).
3. Random mistake injection (22% chance of suboptimal play).
4. Strategic fallback: center → corner → random.

**Design rationale:** Creates a beatable opponent that rewards careful play while remaining engaging.

### 7.4 Easy AI — Weighted Random

**Algorithm:** Weighted random selection with minimal tactical awareness.

- 30% chance to detect and take an immediate win.
- Center cell receives 2× weight compared to edge/corner cells.
- Weighted random selection via cumulative probability walk.

---

## 8. Difficulty Abstraction Layer

**Location:** Section 07 · Lines 660–716

Factory + async orchestration for AI strategy selection. The `AIController` manages strategy instantiation and provides a unified async interface.

### AIController

| Property | Type | Description |
|----------|------|-------------|
| `_strategies` | `Record<DIFFICULTY, Strategy>` | Strategy instances keyed by difficulty |

### computeMove

```
computeMove(board, player, difficulty) → Promise<number>
```

- Resolves the appropriate strategy from `_strategies`.
- Applies a deliberate UX thinking delay (500ms easy / 750ms medium / 1100ms hard).
- Wraps strategy execution in `safeExecute` for error resilience.
- Returns the selected cell index asynchronously, ensuring the UI thread is never blocked.

### Singleton

```js
const aiController = new AIController();
```

---

## 9. Sound Manager

**Location:** Section 08 · Lines 718–834

Procedural Web Audio API sound synthesis. No external audio files are used — all tones are generated at runtime using oscillator nodes and gain envelopes.

### Architecture

- Initializes a single `AudioContext` (with `webkitAudioContext` fallback).
- Manages suspended context resumption for browser autoplay policies.
- All sounds are synthesized via a private `_tone()` method implementing a simplified ADSR envelope.

### ADSR Envelope Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `frequency` | 440 Hz | Oscillator frequency |
| `type` | `"sine"` | Waveform type (sine, triangle, sawtooth) |
| `duration` | 0.15s | Total tone duration |
| `gain` | 0.3 | Peak volume multiplier |
| `attack` | 0.01s | Fade-in time |
| `decay` | 0.05s | Decay to sustain level |
| `sustain` | 0.6 | Sustain amplitude ratio |
| `release` | 0.06s | Fade-out time |

### Sound Events

| Method | Description | Technique |
|--------|-------------|-----------|
| `playHover()` | Soft hover tick | 680 Hz sine, 50ms, very quiet |
| `playMove(player)` | Player move placement | Triangle wave; X = 466 Hz, O = 349 Hz |
| `playWin()` | Ascending fanfare | Four-note sequence: C5 → E5 → G5 → C6 |
| `playDraw()` | Descending tones | Three-note sawtooth: E4 → D4 → C4 |
| `playUndo()` | Step-back tone | 280 Hz triangle |
| `playReset()` | New game chime | Two-note sequence: G4 → C5 |
| `playThemeChange()` | Theme switch swish | 800 Hz sine, 120ms |

---

## 10. Persistent Storage Layer

**Location:** Section 09 · Lines 836–949

Versioned JSON schema with automatic backup and corruption recovery. All data is persisted via `localStorage` with debounced auto-saves.

### Data Schema

```js
{
  statistics: { ... },
  profiles: { ... },
  replays: [ ... ],
  settings: {
    theme: "dark",
    difficulty: "medium",
    gameMode: "vs-ai",
    soundEnabled: true,
    volume: 0.4,
    playerNames: { X: "Player 1", O: "Player 2" },
  },
  schemaVersion: 2,
  savedAt: <timestamp>,
}
```

### Storage Strategy

- **Primary key:** `nexus_ttt_v2`
- **Backup key:** `nexus_ttt_backup`
- **Save operation:** Before writing, the current primary data is copied to the backup key, then the new data overwrites the primary.
- **Load operation:** Attempts primary read → JSON parse → migrate. On parse failure, falls back to backup. On backup failure, returns defaults.
- **Migration:** Non-destructive — only adds missing fields from `defaultData()` to existing data.

### Statistics Default Schema

```js
{
  totalGames: 0,
  wins: { X: 0, O: 0 },
  draws: 0,
  byDifficulty: {
    easy:   { wins: 0, losses: 0, draws: 0 },
    medium: { wins: 0, losses: 0, draws: 0 },
    hard:   { wins: 0, losses: 0, draws: 0 },
  },
  streaks: { current: 0, best: 0 },
  totalMoves: 0,
  averageMovesPerGame: 0,
}
```

---

## 11. Player Profile Manager

**Location:** Section 10 · Lines 951–1001

Per-player identity, symbol association, and rolling statistics. Profiles are keyed by a unique ID string.

### Profile Structure

```js
{
  id: string,
  name: string,
  symbol: "X" | "O",
  createdAt: number,  // Unix ms
  stats: {
    wins: 0,
    losses: 0,
    draws: 0,
    totalGames: 0,
    winRate: 0,       // Derived percentage
  },
}
```

### Operations

- **`createProfile(id, name, symbol)`** — Creates a new profile; returns existing if ID already exists.
- **`updateStats(id, result)`** — Increments the appropriate counter (`win`/`loss`/`draw`) and recalculates `winRate`.
- **`getProfile(id)`** — Returns a single profile or `null`.
- **`getAll()`** — Returns all profiles as an array.

---

## 12. Statistics & Analytics Engine

**Location:** Section 11 · Lines 1003–1067

Tracks game outcomes, difficulty-specific performance, and win streaks. Supports derivation of win rates and per-difficulty breakdowns.

### recordGame

```
recordGame({ winner, gameMode, difficulty, moveCount })
```

Updates the following counters:
- `totalGames` — incremented on every game.
- `totalMoves` / `averageMovesPerGame` — cumulative move tracking.
- `wins[winner]` — incremented when a winner exists.
- `byDifficulty[difficulty]` — tracks wins/losses/draws per difficulty tier (only in `VS_AI` mode).
- `streaks.current` — incremented on human wins, reset on losses/draws.
- `streaks.best` — tracks the all-time best consecutive win streak.

### Derived Metrics

- **`winRate(player)`** — Returns the win percentage (0–100) for the given player marker.
- **`getSummary()`** — Returns a complete analytics snapshot including win rates, difficulty breakdowns, and streak data.

---

## 13. Replay System

**Location:** Section 12 · Lines 1069–1147

Records every move during a game session and supports frame-by-frame board reconstruction for playback.

### Recording Lifecycle

1. **`startRecording(meta)`** — Initializes a new replay record with metadata (game mode, difficulty, player names).
2. **`recordMove(player, index)`** — Appends each move to the active recording with a timestamp.
3. **`stopRecording(result)`** — Finalizes the recording with the game result and prepends it to the replay history.

### Replay Record Structure

```js
{
  id: "rpl_<timestamp>",
  gameMode: string,
  difficulty: string,
  playerNames: { X, O },
  moves: [{ player, index, ts }, ...],
  startTime: number,
  endTime: number,
  duration: number,      // Computed on stop
  result: { winner },    // null for draw
}
```

### Playback

- **`ReplaySystem.getBoardAtFrame(replay, frame)`** — Reconstructs the board state at any frame by replaying moves 0 through `frame - 1` onto a fresh board.
- Supports up to `APP_CONFIG.maxReplayHistory` (50) stored replays.
- Older replays are evicted FIFO when the limit is exceeded.

---

## 14. Theme Engine

**Location:** Section 13 · Lines 1149–1185

Manages active theme selection and CSS custom property injection into the DOM.

### Operations

- **`setTheme(id)`** — Switches the active theme by ID.
- **`getTheme()`** — Returns the current theme object.
- **`getAllThemes()`** — Returns all available themes as an array.
- **`applyToElement(el)`** — Injects 12 CSS custom properties (`--bg`, `--surface`, `--border`, `--accent`, `--text`, etc.) onto the specified DOM element.

### CSS Variable Mapping

| Variable | Theme Token |
|----------|-------------|
| `--bg` | Background color |
| `--surface` | Card/panel background |
| `--surface-alt` | Alternate surface |
| `--border` | Border/divider color |
| `--accent` | Primary accent color |
| `--text` | Primary text color |
| `--text-muted` | Secondary text color |
| `--player-x` | Player X marker color |
| `--player-o` | Player O marker color |
| `--win` | Victory highlight color |
| `--shadow` | Box shadow color |
| `--glow` | Glow effect color |

---

## 15. Central State Machine

**Location:** Section 14 · Lines 1187–1322

A `useReducer`-powered central state machine. All state mutations are pure, predictable, and traceable through dispatched actions.

### Initial State

```js
{
  screen: "menu",
  gameMode: GAME_MODES.VS_AI,
  difficulty: DIFFICULTY.MEDIUM,
  theme: "dark",
  board: [null × 9],
  currentPlayer: "X",
  gameStatus: "idle",
  winner: null,
  winPattern: null,
  isAIThinking: false,
  moveCount: 0,
  cellAnimations: [false × 9],
  recentlyPlaced: null,
  playerNames: { X: "Player 1", O: "Player 2" },
  soundEnabled: true,
  volume: 0.4,
  statistics: <freshStats>,
  replays: [],
  winCelebration: false,
  moveHistory: [],
}
```

### Action Types

| Action | Payload | Behavior |
|--------|---------|----------|
| `NAVIGATE` | `{ screen }` | Switches the active screen |
| `SET_GAME_MODE` | `{ mode }` | Updates the game mode |
| `SET_DIFFICULTY` | `{ difficulty }` | Updates difficulty setting |
| `SET_THEME` | `{ theme }` | Switches visual theme |
| `SET_SOUND` | `{ enabled }` | Toggles sound effects |
| `SET_VOLUME` | `{ volume }` | Adjusts audio volume |
| `SET_PLAYER_NAME` | `{ player, name }` | Updates player display name |
| `GAME_START` | — | Resets board, starts new game |
| `MAKE_MOVE` | `{ index, player }` | Applies a move, evaluates board state |
| `UNDO_MOVE` | — | Reverts 1 move (2 in VS_AI mode) |
| `AI_THINKING` | `{ thinking }` | Toggles AI computation indicator |
| `UPDATE_STATISTICS` | `{ statistics }` | Replaces statistics block |
| `SET_REPLAYS` | `{ replays }` | Replaces replay list |
| `CLEAR_WIN_CELEBRATION` | — | Dismisses end-of-game overlay |

### Undo Logic

In `VS_AI` mode, undo removes 2 moves (the human's last move and the AI's response) to maintain proper turn alternation. In `VS_HUMAN` mode, only 1 move is undone.

### Board Reconstruction from History

The `UNDO_MOVE` action reconstructs the board by replaying the truncated `moveHistory` array onto a fresh board via `buildBoardFromHistory()`.

---

## 16. UI Component Framework

**Location:** Section 15 · Lines 1324–2285

Modular, theme-aware React components with strict separation of presentation from game logic.

### Component Inventory

| Component | Purpose | Notable Details |
|-----------|---------|-----------------|
| `BackgroundParticles` | Atmospheric floating particles | 14 particles with randomized size, position, delay, duration; CSS keyframe animation |
| `ThinkingDots` | AI computation indicator | Three animated dots with staggered delays |
| `Btn` | Multi-variant action button | Supports `primary`, `small`, `danger`, `disabled` variants with hover state |
| `NavBtn` | Navigation tab button | Active state highlighting with accent color |
| `GameCell` | Individual board cell | Pop animation on placement, pulse glow on win cells, hover sound trigger |
| `GameBoard` | 3×3 grid container | CSS Grid layout, theme-aware border/shadow, responsive sizing |
| `StatusBanner` | Game state display | Dynamic message for turns, wins, draws, AI thinking |
| `ScorePanel` | Win/draw score display | Three-column layout with player names and counters |
| `DiffBadge` | Difficulty indicator pill | Color-coded (green/orange/red) with dot indicator |
| `EndOverlay` | Victory/draw modal | Full-screen overlay with backdrop blur, play-again and menu actions |
| `AppHeader` | Top navigation bar | Logo, screen navigation buttons, sound toggle |

### Screen Components

| Screen | Description |
|--------|-------------|
| `MenuScreen` | Game mode selection, difficulty picker, player name inputs, quick stats preview |
| `GameScreen` | Active game board, status banner, score panel, move timeline, undo/new controls, end overlay |
| `StatsScreen` | Full statistics dashboard with card layout, difficulty performance breakdown |
| `ReplaysScreen` | Replay archive list with frame-by-frame viewer and playback controls |
| `SettingsScreen` | Theme selector, audio toggle/volume slider, data reset with confirmation |

### Animation System

Six CSS keyframe animations are defined:

| Animation | Name | Purpose |
|-----------|------|---------|
| Pop | `nttt-pop` | Cell marker placement (scale + rotate bounce) |
| Win Pulse | `nttt-win-pulse` | Winning cell border pulsing |
| Dot | `nttt-dot` | Thinking indicator dots |
| Fade In | `nttt-fade-in` | Overlay background fade |
| Overlay Pop | `nttt-overlay-pop` | End-of-game modal entrance |
| Particle | `nttt-particle` | Background floating particles |

### Responsive Typography

Font sizes use CSS `clamp()` for responsive scaling:
- Title: `clamp(2.8rem, 9vw, 4.5rem)`
- Cell markers: `clamp(1.8rem, 7vw, 3.6rem)`
- Status messages: `clamp(1rem, 3vw, 1.4rem)`

Primary font: `Playfair Display` (serif) with `Georgia` fallback.

---

## 17. Root Application Orchestrator

**Location:** Section 16 · Lines 2287–2487

Initializes all singleton subsystems, wires persistence, and renders the correct screen based on navigation state.

### Initialization Sequence

1. Load persisted data from `storageManager.load()`.
2. Instantiate `ThemeEngine` with stored theme preference.
3. Instantiate `StatisticsEngine` with stored statistics.
4. Hydrate `replaySystem` with persisted replay records.
5. Create `useReducer` with initial state merged from persisted settings.

### Persistence Wiring

- **Debounced auto-save:** A `useEffect` with a 600ms debounce timer saves statistics, replays, and settings to localStorage whenever any of these values change.
- **Replay recording:** `startRecording` is triggered when `gameStatus` transitions to `"playing"` with `moveCount === 0`. Each move is recorded via `recordMove` when `recentlyPlaced` changes.
- **Game end callback:** `handleGameEnd` stops replay recording, updates statistics via `statsEngine.recordGame()`, and dispatches updated state.

### Screen Routing

```jsx
{state.screen === "menu"    && <MenuScreen ... />}
{state.screen === "game"    && <GameScreen ... />}
{state.screen === "stats"   && <StatsScreen ... />}
{state.screen === "replays" && <ReplaysScreen ... />}
{state.screen === "settings"&& <SettingsScreen ... />}
```

### Global Styles

Injected via a `<style>` tag in the JSX, including:
- Google Fonts import (`Playfair Display`)
- Box-sizing reset
- All 6 keyframe animations
- Custom scrollbar styling
- Input/button tap highlight removal

---

## Appendix A: Singleton Instances

| Instance | Class | Purpose |
|----------|-------|---------|
| `LOG` | `Logger` (×8) | Per-subsystem logging |
| `aiController` | `AIController` | AI strategy orchestration |
| `soundManager` | `SoundManager` | Procedural audio synthesis |
| `storageManager` | `StorageManager` | localStorage persistence |
| `replaySystem` | `ReplaySystem` | Game recording/playback |

---

## Appendix B: Technology Stack

| Technology | Usage |
|------------|-------|
| React (Hooks) | `useState`, `useEffect`, `useCallback`, `useRef`, `useMemo`, `useReducer` |
| Web Audio API | Procedural sound synthesis (oscillator + gain node) |
| localStorage | Persistent data storage with versioned JSON schema |
| CSS Custom Properties | Dynamic theming via JS injection |
| CSS Keyframe Animations | 6 animation definitions for UI feedback |

---

*Generated from `NexusTTT.jsx` (2,487 lines) — the complete source code of the NEXUS TTT system.*

/**
 * ============================================================
 * NEXUS TTT — LEGENDARY-GRADE ENTERPRISE TIC TAC TOE SYSTEM
 * ============================================================
 *
 * Architecture:
 *   01. Configuration System
 *   02. Logging Framework
 *   03. Error Handling Framework
 *   04. Core Game Engine
 *   05. Board Management System
 *   06. AI Framework (Minimax α-β / Heuristic / Weighted Random)
 *   07. Difficulty Abstraction Layer
 *   08. Sound Manager (Web Audio API)
 *   09. Persistent Storage Layer (versioned JSON + backup)
 *   10. Player Profile Manager
 *   11. Statistics & Analytics Engine
 *   12. Replay System (record + playback)
 *   13. Theme Engine (Obsidian / Ivory / Synthwave)
 *   14. Central State Machine (useReducer)
 *   15. UI Component Framework
 *   16. Root Application Orchestrator
 *
 * @version     1.0.0
 * @author      Senior Engineering Division
 * @standard    Production-grade, zero global chaos
 * ============================================================
 */

import { useState, useEffect, useCallback, useRef, useMemo, useReducer } from "react";

// ============================================================
// SECTION 01 — CONFIGURATION SYSTEM
// Single source of truth for all application constants.
// No magic values anywhere else in the codebase.
// ============================================================

/** @type {Readonly<AppConfig>} Immutable global application configuration */
const APP_CONFIG = Object.freeze({
  version: "1.0.0",
  schemaVersion: 2,
  appName: "NEXUS TTT",
  maxReplayHistory: 50,
  /** AI thinking delay in ms per difficulty — deliberate UX pause */
  aiThinkingDelayMs: { easy: 500, medium: 750, hard: 1100 },
  animationDurationMs: {
    cellReveal: 350,
    winLine: 600,
    boardReset: 400,
    screenTransition: 500,
    replayStep: 700,
  },
  sounds: { enabled: true, volume: 0.4 },
  defaultTheme: "dark",
  defaultDifficulty: "medium",
  defaultGameMode: "vs-ai",
  storageKey: "nexus_ttt_v2",
  storageBackupKey: "nexus_ttt_backup",
});

/** Enum: Game mode identifiers */
const GAME_MODES = Object.freeze({
  VS_AI: "vs-ai",
  VS_HUMAN: "vs-human",
  AI_VS_AI: "ai-vs-ai",
});

/** Enum: Difficulty tiers */
const DIFFICULTY = Object.freeze({
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
});

/** Enum: Player markers */
const PLAYER = Object.freeze({
  X: "X",
  O: "O",
  NONE: null,
});

/** Board geometry constants */
const CELL_COUNT = 9;
const BOARD_SIZE = 3;

/** All 8 winning line patterns (row / col / diagonal index sets) */
const WIN_PATTERNS = Object.freeze([
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
]);

/** Move ordering for minimax: center → corners → edges */
const MOVE_PRIORITY = Object.freeze([4, 0, 2, 6, 8, 1, 3, 5, 7]);

/**
 * Theme palette definitions.
 * Each theme provides a complete design-system token set.
 */
const THEMES = Object.freeze({
  dark: {
    id: "dark", name: "Obsidian",
    bg: "#08080f", surface: "#10101c", surfaceAlt: "#18182a",
    border: "#252538", accent: "#c9a84c", accentLight: "#f0c96a", accentDark: "#8a6f2e",
    text: "#e6e6f0", textMuted: "#66668a", textDim: "#33334d",
    playerX: "#5b8dee", playerO: "#e85b7a", win: "#c9a84c",
    gridLine: "#1c1c2e", cellHover: "#1c1c2e",
    shadow: "rgba(201,168,76,0.12)", glow: "rgba(201,168,76,0.28)",
    particleColor: "#c9a84c",
  },
  light: {
    id: "light", name: "Ivory",
    bg: "#f4efe6", surface: "#ffffff", surfaceAlt: "#faf5ec",
    border: "#d8cbb8", accent: "#8b5e3c", accentLight: "#b07d52", accentDark: "#6b4420",
    text: "#2a1f14", textMuted: "#8b7355", textDim: "#c8b59a",
    playerX: "#1d4ed8", playerO: "#dc2626", win: "#8b5e3c",
    gridLine: "#ede4d4", cellHover: "#f0e8d8",
    shadow: "rgba(139,94,60,0.12)", glow: "rgba(139,94,60,0.28)",
    particleColor: "#8b5e3c",
  },
  neon: {
    id: "neon", name: "Synthwave",
    bg: "#070012", surface: "#0d001f", surfaceAlt: "#130028",
    border: "#360070", accent: "#bf00ff", accentLight: "#e060ff", accentDark: "#8000cc",
    text: "#f0e0ff", textMuted: "#9060c0", textDim: "#3d0070",
    playerX: "#00ffcc", playerO: "#ff3399", win: "#ffff00",
    gridLine: "#180032", cellHover: "#180032",
    shadow: "rgba(191,0,255,0.18)", glow: "rgba(191,0,255,0.45)",
    particleColor: "#bf00ff",
  },
});

// ============================================================
// SECTION 02 — LOGGING FRAMEWORK
// Structured, levelled, context-tagged logging system.
// Maintains a rolling in-memory history per module.
// ============================================================

const LogLevel = Object.freeze({ DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 });

class Logger {
  /**
   * @param {string} module - Module/subsystem name for contextual tagging
   * @param {number} [minLevel=LogLevel.INFO] - Minimum severity to emit
   */
  constructor(module, minLevel = LogLevel.INFO) {
    this.module = module;
    this.minLevel = minLevel;
    /** @type {Array<{ts:number,level:number,msg:string,data:*}>} */
    this.history = [];
    this._maxHistory = 250;
  }

  _emit(level, levelName, color, msg, data) {
    const entry = { ts: Date.now(), level, module: this.module, msg, data };
    this.history.push(entry);
    if (this.history.length > this._maxHistory) this.history.shift();
    if (level < this.minLevel) return;
    const ts = new Date(entry.ts).toISOString().substring(11, 23);
    const prefix = `%c[${ts}][${this.module}] ${levelName}:`;
    data !== undefined
      ? console.log(prefix, `color:${color};font-weight:bold`, msg, data)
      : console.log(prefix, `color:${color};font-weight:bold`, msg);
  }

  /** Log a debug-level message (verbose, filtered in production) */
  debug(msg, data) { this._emit(LogLevel.DEBUG, "DEBUG", "#888888", msg, data); }
  /** Log an info-level message (normal operational events) */
  info(msg, data)  { this._emit(LogLevel.INFO,  "INFO ", "#44aaff", msg, data); }
  /** Log a warning (recoverable anomaly) */
  warn(msg, data)  { this._emit(LogLevel.WARN,  "WARN ", "#ffaa44", msg, data); }
  /** Log an error (exceptional condition) */
  error(msg, data) { this._emit(LogLevel.ERROR, "ERROR", "#ff4444", msg, data); }

  /** Return a copy of the rolling history buffer */
  getHistory() { return [...this.history]; }
}

/** Singleton logger instances per subsystem */
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

// ============================================================
// SECTION 03 — ERROR HANDLING FRAMEWORK
// Typed application errors with codes, context, and timestamps.
// safeExecute wraps risky operations with structured fallback.
// ============================================================

/** Structured application error with code + context */
class AppError extends Error {
  /**
   * @param {string} code    - Machine-readable error code
   * @param {string} message - Human-readable description
   * @param {Object} [ctx]   - Additional diagnostic context
   */
  constructor(code, message, ctx = {}) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.context = ctx;
    this.timestamp = Date.now();
  }
}

/** Error code registry */
const ErrorCodes = Object.freeze({
  STORAGE_READ:    "E001",
  STORAGE_WRITE:   "E002",
  STORAGE_CORRUPT: "E003",
  AI_COMPUTE:      "E004",
  REPLAY_INVALID:  "E005",
  PROFILE_MISS:    "E006",
  MOVE_INVALID:    "E007",
});

/**
 * Safely executes a function, catching any thrown errors.
 * Logs the failure and returns a caller-supplied fallback value.
 *
 * @template T
 * @param {() => T}    fn        - Operation to attempt
 * @param {T}          fallback  - Return value on failure
 * @param {string}     code      - ErrorCode for logging
 * @param {Logger}     logger    - Logger instance to record failure
 * @returns {T}
 */
function safeExecute(fn, fallback, code, logger) {
  try {
    return fn();
  } catch (err) {
    const appErr = new AppError(code, err?.message ?? String(err), { original: err });
    logger.error(`[${code}] ${appErr.message}`, appErr.context);
    return fallback;
  }
}

// ============================================================
// SECTION 04 — CORE GAME ENGINE
// Pure functional game logic. Zero UI coupling.
// All methods are static — engine has no mutable state.
// ============================================================

class GameEngine {
  /**
   * Checks if a player has a winning pattern on the board.
   * @param {Array<string|null>} board
   * @param {string} player - PLAYER.X or PLAYER.O
   * @returns {{ won: boolean, pattern: number[]|null }}
   */
  static checkWin(board, player) {
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (board[a] === player && board[b] === player && board[c] === player) {
        LOG.engine.debug(`Win: ${player}`, { pattern });
        return { won: true, pattern };
      }
    }
    return { won: false, pattern: null };
  }

  /**
   * Returns true if no empty cells remain (potential draw).
   * @param {Array<string|null>} board
   * @returns {boolean}
   */
  static checkDraw(board) {
    return board.every((cell) => cell !== PLAYER.NONE);
  }

  /**
   * Collects indices of all unoccupied cells.
   * @param {Array<string|null>} board
   * @returns {number[]}
   */
  static getEmptyCells(board) {
    return board.reduce((acc, cell, i) => (cell === PLAYER.NONE && acc.push(i), acc), []);
  }

  /**
   * Returns the opponent of the given player.
   * @param {string} player
   * @returns {string}
   */
  static getOpponent(player) {
    return player === PLAYER.X ? PLAYER.O : PLAYER.X;
  }

  /**
   * Allocates a fresh, empty 9-cell board.
   * @returns {Array<null>}
   */
  static createEmptyBoard() {
    return Array(CELL_COUNT).fill(PLAYER.NONE);
  }

  /**
   * Immutably applies a move, returning a new board.
   * Throws AppError if the target cell is occupied.
   * @param {Array<string|null>} board
   * @param {number} index - Target cell [0–8]
   * @param {string} player
   * @returns {Array<string|null>}
   */
  static applyMove(board, index, player) {
    if (board[index] !== PLAYER.NONE) {
      throw new AppError(ErrorCodes.MOVE_INVALID, "Cell occupied", { index, player });
    }
    const next = [...board];
    next[index] = player;
    return next;
  }

  /**
   * Evaluates the full board state.
   * @param {Array<string|null>} board
   * @returns {{ status: "playing"|"win"|"draw", winner: string|null, winPattern: number[]|null }}
   */
  static evaluateBoard(board) {
    for (const p of [PLAYER.X, PLAYER.O]) {
      const { won, pattern } = GameEngine.checkWin(board, p);
      if (won) return { status: "win", winner: p, winPattern: pattern };
    }
    if (GameEngine.checkDraw(board)) {
      return { status: "draw", winner: null, winPattern: null };
    }
    return { status: "playing", winner: null, winPattern: null };
  }

  /**
   * Counts lines where a player has two pieces and one empty cell (threats).
   * Used for medium AI heuristic scoring.
   * @param {Array<string|null>} board
   * @param {string} player
   * @returns {number}
   */
  static countThreats(board, player) {
    let threats = 0;
    for (const pattern of WIN_PATTERNS) {
      const cells = pattern.map((i) => board[i]);
      if (
        cells.filter((c) => c === player).length === 2 &&
        cells.filter((c) => c === PLAYER.NONE).length === 1
      ) threats++;
    }
    return threats;
  }

  /**
   * Heuristic positional score for a board.
   * Positive = better for `player`, negative = worse.
   * @param {Array<string|null>} board
   * @param {string} player
   * @returns {number}
   */
  static heuristicScore(board, player) {
    const opp = GameEngine.getOpponent(player);
    let score = 0;
    for (const pattern of WIN_PATTERNS) {
      const cells = pattern.map((i) => board[i]);
      const pc = cells.filter((c) => c === player).length;
      const oc = cells.filter((c) => c === opp).length;
      if (oc === 0) score += pc === 2 ? 10 : pc === 1 ? 1 : 0;
      if (pc === 0) score -= oc === 2 ? 10 : oc === 1 ? 1 : 0;
    }
    if (board[4] === player) score += 3;
    if (board[4] === opp)    score -= 3;
    [0, 2, 6, 8].forEach((i) => {
      if (board[i] === player) score += 1;
      if (board[i] === opp)    score -= 1;
    });
    return score;
  }
}

// ============================================================
// SECTION 05 — BOARD MANAGEMENT SYSTEM
// Encapsulates mutable board state, move history, and undo.
// Provides a clean API for the game loop to interact with.
// ============================================================

class BoardManager {
  constructor() {
    this._reset();
    LOG.engine.info("BoardManager online");
  }

  _reset() {
    /** @type {Array<string|null>} */
    this.board = GameEngine.createEmptyBoard();
    /**
     * @type {Array<{board: Array<string|null>, player: string, index: number, ts: number}>}
     * Snapshot history for undo support
     */
    this.history = [];
    this.currentPlayer = PLAYER.X;
    this.moveCount = 0;
  }

  /** Resets board to initial state */
  reset() { this._reset(); }

  /**
   * Applies a move for the current player.
   * @param {number} index - Target cell index
   * @returns {boolean} true if move was applied, false if cell occupied
   */
  makeMove(index) {
    if (this.board[index] !== PLAYER.NONE) return false;
    const snapshot = [...this.board];
    this.board = GameEngine.applyMove(this.board, index, this.currentPlayer);
    this.history.push({ board: snapshot, player: this.currentPlayer, index, ts: Date.now() });
    this.moveCount++;
    LOG.engine.debug(`Move: ${this.currentPlayer}@${index} (#${this.moveCount})`);
    this.currentPlayer = GameEngine.getOpponent(this.currentPlayer);
    return true;
  }

  /**
   * Reverts the last move (restores board snapshot).
   * @returns {boolean} true if undo succeeded
   */
  undoMove() {
    if (this.history.length === 0) return false;
    const last = this.history.pop();
    this.board = last.board;
    this.currentPlayer = last.player;
    this.moveCount--;
    LOG.engine.debug(`Undo: back to move #${this.moveCount}`);
    return true;
  }

  /** Returns current board state snapshot (read-only copy) */
  getState() {
    return {
      board: [...this.board],
      currentPlayer: this.currentPlayer,
      moveCount: this.moveCount,
      historyDepth: this.history.length,
    };
  }

  /** Returns the compressed move log (player + index pairs) */
  getMoveLog() {
    return this.history.map(({ player, index, ts }) => ({ player, index, ts }));
  }
}

// ============================================================
// SECTION 06 — AI FRAMEWORK
// Three pluggable strategy implementations.
//
// HardAIStrategy  — Minimax with α-β pruning + memoization cache
// MediumAIStrategy — Heuristic + probabilistic mistake injection
// EasyAIStrategy   — Weighted random with occasional awareness
// ============================================================

/** LRU-style transposition table for minimax memoization */
class TranspositionTable {
  constructor() {
    this._table = new Map();
    this._hits = 0;
    this._misses = 0;
  }

  /** Encode board + active player into a compact string key */
  key(board, isMaximizing) {
    return board.join("") + (isMaximizing ? "1" : "0");
  }

  get(k) {
    if (this._table.has(k)) { this._hits++; return this._table.get(k); }
    this._misses++;
    return undefined;
  }

  set(k, v) { this._table.set(k, v); }

  reset() { this._table.clear(); this._hits = 0; this._misses = 0; }

  /** @returns {{ size: number, hits: number, misses: number, hitRate: string }} */
  diagnostics() {
    const total = this._hits + this._misses;
    return {
      size: this._table.size,
      hits: this._hits,
      misses: this._misses,
      hitRate: total ? `${((this._hits / total) * 100).toFixed(1)}%` : "n/a",
    };
  }
}

/**
 * Hard AI — Provably optimal via minimax with α-β pruning.
 * Cannot be defeated. Uses a transposition table for speed.
 */
class HardAIStrategy {
  constructor() {
    this.name = "Minimax α-β + Memo";
    this._tt = new TranspositionTable();
  }

  /**
   * Selects the best move for `aiPlayer` on `board`.
   * @param {Array<string|null>} board
   * @param {string} aiPlayer
   * @returns {number} Cell index
   */
  getBestMove(board, aiPlayer) {
    this._tt.reset();
    const opponent = GameEngine.getOpponent(aiPlayer);
    let bestScore = -Infinity;
    let bestMove = -1;

    const moves = this._orderMoves(GameEngine.getEmptyCells(board));
    for (const idx of moves) {
      const next = GameEngine.applyMove(board, idx, aiPlayer);
      const score = this._minimax(next, 0, false, -Infinity, Infinity, aiPlayer, opponent);
      if (score > bestScore) { bestScore = score; bestMove = idx; }
    }

    LOG.ai.info("Hard decision", { bestMove, bestScore, tt: this._tt.diagnostics() });
    return bestMove;
  }

  /** Prioritize center → corners → edges for faster pruning */
  _orderMoves(moves) {
    return [...moves].sort((a, b) => MOVE_PRIORITY.indexOf(a) - MOVE_PRIORITY.indexOf(b));
  }

  _minimax(board, depth, isMaximizing, alpha, beta, aiPlayer, opponent) {
    const ttKey = this._tt.key(board, isMaximizing);
    const cached = this._tt.get(ttKey);
    if (cached !== undefined) return cached;

    const { status, winner } = GameEngine.evaluateBoard(board);
    if (status === "win") {
      const score = winner === aiPlayer ? 10 - depth : depth - 10;
      this._tt.set(ttKey, score);
      return score;
    }
    if (status === "draw") { this._tt.set(ttKey, 0); return 0; }

    const moves = this._orderMoves(GameEngine.getEmptyCells(board));
    let result;

    if (isMaximizing) {
      result = -Infinity;
      for (const idx of moves) {
        const next = GameEngine.applyMove(board, idx, aiPlayer);
        const score = this._minimax(next, depth + 1, false, alpha, beta, aiPlayer, opponent);
        result = Math.max(result, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break; // β-cutoff
      }
    } else {
      result = Infinity;
      for (const idx of moves) {
        const next = GameEngine.applyMove(board, idx, opponent);
        const score = this._minimax(next, depth + 1, true, alpha, beta, aiPlayer, opponent);
        result = Math.min(result, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break; // α-cutoff
      }
    }

    this._tt.set(ttKey, result);
    return result;
  }
}

/**
 * Medium AI — Rule-based heuristic with probabilistic error injection.
 * Competent but beatable through careful play.
 */
class MediumAIStrategy {
  constructor() {
    this.name = "Heuristic + Noise";
    this._mistakeRate = 0.22; // 22% chance of suboptimal play
    this._blockRate = 0.88;   // 88% chance to block opponent winning move
  }

  getBestMove(board, aiPlayer) {
    const opp = GameEngine.getOpponent(aiPlayer);

    // 1. Take immediate win if available
    const win = this._findImmediateWin(board, aiPlayer);
    if (win !== -1) return win;

    // 2. Block opponent win (probabilistic)
    const block = this._findImmediateWin(board, opp);
    if (block !== -1 && Math.random() < this._blockRate) return block;

    // 3. Probabilistic mistake: random move
    if (Math.random() < this._mistakeRate) {
      return this._randomMove(board);
    }

    // 4. Strategic: center → fork setup → corner → edge
    return this._strategicMove(board, aiPlayer, opp);
  }

  _findImmediateWin(board, player) {
    for (const idx of GameEngine.getEmptyCells(board)) {
      if (GameEngine.checkWin(GameEngine.applyMove(board, idx, player), player).won) return idx;
    }
    return -1;
  }

  _strategicMove(board, aiPlayer, opp) {
    const empty = GameEngine.getEmptyCells(board);
    // Center
    if (empty.includes(4)) return 4;
    // Opponent corner response
    const corners = [0, 2, 6, 8].filter((i) => empty.includes(i));
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
    return this._randomMove(board);
  }

  _randomMove(board) {
    const empty = GameEngine.getEmptyCells(board);
    return empty[Math.floor(Math.random() * empty.length)];
  }
}

/**
 * Easy AI — Weighted random with minimal tactical awareness.
 * Center preferred; 30% chance to grab an available win.
 */
class EasyAIStrategy {
  constructor() { this.name = "Weighted Random"; }

  getBestMove(board, aiPlayer) {
    const empty = GameEngine.getEmptyCells(board);
    // Occasionally take a winning move (30%)
    if (Math.random() < 0.30) {
      for (const idx of empty) {
        if (GameEngine.checkWin(GameEngine.applyMove(board, idx, aiPlayer), aiPlayer).won) return idx;
      }
    }
    // Weighted random: center cell gets 2× weight
    const weights = empty.map((i) => (i === 4 ? 2 : 1));
    const total = weights.reduce((a, b) => a + b, 0);
    let rand = Math.random() * total;
    for (let i = 0; i < empty.length; i++) {
      rand -= weights[i];
      if (rand <= 0) return empty[i];
    }
    return empty[empty.length - 1];
  }
}

// ============================================================
// SECTION 07 — DIFFICULTY ABSTRACTION LAYER
// Factory + async orchestration for AI strategy selection.
// All AI runs asynchronously to never block the UI thread.
// ============================================================

class AIController {
  constructor() {
    /** @type {Record<string, HardAIStrategy|MediumAIStrategy|EasyAIStrategy>} */
    this._strategies = {
      [DIFFICULTY.HARD]:   new HardAIStrategy(),
      [DIFFICULTY.MEDIUM]: new MediumAIStrategy(),
      [DIFFICULTY.EASY]:   new EasyAIStrategy(),
    };
    LOG.ai.info("AIController online", { strategies: Object.keys(this._strategies) });
  }

  /**
   * Asynchronously computes the best move for the given configuration.
   * Includes a deliberate thinking delay for UX realism.
   *
   * @param {Array<string|null>} board
   * @param {string} player          - The AI player marker
   * @param {string} difficulty      - DIFFICULTY enum value
   * @returns {Promise<number>}      - Selected cell index
   */
  computeMove(board, player, difficulty) {
    const strategy = this._strategies[difficulty];
    if (!strategy) {
      LOG.ai.error(`Unknown difficulty: ${difficulty}`);
      return Promise.resolve(GameEngine.getEmptyCells(board)[0] ?? -1);
    }
    const delay = APP_CONFIG.aiThinkingDelayMs[difficulty] ?? 600;
    LOG.ai.info(`Scheduling ${strategy.name} in ${delay}ms`);

    return new Promise((resolve) => {
      setTimeout(() => {
        const move = safeExecute(
          () => strategy.getBestMove(board, player),
          GameEngine.getEmptyCells(board)[0] ?? -1,
          ErrorCodes.AI_COMPUTE,
          LOG.ai
        );
        LOG.ai.info(`AI chose: ${move}`);
        resolve(move);
      }, delay);
    });
  }

  /** Returns metadata about the active strategy for diagnostics */
  getStrategyInfo(difficulty) {
    return this._strategies[difficulty]?.name ?? "unknown";
  }
}

/** Singleton AI controller instance */
const aiController = new AIController();

// ============================================================
// SECTION 08 — SOUND MANAGER
// Procedural Web Audio API sound synthesis.
// No external audio files — all tones are generated at runtime.
// ============================================================

class SoundManager {
  constructor() {
    /** @type {AudioContext|null} */
    this._ctx = null;
    this._enabled = true;
    this._volume = APP_CONFIG.sounds.volume;
    this._initContext();
    LOG.sound.info("SoundManager online");
  }

  _initContext() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this._ctx = new AC();
    } catch (e) {
      LOG.sound.warn("Web Audio API unavailable", e.message);
    }
  }

  _ensureActive() {
    if (!this._ctx || !this._enabled) return false;
    if (this._ctx.state === "suspended") {
      this._ctx.resume().catch(() => {});
    }
    return true;
  }

  /**
   * Core tone synthesizer — ADSR envelope over an oscillator.
   * @param {{ frequency?, type?, duration?, gain?, attack?, decay?, sustain?, release? }} opts
   */
  _tone({ frequency = 440, type = "sine", duration = 0.15,
          gain = 0.3, attack = 0.01, decay = 0.05, sustain = 0.6, release = 0.06 } = {}) {
    if (!this._ensureActive()) return;
    try {
      const ctx = this._ctx;
      const osc  = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      const v = this._volume * gain;
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(v, ctx.currentTime + attack);
      gainNode.gain.linearRampToValueAtTime(v * sustain, ctx.currentTime + attack + decay);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration - release);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      LOG.sound.warn("Tone failed", e.message);
    }
  }

  /** Soft hover tick */
  playHover() {
    this._tone({ frequency: 680, type: "sine", duration: 0.05, gain: 0.08 });
  }

  /** Player move placement sound — pitch differs per player */
  playMove(player) {
    const freq = player === PLAYER.X ? 466 : 349;
    this._tone({ frequency: freq, type: "triangle", duration: 0.18, gain: 0.38 });
  }

  /** Ascending fanfare on game win */
  playWin() {
    [523, 659, 784, 1047].forEach((f, i) =>
      setTimeout(() => this._tone({ frequency: f, type: "sine", duration: 0.28, gain: 0.45 }), i * 95)
    );
  }

  /** Descending tones on draw */
  playDraw() {
    [330, 294, 262].forEach((f, i) =>
      setTimeout(() => this._tone({ frequency: f, type: "sawtooth", duration: 0.32, gain: 0.2 }), i * 130)
    );
  }

  /** Undo / step-back tone */
  playUndo() {
    this._tone({ frequency: 280, type: "triangle", duration: 0.22, gain: 0.28 });
  }

  /** New game / reset chime */
  playReset() {
    this._tone({ frequency: 392, type: "sine", duration: 0.25, gain: 0.32 });
    setTimeout(() => this._tone({ frequency: 523, type: "sine", duration: 0.2, gain: 0.22 }), 110);
  }

  /** Theme change swish */
  playThemeChange() {
    this._tone({ frequency: 800, type: "sine", duration: 0.12, gain: 0.15 });
  }

  setEnabled(v) {
    this._enabled = Boolean(v);
    LOG.sound.info(`Sound ${this._enabled ? "ON" : "OFF"}`);
  }

  setVolume(v) {
    this._volume = Math.max(0, Math.min(1, v));
    LOG.sound.debug(`Volume: ${this._volume}`);
  }

  get enabled() { return this._enabled; }
  get volume()  { return this._volume; }
}

/** Singleton sound manager */
const soundManager = new SoundManager();

// ============================================================
// SECTION 09 — PERSISTENT STORAGE LAYER
// Versioned JSON schema with automatic backup + corruption recovery.
// Auto-saves are debounced; corrupt primary data falls back to backup.
// ============================================================

class StorageManager {
  constructor() {
    this._key    = APP_CONFIG.storageKey;
    this._backup = APP_CONFIG.storageBackupKey;
    this._schema = APP_CONFIG.schemaVersion;
    LOG.storage.info("StorageManager online", { key: this._key });
  }

  /** @returns {StoredData} Default data structure */
  static defaultData() {
    return {
      statistics: StorageManager.freshStats(),
      profiles:   {},
      replays:    [],
      settings: {
        theme:      APP_CONFIG.defaultTheme,
        difficulty: APP_CONFIG.defaultDifficulty,
        gameMode:   APP_CONFIG.defaultGameMode,
        soundEnabled: true,
        volume:     APP_CONFIG.sounds.volume,
        playerNames: { X: "Player 1", O: "Player 2" },
      },
    };
  }

  /** @returns {StatisticsData} Zero-value statistics block */
  static freshStats() {
    return {
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
    };
  }

  /**
   * Migrates older schema versions to current.
   * Non-destructive: only adds missing fields.
   * @param {Object} data
   * @returns {Object}
   */
  _migrate(data) {
    const defaults = StorageManager.defaultData();
    if (!data.statistics)           data.statistics = defaults.statistics;
    if (!data.statistics.byDifficulty) data.statistics.byDifficulty = defaults.statistics.byDifficulty;
    if (!data.statistics.streaks)   data.statistics.streaks = { current: 0, best: 0 };
    if (!data.profiles)             data.profiles = {};
    if (!data.replays)              data.replays = [];
    if (!data.settings)             data.settings = defaults.settings;
    if (!data.settings.playerNames) data.settings.playerNames = defaults.settings.playerNames;
    return data;
  }

  /**
   * Loads persisted data.
   * Falls back to backup on corruption, then to defaults.
   * @returns {Object}
   */
  load() {
    return safeExecute(() => {
      const raw = localStorage.getItem(this._key);
      if (!raw) { LOG.storage.info("No saved data, using defaults"); return StorageManager.defaultData(); }
      try {
        return this._migrate(JSON.parse(raw));
      } catch (e) {
        LOG.storage.warn("Primary corrupt, trying backup");
        const backup = localStorage.getItem(this._backup);
        if (backup) return this._migrate(JSON.parse(backup));
        throw new AppError(ErrorCodes.STORAGE_CORRUPT, "Both primary and backup corrupt");
      }
    }, StorageManager.defaultData(), ErrorCodes.STORAGE_READ, LOG.storage);
  }

  /**
   * Persists data, backing up the previous state first.
   * @param {Object} data
   * @returns {boolean}
   */
  save(data) {
    return safeExecute(() => {
      const current = localStorage.getItem(this._key);
      if (current) localStorage.setItem(this._backup, current);
      const payload = { ...data, schemaVersion: this._schema, savedAt: Date.now() };
      localStorage.setItem(this._key, JSON.stringify(payload));
      LOG.storage.debug("Saved successfully");
      return true;
    }, false, ErrorCodes.STORAGE_WRITE, LOG.storage);
  }

  /** Wipes all persisted data */
  reset() {
    safeExecute(() => {
      localStorage.removeItem(this._key);
      localStorage.removeItem(this._backup);
      LOG.storage.info("Storage reset");
    }, null, ErrorCodes.STORAGE_WRITE, LOG.storage);
  }
}

/** Singleton storage manager */
const storageManager = new StorageManager();

// ============================================================
// SECTION 10 — PLAYER PROFILE MANAGER
// Per-player identity, symbol association, and rolling stats.
// ============================================================

class PlayerProfileManager {
  /**
   * @param {Object} [profiles={}] - Stored profiles keyed by profile ID
   */
  constructor(profiles = {}) {
    this.profiles = { ...profiles };
    LOG.stats.info("ProfileManager online", { count: Object.keys(profiles).length });
  }

  /**
   * Creates a new player profile.
   * @param {string} id     - Unique profile identifier
   * @param {string} name   - Display name
   * @param {string} symbol - PLAYER.X or PLAYER.O
   * @returns {Object} The created profile
   */
  createProfile(id, name, symbol) {
    if (this.profiles[id]) { LOG.stats.warn(`Profile exists: ${id}`); return this.profiles[id]; }
    this.profiles[id] = {
      id, name, symbol, createdAt: Date.now(),
      stats: { wins: 0, losses: 0, draws: 0, totalGames: 0, winRate: 0 },
    };
    LOG.stats.info(`Created profile: ${name}`);
    return this.profiles[id];
  }

  /**
   * Updates stats for a profile after a game.
   * @param {string} id      - Profile ID
   * @param {"win"|"loss"|"draw"} result
   */
  updateStats(id, result) {
    const p = this.profiles[id];
    if (!p) { LOG.stats.warn(`Profile not found: ${id}`); return; }
    p.stats.totalGames++;
    if (result === "win")       p.stats.wins++;
    else if (result === "loss") p.stats.losses++;
    else                        p.stats.draws++;
    p.stats.winRate = p.stats.totalGames
      ? Math.round((p.stats.wins / p.stats.totalGames) * 100)
      : 0;
  }

  getProfile(id) { return this.profiles[id] ?? null; }
  getAll() { return Object.values(this.profiles); }
}

// ============================================================
// SECTION 11 — STATISTICS & ANALYTICS ENGINE
// Tracks game outcomes, difficulty performance, and streaks.
// Supports derivation of win rates and per-difficulty breakdowns.
// ============================================================

class StatisticsEngine {
  /**
   * @param {Object} data - Loaded statistics block from storage
   */
  constructor(data) {
    this.data = data;
    LOG.stats.info("StatisticsEngine online");
  }

  /**
   * Records a completed game's outcome into all relevant counters.
   * @param {{ winner: string|null, gameMode: string, difficulty: string, moveCount: number }} opts
   */
  recordGame({ winner, gameMode, difficulty, moveCount }) {
    const s = this.data;
    s.totalGames++;
    s.totalMoves += moveCount;
    s.averageMovesPerGame = Math.round(s.totalMoves / s.totalGames);

    if (winner) {
      s.wins[winner] = (s.wins[winner] || 0) + 1;
      if (gameMode === GAME_MODES.VS_AI) {
        const humanWon = winner === PLAYER.X;
        if (humanWon) {
          s.byDifficulty[difficulty].wins++;
          s.streaks.current++;
          s.streaks.best = Math.max(s.streaks.best, s.streaks.current);
        } else {
          s.byDifficulty[difficulty].losses++;
          s.streaks.current = 0;
        }
      }
    } else {
      s.draws++;
      if (gameMode === GAME_MODES.VS_AI) s.byDifficulty[difficulty].draws++;
      s.streaks.current = 0;
    }
    LOG.stats.info("Game recorded", { winner, moveCount, difficulty });
  }

  /** @returns {number} Win percentage [0–100] for `player` */
  winRate(player) {
    const t = this.data.totalGames;
    return t ? Math.round(((this.data.wins[player] || 0) / t) * 100) : 0;
  }

  /** @returns {Object} Full analytics summary */
  getSummary() {
    return {
      totalGames: this.data.totalGames,
      wins: { ...this.data.wins },
      draws: this.data.draws,
      streaks: { ...this.data.streaks },
      averageMoves: this.data.averageMovesPerGame,
      winRates: { X: this.winRate(PLAYER.X), O: this.winRate(PLAYER.O) },
      byDifficulty: this.data.byDifficulty,
    };
  }
}

// ============================================================
// SECTION 12 — REPLAY SYSTEM
// Records every move during a session.
// Stores up to APP_CONFIG.maxReplayHistory sessions.
// Supports frame-by-frame board reconstruction for playback.
// ============================================================

class ReplaySystem {
  /**
   * @param {Array} [replays=[]] - Pre-loaded replay records from storage
   */
  constructor(replays = []) {
    this._replays = [...replays];
    this._maxReplays = APP_CONFIG.maxReplayHistory;
    this._recording = null;
    LOG.replay.info("ReplaySystem online", { count: this._replays.length });
  }

  /**
   * Begins a new recording session.
   * @param {{ gameMode: string, difficulty: string, playerNames: Object }} meta
   */
  startRecording(meta) {
    this._recording = {
      id: `rpl_${Date.now()}`,
      ...meta,
      moves: [],
      startTime: Date.now(),
      endTime: null,
      result: null,
    };
    LOG.replay.info("Recording started", { id: this._recording.id });
  }

  /**
   * Appends a move to the active recording.
   * @param {string} player - PLAYER.X or PLAYER.O
   * @param {number} index  - Cell index
   */
  recordMove(player, index) {
    if (!this._recording) return;
    this._recording.moves.push({ player, index, ts: Date.now() });
  }

  /**
   * Finalizes the current recording and prepends to history.
   * @param {{ winner: string|null }} result
   */
  stopRecording(result) {
    if (!this._recording) return;
    this._recording.endTime = Date.now();
    this._recording.result = result;
    this._recording.duration = this._recording.endTime - this._recording.startTime;
    this._replays.unshift(this._recording);
    if (this._replays.length > this._maxReplays) {
      this._replays = this._replays.slice(0, this._maxReplays);
    }
    LOG.replay.info("Recording saved", { id: this._recording.id, frames: this._recording.moves.length });
    this._recording = null;
  }

  /**
   * Reconstructs the board state at a given frame index.
   * @param {Object} replay  - Replay record
   * @param {number} frame   - Frame number (0 = initial)
   * @returns {Array<string|null>}
   */
  static getBoardAtFrame(replay, frame) {
    const board = GameEngine.createEmptyBoard();
    replay.moves.slice(0, frame).forEach(({ player, index }) => { board[index] = player; });
    return board;
  }

  getReplays() { return [...this._replays]; }
  clearReplays() { this._replays = []; LOG.replay.info("Replays cleared"); }
}

/** Singleton replay system */
const replaySystem = new ReplaySystem();

// ============================================================
// SECTION 13 — THEME ENGINE
// Manages active theme selection and CSS variable injection.
// ============================================================

class ThemeEngine {
  /** @param {string} [initialId="dark"] */
  constructor(initialId = "dark") {
    this._current = THEMES[initialId] || THEMES.dark;
    LOG.ui.info("ThemeEngine online", { theme: this._current.id });
  }

  setTheme(id) {
    if (!THEMES[id]) { LOG.ui.warn(`Unknown theme: ${id}`); return; }
    this._current = THEMES[id];
    LOG.ui.info("Theme → " + id);
  }

  getTheme() { return this._current; }
  getAllThemes() { return Object.values(THEMES); }

  /**
   * Injects theme tokens as CSS custom properties on a DOM element.
   * @param {HTMLElement} el
   */
  applyToElement(el) {
    if (!el) return;
    const t = this._current;
    const vars = {
      "--bg": t.bg, "--surface": t.surface, "--surface-alt": t.surfaceAlt,
      "--border": t.border, "--accent": t.accent, "--text": t.text,
      "--text-muted": t.textMuted, "--player-x": t.playerX, "--player-o": t.playerO,
      "--win": t.win, "--shadow": t.shadow, "--glow": t.glow,
    };
    Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
  }
}

// ============================================================
// SECTION 14 — CENTRAL STATE MACHINE
// useReducer-powered application state.
// All state mutations are pure, predictable, and traceable.
// ============================================================

const initialAppState = {
  screen: "menu",
  gameMode: GAME_MODES.VS_AI,
  difficulty: DIFFICULTY.MEDIUM,
  theme: APP_CONFIG.defaultTheme,
  board: GameEngine.createEmptyBoard(),
  currentPlayer: PLAYER.X,
  gameStatus: "idle",
  winner: null,
  winPattern: null,
  isAIThinking: false,
  moveCount: 0,
  cellAnimations: Array(CELL_COUNT).fill(false),
  recentlyPlaced: null,
  playerNames: { X: "Player 1", O: "Player 2" },
  soundEnabled: true,
  volume: APP_CONFIG.sounds.volume,
  statistics: StorageManager.freshStats(),
  replays: [],
  winCelebration: false,
  moveHistory: [],
};

function buildBoardFromHistory(history) {
  const board = GameEngine.createEmptyBoard();
  history.forEach(({ player, index }) => { board[index] = player; });
  return board;
}

function appReducer(state, action) {
  switch (action.type) {

    case "NAVIGATE":
      return { ...state, screen: action.screen };

    case "SET_GAME_MODE":
      return { ...state, gameMode: action.mode };

    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.difficulty };

    case "SET_THEME":
      return { ...state, theme: action.theme };

    case "SET_SOUND":
      return { ...state, soundEnabled: action.enabled };

    case "SET_VOLUME":
      return { ...state, volume: action.volume };

    case "SET_PLAYER_NAME":
      return { ...state, playerNames: { ...state.playerNames, [action.player]: action.name } };

    case "GAME_START":
      return {
        ...state,
        screen: "game",
        board: GameEngine.createEmptyBoard(),
        currentPlayer: PLAYER.X,
        gameStatus: "playing",
        winner: null,
        winPattern: null,
        isAIThinking: false,
        moveCount: 0,
        cellAnimations: Array(CELL_COUNT).fill(false),
        recentlyPlaced: null,
        moveHistory: [],
        winCelebration: false,
      };

    case "MAKE_MOVE": {
      if (state.board[action.index] !== null) return state;
      const newBoard = GameEngine.applyMove(state.board, action.index, action.player);
      const { status, winner, winPattern } = GameEngine.evaluateBoard(newBoard);
      const anims = Array(CELL_COUNT).fill(false);
      anims[action.index] = true;
      return {
        ...state,
        board: newBoard,
        currentPlayer: GameEngine.getOpponent(action.player),
        gameStatus: status,
        winner,
        winPattern,
        moveCount: state.moveCount + 1,
        cellAnimations: anims,
        recentlyPlaced: action.index,
        moveHistory: [...state.moveHistory, { player: action.player, index: action.index }],
        winCelebration: status === "win" || status === "draw",
      };
    }

    case "UNDO_MOVE": {
      const mode = state.gameMode;
      const histLen = state.moveHistory.length;
      if (histLen === 0) return state;
      const steps = (mode === GAME_MODES.VS_AI && histLen >= 2) ? 2 : 1;
      const newHistory = state.moveHistory.slice(0, -steps);
      const newBoard = buildBoardFromHistory(newHistory);
      return {
        ...state,
        board: newBoard,
        currentPlayer: PLAYER.X,
        gameStatus: "playing",
        winner: null,
        winPattern: null,
        moveCount: newHistory.length,
        moveHistory: newHistory,
        cellAnimations: Array(CELL_COUNT).fill(false),
        recentlyPlaced: null,
        winCelebration: false,
      };
    }

    case "AI_THINKING":
      return { ...state, isAIThinking: action.thinking };

    case "UPDATE_STATISTICS":
      return { ...state, statistics: action.statistics };

    case "SET_REPLAYS":
      return { ...state, replays: action.replays };

    case "CLEAR_WIN_CELEBRATION":
      return { ...state, winCelebration: false };

    default:
      LOG.app.warn(`Unknown action: ${action.type}`);
      return state;
  }
}

// ============================================================
// SECTION 15 — UI COMPONENT FRAMEWORK
// Modular, theme-aware React components.
// Zero mixing of game logic and presentation concerns.
// ============================================================

// ─── Background Atmosphere ────────────────────────────────────
function BackgroundParticles({ theme }) {
  const particles = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      dur: 5 + Math.random() * 5,
    })),
  []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          borderRadius: "50%",
          background: theme.particleColor,
          opacity: 0.12,
          animation: `nttt-particle ${p.dur}s ease-in-out ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

// ─── Thinking Dots ────────────────────────────────────────────
function ThinkingDots({ theme }) {
  return (
    <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: theme.accent,
          display: "inline-block",
          animation: `nttt-dot 1.3s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </span>
  );
}

// ─── Action Button ────────────────────────────────────────────
function Btn({ label, onClick, theme, primary, small, danger, disabled }) {
  const [hov, setHov] = useState(false);

  const bg = danger
    ? hov ? "#f43f5e22" : "transparent"
    : primary
      ? hov ? theme.accentLight : theme.accent
      : hov ? theme.surfaceAlt : "transparent";

  const border = danger ? "#f43f5e" : primary ? theme.accent : theme.border;
  const color  = danger ? "#f43f5e" : primary ? theme.bg     : theme.text;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: bg, border: `1px solid ${border}`, borderRadius: 10,
        color, cursor: disabled ? "not-allowed" : "pointer",
        padding: small ? "5px 13px" : "10px 22px",
        fontSize: small ? "0.72rem" : "0.88rem",
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 700, transition: "all 0.18s ease",
        letterSpacing: "0.04em", opacity: disabled ? 0.4 : 1,
      }}
    >{label}</button>
  );
}

// ─── Nav Button ───────────────────────────────────────────────
function NavBtn({ label, active, theme, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: active ? `${theme.accent}1e` : hov ? `${theme.accent}0f` : "none",
        border: `1px solid ${active ? theme.accent : theme.border}`,
        borderRadius: 8, color: active ? theme.accent : theme.textMuted,
        cursor: "pointer", padding: "5px 11px",
        fontSize: "0.68rem", fontFamily: "monospace",
        textTransform: "uppercase", letterSpacing: "0.09em",
        transition: "all 0.18s ease", fontWeight: active ? 700 : 400,
      }}
    >{label}</button>
  );
}

// ─── Game Cell ────────────────────────────────────────────────
function GameCell({ index, value, isWin, onCellClick, theme, disabled, animated }) {
  const [hov, setHov] = useState(false);
  const pColor = value === PLAYER.X ? theme.playerX : value === PLAYER.O ? theme.playerO : "transparent";

  return (
    <button
      onClick={() => !value && !disabled && onCellClick(index)}
      onMouseEnter={() => { if (!value && !disabled) { setHov(true); soundManager.playHover(); } }}
      onMouseLeave={() => setHov(false)}
      aria-label={`Cell ${index + 1}: ${value ?? "empty"}`}
      style={{
        width: "100%", aspectRatio: "1",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: !value && !disabled ? "pointer" : "default",
        background: isWin ? `radial-gradient(circle, ${theme.win}18 0%, transparent 68%)`
                          : hov && !value ? theme.cellHover : "transparent",
        border: "none", outline: "none", borderRadius: 10,
        transition: "background 0.2s ease", position: "relative", overflow: "hidden",
      }}
    >
      {value && (
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(1.8rem, 7vw, 3.6rem)",
          fontWeight: 900, color: pColor, lineHeight: 1,
          textShadow: isWin ? `0 0 22px ${theme.win}, 0 0 44px ${theme.win}66` : `0 0 12px ${pColor}55`,
          display: "block", userSelect: "none",
          animation: animated ? "nttt-pop 0.38s cubic-bezier(0.34,1.56,0.64,1)" : undefined,
          transform: isWin ? "scale(1.12)" : "scale(1)",
          transition: "transform 0.28s ease, text-shadow 0.28s ease",
        }}>{value}</span>
      )}
      {isWin && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: 10,
          border: `2px solid ${theme.win}`,
          boxShadow: `inset 0 0 16px ${theme.win}44`,
          animation: "nttt-win-pulse 1.6s ease-in-out infinite",
          pointerEvents: "none",
        }} />
      )}
    </button>
  );
}

// ─── Game Board ───────────────────────────────────────────────
function GameBoard({ board, winPattern, onCellClick, theme, disabled, cellAnimations }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3,
      background: theme.border, borderRadius: 18, padding: 3,
      boxShadow: `0 0 50px ${theme.shadow}, 0 24px 70px rgba(0,0,0,0.45)`,
      maxWidth: 460, width: "100%", margin: "0 auto",
    }}>
      {board.map((cell, i) => (
        <div key={i} style={{ background: theme.surface, borderRadius: 15, padding: 3 }}>
          <GameCell
            index={i} value={cell}
            isWin={winPattern?.includes(i) ?? false}
            onCellClick={onCellClick}
            theme={theme}
            disabled={disabled}
            animated={cellAnimations[i]}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Status Banner ────────────────────────────────────────────
function StatusBanner({ gameStatus, winner, currentPlayer, isAIThinking, playerNames, theme }) {
  let msg = "", sub = "", color = theme.text;

  if (isAIThinking) {
    msg = "AI computing";  sub = "Alpha-beta search in progress…"; color = theme.textMuted;
  } else if (gameStatus === "win") {
    const name = winner === PLAYER.X ? playerNames.X : playerNames.O;
    msg = `${name} wins!`; sub = `${winner} claims the board`; color = winner === PLAYER.X ? theme.playerX : theme.playerO;
  } else if (gameStatus === "draw") {
    msg = "Draw!"; sub = "A perfectly balanced contest"; color = theme.accent;
  } else {
    const name = currentPlayer === PLAYER.X ? playerNames.X : playerNames.O;
    msg = `${name}'s turn`; sub = `Playing as ${currentPlayer}`;
    color = currentPlayer === PLAYER.X ? theme.playerX : theme.playerO;
  }

  return (
    <div style={{
      textAlign: "center", padding: "14px 20px",
      background: theme.surfaceAlt, borderRadius: 12,
      border: `1px solid ${theme.border}`, minHeight: 76,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(1rem, 3vw, 1.4rem)", fontWeight: 700,
        color, transition: "color 0.3s ease",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        {isAIThinking && <ThinkingDots theme={theme} />}
        {msg}
      </div>
      <div style={{ fontSize: "0.72rem", color: theme.textMuted, marginTop: 4, fontFamily: "monospace" }}>
        {sub}
      </div>
    </div>
  );
}

// ─── Score Panel ──────────────────────────────────────────────
function ScorePanel({ statistics, playerNames, theme }) {
  const xW = statistics.wins?.X || 0;
  const oW = statistics.wins?.O || 0;
  const dr = statistics.draws || 0;

  const Item = ({ label, value, color }) => (
    <div style={{ textAlign: "center", flex: 1 }}>
      <div style={{
        fontSize: "clamp(1.3rem, 4vw, 2rem)", fontWeight: 700,
        color, fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1,
      }}>{value}</div>
      <div style={{
        fontSize: "0.65rem", color: theme.textMuted,
        textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4,
        fontFamily: "monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        maxWidth: 80,
      }}>{label}</div>
    </div>
  );

  const Div = () => <div style={{ width: 1, height: 36, background: theme.border, margin: "0 8px" }} />;

  return (
    <div style={{
      background: theme.surfaceAlt, borderRadius: 12,
      border: `1px solid ${theme.border}`, padding: "12px 16px",
      display: "flex", alignItems: "center",
    }}>
      <Item label={playerNames.X} value={xW} color={theme.playerX} />
      <Div />
      <Item label="Draw" value={dr} color={theme.textMuted} />
      <Div />
      <Item label={playerNames.O} value={oW} color={theme.playerO} />
    </div>
  );
}

// ─── Difficulty Badge ─────────────────────────────────────────
function DiffBadge({ difficulty, theme }) {
  const colors = { easy: "#4ade80", medium: "#fb923c", hard: "#f43f5e" };
  const c = colors[difficulty] || theme.accent;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 999,
      border: `1px solid ${c}44`, background: `${c}11`,
      color: c, fontSize: "0.68rem", fontFamily: "monospace",
      textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c, display: "inline-block" }} />
      {difficulty}
    </span>
  );
}

// ─── Win / Draw Overlay ───────────────────────────────────────
function EndOverlay({ gameStatus, winner, playerNames, theme, onPlayAgain, onMenu }) {
  const isDraw = gameStatus === "draw";
  const color  = isDraw ? theme.accent : winner === PLAYER.X ? theme.playerX : theme.playerO;
  const title  = isDraw ? "DRAW" : "VICTORY";
  const sub    = isDraw ? "An even contest" : `${winner === PLAYER.X ? playerNames.X : playerNames.O} triumphs`;

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.72)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, animation: "nttt-fade-in 0.35s ease",
    }}>
      <div style={{
        background: theme.surface, border: `2px solid ${color}`,
        borderRadius: 22, padding: "44px 52px",
        textAlign: "center", maxWidth: 380, width: "92%",
        boxShadow: `0 0 60px ${color}44, 0 30px 80px rgba(0,0,0,0.6)`,
        animation: "nttt-overlay-pop 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "3.2rem", fontWeight: 900, color,
          textShadow: `0 0 30px ${color}`, letterSpacing: "0.15em", marginBottom: 8,
        }}>{title}</div>
        <div style={{ color: theme.textMuted, marginBottom: 32, fontSize: "0.9rem" }}>{sub}</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Btn label="Play Again" onClick={onPlayAgain} theme={theme} primary />
          <Btn label="Menu" onClick={onMenu} theme={theme} />
        </div>
      </div>
    </div>
  );
}

// ─── App Header ───────────────────────────────────────────────
function AppHeader({ screen, theme, onNavigate, soundEnabled, onToggleSound }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 22px", borderBottom: `1px solid ${theme.border}`,
      background: theme.surface, position: "relative", zIndex: 10,
    }}>
      <button onClick={() => onNavigate("menu")} style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "1.25rem", fontWeight: 900, color: theme.accent,
        letterSpacing: "0.18em", padding: 0,
        textShadow: `0 0 18px ${theme.glow}`,
      }}>NEXUS</button>

      <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
        {["game", "stats", "replays", "settings"].map((s) => (
          <NavBtn key={s} label={s} active={screen === s} theme={theme} onClick={() => onNavigate(s)} />
        ))}
        <button onClick={onToggleSound} style={{
          background: soundEnabled ? `${theme.accent}22` : "none",
          border: `1px solid ${theme.border}`, borderRadius: 8,
          color: soundEnabled ? theme.accent : theme.textMuted,
          cursor: "pointer", padding: "5px 9px", fontSize: "0.78rem",
          fontFamily: "monospace", transition: "all 0.18s ease",
        }}>{soundEnabled ? "♪ ON" : "♪ OFF"}</button>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: MENU
// ============================================================
function MenuScreen({ state, dispatch, theme }) {
  const [mode, setMode]   = useState(state.gameMode);
  const [diff, setDiff]   = useState(state.difficulty);
  const [nameX, setNameX] = useState(state.playerNames.X);
  const [nameO, setNameO] = useState(state.playerNames.O);

  const start = () => {
    dispatch({ type: "SET_GAME_MODE", mode });
    dispatch({ type: "SET_DIFFICULTY", difficulty: diff });
    dispatch({ type: "SET_PLAYER_NAME", player: "X", name: nameX || "Player 1" });
    dispatch({ type: "SET_PLAYER_NAME", player: "O", name: nameO || (mode === GAME_MODES.VS_AI ? "AI" : "Player 2") });
    soundManager.playReset();
    dispatch({ type: "GAME_START" });
  };

  const ModeBtn = ({ m, label, desc }) => {
    const active = mode === m;
    return (
      <button onClick={() => setMode(m)} style={{
        flex: 1, padding: "13px 10px",
        background: active ? `${theme.accent}1a` : theme.surfaceAlt,
        border: `1px solid ${active ? theme.accent : theme.border}`,
        borderRadius: 12, color: active ? theme.accent : theme.textMuted,
        cursor: "pointer", transition: "all 0.18s ease", textAlign: "center",
      }}>
        <div style={{ fontSize: "0.82rem", fontWeight: 700, fontFamily: "monospace", letterSpacing: "0.05em" }}>{label}</div>
        <div style={{ fontSize: "0.65rem", opacity: 0.7, marginTop: 3 }}>{desc}</div>
      </button>
    );
  };

  const DiffBtn = ({ d, label }) => {
    const active = diff === d;
    const c = { easy: "#4ade80", medium: "#fb923c", hard: "#f43f5e" }[d];
    return (
      <button onClick={() => setDiff(d)} style={{
        flex: 1, padding: "9px 6px",
        background: active ? `${c}1a` : theme.surfaceAlt,
        border: `1px solid ${active ? c : theme.border}`,
        borderRadius: 10, color: active ? c : theme.textMuted,
        cursor: "pointer", transition: "all 0.18s ease",
        fontSize: "0.78rem", fontWeight: 700, fontFamily: "monospace", letterSpacing: "0.08em",
      }}>{label}</button>
    );
  };

  const inp = {
    background: theme.surfaceAlt, border: `1px solid ${theme.border}`,
    borderRadius: 8, color: theme.text, padding: "8px 12px",
    fontSize: "0.88rem", width: "100%",
    fontFamily: "'Playfair Display', Georgia, serif", outline: "none",
  };

  const lbl = {
    fontSize: "0.66rem", color: theme.textMuted,
    textTransform: "uppercase", letterSpacing: "0.1em",
    marginBottom: 6, display: "block", fontFamily: "monospace",
  };

  const stats = state.statistics;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "32px 22px", position: "relative", zIndex: 1 }}>
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 38 }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2.8rem, 9vw, 4.5rem)", fontWeight: 900,
          color: theme.accent, margin: 0, letterSpacing: "0.22em",
          textShadow: `0 0 40px ${theme.glow}, 0 0 80px ${theme.glow}44`,
        }}>NEXUS</h1>
        <div style={{
          color: theme.textMuted, fontSize: "0.72rem", letterSpacing: "0.32em",
          textTransform: "uppercase", fontFamily: "monospace", marginTop: 7,
        }}>Tactical Tic Tac Toe</div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 14 }}>
          {[theme.accent, theme.textDim, theme.accent].map((c, i) => (
            <div key={i} style={{ width: 24, height: 2, background: c, borderRadius: 1 }} />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Mode */}
        <div>
          <span style={lbl}>Game Mode</span>
          <div style={{ display: "flex", gap: 8 }}>
            <ModeBtn m={GAME_MODES.VS_AI}    label="vs AI"    desc="Challenge the engine" />
            <ModeBtn m={GAME_MODES.VS_HUMAN} label="2 Player" desc="Local human match" />
            <ModeBtn m={GAME_MODES.AI_VS_AI} label="AI vs AI" desc="Watch the engines" />
          </div>
        </div>

        {/* Difficulty */}
        {mode !== GAME_MODES.VS_HUMAN && (
          <div>
            <span style={lbl}>Difficulty</span>
            <div style={{ display: "flex", gap: 8 }}>
              <DiffBtn d={DIFFICULTY.EASY}   label="Easy"   />
              <DiffBtn d={DIFFICULTY.MEDIUM} label="Medium" />
              <DiffBtn d={DIFFICULTY.HARD}   label="Hard"   />
            </div>
          </div>
        )}

        {/* Player Names */}
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ ...lbl, color: theme.playerX }}>Player X Name</label>
            <input style={inp} value={nameX} onChange={e => setNameX(e.target.value)} placeholder="Player X" maxLength={16} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ ...lbl, color: theme.playerO }}>{mode === GAME_MODES.VS_AI ? "AI Name" : "Player O Name"}</label>
            <input style={inp} value={nameO} onChange={e => setNameO(e.target.value)} placeholder={mode === GAME_MODES.VS_AI ? "AI" : "Player O"} maxLength={16} />
          </div>
        </div>

        <Btn label="⊞  Begin Match" onClick={start} theme={theme} primary />

        {/* Quick Stats */}
        <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {[
              { label: "Games",      value: stats.totalGames },
              { label: "Best Streak",value: stats.streaks?.best || 0 },
              { label: "Avg Moves",  value: stats.averageMovesPerGame || "—" },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.5rem", fontWeight: 700, color: theme.accent,
                }}>{value}</div>
                <div style={{
                  fontSize: "0.62rem", color: theme.textMuted,
                  textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "monospace",
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: GAME
// ============================================================
function GameScreen({ state, dispatch, theme, onGameEnd }) {
  const aiInProgress = useRef(false);

  // ── AI Move Trigger ──────────────────────────────────────────
  useEffect(() => {
    const needsAI =
      state.gameStatus === "playing" &&
      !state.isAIThinking &&
      !aiInProgress.current &&
      (
        (state.gameMode === GAME_MODES.VS_AI    && state.currentPlayer === PLAYER.O) ||
        (state.gameMode === GAME_MODES.AI_VS_AI)
      );

    if (!needsAI) return;
    aiInProgress.current = true;
    dispatch({ type: "AI_THINKING", thinking: true });

    aiController.computeMove(state.board, state.currentPlayer, state.difficulty)
      .then((move) => {
        aiInProgress.current = false;
        dispatch({ type: "AI_THINKING", thinking: false });
        if (move !== -1 && move !== undefined) {
          soundManager.playMove(state.currentPlayer);
          dispatch({ type: "MAKE_MOVE", index: move, player: state.currentPlayer });
        }
      })
      .catch((err) => {
        aiInProgress.current = false;
        dispatch({ type: "AI_THINKING", thinking: false });
        LOG.ai.error("AI move rejected", err);
      });
  });

  // ── Game End Handler ─────────────────────────────────────────
  useEffect(() => {
    if (state.gameStatus === "win")  soundManager.playWin();
    if (state.gameStatus === "draw") soundManager.playDraw();
    if (state.gameStatus === "win" || state.gameStatus === "draw") {
      onGameEnd({ winner: state.winner, moveCount: state.moveCount });
    }
  }, [state.gameStatus]);

  const handleCell = useCallback((index) => {
    if (state.board[index] !== null)  return;
    if (state.gameStatus !== "playing") return;
    if (state.isAIThinking)           return;
    if (state.gameMode === GAME_MODES.AI_VS_AI) return;
    if (state.gameMode === GAME_MODES.VS_AI && state.currentPlayer === PLAYER.O) return;
    soundManager.playMove(state.currentPlayer);
    dispatch({ type: "MAKE_MOVE", index, player: state.currentPlayer });
  }, [state]);

  const handleUndo = () => {
    if (!canUndo) return;
    soundManager.playUndo();
    dispatch({ type: "UNDO_MOVE" });
  };

  const handleNew = () => {
    soundManager.playReset();
    dispatch({ type: "GAME_START" });
  };

  const canUndo = state.moveHistory.length > 0
    && state.gameStatus === "playing"
    && !state.isAIThinking
    && state.gameMode !== GAME_MODES.AI_VS_AI;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "22px 16px", position: "relative", zIndex: 1 }}>
      {/* Top Control Bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <DiffBadge difficulty={state.difficulty} theme={theme} />
        <div style={{ fontFamily: "monospace", fontSize: "0.72rem", color: theme.textMuted }}>
          Move {state.moveCount} / 9
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          <Btn label="↩ Undo" onClick={handleUndo} theme={theme} small disabled={!canUndo} />
          <Btn label="↺ New"  onClick={handleNew}  theme={theme} small />
        </div>
      </div>

      {/* Score */}
      <div style={{ marginBottom: 14 }}>
        <ScorePanel statistics={state.statistics} playerNames={state.playerNames} theme={theme} />
      </div>

      {/* Status */}
      <div style={{ marginBottom: 18 }}>
        <StatusBanner
          gameStatus={state.gameStatus}
          winner={state.winner}
          currentPlayer={state.currentPlayer}
          isAIThinking={state.isAIThinking}
          playerNames={state.playerNames}
          theme={theme}
        />
      </div>

      {/* Board */}
      <GameBoard
        board={state.board}
        winPattern={state.winPattern}
        onCellClick={handleCell}
        theme={theme}
        disabled={state.gameStatus !== "playing" || state.isAIThinking}
        cellAnimations={state.cellAnimations}
      />

      {/* Move Timeline */}
      <div style={{ marginTop: 18, display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {state.moveHistory.map((m, i) => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: "50%",
            background: m.player === PLAYER.X ? theme.playerX : theme.playerO,
            opacity: 0.75,
          }} />
        ))}
        {Array(Math.max(0, 9 - state.moveHistory.length)).fill(0).map((_, i) => (
          <div key={`e${i}`} style={{
            width: 7, height: 7, borderRadius: "50%",
            border: `1px solid ${theme.border}`, opacity: 0.35,
          }} />
        ))}
      </div>

      {/* End Overlay */}
      {state.winCelebration && (
        <EndOverlay
          gameStatus={state.gameStatus}
          winner={state.winner}
          playerNames={state.playerNames}
          theme={theme}
          onPlayAgain={handleNew}
          onMenu={() => dispatch({ type: "NAVIGATE", screen: "menu" })}
        />
      )}
    </div>
  );
}

// ============================================================
// SCREEN: STATISTICS
// ============================================================
function StatsScreen({ statistics, theme }) {
  const t = statistics.totalGames || 0;
  const xW = statistics.wins?.X || 0;
  const oW = statistics.wins?.O || 0;
  const dr = statistics.draws || 0;

  const Card = ({ title, value, color, sub }) => (
    <div style={{
      background: theme.surfaceAlt, border: `1px solid ${theme.border}`,
      borderRadius: 12, padding: "18px 16px", flex: 1, minWidth: 110,
    }}>
      <div style={{
        fontSize: "0.62rem", color: theme.textMuted, textTransform: "uppercase",
        letterSpacing: "0.11em", fontFamily: "monospace", marginBottom: 8,
      }}>{title}</div>
      <div style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "2rem", fontWeight: 700, color: color || theme.accent, lineHeight: 1,
      }}>{value}</div>
      {sub && <div style={{ fontSize: "0.68rem", color: theme.textMuted, marginTop: 4 }}>{sub}</div>}
    </div>
  );

  const DiffRow = ({ label, d, color }) => {
    const s = statistics.byDifficulty?.[d] || {};
    const tot = (s.wins || 0) + (s.losses || 0) + (s.draws || 0);
    const rate = tot ? Math.round((s.wins / tot) * 100) : 0;
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "11px 16px", background: theme.surfaceAlt,
        borderRadius: 10, border: `1px solid ${theme.border}`,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
        <div style={{ flex: 1, fontFamily: "monospace", fontSize: "0.8rem", fontWeight: 700, color: theme.text }}>{label}</div>
        <div style={{ display: "flex", gap: 14, fontFamily: "monospace", fontSize: "0.73rem" }}>
          <span style={{ color: "#4ade80" }}>W:{s.wins||0}</span>
          <span style={{ color: "#f43f5e" }}>L:{s.losses||0}</span>
          <span style={{ color: theme.textMuted }}>D:{s.draws||0}</span>
          <span style={{ color: theme.accent, fontWeight: 700 }}>{rate}%</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 580, margin: "0 auto", padding: "30px 22px", position: "relative", zIndex: 1 }}>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "1.75rem", fontWeight: 900, color: theme.accent, margin: "0 0 24px",
      }}>Statistics</h2>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <Card title="Total Games" value={t} />
        <Card title="X Wins" value={xW} color={theme.playerX} sub={t ? `${Math.round(xW/t*100)}% win rate` : "—"} />
        <Card title="O Wins" value={oW} color={theme.playerO} sub={t ? `${Math.round(oW/t*100)}% win rate` : "—"} />
        <Card title="Draws" value={dr} color={theme.textMuted} sub={t ? `${Math.round(dr/t*100)}%` : "—"} />
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <Card title="Best Streak" value={statistics.streaks?.best || 0} sub="consecutive wins" />
        <Card title="Active Streak" value={statistics.streaks?.current || 0} />
        <Card title="Avg Moves" value={statistics.averageMovesPerGame || "—"} sub="per game" />
        <Card title="Total Moves" value={statistics.totalMoves || 0} />
      </div>

      <div style={{
        fontSize: "0.66rem", color: theme.textMuted,
        textTransform: "uppercase", letterSpacing: "0.1em",
        fontFamily: "monospace", marginBottom: 12,
        borderBottom: `1px solid ${theme.border}`, paddingBottom: 8,
      }}>Performance vs AI</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <DiffRow label="Easy"   d="easy"   color="#4ade80" />
        <DiffRow label="Medium" d="medium" color="#fb923c" />
        <DiffRow label="Hard"   d="hard"   color="#f43f5e" />
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: REPLAYS
// ============================================================
function ReplaysScreen({ replays, theme }) {
  const [selId, setSelId]   = useState(null);
  const [board, setBoard]   = useState(null);
  const [frame, setFrame]   = useState(0);
  const [playing, setPlay]  = useState(false);
  const ivRef = useRef(null);

  const replay = selId ? replays.find(r => r.id === selId) : null;

  const selectReplay = (r) => {
    setSelId(r.id);
    setFrame(0);
    setBoard(GameEngine.createEmptyBoard());
    setPlay(false);
    clearInterval(ivRef.current);
  };

  const goToFrame = (f, rep = replay) => {
    if (!rep) return;
    const b = ReplaySystem.getBoardAtFrame(rep, f);
    setBoard([...b]);
    setFrame(f);
  };

  const togglePlay = () => {
    if (!replay) return;
    if (playing) {
      clearInterval(ivRef.current);
      setPlay(false);
    } else {
      if (frame >= replay.moves.length) goToFrame(0);
      setPlay(true);
      ivRef.current = setInterval(() => {
        setFrame(f => {
          if (!replay || f >= replay.moves.length) {
            clearInterval(ivRef.current);
            setPlay(false);
            return f;
          }
          const nf = f + 1;
          const b = ReplaySystem.getBoardAtFrame(replay, nf);
          setBoard([...b]);
          return nf;
        });
      }, APP_CONFIG.animationDurationMs.replayStep);
    }
  };

  useEffect(() => () => clearInterval(ivRef.current), []);

  const resultLabel = (r) => {
    if (!r.result) return "?";
    return r.result.winner ? `${r.result.winner} wins` : "Draw";
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "30px 22px", position: "relative", zIndex: 1 }}>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "1.75rem", fontWeight: 900, color: theme.accent, margin: "0 0 22px",
      }}>Replay Archive</h2>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {/* List */}
        <div style={{ flex: 1, minWidth: 200 }}>
          {replays.length === 0 ? (
            <div style={{
              color: theme.textMuted, fontFamily: "monospace", fontSize: "0.82rem",
              padding: 22, textAlign: "center",
              border: `1px dashed ${theme.border}`, borderRadius: 12,
            }}>No replays recorded yet.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 7, maxHeight: 400, overflowY: "auto" }}>
              {replays.map((r) => (
                <button key={r.id} onClick={() => selectReplay(r)} style={{
                  background: selId === r.id ? `${theme.accent}1a` : theme.surfaceAlt,
                  border: `1px solid ${selId === r.id ? theme.accent : theme.border}`,
                  borderRadius: 10, padding: "11px 13px",
                  cursor: "pointer", textAlign: "left", transition: "all 0.18s ease",
                }}>
                  <div style={{
                    fontFamily: "monospace", fontSize: "0.73rem",
                    color: selId === r.id ? theme.accent : theme.text, fontWeight: 700,
                  }}>{resultLabel(r)} · {r.moves.length} moves</div>
                  <div style={{ fontSize: "0.62rem", color: theme.textMuted, marginTop: 3 }}>
                    {r.gameMode} · {r.difficulty} · {new Date(r.startTime).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Viewer */}
        {replay && (
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ marginBottom: 12 }}>
              <GameBoard
                board={board || GameEngine.createEmptyBoard()}
                winPattern={null} onCellClick={() => {}}
                theme={theme} disabled={true}
                cellAnimations={Array(CELL_COUNT).fill(false)}
              />
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 8 }}>
              <Btn label="◀" onClick={() => goToFrame(Math.max(0, frame - 1))} theme={theme} small />
              <Btn label={playing ? "⏸" : "▶"} onClick={togglePlay} theme={theme} small primary />
              <Btn label="▶" onClick={() => goToFrame(Math.min(replay.moves.length, frame + 1))} theme={theme} small />
            </div>
            <div style={{ textAlign: "center", fontFamily: "monospace", fontSize: "0.68rem", color: theme.textMuted }}>
              Frame {frame} / {replay.moves.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SCREEN: SETTINGS
// ============================================================
function SettingsScreen({ state, dispatch, theme, themeEngine, onThemeChange }) {
  const [confirmReset, setConfirmReset] = useState(false);

  const Section = ({ title }) => (
    <div style={{
      fontSize: "0.66rem", color: theme.textMuted,
      textTransform: "uppercase", letterSpacing: "0.12em",
      fontFamily: "monospace", marginBottom: 12,
      borderBottom: `1px solid ${theme.border}`, paddingBottom: 8,
    }}>{title}</div>
  );

  const Toggle = ({ label, desc, on, onToggle }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
      <div>
        <div style={{ fontSize: "0.85rem", color: theme.text }}>{label}</div>
        {desc && <div style={{ fontSize: "0.7rem", color: theme.textMuted }}>{desc}</div>}
      </div>
      <button onClick={onToggle} style={{
        width: 44, height: 24, borderRadius: 12,
        background: on ? theme.accent : theme.border,
        border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s ease",
        flexShrink: 0,
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: "50%", background: "white",
          position: "absolute", top: 3, left: on ? 23 : 3, transition: "left 0.2s ease",
        }} />
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: "30px 22px", position: "relative", zIndex: 1 }}>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "1.75rem", fontWeight: 900, color: theme.accent, margin: "0 0 26px",
      }}>Settings</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {/* Themes */}
        <div>
          <Section title="Visual Theme" />
          <div style={{ display: "flex", gap: 10 }}>
            {themeEngine.getAllThemes().map((t) => {
              const active = state.theme === t.id;
              return (
                <button key={t.id} onClick={() => {
                  onThemeChange(t.id);
                  soundManager.playThemeChange();
                }} style={{
                  flex: 1, padding: "12px 8px",
                  background: active ? `${t.accent}22` : theme.surfaceAlt,
                  border: `2px solid ${active ? t.accent : theme.border}`,
                  borderRadius: 12, cursor: "pointer", transition: "all 0.2s ease",
                }}>
                  <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 6 }}>
                    {[t.bg, t.accent, t.playerX].map((c, i) => (
                      <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, border: `1px solid ${theme.border}33` }} />
                    ))}
                  </div>
                  <div style={{
                    fontSize: "0.68rem", fontFamily: "monospace",
                    color: active ? t.accent : theme.textMuted, textAlign: "center",
                  }}>{t.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio */}
        <div>
          <Section title="Audio" />
          <Toggle
            label="Sound Effects" desc="Procedural Web Audio synthesis"
            on={state.soundEnabled}
            onToggle={() => {
              const next = !state.soundEnabled;
              soundManager.setEnabled(next);
              dispatch({ type: "SET_SOUND", enabled: next });
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0" }}>
            <span style={{ fontSize: "0.82rem", color: theme.text, minWidth: 55 }}>Volume</span>
            <input type="range" min={0} max={1} step={0.05} value={state.volume}
              onChange={e => {
                const v = parseFloat(e.target.value);
                soundManager.setVolume(v);
                dispatch({ type: "SET_VOLUME", volume: v });
              }}
              style={{ flex: 1, accentColor: theme.accent }}
            />
            <span style={{ fontSize: "0.72rem", color: theme.textMuted, minWidth: 30, fontFamily: "monospace" }}>
              {Math.round(state.volume * 100)}%
            </span>
          </div>
        </div>

        {/* Data */}
        <div>
          <Section title="Data Management" />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {!confirmReset ? (
              <Btn label="Reset All Data" onClick={() => setConfirmReset(true)} theme={theme} small danger />
            ) : (
              <>
                <Btn label="✓ Confirm" onClick={() => { storageManager.reset(); window.location.reload(); }} theme={theme} small danger />
                <Btn label="Cancel" onClick={() => setConfirmReset(false)} theme={theme} small />
              </>
            )}
          </div>
          <div style={{ fontSize: "0.65rem", color: theme.textDim, marginTop: 10, fontFamily: "monospace" }}>
            Schema v{APP_CONFIG.schemaVersion} · {APP_CONFIG.appName} {APP_CONFIG.version}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION 16 — ROOT APPLICATION ORCHESTRATOR
// Initializes all singleton systems, wires persistence,
// and renders the correct screen based on navigation state.
// ============================================================

export default function NexusTTT() {
  const rootRef      = useRef(null);
  const themeEngine  = useRef(null);
  const statsEngine  = useRef(null);
  const loadedData   = useRef(null);

  // ── One-time subsystem initialization ───────────────────────
  if (!themeEngine.current) {
    const stored = storageManager.load();
    loadedData.current = stored;
    themeEngine.current = new ThemeEngine(stored.settings?.theme || APP_CONFIG.defaultTheme);
    statsEngine.current = new StatisticsEngine(stored.statistics || StorageManager.freshStats());
    // Hydrate replay system with persisted replays
    stored.replays?.forEach(r => replaySystem._replays.push(r));
    LOG.app.info("All subsystems initialized");
  }

  const persisted = loadedData.current;

  const [state, dispatch] = useReducer(appReducer, {
    ...initialAppState,
    theme:        persisted?.settings?.theme        || APP_CONFIG.defaultTheme,
    difficulty:   persisted?.settings?.difficulty   || APP_CONFIG.defaultDifficulty,
    gameMode:     persisted?.settings?.gameMode     || APP_CONFIG.defaultGameMode,
    soundEnabled: persisted?.settings?.soundEnabled ?? true,
    volume:       persisted?.settings?.volume       ?? APP_CONFIG.sounds.volume,
    playerNames:  persisted?.settings?.playerNames  || { X: "Player 1", O: "Player 2" },
    statistics:   statsEngine.current.data,
    replays:      replaySystem.getReplays(),
  });

  const theme = THEMES[state.theme] || THEMES.dark;

  // ── Apply theme CSS variables ────────────────────────────────
  useEffect(() => {
    themeEngine.current.setTheme(state.theme);
    themeEngine.current.applyToElement(rootRef.current);
  }, [state.theme]);

  // ── Debounced persistence ────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      storageManager.save({
        statistics: state.statistics,
        replays: state.replays,
        settings: {
          theme:        state.theme,
          difficulty:   state.difficulty,
          gameMode:     state.gameMode,
          soundEnabled: state.soundEnabled,
          volume:       state.volume,
          playerNames:  state.playerNames,
        },
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [state.statistics, state.replays, state.theme, state.difficulty, state.gameMode, state.soundEnabled, state.volume]);

  // ── Replay recording: start on new game ──────────────────────
  useEffect(() => {
    if (state.gameStatus === "playing" && state.moveCount === 0) {
      replaySystem.startRecording({
        gameMode: state.gameMode,
        difficulty: state.difficulty,
        playerNames: state.playerNames,
      });
    }
  }, [state.gameStatus, state.moveCount]);

  // ── Replay recording: capture each move ─────────────────────
  useEffect(() => {
    if (state.recentlyPlaced !== null && state.moveCount > 0) {
      const mover = GameEngine.getOpponent(state.currentPlayer);
      replaySystem.recordMove(mover, state.recentlyPlaced);
    }
  }, [state.recentlyPlaced]);

  // ── Game end callback ────────────────────────────────────────
  const handleGameEnd = useCallback(({ winner, moveCount }) => {
    replaySystem.stopRecording({ winner });
    statsEngine.current.recordGame({
      winner,
      gameMode: state.gameMode,
      difficulty: state.difficulty,
      moveCount,
    });
    dispatch({ type: "SET_REPLAYS", replays: replaySystem.getReplays() });
    dispatch({ type: "UPDATE_STATISTICS", statistics: { ...statsEngine.current.data } });
  }, [state.gameMode, state.difficulty]);

  const handleNavigate = (screen) => dispatch({ type: "NAVIGATE", screen });

  const handleThemeChange = (id) => {
    dispatch({ type: "SET_THEME", theme: id });
  };

  // ── Render ───────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { overflow-x: hidden; }

        @keyframes nttt-pop {
          0%   { transform: scale(0.25) rotate(-12deg); opacity: 0; }
          62%  { transform: scale(1.18) rotate(4deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes nttt-win-pulse {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 1; }
        }
        @keyframes nttt-dot {
          0%, 80%, 100% { transform: scale(0.55); opacity: 0.35; }
          40%            { transform: scale(1.25); opacity: 1; }
        }
        @keyframes nttt-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes nttt-overlay-pop {
          from { transform: scale(0.68) translateY(38px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes nttt-particle {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.1; }
          50%      { transform: translateY(-22px) rotate(180deg); opacity: 0.3; }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

        input[type="range"] { height: 4px; }
        button { -webkit-tap-highlight-color: transparent; }
        input  { -webkit-tap-highlight-color: transparent; }
      `}</style>

      <div ref={rootRef} style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        fontFamily: "system-ui, -apple-system, sans-serif",
        transition: "background 0.4s ease, color 0.4s ease",
        position: "relative", overflow: "hidden",
      }}>
        <BackgroundParticles theme={theme} />

        <AppHeader
          screen={state.screen}
          theme={theme}
          onNavigate={handleNavigate}
          soundEnabled={state.soundEnabled}
          onToggleSound={() => {
            const next = !state.soundEnabled;
            soundManager.setEnabled(next);
            dispatch({ type: "SET_SOUND", enabled: next });
          }}
        />

        <main style={{ minHeight: "calc(100vh - 62px)", position: "relative", zIndex: 1 }}>
          {state.screen === "menu" && (
            <MenuScreen state={state} dispatch={dispatch} theme={theme} />
          )}
          {state.screen === "game" && (
            <GameScreen
              state={state}
              dispatch={dispatch}
              theme={theme}
              onGameEnd={handleGameEnd}
            />
          )}
          {state.screen === "stats" && (
            <StatsScreen statistics={state.statistics} theme={theme} />
          )}
          {state.screen === "replays" && (
            <ReplaysScreen replays={state.replays} theme={theme} />
          )}
          {state.screen === "settings" && (
            <SettingsScreen
              state={state}
              dispatch={dispatch}
              theme={theme}
              themeEngine={themeEngine.current}
              onThemeChange={handleThemeChange}
            />
          )}
        </main>
      </div>
    </>
  );
}

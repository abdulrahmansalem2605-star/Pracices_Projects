# Strategic Grid Game System — Master Reference Manual

## Technical Portfolio & Engineering Reference

**Author:** Abdulrahman
**Technology Stack:** Python 3.11+ · PyQt6 · PyQt5 · Tkinter
**Project Domain:** Strategic Grid Game (Tic-Tac-Toe / XO)
**Total Codebase:** ~12,000+ lines across three architectural iterations

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Evolution & Architectural Journey](#2-project-evolution--architectural-journey)
3. [Iteration I — Clean Architecture (Domain-Driven Design)](#3-iteration-i--clean-architecture-domain-driven-design)
4. [Iteration II — Modular Monolith (Event-Driven)](#4-iteration-ii--modular-monolith-event-driven)
5. [Iteration III — Vexon: Production-Grade Single-File Application](#5-iteration-iii--vexon-production-grade-single-file-application)
6. [Core Game Engine Design](#6-core-game-engine-design)
7. [Artificial Intelligence System](#7-artificial-intelligence-system)
8. [Persistence & Data Management](#8-persistence--data-management)
9. [Presentation & Theming](#9-presentation--theming)
10. [Sound Engineering](#10-sound-engineering)
11. [Analytics & Statistics](#11-analytics--statistics)
12. [Replay System](#12-replay-system)
13. [Design Patterns & Engineering Principles](#13-design-patterns--engineering-principles)
14. [Configuration & Deployment](#14-configuration--deployment)
15. [Lessons Learned & Technical Reflections](#15-lessons-learned--technical-reflections)

---

## 1. Executive Summary

This project represents a progressive engineering journey through three distinct architectural iterations of a strategic grid game system. What began as a simple Tic-Tac-Toe implementation evolved into **Vexon** — a production-grade desktop application featuring dynamic board sizes (3×3 to 10×10), multi-tier AI opponents with minimax and alpha-beta pruning, procedural sound synthesis, runtime-switchable theming, comprehensive analytics, and a full replay system.

The project demonstrates proficiency across:
- **Software Architecture:** Clean Architecture, Domain-Driven Design, Event-Driven Architecture, Monolithic Design
- **AI & Algorithms:** Minimax with alpha-beta pruning, transposition tables, heuristic evaluation, depth-limited search
- **Desktop GUI:** PyQt6, PyQt5, Tkinter — across two major frameworks
- **Data Persistence:** Versioned JSON schemas, atomic writes, corruption recovery, schema migration
- **Audio Engineering:** Procedural WAV synthesis with ADSR envelopes, cross-platform sound abstraction
- **Software Engineering:** Type hints, dataclasses, separation of concerns, testable design

---

## 2. Project Evolution & Architectural Journey

The project was developed in three distinct phases, each representing a learning milestone and architectural decision:

### Phase 1: Clean Architecture (DDD) — `tic tac toe/`
- **Framework:** PyQt5
- **Architecture:** Strict Domain-Driven Design with four concentric layers
- **Files:** 26 Python modules across 6 packages
- **Key Insight:** Over-engineering for a simple game; learned the value of matching architecture complexity to problem complexity

### Phase 2: Modular Monolith (Event-Driven) — `TicTacToe_2/`
- **Framework:** Tkinter
- **Architecture:** Modular flat package with EventBus pub/sub system
- **Files:** 10 Python modules
- **Key Insight:** Found the right balance between modularity and pragmatism; event bus decoupled UI from logic

### Phase 3: Vexon (Production Single-File) — `Finale version/`
- **Framework:** PyQt6
- **Architecture:** Layered monolith in a single 7,001-line file with 21 clearly delineated sections
- **Key Insight:** For a self-contained desktop app, a well-structured single file can be more maintainable than premature modularization

---

## 3. Iteration I — Clean Architecture (Domain-Driven Design)

### 3.1 Layer Architecture

The first iteration followed Robert C. Martin's Clean Architecture strictly, with dependency arrows pointing inward:

```
presentation/  →  application/  →  domain/  ←  infrastructure/
```

#### Domain Layer (`domain/`)

The innermost layer — zero external dependencies. Contains pure business logic.

**Entities** (`domain/entities/`):

| Entity | Purpose | Key Fields |
|--------|---------|------------|
| `Board` | Game board with dynamic sizing | `size: int`, `grid: List[List[str]]` |
| `GameState` | Current game status | `status: GameStatus`, `winner_symbol: Optional[str]` |
| `Player` | Runtime player instance | `player_id`, `name`, `symbol`, `stats: PlayerStats` |
| `Profile` | Persistent player data | `player_id`, `name`, `level`, `stats: Dict` |
| `GameResult` | Immutable game outcome record | `game_id`, `player_x_id`, `winner_id`, `duration_seconds`, `board_size` |

**Value Objects** (`domain/value_objects/`):

| Value Object | Purpose |
|-------------|---------|
| `Difficulty` | Enum: EASY, MEDIUM, HARD |
| `BoardConfig` | Frozen dataclass validating board size (3-10) |
| `Rating` | Elo-style rating with `update(opponent_rating, score, k_factor)` |

**Repositories** (Abstract interfaces, `domain/repositories/`):

```python
class ProfileRepository(ABC):
    @abstractmethod
    def get_by_id(self, player_id: str) -> Optional[Profile]: ...
    @abstractmethod
    def save(self, profile: Profile) -> None: ...
    @abstractmethod
    def list_all(self) -> List[Profile]: ...

class GameResultRepository(ABC):
    @abstractmethod
    def save(self, result: GameResult) -> None: ...
    @abstractmethod
    def list_all(self) -> List[GameResult]: ...

class ReplayRepository(ABC):
    @abstractmethod
    def save_replay(self, game_id: str, moves: List[Dict[str, Any]]) -> None: ...
    @abstractmethod
    def get_replay(self, game_id: str) -> List[Dict[str, Any]]: ...
```

**Domain Services** (`domain/services/`):

- **`GameService`** — Orchestrates a single game session. UI-agnostic; holds `Board`, `GameState`, invokes `AIService`, delegates to `RatingService` and `ReplayService`.
- **`AIService`** — Strategy selector based on `Difficulty`. Implements random, heuristic, and minimax approaches.
- **`RatingService`** — Manages Elo-style rating updates. K-factor = 32.0. Score: 1.0 (win), 0.5 (draw), 0.0 (loss).
- **`ReplayService`** — Thin delegation to `ReplayRepository` for persistence.

#### Application Layer (`application/use_cases/`)

Orchestrates domain services for specific user actions:

| Use Case | Function | Description |
|----------|----------|-------------|
| `start_game.py` | `start_game(player_name)` | Initializes all services, returns `(GameService, human, ai)` |
| `make_move.py` | `make_move(game_service, row, col)` | Applies human move, triggers AI response |
| `end_game.py` | `end_game(game_service)` | Finalizes result, persists to all storage layers |
| `get_stats.py` | `get_stats(player_id)` | Reads profile stats from persistence |
| `update_settings.py` | `update_settings(board_size, difficulty)` | Validates and persists configuration changes |
| `save_replay.py` | `save_replay_use_case(game_id, moves)` | Explicit replay persistence |

#### Infrastructure Layer (`infrastructure/`)

Concrete implementations of abstract interfaces:

- **`json_storage.py`** — Generic JSON read/write with `load_json(filename, default)` and `save_json(filename, data)`. Uses `pathlib.Path`, auto-creates `data/` directory.
- **`result_storage.py`** — Appends game results to `data/results.json` with timestamps.
- **`profile_storage.py`** — CRUD for player profiles in `data/profiles.json`.
- **`replay_storage.py`** — Key-value replay storage in `data/replays.json`, keyed by game UUID.
- **`config_manager.py`** — Reads/writes `data/config.json` with defaults for `board_size` and `difficulty`.
- **`logger.py`** — Centralized `get_logger(name)` with file and console handlers.

#### Presentation Layer (`presentation/`)

PyQt5 widgets, each UI-only:

- **`MainWindow`** — Hosts all views via `QStackedLayout`. Orchestrates navigation and game flow.
- **`GameView`** — Dynamic NxN grid of `QPushButton`s with `pyqtSignal(int, int)` for cell clicks. Features last-move highlighting and "pop" animation via `QPropertyAnimation`.
- **`MenuView`** — Title + three buttons (Start, Settings, Stats) with signal emission.
- **`SettingsView`** — `QSpinBox` for board size, `QComboBox` for difficulty and theme.
- **`StatsView`** — Read-only display of wins/losses/draws and last-played metadata.
- **`ThemeManager`** — Static utility loading QSS files from `presentation/themes/`.

#### Themes (QSS)

Three themes stored as `.qss` files:
- `light.qss` — Light background with warm accents
- `dark.qss` — Dark background with cool accents
- `cheerful.qss` — Vibrant colors

---

## 4. Iteration II — Modular Monolith (Event-Driven)

### 4.1 Architecture Overview

A flat-package architecture centered on an **EventBus** pub/sub system. All 10 modules reside in a single `TicTacToe_2/` directory with clean imports via `__init__.py`.

### 4.2 Core Engine (`core_engine.py` — 653 lines)

The foundational module containing all domain models and the game lifecycle:

**Logging & Error Framework:**
```python
class Logger:          # Singleton-pattern logging facade
class TicTacToeError(Exception):    # Base exception
class ConfigurationError(TicTacToeError)
class PersistenceError(TicTacToeError)
class AIError(TicTacToeError)
```

**Path & Configuration Management:**
```python
class PathManager:     # Centralized file paths (data/, scores.json, replays.json, etc.)
class ConfigManager:   # Versioned JSON config with migration support
```

**Domain Models:**
```python
class Symbol(str, Enum):       # X, O, EMPTY
class PlayerType(str, Enum):   # HUMAN, AI
class GameResult(str, Enum):   # HUMAN_WIN, AI_WIN, DRAW, IN_PROGRESS
class Difficulty(str, Enum):   # EASY, MEDIUM, HARD

@dataclass
class PlayerProfile:     # Aggregate stats with record_result()
class MoveRecord:        # Single move: index, symbol, player_type, row, col, timestamp
class GameStateSnapshot: # Complete board snapshot for undo/replay
```

**Event Bus:**
```python
class EventType(str, Enum):
    GAME_STARTED, MOVE_PLAYED, GAME_ENDED, GAME_RESET,
    PROFILE_UPDATED, STATS_UPDATED, THEME_CHANGED, CONFIG_CHANGED, ERROR_OCCURRED

class EventBus:
    def subscribe(self, event_type, handler): ...
    def unsubscribe(self, event_type, handler): ...
    def emit(self, event): ...  # Error-isolated handler execution
```

**Board System:**
```python
class Board:  # UI-agnostic, SIZE=3, grid-based
    def is_valid_move(row, col) -> bool
    def make_move(row, col, symbol) -> bool
    def get_empty_positions() -> List[Tuple[int, int]]
    def check_winner() -> Optional[Symbol]  # Rows, cols, diagonals
    def get_winning_cells() -> List[Tuple[int, int]]
```

**Game Engine:**
```python
class AIPlayerProtocol(Protocol):
    def choose_move(board, symbol) -> Tuple[int, int]: ...

class GameEngine:
    def start_new_game(self): ...
    def play_human_move(row, col) -> bool
    def play_ai_move() -> Optional[Tuple[int, int]]
    def get_snapshot() -> GameStateSnapshot
    def reset_game(self): ...
```

### 4.3 AI Strategies (`ai_strategies.py` — 322 lines)

Three-tier difficulty system with a **Factory pattern** via `DifficultyRouter`:

**EasyAI — Weighted Randomness:**
- 35% chance to take center (1,1)
- 35% chance to take a corner from available corners
- Otherwise uniform random

**MediumAI — Heuristic + Mistake Injection:**
1. Check if AI can win in one move → take it
2. Check if opponent can win in one move → block it
3. 70% chance: play heuristic move (center > corner > random)
4. 30% chance: play random move (mistake injection)

**HardAI — Minimax with Alpha-Beta Pruning + Caching:**
- Uses `MinimaxCacheKey` (flat board tuple + symbol) for memoization
- `_minimax(board, is_maximizing, ai_symbol, alpha, beta)` — standard algorithm
- `_check_winner_fast(board)` — logging-free inline winner check
- Cache stores evaluated scores to avoid recomputation

**DifficultyRouter (Factory):**
```python
class DifficultyRouter:
    @staticmethod
    def create_ai(difficulty: Difficulty) -> BaseAI:
        # Returns EasyAI, MediumAI, or HardAI
```

### 4.4 Persistence Layer (`persistence.py` — 208 lines)

All storage classes inherit from `BaseJsonStorage`:

```python
class BaseJsonStorage:
    CURRENT_VERSION = 1
    def _load(self): ...       # Load → validate → migrate if needed
    def _save(self): ...       # Backup → write → error handling
    def _recover_from_backup(self): ...  # Corruption recovery
    def _migrate(self, old, old_version): ...  # Schema migration
```

**Concrete Storage Classes:**

| Class | Data Structure | File |
|-------|---------------|------|
| `ScoreStorage` | `{players: {name: {difficulty: {wins, losses, draws, points}}}}` | `scores.json` |
| `ProfileStorage` | `{profiles: {name: PlayerProfile.__dict__}}` | `profiles.json` |
| `ReplayStorage` | `{replays: [{player, difficulty, result, timestamp, moves}]}` | `replays.json` |
| `AnalyticsStorage` | `{games_played, human_wins, ai_wins, draws}` | `analytics.json` |

### 4.5 Theme Engine (`themes.py` — 188 lines)

```python
@dataclass
class Theme:
    name, bg, fg, accent, accent_soft, board_bg, cell_bg,
    cell_hover, cell_pressed, win_highlight, status_bg

class ThemeManager:
    def _register_builtin_themes(self):  # light, dark, midnight_neon
    def register_custom_theme(self, theme): ...
    def set_theme(self, name): ...       # Runtime switching + persistence
    def apply_to_frame(self, frame): ... # Tkinter widget helpers
    def apply_to_cell(self, button): ...
```

**Built-in Themes:**
- **Light** — `#f4f4f7` bg, `#0078d7` accent, `#9be7a1` win highlight
- **Dark** — `#1e1e2e` bg, `#4fc3f7` accent, `#66bb6a` win highlight
- **Midnight Neon** — `#0d0d14` bg, `#8a2be2` accent, `#00ffcc` win highlight

### 4.6 Sound Manager (`sound_manager.py` — 103 lines)

Cross-platform sound abstraction:
- Windows: `winsound.Beep(freq, dur)`
- Other: Silent fallback (no-op)
- Config-driven enable/disable
- Event-specific frequencies: move (900Hz), win (1200Hz), loss (400Hz), draw (700Hz), invalid (300Hz)

### 4.7 Analytics Engine (`analytics.py` — 278 lines)

Event-driven analytics with four tracking dimensions:

```python
@dataclass
class DifficultyStats:     # Per-difficulty win/loss/draw counts + rates
class MoveTimingStats:     # Human vs AI move timing averages
class MoveFrequencyStats:  # Cell play frequency (human_freq, ai_freq)
class OpeningMoveStats:    # First-move → outcome correlation

class AnalyticsEngine:
    def handle_event(self, event): ...  # Subscribes to MOVE_PLAYED, GAME_ENDED
    def summary(self) -> Dict: ...      # Full export-ready analytics
    def human_heatmap(self) -> List[List[int]]: ...
    def ai_heatmap(self) -> List[List[int]]: ...
    def difficulty_trend(self, difficulty): ...
```

### 4.8 UI Application (`ui_app.py` — 1,174 lines)

Tkinter-based cinematic UI with:

- **Screen Management:** Main menu → Difficulty selection → Game screen (frame-based navigation)
- **AI Threading:** `threading.Thread` for non-blocking AI computation with UI freeze prevention
- **Animation System:** `AnimationManager` with `pulse_buttons()` and `pulse_label()` — Tkinter `after()` based
- **Scaling Engine:** `ScalingEngine` with configurable scale factor (0.7–2.0) affecting all font sizes and padding
- **Hover Effects:** Per-button `<Enter>`/`<Leave>` bindings for visual feedback
- **Winning Animation:** Pulsing cell highlight on game end

### 4.9 Logging Configuration (`logging_config.py` — 120 lines)

```python
class LoggingConfigurator:
    LOG_FILENAME = "tictactoe.log"
    MAX_BYTES = 1_000_000  # 1 MB per file
    BACKUP_COUNT = 5       # Keep last 5 logs

    def configure(self): ...
    # Console handler + rotating file handler + separate error log
```

---

## 5. Iteration III — Vexon: Production-Grade Single-File Application

### 5.1 Architecture Overview

Vexon consolidates the entire system into a single 7,001-line file with 21 clearly labeled sections and 42 classes. This is not a compromise on structure — it is a deliberate engineering decision for a self-contained desktop application where the cost of cross-file navigation exceeds the benefit of file-level separation.

**Section Index:**

| # | Section | Key Classes |
|---|---------|-------------|
| 01 | Configuration & Constants | `APP_CONFIG`, `win_length_for()`, `ai_depth_limit()` |
| 02 | Logging Framework | 8 namespaced loggers (engine, ai, storage, ui, replay, sound, stats, app) |
| 03 | Error Handling | `VexonError`, `ErrorCode` (E001–E012), `safe_run()` |
| 04 | Core Game Engine | `GameEngine` (stateless), `BoardConfig`, `EvalResult`, `Player` |
| 05 | Board Manager | `BoardManager`, `MoveRecord` |
| 06 | AI Engine | `HardAIStrategy`, `MediumAIStrategy`, `EasyAIStrategy`, `TranspositionTable` |
| 07 | Difficulty Layer | `AIController`, `AIWorker` (QThread-based async) |
| 08 | Sound Manager | `SoundManager` (procedural WAV synthesis via ADSR envelopes) |
| 09 | Persistence | `PersistenceManager`, `StoredData`, `AppSettings`, `StatisticsData` |
| 10 | Player Profiles | `PlayerProfileManager` |
| 11 | Statistics Engine | `StatisticsEngine` — streaks, difficulty/board-size breakdowns |
| 12 | Replay System | `ReplaySystem`, `ReplayManager` — frame-accurate board reconstruction |
| 13 | Theme Engine | `ThemeEngine`, `ThemePalette` — 8 themes, runtime QSS injection |
| 14 | Animation Manager | `AnimationManager` — Qt Animation Framework wrappers |
| 15 | UI Component Framework | `VexButton`, `CellWidget`, `BoardWidget`, `ScoreBar`, `StatusLabel`, `ThinkingWidget`, `DiffBadge` |
| 16 | Screen: Menu | `MenuScreen`, `BoardPreview` |
| 17 | Screen: Game | `GameScreen` |
| 18 | Screen: Statistics | `StatsScreen` |
| 19 | Screen: Replays | `ReplaysScreen` |
| 20 | Screen: Settings | `SettingsScreen` |
| 21 | Root Orchestrator | `MainWindow` |

### 5.2 Core Game Engine — Stateless Design

The `GameEngine` in Vexon is completely **stateless** — all methods are `@staticmethod`. Board state is represented as a flat `list[Player]` of length `size²`. Cell index = `row * size + col` (row-major order).

```python
class GameEngine:
    @staticmethod
    def empty_board(cfg: BoardConfig) -> list[Player]:
        return [Player.NONE] * cfg.cell_count

    @staticmethod
    def apply_move(board, index, player, cfg) -> list[Player]:
        """Immutable: returns a new board."""
        nxt = list(board)
        nxt[index] = player
        return nxt

    @staticmethod
    def check_win(board, player, cfg) -> list[int]:
        """Direction-based win detection for arbitrary board sizes."""
        # Checks 4 directions: horizontal, vertical, diagonal ↘, diagonal ↙
        # Uses straight_run() with row/column continuity enforcement

    @staticmethod
    def evaluate_board(board, cfg) -> EvalResult:
        """Full evaluation: win (with winner + cells), draw, or playing."""

    @staticmethod
    def heuristic_score(board, player, cfg) -> float:
        """Positional evaluation using open-run counting + center bonus."""
```

**Board Configuration:**

```python
@dataclass(frozen=True, slots=True)
class BoardConfig:
    size:       int  # edge length (3-10)
    win_len:    int  # consecutive marks to win
    cell_count: int  # size²

    @staticmethod
    def for_size(size: int) -> BoardConfig:
        wl = win_length_for(size)
        return BoardConfig(size=size, win_len=wl, cell_count=size * size)
```

**Win-Length Policy:**

| Board Size | Win Length | AI Depth Limit |
|-----------|-----------|----------------|
| 3×3 | 3 | 10 (full search) |
| 4×4 | 4 | 6 |
| 5×5 | 4 | 4 |
| 6×6 | 5 | 3 |
| 7×7+ | 5 | 2 (heuristic) |

### 5.3 Board Manager — Mutable State Container

```python
class BoardManager:
    def __init__(self, cfg: BoardConfig): ...
    def reset(self, cfg=None): ...
    def make_move(self, index: int) -> bool: ...
    def undo_move(self, steps: int = 1) -> bool: ...  # Rebuilds board from history
    def get_state(self) -> dict[str, Any]: ...          # Immutable snapshot
    def get_move_log(self) -> list[dict]: ...           # For replay serialization
```

### 5.4 AI Engine — Three-Tier System

#### HardAIStrategy — Minimax α-β + Transposition Table

```python
class HardAIStrategy:
    def get_best_move(self, board, ai_player, cfg) -> int:
        """Depth-limited minimax with alpha-beta pruning."""
        self._tt.reset()
        depth_limit = ai_depth_limit(cfg.size)  # 2-10 based on board
        for idx in _priority_order(empty_cells, cfg.size):  # center-first ordering
            nxt = apply_move(board, idx, ai_player, cfg)
            score = minimax(nxt, 0, False, -inf, inf, ...)
            if score > best_score: best_move = idx

class TranspositionTable:
    """Memoization cache. Keys = (board_values..., maximizing)."""
    def get(key) -> float | None
    def set(key, value): ...
    def diagnostics() -> dict  # hit rate, size, hits, misses
```

**Performance Optimizations:**
1. **Move Ordering:** `_priority_order()` sorts candidate moves by center proximity, improving α-β cutoff frequency
2. **Depth Limiting:** Depth decreases as board size increases (10 for 3×3, 2 for 7×7+)
3. **Heuristic Leaf Evaluation:** At depth limit, `heuristic_score()` returns a float instead of terminal scoring
4. **Transposition Table:** Avoids redundant subtree evaluation with hit/miss diagnostics

#### MediumAIStrategy — Heuristic + Probabilistic Noise

```python
class MediumAIStrategy:
    def get_best_move(self, board, ai_player, cfg) -> int:
        mistake_rate = max(0.10, 0.28 - 0.02 * cfg.size)  # Scales with board
        # 1. Win immediately (always)
        # 2. Block opponent (86% probability)
        # 3. Random mistake (mistake_rate% probability)
        # 4. Heuristic best move
```

#### EasyAIStrategy — Weighted Random

```python
class EasyAIStrategy:
    def get_best_move(self, board, ai_player, cfg) -> int:
        # 25% chance to grab an immediate win
        # Otherwise: weighted random favoring center proximity
```

### 5.5 Async AI Execution (QThread)

```python
class AIWorker(QObject):
    move_ready     = pyqtSignal(int)
    error_occurred = pyqtSignal(str)

    def run(self):
        time.sleep(self._delay_ms / 1000.0)  # Realistic delay
        move = strategy.get_best_move(...)
        self.move_ready.emit(move)

class AIController:
    _STRATEGIES = {"hard": HardAIStrategy(), "medium": MediumAIStrategy(), "easy": EasyAIStrategy()}

    def request_move(self, board, player, difficulty, cfg, on_move, on_error):
        """Non-blocking. Spawns QThread per request. Cancels previous if running."""
```

**AI Think Delays:** Easy: 450ms, Medium: 720ms, Hard: 1050ms

### 5.6 Procedural Sound Synthesis

Vexon synthesizes all sound effects at startup using **ADSR (Attack-Decay-Sustain-Release) envelope synthesis** — the same technique used in the Web Audio API (JSX). No external audio files are required.

**Core Synthesis Functions:**

```python
def _adsr(freq, dur, *, attack, decay, sustain, release, wave, vol) -> list[float]:
    """Generate ADSR-enveloped waveform. wave: sine|triangle|square|sawtooth"""

def _make_wav(samples: list[float]) -> bytes:
    """Pack float samples into 16-bit mono WAV bytes."""

def _mix(*tracks: list[float]) -> list[float]: ...
def _sequence(notes: list[tuple], gap=0.0) -> list[float]: ...
def _fade(samples, fade_in=0.0, fade_out=0.03) -> list[float]: ...
```

**Sound Catalogue:**

| Sound | Technique | Description |
|-------|-----------|-------------|
| `move_x` | Triangle wave, 466Hz, 160ms | Crisp high click for X |
| `move_o` | Triangle wave, 349Hz, 160ms | Warm lower click for O |
| `ai_move` | Sine wave, 392Hz, 130ms | Muted, softer than human |
| `win` | 4-note ascending fanfare (C5→E5→G5→C6) | Victory celebration |
| `draw` | 3-note descending resolve | Balanced neutral |
| `loss` | 2-note gentle descend | Non-frustrating feedback |
| `undo` | Triangle wave, 280Hz | Quick downward chirp |
| `reset` | 2-note up-chime | Fresh start feel |
| `hover` | Sine, 680Hz, 40ms | Near-silent UI tick |
| `theme` | Sine, 800Hz, 100ms | Soft swish upward |

**Playback:** WAV bytes are written to a `tempfile.TemporaryDirectory`, loaded into `QSoundEffect` instances for zero-latency non-blocking playback. Falls back to `QApplication.beep()` if QtMultimedia is unavailable.

---

## 6. Core Game Engine Design

### 6.1 Evolution of Board Representation

| Iteration | Representation | Size Support | Win Detection |
|-----------|---------------|-------------|---------------|
| I (DDD) | `List[List[str]]` | Dynamic (3-10) | Full row/col/diagonal scan |
| II (Event) | `List[List[Symbol]]` | Fixed 3×3 | 8-line check (3 rows, 3 cols, 2 diagonals) |
| III (Vexon) | `list[Player]` (flat) | Dynamic (3-10) | Direction-based with win_len |

### 6.2 Stateless vs Stateful Design

**Vexon's stateless approach** (`GameEngine` as static methods) provides:
- Zero mutable state — safe for concurrent access
- Immutability by convention — `apply_move()` returns new board
- Easy testing — no setup/teardown needed
- Clear data flow — board state is always explicitly passed

**The `BoardManager`** wraps the stateless engine with mutable state management:
- Move history for undo/replay
- Current player tracking
- State snapshots via `get_state()`

### 6.3 Win Detection Algorithm

Vexon's `check_win()` uses a direction-based approach:

```python
directions = [(0, 1), (1, 0), (1, 1), (1, -1)]  # →, ↓, ↘, ↙

for start in range(cell_count):
    if board[start] is not player: continue
    for dr, dc in directions:
        cells = straight_run(start, dr, dc)  # Follow direction for win_len steps
        if len(cells) == win_len:
            return cells  # Winning line found
```

The `straight_run()` function enforces **row/column continuity** — it verifies that each step stays within bounds and that the column index matches the expected column during diagonal traversal.

---

## 7. Artificial Intelligence System

### 7.1 Algorithm Comparison

| Tier | Algorithm | Strengths | Weaknesses |
|------|-----------|-----------|------------|
| Easy | Weighted Random | Center-biased, occasionally wins | No tactical awareness |
| Medium | Heuristic + Noise | Wins/blocks, beatable | Probabilistic mistakes |
| Hard | Minimax α-β + TT | Optimal play on 3×3, strong on larger | Depth-limited on large boards |

### 7.2 Minimax with Alpha-Beta Pruning

The hard AI implements the standard minimax algorithm with:

1. **Alpha-Beta Pruning:** Maintains `alpha` (best maximizer score) and `beta` (best minimizer score). Prunes branches when `beta <= alpha`.

2. **Transposition Table:** Caches `(board_state, maximizing_player) → score` to avoid redundant subtree evaluation. Hit rate diagnostics are logged.

3. **Move Ordering:** `_priority_order()` sorts cells by distance to board center, maximizing early cutoffs.

4. **Depth Limiting:** `ai_depth_limit(size)` returns smaller depths for larger boards, trading optimality for playability.

5. **Heuristic Leaf Evaluation:** At depth limit, `heuristic_score()` returns:
   - Open-run counting (exponential weights: 1, 10, 100, 1000 for run lengths 1-4)
   - Slight defensive bias (opponent runs weighted 1.1×)
   - Center proximity bonus

### 7.3 AI Performance Characteristics

| Board | Hard AI Depth | Approx. Nodes Explored | Response Time |
|-------|-------------|----------------------|---------------|
| 3×3 | 10 (full) | ~5,500 | <100ms |
| 4×4 | 6 | ~10,000 | <200ms |
| 5×5 | 4 | ~15,000 | <300ms |
| 7×7 | 2 + heuristic | ~5,000 | <150ms |
| 10×10 | 2 + heuristic | ~8,000 | <200ms |

---

## 8. Persistence & Data Management

### 8.1 Data Location

```
~/.vexon/
├── data.json           # Primary store (schema v3)
├── data.backup.json    # Auto-backup (written before every save)
├── vexon.log           # Structured rotating log
├── users.json          # Multi-user authentication data
├── results.json        # Game result history
└── stats.json          # Statistics snapshot
```

### 8.2 Schema Versioning & Migration

```python
SCHEMA_VERSION = 3

class PersistenceManager:
    def load(self) -> StoredData:
        # Fall-back chain: primary → backup → fresh defaults

    def _migrate(self, raw: dict) -> StoredData:
        """Non-destructively migrate to current schema."""
        # Uses .get(key, default) for every field
        # New fields get default values automatically

    def save(self, data: StoredData) -> bool:
        # Backup current → write new → log success
```

**Schema Evolution:**
- **v1:** Basic settings + statistics
- **v2:** Added game_records, replays, profiles
- **v3:** Added by_board_size breakdown, streaks, playtime

### 8.3 Corruption Recovery

```
Load attempt: primary.json
  ├── Success → validate → migrate if needed → return
  └── Failure → load backup.json
        ├── Success → validate → migrate → save as primary → return
        └── Failure → return StoredData() (fresh defaults)
```

### 8.4 Atomic Writes

Every save operation follows:
1. Copy current file to `.backup.json` (if exists)
2. Write new data to primary file
3. Log success/failure

This ensures data integrity even if the process crashes mid-write.

---

## 9. Presentation & Theming

### 9.1 Theme System Architecture

Vexon's theme engine uses a **token-based design system**:

```python
@dataclass
class ThemePalette:
    id: str                    # "dark", "light", "midnight", etc.
    name: str                  # Display name
    bg: str                    # Primary background
    surface: str               # Card/panel background
    surface_alt: str           # Secondary surface
    border: str                # Border color
    grid_line: str             # Board grid lines
    accent: str                # Primary accent
    accent_light: str          # Lighter accent variant
    text: str                  # Primary text
    text_muted: str            # Secondary text
    player_x: str              # X player color
    player_o: str              # O player color
    win_color: str             # Winning highlight
    cell_hover: str            # Cell hover state
    danger: str                # Error/danger (consistent across themes)
```

**Token Aliases:** Properties like `background_primary`, `accent_color`, `text_primary` provide semantic access to raw tokens.

### 9.2 Eight Built-in Themes

| Theme | ID | Character |
|-------|-----|-----------|
| True Dark | `dark` | Warm gold accent on deep black |
| Light Classic | `light` | Earthy tones, warm cream background |
| Midnight Blue | `midnight` | Deep navy with blue accent |
| Emerald Accent | `emerald` | Dark green with emerald accent |
| Royal Purple | `purple` | Deep violet with purple accent |
| High Contrast | `hc` | Pure black/white/yellow for accessibility |
| Minimal Mono | `mono` | Grayscale, monochromatic |
| Synthwave | `neon` | Neon purple/pink on deep purple |

### 9.3 Runtime Theme Switching

```python
class ThemeEngine:
    def set_theme(self, theme_id: str): ...
    def build_palette(self) -> QPalette: ...  # Full QPalette for native widgets
    def build_qss(self) -> str: ...           # Complete scoped Qt stylesheet
    def apply_to_app(self, app: QApplication): ...
        # 1. Apply QPalette (native rendering)
        # 2. Apply QSS (custom widget styling)
        # 3. Force repaint of all top-level widgets
```

No application restart required. The QSS generation covers:
- Global reset (transparent backgrounds, font family)
- Scrollbar styling (thin, rounded)
- VexButton states (default, hover, pressed, primary, danger, disabled)
- Panel/card frames (border-radius, surface colors)
- Input widgets (QLineEdit, QComboBox, QSlider, QCheckBox)
- List widgets and group boxes
- MessageBox styling

---

## 10. Sound Engineering

### 10.1 ADSR Envelope Synthesis

Each sound effect is synthesized from mathematical waveform generation:

```
Attack  →  Rise from 0 to peak (configurable duration)
Decay   →  Drop from peak to sustain level
Sustain →  Hold at sustain level (configurable amplitude)
Release →  Fade from sustain to 0
```

**Supported Waveforms:**
- `sine` — Smooth, natural tone
- `triangle` — Warm, slightly buzzy
- `square` — Sharp, digital
- `sawtooth` — Bright, harmonically rich

### 10.2 Sound Design Philosophy

Each sound is designed for its emotional context:
- **Move sounds** are short and crisp — immediate feedback without distraction
- **Win fanfare** ascends in pitch — celebrating achievement
- **Loss sound** descends gently — acknowledging defeat without frustration
- **Draw sound** resolves neutrally — balanced conclusion
- **Hover tick** is nearly inaudible — subliminal UI feedback

---

## 11. Analytics & Statistics

### 11.1 StatisticsData Structure

```python
@dataclass
class StatisticsData:
    total_games:         int
    wins_x:              int
    wins_o:              int
    draws:               int
    total_moves:         int
    avg_moves:           float
    streak_current:      int    # Current win streak
    streak_best:         int    # Best win streak
    loss_streak_current: int
    loss_streak_best:    int
    total_playtime_sec:  float
    by_difficulty:       dict   # {easy: {wins, losses, draws}, medium: ..., hard: ...}
    by_board_size:       dict   # {"3": {wins_x, wins_o, draws}, ...}
```

### 11.2 GameRecord

Every completed game is recorded with:
```python
@dataclass
class GameRecord:
    id:           str    # UUID
    player_x:     str    # Player name
    player_o:     str    # Player name
    board_size:   int
    difficulty:   str
    mode:         str    # "vs_ai" | "vs_human" | "ai_vs_ai"
    result:       str    # "win_x" | "win_o" | "draw"
    move_count:   int
    duration_sec: float
    timestamp:    float  # Unix epoch
```

---

## 12. Replay System

### 12.1 Recording

```python
class ReplaySystem:
    def start(self, cfg, game_mode, difficulty, player_names, user_id): ...
    def record_move(self, player, index): ...
    def stop(self, winner): ...  # Finalizes and stores replay
```

Each replay contains: board size, difficulty, player names, move list (player, index, timestamp), duration, and result.

### 12.2 Frame-Accurate Reconstruction

```python
@staticmethod
def board_at_frame(replay: dict, frame: int) -> list[Player]:
    """Reconstruct board state at any frame (0 = empty board)."""
    cfg = BoardConfig.for_size(replay["board_size"])
    board = GameEngine.empty_board(cfg)
    for rec in replay["moves"][:frame]:
        board[rec["index"]] = Player(rec["player"])
    return board
```

### 12.3 Isolated Playback Controller

```python
class ReplayManager(QObject):
    frame_changed     = pyqtSignal(int, int, object)  # (frame, max, board)
    playback_finished = pyqtSignal()
    status_changed    = pyqtSignal(str)                # "playing"|"paused"|"stopped"

    def load(self, replay, user_id): ...    # Ownership validation
    def play(self): ...                     # Start/resume
    def pause(self): ...                    # Pause
    def stop(self): ...                     # Stop and reset
    def restart(self): ...                  # Reset to frame 0 and play
    def step_forward(self): ...             # Manual advance
    def step_back(self): ...                # Manual reverse (rebuilds board)
    def seek(self, frame): ...              # Jump to arbitrary frame
```

**Design:** The `ReplayManager` maintains an isolated board state that never touches the live game board. The UI connects only to signals — it never reads internal state directly.

---

## 13. Design Patterns & Engineering Principles

### 13.1 Patterns Applied

| Pattern | Where Used |
|---------|-----------|
| **Strategy** | AI difficulty tiers (`EasyAIStrategy`, `MediumAIStrategy`, `HardAIStrategy`) |
| **Factory** | `DifficultyRouter.create_ai()`, `BoardConfig.for_size()` |
| **Observer/Pub-Sub** | `EventBus` with `subscribe()`/`emit()` |
| **State** | `GameState`, `GameStatus` enum |
| **Repository** | Abstract `ProfileRepository`, `GameResultRepository`, `ReplayRepository` |
| **Template Method** | `BaseJsonStorage._load()` → `_migrate()` |
| **Adapter** | `ReplayAdapter` bridging function-based storage to class interface |
| **Singleton** | `Logger` class (class-level `_logger`) |
| **Command** | `safe_run(fn, fallback, code, logger)` |

### 13.2 Engineering Principles

- **Single Responsibility:** Each class does one thing well
- **Open/Closed:** Theme system extensible via `register_custom_theme()`
- **Liskov Substitution:** All AI strategies implement the same interface
- **Interface Segregation:** Abstract repositories define minimal contracts
- **Dependency Inversion:** Domain depends on abstractions, infrastructure provides implementations
- **Immutability:** `BoardConfig` is frozen, `GameEngine` methods are stateless

### 13.3 Code Quality Standards

- **Type Hints:** Comprehensive throughout all iterations
- **Dataclasses:** Used for all value objects and data containers
- **Docstrings:** Module-level, class-level, and method-level documentation
- **Error Handling:** Typed exceptions with machine-readable error codes
- **Logging:** Structured, namespaced logging across all subsystems

---

## 14. Configuration & Deployment

### 14.1 Requirements

```
Python 3.11+
PyQt6 (for Vexon)
```

### 14.2 Installation

```bash
pip install PyQt6
python vexon.py
```

### 14.3 Data Files

All data is stored in `~/.vexon/` — no files are written to the application directory. This follows the XDG convention for user data.

### 14.4 Multi-User Support

Vexon supports multiple user profiles with:
- UUID-based player identification
- Per-user statistics tracking
- Replay ownership validation (users can only view their own replays)
- Profile creation and management

---

## 15. Lessons Learned & Technical Reflections

### 15.1 Architecture Complexity vs. Problem Complexity

The first iteration (Clean Architecture DDD) demonstrated a critical engineering lesson: **architecture should match problem complexity**. A Tic-Tac-Toe game does not need abstract repositories, use cases, and infrastructure layers. The second iteration found a better balance with modular flat architecture, and the third iteration (Vexon) demonstrated that a well-structured single file can be more maintainable than premature modularization for a self-contained desktop application.

### 15.2 AI Algorithm Selection

The three-tier AI system demonstrates an understanding that different contexts require different approaches:
- **Easy AI** — Weighted randomness creates an approachable opponent
- **Medium AI** — Heuristic + noise creates a beatable but challenging opponent
- **Hard AI** — Minimax with optimizations creates a near-perfect opponent

### 15.3 Performance Engineering

The depth-limited minimax with transposition tables and move ordering demonstrates practical performance engineering — maintaining responsiveness on boards up to 10×10 while preserving AI quality.

### 15.4 Cross-Framework Experience

Working across Tkinter, PyQt5, and PyQt6 demonstrates adaptability and understanding of GUI event loops, threading models, and widget lifecycle management across different frameworks.

### 15.5 Procedural Sound as Zero-Dependency Solution

The ADSR synthesis approach eliminates the need for external audio assets while producing musically appropriate sound effects — a creative engineering solution to the deployment constraint of bundling audio files.

---

*This document represents the complete technical reference for the Strategic Grid Game System project. All architecture decisions, algorithms, and implementation details are derived directly from the source codebase.*

type Coord = [number, number];

interface StepState {
  player_1: Coord[];
  player_2: Coord[];
  board_state: "waiting" | "pending" | "win" | "draw";
  winner?: {
    who: "player_1" | "player_2";
    positions: Coord[];
  };
}

export function validator(moves: number[]): Record<string, StepState> {
  const ROWS = 6;
  const COLS = 7;
  const steps: Record<string, StepState> = {};

  // Инициализация пустого состояния
  steps["step_0"] = {
    player_1: [],
    player_2: [],
    board_state: "waiting",
  };

  // Матрица поля
  const board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  function drop(col: number, player: number): Coord | null {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === 0) {
        board[row][col] = player;
        return [row, col];
      }
    }
    return null;
  }

  
  type Coord = [number, number];

function checkWin(row: number, col: number): Coord[] | null {
  const player = board[row][col];
  if (player === 0) return null;
  const pl: Coord[] = [];

  // Проверка по вертикали ↓
  for (let i = 5; i >= 3; i--) {
    if (
      board[i][col] === player &&
      board[i - 1][col] === player &&
      board[i - 2][col] === player &&
      board[i - 3][col] === player
    ) {
      return [
        [i, col],
        [i - 1, col],
        [i - 2, col],
        [i - 3, col],
      ];
    }
  }

  // Проверка по горизонтали →
  for (let i = 6; i >= 3; i--) {
    if (
      board[row][i] === player &&
      board[row][i - 1] === player &&
      board[row][i - 2] === player &&
      board[row][i - 3] === player
    ) {
      return [
        [row, i],
        [row, i - 1],
        [row, i - 2],
        [row, i - 3],
      ];
    }
  }

  // Диагональ ↘
  let r = row,
    c = col;
  while (r + 1 < 6 && c + 1 < 7) {
    r++;
    c++;
  }
  while (r - 3 >= 0 && c - 3 >= 0) {
    if (
      board[r][c] === player &&
      board[r - 1][c - 1] === player &&
      board[r - 2][c - 2] === player &&
      board[r - 3][c - 3] === player
    ) {
      return [
        [r, c],
        [r - 1, c - 1],
        [r - 2, c - 2],
        [r - 3, c - 3],
      ];
    }
    r--;
    c--;
  }

  // Диагональ ↙
  r = row;
  c = col;
  while (r - 1 >= 0 && c + 1 < 7) {
    r--;
    c++;
  }
  while (r + 3 < 6 && c - 3 >= 0) {
    if (
      board[r][c] === player &&
      board[r + 1][c - 1] === player &&
      board[r + 2][c - 2] === player &&
      board[r + 3][c - 3] === player
    ) {
      return [
        [r, c],
        [r + 1, c - 1],
        [r + 2, c - 2],
        [r + 3, c - 3],
      ];
    }
    r++;
    c--;
  }

  return null;
}


  for (let i = 0; i < moves.length; i++) {
    const player = i % 2 === 0 ? 1 : 2;
    const col = moves[i];
    const coord = drop(col, player);
    if (!coord) continue;

    const [r, c] = coord;
    const winLine = checkWin(r, c);

    const coords1: Coord[] = [];
    const coords2: Coord[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (board[row][col] === 1) coords1.push([row, col]);
        if (board[row][col] === 2) coords2.push([row, col]);
      }
    }

    const stepKey = `step_${i + 1}`;

    if (winLine) {
      steps[stepKey] = {
        player_1: coords1,
        player_2: coords2,
        board_state: "win",
        winner: {
          who: player === 1 ? "player_1" : "player_2",
          positions: winLine,
        },
      };
      // после победы прекращаем построение шагов
      break;
    } else if (i === ROWS * COLS - 1) {
      steps[stepKey] = {
        player_1: coords1,
        player_2: coords2,
        board_state: "draw",
      };
    } else {
      steps[stepKey] = {
        player_1: coords1,
        player_2: coords2,
        board_state: "pending",
      };
    }
  }

  return steps;
}
console.log(validator)
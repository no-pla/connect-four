import { createSlice } from "@reduxjs/toolkit";

interface GameState {
  board: ("RED" | "YELLOW" | null)[][];
  firstPlayer: "RED" | "YELLOW";
  currentPlayer: "RED" | "YELLOW";
  markerCount: number;
  winner: "RED" | "YELLOW" | "DRAW" | null;
  redWin: number;
  yellowWin: number;
  timer: number;
  stop: boolean;
  notMaxLine: number[] | [];
  connectFour: (number | null)[][];
  left: string;
}

const initialState: GameState = {
  board: [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ],
  firstPlayer: "RED",
  currentPlayer: "RED",
  markerCount: 0,
  winner: null,
  redWin: 0,
  yellowWin: 0,
  timer: 30,
  stop: false,
  notMaxLine: [0, 1, 2, 3, 4, 5, 6],
  connectFour: [],
  left: "left-[30px]",
};

interface ActionsData {
  payload: {
    type: "NORMAL" | "FORCE";
    lineNumber?: number;
    currentPlayer: "RED" | "YELLOW";
  };
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    dropMarker: (state, actions: ActionsData) => {
      if (state.stop) return;
      if (state.winner !== null) {
        if (state.winner !== "DRAW") {
          console.warn(`이미 종료된 게임입니다. 승자는 ${state.winner}입니다.`);
        } else {
          console.warn("일시 중지 중인 게임입니다.");
        }
        return;
      }

      let lineNumber;

      if (actions.payload.type === "FORCE") {
        lineNumber =
          state.notMaxLine[Math.floor(state.notMaxLine.length * Math.random())];
      } else {
        lineNumber = actions.payload.lineNumber;
      }

      if (state.board[lineNumber!][0] !== null) return;

      let location: null | number = null;

      for (let i = 5; i >= 0; i--) {
        if (state.board[lineNumber!][i] === null) {
          state.board[lineNumber!][i] = state.currentPlayer;
          location = i;
          break;
        }
      }

      if (location === 0) {
        state.notMaxLine = state.notMaxLine.filter(
          (lineNumber) => lineNumber !== actions.payload.lineNumber
        );
      }

      state.markerCount += 1;

      if (state.markerCount >= 7) {
        // 모든 방향을 체크하기 위해 방향 벡터를 사용한다.
        const movement = [
          { dx: 1, dy: 0 }, // 가로
          { dx: 0, dy: 1 }, // 세로
          { dx: -1, dy: 1 }, // 양수 대각선
          { dx: -1, dy: -1 }, // 음수 대각선
        ];

        // 연결 테스트
        const checkDirection = (dx: number, dy: number): number[][] => {
          const count = [[lineNumber!, location!]]; // 기존 마커도 추가.

          let pnx = lineNumber! + dx; // X축 각 방향별로 1칸씩 이동
          let pny = location! + dy; // Y축 각 방향별로 1칸씩 이동

          while (
            // 각 좌표가 보드 내에 있고, 해당 위치에 있는 마커가 현재 유저의 마커와 같은 색상의 마커인지 확인한다.
            // 만약 마커가 보드를 넘어갈 경우, 종료.
            pnx >= 0 &&
            pny >= 0 &&
            pnx <= 6 &&
            pny <= 5 &&
            state.board[pnx][pny] === state.currentPlayer
          ) {
            count.push([pnx, pny]);
            pnx += dx;
            pny += dy;
          }

          let mnx = lineNumber! - dx; // X축 각 방향별로 1칸씩 이동
          let mny = location! - dy; // Y축 각 방향별로 1칸씩 이동

          while (
            // 각 좌표가 보드 내에 있고, 해당 위치에 있는 마커가 현재 유저의 마커와 같은 색상의 마커인지 확인한다.
            // 만약 마커가 보드를 넘어갈 경우, 종료.
            mnx >= 0 &&
            mny >= 0 &&
            mnx <= 6 &&
            mny <= 5 &&
            state.board[mnx][mny] === state.currentPlayer
          ) {
            count.push([mnx, mny]);
            mnx -= dx;
            mny -= dy;
          }

          return count;
        };

        for (const { dx, dy } of movement) {
          const count: number[][] = checkDirection(dx, dy);

          if (count.length >= 4) {
            state.winner = actions.payload.currentPlayer!;

            if (state.winner === "RED") {
              state.redWin += 1;
            } else {
              state.yellowWin += 1;
            }
            state.connectFour = count;
            return;
          }
        }
      }

      if (state.notMaxLine.length === 0) {
        state.winner = "DRAW";
      }

      state.currentPlayer = state.currentPlayer === "RED" ? "YELLOW" : "RED";

      state.timer = 30;
    },
    ticktock: (state) => {
      state.timer -= 1;
    },
    setStop: (state) => {
      state.stop = !state.stop;
    },
    reset: (
      state,
      actions: {
        payload: {
          firstPlayer?: "RED" | "YELLOW";
        };
      }
    ) => {
      const newGameState: GameState = {
        ...initialState,
        redWin: state.redWin,
        yellowWin: state.yellowWin,
        firstPlayer: actions.payload.firstPlayer === "RED" ? "YELLOW" : "RED",
        currentPlayer: actions.payload.firstPlayer === "RED" ? "YELLOW" : "RED",
      };

      return newGameState;
    },
    resetAll: () => initialState,
    emphasizeColumn: (
      state,
      actions: {
        payload: {
          columnNumber: number;
        };
      }
    ) => {
      if (state.stop || state.winner !== null) return;

      const colNum = actions.payload.columnNumber;

      switch (colNum) {
        case 0:
          state.left = "left-[30px]";
          break;
        case 1:
          state.left = "left-[120px]";
          break;
        case 2:
          state.left = "left-[210px]";
          break;
        case 3:
          state.left = "left-[300px]";
          break;
        case 4:
          state.left = "left-[385px]";
          break;
        case 5:
          state.left = "left-[475px]";
          break;
        default:
          state.left = "left-[560px]";
          break;
      }
    },
  },
});

export const {
  dropMarker,
  reset,
  ticktock,
  setStop,
  resetAll,
  emphasizeColumn,
} = gameSlice.actions;

export default gameSlice.reducer;

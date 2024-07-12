import { createSlice } from "@reduxjs/toolkit";

interface GameState {
  board: ("RED" | "YELLOW" | null)[][];
  currentPlayer: "RED" | "YELLOW";
  markerCount: number;
  winner: "RED" | "YELLOW" | "DRAW" | null;
  redWin: number;
  yellowWin: number;
  timer: number;
  stop: boolean;
  notMaxLine: number[] | [];
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
  currentPlayer: "RED",
  markerCount: 0,
  winner: null,
  redWin: 0,
  yellowWin: 0,
  timer: 30,
  stop: false,
  notMaxLine: [0, 1, 2, 3, 4, 5, 6],
};

interface ActionsData {
  payload: {
    lineNumber: number;
    player: "RED" | "YELLOW";
  };
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    drop: (state, actions: ActionsData) => {
      if (state.stop) return;
      if (state.winner !== null) {
        if (state.winner !== "DRAW") {
          console.warn(`이미 종료된 게임입니다. 승자는 ${state.winner}입니다.`);
        } else {
          console.warn("일시 중지 중인 게임입니다.");
        }
        return;
      }

      if (state.board[actions.payload.lineNumber][0] !== null) {
        console.warn(
          `${actions.payload.lineNumber + 1} 열은 이미 전부 채워진 열입니다.`
        );
      }

      let location: null | number = null;

      for (let i = 5; i >= 0; i--) {
        if (state.board[actions.payload.lineNumber][i] === null) {
          state.board[actions.payload.lineNumber][i] =
            state.currentPlayer === "RED" ? "RED" : "YELLOW";
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
        const checkDirection = (dx: number, dy: number) => {
          let count = 1; // 기존 마커도 추가.

          let pnx = actions.payload.lineNumber + dx; // X축 각 방향별로 1칸씩 이동
          let pny = location! + dy; // Y축 각 방향별로 1칸씩 이동

          while (
            // 각 좌표가 보드 내에 있고, 해당 위치에 있는 마커가 현재 유저의 마커와 같은 색상의 마커인지 확인한다.
            // 만약 마커가 보드를 넘어갈 경우, 종료.
            pnx >= 0 &&
            pny >= 0 &&
            pnx <= 6 &&
            pny <= 5 &&
            state.board[pnx][pny] === actions.payload.player
          ) {
            count++;
            pnx += dx;
            pny += dy;
          }

          let mnx = actions.payload.lineNumber - dx; // X축 각 방향별로 1칸씩 이동
          let mny = location! - dy; // Y축 각 방향별로 1칸씩 이동

          while (
            // 각 좌표가 보드 내에 있고, 해당 위치에 있는 마커가 현재 유저의 마커와 같은 색상의 마커인지 확인한다.
            // 만약 마커가 보드를 넘어갈 경우, 종료.
            mnx >= 0 &&
            mny >= 0 &&
            mnx <= 6 &&
            mny <= 5 &&
            state.board[mnx][mny] === actions.payload.player
          ) {
            count++;
            mnx -= dx;
            mny -= dy;
          }

          return count;
        };

        for (const { dx, dy } of movement) {
          const count = checkDirection(dx, dy);

          if (count >= 4) {
            state.winner = actions.payload.player;

            if (state.winner === "RED") {
              state.redWin += 1;
            } else {
              state.yellowWin += 1;
            }

            return;
          }
        }
      }

      if (state.notMaxLine.length === 0) {
        state.winner = "DRAW";
      }

      state.currentPlayer = actions.payload.player === "RED" ? "YELLOW" : "RED";
      state.timer = 30;
    },
    ticktock: (state) => {
      state.timer -= 1;
    },
    forceDrop: (state) => {
      if (state.stop) return;

      const lineNumber =
        state.notMaxLine[Math.floor(state.notMaxLine.length * Math.random())];

      let location;

      for (let i = 6; i >= 0; i--) {
        if (state.board[lineNumber][i] === null) {
          state.board[lineNumber][i] =
            state.currentPlayer === "RED" ? "RED" : "YELLOW";
          location = i;
          break;
        }
      }

      state.markerCount += 1;

      // 연결 테스트

      if (state.markerCount >= 7) {
        // 모든 방향을 체크하기 위해 방향 벡터를 사용한다.
        const movement = [
          { dx: 1, dy: 0 }, // 가로
          { dx: 0, dy: 1 }, // 세로
          { dx: -1, dy: 1 }, // 양수 대각선
          { dx: -1, dy: -1 }, // 음수 대각선
        ];

        // 연결 테스트
        const checkDirection = (dx: number, dy: number) => {
          let count = 1; // 기존 마커도 추가.

          let pnx = lineNumber + dx; // X축 각 방향별로 1칸씩 이동
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
            count++;
            pnx += dx;
            pny += dy;
          }

          let mnx = lineNumber - dx; // X축 각 방향별로 1칸씩 이동
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
            count++;
            mnx -= dx;
            mny -= dy;
          }

          return count;
        };

        for (const { dx, dy } of movement) {
          const count = checkDirection(dx, dy);

          if (count >= 4) {
            state.winner = state.currentPlayer;

            if (state.winner === "RED") {
              state.redWin += 1;
            } else {
              state.yellowWin += 1;
            }

            return;
          }
        }
      }

      state.currentPlayer = state.currentPlayer === "RED" ? "YELLOW" : "RED";
      state.timer = 30;
    },
    setStop: (state) => {
      state.stop = !state.stop;
    },
    reset: (state) => {
      state.board = initialState.board;
      state.currentPlayer = "RED";
      state.markerCount = 0;
      state.winner = null;
      state.redWin = 0;
      state.yellowWin = 0;
      state.timer = 30;
      state.stop = false;
      state.notMaxLine = initialState.notMaxLine;
    },
  },
});

export const { drop, reset, ticktock, forceDrop, setStop } = gameSlice.actions;

export default gameSlice.reducer;

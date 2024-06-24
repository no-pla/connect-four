import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ] as ("RED" | "YELLOW" | null)[][],
  currentPlayer: "RED",
  markerCount: 0,
  winner: null,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    drop: (state, actions) => {
      if (state.winner !== null) {
        console.warn(`이미 종료된 게임입니다. 승자는 ${state.winner}입니다.`);
        return;
      }
      if (state.board[actions.payload.lineNumber][0] !== null) {
        console.warn(
          `${actions.payload.lineNumber + 1} 열은 이미 전부 채워진 열입니다.`
        );
        return;
      }

      let location = null;

      /**
       * 만약 선택한 행의 첫 번째 셀이 null이 아니면 리턴.
       * TODO: 위 경우 다시 마커를 둘 수 있도록 처리해야 한다.
       */
      for (let i = 6; i >= 0; i--) {
        if (state.board[actions.payload.lineNumber][i] === null) {
          state.board[actions.payload.lineNumber][i] =
            state.currentPlayer === "RED" ? "RED" : "YELLOW";
          location = i;
          break;
        }
      }

      state.markerCount += 1;

      let rowCount = 1;
      let colCount = 1;

      if (state.markerCount >= 7) {
        for (let i = 1; i <= 3; i++) {
          if ((rowCount || colCount) >= 4) {
            break;
          }

          // 가로 테스트
          if (
            actions.payload.lineNumber + i <= 6 &&
            state.board[actions.payload.lineNumber + i][location!] ===
              actions.payload.player
          ) {
            rowCount += 1;
          } else {
            break;
          }
        }

        for (let i = 1; i <= 3; i++) {
          if ((rowCount || colCount) >= 4) {
            break;
          }

          if (
            actions.payload.lineNumber - i >= 0 &&
            state.board[actions.payload.lineNumber - i][location!] ===
              actions.payload.player
          ) {
            rowCount += 1;
          } else {
            break;
          }
        }
        // 세로 테스트
        for (let i = 1; i <= 3; i++) {
          if ((rowCount || colCount) >= 4) {
            break;
          }

          if (
            location! + i <= 5 &&
            state.board[actions.payload.lineNumber][location! + i] ===
              actions.payload.player
          ) {
            colCount += 1;
          } else {
            break;
          }
        }

        for (let i = 1; i <= 3; i++) {
          if ((rowCount || colCount) >= 4) {
            break;
          }

          if (
            location! - i >= 5 &&
            state.board[actions.payload.lineNumber][location! - i] ===
              actions.payload.player
          ) {
            colCount += 1;
          } else {
            break;
          }
        }
        // TODO: 대각선 테스트

        if (colCount >= 4 || rowCount >= 4) {
          state.winner = actions.payload.player;
        }
      }

      state.currentPlayer = actions.payload.player === "RED" ? "YELLOW" : "RED";
    },
  },
});

export const { drop } = gameSlice.actions;

export default gameSlice.reducer;

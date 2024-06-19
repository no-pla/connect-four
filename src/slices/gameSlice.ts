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
  ] as ("R" | "Y" | null)[][],
  currentPlayer: "RED",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    drop: (state, actions) => {
      if (state.board[actions.payload.lineNumber][0] !== null) {
        console.warn(
          `${actions.payload.lineNumber + 1} 열은 이미 전부 채워진 열입니다.`
        );
        return;
      }
      for (let i = 5; i >= 0; i--) {
        if (state.board[actions.payload.lineNumber][i] === null) {
          state.board[actions.payload.lineNumber][i] =
            state.currentPlayer === "RED" ? "R" : "Y";
          break;
        }
      }
    },
    changePlayer: (state, actions) => {
      state.currentPlayer = actions.payload.player === "RED" ? "YELLOW" : "RED";
    },
  },
});

export const { drop, changePlayer } = gameSlice.actions;

export default gameSlice.reducer;

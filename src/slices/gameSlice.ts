import { Action, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { startListening } from "../../src/middleware/localStorageMiddleware";

interface RootState {
  game: GameState;
}

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
  left: number;
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
  left: 0,
};

interface ActionsData {
  payload: {
    type: "NORMAL" | "FORCE";
    lineNumber?: number;
  };
}

interface WinCheckActionsData {
  payload: {
    lineNumber: number;
    location: number;
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
        gameSlice.caseReducers.checkWin(state, {
          payload: {
            location: location!,
            lineNumber: lineNumber!,
          },
        });
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
    checkWin: (state, actions: WinCheckActionsData) => {
      // 모든 방향을 체크하기 위해 방향 벡터를 사용한다.
      const movement = [
        { dx: 1, dy: 0 }, // 가로
        { dx: 0, dy: 1 }, // 세로
        { dx: -1, dy: 1 }, // 양수 대각선
        { dx: -1, dy: -1 }, // 음수 대각선
      ];
      /**
       * @description 방향 벡터를 이용하여 최근에 둔 마커를 기준으로 가로/세로/대각선을 양방향으로 검사한다.
       * @param dx
       * @param dy
       * @returns
       */
      const checkDirection = (dx: number, dy: number): number[][] => {
        const count = [[actions.payload.lineNumber, actions.payload.location]]; // 기존 마커도 추가.
        let pnx = actions.payload.lineNumber + dx; // X축 각 방향별로 1칸씩 이동
        let pny = actions.payload.location + dy; // Y축 각 방향별로 1칸씩 이동
        while (
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
        let mnx = actions.payload.lineNumber - dx; // X축 각 방향별로 1칸씩 이동
        let mny = actions.payload.location - dy; // Y축 각 방향별로 1칸씩 이동
        while (
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
          state.winner = state.currentPlayer!;
          if (state.winner === "RED") {
            state.redWin += 1;
          } else {
            state.yellowWin += 1;
          }
          state.connectFour = count;
          return;
        }
      }
      if (state.notMaxLine.length === 0) {
        state.winner = "DRAW";
      }
    },
    emphasizeColumn: (
      state,
      actions: {
        payload: {
          columnNumber: number;
        };
      }
    ) => {
      if (state.stop || state.winner !== null) return;
      state.left = actions.payload.columnNumber;
    },
    /**
     * 만약 로컬 스토리지에 저장 데이터가 있다면, 현재 state로 설정
     * @param _state
     * @param actions
     * @returns
     */
    getSavedData: (
      _state,
      actions: {
        payload: {
          game: GameState;
        };
      }
    ) => actions.payload.game,
    reset: (state) => {
      return {
        ...initialState,
        redWin: state.redWin,
        yellowWin: state.yellowWin,
        firstPlayer: state.firstPlayer === "RED" ? "YELLOW" : "RED",
        currentPlayer: state.firstPlayer === "RED" ? "YELLOW" : "RED",
        left: 0,
      };
    },
    resetAll: () => initialState,
  },
});

export const {
  dropMarker,
  reset,
  ticktock,
  setStop,
  resetAll,
  emphasizeColumn,
  getSavedData,
} = gameSlice.actions;

export default gameSlice.reducer;

startListening({
  matcher: isAnyOf(dropMarker, reset),
  effect: (_action: Action, listenerApi) => {
    const newData = (listenerApi.getState() as RootState).game;
    localStorage.setItem("connect-four", JSON.stringify(newData));
  },
});

startListening({
  actionCreator: resetAll,
  effect: () => {
    localStorage.clear();
  },
});

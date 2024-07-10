import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import gameSlice, { drop, forceDrop, reset } from "../slices/gameSlice";
import { Provider } from "react-redux";
import { setupStore } from "../share/store";
import Index from "../pages";
import WinnerCard from "../components/Game/WinnerCard";

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

describe("게임 페이지 테스트", () => {
  describe("초기 상태 테스트", () => {
    it("시작 시, 보드가 비어있는지 테스트한다.", () => {
      const initialBoard = [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
      ];
      const board = gameSlice(undefined, { type: "" }).board;
      expect(board).toEqual(initialBoard);
    });
    it("필수 UI 요소가 모두 랜더링 되었는지 테스트한다.", () => {
      render(
        <Provider store={setupStore()}>
          <Index />
        </Provider>
      );
      const header = screen.getByRole("banner"); // header의 Role은 banner
      const players = screen.getAllByTestId(/user-score/i);
      const timer = screen.getByTestId("timer");
      const gameBoard = screen.getByTestId("game-board");

      expect(header).toBeInTheDocument();
      expect(players.length).toBe(2);
      expect(timer).toBeInTheDocument();
      expect(gameBoard).toBeInTheDocument();
    });
    it("시작 시, 타이머가 30초로 설정되었는지 테스트한다.", () => {
      const timer = gameSlice(undefined, { type: "" }).timer;
      expect(timer).toEqual(30);
    });
    it("최초 시작 시 점수가 모두 0으로 처리되는지 테스트한다.", () => {
      const playerOneScore = gameSlice(undefined, { type: "" }).redWin;
      const playerTwoScore = gameSlice(undefined, { type: "" }).yellowWin;
      expect(playerOneScore).toEqual(0);
      expect(playerTwoScore).toEqual(0);
    });
  });

  describe("게임 진행 테스트", () => {
    describe("기본 게임 진행 테스트", () => {
      const testData: [GameState, { lineNumber: number; equal: boolean }][] = [
        [
          {
            board: [
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
            ] as ("RED" | "YELLOW" | null)[][],
            currentPlayer: "RED" as "RED" | "YELLOW",
            markerCount: 0,
            winner: null,
            redWin: 0,
            yellowWin: 0,
            timer: 30,
            stop: false as boolean,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          {
            lineNumber: 0,
            equal: true,
          },
        ],
        [
          {
            board: [
              [null, null, null, null, "YELLOW", "RED"],
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
            ] as ("RED" | "YELLOW" | null)[][],
            currentPlayer: "YELLOW",
            markerCount: 3,
            winner: null,
            redWin: 0,
            yellowWin: 0,
            timer: 30,
            stop: false as boolean,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          {
            lineNumber: 0,
            equal: true,
          },
        ],
        [
          {
            board: [
              [null, null, null, null, "YELLOW", "RED"],
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
            ] as ("RED" | "YELLOW" | null)[][],
            currentPlayer: "YELLOW",
            markerCount: 3,
            winner: null,
            redWin: 0,
            yellowWin: 0,
            timer: 30,
            stop: false as boolean,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          {
            lineNumber: 0,
            equal: false,
          },
        ],
        [
          {
            board: [
              [null, null, null, null, "YELLOW", "RED"],
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, "YELLOW", "RED"],
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, "YELLOW"],
            ] as ("RED" | "YELLOW" | null)[][],
            currentPlayer: "YELLOW",
            markerCount: 7,
            winner: null,
            redWin: 0,
            yellowWin: 0,
            timer: 30,
            stop: false as boolean,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          {
            lineNumber: 3,
            equal: true,
          },
        ],
      ];
      it.each(testData)(
        "마커가 맨 아래에 떨어지는지 테스트한다.",
        (board, { lineNumber, equal }) => {
          const dropLine = gameSlice(
            board,
            drop({ lineNumber, player: board.currentPlayer })
          ).board[lineNumber];

          for (let i = 0; i < dropLine.length; i++) {
            if (dropLine[i] !== null) {
              if (equal) {
                expect(dropLine[i]).toEqual(board.currentPlayer);
              } else {
                expect(dropLine[i]).not.toEqual(
                  board.currentPlayer === "RED" ? "YELLOW" : "RED"
                );
              }
              break;
            }
          }
        }
      );

      const reset30sTestCase = [
        {
          ...initialState,
          timer: 11,
        },
        {
          ...initialState,
          timer: 21,
        },
        {
          ...initialState,
          timer: 14,
        },
      ];

      it.each(reset30sTestCase)(
        "플레이어가 전환될 때마다, 타이머가 30초로 초기화되는지 테스트한다.",
        (cases) => {
          const result = gameSlice(cases, forceDrop());
          expect(result.timer).toBe(30);
        }
      );
    });

    const currentPlayer: ("RED" | "YELLOW")[] = ["RED", "YELLOW"];

    it.each(currentPlayer)(
      "플레이어가 번갈아 가며 두는지 테스트한다.",
      (player) => {
        const result = gameSlice(
          {
            ...initialState,
            currentPlayer: player,
          },
          drop({
            player,
            lineNumber: 1,
          })
        );

        expect(result.currentPlayer).not.toEqual(player);
      }
    );
  });

  describe("게임 결과 테스트", () => {
    describe("승리 테스트", () => {
      const horizontalWinData: [
        GameState,
        { currentPlayer: "RED" | "YELLOW"; dropLine: number }
      ][] = [
        [
          {
            ...initialState,
            board: [
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, "RED", "RED", "RED"],
              [null, null, null, "YELLOW", "YELLOW", "YELLOW"],
            ],
            currentPlayer: "RED",
            markerCount: 6,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          {
            currentPlayer: "RED",
            dropLine: 5,
          },
        ],
        [
          {
            ...initialState,
            board: [
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, "YELLOW", "YELLOW", "YELLOW"],
              [null, null, null, "RED", "RED", "RED"],
              [null, null, null, "YELLOW", "YELLOW", "YELLOW"],
            ],
            currentPlayer: "YELLOW",
            markerCount: 6,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          {
            currentPlayer: "YELLOW",
            dropLine: 6,
          },
        ],
        [
          {
            ...initialState,
            board: [
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, "RED", "RED", "RED"],
              [null, null, null, "YELLOW", "YELLOW", "YELLOW"],
              [null, null, null, null, null, null],
            ],
            currentPlayer: "YELLOW",
            markerCount: 7,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          {
            currentPlayer: "YELLOW",
            dropLine: 5,
          },
        ],
      ];

      it.each(horizontalWinData)(
        "가로 승리 조건을 확인하는지 테스트한다.",
        (game, { dropLine, currentPlayer }) => {
          const result = gameSlice(
            game,
            drop({ lineNumber: dropLine, player: currentPlayer })
          );

          expect(result.winner).toEqual(currentPlayer);
        }
      );

      const verticalWinCases: [
        GameState,
        { currentPlayer: "RED" | "YELLOW"; dropLine: number }
      ][] = [
        [
          {
            ...initialState,
            board: [
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, null],
              [null, null, null, null, null, "YELLOW"],
              [null, null, null, null, null, "YELLOW"],
              [null, null, null, null, null, "YELLOW"],
            ],
            currentPlayer: "RED",
            markerCount: 6,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          { currentPlayer: "RED", dropLine: 3 },
        ],
        [
          {
            ...initialState,
            board: [
              [null, null, null, null, null, "YELLOW"],
              [null, null, null, null, null, "YELLOW"],
              [null, null, null, null, "YELLOW", "YELLOW"],
              [null, null, null, null, null, null],
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, "RED"],
              [null, null, null, null, "RED", "RED"],
            ],
            currentPlayer: "YELLOW",
            markerCount: 8,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          { currentPlayer: "YELLOW", dropLine: 3 },
        ],
      ];

      it.each(verticalWinCases)(
        "세로 승리 조건을 확인하는지 테스트한다.",
        (game, { dropLine, currentPlayer }) => {
          const result = gameSlice(
            game,
            drop({ lineNumber: dropLine, player: currentPlayer })
          );

          expect(result.winner).toEqual(currentPlayer);
        }
      );

      const diagonalWinCases: [
        GameState,
        { currentPlayer: "RED" | "YELLOW"; dropLine: number }
      ][] = [
        [
          {
            ...initialState,
            board: [
              [null, null, null, null, null, "RED"],
              [null, null, null, null, "RED", "YELLOW"],
              [null, null, null, "RED", "YELLOW", "YELLOW"],
              [null, null, null, "RED", "YELLOW", "RED"],
              [null, null, null, null, null, "YELLOW"],
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
            ],
            currentPlayer: "RED",
            markerCount: 10,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          { currentPlayer: "RED", dropLine: 3 },
        ],
        [
          {
            ...initialState,
            board: [
              [null, null, null, null, null, "YELLOW"],
              [null, null, null, null, "YELLOW", "RED"],
              [null, null, null, "YELLOW", "RED", "RED"],
              [null, null, null, "YELLOW", "RED", "YELLOW"],
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, null],
            ],
            currentPlayer: "YELLOW",
            markerCount: 11,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          { currentPlayer: "YELLOW", dropLine: 3 },
        ],
        [
          {
            ...initialState,
            board: [
              [null, null, null, null, null, null],
              [null, null, null, null, null, null],
              [null, null, null, "YELLOW", "RED", "YELLOW"],
              [null, null, null, "RED", "YELLOW", "YELLOW"],
              [null, null, null, null, "RED", "YELLOW"],
              [null, null, null, null, null, "RED"],
              [null, null, null, null, null, null],
            ],
            currentPlayer: "YELLOW",
            markerCount: 9,
            notMaxLine: [0, 1, 2, 3, 4, 5, 6],
          },
          { currentPlayer: "RED", dropLine: 2 },
        ],
      ];

      it.each(diagonalWinCases)(
        "대각선 승리 조건을 확인하는지 테스트한다.",
        (game, { dropLine, currentPlayer }) => {
          const result = gameSlice(
            game,
            drop({ lineNumber: dropLine, player: currentPlayer })
          );

          expect(result.winner).toEqual(currentPlayer);
        }
      );

      const drawWinCases: [
        GameState,
        { currentPlayer: "RED" | "YELLOW"; dropLine: number }
      ][] = [
        [
          {
            ...initialState,

            board: [
              ["YELLOW", "RED", "YELLOW", "YELLOW", "RED", "RED"],
              ["YELLOW", "RED", "RED", "YELLOW", "YELLOW", "RED"],
              [null, "RED", "RED", "RED", "YELLOW", "RED"],
              ["RED", "YELLOW", "RED", "YELLOW", "YELLOW", "YELLOW"],
              ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "RED"],
              ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "RED"],
              ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "RED"],
            ],
            currentPlayer: "YELLOW",
            markerCount: 41,
            notMaxLine: [2],
          },
          {
            currentPlayer: "YELLOW",
            dropLine: 2,
          },
        ],
        [
          {
            ...initialState,

            board: [
              ["YELLOW", "RED", "YELLOW", "YELLOW", "RED", "RED"],
              ["YELLOW", "RED", "RED", "YELLOW", "YELLOW", "RED"],
              ["YELLOW", "RED", "RED", "RED", "YELLOW", "RED"],
              ["RED", "YELLOW", "RED", "YELLOW", "YELLOW", "YELLOW"],
              [null, "RED", "YELLOW", "RED", "YELLOW", "RED"],
              ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "RED"],
              ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "RED"],
            ],
            currentPlayer: "RED",
            markerCount: 41,
            notMaxLine: [4],
          },
          {
            currentPlayer: "RED",
            dropLine: 4,
          },
        ],
      ];

      it.each(drawWinCases)(
        "보드가 꽉 찼을 때 무승부로 처리되는지 테스트한다.",
        (game, { dropLine, currentPlayer }) => {
          const result = gameSlice(
            game,
            drop({ lineNumber: dropLine, player: currentPlayer })
          );

          expect(result.winner).toEqual("DRAW");
        }
      );
    });

    describe("종료 테스트", () => {
      it("재시작 후 상태가 초기화되는지 테스트한다.", () => {
        const previousState: GameState = {
          board: [
            ["YELLOW", "RED", "YELLOW", "RED", "YELLOW", "RED"],
            [null, null, null, null, null, "RED"],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, "YELLOW", "RED"],
            [null, null, null, null, null, "RED"],
            [null, null, null, null, null, "YELLOW"],
          ] as ("RED" | "YELLOW" | null)[][],
          currentPlayer: "YELLOW",
          markerCount: 11,
          winner: null,
          redWin: 4,
          yellowWin: 10,
          timer: 30,
          stop: false as boolean,
          notMaxLine: [1, 2, 3, 4, 5, 6],
        };

        const resetData = gameSlice(previousState, reset());

        expect(resetData.board).toEqual(initialState.board);
        expect(resetData.currentPlayer).toBe(initialState.currentPlayer);
        expect(resetData.markerCount).toBe(initialState.markerCount);
        expect(resetData.winner).toBe(initialState.winner);
        expect(resetData.redWin).toBe(initialState.redWin);
        expect(resetData.yellowWin).toBe(initialState.yellowWin);
        expect(resetData.timer).toBe(initialState.timer);
        expect(resetData.stop).toBe(initialState.stop);
        expect(resetData.notMaxLine).toEqual(initialState.notMaxLine);
      });
    });
  });

  describe("UI 테스트", () => {
    beforeEach(() => {
      render(
        <Provider store={setupStore()}>
          <WinnerCard />
        </Provider>
      );
    });

    const winnerMessageTestCaese: GameState[] = [
      {
        ...initialState,
        board: [
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, "RED", "RED", "RED"],
          [null, null, "YELLOW", "YELLOW", "YELLOW", "YELLOW"],
        ],
        currentPlayer: "RED",
        markerCount: 7,
        notMaxLine: [0, 1, 2, 3, 4, 5, 6],
        winner: "YELLOW",
      },
      {
        ...initialState,
        board: [
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, null],
          [null, null, null, null, null, "YELLOW"],
          [null, null, "RED", "RED", "RED", "RED"],
          [null, null, "RED", "YELLOW", "YELLOW", "YELLOW"],
        ],
        currentPlayer: "RED",
        markerCount: 9,
        notMaxLine: [0, 1, 2, 3, 4, 5, 6],
        winner: "YELLOW",
      },
    ];

    it.each(winnerMessageTestCaese)(
      "승자 메시지가 올바르게 표시되는지 테스트한다.",
      (winner) => {
        const winnerBanner = screen.getByTestId("winner");
        const winUserIndex = winner.winner === "RED" ? 1 : 2;

        expect(winnerBanner).toHaveTextContent(winUserIndex);
      }
    );

    it.skip.each(["1", "2"])(
      "승리 시 마커가 시각적으로 강조되는지 테스트한다.",
      () => {
        expect(null).toBe(undefined);
      }
    );
  });
});

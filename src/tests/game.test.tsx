import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import gameSlice, { drop, reset, ticktock } from "../slices/gameSlice";

interface GameState {
  board: ("RED" | "YELLOW" | null)[][];
  currentPlayer: "RED" | "YELLOW";
  markerCount: number;
  winner: string | null;
  redWin: number;
  yellowWin: number;
  timer: number;
  stop: boolean;
  notMaxLine: number[];
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
  });

  it.skip("필수 UI 요소가 모두 랜더링 되었는지 테스트한다.", () => {
    // TODO: 이거 해야함
    const header = screen.getByRole("header");
    const players = screen.getAllByTestId(/유저/i);
    const timer = screen.getByTestId("timer");
    const gameBoard = screen.getByTestId("game-board");

    console.log(players);

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
        const dropLine = gameSlice(board, drop({ lineNumber })).board[
          lineNumber
        ];

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

    it.skip("30초가 지나면 마커가 자동으로 떨어지는지 테스트한다.", () => {
      // mock 타이머 실행 후, 30초가 지나면 자동으로 올바른 장소(꽉 차지 않은 배열)에 떨어뜨리는지 체크한다.)
      // 여러 테스트 케이스 넣기
    });
    it.skip("플레이어가 번갈아 가며 두는지 테스트한다.", () => {
      // 플1이 플레이한 뒤 플2가 두는지.
      // 그 반대 경우도 체크
    });
    it.skip("플레이어가 전환될 때마다, 타이머가 30초로 초기화되는지 테스트한다.", () => {
      // 플레이어 A가 마커를 둔다. 드롭
      // 플레이어 B로 전환함 => 타이머 체크 플레이어 전환 체크
      // 시간 테스트
    });
  });
  describe("일시 중지 테스트", () => {
    const testData: [GameState][] = [
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
          timer: 13,
          stop: false as boolean,
          notMaxLine: [0, 1, 2, 3, 4, 5, 6],
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
          timer: 29,
          stop: false as boolean,
          notMaxLine: [0, 1, 2, 3, 4, 5, 6],
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
          timer: 29,
          stop: false as boolean,
          notMaxLine: [0, 1, 2, 3, 4, 5, 6],
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
      ],
    ];
    it.skip.each(testData)(
      "일시 중지 시, 제한 시간이 멈추는지 테스트 한다.",
      (board) => {
        // 타이머 가져오기
        // TODO: 이거 왜안되냐
        const previousTime = board.timer;
        for (let i = previousTime; i > 0; i--) {
          gameSlice(board, ticktock());
          console.log(board.timer);
        }
        expect(null).toBe(undefined);
      }
    );
  });
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

        console.log(result);

        expect(result.winner).not.toBe(null);
      }
    );
    const verticalWinData: [
      GameState,
      { currentPlayer: "RED" | "YELLOW"; dropLine: number }
    ][] = [];

    it("세로 승리 조건을 확인하는지 테스트한다.", () => {
      // 가로 승리 조건 n개와 세로 승리 조건 n개, 대각선 승리 조건 n개, 무승부를 작성.
    });
    it("대각선 승리 조건을 확인하는지 테스트한다.", () => {
      // 가로 승리 조건 n개와 세로 승리 조건 n개, 대각선 승리 조건 n개, 무승부를 작성.
    });
    it("보드가 꽉 찼을 때 무승부로 처리되는지 테스트한다.", () => {
      // 가로 승리 조건 n개와 세로 승리 조건 n개, 대각선 승리 조건 n개, 무승부를 작성.
    });
  });

  describe("종료 테스트", () => {
    it("보드가 꽉 차면 게임이 종료되는지 테스트한다.", () => {});
  });
});

describe.skip("UI 테스트", () => {
  it.each(["1", "2"])(
    "승자 메시지가 올바르게 표시되는지 테스트한다.",
    (winner) => {
      const winnerBanner = screen.getByTestId("winner");
      expect(winnerBanner).toContain(winner);
    }
  );

  it.skip.each(["1", "2"])(
    "승리 시 마커가 시각적으로 강조되는지 테스트한다.",
    () => {}
  );
});

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Index from "../pages";

describe("게임 페이지 테스트", () => {
  describe("초기 상태 테스트", () => {
    beforeEach(() => {
      render(<Index />);
    });
    it.skip("시작 시, 보드가 비어있는지 테스트한다.", () => {
      // 보드를 저장하는 이중 배열을 가져온다.
      // 모든 요소가 비어(null)있는지 테스트한다.
    });
    it("필수 UI 요소가 모두 랜더링 되었는지 테스트한다.", () => {
      const header = screen.getByRole("header");
      const players = screen.getAllByTestId(/player/i);
      const timer = screen.getByTestId("timer");
      const gameBoard = screen.getByTestId("game-board");

      expect(header).toBeInTheDocument();
      expect(players.length).toBe(2);
      expect(timer).toBeInTheDocument();
      expect(gameBoard).toBeInTheDocument();
    });
    it("시작 시, 타이머가 30초로 설정되었는지 테스트한다.", () => {
      const timer = screen.getByTestId("timer");
      expect(timer).toContain(/"?30"?/g);
    });
    it("최초 시작 시 점수가 모두 0으로 처리되는지 테스트한다.", () => {
      const playerOneScore = screen.getByTestId("player-one");
      const playerTwoScore = screen.getByTestId("player-two");
      expect(playerOneScore).toContain(/"?0"?/g);
      expect(playerTwoScore).toContain(/"?0"?/g);
    });
  });

  describe.skip("게임 진행 테스트", () => {
    beforeEach(() => {
      render(<Index />);
    });
    describe("기본 게임 진행 테스트", () => {
      it("마커가 맨 아래에 떨어지는지 테스트한다.", () => {
        // 줄을 클릭하면 마커가 맨 아래에 떨어지는지 체크한다.
        // 여러가지 테스트 케이스(마커가 모두 빈 상태, 어느 정도 찬 상태, 한 줄 빼고 모두 찬 상태...)
      });
      it("30초가 지나면 마커가 자동으로 떨어지는지 테스트한다.", () => {
        // mock 타이머 실행 후, 30초가 지나면 자동으로 올바른 장소(꽉 차지 않은 배열)에 떨어뜨리는지 체크한다.)
        // 여러 테스트 케이스 넣기
      });
      it("플레이어가 번갈아 가며 두는지 테스트한다.", () => {
        // 플1이 플레이한 뒤 플2가 두는지.
        // 그 반대 경우도 체크
      });
      it("플레이어가 전환될 때마다, 타이머가 30초로 초기화되는지 테스트한다.", () => {
        // 플레이어 A가 마커를 둔다.
        // 플레이어 B로 전환함 => 타이머 체크
      });
    });
    describe("일시 중지 테스트", () => {
      it("일시 중지 시, 제한 시간이 멈추는지 테스트 한다.", () => {
        // 타이머 가져오기
        // 일시정지 버튼 가져오기
        // 타이머 체크
        // 무작위 일시정지 버튼
        // 재시작했을 때, 타이머 제대로 정지되는가.
      });
      it("재시작 시 점수를 제대로 가져오는지 테스트한다.", () => {
        // 점수를 가져온다.
        // 일시 중지 버튼을 가져온다.
        // 일시 중지 후 재시작해도 점수가 같은지 체크한다.
      });
    });
    describe("재시작 테스트", () => {
      it("재시작 후 상태가 초기화되는지 테스트한다.", () => {
        // 재시작 버튼을 누르면 점수와 타이머가 모두 초기화되는지 테스트한다.
      });
    });
  });

  describe.skip("게임 결과 테스트", () => {
    beforeEach(() => {
      render(<Index />);
    });
    describe("승리 테스트", () => {
      it("가로 승리 조건을 확인하는지 테스트한다.", () => {
        // 가로 승리 조건 n개와 세로 승리 조건 n개, 대각선 승리 조건 n개, 무승부를 작성.
      });
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
      it("4개 연결 시 게임이 종료되는지 테스트한다.", () => {
        // 가로 승리 조건 n개와 세로 승리 조건 n개, 대각선 승리 조건 n개, 무승부를 작성.
      });
      it("보드가 꽉 차면 게임이 종료되는지 테스트한다.", () => {
        // 가로 승리 조건 n개와 세로 승리 조건 n개, 대각선 승리 조건 n개, 무승부를 작성.
      });
    });
  });

  describe("UI 테스트", () => {
    beforeEach(() => {
      render(<Index />);
    });
    it.each(["ONE", "TWO"])(
      "승자 메시지가 올바르게 표시되는지 테스트한다.",
      (winner) => {
        const winnerBanner = screen.getByTestId("winner");
        expect(winnerBanner).toContain(winner);
      }
    );

    it.skip.each(["ONE", "TWO"])(
      "승리 시 마커가 시각적으로 강조되는지 테스트한다.",
      () => {}
    );
  });
});

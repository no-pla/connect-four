import { beforeEach, describe, expect, it } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Page from "../App";

describe("랜딩 페이지 테스트", () => {
  describe("요소 랜더링 테스트", () => {
    beforeEach(() => {
      render(<Page />);
    });

    it("버튼이 모두 렌더링되는지 테스트한다", () => {
      const buttons = screen.getAllByRole("button");
      expect(buttons).length(2);
    });

    it("로고가 올바르게 렌더링되는지 테스트한다", () => {
      const logo = screen.getByTitle(/logo/i);
      expect(logo).toBeInTheDocument();
    });
  });

  describe("플로우 테스트", () => {
    it("첫 번째 버튼 클릭 시 게임 페이지로 이동하는지 테스트한다", async () => {
      render(<Page />);
      const gameStartButton = screen.getByLabelText(/시작/i);
      await act(async () => {
        fireEvent.click(gameStartButton);
      });
      expect(global.window.location.pathname).toContain("/game");
    });
  });

  describe("모달 테스트", () => {
    it("두 번째 버튼 클릭 시 게임 설명 모달이 표시되는지 테스트한다", async () => {
      const { container } = render(<Page />);
      const modalButton = container.querySelector("#modal_button")!;
      await act(async () => {
        fireEvent.click(modalButton);
      });
      const modal = container.querySelector("#modal");
      expect(modal).toBeInTheDocument();
    });

    it("모달 닫기 버튼을 클릭 시 모달이 화면에서 사라지는지 테스트한다.", async () => {
      const { container } = render(<Page />);

      const modalButton = container.querySelector("#modal_button")!;
      await act(async () => {
        fireEvent.click(modalButton);
      });

      const modal = container.querySelector("#modal");
      const modalCloseButton = container.querySelector("#modal_close_button")!;
      await act(async () => {
        fireEvent.click(modalCloseButton);
      });
      expect(modal).not.toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LandingBox from "components/Custom/LandingBox";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

describe("랜딩 페이지 테스트", () => {
  describe("요소 랜더링 테스트", () => {
    beforeEach(() => {
      render(<LandingBox />, { wrapper: BrowserRouter });
    });

    it("버튼이 모두 렌더링되는지 테스트한다", () => {
      const ruleOpenButton = screen.getByTestId("rule-modal-open-button");
      const gameStartButton = screen.getByTestId("play-button");

      expect(ruleOpenButton).toBeInTheDocument();
      expect(gameStartButton).toBeInTheDocument();
    });

    it("로고가 올바르게 렌더링되는지 테스트한다", () => {
      const logo = screen.getByTitle(/logo/i);
      expect(logo).toBeInTheDocument();
    });
  });

  describe("플로우 테스트", () => {
    it("첫 번째 버튼 클릭 시 게임 페이지로 이동하는지 테스트한다", async () => {
      render(<LandingBox />, { wrapper: BrowserRouter });

      const gameStartButton = screen.getByRole("button", {
        name: /플레이/i,
      });
      expect(gameStartButton).toBeInTheDocument();

      await userEvent.click(gameStartButton);

      expect(window.location.pathname).toBe("/game");
    });
  });

  describe("모달 테스트", () => {
    it("두 번째 버튼 클릭 시 게임 설명 모달이 표시되는지 테스트한다", async () => {
      const user = userEvent.setup();
      const { unmount, getByTestId } = render(<LandingBox />, {
        wrapper: BrowserRouter,
      });
      let portalRoot = document.getElementById("portal");
      if (!portalRoot) {
        portalRoot = document.createElement("div");
        portalRoot.setAttribute("id", "portal");
        document.body.appendChild(portalRoot);
      }

      const modalOpenButton = getByTestId("rule-modal-open-button");
      expect(modalOpenButton).toBeInTheDocument();

      await user.click(modalOpenButton);

      const modal = getByTestId("modal");
      expect(modal).toBeInTheDocument();

      unmount();
    });

    it("모달 닫기 버튼을 클릭 시 모달이 화면에서 사라지는지 테스트한다.", async () => {
      const user = userEvent.setup();

      const { unmount, getByTestId } = render(<LandingBox />, {
        wrapper: BrowserRouter,
      });
      let portalRoot = document.getElementById("portal");
      if (!portalRoot) {
        portalRoot = document.createElement("div");
        portalRoot.setAttribute("id", "portal");
        document.body.appendChild(portalRoot);
      }

      const modalOpenButton = getByTestId("rule-modal-open-button");
      expect(modalOpenButton).toBeInTheDocument();

      await user.click(modalOpenButton);

      const modal = getByTestId("modal");
      expect(modal).toBeInTheDocument();

      const modalCloseButton = getByTestId("modal-close-button");

      await user.click(modalCloseButton);
      expect(modal).not.toBeInTheDocument();

      unmount();
    });
  });
});

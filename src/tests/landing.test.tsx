import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Page from "../App";
import LandingBox from "../components/LandingBox";
import { BrowserRouter } from "react-router-dom";

describe("랜딩 페이지 테스트", () => {
  describe("요소 랜더링 테스트", () => {
    beforeEach(() => {
      render(<Page />, { wrapper: BrowserRouter });
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
    it("첫 번째 버튼 클릭 시 게임 페이지로 이동하는지 테스트한다", () => {
      render(<LandingBox />, { wrapper: BrowserRouter });

      const gameStartButton = screen.getByRole("button", {
        name: /플레이/i,
      });
      expect(gameStartButton).toBeInTheDocument();

      fireEvent.click(gameStartButton);
      // const redirectUrl = "/game";
      console.log(window);
    });
  });

  describe("모달 테스트", () => {
    it("두 번째 버튼 클릭 시 게임 설명 모달이 표시되는지 테스트한다", () => {
      const { unmount, getByTestId } = render(<Page />, {
        wrapper: BrowserRouter,
      });
      let portalRoot = document.getElementById("portal");
      if (!portalRoot) {
        portalRoot = document.createElement("div");
        portalRoot.setAttribute("id", "portal");
        document.body.appendChild(portalRoot);
      }

      const modalOpenButton = getByTestId("modal-open-button");
      expect(modalOpenButton).toBeInTheDocument();

      fireEvent.click(modalOpenButton);

      const modal = getByTestId("modal");
      expect(modal).toBeInTheDocument();

      unmount();
    });

    it("모달 닫기 버튼을 클릭 시 모달이 화면에서 사라지는지 테스트한다.", () => {
      const { unmount, getByTestId } = render(<Page />, {
        wrapper: BrowserRouter,
      });
      let portalRoot = document.getElementById("portal");
      if (!portalRoot) {
        portalRoot = document.createElement("div");
        portalRoot.setAttribute("id", "portal");
        document.body.appendChild(portalRoot);
      }

      const modalOpenButton = getByTestId("modal-open-button");
      expect(modalOpenButton).toBeInTheDocument();

      fireEvent.click(modalOpenButton);

      const modal = getByTestId("modal");
      expect(modal).toBeInTheDocument();

      const modalCloseButton = getByTestId("modal-close-button");

      fireEvent.click(modalCloseButton);
      expect(modal).not.toBeInTheDocument();

      unmount();
    });
  });
});

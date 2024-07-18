import React from "react";
import { useSelector } from "react-redux";
import LargeFrontBoard from "assets/board-layer-white-large.svg?react";
import LargeBackBoard from "assets/board-layer-black-large.svg?react";
import SmallFrontBoard from "assets/board-layer-white-small.svg?react";
import SmallBackBoard from "assets/board-layer-black-small.svg?react";
import Timer from "../Timer";
import WinnerCard from "../WinnerCard";

interface GameState {
  game: {
    winner: "RED" | "YELLOW" | "DRAW" | null;
  };
}

const Board = ({ children }: { children: React.ReactNode }) => {
  const winner = useSelector((state: GameState) => state.game.winner);

  return (
    <section
      data-testid="game-board"
      className="relative w-full mx-auto flex-center flex-col z-20"
    >
      <div>
        <div className="pointer-events-none absolute -top-2 z-10 max-w-[632px]">
          <LargeFrontBoard
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 632 584"
            className="mobile:hidden mini:hidden"
          />
          <SmallFrontBoard
            preserveAspectRatio="xMidYMid meet"
            className="hidden mobile:block mini:block"
          />
        </div>
        <div className="absolute">{children}</div>
        <div className="pointer-events-none">
          <LargeBackBoard
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 632 584"
            className="mobile:hidden mini:hidden"
          />
          <SmallBackBoard
            preserveAspectRatio="xMidYMid meet"
            className="hidden mobile:block mini:block"
          />
        </div>
      </div>
      {winner === null ? <Timer /> : <WinnerCard />}
    </section>
  );
};

export default Board;

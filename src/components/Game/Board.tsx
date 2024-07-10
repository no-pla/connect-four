import React from "react";
import LargeFrontBoard from "../../assets/images/board-layer-white-large.svg?react";
import LargeBackBoard from "../../assets/images/board-layer-black-large.svg?react";
import SmallFrontBoard from "../../assets/images/board-layer-white-small.svg?react";
import SmallBackBoard from "../../assets/images/board-layer-black-small.svg?react";
import Timer from "./Timer";
import { useSelector } from "react-redux";
import WinnerCard from "./WinnerCard";

interface GameData {
  game: {
    board: ("RED" | "YELLOW" | null)[][];
    currentPlayer: "RED" | "YELLOW";
    markerCounter: number;
    winner: "RED" | "YELLOW" | null;
  };
}

const Board = ({ children }: { children: React.ReactNode }) => {
  const winner = useSelector((state: GameData) => state.game.winner);

  return (
    <section
      data-testid="game-board"
      className="relative w-full mx-auto flex flex-col justify-center items-center z-20"
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

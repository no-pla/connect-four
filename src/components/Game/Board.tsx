import React from "react";
import LargeBackBoard from "../../assets/images/board-layer-black-large.svg?react";
import LargeFrontBoard from "../../assets/images/board-layer-white-large.svg?react";
import Timer from "./Timer";
import { useSelector } from "react-redux";
import WinnerCard from "./WinnerCard";
// import SmallBackBoard from "../../assets/images/board-layer-black-small.svg?react";
// import SmallFrontBoard from "../../assets/images/board-layer-white-small.svg?react";

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
    <section className="relative max-w-[632px] z-10">
      <div className="absolute z-10 pointer-events-none">
        <LargeFrontBoard />
      </div>
      <div className="absolute">{children}</div>
      <div className="pointer-events-none">
        <LargeBackBoard />
      </div>
      <div className="absolute -bottom-[108px] z-10 flex justify-center w-full ">
        {winner === null ? <Timer /> : <WinnerCard />}
      </div>
    </section>
  );
};

export default Board;

import React from "react";
import { useSelector } from "react-redux";
import RedEmphasizeMarker from "assets/marker-red.svg?react";
import YellowEmphasizeMarker from "assets/marker-yellow.svg?react";

interface GameState {
  game: {
    currentPlayer: "RED" | "YELLOW";
  };
}

interface EmphasizeState {
  emphasize: {
    left: string;
  };
}

const EmphasizeColumn = () => {
  const currentPlayer = useSelector(
    (state: GameState) => state.game.currentPlayer
  );
  const left = useSelector((state: EmphasizeState) => state.emphasize.left);

  return (
    <div className="max-w-[632px] mx-auto w-full mb-2 block relative h-10 laptop:hidden tablet:hidden mobile:hidden mini:hidden">
      <div className={`absolute top-0 ${left}`}>
        {currentPlayer === "RED" ? (
          <RedEmphasizeMarker />
        ) : (
          <YellowEmphasizeMarker />
        )}
      </div>
    </div>
  );
};

export default EmphasizeColumn;
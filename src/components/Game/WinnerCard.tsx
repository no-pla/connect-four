import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../slices/gameSlice";

interface GameData {
  game: {
    board: ("RED" | "YELLOW" | null)[][];
    currentPlayer: "RED" | "YELLOW";
    markerCounter: number;
    winner: "RED" | "YELLOW" | null;
  };
}

const WinnerCard = () => {
  const dispatch = useDispatch();
  const winner = useSelector((state: GameData) => state.game.winner);
  const resetGame = () => {
    dispatch(reset());
  };

  return (
    <div className="text-center bg-white py-4 px-[75px] border-black border-[3px] rounded-[20px] shadow-container -mb-2">
      <div className="text-headingXS font-bold">
        {winner === "RED" ? "플레이어 1" : "플레이어 2"}
      </div>
      <div className="text-headingL font-bold">승리</div>
      <button
        className="bg-darkPurple text-white rounded-full py-2 px-5"
        onClick={resetGame}
      >
        다시 플레이 하기
      </button>
    </div>
  );
};

export default WinnerCard;

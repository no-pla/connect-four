import RedEmphasizeMarker from "assets/marker-red.svg?react";
import YellowEmphasizeMarker from "assets/marker-yellow.svg?react";
import { useSelector } from "react-redux";

interface GameState {
  game: {
    currentPlayer: "RED" | "YELLOW";
    left: string;
  };
}

const EmphasizeColumn = () => {
  const currentPlayer = useSelector(
    (state: GameState) => state.game.currentPlayer
  );
  const left = useSelector((state: GameState) => state.game.left);

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

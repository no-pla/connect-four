import RedEmphasizeMarker from "assets/marker-red.svg?react";
import YellowEmphasizeMarker from "assets/marker-yellow.svg?react";
import { useSelector } from "react-redux";

interface GameState {
  game: {
    currentPlayer: "RED" | "YELLOW";
    left: number;
  };
}

const EmphasizeColumn = () => {
  const currentPlayer = useSelector(
    (state: GameState) => state.game.currentPlayer
  );
  const left = useSelector((state: GameState) => state.game.left);

  const leftVariants: { [key: number]: string } = {
    0: "left-[30px]",
    1: "left-[120px]",
    2: "left-[210px]",
    3: "left-[300px]",
    4: "left-[390px]",
    5: "left-[480px]",
    6: "left-[560px]",
  };

  return (
    <div className="max-w-[632px] mx-auto w-full mb-2 block relative h-10 laptop:hidden tablet:hidden mobile:hidden mini:hidden">
      <div className={`absolute top-0 ${leftVariants[left]}`}>
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

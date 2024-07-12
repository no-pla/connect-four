import { useDispatch, useSelector } from "react-redux";
import { reset } from "slices/gameSlice";

interface GameState {
  game: {
    winner: "RED" | "YELLOW" | "DRAW" | null;
  };
}
const WinnerCard = () => {
  const dispatch = useDispatch();
  const winner = useSelector((state: GameState) => state.game.winner);
  const resetGame = () => {
    dispatch(reset({ winner }));
  };

  return (
    <div
      className={`bg-white py-4 px-[74px] relative -top-[40px] z-30 flex flex-col items-center border-black border-[3px] rounded-[20px] shadow-container mini:scale-90 mini:top-[-40px] mini:px-14 mini:z-50`}
    >
      <span data-testid="winner" className="text-headingXS font-bold">
        {winner === "RED" && "유저 1"}
        {winner === "YELLOW" && "유저 2"}
      </span>
      <div className={`text-headingL font-bold ${winner === "DRAW" && "pt-2"}`}>
        {winner === "DRAW" ? "무승부" : "승리"}
      </div>
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

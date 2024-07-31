import RedTimer from "assets/turn-background-red.svg?react";
import YellowTimer from "assets/turn-background-yellow.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { dropMarker, ticktock } from "slices/gameSlice";
import { useInterval } from "../../hooks/useInterval";

interface GameState {
  game: {
    currentPlayer: "RED" | "YELLOW";
    timer: number;
    stop: boolean;
  };
}

const Timer = () => {
  const player = useSelector((state: GameState) => state.game.currentPlayer);
  const time = useSelector((state: GameState) => state.game.timer);
  const stop = useSelector((state: GameState) => state.game.stop);
  const dispatch = useDispatch();

  useInterval(
    () => {
      if (time > 0) {
        dispatch(ticktock());
      } else {
        dispatch(
          dropMarker({
            type: "FORCE",
          })
        );
      }
    },
    time > 0,
    stop
  );

  return (
    <div
      className={`${
        player === "RED" ? "text-white" : "text-black"
      } relative -top-[60px] laptop:scale-90 mobile:scale-90 mobile:-top-10 z-30 flex justify-center mini:top-[-30px]`}
      data-testid="timer"
    >
      {player === "RED" ? <RedTimer /> : <YellowTimer />}
      <div className="absolute left-0 top-11 w-full text-center tablet:top-11">
        <div className="font-bold text-headingXS">
          유저 {player === "RED" ? "1" : "2"}의 차례입니다.
        </div>
        <div className={`font-bold text-headingL text-center w-full`}>
          {time}s
        </div>
      </div>
    </div>
  );
};

export default Timer;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RedTimer from "../../assets/images/turn-background-red.svg?react";
import YellowTimer from "../../assets/images/turn-background-yellow.svg?react";
import { useInterval } from "../../hooks/useInterval";
import { forceDrop, ticktock } from "../../slices/gameSlice";

interface GameData {
  game: {
    board: ("RED" | "YELLOW" | null)[][];
    currentPlayer: "RED" | "YELLOW";
    markerCounter: number;
    winner: "RED" | "YELLOW" | null;
    timer: number;
    stop: boolean;
  };
}

const Timer = () => {
  const player = useSelector((state: GameData) => state.game.currentPlayer);
  const time = useSelector((state: GameData) => state.game.timer);
  const stop = useSelector((state: GameData) => state.game.stop);
  const dispatch = useDispatch();

  useInterval(
    () => {
      if (time > 0) {
        dispatch(ticktock());
      } else {
        dispatch(forceDrop());
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

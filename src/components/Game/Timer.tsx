"use client";

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
      className={`relative ${
        player === "RED" ? "text-white" : "text-black"
      } border-black`}
    >
      <div className="rounded-[20px] shadow-container h-[154px]">
        {player === "RED" ? <RedTimer /> : <YellowTimer />}
      </div>
      <div className="absolute top-10 font-bold text-headingXS w-full text-center">
        유저 {player === "RED" ? "1" : "2"}의 차례입니다.
      </div>
      <div
        className={`absolute bottom-4 font-bold text-headingL text-center w-full`}
      >
        {time}s
      </div>
    </div>
  );
};

export default Timer;

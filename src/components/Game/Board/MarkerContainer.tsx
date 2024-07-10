import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { drop } from "../../../slices/gameSlice";
import RedMarker from "./Markers/RedMarker";
import YellowMarker from "./Markers/YellowMarker";
import EmptyMarker from "./Markers/EmptyMarker";

interface GameState {
  game: {
    board: ("RED" | "YELLOW" | null)[][];
    currentPlayer: "RED" | "YELLOW";
    markerCount: number;
    winner: "RED" | "YELLOW" | "DRAW" | null;
    redWin: number;
    yellowWin: number;
    timer: number;
    stop: boolean;
    notMaxLine: number[] | [];
  };
}

const MarkerContainer = () => {
  const board = useSelector((state: GameState) => state.game.board);
  const player = useSelector((state: GameState) => state.game.currentPlayer);
  const dispatch = useDispatch();

  const onClickCol = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dropMarker(+event.currentTarget.id);
  };

  const dropMarker = (lineNumber: number) => {
    dispatch(drop({ lineNumber, player }));
  };

  return (
    <div className="grid gap-x-4 grid-cols-7 grid-row-6 grid-flow-rows mt-2 ml-4 w-full mobile:ml-[6px] mobile:gap-[5px] tablet:mt-0 mobile:mt-0 mini:mb-10 mini:mt-0 mini:ml-[6px] mini:gap-x-1">
      {board.map((line, index) => {
        return (
          <div
            key={index}
            id={index.toString()}
            onClick={(event) => onClickCol(event)}
            className="flex flex-col gap-[13px] tablet:mt-2 mobile:gap-[1px] mini:gap-[0px] bg-red-300 justify-end"
          >
            {line.map((field, idx) => {
              return (
                <div key={`${index}${idx}`}>
                  {field === "RED" && <RedMarker />}
                  {field === "YELLOW" && <YellowMarker />}
                  {field === null && <EmptyMarker />}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MarkerContainer;

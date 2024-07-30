import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dropMarker, emphasizeColumn } from "slices/gameSlice";
import RedMarker from "./Markers/RedMarker";
import YellowMarker from "./Markers/YellowMarker";
import EmptyMarker from "./Markers/EmptyMarker";

interface GameState {
  game: {
    board: ("RED" | "YELLOW" | null)[][];
    currentPlayer: "RED" | "YELLOW";
    connectFour: [] | number[][];
  };
}

const MarkerContainer = () => {
  const board = useSelector((state: GameState) => state.game.board);
  const player = useSelector((state: GameState) => state.game.currentPlayer);
  const connectFour = useSelector((state: GameState) => state.game.connectFour);
  const dispatch = useDispatch();
  const colIndex = useRef<{ idx: number }>({ idx: 0 });

  const onClickCol = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    drop(+event.currentTarget.id);
  };

  const drop = (lineNumber: number) => {
    dispatch(
      dropMarker({
        type: "NORMAL",
        lineNumber,
        currentPlayer: player,
      })
    );
  };

  const DropWithKeyDown = (
    lineNumber: number,
    currentPlayer: "RED" | "YELLOW"
  ) => {
    dispatch(
      dropMarker({
        type: "NORMAL",
        lineNumber,
        currentPlayer,
      })
    );
  };

  const moveColumnWithKeyDown = (
    lineNumber: number,
    direction: "LEFT" | "RIGHT"
  ) => {
    if (!colIndex.current) return;

    if (
      (lineNumber <= 0 && direction === "LEFT") ||
      (lineNumber >= 6 && direction === "RIGHT")
    ) {
      return;
    } else if (direction === "LEFT") {
      const index = (colIndex.current.idx -= 1);
      dispatch(emphasizeColumn({ columnNumber: index }));
    } else {
      const index = (colIndex.current.idx += 1);
      dispatch(emphasizeColumn({ columnNumber: index }));
    }
  };

  const emphasizeWinMarker = (row: number, col: number): boolean => {
    return connectFour.some(
      (position) => position[0] === row && position[1] === col
    );
  };

  const onHoverColumn = (index: number) => {
    if (!colIndex.current) return;
    colIndex.current.idx = index;
    dispatch(emphasizeColumn({ columnNumber: index }));
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const keyType = event.key;

      if (!colIndex.current) return;

      switch (keyType) {
        case "ArrowLeft":
          moveColumnWithKeyDown(colIndex.current.idx, "LEFT");
          return;
        case "ArrowRight":
          moveColumnWithKeyDown(colIndex.current.idx, "RIGHT");
          return;
        case "Enter":
          DropWithKeyDown(colIndex.current.idx, player);
          return;
        default:
          return;
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="grid gap-x-4 grid-cols-7 grid-row-6 grid-flow-rows mt-2 ml-4 w-full mobile:ml-[6px] mobile:gap-[5px] tablet:mt-0 mobile:-mt-[2px] mini:mb-10 mini:-mt-[2px] mini:ml-[6px] mini:gap-x-1">
      {board.map((line, index) => {
        return (
          <div
            key={index}
            id={index.toString()}
            onClick={(event) => onClickCol(event)}
            onMouseEnter={() => onHoverColumn(index)}
            className="flex flex-col gap-[13px] tablet:mt-2 mobile:gap-[1px] mini:gap-[0px] bg-red-300 justify-end"
          >
            {line.map((field, idx) => {
              return (
                <div key={`${index}${idx}`}>
                  {field === "RED" && (
                    <RedMarker win={emphasizeWinMarker(index, idx)} />
                  )}
                  {field === "YELLOW" && (
                    <YellowMarker win={emphasizeWinMarker(index, idx)} />
                  )}
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

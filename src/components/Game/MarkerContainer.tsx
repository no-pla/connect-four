import React from "react";
import BigRedMarker from "../../assets/images/counter-red-large.svg?react";
import SmallRedMarker from "../../assets/images/counter-red-small.svg?react";
import BigYellowMarker from "../../assets/images/counter-yellow-large.svg?react";
import SmallYellowMarker from "../../assets/images/counter-yellow-small.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { drop } from "../../slices/gameSlice";

interface selectorData {
  game: {
    board: (null | "RED" | "YELLOW")[][];
    currentPlayer: "RED" | "YELLOW";
  };
}

const MarkerContainer = () => {
  const board = useSelector((state: selectorData) => state.game.board);
  const player = useSelector((state: selectorData) => state.game.currentPlayer);
  const dispatch = useDispatch();

  const onClickCol = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dropMarker(+event.currentTarget.id);
  };

  const dropMarker = (lineNumber: number) => {
    dispatch(drop({ lineNumber, player }));
  };

  // 테블릿 수정
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
                  {field === "RED" && (
                    <>
                      <BigRedMarker
                        className="mobile:hidden mini:hidden"
                        viewBox="0 0 70 75"
                      />
                      <SmallRedMarker className="hidden tablet:hidden mobile:block mini:block" />
                    </>
                  )}
                  {field === "YELLOW" && (
                    <>
                      <BigYellowMarker
                        className="mobile:hidden mini:hidden"
                        viewBox="0 0 70 75"
                      />
                      <SmallYellowMarker className="hidden tablet:hidden mobile:block mini:block" />
                    </>
                  )}
                  {field === null && (
                    <div className="w-[70px] h-[75px] tablet:w-[70px] tablet:h-[75px] mobile:w-[41px] mobile:h-[46px] mini:w-[42px] mini:h-[46px]" />
                  )}
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

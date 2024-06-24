import RedMarker from "../../assets/images/counter-red-large.svg?react";
import YellowMarker from "../../assets/images/counter-yellow-large.svg?react";
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

  /**
   * @description 유저가 선택한 라인의 숫자를 기반으로 맨 아래(null)에 마커를 둔다.
   * @param lineNumber
   */
  const dropMarker = (lineNumber: number) => {
    /**
     * TODO
     * ! 만약 모두 찬 열을 클릭한 경우, 유저가 바뀌지 않는다.
     */
    dispatch(drop({ lineNumber, player }));
  };

  return (
    <div className="grid gap-x-[18px] ml-4 -mt-3 grid-cols-7 grid-flow-rows">
      {board.map((line, index) => {
        return (
          <div
            key={index}
            id={index.toString()}
            className="flex flex-col gap-[13px] mt-[30px]"
            onClick={(event) => onClickCol(event)}
          >
            {line.map((field, idx) => {
              return (
                <div key={`${index}${idx}`}>
                  {field === "RED" && <RedMarker />}
                  {field === "YELLOW" && <YellowMarker />}
                  {field === null && (
                    <div className="w-[70px] h-[75px] bg-transparent flex justify-center items-center"></div>
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

import Ajv, { JSONSchemaType } from "ajv";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dropMarker, emphasizeColumn, getSavedData } from "slices/gameSlice";
import EmptyMarker from "./Markers/EmptyMarker";
import RedMarker from "./Markers/RedMarker";
import YellowMarker from "./Markers/YellowMarker";

interface GameState {
  game: {
    board: ("RED" | "YELLOW" | null)[][];
    firstPlayer: "RED" | "YELLOW";
    currentPlayer: "RED" | "YELLOW";
    markerCount: number;
    winner: "RED" | "YELLOW" | "DRAW" | null;
    redWin: number;
    yellowWin: number;
    timer: number;
    stop: boolean;
    notMaxLine: number[] | [];
    connectFour: (number | null)[][];
    left: number;
  };
}

const MarkerContainer = () => {
  const board = useSelector((state: GameState) => state.game.board);
  const winner = useSelector((state: GameState) => state.game.winner);
  const connectFour = useSelector((state: GameState) => state.game.connectFour);
  const dispatch = useDispatch();
  const colIndex = useRef<{ idx: number }>({ idx: 0 });
  const ajv = new Ajv({});

  const schema: JSONSchemaType<GameState["game"]> = {
    type: "object",
    properties: {
      board: {
        type: "array",
        items: {
          type: "array",
          items: {
            oneOf: [
              { type: "string", enum: ["RED", "YELLOW"] },
              { type: "null", nullable: true },
            ],
          },
        },
      },
      firstPlayer: {
        type: "string",
        enum: ["RED", "YELLOW"],
      },
      currentPlayer: {
        type: "string",
        enum: ["RED", "YELLOW"],
      },
      markerCount: {
        type: "number",
      },
      winner: {
        oneOf: [
          { type: "string", enum: ["DRAW", "YELLOW", "RED"] },
          { type: "null", nullable: true },
        ],
      },
      redWin: {
        type: "number",
        minimum: 0,
      },
      yellowWin: {
        type: "number",
        minimum: 0,
      },
      timer: {
        type: "number",
        minimum: 0,
        maximum: 30,
      },
      stop: {
        type: "boolean",
      },
      notMaxLine: {
        type: "array",
        items: {
          type: "number",
          minimum: 0,
          maximum: 6,
        },
      },
      connectFour: {
        type: "array",
        items: {
          type: "array",
          items: {
            oneOf: [
              {
                type: "number",
              },
              { type: "null", nullable: true },
            ],
          },
        },
      },
      left: {
        type: "number",
        minimum: 0,
        maximum: 6,
      },
    },
    required: [],
    additionalProperties: false, // 추가 속성 금지
  };

  const onClickCol = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    drop(+event.currentTarget.id);
  };

  const drop = (lineNumber: number) => {
    dispatch(
      dropMarker({
        type: "NORMAL",
        lineNumber,
      })
    );
  };

  const DropWithKeyDown = (lineNumber: number) => {
    dispatch(
      dropMarker({
        type: "NORMAL",
        lineNumber,
      })
    );
  };

  const moveColumnWithKeyDown = (
    lineNumber: number,
    direction: "LEFT" | "RIGHT"
  ) => {
    if (!colIndex.current) return;

    if (direction === "LEFT") {
      if (lineNumber <= 0) return;
      const index = --colIndex.current.idx;
      dispatch(emphasizeColumn({ columnNumber: index }));
    } else {
      if (lineNumber >= 6) return;
      const index = ++colIndex.current.idx;
      dispatch(emphasizeColumn({ columnNumber: index }));
    }
  };

  /**
   * @description connectFour 배열에 연결된 배열의 좌표를 받아오면 해당 인덱스들을 가진 마커에 true를 전달하여 강조를 한다.
   * @param row
   * @param col
   * @returns
   */
  const emphasizeWinMarker = (row: number, col: number): boolean => {
    if (winner === "RED" || winner === "YELLOW") {
      return connectFour.some(
        (position) => position[0] === row && position[1] === col
      );
    } else {
      return false;
    }
  };

  const onHoverColumn = (index: number) => {
    if (!colIndex.current) return;
    colIndex.current.idx = index;
    dispatch(emphasizeColumn({ columnNumber: index }));
  };

  useEffect(() => {
    /**
     * @description 키보드 다운이 발생할 때마다 실행되어 선택한 마커의 위치나, 마커를 떨어뜨리는 로직을 실행한다.
     * @param event
     * @returns void
     */
    function handleKeyDown(event: KeyboardEvent) {
      const keyType = event.code;

      if (!colIndex.current) return;

      switch (keyType) {
        case "ArrowLeft":
          moveColumnWithKeyDown(colIndex.current.idx, "LEFT");
          return;
        case "ArrowRight":
          moveColumnWithKeyDown(colIndex.current.idx, "RIGHT");
          return;
        case "Enter":
        case "Space":
          DropWithKeyDown(colIndex.current.idx);
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

  useEffect(() => {
    colIndex.current.idx = 0;
  }, [winner]);

  useEffect(() => {
    let savedData;
    try {
      savedData = localStorage.getItem("connect-four");

      if (!savedData) throw Error("저장된 데이터가 없습니다!");

      const parsedData = JSON.parse(savedData);
      const result = checkRightJSON(parsedData);

      if (!result) throw Error("저장된 데이터의 형식이 올바르지 않습니다!");
    } catch (error) {
      console.error(error);
      return;
    }
    if (savedData) {
      dispatch(getSavedData({ game: JSON.parse(savedData) }));
    }
  }, []);

  const checkRightJSON = (savedData: any) => {
    const validate = ajv.compile(schema);
    const valid = validate(savedData);
    if (valid) {
      return false;
    }
    return true;
  };

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

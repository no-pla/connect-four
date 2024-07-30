import Board from "./Board";
import UserScore from "../UserScore";
import BoardHeader from "../BoardHeader";
import MarkerContainer from "./MarkerContainer";

const GameBoard = () => {
  return (
    <div className="tablet:mx-[68px] mobile:mx-5 mini:mx-5 mini:overflow-x-scroll mini:z-10">
      <BoardHeader />
      <div className="flex-center w-full gap-[725px] absolute translate-y-1/3 top-1/3 laptop:relative laptop:max-w-[632px] laptop:mx-auto laptop:gap-10 laptop:translate-y-0 laptop:mb-8 tablet:relative tablet:gap-10 tablet:translate-y-0 tablet:my-8 mobile:relative mobile:gap-5 mobile:mx-auto mobile:translate-y-0 mobile:my-10 mobile:max-w-[300px] mini:gap-2 mini:relative mini:translate-y-0 mini:mx-auto mini:max-w-[300px] mini:pb-[50px]">
        <UserScore user="RED" />
        <UserScore user="YELLOW" />
      </div>
      <Board>
        <MarkerContainer />
      </Board>
    </div>
  );
};

export default GameBoard;

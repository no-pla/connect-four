import Button from "../Custom/Button";
import { useDispatch } from "react-redux";
import { toggleModal } from "slices/modalSlice";
import { reset, setStop } from "slices/gameSlice";

const PauseModal = () => {
  const dispatch = useDispatch();

  const continueGame = () => {
    dispatch(toggleModal());
    dispatch(setStop());
  };

  const resetGame = () => {
    dispatch(toggleModal());
    dispatch(reset({ winner: "RED" }));
  };

  // TODO: 수정하기

  return (
    <div className="pt-[50px] pb-[54px] px-[34px] text-center">
      <div className="text-headingL font-bold mb-11">일시 정지</div>
      <div className="flex flex-col gap-[30px]">
        <Button
          text="계속하기"
          primary={false}
          onClick={() => continueGame()}
          style="text-center"
        />
        <Button
          text="처음부터"
          primary={false}
          onClick={() => resetGame()}
          style="text-center"
        />
        <Button text="메인으로" primary={false} style="text-center" />
      </div>
    </div>
  );
};

export default PauseModal;

import Button from "../Custom/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "slices/modalSlice";
import { reset, setStop } from "slices/gameSlice";
import { useNavigate } from "react-router-dom";

const PauseModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstPlayer = useSelector(
    (state: {
      game: {
        firstPlayer: "RED" | "YELLOW";
      };
    }) => state.game.firstPlayer
  );

  const continueGame = () => {
    dispatch(toggleModal());
    dispatch(setStop());
  };

  const resetGame = () => {
    dispatch(toggleModal());
    dispatch(
      reset({
        firstPlayer,
      })
    );
  };

  const goBackHome = () => {
    navigate("/");
  };

  return (
    <div className="pt-[50px] pb-[54px] px-[34px] text-center mobile:normal-border mini:normal-border rounded-[40px]">
      <div className="text-headingL font-bold mb-11 text-white">일시 정지</div>
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
        <Button
          text="메인으로"
          primary={false}
          secondary={true}
          style="text-center"
          onClick={() => goBackHome()}
        />
      </div>
    </div>
  );
};

export default PauseModal;

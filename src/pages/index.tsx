import { useDispatch, useSelector } from "react-redux";
import Modal from "components/Modal/Modal";
import Backdrop from "components/Modal/Backdrop";
import PauseModal from "components/Modal/PauseModal";
import GameBoard from "components/Game/Board/GameBoard";
import BoardFooter from "components/Game/BoardFooter";
import { useEffect } from "react";
import { resetAll } from "slices/gameSlice";
import { resetModal } from "slices/modalSlice";

const Index = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: {
      modal: {
        modalOpen: boolean;
      };
    }) => state.modal.modalOpen
  );

  useEffect(() => {
    dispatch(resetAll());
    dispatch(resetModal());
  }, []);

  return (
    <main
      className={`bg-purple h-full min-h-screen relative flex flex-col justify-evenly tablet:justify-start ${
        isModalOpen && "max-h-screen overflow-hidden"
      }`}
    >
      <GameBoard />
      <BoardFooter />
      {isModalOpen && (
        <Backdrop primary>
          <Modal primary={true}>
            <PauseModal />
          </Modal>
        </Backdrop>
      )}
    </main>
  );
};

export default Index;

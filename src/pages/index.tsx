import { useSelector } from "react-redux";
import Modal from "components/Modal/Modal";
import Backdrop from "components/Modal/Backdrop";
import PauseModal from "components/Modal/PauseModal";
import GameBoard from "components/Game/Board/GameBoard";
import BoardFooter from "components/Game/BoardFooter";

const Index = () => {
  const isModalOpen = useSelector(
    (state: {
      modal: {
        modalOpen: boolean;
      };
    }) => state.modal.modalOpen
  );

  return (
    <main className="bg-purple h-full min-h-screen relative flex flex-col justify-evenly tablet:justify-start">
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

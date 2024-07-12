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

/** TODO:
 * 1. 승자 마커 강조
 * 2. 일시 정지 모달 내용 수정
 * 3. 모달 스타일 수정
 * 4. 불필요한 인터페이스 제거
 * 5. 로컬 스토리지에 저장?
 * 6. 플레이 순서 바꾸기
 */

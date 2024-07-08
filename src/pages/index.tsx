import React from "react";
import Board from "../components/Game/Board";
import MarkerContainer from "../components/Game/MarkerContainer";
import BoardHeader from "../components/Game/BoardHeader";
import BoardFooter from "../components/Game/BoardFooter";
import { useSelector } from "react-redux";
import Backdrop from "../components/Modal/Backdrop";
import Modal from "../components/Modal/Modal";
import PauseModal from "../components/Modal/PauseModal";
import UserScore from "../components/Game/UserScore";

interface ModalData {
  modal: {
    modalOpen: boolean;
  };
}

const Index = () => {
  const isModalOpen = useSelector((state: ModalData) => state.modal.modalOpen);

  return (
    <main className="bg-purple h-full min-h-screen relative flex flex-col justify-evenly tablet:justify-start">
      <div className="tablet:mx-[68px] mobile:mx-5 mini:mx-5 mini:overflow-x-scroll mini:z-10">
        <BoardHeader />
        <div className="flex justify-center items-center w-full gap-[725px] absolute translate-y-1/3 top-1/3 laptop:relative laptop:max-w-[632px] laptop:mx-auto laptop:gap-10 laptop:translate-y-0 laptop:mb-8 tablet:relative tablet:gap-10 tablet:translate-y-0 tablet:my-8 mobile:relative mobile:gap-5 mobile:mx-auto mobile:translate-y-0 mobile:my-10 mobile:max-w-[300px] mini:gap-2 mini:relative mini:translate-y-0 mini:mx-auto mini:max-w-[300px] mini:pb-[50px]">
          <UserScore user="RED" />
          <UserScore user="YELLOW" />
        </div>
        <Board>
          <MarkerContainer />
        </Board>
      </div>
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

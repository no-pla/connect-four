/// <reference types="vite-plugin-svgr/client" />

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import Button from "./Button";
import Modal from "../Modal/Modal";
import Backdrop from "../Modal/Backdrop";
import RuleModal from "../Modal/RuleModal";
import Logo from "assets/logo.svg?react";
import PlayWithUser from "assets/player-vs-player.svg?react";

const LandingBox = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  return (
    <Container primary>
      <div className="px-10 pt-[70px] pb-[60px] mobile:px-0">
        <Logo
          style={{
            margin: "0 auto",
          }}
        />
        <div className="flex flex-col gap-[30px] mt-20">
          <Button
            text="유저와 플레이"
            primary
            onClick={() => navigate("/game")}
            style="text-left"
          >
            <PlayWithUser />
          </Button>
          <Button
            text="게임 규칙"
            primary={false}
            onClick={setOpenModal}
            testId="modal-open-button"
            style="text-left"
          />
        </div>
      </div>
      {openModal && (
        <Backdrop primary={false}>
          <Modal primary={false}>
            <RuleModal onClick={() => toggleModal()} />
          </Modal>
        </Backdrop>
      )}
    </Container>
  );
};

export default LandingBox;

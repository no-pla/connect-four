/// <reference types="vite-plugin-svgr/client" />

import Logo from "assets/logo.svg?react";
import PlayWithUser from "assets/player-vs-player.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../Container";
import Backdrop from "../Modal/Backdrop";
import Modal from "../Modal/Modal";
import RuleModal from "../Modal/RuleModal";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { reset } from "slices/gameSlice";

const LandingBox = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const startGame = () => {
    dispatch(reset());
    navigate("/game");
  };

  return (
    <Container primary>
      <div className="px-10 pt-[70px] pb-[60px] mobile:px-0">
        <Logo
          style={{
            margin: "0 auto",
          }}
          aria-label="로고"
        />
        <div className="flex flex-col gap-[30px] mt-20">
          <Button
            text="유저와 플레이"
            primary
            onClick={() => startGame()}
            style="text-left"
            testId="play-button"
          >
            <PlayWithUser />
          </Button>
          <Button
            text="게임 규칙"
            primary={false}
            onClick={toggleModal}
            testId="rule-modal-open-button"
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

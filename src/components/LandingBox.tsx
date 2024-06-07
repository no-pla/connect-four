/// <reference types="vite-plugin-svgr/client" />

import { useState } from "react";
import Logo from "../assets/images/logo.svg?react";
import PlayWithUser from "../assets/images/player-vs-player.svg?react";
import Button from "./Button";
import Container from "./Container";
import Backdrop from "./Modal/Backdrop";
import Modal from "./Modal/Modal";

const LandingBox = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Container primary>
      <div className="px-10 pt-[70px] pb-[60px] mobile:px-0">
        <Logo
          style={{
            margin: "0 auto",
          }}
        />
        <div className="flex flex-col gap-[30px] mt-20">
          <Button text="유저와 플레이" primary>
            <PlayWithUser />
          </Button>
          <Button
            text="게임 규칙"
            primary={false}
            onClick={setOpenModal}
            testId="modal-open-button"
          />
        </div>
      </div>
      {openModal && (
        <Backdrop primary={false}>
          <Modal closeModal={setOpenModal} />
        </Backdrop>
      )}
    </Container>
  );
};

export default LandingBox;

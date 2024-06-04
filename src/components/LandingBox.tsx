/// <reference types="vite-plugin-svgr/client" />

import Logo from "../assets/images/logo.svg?react";
import PlayWithUser from "../assets/images/player-vs-player.svg?react";
import Button from "./Button";
import Container from "./Container";

const LandingBox = () => {
  return (
    <Container>
      <Logo
        style={{
          margin: "0 auto",
        }}
      />
      <div className="flex flex-col gap-[30px] mt-20">
        <Button text="유저와 플레이" primary>
          <PlayWithUser />
        </Button>
        <Button text="게임 규칙" primary={false} />
      </div>
    </Container>
  );
};

export default LandingBox;

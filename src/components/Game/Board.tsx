import React from "react";
import LargeBackBoard from "../../assets/images/board-layer-black-large.svg?react";
import LargeFrontBoard from "../../assets/images/board-layer-white-large.svg?react";
// import SmallBackBoard from "../../assets/images/board-layer-black-small.svg?react";
// import SmallFrontBoard from "../../assets/images/board-layer-white-small.svg?react";

const Board = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative">
      <div className="absolute z-10 pointer-events-none">
        <LargeFrontBoard />
      </div>
      <div className="absolute">{children}</div>
      <div className="pointer-events-none">
        <LargeBackBoard />
      </div>
    </section>
  );
};

export default Board;

import React from "react";
import HeaderLogo from "../../assets/images/logo.svg?react";

const BoardHeader = () => {
  return (
    <header className="flex justify-between w-[632px] my-[52px]">
      <button className="px-5 py-[10px] text-headingXS font-bold text-white rounded-[20px] bg-darkPurple">
        MENU
      </button>
      <HeaderLogo />
      <button className="px-5 py-[10px] text-headingXS font-bold text-white rounded-[20px] bg-darkPurple">
        RESTART
      </button>
    </header>
  );
};

export default BoardHeader;

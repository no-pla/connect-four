import React from "react";

const HeaderButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => any;
}) => {
  return (
    <button
      className="px-5 py-[10px] text-headingXS font-bold text-white rounded-[20px] bg-darkPurple mobile:w-[108px] mobile:mx-1 hover:bg-red transition-colors duration-500 ease-in-out"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default HeaderButton;

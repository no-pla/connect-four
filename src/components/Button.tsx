import React from "react";

interface ButtonData {
  text: string;
  primary: boolean;
  testId?: string;
  children?: React.ReactNode;
  onClick?: (value: React.SetStateAction<boolean>) => void;
}

const Button = ({ text, primary, testId, onClick, children }: ButtonData) => {
  return (
    <div className="relative border-[3px] border-black hover:border-purple rounded-[20px]">
      <button
        onClick={() => onClick && onClick((prev: boolean) => !prev)}
        className={`text-headingM font-bold w-full ${
          primary ? "bg-yellow" : "bg-white"
        } rounded-[20px] p-5 text-left cursor-pointer shadow-container hover:shadow-hoverContainer transition-all duration-200`}
        id="modal_button"
        data-testid={testId}
      >
        {text}
      </button>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-0 pointer-events-none	">
        {children}
      </div>
    </div>
  );
};

export default Button;

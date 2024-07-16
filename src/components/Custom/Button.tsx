import React from "react";

interface ButtonState {
  text: string;
  primary: boolean;
  secondary?: boolean;
  testId?: string;
  children?: React.ReactNode;
  onClick?: (value: React.SetStateAction<boolean>) => void;
  style: string;
}

const Button = ({
  text,
  primary,
  secondary,
  testId,
  onClick,
  children,
  style,
}: ButtonState) => {
  return (
    <div className="relative border-[3px] border-black hover:border-purple rounded-[20px]">
      <button
        onClick={() => onClick && onClick((prev: boolean) => !prev)}
        className={`text-headingM font-bold w-full ${style} ${
          primary ? "bg-yellow" : "bg-white"
        } rounded-[20px] p-5 cursor-pointer shadow-container hover:shadow-hoverContainer transition-all duration-200 ${
          secondary && "bg-red text-white"
        }`}
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

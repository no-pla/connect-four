import React from "react";

interface ButtonState {
  text: string;
  primary: boolean;
  secondary?: boolean;
  testId?: string;
  children?: React.ReactNode;
  onClick?: () => void;
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
  const bgColor = primary
    ? "bg-yellow"
    : secondary
    ? "bg-red text-white"
    : "bg-white";

  return (
    <div className="relative">
      <button
        data-testid={testId}
        onClick={() => onClick && onClick()}
        className={`p-5 rounded-[20px] w-full ${bgColor} text-headingM font-bold cursor-pointer border-[4px] border-black shadow-container hover:border-darkPurple hover:shadow-hoverContainer ${style}`}
      >
        {text}
      </button>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-0 pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default Button;

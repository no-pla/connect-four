import React from "react";

interface ButtonData {
  text: string;
  primary: boolean;
  children?: React.ReactNode;
}

const Button = ({ text, primary, children }: ButtonData) => {
  return (
    <div
      className={`text-headingM font-bold w-full ${
        primary ? "bg-yellow" : "bg-white"
      } border-[3px] border-black hover:border-purple rounded-[20px] px-5 flex justify-between items-center cursor-pointer shadow-container hover:shadow-hoverContainer transition-all duration-200`}
    >
      <button className="py-5">{text}</button>
      {children}
    </div>
  );
};

export default Button;

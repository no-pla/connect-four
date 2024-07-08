import React from "react";

interface ContainerData {
  children: React.ReactNode;
  primary: boolean;
}

const Container = ({ children, primary }: ContainerData) => {
  return (
    <div
      className={`z-20 ${
        primary ? "bg-purple s:shadow-none s:px-0 s:border-none" : "bg-white"
      } relative border-black border-[3px] rounded-[40px] shadow-container w-screen max-w-[480px] m:mx-5`}
    >
      {children}
    </div>
  );
};

export default Container;

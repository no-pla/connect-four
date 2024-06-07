import React from "react";

interface ContainerData {
  children: React.ReactNode;
  primary: boolean;
}

const Container = ({ children, primary }: ContainerData) => {
  return (
    <div
      className={`${
        primary
          ? "bg-purple mobile:shadow-none mobile:px-0 mobile:border-none"
          : "bg-white"
      } relative border-black border-[3px] rounded-[40px] shadow-container w-screen max-w-[480px] tablet:mx-5`}
    >
      {children}
    </div>
  );
};

export default Container;

import React from "react";

interface ContainerData {
  children: React.ReactNode;
  primary: boolean;
}

const Container = ({ children, primary }: ContainerData) => {
  return (
    <div
      className={`z-20 ${
        primary
          ? "bg-purple mx-5 mobile:px-0 mobile:border-none mobile:shadow-none mini:px-0 mini:border-none mini:shadow-none"
          : "bg-white"
      } relative normal-border rounded-[40px] w-screen max-w-[480px] tablet:mx-5 mobile:mx-5 mini:mx-5`}
    >
      {children}
    </div>
  );
};

export default Container;

import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-purple px-10 pt-[70px] pb-[60px] border-black border-[3px] rounded-[40px] shadow-container w-screen max-w-[480px] tablet:mx-5 mobile:px-0 mobile:border-none mobile:shadow-none">
      {children}
    </div>
  );
};

export default Container;

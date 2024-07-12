import React from "react";
import { createPortal } from "react-dom";

interface ModalState {
  children: React.ReactNode;
  primary: boolean;
}

const Backdrop = ({ children, primary }: ModalState) => {
  return createPortal(
    <div
      className={`absolute top-0 left-0 h-screen w-screen ${
        primary && "bg-backdrop"
      } z-20 flex justify-center items-center`}
    >
      {children}
    </div>,
    document.getElementById("portal")!
  );
};

export default Backdrop;

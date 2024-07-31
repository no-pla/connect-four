import React from "react";
import Container from "../Container";

const Modal = ({
  children,
  primary,
}: {
  children: React.ReactNode;
  primary: boolean;
}) => {
  return (
    <Container aria-modal="true" primary={primary}>
      {children}
    </Container>
  );
};

export default Modal;

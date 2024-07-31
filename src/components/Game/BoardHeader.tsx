import HeaderLogo from "assets/logo.svg?react";
import { useDispatch } from "react-redux";
import { reset, setStop } from "slices/gameSlice";
import { toggleModal } from "slices/modalSlice";
import EmphasizeColumn from "./Board/EmphasizeColumn";
import HeaderButton from "./HeaderButton";

const BoardHeader = () => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(toggleModal());
    dispatch(setStop());
  };

  return (
    <>
      <header className="w-full max-w-[632px] mb-4 mx-auto flex justify-between items-center relative mt-[53px] laptop:my-8 tablet:my-8 mobile:mb-0 mini:my-[50px]">
        <HeaderButton text="MENU" onClick={() => openModal()} />
        <HeaderLogo className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 mobile:relative mobile:top-0 mobile:left-0 mobile:translate-x-0 mobile:translate-y-0" />
        <HeaderButton text="RESTART" onClick={() => dispatch(reset({}))} />
      </header>
      <EmphasizeColumn />
    </>
  );
};

export default BoardHeader;

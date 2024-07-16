import { useDispatch } from "react-redux";
import HeaderButton from "./HeaderButton";
import { reset, setStop } from "slices/gameSlice";
import { toggleModal } from "slices/modalSlice";
import HeaderLogo from "assets/logo.svg?react";

const BoardHeader = () => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(toggleModal());
    dispatch(setStop());
  };

  return (
    <header className="w-full max-w-[632px] py-[52px] mx-auto flex justify-between items-center relative tablet:py-8 mobile:pb-0 mini:py-[50px]">
      <HeaderButton text="MENU" onClick={() => openModal()} />
      <HeaderLogo className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 mobile:relative mobile:top-0 mobile:left-0 mobile:translate-x-0 mobile:translate-y-0" />
      <HeaderButton text="RESTART" onClick={() => dispatch(reset({}))} />
    </header>
  );
};

export default BoardHeader;

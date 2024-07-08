import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../slices/gameSlice";
import modalReducer from "../slices/modalSlice";

export default configureStore({
  reducer: {
    game: gameReducer,
    modal: modalReducer,
  },
});

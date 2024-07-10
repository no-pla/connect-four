import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "slices/gameSlice";
import modalReducer from "slices/modalSlice";

const rootReducer = combineReducers({
  game: gameReducer,
  modal: modalReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

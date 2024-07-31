import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  modalOpen: boolean;
} = {
  modalOpen: false,
} as const;

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalOpen = !state.modalOpen;
    },
    resetModal: () => initialState,
  },
});

export const { toggleModal, resetModal } = modalSlice.actions;

export default modalSlice.reducer;

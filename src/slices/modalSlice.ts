import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalOpen = state.modalOpen === true ? false : true;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;

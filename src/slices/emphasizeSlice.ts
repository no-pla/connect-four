import { createSlice } from "@reduxjs/toolkit";

interface EmphasizeState {
  colNumber: number;
  left: string;
}

const initialState: EmphasizeState = {
  colNumber: 0,
  left: "left-[30px]",
};

const emphasizeSlice = createSlice({
  name: "emphasize",
  initialState,
  reducers: {
    emphasizeColumn: (
      state,
      actions: {
        payload: {
          columnNumber: number;
        };
      }
    ) => {
      const colNum = actions.payload.columnNumber;

      switch (colNum) {
        case 0:
          state.left = "left-[30px]";
          break;
        case 1:
          state.left = "left-[120px]";
          break;
        case 2:
          state.left = "left-[210px]";
          break;
        case 3:
          state.left = "left-[300px]";
          break;
        case 4:
          state.left = "left-[385px]";
          break;
        case 5:
          state.left = "left-[475px]";
          break;
        default:
          state.left = "left-[560px]";
          break;
      }
    },
  },
});

export const { emphasizeColumn } = emphasizeSlice.actions;

export default emphasizeSlice.reducer;

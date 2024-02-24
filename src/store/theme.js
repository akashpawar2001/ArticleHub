import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = {
  themeMode: "light",
};

const themeReducer = createSlice({
  name: "thememode",
  initialState,
  reducers: {
    lightTheme: (state, action) => {
      state.themeMode = action.payload;
    },
    darkTheme: (state, action) => {
      state.themeMode = action.payload;
    },
  },
});

export const { lightTheme, darkTheme } = themeReducer.actions;

export default themeReducer.reducer;

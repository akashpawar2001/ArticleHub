import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import theme from "./theme";
const store = configureStore({
  reducer: { auth: authSlice, theme: theme },
});

export default store;

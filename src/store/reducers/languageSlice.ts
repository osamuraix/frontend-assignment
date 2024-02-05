import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLanguage:
    typeof window !== "undefined"
      ? localStorage.getItem("currentLanguage") || "en"
      : "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.currentLanguage = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("currentLanguage", action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

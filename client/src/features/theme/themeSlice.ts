import { createSlice } from "@reduxjs/toolkit/react";
import { DEFAULT_THEME, type Theme } from "../../constants/defaults";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: Theme;
}

const savedTheme = localStorage.getItem("theme") as Theme | null;

const initialState: ThemeState = {
  theme: (savedTheme === "light" || savedTheme === "dark")
    ? savedTheme : DEFAULT_THEME
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      state.theme = (state.theme === "light") ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    }
  }
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
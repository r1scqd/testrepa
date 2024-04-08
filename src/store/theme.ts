import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "./index.ts";

export type ThemeType = "dark" | "white" | "system"

export interface ThemeState {
  theme: ThemeType;
}

const initialState: ThemeState = {
  theme: "system"
};

interface ThemePersist {
  theme: ThemeType
}


export const restoreThemeState = createAsyncThunk("theme/restore", async () => {
  const theme = await storage.getStringAsync("theme.theme");
  let r;
  if (theme){
    r = theme;
  } else {
    r = "system"
  }
  const state: ThemePersist = {
    // @ts-ignore
    theme: r
  }
  return state;
});


export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(restoreThemeState.fulfilled, (state, {payload}) =>{
      state.theme = payload.theme
    })
  }
});

export const {setTheme} = themeSlice.actions

export default themeSlice.reducer

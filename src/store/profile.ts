import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage, useAppSelector } from "./index.ts";
import { useEffect } from "react";
import { setAxiosAuthToken } from "../services";

export enum ProfileRoles {
  STUDENT, TEACHER
}

export interface ProfileData {
  role: ProfileRoles;
  name: string;
  lastname: string;
}


const initialState: ProfileState = {
  authToken: null, isAuth: false, lastname: "", name: "", role: ProfileRoles.TEACHER
};

export interface ProfileState extends ProfileData {
  authToken: Nullable<string>;
  isAuth: boolean;
}

interface ProfilePersist {
  authToken: Nullable<string>;
}


export const restoreProfileState = createAsyncThunk("profile/restore", async () => {
  const token = await storage.getStringAsync("authToken");
  const r: ProfilePersist = {
    authToken: token || null
  };
  return r;
});


export const useStoreProfileState = () => {
  const state = useAppSelector(state => state.profile);
  useEffect(() => {
    if (state.isAuth) {
      console.log(`save token: ${state.authToken}`);
      storage.setString("authToken", state.authToken!!);
    } else {
      storage.removeItem("authToken");
    }
  }, [state.authToken]);
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
      state.isAuth = true;
      setAxiosAuthToken(state.authToken);
    },
    signOut: () => {
      setAxiosAuthToken(null);
      return initialState;
    }
  },
  extraReducers: builder => {
    builder.addCase(restoreProfileState.fulfilled, (state, { payload }) => {
      if (payload.authToken) {
        state.authToken = payload.authToken;
        state.isAuth = true;
        setAxiosAuthToken(state.authToken);
      } else {
        state.isAuth = false;
      }
      console.log("restore profile state");
    });
  }
});

export const { signIn, signOut } = profileSlice.actions;

export default profileSlice.reducer;

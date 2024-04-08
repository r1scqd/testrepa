import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "./index.ts";
import { setAxiosAuthToken } from "../services";
import { UsersResponse } from "../services/users.ts";

export enum ProfileRoles {
  STUDENT = "student", TEACHER = "teacher"
}

export interface ProfileData {
  role: Undefinable<ProfileRoles>;
  name: string;
  lastname: string;
  username: string;
}


const initialState: ProfileState = {
  authToken: null, isAuth: false, lastname: "", name: "", role: undefined, username: ""
};

export interface ProfileState extends ProfileData {
  authToken: Nullable<string>;
  isAuth: boolean;
}

interface ProfilePersist {
  authToken: Nullable<string>;
}


export const restoreProfileState = createAsyncThunk("profile/restore", async () => {
  const token = await storage.getStringAsync("profile.authToken");
  const r: ProfilePersist = {
    authToken: token || null
  };
  return r;
});
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
      state.isAuth = true;
      setAxiosAuthToken(state.authToken);
      storage.setString("profile.authToken", state.authToken);
    },
    signOut: () => {
      setAxiosAuthToken(null);
      storage.removeItem("profile.authToken");
      return initialState;
    },
    fillProfile: (state, action: PayloadAction<UsersResponse>) => {
      console.log(`profile fill data with ${action.payload}`);
      switch (action.payload.role) {
        case "student":
          state.role = ProfileRoles.STUDENT;
          break;
        case "teacher":
          state.role = ProfileRoles.TEACHER;
          break;
      }
      state.name = action.payload.name;
      state.lastname = action.payload.lastname;
      state.username = action.payload.username;
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

export const { signIn, signOut, fillProfile } = profileSlice.actions;

export default profileSlice.reducer;

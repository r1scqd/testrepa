import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { MMKVLoader } from "react-native-mmkv-storage";
import profileReducer from "./profile";
import themeReducer from "./theme";

export const storage = new MMKVLoader().initialize();
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    theme: themeReducer
  }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



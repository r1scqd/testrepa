import { AppDispatch, store, useAppDispatch, useAppSelector } from "./store";
import React, { ReactNode, useEffect, useState } from "react";
import { restoreThemeState } from "./store/theme.ts";
import { fillProfile, restoreProfileState, signOut } from "./store/profile.ts";
import { signInCheck } from "./services/profile/auth.ts";
import { usersMe } from "./services/users.ts";
import SplashScreen from "./screens/splash.tsx";
import { PaperProvider } from "react-native-paper";
import { Appearance } from "react-native";

interface StoreFillerProps {
  children: ReactNode;
}

export function AppInitializerProvider({ children }: StoreFillerProps) {
  const dispatch = useAppDispatch();
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    Promise.all([
        dispatch(restoreThemeState()).then(() => {
          const { theme } = store.getState().theme;
          theme != "system" && Appearance.setColorScheme(theme);
        }),
        dispatch(restoreProfileState()).then(async () => {
          const { isAuth } = store.getState().profile;
          if (isAuth) {
            const isSignValid = await signInCheck();
            if (isSignValid) {
              const res = await usersMe();
              dispatch(fillProfile(res.data));
            } else {
              dispatch(signOut())
            }
          }
          console.log(store.getState().profile);
        })
      ]
    ).then(() => setInitialized(true));
  }, []);


  useEffect(() => {
    console.log(`is initial ${isInitialized}`);
  }, [isInitialized]);
  return (<PaperProvider>
    {isInitialized ? (children) : (<SplashScreen />)}
  </PaperProvider>);
}

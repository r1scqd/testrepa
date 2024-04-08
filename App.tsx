import { Provider } from "react-redux";
import { store, useAppDispatch } from "./src/store";
import Navigation from "./src/navigation.tsx";
import React, { ReactNode, useEffect, useState } from "react";
import SplashScreen from "./src/screens/splash.tsx";
import {
  fillProfile,
  restoreProfileState,
  signOut
} from "./src/store/profile.ts";
import { setOnTokenExpired } from "./src/services";
import { signInCheck } from "./src/services/profile/auth.ts";
import { usersMe } from "./src/services/users.ts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, PaperProvider, ThemeProvider } from "react-native-paper";
import { restoreThemeState } from "./src/store/theme.ts";
import ThemeContext from "@react-navigation/native/lib/typescript/src/theming/ThemeContext";
import { Appearance } from "react-native";
import setColorScheme = Appearance.setColorScheme;

interface StoreFillerProps {
  children: ReactNode;
  loading: ReactNode;
}

function AppInitializerGate({ children, loading }: StoreFillerProps) {
  setColorScheme("light");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(restoreThemeState());
    dispatch(restoreProfileState()).then(async () => {
      setOnTokenExpired(() => dispatch(signOut()));
      try {
        const isSignValid = await signInCheck();
        if (isSignValid) {
          const res = await usersMe();
          dispatch(fillProfile(res.data));
        }
      } finally {
        setIsLoading(false);
      }
    });
  }, [dispatch]);
  return <>{isLoading ? loading : children}</>;
}

function App() {
  return (
    <Provider store={store}>
      <AppInitializerGate loading={<SplashScreen />}>
        <PaperProvider theme={{ dark: false }}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </PaperProvider>
      </AppInitializerGate>
    </Provider>
  );
}

export default App;

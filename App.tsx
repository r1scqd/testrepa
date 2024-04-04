/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "./src/store";
import Navigation from "./src/navigation.tsx";
import React, { ReactNode, useEffect, useState } from "react";
import SplashScreen from "./src/screens/splash.tsx";
import { restoreProfileState, signOut, useStoreProfileState } from "./src/store/profile.ts";
import { setOnTokenExpired } from "./src/services";
import { signInCheck } from "./src/services/profile/auth.ts";

interface StoreFillerProps {
  children: ReactNode,
  loading: ReactNode
}

function AppInitializerGate({ children, loading }: StoreFillerProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(restoreProfileState())
      .finally(() => {
        console.log("store initialized");
        setOnTokenExpired(() => {
          dispatch(signOut());
        });
        signInCheck().then(r => !r && dispatch(signOut()));
        setIsLoading(false);
      });
  }, []);
  const StorageSaveWrapper = () => {
    useStoreProfileState();
    return <>{children}</>;
  };
  return <>{isLoading ? (loading) : (<StorageSaveWrapper />)}</>;
}

function App() {
  return (
    <Provider store={store}>
      <AppInitializerGate loading={<SplashScreen />}>
        <Navigation />
      </AppInitializerGate>
    </Provider>
  );
}

export default App;

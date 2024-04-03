/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { Provider } from "react-redux";
import { store, useAppDispatch } from "./src/store";
import Navigation from "./src/navigation.tsx";
import React, { ReactNode, useEffect, useState } from "react";
import SplashScreen from "./src/screens/splash.tsx";
import { restoreProfileState, useStoreProfileState } from "./src/store/profile.ts";

interface StoreFillerProps {
  children: ReactNode,
  loading: ReactNode
}

function StorageGate({ children, loading }: StoreFillerProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    Promise.all([
      dispatch(restoreProfileState()),
      new Promise((resolve) => {
        setTimeout(resolve, 2000);
      })
    ]).finally(() => setIsLoading(false));
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
      <StorageGate loading={<SplashScreen />}>
        <Navigation />
      </StorageGate>
    </Provider>
  );
}

export default App;

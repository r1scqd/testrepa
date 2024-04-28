import { Provider } from "react-redux";
import { store } from "./src/store";
import Navigation from "./src/navigation.tsx";

import { AppInitializerProvider } from "./src/initializers.tsx";
import { StatusBar } from "react-native";


function App() {
  return (
    <Provider store={store}>
      <AppInitializerProvider>
        <StatusBar />
        <Navigation />
      </AppInitializerProvider>
    </Provider>
  );
}

export default App;

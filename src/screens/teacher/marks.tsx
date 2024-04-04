import { StyleSheet, Text, View } from "react-native";
import MarksComponent from "../../components/marks.tsx";
import { useEffect, useState } from "react";
import { getMarks, MarksResponse } from "../../services/marks/teacher.ts";
import SplashScreen from "../splash.tsx";

const MarksScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<Nullable<MarksResponse>>(null);


  useEffect(() => {
    getMarks().then(r => {
      setState(r.data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <View style={styles.container}>
      <MarksComponent data={state!!} />
    </View>);
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1
  }
});

export default MarksScreen;

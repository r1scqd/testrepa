import { StyleSheet, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

const SplashScreen = () => {
  const theme = useTheme()
  return (<View style={[styles.container, {backgroundColor: theme.colors.background}]}>
    <ActivityIndicator size={"large"} />
  </View>);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});


export default SplashScreen

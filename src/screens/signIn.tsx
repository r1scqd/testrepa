import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { signIn } from "../store/profile.ts";

const SignInScreen = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch(signIn("tokenPayload"))
    }, 10_000);
  }, []);

  return (<View style={styles.container}>
    <Text>SignIn screen</Text>
  </View>);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SignInScreen;

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useAppDispatch } from "../store";
import { signIn } from "../services/profile/auth.ts";
import { signIn as signInAction } from "../store/profile.ts";

const SignInScreen = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = () => {
    signIn({ username, password }).then(({ data }) => {
      dispatch(signInAction(data.token));
    }).catch((r) => {
      console.log(r);
      setErrorMessage("Неверный логин или пароль");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    });
  };

  return (<View style={styles.container}>
    {errorMessage && <Text>{errorMessage}</Text>}
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Username."
        placeholderTextColor="#003f5c"
        onChangeText={setUsername}
      />
    </View>
    <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Password."
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
    </View>
    <TouchableOpacity style={styles.loginBtn} onPress={auth}>
      <Text style={styles.loginText}>Sign In</Text>
    </TouchableOpacity>
  </View>);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputView: {
    backgroundColor: "#39ed5d",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "green"
  },
  loginText: {
    fontSize: 20
  }
});

export default SignInScreen;

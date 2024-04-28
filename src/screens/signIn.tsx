import React, { useState } from "react";
import { useAppDispatch } from "../store";
import { signIn } from "../services/profile/auth.ts";
import { fillProfile, signIn as signInAction } from "../store/profile.ts";
import { usersMe } from "../services/users.ts";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

const SignInScreen = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const auth = () => {
    signIn({ username, password }).then(({ data }) => {
      dispatch(signInAction(data.token));
      return usersMe();
    }).then(({ data }) => {
      dispatch(fillProfile(data));
      console.log("fill data");
    }).catch((r) => {
      console.log(r);
      setErrorMessage("Неверный логин или пароль");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    });
  };

  return (<View style={[styles.container, {backgroundColor: theme.colors.background}]}>
    {errorMessage && <Text>{errorMessage}</Text>}
    <View style={styles.inputView}>
      <TextInput
        mode={"outlined"}
        style={styles.TextInput}
        placeholder="Логин"
        onChangeText={value => setUsername(value.trim())}
        value={username}
      />
    </View>
    <View style={styles.inputView}>
      <TextInput
        mode={"outlined"}
        style={styles.TextInput}
        placeholder="Пароль"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
    </View>
    <Button style={styles.loginBtn} mode={"elevated"} onPress={auth}>
      <Text style={styles.loginText}>Войти</Text>
    </Button>
  </View>);
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  },
  inputView: {
    width: "70%",
    height: 45
  },
  TextInput: {
    height: 50,
    flex: 1
  },
  loginBtn: {
    width: "60%",
  },
  loginText: {
    fontSize: 20
  }
});

export default SignInScreen;

import { Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch } from "../store";
import { signOut } from "../store/profile.ts";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const signOutAct = () => {
    dispatch(signOut());
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={signOutAct}>
        <Text>the main screen</Text>
      </TouchableOpacity>
    </View>);
};

export default HomeScreen;

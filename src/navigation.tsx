import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "./screens/signIn.tsx";
import HomeScreen from "./screens/home.tsx";
import { useAppSelector } from "./store";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Navigation = () => {
  const { isAuth } = useAppSelector(state => state.profile);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuth ? (
          <Stack.Screen
            name={"SignIn"}
            component={SignInScreen}
            options={{
              title: "Sign in",
              animationTypeForReplace: isAuth ? "pop" : "push"
            }}
          />
        ) : (
          <Stack.Screen
            name={"Home"}
            component={HomeScreen}
            options={{
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

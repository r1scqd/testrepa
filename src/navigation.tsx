import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "./screens/signIn.tsx";
import HomeScreen from "./screens/home.tsx";
import { useAppSelector } from "./store";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileRoles } from "./store/profile.ts";
import SubjectsScreen from "./screens/teacher/subjects.tsx";
import StudentsScreen from "./screens/teacher/students.tsx";
import MarksScreen from "./screens/teacher/marks.tsx";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Navigation = () => {
  const { isAuth, authToken, role } = useAppSelector(state => state.profile);
  return (
    <NavigationContainer>
      {!authToken ? (
        <Stack.Navigator>
          <Stack.Screen
            name={"SignIn"}
            component={SignInScreen}
            options={{
              title: "Sign in",
              animationTypeForReplace: isAuth ? "pop" : "push"
            }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          {role == ProfileRoles.TEACHER && (
            <>
              <Tab.Screen
                name={"Subjects"}
                component={SubjectsScreen}
              />
              <Tab.Screen
                name={"Students"}
                component={StudentsScreen}
              />
              <Tab.Screen
                name={"Marks"}
                component={MarksScreen}
              />
            </>
          )}
          {role == ProfileRoles.STUDENT && (
            <>
              <Tab.Screen
                name={"Home"}
                component={HomeScreen}
              />
            </>
          )}
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigation;

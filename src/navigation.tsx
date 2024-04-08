import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import SignInScreen from "./screens/signIn.tsx";
import HomeScreen from "./screens/home.tsx";
import { useAppSelector } from "./store";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileRoles } from "./store/profile.ts";
import SubjectsScreen from "./screens/teacher/subjects.tsx";
import StudentsScreen from "./screens/teacher/students.tsx";
import MarksScreen from "./screens/teacher/marks.tsx";
import StudentSubjectsScreen from "./screens/student/subjects.tsx";
import SignOutScreen from "./screens/signOut.tsx";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Navigation = () => {
  const { isAuth, authToken, role } = useAppSelector(state => state.profile);

  return (
      <NavigationContainer theme={{dark: false, colors: DefaultTheme.colors}}>
        {!authToken ? (
          <Stack.Navigator>
            <Stack.Screen
              name={"SignIn"}
              component={SignInScreen}
              options={{
                title: "Вход",
                animationTypeForReplace: isAuth ? "pop" : "push"
              }}
            />
          </Stack.Navigator>
        ) : (
          role ? (
            <Tab.Navigator>
              {role == ProfileRoles.TEACHER && (
                <>
                  <Tab.Screen
                    name={"Subjects"}
                    component={SubjectsScreen}
                    options={{
                      title: "Предметы",
                    }}
                  />
                  <Tab.Screen
                    name={"Students"}
                    component={StudentsScreen}
                    options={{
                      title: "Студенты"
                    }}
                  />
                  <Tab.Screen
                    name={"Marks"}
                    component={MarksScreen}
                    options={{
                      title: "Оценки"
                    }}
                  />
                </>
              )}
              {role == ProfileRoles.STUDENT && (
                <>
                  <Tab.Screen
                    name={"Subjects"}
                    component={StudentSubjectsScreen}
                    options={{
                      title: "Предметы"
                    }}
                  />
                </>
              )}
              <Tab.Screen name="SignOut" component={SignOutScreen} options={{
                title: "Выход"
              }} />
            </Tab.Navigator>) : (
            <HomeScreen />
          )
        )}
      </NavigationContainer>
  );
};

export default Navigation;

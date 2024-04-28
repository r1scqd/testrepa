import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import SignInScreen from "./screens/signIn.tsx";
import { useAppSelector } from "./store";
import { ProfileRoles } from "./store/profile.ts";
import SubjectsScreen from "./screens/teacher/subjects.tsx";
import StudentsScreen from "./screens/teacher/students.tsx";
import MarksScreen from "./screens/teacher/marks.tsx";
import StudentSubjectsScreen from "./screens/student/subjects.tsx";
import SignOutScreen from "./screens/signOut.tsx";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import SplashScreen from "./screens/splash.tsx";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator();
const Navigation = () => {
  const theme = useTheme();
  const { isAuth, role } = useAppSelector(state => state.profile);
  return (
    <View style={{ flex: 1 }}>
      <View style={[{  width: "100%", backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.onSurface, paddingVertical: 10 }, styles.headerView]}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>Application</Text>
      </View>
      <NavigationContainer>
        {!isAuth ? (
          <SignInScreen />
        ) : (
          role ? (
            <Tab.Navigator>
              {role == ProfileRoles.TEACHER && (
                <>
                  <Tab.Screen
                    name={"Subjects"}
                    component={SubjectsScreen}
                    options={{
                      title: "Предметы"
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
            <SplashScreen />
          )
        )}
      </NavigationContainer>
    </View>
  );
};


const styles = StyleSheet.create({
  headerView: {
    borderBottomWidth: 1
  }
});

export default Navigation;

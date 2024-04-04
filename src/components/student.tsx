import { StudentBase } from "../services/students";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface StudentComponentProps {
  student: StudentBase;
}

const StudentComponent = ({ student }: StudentComponentProps) => {
  return (<TouchableOpacity>
    <View style={styles.container}>
      <Text style={styles.item}>{student.lastname} {student.name}</Text>
      <Text style={styles.item}>{student.username}</Text>
    </View>
  </TouchableOpacity>);
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    marginHorizontal: 10,
    gap: 5,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: "5%",
    justifyContent: "space-between"
  },
  item: {
    fontSize: 16
  }
});

export default StudentComponent

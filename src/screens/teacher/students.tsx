import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { Subject } from "../../services/subjects";
import { getSubjects } from "../../services/subjects/teacher.tsx";
import SubjectComponent from "../../components/subject.tsx";
import { getStudents } from "../../services/students/teacher.ts";
import { StudentBase } from "../../services/students";
import StudentComponent from "../../components/student.tsx";

const StudentsScreen = () => {
  const [subjects, setSubjects] = useState<ArrayLike<StudentBase>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const refreshSubjects = () => {
    setIsLoading(true);
    getStudents().then(r => {
      setSubjects(r.data.students);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    refreshSubjects();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={subjects}
        renderItem={({ item }) => <StudentComponent student={item} />}
        refreshing={isLoading}
        onRefresh={refreshSubjects}
      />
    </SafeAreaView>);
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
  }
});

export default StudentsScreen;

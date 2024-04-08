import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import * as React from "react";
import { getSubjects, SubjectExt } from "../../services/subjects/students.ts";
import SubjectComponent from "../../components/student.subject.tsx";

const StudentSubjectsScreen = () => {
  const [subjects, setSubjects] = useState<ArrayLike<SubjectExt>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const refreshSubjects = () => {
    setIsLoading(true);
    getSubjects().then(r => {
      setSubjects(r.data.subjects);
    }).finally(() => {
      setIsLoading(false);
    });
  };


  useEffect(() => {
    refreshSubjects();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={subjects}
        renderItem={({ item }) => <SubjectComponent subject={item} />}
        refreshing={isLoading}
        onRefresh={refreshSubjects}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  }
});

export default StudentSubjectsScreen;


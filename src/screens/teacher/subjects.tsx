import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { Subject } from "../../services/subjects";
import SubjectComponent from "../../components/subject.tsx";
import { getSubjects } from "../../services/subjects/teacher.tsx";
import SubjectEditComponent from "../../components/subject.edit.tsx";
import { Button, Modal, PaperProvider, Portal, Provider } from "react-native-paper";
import * as React from "react";

const SubjectsScreen = () => {
  const [subjects, setSubjects] = useState<ArrayLike<Subject>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Nullable<Subject>>(null);
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
    <PaperProvider>
      {modalVisible && (
        <Portal>
          <SubjectEditComponent
            onDismiss={() => {
              setModalVisible(false);
              setSelectedSubject(null);
              refreshSubjects();
            }}
            visible={modalVisible}
            subject={selectedSubject}
          />
        </Portal>
      )}
      <View style={styles.container}>
        <FlatList
          data={subjects}
          renderItem={({ item }) => <SubjectComponent subject={item} onPress={() => {
            setSelectedSubject(item);
            setModalVisible(true);
            console.log(item);
          }} />}
          refreshing={isLoading}
          onRefresh={refreshSubjects}
        />
        <Button mode={"text"} onPress={() => setModalVisible(true)}><Text>Добавить предмет</Text></Button>
      </View>
    </PaperProvider>);
};


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  }
});

export default SubjectsScreen;

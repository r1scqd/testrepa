import { Subject } from "../services/subjects";
import { Button, Modal } from "react-native-paper";
import { Text, TextInput } from "react-native-paper";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, View } from "react-native";
import { createSubject, deleteSubject, editSubject } from "../services/subjects/teacher.tsx";

export interface SubjectEditComponentProps {
  onDismiss: () => void;
  visible: boolean;
  subject: Nullable<Subject>;
}

const SubjectEditComponent = ({ visible, onDismiss, subject }: SubjectEditComponentProps) => {
  const [name, setName] = useState(subject?.name || "");
  const [spending, setSpending] = useState(subject?.spending ? new Date(subject.spending) : new Date());
  const [isSelectDate, setIsSelectDate] = useState(false);
  return (<Modal contentContainerStyle={styles.outlineContainer} visible={visible} onDismiss={onDismiss}
                 dismissableBackButton={true}>
    <View style={styles.container}>
      <TextInput mode={"outlined"} onChangeText={setName} value={name} />

      <View style={styles.dateSelectView}>
        <Text>Выбранная дата: {spending.toDateString()}</Text>
        <Button mode={"outlined"} onPress={() => setIsSelectDate(true)}>
          <Text>Выбрать дату</Text>
        </Button>
      </View>
      {isSelectDate &&
        <DateTimePicker
          value={spending}
          onChange={(_event, date) => {
            date && setSpending(date);
            setIsSelectDate(false);
          }}
        />}
      <View style={styles.buttonsView}>

        <Button mode={"outlined"} onPress={() => {
          onDismiss();
        }}>
          <Text>Отменить</Text>
        </Button>
        <Button mode={"outlined"} onPress={() => {
          if (subject) {
            editSubject({ id: subject.id, spending: spending.toISOString(), name }).then(r => {
              console.log(r);
              onDismiss();
            });
          } else {
            createSubject({ spending: spending.toISOString(), name }).then(r => {
              console.log(r);
              onDismiss();
            });
          }
        }}>
          <Text>{subject ? "Сохранить" : "Добавить"}</Text>
        </Button>
        {subject && (<Button mode={"outlined"} onPress={() => {
          deleteSubject(subject).then(r => {
            console.log(r);
            onDismiss();
          });
        }}><Text>Удалить</Text></Button>)}
      </View>
    </View>
  </Modal>);
};


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    gap: 20
  },
  outlineContainer: {
    backgroundColor: "white",
    padding: 20,
    alignSelf: "center",
    width: "80%",
    borderRadius: 10
  },
  dateSelectView: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap"
  },
  buttonsView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
    flexWrap: "wrap"
  }
});

export default SubjectEditComponent;

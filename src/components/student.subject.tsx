import { SubjectExt } from "../services/subjects/students.ts";
import moment from "moment/moment";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useState } from "react";
import { setSubjectMark } from "../services/marks/student.ts";
import { Dropdown } from "react-native-element-dropdown";

export interface SubjectComponentProps {
  subject: SubjectExt;
}

const availableMarks: DropdownMark[] = [
  {
    label: "Незачет",
    value: "Незачет"
  },
  {
    label: "Зачет",
    value: "Зачет"
  },
  {
    label: "2",
    value: "2"
  },
  {
    label: "3",
    value: "3"
  },
  {
    label: "4",
    value: "4"
  },
  {
    label: "5",
    value: "5"
  },
];

interface DropdownMark {
  label: string,
  value: string
}


export const SubjectComponent = ({ subject }: SubjectComponentProps) => {
  const date = moment(subject.spending);
  const [mark, setMark] = useState(subject.mark || "");
  const [notifyMessage, setNotifyMessage] = useState("");
  return (<View style={styles.container}>
    <View style={styles.itemView}>
      <Text style={styles.item}>{subject.name}</Text>
      <Text style={styles.item}>{date > moment() ? date.fromNow() : "Прошёл"}</Text>
    </View>
    {subject.is_available && (
      <View style={styles.itemView}>
        <Dropdown
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          style={styles.dropdown}
          mode={"default"}
          data={availableMarks}
          labelField={"label"} valueField={"value"}
          onChange={item => setMark(item.value)}
          value={mark}
          placeholder={"Оценка"}
        />
        {notifyMessage && (<Text>{notifyMessage}</Text>)}
        <Button onPress={() => {
          setSubjectMark({ subject_id: subject.id, mark }).then(() => {
            setNotifyMessage("Сохранено!");
            setTimeout(() => {
              setNotifyMessage("");
            }, 3000);
          });
        }}>
          <Text>Сохранить</Text>
        </Button>
      </View>
    )}
  </View>);
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 2,
    marginHorizontal: 10,
    gap: 5,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: "5%"
  },
  item: {
    fontSize: 16
  },
  itemView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dropdown: {
    minWidth: 100,
    height: 20,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default SubjectComponent;

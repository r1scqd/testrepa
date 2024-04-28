import { Subject } from "../services/subjects";
import moment from "moment";
import "moment/locale/ru";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, withTheme } from "react-native-paper";

moment.locale("ru");

export interface SubjectProps {
  subject: Subject;
  onPress: Nullable<() => void>;
}


const SubjectComponent = ({ subject, onPress }: SubjectProps) => {
  const date = moment(subject.spending);
  return (<TouchableOpacity onPress={() => onPress && onPress()}>
    <View style={styles.container}>
      <Text style={styles.item}>{subject.name}</Text>
      <Text style={styles.item}>{date.fromNow()}</Text>
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

export default SubjectComponent;

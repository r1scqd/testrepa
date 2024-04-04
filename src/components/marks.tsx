import { ScrollView, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { MarksResponse } from "../services/marks/teacher.ts";

interface MarksComponentProps {
  data: MarksResponse;
}

const MarksComponent = ({ data }: MarksComponentProps) => {
  const rows = [];
  for (const [key, value] of Object.entries(data.marks)) {
    console.log(`key: ${key} with value: ${value[2].mark}`);
    const student = data.students[key];
    rows.push(<DataTable.Row>
      <DataTable.Title style={styles.rowHeaderView}
                       textStyle={styles.rowHeaderText}>{student.lastname} {student.name}</DataTable.Title>
      {value.map((value) =>
        <DataTable.Cell style={styles.markCell}>
          {value.mark}
        </DataTable.Cell>)}
    </DataTable.Row>);
  }

  return (
    <ScrollView horizontal={true}>
      <DataTable style={styles.dataTableView}>
        <DataTable.Header style={styles.headerView}>
          <DataTable.Title style={styles.rowHeaderView}>
          </DataTable.Title>
          {data.subjects.map((value) =>
            <DataTable.Title textStyle={styles.headerText} style={styles.columnHeaderView}>
              {value.name}
            </DataTable.Title>
          )}
        </DataTable.Header>
        {rows}
      </DataTable>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  dataTableView:{
    height: "100%"
  },
  text: {
    fontSize: 14
  },
  headerView: {
    gap: 20
  },
  headerText: {
    fontSize: 14
  },
  rowHeaderView: {
    width: 120
  },
  rowHeaderText: {
    fontSize: 16
  },
  markCell: {
    width: 70,
    justifyContent: 'center'
  },
  columnHeaderView:{
    width: 70
  }
});
export default MarksComponent;

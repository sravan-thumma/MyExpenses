import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const TableView = ({ jsonData,columns }) => {
  console.log(jsonData)
  console.log(columns);
  if (!jsonData || jsonData.length === 0) {
    return <Text>No data available.</Text>;
  }

  return (
    <ScrollView  style={styles.verticalScroll}>
      <ScrollView  horizontal style={styles.horizontalScroll}>
        <View style={styles.row}>
          {columns.map((column, index) => (
            <Text key={index} style={styles.cell}>
              {column}
            </Text>
          ))}
        </View>
      </ScrollView>
      {jsonData.map((row, rowIndex) => (
        <ScrollView key={rowIndex} horizontal style={styles.horizontalScroll}>
          <View style={styles.row}>
            {columns.map((column, columnIndex) => (
              <Text key={columnIndex} style={styles.cell}>
                {row[column]}
              </Text>
            ))}
          </View>
        </ScrollView>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  verticalScroll: {
    flex: 1,
  },
  horizontalScroll: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:5,
  },
  cell: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    minWidth: 100,
    height:80,
    width:150
  },
});

export default TableView;

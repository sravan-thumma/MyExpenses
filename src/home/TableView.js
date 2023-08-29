import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';

const TableView = ({ jsonData,columns,indexcolumns }) => {
  console.log(jsonData)
  console.log(columns);
  if (!jsonData || jsonData.length === 0) {
    return <Text>No data available.</Text>;
  }

  return (
    <ScrollView  style={styles.verticalScroll}>
      <ScrollView  horizontal style={styles.horizontalScroll}>
        <View style={styles.row}>
          {indexcolumns.map((column, index) => (
            <Text key={index} style={styles.colcell}>{columns[index]}</Text>
          ))}
        </View>
      </ScrollView>
      {jsonData.map((row, rowIndex) => (
        <ScrollView key={rowIndex} horizontal style={styles.horizontalScroll}>
          <View style={styles.row}>
            {indexcolumns.map((column, columnIndex) => (
              <TouchableOpacity key={columnIndex} 
              onPress={() => {
                if (columnIndex === 0) {
                  //onCellPress(column);
                  Alert.alert(row[column]);
                }
              }
            }>
              <Text style={styles.cell}>
                {row[column]}
              </Text>
              </TouchableOpacity>
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
    height:70,
    width:150
  },
  colcell: {
    fontWeight: 'bold',
    color:'white',
    fontSize:18,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor:'gray',
    minWidth: 100,
    height:60,
    width:150
  },
});

export default TableView;

import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const TableView = ({ jsonData,columns,indexcolumns,onCellPress }) => {
  //console.log(jsonData)
  //console.log(columns);
  if (!jsonData || jsonData.length === 0) {
    return <Text>No data available.</Text>;
  }

  const getTransactionColor = ()=>{

  }

  return (
    <View  style={styles.verticalScroll}>
        <View style={styles.row}>
          {indexcolumns.map((column, index) => (
            <Text key={index} style={styles.colcell}>{columns[index]}</Text>
          ))}
        </View>
      <ScrollView>
        {jsonData.map((row, rowIndex) => (
          <ScrollView key={rowIndex} horizontal style={styles.horizontalScroll}>
            <View style={styles.row}>
              {indexcolumns.map((column, columnIndex) => (
                <TouchableOpacity key={columnIndex} 
                onPress={() => {
                  //console.log(row['status']);
                  if (columnIndex === 0) {
                    onCellPress(row[column]);
                    //Alert.alert(row[column]);
                  }
                }
              }>

                {(row['status']=='Completed' || row['status']== null) ? (<Text style={styles.cell}>
                  {row[column]}
                </Text>):(<Text style={styles.pendingcell}>
                  {row[column]}
                </Text>) }
                
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ))}
      </ScrollView>
      
    </View>
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
    margin:responsiveWidth(1.5),
  },
  pendingcell: {
    fontSize: responsiveFontSize(1.8),
    padding: responsiveWidth(3),
    borderWidth: responsiveWidth(0.5),
    borderColor: 'gray',
    color:'red',
    marginRight: responsiveWidth(0.5),
    //minWidth: responsiveWidth(8),
    height:responsiveWidth(18),
    width:responsiveWidth(35),
    borderRadius: responsiveWidth(3),
    //textAlign: 'center',
  },
  cell: {
    fontSize: responsiveFontSize(1.8),
    padding: responsiveWidth(3),
    borderWidth: responsiveWidth(0.5),
    borderColor: 'gray',
    marginRight: responsiveWidth(0.5),
    //color: 'green',
    //minWidth: responsiveWidth(8),
    height:responsiveWidth(18),
    width:responsiveWidth(35),
    borderRadius: responsiveWidth(3),
    //textAlign: 'center',

  },
  colcell: {
    fontWeight: 'bold',
    color:'white',
    fontSize: responsiveFontSize(2),
    padding: responsiveWidth(2),
    borderWidth: responsiveWidth(0.2),
    marginRight: responsiveWidth(0.5),
    borderColor: 'white',
    backgroundColor:'gray',
    //minWidth: responsiveWidth(20),
    height:responsiveWidth(18),
    width:responsiveWidth(35),
    textAlign: 'center',
    borderRadius: responsiveWidth(5),
  },
});

export default TableView;

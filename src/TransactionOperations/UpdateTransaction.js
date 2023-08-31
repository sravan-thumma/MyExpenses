import React, { useEffect,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text,TextInput, View ,BackHandler, ActivityIndicator,TouchableOpacity,DatePickerAndroid } from 'react-native';
import { Image } from "react-native";
import { API_URL_TRANSACTIONS, axiosConfig } from '../apiconfig';
import AuthenticatedScreenHOC from '../AuthGuard/AuthenticatedScreenHOC';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';


function UpdateTransaction(){
    const route = useRoute();
    var  transactionData  = route.params.transactionData;
    console.log(transactionData);
    const [transaction, setTransaction] = useState(null);
    const navigation=useNavigation();
    const [updatedData, setUpdatedData] = useState(transactionData);

    const handleUpdateSubmit = async () => {
        try {
            console.log("ABC="+updatedData);
            const response = await axios.put(API_URL_TRANSACTIONS+`/${transactionData.id}`,updatedData,axiosConfig);
            const data = await response.data;
            if (data){
                setTransaction(data);
                console.log(data);
            }else{
                console.log(data);
                Alert.alert("Error", data.message);
            }
          }catch(error){
              if (error.response) {
              Alert.alert('Error', 'Server responded with an error.');
              } else if (error.request) {
              console.error('Request:', error.request);
              Alert.alert('Error', 'No response received from the server.');
              } else {
              console.error('Error:', error.message);
              Alert.alert('Error', 'An error occurred while making the request.');
              }
          }
    }

    const showDatePicker = async () => {
        try {
          const { action, year, month, day } = await DatePickerAndroid.open({
            date: new Date(), // You can set the initial date here
          });
          if (action !== DatePickerAndroid.dismissedAction) {
            const selectedDate = new Date(year, month, day);
            setUpdatedData({ ...updatedData, date: selectedDate }); // Update the date in your state
          }
        } catch ({ code, message }) {
          console.warn('Cannot open date picker', message);
        }
      };
      
    return(
        <View style={styles.container}>
            <View style={styles.dataContainer}>
            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.textInput}
                value={updatedData.description}
                onChangeText={(text) => setUpdatedData({ ...updatedData, description: text })}
            />
            <TextInput
                value={updatedData.repayDate}
                placeholder="Select RepayDate"
                onFocus={showDatePicker} // Show the date picker when focused
                style={styles.textInput}
            />


                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.Updatebutton} onPress={handleUpdateSubmit}>
                        <Icon name="check" size={20} color="white" />
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>

      </View>
    );
}
const styles = {
    container: {
      flex: 1,
      backgroundColor:'gray',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    dataContainer: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 20,
      width: '80%',
    },
    fieldContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    fieldName: {
      fontWeight: 'bold',
    },
    fieldValue: {
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
      },
      Updatebutton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
      },
      Deletebutton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        marginLeft: 5,
      },
  };
export default AuthenticatedScreenHOC(UpdateTransaction);
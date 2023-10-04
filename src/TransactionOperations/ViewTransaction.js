import React, { useEffect,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, View ,BackHandler, ActivityIndicator,TouchableOpacity} from 'react-native';
import { Image } from "react-native";
import { axiosConfig,API_URL_TRANSACTIONS } from '../apiconfig';
import AuthenticatedScreenHOC from '../AuthGuard/AuthenticatedScreenHOC';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveWidth } from 'react-native-responsive-dimensions';

function ViewTransaction(){
    const route = useRoute(); 
    var transactionId = route.params.traid;
    const [loading, setLoading] = useState(true);
    const [transaction, setTransaction] = useState(null);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const navigation=useNavigation();
    useEffect(() => {
        getTransactionDetails(transactionId); // Replace with your API call function
      }, [transactionId]);
    

    const getTransactionDetails=async(id)=>{
        try {
          const response = await axios.get(API_URL_TRANSACTIONS+`/${id}`, axiosConfig);
          const data = await response.data;
          if (data){
              setTransaction(data);
              setLoading(false);
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

      const renderDataFields = () => {
        if (!transaction) {
            return null;
        }
        const fields = Object.keys(transaction);
        const filteredFields = fields.filter(field => field !== 'user');
        return filteredFields.map((fields) => {
            const value = transaction[fields];
            if (value === null || value === '') {
              return null;
            }
            return (
                <View key={fields} style={styles.fieldContainer}>
                  <Text style={styles.fieldName}>{fields} :</Text>
                  <Text style={styles.fieldValue}>{typeof value === 'object' ? JSON.stringify(value) : value}</Text>
                </View>
              );
      });
    }
    
    const deleteTransaction=async()=>{
      setButtonDisabled(true);
      try {
        const response = await axios.get(API_URL_TRANSACTIONS+`/delete/${transactionId}`, axiosConfig);
        const data = await response.data;
        if (data){
            console.log(data);
            setLoading(false);
            Alert.alert("Success","Delete Successful");
            navigation.navigate("Home",{ refresh: true });
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

    const handleUpdate = () => {
        console.log('Update button pressed');
        navigation.navigate('UpdateTransaction', { transactionData: transaction });
      };
      
      const handleDelete = () => {
        console.log('Delete button pressed');
        Alert.alert(
          'Confirm Delete Transaction',
          'Are you Sure you want to Delete?',
          [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: async() =>{
              deleteTransaction();

              }
            },
          ],
          { cancelable: false }
        );
      };


    return(
        <View style={styles.container}>
            {loading ? (
            <ActivityIndicator size="large" color="red"/>
            ) : (
            <View style={styles.dataContainer}>
              <Image 
              source={require("../../assets/781902.png")} // Replace with the actual image path
              style={{ width: responsiveWidth(20), height: responsiveWidth(20), padding:15,marginLeft:responsiveWidth(23)}}
              />
            <Text style={{color:"red",fontWeight:'bold',padding:responsiveWidth(1)}}>(-)Debit <Text style={{color:"green"}}>(+)Credit</Text></Text>
              <View>{renderDataFields()}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.Updatebutton} onPress={handleUpdate} disabled={isButtonDisabled}>
                        <Icon name="pencil" size={20} color="white" />
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Deletebutton} onPress={handleDelete} disabled={isButtonDisabled}>
                        <Icon name="trash" size={20} color="white" />
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </View>
            )}
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
export default AuthenticatedScreenHOC(ViewTransaction);
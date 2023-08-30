import React, { useEffect,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, View ,BackHandler} from 'react-native';
import { Image } from "react-native";
import styles from "./style";
import { axiosConfig,API_URL_TRANSACTIONS } from '../apiconfig';
import AuthenticatedScreenHOC from '../AuthGuard/AuthenticatedScreenHOC';
import { ScrollView,FlatList } from 'react-native';
import TableView from './TableView';
import axios from 'axios';



function HomeScreen() {
  const [userId, setUserId] = useState('');
  const [username,setUsername]=useState('');
  const [transactions,setTransactions]=useState('');
  React.useEffect(() => {
    getuserDetails();
    getUserTransactions();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  const getuserDetails = async()=>{
    const userid=await AsyncStorage.getItem('userid');
    const username=await AsyncStorage.getItem('userName');
    setUserId(userid);
    setUsername(username);
  }
  const getUserTransactions=async()=>{
    const userid=await AsyncStorage.getItem('userid');
    try {
      const response = await axios.get(API_URL_TRANSACTIONS+`/userid=${userid}`, axiosConfig);
      const data = await response.data;
      if (data){
          setTransactions(data);
          Alert.alert("Success", "Fetched successful!");
      }else{
          console.log(data);
          Alert.alert("Error", data.message);
      }
  }catch(error){
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
      
      Alert.alert('Error', 'Server responded with an error.');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request:', error.request);
      Alert.alert('Error', 'No response received from the server.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      
      Alert.alert('Error', 'An error occurred while making the request.');
    }
  }
  }
  const handleBackPress = () => {
        Alert.alert(
          'Confirm Exit',
          'Do you want to exit the app?',
          [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true; // Prevent default back action
      }; 
      
      const handleCellPress=(traid)=>{
        Alert.alert("Success",traid);
      }

      const indexcolumns=['id','date','description','repayDate','debitCard','creditCard','borrowedFromMe','borrowedByMe','status']
      const columnnames=['Id','Date','Description','RepayDate','DebitCard','CreditCard','Borrowed From Me','Borrowed By Me','Status']
      
      return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Home Screen</Text>
        {userId && <Text style={styles.text}>User : {username}</Text>}
        {transactions ? (
          <ScrollView horizontal>
            <TableView jsonData={transactions} indexcolumns={indexcolumns} columns={columnnames} onCellPress={(value) => handleCellPress(value)}/>
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
      </View>
      );
}

export default AuthenticatedScreenHOC(HomeScreen);
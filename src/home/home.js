import React, { useEffect,useState,useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useRoute } from '@react-navigation/native';
import { Alert, StyleSheet, Text, View ,BackHandler, Animated, Easing,TouchableOpacity,Modal } from 'react-native';
import { Image } from "react-native";
import styles from "./style";
import { axiosConfig,API_URL_TRANSACTIONS } from '../apiconfig';
import AuthenticatedScreenHOC from '../AuthGuard/AuthenticatedScreenHOC';
import { ScrollView,FlatList } from 'react-native';
import TableView from './TableView';
import axios from 'axios';
import CommonHeader from './CommonHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator } from 'react-native';
import api from '../axiosConfiguration';

function HomeScreen() {
  const [userId, setUserId] = useState('');
  const [username,setUsername]=useState('');
  const [transactions,setTransactions]=useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const route = useRoute(); 
  const navigation=useNavigation();
  var refresh  = route.params;
  React.useEffect(() => {
    getuserDetails();
    getUserTransactions();
    if (refresh) {
      //getUserTransactions();
      console.log('HomeScreen is refreshed');
    }
    //const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    //return () => backHandler.remove();
  }, [refresh]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCreateButton = async() => {
    const userid=await AsyncStorage.getItem('userid');
    navigation.navigate("CreateTransaction",{ userid });
  };

  const getuserDetails = async()=>{
    const userid=await AsyncStorage.getItem('userid');
    const username=await AsyncStorage.getItem('userName');
    setUserId(userid);
    setUsername(username);
  }

/*const getUserTransactions1=async () => {
  setIsLoading(true);
  toggleModal();
  const userid=await AsyncStorage.getItem('userid');
  await api.get(API_URL_TRANSACTIONS+`/userid=${userid}`)
  .then(async response => {
    console.log(response.data);
    const data = await response.data;
    if (data){
        setTransactions(data);
        //Alert.alert("Success", "Fetched successful!");
    }else{
        console.log(data);
        Alert.alert("Error", data.message);
    }
  })
  .catch(error => {
    // Handle errors
    Alert.alert('AxiosError:', error.response.status+error.response.data);
    console.error('AxiosError:', error);
    if (error.response) {
      // Server responded with an error status code (e.g., 4xx, 5xx)
      Alert.alert('AxiosError:', error.response.status+error.response.data);
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request:', error.request);
      Alert.alert('Request:', error.request);
    } else {
      // Something else happened while setting up the request
      console.error('Error Message:', error.message);
      Alert.alert('Error Message:', error.message);
    }
  }).finally(() =>{
      setIsLoading(false); // Loading complete (success or error)
      toggleModal();
  });
}*/

  const getUserTransactions = async() => {
    setIsLoading(true);
    toggleModal();
    const userid=await AsyncStorage.getItem('userid');
    try {
      setTransactions([]);
      const response = await axios.get(API_URL_TRANSACTIONS+`/userid=${userid}`, axiosConfig);
      const data = await response.data;
      if (data){
          setTransactions(data);
          //Alert.alert("Success", "Fetched successful!");
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
      
      Alert.alert('Error', error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request:', error.request);
      Alert.alert('Error', 'No response received from the server.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      
      Alert.alert('Error', 'An error occurred while making the request.');
    }
  }finally {
    setIsLoading(false); // Loading complete (success or error)
    toggleModal();
  }
  }

  const handleBackPress = () => {
        Alert.alert(
          'Confirm Exit',
          'Do you want to exit the app?',
          [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: () =>{ BackHandler.exitApp()} },
          ],
          { cancelable: false }
        );
        return true; // Prevent default back action
      }; 


      
      const handleCellPress=(traid)=>{
        //Alert.alert("Success",traid);
        navigation.navigate("ViewTransaction",{ traid });
        console.log(traid);
      }

      const onRefresh = async() => {
        setRefreshing(true);
        await getUserTransactions();
        setRefreshing(false);
      };

      
      
      const indexcolumns=['id','date','description','repayDate','debitCard','creditCard','borrowedFromMe','borrowedByMe','status']
      const columnnames=['Id','Date','Description','RepayDate','DebitCard','CreditCard','Borrowed From Me','Borrowed By Me','Status']
      //<CommonHeader onRefresh={onRefresh} />
      return (
      <View style={styles.container}>
        {userId && <Text style={styles.text}>Welcome : {username} :**: Id = {userId}</Text>}
        {isLoading ? (
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                toggleModal(); // Close the modal if the user presses back
              }}
            >
              <View style={styles.modalContainer}>
                <ActivityIndicator size="large" color="red" />
              </View>
            </Modal>
          ) : (
            <ScrollView horizontal>
              <TableView jsonData={transactions} indexcolumns={indexcolumns} columns={columnnames} onCellPress={handleCellPress} IsUsers={false} />
            </ScrollView>
          )}
            <TouchableOpacity onPress={onRefresh} style={styles.floatingRefreshButton}>
              <Icon name="refresh" size={20} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateButton} style={styles.floatingPlusButton}>
                <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>

      </View>
      );
}

export default AuthenticatedScreenHOC(HomeScreen);
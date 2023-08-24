import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, Text, View ,BackHandler} from 'react-native';
import { Image } from "react-native";
import styles from "./style";
import { API_HEADERS,API_URL_TRANSACTIONS } from '../apiconfig';


const transactionsview = async ({data}) => {
 console.log(data)
}

export default function HomeScreen() {
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
      
    React.useEffect(() => {
        checkLoginStatus();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backHandler.remove();
      }, []);

    const navigation = useNavigation();
    const checkLoginStatus = async () => {
      try{
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        const user=await AsyncStorage.getItem('userData');
        if (isLoggedIn !== 'false') {
          console.log(isLoggedIn);
          Alert.alert("Login Successful");
          const userData = JSON.parse(user);
          console.log(user);
          if(userData.id>0){
            try {
              const response = await fetch(API_URL_TRANSACTIONS+`userid=${userData.id}`, {
              method: 'GET',API_HEADERS,
              });
              const data = await response.json();
              if(data !==null){
                  await transactionsview(JSON.stringify(data));
              }
            }catch(error){
              console.error("Error:", error);
              Alert.alert("Error", "Server Not Available.");
            }
          }
        }else{
            navigation.navigate("Login");
        }
      }catch(error){
        console.log(error);
      }
    };
}
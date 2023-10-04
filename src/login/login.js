import React, { Component } from "react";
import { Image } from "react-native";
import styles from "./style";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  BackHandler,
} from "react-native";
import { Button, SocialIcon, colors } from "react-native-elements";
import { useState } from "react";
import { API_URL_USERS,axiosConfig,API_HEADERS } from "../apiconfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthGuard/AuthContext";
import axios from 'axios';
import api from "../axiosConfiguration";
import {TouchableOpacity } from "react-native";
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigation = useNavigation();
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
    //const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    //return () => backHandler.remove();
  }, []);

/*const onLoginPress1 = async () =>{
  if (!username || !password) {
    Alert.alert("Error", "Both username and password are required.");
    return;
  }
  await api.get(API_URL_USERS + `/userlogin/${username}&${password}`)
  .then(async response => {
    console.log(response.data);
    const data = response.data;
        if (data.id > 0) {
            console.log(data);
            await AsyncStorage.setItem('userid', String(data.id));
            await AsyncStorage.setItem('userName', data.username);
            await AsyncStorage.setItem('role', data.role);
            Alert.alert("Success", "Authentication successful!");
            await login();
            await AsyncStorage.setItem('isLoggedIn', 'true');
        } else {
            console.log("Data:" + data);
            Alert.alert("Error", data.message);
        }
  })
  .catch(error => {
    // Handle errors
    Alert.alert('AxiosError:', error);
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
      console.log("Finally");
  });
}*/

const handleCreateUser = async () => {
  navigation.navigate("CreateUser");
}

const onLoginPress = async () => {
    if (!username || !password) {
        Alert.alert("Error", "Both username and password are required.");
        return;
    }
    const options = {
        method: 'GET',
        url: API_URL_USERS + `/userlogin/${username}&${password}`,
        headers: API_HEADERS,
        withCredentials: true,
    };

    try {
        const response = await axios.request(options);
        console.log(options.url);
        const data = response.data;
        if (data.id > 0) {
            console.log(data);
            await AsyncStorage.setItem('userid', String(data.id));
            await AsyncStorage.setItem('userName', data.username);
            await AsyncStorage.setItem('role', data.role);
            Alert.alert("Success", "Authentication successful!");
            await AsyncStorage.setItem('isLoggedIn', 'true');
            await login();
        } else {
            console.log("Data:" + data);
            Alert.alert("Error", data.message);
        }
    } catch (error) {
      console.log(error);
      Alert.alert('Error',error);
        if (error.response) {
            console.log(error);
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

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Image source={require('../../assets/781831.png')} style={{width: 120, height: 120,position:'relative',margin:10}} />
            <Text style={styles.logoText}>Home Network</Text>
            <TextInput
              placeholder="Username"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => onLoginPress()}
              title="Login"
            />
             <Button
              buttonStyle={styles.createButton}
              onPress={() => handleCreateUser()}
              title="Create User"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

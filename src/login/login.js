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
import { API_URL_USERS,axiosConfig } from "../apiconfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthGuard/AuthContext";
import axios from 'axios';


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
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  onLoginPress = async () => {
    if (!username || !password) {
        Alert.alert("Error", "Both username and password are required.");
        return;
    }
    try {
        const response = await axios.get(API_URL_USERS+`/userlogin/${username}&${password}`, axiosConfig);
        const data = await response.data;
        if (data.id>0){
            console.log(data);
            await AsyncStorage.setItem('userid', String(data.id));
            await AsyncStorage.setItem('userName',data.username);
            await AsyncStorage.setItem('role',data.role);
            Alert.alert("Success", "Authentication successful!");
            login();
            AsyncStorage.setItem('isLoggedIn', 'true');
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
  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
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
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

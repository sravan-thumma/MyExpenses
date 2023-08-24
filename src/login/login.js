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
import { API_URL_USERS,API_HEADERS } from "../apiconfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";


export default function LoginScreen(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        const response = await fetch(API_URL_USERS+`/userlogin/${username}&${password}`, {
        method: 'GET',API_HEADERS,
      });
        const data = await response.json();
        if (data.id>0){
            console.log(data);
            await AsyncStorage.setItem('userData', JSON.stringify(data));
            await AsyncStorage.setItem('isLoggedIn', 'true');
            Alert.alert("Success", "Authentication successful!");
            navigation.navigate("Home");
            
        }else{
            console.log(data);
            Alert.alert("Error", data.message);
        }
    }catch(error){
        console.error("Error:", error);
        Alert.alert("Error", "Server Not Available.");
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

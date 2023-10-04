import React, { Component } from "react";
import { Image } from "react-native";
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
import { API_URL_USERS,axiosConfig,API_HEADERS,Post_User } from "../apiconfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthGuard/AuthContext";
import axios from 'axios';
import api from "../axiosConfiguration";
import {TouchableOpacity } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { CommonActions } from '@react-navigation/native';

export default function CreateUser(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [updatedData, setUpdatedData] = useState(Post_User());
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

const handleLoginUser = async () => {
    navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Guard' }],
        })
      );
}

const onCreateSubmit = async () => {
    if (!username || !password || !email) {
        Alert.alert("Error", "All username,password,email are required.");
        return;
    }
    setButtonDisabled(true);
    const options = {
        method: 'POST',
        url: API_URL_USERS+'/users',
        headers: API_HEADERS,
        data: updatedData
    };
    console.log(updatedData);
          await axios.request(options).then(function (response) {
            const data = response.data;
            if(data){
              Alert.alert("Success","Create User Successful");
              handleLoginUser();
          }else{
              console.log("Data:"+data);
              Alert.alert("Error", data.message);
          }
          }).catch(function (error) {
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
          });
    
}

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Image source={require('../../assets/781902.png')} style={{width: 120, height: 120,position:'relative',margin:10}} />
            <Text style={styles.logoText}>Create Account</Text>
            <TextInput
              placeholder="Email"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(text) => {
                setEmail(text)
                setUpdatedData({...updatedData,email:text})}}
            />
            <TextInput
              placeholder="Username"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(text) => {
                setUsername(text)
                setUpdatedData({...updatedData,username:text})}}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text)
                setUpdatedData({...updatedData,password:text})}}
            />
             <Button
              buttonStyle={styles.createButton}
              onPress={() => onCreateSubmit()}
              disabled={isButtonDisabled}
              title="Create User"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = {
    containerView: {
        flex: 1,
        alignItems: "center",
      },
      loginScreenContainer: {
        flex: 1,
      },
      logoText: {
        fontSize: responsiveFontSize(4),
        fontWeight: "500",
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        textAlign: "center",
      },
      loginFormView: {
        flex: 1,
        color:"#eaeaea",
        justifyContent: 'center', 
        alignItems: 'center'
      },
      loginFormTextInput: {
        height: responsiveWidth(12),
        fontSize: responsiveFontSize(2.5),
        borderRadius: responsiveWidth(10),
        borderWidth: 1,
        borderColor: "#eaeaea",
        backgroundColor: "#fafafa",
        padding: responsiveWidth(2.5),
        paddingLeft: responsiveWidth(5),
        marginTop: responsiveWidth(1.5),
        marginBottom: responsiveWidth(1.5),
        width: responsiveWidth(90),
        alignSelf: "center",
      },
      loginButton: {
        backgroundColor: "#3897f1",
        borderRadius: responsiveWidth(10),
        height: responsiveWidth(12),
        marginTop: responsiveWidth(2.5),
        padding: responsiveWidth(1),
        width: responsiveWidth(30),
        alignItems: "center",
        alignSelf: "center",
      },
      createButton: {
        backgroundColor: "green",
        borderRadius: responsiveWidth(10),
        height: responsiveWidth(12),
        marginTop: responsiveWidth(2.5),
        padding: responsiveWidth(1),
        width: responsiveWidth(30),
        alignItems: "center",
        alignSelf: "center",
      },
} 
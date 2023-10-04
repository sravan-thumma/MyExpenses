import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import {Alert,TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import AuthenticatedScreenHOC from './AuthenticatedScreenHOC';
import styles from '../login/style';
import { useAuth } from './AuthContext';
import { responsiveScreenHeight,responsiveFontSize,responsiveScreenWidth } from 'react-native-responsive-dimensions';

function GuardScreen() {
  const [biometricAuthenticated, setBiometricAuthenticated] = useState(false);
  const [status,setStatus] = useState(false);
  const navigation=useNavigation();
  const { logout } = useAuth();
  const [username,setUsername] = useState(null);
  const { isLoggedIn } = useAuth();

  const loginPage = async() =>{
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  }

  const authenticateWithBiometrics = async () => {
    const hasBiometrics = await LocalAuthentication.hasHardwareAsync();
    if (hasBiometrics) {
      const isBiometricEnabled = await LocalAuthentication.isEnrolledAsync();

      if (isBiometricEnabled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with your biometrics',
          //disableDeviceFallback:true,
          //cancelLabel: 'Cancel'
        });

        if (result.success) {
          // Biometric authentication succeeded
          setBiometricAuthenticated(true);
          await AsyncStorage.setItem('biometricAuthenticated', 'true');
          console.log("Success");
          //navigation.navigate("Home",{ refresh: true });
          loginPage();
          //navigation.navigate('Home'); // Navigate to your main content
        } else {
            console.log("Failed");
          // Biometric authentication failed
          //BackHandler.exitApp(); // Exit the app on failure
        }
      } else {
        return Alert.alert(
          'Biometric record not found',
          'Please verify your identity with your password',
          'OK',
          () => fallBackToDefaultAuth()
        // Biometrics is not enabled on the device
        // Handle this case, e.g., by providing a different authentication method
      )}
    } else { 
      await AsyncStorage.removeItem('userid');
      await AsyncStorage.removeItem('isLoggedIn');
      logout();
      /*navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );*/
      // Biometrics hardware is not available on the device
      // Handle this case, e.g., by providing a different authentication method
    }
  };

  const Status = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        return true;
      } else {
        return false;
      }
  }

  const setBioMetric = async () => {
    setBiometricAuthenticated(true);
    await  AsyncStorage.setItem('biometricAuthenticated', 'true');
  }

React.useEffect(() => {
    const getUsername= async ()=> {
      if(await AsyncStorage.getItem('role') === 'Admin'){
        setUsername('Sravan');
      }else{
      setUsername(await AsyncStorage.getItem('userName'));
      }
    }
    getUsername();
    checkBiometricAuthentication();
    //authenticateWithBiometrics();
}, []);

const handleLogout = async () => {
  if(isLoggedIn){
  Alert.alert(
      'Confirm Logout',
      'Are you Sure you want to Logout?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: async() =>{
          logout();
          await AsyncStorage.removeItem('userid');
          await AsyncStorage.removeItem('isLoggedIn');
          
          }
        },
      ],
      { cancelable: false }
    );
  }else{
  }
};

  const checkBiometricAuthentication = async () => {
    const authenticated = await AsyncStorage.getItem('biometricAuthenticated');
    if (authenticated === 'true') {
      setBiometricAuthenticated(true);
      //loginPage();
      //navigation.navigate('Home'); // Navigate to your main content
    } else {
      //setBiometricAuthenticated(false);
      if(status){
        authenticateWithBiometrics();
      }
    }
  };

/*<TouchableOpacity 
        style={{
          position: 'relative',
          //margin:50,
          flex: 1,
          left: 0,
          right: 0,
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'white',
        }}
         onPress={handleLogin}>
          <Text style={{color:"green",fontWeight:"bold",fontSize:20}}>Login with Username & Password</Text>
  </TouchableOpacity>*/

  return (
    <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}> 
        <Image source={require('../../assets/781831.png')} style={{width: 200, height: 200 , margin:80,marginTop:150,marginBottom:10}} />
        <Text style={styles.logoText}>Home Network</Text>
        <TouchableOpacity style={{
          position: 'relative',
          //margin:50,
          flex: 1,
          left: 0,
          right: 0,
          alignItems: 'center',
          padding: 10,
          marginBottom:50,
          backgroundColor: 'white',
        }} onPress={authenticateWithBiometrics}>
                <Icon name="fingerprint" size={80} color="green" />
                <Text style={{color:"green",fontWeight:"bold",fontSize:20}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={{
          position: 'relative',
          //margin:50,
          flex: 1,
          left: 0,
          right: 0,
          alignItems: 'center',
          padding: 10,
          marginBottom:20,
          backgroundColor: 'white',
        }}
         onPress={handleLogout}>
          {username ? (
            <Text style={{color:"red",fontWeight:"bold",fontSize:20}}>Logout ? {username}</Text>
          ):(<Text></Text>)}
  </TouchableOpacity>
        <Text style={{ marginTop: 20, fontSize: 14,fontWeight:'bold' }}>Version 2.1.3</Text>
        <Text style={{ fontSize: 12, color: 'gray',marginBottom:10 }}>© 2023 Sravan</Text>
  
    </View>
  );
}

export default AuthenticatedScreenHOC(GuardScreen);


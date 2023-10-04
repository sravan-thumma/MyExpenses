import { View,Text,Alert,TouchableOpacity,Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { useAuth } from "../AuthGuard/AuthContext";
import { API_URL_USERS,axiosConfig } from "../apiconfig";
import axios from "axios";
import React, { useEffect,useState,useRef } from 'react';
import {ScrollView} from "react-native";
import TableView from "../home/TableView";
import AuthenticatedScreenHOC from '../AuthGuard/AuthenticatedScreenHOC';

function LogoutScreen(){
  const { logout } = useAuth();
  const { isLoggedIn } = useAuth();
  const navigation=useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  var role;
  const [users,setUsers] = useState(null);
  React.useEffect(() => {
    if(isLoggedIn){
      getallUsers();
    }
  }, [isLoggedIn]);
 
  async function handleLogin(id,username){
    console.log(id);
    await AsyncStorage.setItem('userid', String(id));
    await AsyncStorage.setItem('userName', username);
    console.log(username);
    navigation.navigate("Home",{ refresh: true });
  }

  const loginPage = async() =>{
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  }

  const getallUsers = async () => {
    role=await AsyncStorage.getItem('role');
    console.log(role);
    if(role==='Admin'){
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL_USERS+`/users`, axiosConfig);
        const data = await response.data;
        if (data){
          setUsers(data);
          //Alert.alert("Success", "Fetched successful!");
        }else{
          console.log(data);
          Alert.alert("Error", data.message);
      }
        /*if (Array.isArray(data)) {
          data.forEach((user) => {
            if (user.id>0){
                users.push({ id: user.id, username: user.username });
            }else{
                console.log(data);
                Alert.alert("Error", data.message);
            }
          });
        }*/
        setIsLoading(false);
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
    }else{
      console.log('AB');
    }
  }

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
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Guard' }],
              })
            );
            }
          },
        ],
        { cancelable: false }
      );
    }else{
    }
  };


  const indexcolumns=['id','username']
  const columnnames=['Id','Username']
      
    return (
        <View style={{alignContent:"center",flex: 1}}>
          {isLoading ? (
         <Text></Text>
       ):(
        <ScrollView horizontal style={{marginTop:150,margin:50}}>
              <TableView jsonData={users} indexcolumns={indexcolumns} columns={columnnames} onCellPress={handleLogin} IsUsers={true} />
        </ScrollView>
       )}
      {isLoggedIn ? (
        <TouchableOpacity style={{
          position: 'absolute',
          margin:50,
          flex: 1,
          left: 0,
          right: 0,
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'white',
          borderWidth:2
        }} onPress={ handleLogout}>
                <Icon name="shield-lock" size={40} color="black">
                
                </Icon>
                <Text style={{color:"black",fontWeight:"bold",fontSize:15}}> Logout </Text>
            </TouchableOpacity>
          ):(
            <TouchableOpacity style={{
              position: 'absolute',
              margin:50,
              flex: 1,
              left: 0,
              right: 0,
              alignItems: 'center',
              padding: 10,
              backgroundColor: 'lightgray',
            }} onPress={ loginPage }>
                    <Icon name="check" size={20} color="green" />
                    <Text style={{color:"green",fontWeight:"bold"}} >Login</Text>
                </TouchableOpacity>
          )}
        </View>
    );
}
export default AuthenticatedScreenHOC(LogoutScreen);
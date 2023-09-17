import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View,TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./home/home";
import LoginScreen from "./login/login";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import HeaderStyles from "./HeaderStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "./AuthGuard/AuthContext";
import AuthenticatedScreenHOC from "./AuthGuard/AuthenticatedScreenHOC";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ViewTransaction from "./TransactionOperations/ViewTransaction";
import UpdateTransaction from "./TransactionOperations/UpdateTransaction";
import CreateTransaction from "./TransactionOperations/CreateTransaction";
import LogoutScreen from "./login/logout";

const Stack = createStackNavigator();

const CustomHeader = () => {
    const navigation=useNavigation();
    const handlemenu = () => {
      navigation.navigate('Logout');
    };
    return (
      <View style={HeaderStyles.headerContainerMain}>
        <View style={HeaderStyles.headerContainer}>
          <TouchableOpacity onPress={handlemenu}>
            <Image source={require("../assets/menu-icon.png")} style={{ marginTop:responsiveWidth(3), width: responsiveWidth(15), height: responsiveWidth(10) }}></Image>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/781831.png")} // Replace with the actual image path
          style={{ width: responsiveWidth(20), height: responsiveWidth(20), padding:15}}
        />
      </View>
    );
  };

  const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerLeft: null }} />
          <Stack.Screen name="ViewTransaction" component={ViewTransaction} options={{headerShown:true}}  />
          <Stack.Screen name="UpdateTransaction" component={UpdateTransaction} options={{headerShown:true}} />
          <Stack.Screen name="CreateTransaction" component={CreateTransaction} options={{ headerLeft: null }} />
    </Stack.Navigator>
  );
export default function HeaderNav() {

    return (
        <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeft: null,
        header: () => <CustomHeader />, // Render CustomHeader as the header
      }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        headerLeft: null,
        //header: () => <CustomHeader />, // Render CustomHeader as the header
      }}
    />
    
    <Stack.Screen
      name="ViewTransaction"
      component={ViewTransaction}
      options={{
        headerShown: true,
        //header: () => <CustomHeader />, // Render CustomHeader as the header
      }}
    />
    <Stack.Screen
      name="UpdateTransaction"
      component={UpdateTransaction}
      options={{
        headerShown: true,
        //header: () => <CustomHeader />, // Render CustomHeader as the header
      }}
    />
    <Stack.Screen
      name="CreateTransaction"
      component={CreateTransaction}
      options={{
        //headerLeft: null,
        //header: () => <CustomHeader />, // Render CustomHeader as the header
      }}
    />
    <Stack.Screen
      name="Logout"
      component={LogoutScreen}
      options={{
        //headerLeft: null,
        //header: () => <CustomHeader />, // Render CustomHeader as the header
      }}
    />
  </Stack.Navigator>
    );
  }
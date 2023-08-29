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
import Drawerstyles from "./drawerstyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAuth } from "./AuthGuard/AuthContext";
import AuthenticatedScreenHOC from "./AuthGuard/AuthenticatedScreenHOC";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const onLogout = async () => {
    //await AsyncStorage.setItem('userData', JSON.stringify(data));
    await AsyncStorage.setItem('isLoggedIn', 'false');
    //await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('userData')
    Alert.alert("Logged Out");
    //navigation.navigate("Login");

}



const CustomHeader = () => {
  const navigation=useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={Drawerstyles.headerContainerMain}>

      <View style={Drawerstyles.headerContainer}>
        <TouchableOpacity onPress={openDrawer}>
          <Image source={require("../assets/menu-icon.png")} style={{ width: 80, height: 80 }}></Image>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../assets/favicon.png")} // Replace with the actual image path
        style={{ width: 80, height: 80 }}
      />
    </View>
  );
};

function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Article Screen</Text>
    </View>
  );
}

function Logout() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false,headerLeft: () => null}}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerLeft: null }} />
    </Stack.Navigator>
  );

function CustomDrawerContent(props) {
  const { logout } = useAuth();
  const { isLoggedIn } = useAuth();
  const handleLogout = async () => {
    console.log(isLoggedIn);
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
      props.navigation.closeDrawer();
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20 }}>
        {/* Place your logo or text here */}
        <Image
          source={require("../assets/favicon.png")}
          style={{ width: 80, height: 80 }}
        />
        <Text>Home Network</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert("Link to help")} />
      <DrawerItem
        label={isLoggedIn ? "Logout":"Login"}
        onPress={() => handleLogout()}
      />
    </DrawerContentScrollView>
  );
}


export default function DrawerScreen() {
  return (
    <Drawer.Navigator initialRouteName="Drawer" detachInactiveScreens={false}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
        <Drawer.Screen
          name="Drawer"
          component={HomeStack}
          options={{title:'Home',
            header: () => <CustomHeader/>,
          }}
        />
      
    </Drawer.Navigator>
  );
}

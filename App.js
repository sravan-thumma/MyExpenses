import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/login/login';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/home/home';
import DrawerScreen from './src/drawer';
import { AuthProvider } from './src/AuthGuard/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function HomeTabs() {
  return (
    <Tab.Navigator>
      {/* Define your tab screens here */}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Home1" component={Home} />
      <Tab.Screen name="Home2" component={Home} />
      <Tab.Screen name="Home3" component={Home} />
      {/* ... Other tab screens */}
    </Tab.Navigator>
  );
}



export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <DrawerScreen/><StatusBar style="dark" translucent/>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

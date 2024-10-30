import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Dashboard from './screens/Dashboard';
import Data from './screens/Data';
import Airtime from './screens/Airtime';
import FundWallet from './screens/FundWallet';
import AdminDashboard from './screens/AdminDashboard';
import Landing from './screens/Landing';
import Databundles from './screens/Databundles';
import Profile from './screens/Profile';
import AddBundle from './screens/AddBundle';
import EditBundle from './screens/EditBundle';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
 <NavigationContainer>
  <Stack.Navigator initialRouteName={'Landing'} screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Data" component={Data} />
    <Stack.Screen name="Airtime" component={Airtime} />
    <Stack.Screen name="FundWallet" component={FundWallet} />
    <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    <Stack.Screen name="Landing" component={Landing}/>
    <Stack.Screen name = "Databundles" component={Databundles} />
    <Stack.Screen name = "Profile" component={Profile} />
    <Stack.Screen name = "AddBundle" component={AddBundle} />
    <Stack.Screen name = "EditBundle" component={EditBundle} />
  </Stack.Navigator>
 </NavigationContainer>
  );
}


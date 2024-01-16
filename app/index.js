import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import BottomNavigation from '../navigation/BottomNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Onboarding/LoginScreen';
import SignupScreen from '../screens/Onboarding/SignupScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../firebaseconfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

const LoggedInStack = createStackNavigator(); 

const loggedInScreens = () => {
  return (
  <View style={{flex: 1}}>
    <BottomNavigation></BottomNavigation>
  </View>)
}

const onboarding = () => {
  return(
  <NavigationContainer independent={true}>
    <Stack.Navigator 
      initialRouteName='Login'
      screenOptions={{
        headerTransparent: true,
        headerTitle: "", 
        headerTintColor: 'white',
        headerBackTitleVisible: false,
        headerStyle: {backgroundColor: 'transparent'},
        headerBackImage: () => <MaterialCommunityIcons style={{marginLeft: 10}}color='#fff' name='keyboard-backspace' size={45}/>}}>
      <Stack.Screen name="LoginPage" component={LoginScreen} />
      <Stack.Screen name="SignupPage" component={SignupScreen} />
      <Stack.Screen name = "HomePage" component={BottomNavigation}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
export default function App() {

  const [user, setUser] = useState(null);
  useEffect( () => {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
        setUser(user);
      })
  },[])
  return loggedInScreens();
  //return (user ? loggedInScreens() : onboarding());
}


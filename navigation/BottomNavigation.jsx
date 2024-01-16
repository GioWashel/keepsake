import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CameraScreen from '../screens/Camera/CameraScreen';
import GalleryScreen from '../screens/Gallery/GalleryScreen';
import EventScreen from '../screens/Events/EventScreen';
import Colors from '../constants/Colors';


const Tab = createMaterialTopTabNavigator();

const BottomNavigation = ({navigation, userID}) =>  {
  return (
      <Tab.Navigator 
      initialRouteName="EventScreen"
      tabBarPosition='bottom'
      style = {{borderTopLeftRadius: 10}}
      screenOptions={{
        tabBarActiveTintColor: Colors.red,
        tabBarInactiveTintColor: '#FFF',
        tabBarShowLabel: false,
        tabBarContentContainerStyle: {backgroundColor: Colors.darkgrey}
      }}>
      <Tab.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          headerTransparent: true,
          tabBarLabel: 'Events',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="calendar-month" color={color} size={25} />
          )}}/>
      <Tab.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          headerShown: false,
          lazy: true,
          
          tabBarLabel: 'Camera',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={25} />
          )}}/>
      <Tab.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={{
          tabBarLabel: 'Gallery',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="image" color={color} size={25} />
          )}}/>
    </Tab.Navigator>
  );
}
export default BottomNavigation; 
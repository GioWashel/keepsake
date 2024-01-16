import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ImageGallery from './components/ImageGallery';
import DateScreen from './DateScreen';
const GalleryScreen = () => {   
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName='ImageGallery' screenOptions={{headerTransparent: true, headerLeftLabelVisible: false, headerTitle: ''}}>
            <Stack.Screen name='ImageGallery' component={ImageGallery} ></Stack.Screen>
            <Stack.Screen name='DateScreen'component={DateScreen}  options={({ route }) => ({name: route.params.name ? route.params.name : 'Null Name'})}></Stack.Screen>
        </Stack.Navigator>
    );    
};
export default GalleryScreen;
const styles = StyleSheet.create(
    {
        text: {
            fontSize: 50,
            alignSelf: 'center',
            backfaceVisibility: false,
        }
    }
)


import * as React from 'react';
import {View, Text} from 'react-native';
import Colors from '../../constants/Colors';

 const EventScreen = ({navigation, route}) => {
    const name = route.params ? route.params.email : 'name';
    return(
    <View style={{flex: 1, backgroundColor: Colors.red}}>
        <Text>This is the event screen! + {name}</Text>
    </View>);
 }
 export default EventScreen;
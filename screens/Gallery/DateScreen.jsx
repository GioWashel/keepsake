import React, { cloneElement } from 'react';
import {Text, View} from 'react-native';
import Colors from '../../constants/Colors';


const DateScreen = ({navigation, route}) => {
    return(
    <View style={{flex: 1, backgroundColor: Colors.red}}>
        <Text style={{fontSize: 50, alignSelf: 'center'}}>
            Hello from 
            <Text>{route.params.name}</Text>
        </Text>
    </View>);
}

export default DateScreen; 
import {View, Text, StyleSheet, TextInput, ActivityIndicator, Button, Pressable, Keyboard, TouchableWithoutFeedback} from 'react-native'
import {React, useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Colors from '../../constants/Colors';
import { FIREBASE_AUTH } from '../../firebaseconfig';

const SignupScreen = ({navigation}) => {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false); 
    const auth = FIREBASE_AUTH;


    const signUp = async () => {
        setLoading(true);
        try {
            if(passwordsMatch) {
                const response = await createUserWithEmailAndPassword(auth, email, password); 
                navigation.navigate("EventPage", {email: response.user.email});
            }
        }
        catch(error) {
            alert("Error:" + error);
        }
        finally {
            setLoading(false);
        }
    }
    const passwordsMatch = () => {
        return password === confirmPassword
    }
    return(
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accesible={false} > 
                <View style={styles.container} behavior='height'>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Create An Account</Text>
                    <TextInput placeholderTextColor={Colors.darkgrey} style={styles.input} keyboardType='email-address' placeholder='Email' onChangeText={(text) => setEmail(text)} autoCapitalize='none'></TextInput>
                    <TextInput placeholderTextColor={Colors.darkgrey} style ={styles.input} secureTextEntry={true} value={password} placeholder='Password' onChangeText={(text) => setPassword(text)} autoCapitalize='none'></TextInput>
                    <TextInput placeholderTextColor={Colors.darkgrey} style ={styles.input} secureTextEntry={true} value={confirmPassword} placeholder='Enter Password Again' onChangeText={(text) => setConfirmPassword(text)} autoCapitalize='none'></TextInput>
                    {loading ? <ActivityIndicator size='large'color={Colors.periwinkle} ></ActivityIndicator> 
                    : <>
                    <Pressable style={styles.login} title='Submit' onPress={signUp}><Text style={styles.buttonText}>Login</Text></Pressable>
                    </>}
                </View>
            </TouchableWithoutFeedback>
            );
        
};
export default SignupScreen; 




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.red,
    },
    input: {
        height: 60,
        width: '80%',
        margin: 10,
        padding: 10,
        borderWidth: 1, 
        borderRadius: 7,
        borderColor: 'grey',
        backgroundColor: '#fff',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#fff'
        },
    login: {
        marginTop: 10,
        width: '80%',
        height: 60,
        borderColor: Colors.darkgrey,
        borderRadius: 7,
        backgroundColor: Colors.green,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        alignItems: 'center',
        justifyContent: 'center',


    },
    signUp: {
    }

});
import {View, Text, StyleSheet, TextInput, ActivityIndicator, Button, Pressable, Keyboard, TouchableWithoutFeedback} from 'react-native'
import React , {useState} from 'react';
import { FIREBASE_AUTH } from '../../firebaseconfig';
import Colors from '../../constants/Colors';
import {signInWithEmailAndPassword } from 'firebase/auth';




const LoginScreen = ({navigation}) => {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); 
    const auth = FIREBASE_AUTH;


    

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('HomePage', {email: response.user.email});
        }
        catch(error) {     
            alert("Sign in failed:" + error);
        }
        finally {
            setLoading(false);
        }
    }

    return(
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accesible={false} > 
        
                <View style={styles.container} behavior='height'>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Welcome!</Text>
                    <Text style={{fontWeight: '600'}}>sign in or create an account </Text>
                    <TextInput placeholderTextColor={Colors.darkgrey} style={styles.input} keyboardType='email-address' placeholder='Email' onChangeText={(text) => setEmail(text)} autoCapitalize='none'></TextInput>
                    <TextInput placeholderTextColor={Colors.darkgrey} style ={styles.input} secureTextEntry={true} value={password} placeholder='Password' onChangeText={(text) => setPassword(text)} autoCapitalize='none'></TextInput>
                    {loading ? <ActivityIndicator size='large'color={Colors.periwinkle} ></ActivityIndicator> 
                    : <>
                    <Pressable style={styles.login} title='Login' onPress={signIn}><Text style={styles.buttonText}>Login</Text></Pressable>
                    <Button style={styles.signUp}title='Create Account' onPress={() => navigation.navigate('SignupPage')}></Button>
                    </>}
                </View>
            </TouchableWithoutFeedback>
            );
        
};
export default LoginScreen; 




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
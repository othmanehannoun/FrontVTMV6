import React, {useState, useEffect} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from '../screens/login';
import SinupScreen from '../screens/sinupScreen';
import VerifiyAccount from '../screens/verifiyAccount';

const Stack = createStackNavigator();


const AuthNavigator = () => {
    const [register, setRegister] = useState(false)
    const [loading, setLoading] = useState(false)

const getDataFromStorage = async () => {

    try {
      const jsonValue = await AsyncStorage.getItem("UserVerify");
      if(jsonValue != null){
        // const json = await JSON.parse(jsonValue)
            await setRegister(true)
            setLoading(true)
      }
      else{
        await setRegister(false)
        setLoading(true)
        
      }
    // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

    useEffect(()=>{
        getDataFromStorage()
    },[register])
    
    return (
        !loading ? 
        null
        :
        <Stack.Navigator initialRouteName={register ? 'verifiyAccount' : 'Login'}
           screenOptions={{headerShown: false}} >

            <Stack.Screen name="verifiyAccount" component={VerifiyAccount} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={SinupScreen} />
         
        </Stack.Navigator> 
    )
}

export default AuthNavigator






























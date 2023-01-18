import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";


import Login from '../screens/login';
import SinupScreen from '../screens/sinupScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator 
        screenOptions={{headerShown: false}} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={SinupScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator
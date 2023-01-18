import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Login from '../screens/login';
import SinupScreen from '../screens/sinupScreen';
import TestReduxApp from '../screens/testReduxApp';
import SpalshScreen from '../screens/SpalshScreen';
import DrowerNavigator from './DrawerNavigator';
import Menu from '../components/Menu';
import ProductsScreen from '../screens/ProductsScreen';
import CommandeScreen from '../screens/CommandeScreen';
import MenuScreen from '../screens/MenuScreen';
import DetailsProducts from '../screens/DetailsProducts';
import CartScreen from '../screens/CartScreen';
import OrderConfirmation from '../screens/OrderConfirmation';
import {useDispatch, useSelector } from 'react-redux';
import {addToken} from '../Redux/Slices/UserSlice'
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddBeneficiary from '../components/AddBeneficiary';

const Stack = createStackNavigator()


const AppNavigator = () =>{
 
  // const getData22 = async(state) => {
  //   try {
  //   const data = await AsyncStorage.getItem("user");
  //   if (data !== null) {
  //       dispatch(getData(data))
  //       // return data
  //   }
  //   console.log('Ach tam:', isLoggedIn)
  //   } catch (error) {
  //   console.log('ERROR', error);
  //   }
  // }



  // const [isLogin, setLigin] = useState(true)
  return (
    
      // <NavigationContainer>
        <Stack.Navigator initialRouteName = {'main'}
          screenOptions={{headerShown: false}}>
            {/* <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={SinupScreen} /> */}
            {/* <Stack.Screen name="splashScreen" component={SpalshScreen} /> */}
            {/* <Stack.Screen name="product" component={ProductsScreen} />
            <Stack.Screen name="commande" component={CommandeScreen} /> */}
            <Stack.Screen name="addBeneficiary" component={AddBeneficiary} />
            <Stack.Screen name="cart" component={CartScreen} />
            <Stack.Screen name="details" component={DetailsProducts} />
            <Stack.Screen name="confimerOrder" component={OrderConfirmation} />
            <Stack.Screen name="redudxApp" component={TestReduxApp} />
            <Stack.Screen name="main" component={DrowerNavigator} />
      </Stack.Navigator>
      // </NavigationContainer>
  );
}


export default AppNavigator
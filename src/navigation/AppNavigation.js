import React, {useEffect} from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { 
  createStackNavigator, 
  TransitionSpecs, 
} from "@react-navigation/stack";

// import Login from '../screens/login';
// import SinupScreen from '../screens/sinupScreen';
// import SpalshScreen from '../screens/SpalshScreen';
// import Menu from '../components/Menu';
// import ProductsScreen from '../screens/ProductsScreen';
// import CommandeScreen from '../screens/CommandeScreen';
// import MenuScreen from '../screens/MenuScreen';
// import {addToken} from '../Redux/Slices/UserSlice'
// import AsyncStorage from "@react-native-async-storage/async-storage";

import {useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import { logout } from '../Redux/Slices/UserSlice'


import TestReduxApp from '../screens/testReduxApp';
import DrowerNavigator from './DrawerNavigator';
import DetailsProducts from '../screens/DetailsProducts';
import CartScreen from '../screens/CartScreen';
import OrderConfirmation from '../screens/OrderConfirmation';

import AddBeneficiary from '../components/AddBeneficiary';
import PayWith from '../screens/PayWith';
import SuccessPage from '../screens/SuccessPage';

const Stack = createStackNavigator()

const customTransition = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            })
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["180deg", "0deg"],
            }),
          },
          {
            scale: next ?
              next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7],
              }) : 1,
          }
        ]
      },
      opacity: current.opacity,
    }
  }
}


const AppNavigator = () =>{

  const {user, isLoggedIn} = useSelector(state=>state.user)
  const dispatch = useDispatch()

  //check expiration of jwt and get userObject
  useEffect(() => {
    (async () => {
      const token = user.token;
      var exp = jwt_decode(token).exp;
      if(Date.now() >= exp * 1000) {
        console.log("jwt expired");
        let res = await dispatch(logout());
        if (res) {
          console.log(
            "logout is success"
          );
        } else {
          alert(
            "un erreur est survenu lors de la déconnexion, veuillez réessayer plus tard"
          );
        }
      } else {
        // console.log('Hello world');
      }
    })();
  }, []);

 
  return (
    
      // <NavigationContainer>
        <Stack.Navigator initialRouteName = {'main'}
          screenOptions={{headerShown: false}}>
            {/* <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={SinupScreen} /> */}
            {/* <Stack.Screen name="splashScreen" component={SpalshScreen} /> */}
            {/* <Stack.Screen name="product" component={ProductsScreen} />
            <Stack.Screen name="commande" component={CommandeScreen} /> */}
            <Stack.Screen name="addBeneficiary" component={AddBeneficiary}   options={{
                ...customTransition,
              }}/>
            <Stack.Screen name="cart" component={CartScreen} options={{
                ...customTransition,
              }}/>
            <Stack.Screen name="details" component={DetailsProducts} options={{
                ...customTransition,
              }}/>
            <Stack.Screen name="confimerOrder" component={OrderConfirmation} options={{
                ...customTransition,
              }}/>
            <Stack.Screen name="redudxApp" component={TestReduxApp} options={{
                ...customTransition,
              }}/>
            <Stack.Screen name="payWith" component={PayWith} options={{
                ...customTransition,
              }}/>
            <Stack.Screen name="successPage" component={SuccessPage} options={{
                ...customTransition,
              }}/>
            <Stack.Screen name="main" component={DrowerNavigator} 
              options={{
                ...customTransition,
              }}
            />
      </Stack.Navigator>
      // </NavigationContainer>
  );
}


export default AppNavigator
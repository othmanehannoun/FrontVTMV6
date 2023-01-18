import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {LogBox} from 'react-native';
import AppNavigator from './AppNavigation'
import AuthNavigator from './AuthNavigator';
import {useDispatch, useSelector } from 'react-redux';
import {addToken} from '../Redux/Slices/UserSlice'
// import AsyncStorage from "@react-native-async-storage/async-storage";


const AppRoute = () => {
    const {user, isLoggedIn} = useSelector(state=>state.user)
    const [statusKeyLoaded, setStatusKeyLoaded] = useState(false)
    
    const dispatch = useDispatch()

    // console.log('roooote', user, isLoggedIn)
    useEffect(() => {
        (async () => {
          const res = await dispatch(addToken());
          if (res) {
            setStatusKeyLoaded(true);
          } else {
            setStatusKeyLoaded(true);
          }
        })();
      }, []);


    useEffect(() => {
        LogBox.ignoreLogs(['Reanimated 2']);
      }, [])


    return (
        <>
         {
             statusKeyLoaded && (
                <NavigationContainer>
                    {/* Conditional stack navigator rendering based on login state */}
        
                    {
                        user && isLoggedIn ? <AppNavigator /> : <AuthNavigator />
                    }
                </NavigationContainer>
             )
         }
        </>
       
    )
}

export default AppRoute
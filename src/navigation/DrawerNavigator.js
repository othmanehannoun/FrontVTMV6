import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PRIMARY_COLOR, WHITE } from '../constants/StyleColor';

import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CoustomDrawer';
import MenuScreen from '../screens/MenuScreen';
import CommandeScreen from '../screens/CommandeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import FundsTransfer from '../screens/FundsTransfer';
import Profile from '../screens/Profile';
import GoogleMaps from '../screens/GoogleMaps';
import TrackYourOrder from '../screens/TrackYourorder';



const Drawer = createDrawerNavigator();

const DrowerNavigator = () => {
   
  return (
    <Drawer.Navigator initialRouteName='home' drawerContent={(props) => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: PRIMARY_COLOR,
      drawerActiveTintColor: WHITE,
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        textTransform: 'uppercase'

      },
    }}>
        <Drawer.Screen name="home" component={HomeScreen} />
        {/* <Drawer.Screen name="commande" component={CommandeScreen} /> */}
        <Drawer.Screen name="profile" component={Profile} />
        {/* <Drawer.Screen name="menu" component={HomeScreen} /> */}
        <Drawer.Screen name="CHARGER DE FONTS" component={TrackYourOrder} />
        <Drawer.Screen name="TRENFERT DE FONDS" component={FundsTransfer} />
        <Drawer.Screen name="LES POINTS DE FIDILITE" component={HomeScreen} />
        <Drawer.Screen name="MON RESEAUX" component={GoogleMaps} />


        {/* Hidden Drawer Screen  */}
        <Drawer.Screen name="product" component={ProductsScreen} 
        options={{drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen name="commande" component={CommandeScreen} 
        options={{drawerItemStyle: { height: 0 } }}
        />
        <Drawer.Screen name="trackOrder" component={TrackYourOrder} 
        options={{drawerItemStyle: { height: 0 } }}
        />
    
    </Drawer.Navigator>
  )
}




export default DrowerNavigator
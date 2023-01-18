import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/login';

const Tab = createMaterialTopTabNavigator();

function TabTopNavigation() {
  return (
    <>
    
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={LoginScreen} />
    </Tab.Navigator>
    </>
  );
}

export default TabTopNavigation


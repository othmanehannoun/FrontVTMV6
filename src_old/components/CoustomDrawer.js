import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import header from '../../assets/images/header.png'
import { windowHeight } from '../constants/Demonsions';
import { PRIMARY_COLOR, WHITE } from '../constants/StyleColor';
import { logout } from '../Redux/Slices/UserSlice'
import { useDispatch } from 'react-redux'


const CustomDrawer = props => {

  const dispatch = useDispatch()

  const handelLogout = () =>{
    dispatch(logout())
  }

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        >
        <ImageBackground
          source={header}
          style={{padding: 10, 
            justifyContent:'center', 
            alignItems:'center', flex: 1,
             height: windowHeight*0.25
            }}
          resizeMode={'cover'}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{height: '70%', width: '50%'}}
          />
          <View style={{...styles.userinfo, width:'100%'}}>
              <Text style={{color:PRIMARY_COLOR, fontWeight:'bold'}}>OTMANE HANNOUNE</Text>
          </View>
            
        </ImageBackground>
        <View style={{flex: 1, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={() => {handelLogout()}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    userinfo:{
        backgroundColor: '#F2E5D5',
        borderColor: PRIMARY_COLOR,
        borderWidth: 2,
        padding: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
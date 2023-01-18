import React,{useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, ImageBackground, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserOrder from '../components/UserOrders'
import masques from '../../assets/images/masques.png'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderByUserID } from '../Redux/Slices/OrderSlice'
import { PRIMARY_COLOR } from '../constants/StyleColor';
import { windowHeight } from '../constants/Demonsions';

import Init from '../socket/init'

const ProfileScreen = ({navigation}) => {

  const {user} = useSelector(state => state.user)
  // console.log('userHHH:', user);



  // const dispatch = useDispatch()
  // const {isLoading, user_order} = useSelector(state => state.order);


    // useEffect(()=>{
    //   getUserAsyncStorage()
    // }, [user])

    // useEffect(()=>{
    //     dispatch(getOrderByUserID('6295f35c1863ab01bc7546a2')) 
    // }, [dispatch])

    useEffect(()=>{
      
    },[])

  return (
    <View style={styles.container}>
      {/* <Init 
        userId = { user._id }
      /> */}

      <ImageBackground source={masques} style={{flex: 1, padding: 20}}>

      <View style={{flex:1}}>
          {
            user != null ?

            <>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{marginLeft: 0}}>
                    <Title style={[styles.title, {
                      marginBottom: 0,
                      textTransform:'uppercase'
                    }]}>{user.name}</Title>
                    {/* <Text>{user._id}</Text> */}
                  </View>
                </View>
              </View> 

          
              <View style={styles.userInfoSection}>
                  <View style={styles.row}>
                    <Icon name="phone" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>+212{user.phone}</Text>
                  </View>
                  <View style={styles.row}>
                    <Icon name="email" color="#777777" size={20}/>
                    <Text style={{color:"#777777", marginLeft: 20}}>{user.email}</Text>
                  </View>
              </View>
          </>
          :
          <Text>NOOO DATA</Text>
          }

            <View style={styles.orderData}>
              <View style={{marginBottom: 15}}>
                <Text style={styles.title}>
                    Touts les Orders
                </Text>
              </View>

             
              <ScrollView style={{ maxHeight: windowHeight*0.6 }}>
                
                <UserOrder 
                  // order = {user_order}
                  navigation = {navigation}
                  userId = {user._id}
                  />
              </ScrollView>
             
        </View>
      </View>
      
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userInfoSection: {
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderData: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  title: {
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    fontSize: 20,
  },
  
});
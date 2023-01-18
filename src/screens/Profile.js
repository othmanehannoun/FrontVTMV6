import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {
  
  Title,
} from 'react-native-paper';

import masques from '../../assets/images/masques.png'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux'
import UserOrder from '../components/UserOrders'

const HomeScreen = ({navigation}) => {
  const {user} = useSelector(state => state.user)

  return (
    <ImageBackground source={masques} style={{flex: 1, padding: 20}}>

      <SafeAreaView
        style={{flex: 1}}>
        <View style={styles.header}>
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
        </View>

        <View style={{marginBottom: 15}}>
          <Text style={styles.title}>
              Touts les Orders
          </Text>
        </View>

        <UserOrder 
          navigation = {navigation}
          userId = {user._id}
        />

      </SafeAreaView>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  userInfoSection: {
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
export default HomeScreen;

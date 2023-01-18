import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
import { windowWidth } from '../constants/Demonsions'

import Icon from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo';

const Footer = () => {
  return (
    <View style={styles.container}>
        <View style={styles.socialView}>
        <View style={[styles.detailsSocial, {backgroundColor:'#5E4325'}]}>
            <Icon name="facebook" size={20} color={WHITE} />
        </View>
        <View style={[styles.detailsSocial, {backgroundColor: '#5E4325'}]}>
            <Entypo name="instagram" size={20} color={WHITE} />
        </View>
        </View>
        <Text style={{color:'#5E4325', fontSize:16, fontWeight:'bold'}}>www.vitamixagadir.com</Text>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    container:{
        width: windowWidth,
        justifyContent:'center', 
        alignItems:'center',
        padding: 10
        // position: 'absolute',
        // paddingBottom: 10,
        // bottom: 0,
    },
    socialView:{
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
      },
      detailsSocial:{
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent:'center',
        alignItems:'center',
        marginLeft: 5
      }
})
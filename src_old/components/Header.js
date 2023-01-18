import React from 'react'
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import header from '../../assets/images/header.png'
import logo from '../../assets/images/logo.png'
import { windowWidth, windowHeight} from '../constants/Demonsions'

export default function Header() {
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={header} resizeMode={'cover'} style={styles.backgroundImage}>
          <Image source={logo} style={styles.logoImage}/>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    backgroundImage: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center'
    },
    logoImage:{
      width: windowWidth* 0.5,
      height: windowHeight*0.2
    }
})
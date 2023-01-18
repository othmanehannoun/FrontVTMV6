import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image} from 'react-native'
// import Menu from '../components/Menu'
import masques from '../../assets/images/masques.png'
import success from '../../assets/images/success.png'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
// import { windowHeight, windowWidth } from '../constants/Demonsions'
// import { useDispatch, useSelector } from 'react-redux'




const SuccessPage = ({navigation, route}) => {
   

    // const dispatch = useDispatch()
  

  return (
    <View style={styles.container}>
        <ImageBackground source={masques} resizeMode={'cover'} style={{flex: 1}}>
        
        <View style={{padding: 20, flex: 1, justifyContent: "center", alignItems: 'center'}}>

          <Image
            source={success} resizeMode={'stretch'}
            style={{width: 150, height: 150, marginBottom:20}}
          />
           <View>
              <Text style={{
                textAlign: 'center', 
                color: LIGHT_COLOR, 
                fontWeight: "bold", 
                fontSize: 18
                }}>
                  Votre demande a été complétée avec succès
              </Text>
           </View>
  
        </View>

        <View style={styles.bottomView}>
           <TouchableOpacity style={{...styles.bottomButton, backgroundColor:WHITE, borderColor:LIGHT_COLOR, borderWidth:2}}
            onPress={()=>{navigation.navigate('confimerOrder')}}>
                <Text style={{color:LIGHT_COLOR, fontWeight: 'bold'}}>Order information</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={{...styles.bottomButton, backgroundColor:LIGHT_COLOR}}
            onPress={()=>{navigation.navigate('home')}}>
                <Text style={{color:WHITE, fontWeight: 'bold'}}>Home</Text>
            </TouchableOpacity> */}
        </View>
        </ImageBackground>
    </View>
  )
}

export default SuccessPage

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    userinfo:{
        backgroundColor: PRIMARY_COLOR,
        padding: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomView: {
       
        padding: 20, 
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute', 
        // bottom: 0,
    },
    bottomButton:{
        padding: 15,
        borderRadius: 10,
        margin: 5,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#52006A',
  
    }
})
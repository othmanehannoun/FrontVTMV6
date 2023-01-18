import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity} from 'react-native'
import { windowHeight, windowWidth } from '../constants/Demonsions'
import Feather from 'react-native-vector-icons/Feather'
import masques from '../../assets/images/masques.png' 
import logo from '../../assets/images/logo.png' 
import header from '../../assets/images/header.png' 
import Groupe_masques from '../../assets/images/Groupe_masques.png'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/StyleColor'


const Menu = ({ navigation }) => {
    
  return (
    <View style={styles.container}>
        <ImageBackground source={Groupe_masques} resizeMode={'cover'} style={styles.backgroundImage}>
            <View style={{...styles.box, width: '80%',}}>
                <Image source={logo} style={{width: '35%', height: '90%'}}/>
            </View>

            <View style={{
                ...styles.box, 
                alignItems:"center", 
                backgroundColor: SECONDARY_COLOR,
                borderRadius:10
                }}
            >
                <TouchableOpacity style={{padding:5}} onPress={()=>{navigation.openDrawer()}}>
                  <Feather name='menu' size={30} color={PRIMARY_COLOR}/>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    
    </View>
)
}

export default Menu

const styles = StyleSheet.create({
container:{
    width: '100%',
    height: '15%',
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 2,
},
backgroundImage:{
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
},
box:{ 
    justifyContent: 'center',
    alignContent: 'center'
},
categorey: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2
}
})
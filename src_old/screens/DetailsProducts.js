import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native'
import image from '../../assets/images/Rectangle.png'
import { windowWidth } from '../constants/Demonsions'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
import masques from '../../assets/images/masques.png'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './HomeScreen'
import LoginScreen from './login'
import TabTopNavigation from '../navigation/TabTopNavigation'
import Button from '../components/Button'
import { NavigationContainer } from '@react-navigation/native'
import CustomSwitch from '../components/CustomSwitch'
import ListItem from '../components/ItemList/listItem'

const Tab = createMaterialTopTabNavigator();


const DetailsProducts = ({navigation}) => {

    const handlePress = () =>{
        navigation.navigate('cart')
    }

    const [productList, setProductList] = useState(1);

    const onSelectSwitch = value => {
      setProductList(value);
    };


  return (
    <View style={styles.container}>
      <ImageBackground source={masques} resizeMode={'cover'} style={{flex: 1}}>
        <Image source={image} style={{width:windowWidth}}/>

        <View style={{width:windowWidth, justifyContentm:'center', alignItems:'center'}}>
        <View style={styles.viewInfo}>
            <View>
                <Text style={styles.title}>Thai Planet</Text>
                <Text style={styles.titleInfo}>Assian-Salads-Spring rolls</Text>
            </View>

            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <Text style={styles.titleInfo}>20-30 min</Text> 
                <Text style={styles.titleInfo}>4.9</Text>
            </View>
        </View>
        </View>

        <View style={{padding:20}}>
          <Text style={styles.title}>
              Menu
          </Text>

          <View style={{marginVertical: 20}}>

            <CustomSwitch
              selectionMode={1}
              option1="Free to play"
              option2="Paid games"
              onSelectSwitch={onSelectSwitch}
            />
          </View>

          {
            productList == 1 ? 
            <ListItem />
            :
            productList == 2 ?
            <Text>SALADS DATA</Text>
            :
            <Text>MAIN DATA </Text>
          }

        </View>

        <View style={styles.bottomView}>
            <TouchableOpacity style={styles.bottomButton}
            onPress={()=>{navigation.navigate('cart')}}>
                <Text style={{color:WHITE, fontWeight: 'bold', fontSize: 18}}>2 items is cart</Text>
                <Text style={{color:WHITE, fontWeight: 'bold', fontSize: 18}}>AED 64.00</Text>
            </TouchableOpacity>
        </View>


      </ImageBackground>
    </View>
  )
}

export default DetailsProducts

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    viewInfo:{
        padding: 20,
        backgroundColor: WHITE,
        width: '85%',
        marginTop: -35,
        borderRadius: 20
    },
    title: {
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        fontSize: 20
    },
    titleInfo:{
        color: LIGHT_COLOR,
        fontWeight: 'bold'
    },
    box: {
      width: 50,
      height: 50,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    button: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRadius: 4,
      backgroundColor: "oldlace",
      alignSelf: "flex-start",
      marginHorizontal: "1%",
      marginBottom: 6,
      minWidth: "48%",
      textAlign: "center",
    },
    selected: {
      backgroundColor: "coral",
      borderWidth: 0,
    },
    buttonLabel: {
      fontSize: 12,
      fontWeight: "500",
      color: "coral",
    },
    selectedLabel: {
      color: "white",
    },
    label: {
      textAlign: "center",
      marginBottom: 10,
      fontSize: 24,
    },
    bottomView: {
      width: windowWidth,
      padding: 20, 
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', 
      bottom: 0, 
   },
    bottomButton:{
      flexDirection: 'row',
      padding: 15,
      borderRadius: 10,
      width: '100%',
      backgroundColor:LIGHT_COLOR,
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 20,
      shadowColor: '#52006A',
    }
    
})


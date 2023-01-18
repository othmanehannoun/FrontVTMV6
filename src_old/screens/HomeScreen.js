import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import Categorey from '../components/Categorey'
import Menu from '../components/Menu'
import masques from '../../assets/images/masques.png'
import Footer from '../components/Footer'

import { useDispatch, useSelector } from 'react-redux'
import { getCatregory } from '../Redux/Slices/ProviderSlice'

import PushNotification from "react-native-push-notification";
import { PRIMARY_COLOR } from '../constants/StyleColor'


const HomeScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const {isLoading, category, error} = useSelector(state => state.category) 


  // const dd = [{"__v": 0, "_id": "62262c09fb7f3341e0b6bcf2", "createdAt": "2022-03-07T16:00:09.801Z", "img": "public\\uploads\\productImg-1646668809795.png", "link": "/Pastitio", "name": "pastitio", "updatedAt": "2022-03-07T16:00:09.801Z"}, {"__v": 0, "_id": "62262d32fb7f3341e0b6bcf8", "createdAt": "2022-03-07T16:05:06.478Z", "img": "public\\uploads\\productImg-1646669106466.png", "link": "/Jus", "name": "jus", "updatedAt": "2022-03-07T16:05:06.478Z"}]
  // console.log(dd.sort((a, b) => a.name.localeCompare(b.name)))
 

  useEffect(()=>{
    dispatch(getCatregory())
  }, [dispatch])

  const handlePress = (Item_Id, itemName, key) =>{
    navigation.navigate('product', {id: Item_Id, itemName:itemName ,  key})
  }

  // const handleNotification = () =>{
  //   PushNotification.localNotification({

  //     channelId: "test-channel",
  //     title: "My Notification Title", // (optional)
  //     message: "My Notification Message", // (required)

  //   });
  // }
  return (
    <View style={styles.container}>
        <ImageBackground source={masques} resizeMode={'cover'} style={{flex: 1}}>
          <Menu navigation = {navigation} />

          {/* <TouchableOpacity
          style={{backgroundColor: 'red'}}
          onPress={()=>{handleNotification()}}>
            <Text>Affiche Notification</Text>
          </TouchableOpacity> */}
          
          <View style={{padding: 20, flex:1}}>
              {
                isLoading ?
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                  <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                </View>
                :
                <>
                  {
                    error ? 
                    alert(error) 
                    :
                    <Categorey 
                      category = {category}
                      onPress = {handlePress} 
                    />
                  }
                </>
              }
          </View>

          <Footer />
        </ImageBackground>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
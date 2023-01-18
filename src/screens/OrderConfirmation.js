import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity} from 'react-native'
import Menu from '../components/Menu'
import masques from '../../assets/images/masques.png'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
import OrderInfo from '../components/OrderInfo'
import { windowHeight, windowWidth } from '../constants/Demonsions'
import { useDispatch, useSelector } from 'react-redux'

import { getOrder } from '../Redux/Slices/OrderSlice'



const OrderConfirmation = ({navigation, route}) => {
    // const id = route.params.id

    console.log(route.params);

    const dispatch = useDispatch()
    const { order, isLoading } = useSelector((state) => state.order);
    const [data, setData] = useState(null)

    useEffect(()=>{
        if(route.params != undefined){
            dispatch(getOrder(route.params.id))
        }
        
    },[dispatch])

    useEffect(()=>{
        setData(order)
    },[order, data])

  return (
    <View style={styles.container}>
        <ImageBackground source={masques} resizeMode={'cover'} style={{flex: 1}}>
        
        <View style={{padding: 20, flex: 1}}>

        <View style={{marginBottom: 20}}>
            <Text style={{
                color: PRIMARY_COLOR,
                fontSize: 30, 
                fontWeight: 'bold',
                
                }}
            >
                Order Confirmation
            </Text>
        </View>

            {isLoading ? 
                <Text>Loading ...</Text>
                :
                <>
                <View>
                    {
                        data != null ? 
                            <OrderInfo 
                             order = {data} 
                            />
                        :
                         null
                    }
                </View>
                </>
            }
  
            

        </View>

        <View style={styles.bottomView}>
           <TouchableOpacity style={{...styles.bottomButton, backgroundColor:WHITE, borderColor:LIGHT_COLOR, borderWidth:2}}
            onPress={()=>{navigation.navigate('trackOrder', {order})}}>
                <Text style={{color:LIGHT_COLOR, fontWeight: 'bold'}}>Track your Order</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{...styles.bottomButton, backgroundColor:LIGHT_COLOR}}
            onPress={()=>{navigation.navigate('home')}}>
                <Text style={{color:WHITE, fontWeight: 'bold'}}>Home</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    </View>
  )
}

export default OrderConfirmation

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
        flexDirection:'row',
        // width: windowWidth,
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
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: '#52006A',
  
    }
})
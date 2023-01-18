import React from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView} from 'react-native'
import { PRIMARY_COLOR, SECONDARY_COLOR, WHITE} from '../constants/StyleColor'
import Button from './Button'

import image from '../../assets/images/Soustraction.png'


const OrderInfo = ({order}) => {

    const getDateOrder = (date)=>{
        let DateOrder = new Date(date);
        return DateOrder.getDate() + '/' + (DateOrder.getMonth() + 1) + '/' + DateOrder.getFullYear();
    }
    const getTimeOrder = (date)=>{
        let TimeOrder = new Date(date);
        return TimeOrder.getHours() + ':' + (TimeOrder.getMinutes()<10? '0':'') + TimeOrder.getMinutes();
    }
    
  return (
    <View style={styles.container}>

       <ImageBackground source={image} resizeMode={"stretch"} 
        style={{padding: 20,
              elevation: 24,
              shadowColor: '#52006A',
            }} 
        >

       <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',marginBottom: 50}}>
            <View>
                <Text style={{
                    color: WHITE,
                    fontSize: 25,
                    fontWeight: 'bold'
                }}
                >
                    FeedMe
                </Text>
            </View>

            <View>
                <Text style={{
                    color: WHITE,
                    fontWeight: 'bold'
                    }}
                >
                   {getDateOrder(order.createdAt)}
                </Text>
                <Text style={{
                    color: WHITE,
                    fontWeight: 'bold',
                    marginLeft: 'auto'
                    }}
                >
                   {getTimeOrder(order.createdAt)}
                </Text>
            </View>
        </View>

        <Text style={{
            color: WHITE,
            fontWeight: 'bold',
            marginBottom: 30,
            fontSize: 20
            }}
        >
            Thai Planet
        </Text>
       <ScrollView style={{maxHeight: 100, marginBottom: 10}}>

        {
            order.products.map((item, index)=>(

            <View key={index} style={{flexDirection: 'row', justifyContent:'space-between'}}>
            
                    <>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={{...styles.text}}>{item.price}DH * {item.quantity}</Text>
                    </>
                    
            </View>
            ))
            }

        </ScrollView>

        <View style={{
           flexDirection: 'row', justifyContent:'space-between', 
           marginBottom: 50, borderBottomColor: WHITE, borderBottomWidth: 1}}>

        </View>

        <View style={styles.total}>
            <Text style={{color: WHITE,
                fontSize: 30,}}>
                TOTAL: 
            </Text>
            <Text style={{color: WHITE,
                fontSize: 30, fontWeight: 'bold'}}>
               {order.totalPrice} DH
            </Text>
        </View>

       </ImageBackground>

    </View>
  )
}

export default OrderInfo

const styles = StyleSheet.create({
    container:{

    },
    title:{
        marginBottom: 30,
    },
    total:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },

    text:{
        color: WHITE,
        fontWeight: 'bold',
        marginBottom: 15
    },
    button:{
        padding: 10,
        borderRadius: 20,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      
    },
})
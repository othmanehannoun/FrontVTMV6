
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native'
import { windowHeight, windowWidth } from '../constants/Demonsions'
import pollo from '../../assets/images/calzon/Pollo.jpg'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
import { useDispatch, useSelector } from 'react-redux'
import { increament, decrement} from '../Redux/Slices/CartSlice'
import { endPoint } from '../constants/GlobaleVariables';

const CartItem = ({products, subTotal}) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        
    }, [products])

    const HandleIncreament = (id) =>{
        dispatch(increament(id))
    }

    const HandleDecreament = (id) =>{
        dispatch(decrement(id))
        // alert(id)
    }
  return (
      <>

        <ScrollView nestedScrollEnabled={true} style={{maxHeight: windowHeight*0.3}}>

            {
                products.map((item, index)=>(
                    <View key={index} style={styles.container}>

                        <View style={styles.box}>
                            <View style={styles.item}>
                                <Image source={
                                {
                                uri: `${endPoint}/${item.img}`
                                }
                            }  style={{height: 80, width: '100%', borderRadius:10}}/>
                            </View>
                        </View>

                        <View style={{...styles.box}}>
                            <View style={styles.item}>
                                <Text style={styles.Item_namePrice}> {item.name}</Text>
                                <Text style={styles.Item_description}>Salmon, cabbage, tomato, sesame seeds</Text>
                                <Text style={styles.Item_namePrice}>{item.price * item.quantity} DH</Text>
                            </View>
                        </View>

                        <View style={{...styles.box}}>
                            <View style={{justifyContent:'space-between',alignItems:'center'}}>
                                <View style={styles.addButton}>
                                    <TouchableOpacity
                                    style={styles.button}
                                    onPress={()=>{HandleIncreament(item._id)}}
                                    >
                                        <Text style={styles.titleAdd}>+</Text>
                                    </TouchableOpacity>

                                    
                                    <View style={styles.quantity}>
                                    <Text style={styles.titleAdd}>{item.quantity}</Text>
                                    </View>
                                    

                                    <TouchableOpacity 
                                    style={styles.button}
                                    onPress={()=>{HandleDecreament(item._id)}}
                                    disabled={item.quantity === 1}
                                    >
                                        <Text style={styles.titleAdd}>-</Text>
                                    </TouchableOpacity>
                
                                </View>
                            </View>
                        </View>
                    </View>
                ))
            }

        </ScrollView>
{/* 
        <Text style={{
            color:PRIMARY_COLOR, 
            fontWeight:'bold', 
            marginTop: 20,
            marginBottom: 10
            }}
        >
            Summury: {subTotal.toFixed(2)} DH
        </Text> */}

      </>
   
  )
}

export default CartItem

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent:'center',
        alignItems:'center',
        marginBottom: 10
    },
    box:{
        width: '33.33%',
        padding: 5,
    },
   
    Item_namePrice:{
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginBottom: 5,
        textTransform:'uppercase',
    },
    
    Item_description:{
        color: LIGHT_COLOR,
        fontSize: 8,
        marginBottom: 5
    },

    addButton:{
        flexDirection:'row',
        paddingHorizontal:10, 
        justifyContent:'space-between', 
        width:'100%', 
        borderRadius: 10
    },

    quantity:{
        backgroundColor: LIGHT_COLOR, 
        justifyContent:'center',
        alignItems:'center',  
        paddingHorizontal: 10,
        borderRadius: 5
    },
    button:{
        marginRight: 0, 
        backgroundColor: LIGHT_COLOR, 
        padding: 5,
        borderRadius: 5
    },

    titleAdd:{
        color:WHITE, 
        fontWeight:'bold'
    }
})
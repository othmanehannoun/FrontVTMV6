
import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity , Image, ActivityIndicator} from 'react-native';
import { PRIMARY_COLOR, WHITE, YELLOW_COLOR } from '../../constants/StyleColor';
import { CheckBox } from 'react-native-elements'
import { windowHeight } from '../../constants/Demonsions';
import { endPoint } from '../../constants/GlobaleVariables';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../../Redux/Slices/CartSlice";
import {getProductByCatregory} from '../../Redux/Slices/ProviderSlice'
import AsyncStorage from "@react-native-async-storage/async-storage";



const Products = ({isLoading, itemId}) => {

  // useEffect(()=>{
  //   setTimeout(()=> isLoading, 7000)
  // })

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const {products, error} = useSelector(state => state.category) 

  useEffect(()=>{
    console.log(itemId)
      dispatch(getProductByCatregory(itemId))    
  }, [])


  const renderItem = ({ item }) => (
      
    <>
     <View style={styles.box} >
             <Image source={
               {
                 uri: item.img != 'none' ? `${endPoint}/${item.img}` : '../../../assets/images/logo.png'
               }
             } 
               style={{width: "100%",
               height: 100,
               resizeMode: 'contain'
               }}
             />
             <Text style={styles.title}>{item.name}</Text>
             <View style={{flexDirection: 'row'}}>
                 <View style={styles.price}>
                   <Text style={{color: WHITE}}>{item.price} DH</Text>
                 </View>
                 {/* <View style={styles.checked}> */}
 
                 <TouchableOpacity
                   onPress={()=>{dispatch(addToCart(item))}}
                   style={styles.btnActive}  
                 >
                   {/* <View style={}> */}
                   <View 
                     style={[
                       styles.Inchecked,
                       cart.map(e=>{
                         if(e._id === item._id){
                           return styles.checked
                         }
                       
                       })
                       
                     ]}
                    >
                     <Text></Text>
                   </View>
 
               </TouchableOpacity>

                 {/* </View> */}
             </View>
 
     </View>
 
    </>
   );
 

  return (
    <>
      {
      isLoading ?
        <View style={{justifyContent: "center", flex: 1}}>
            <ActivityIndicator size="large" color={PRIMARY_COLOR} />
          </View>
        :
        <SafeAreaView>
          <FlatList
            numColumns={2}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      }
    </>
  );
}

const styles = StyleSheet.create({
 
  box:{
    width: '50%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
    
  title:{
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    textTransform:'uppercase',
    marginBottom:5
  },
  price:{
    backgroundColor: PRIMARY_COLOR,
    color: WHITE,
    width: "45%",
    padding: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  checked:{
    backgroundColor: WHITE,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 5,
  },
  Inchecked:{
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    padding: 2,
    borderRadius: 5,
    marginLeft: 5 
  },
  btnActive:{
    // backgroundColor: WHITE,
    width: '20%',
  },

});

export default Products;

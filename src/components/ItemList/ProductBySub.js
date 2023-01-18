
import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity , Image, ActivityIndicator} from 'react-native';
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE, YELLOW_COLOR } from '../../constants/StyleColor';
import { endPoint } from '../../constants/GlobaleVariables';
import axios from "axios";

import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../../Redux/Slices/CartSlice";

const ProductBySub = ({isLoading, handleData, sub_id}) => {
  
  // const [data, setData] = useState(null);
  const [idSub, setIdSub] = useState(sub_id)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  const getProductBySubCategory = async() => {
   try{
    setLoading(true)
    const response = await axios.get(`${endPoint}/api/product/getProductBySubCategory/${sub_id}`) 
    const json = response.data;
    setTimeout(() => {
      setLoading(false)
      setProducts(json)
    }, 1000)
    
   }
   catch (error){
     console.log(error)
   }
};

useEffect(()=>{
  let isMounted = true
  if(isMounted) getProductBySubCategory()
 
  return () => { isMounted = false };
},[idSub])


  const handleChange = (item) => {
    dispatch(addToCart(item))
  };
  
    return (
      
      <View>
       {
         loading ?
         <View style={{flex: 1, justifyContent: "center"}}>
            <ActivityIndicator size="large" color={PRIMARY_COLOR} />
          </View>
         :
        <View >
   
        <View style={{flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
        }}> 
          {
            products.map((item, key)=>(
              <View key={key} style={{width: "50%", alignItems: 'center', 
              backgroundColor: item.img == 'none' ? LIGHT_COLOR: 'none'}}
              >
                {
                  item.img == 'none' ?

                    <View style={{...styles.box, backgroundColor: LIGHT_COLOR}}>
                      <View style={styles.item}>
                        <Text style={{color: WHITE,fontWeight: 'bold',width: '70%'}}>{item.name}</Text>

                        <TouchableOpacity
                            onPress={()=>{handleChange(item)}}
                            style={styles.btnActive}  
                        >
                            <View 
                              style={[
                                {...styles.Inchecked, borderColor: WHITE},
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
                      </View>
                    </View>

                  :
                    <View style={{...styles.box,  justifyContent: 'center', alignItems: 'center'}} >

                            <Image source={
                              {
                                uri: `${endPoint}/${item.img}`
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
                                  onPress={()=>{handleChange(item)}}
                                  style={styles.btnActive}  
                                >
                                
                                  <View 
                                    style={[
                                      {...styles.Inchecked, borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_COLOR},
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

                            
                            </View>
                
                    </View>
                }
              </View>
            ))
          }
         
       



        </View>

        </View>
        
        //  <FlatList
        //     numColumns={2}
        //     data={products}
        //     renderItem={renderItem}
        //     keyExtractor={(item, index) => index}
        //     showsHorizontalScrollIndicator={false}

        //   />
       
       }
      </View>
    );
  }

const styles = StyleSheet.create({
 
  box:{
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  item:{
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: "55%",
    padding: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  checked:{
    backgroundColor: WHITE,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 5,
  },
  Inchecked:{
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
    marginLeft: 5 
  },

  Textbutton:{
    color: PRIMARY_COLOR,
  },

  checkbox:{
    padding: 0
  },
  btnActive:{
    // backgroundColor: WHITE,
    width: '20%',
  },
  btnInActive:{
    backgroundColor: "red"
  }

});

export default ProductBySub;
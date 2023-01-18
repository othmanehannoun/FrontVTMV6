
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
    getProductBySubCategory()
  },[idSub])

 

  const handleChange = (item) => {
    dispatch(addToCart(item))
  };
  
    const renderItem = ({ item }) => (
      
     <>
     {
       item.img == 'none' ?

          <View style={{...styles.box, backgroundColor: LIGHT_COLOR}}>
          <View style={styles.item}>
            <Text style={{color: WHITE,fontWeight: 'bold', width: '70%'}}>{item.name}</Text>

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

                  {/* </View> */}
              </View>
  
      </View>
     }
      
  
     </>
    );
  
    return (
      
      <View>
       {
         loading ?
         <View style={{flex: 1, justifyContent: "center"}}>
            <ActivityIndicator size="large" color={PRIMARY_COLOR} />
          </View>
         :
         <FlatList
            numColumns={2}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
          />
       
       }
      </View>
    );
  }

const styles = StyleSheet.create({
 
  box:{
    width: '50%',
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










// import React, { useState, useEffect } from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Modal,
// } from 'react-native';
// import { CheckBox } from 'react-native-elements'


// const data = [
//   { id: 1, txt: 'first check', isChecked: false },
//   { id: 2, txt: 'second check', isChecked: false },
//   { id: 3, txt: 'third check', isChecked: false },
//   { id: 4, txt: 'fourth check', isChecked: false },
//   { id: 5, txt: 'fifth check', isChecked: false },
//   { id: 6, txt: 'sixth check', isChecked: false },
//   { id: 7, txt: 'seventh check', isChecked: false },
// ];

// export default App = () => {
//   const [products, setProducts] = useState(data);

//   const handleChange = (id) => {
//     let temp = products.map((product) => {
//       if (id === product.id) {
//         return { ...product, isChecked: !product.isChecked };
//       }
//       return product;
//     });
//     setProducts(temp);
//   };

//   let selected = products.filter((product) => product.isChecked);

//   const renderFlatList = (renderData) => {
//     return (
//       <FlatList
//         data={renderData}
//         renderItem={({ item }) => (
          
//             <View style={styles.card}>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   flex: 1,
//                   justifyContent: 'space-between',
//                 }}>
//                 <TouchableOpacity
//                     // onPress={()=>{handelCheckBox(item)}}
//                     onPress={()=>{handleChange(item.id)}}
//                     style={
//                       item.isChecked == true ?
//                       styles.btnActive
//                       :
//                       styles.btnInActive
//                     }
                    
//                   >
//                   <Text>+ ADD</Text>
//                   {/* <CheckBox
//                       checked = {item.checked}
//                       onPress={() => handelCheckBox(item)}
//                       containerStyle={styles.checkbox}             
//                       checkedColor= {WHITE}
//                   /> */}

//                 </TouchableOpacity>
//                 <Text>{item.txt}</Text>
//               </View>
//             </View>
          
//         )}
//       />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={{ flex: 1 }}>{renderFlatList(products)}</View>
     
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
  
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },

//   btnActive:{
//         backgroundColor: 'red'
//       },
//       btnInActive:{
//         backgroundColor: 'blue'
//       },

//   card: {
//     padding: 10,
//     margin: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 5,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     elevation: 5,
//   },
//   text: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
// });


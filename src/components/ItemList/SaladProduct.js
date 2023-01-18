
import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity , ActivityIndicator} from 'react-native';
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE, YELLOW_COLOR } from '../../constants/StyleColor';
import { endPoint } from '../../constants/GlobaleVariables';
import axios from "axios";

import { useDispatch, useSelector } from 'react-redux'
import { addToBase, addToIngredient, addToSauce, addToToppings } from "../../Redux/Slices/SaladSlice";

const SaladProduct = ({ sub_id, saladPrice, sub_name }) => {
  
  // const [data, setData] = useState(null);
  const [idSub, setIdSub] = useState(sub_id)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saladData, setSaladData] = useState(null);

  // const [subTotal, setSubTotal] = useState(null);

  const { Base, Ingredient, Sauce, Toppings } = useSelector((state) => state.saladCart);
  // const {Base} = useSelector((state) => state.saladCart);

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
     console.log(error);
   }
};

  useEffect(()=>{
    let isMounted = true
     var saladData = Base.concat(Ingredient, Toppings, Sauce)
     if(isMounted) setSaladData(saladData)
     return () => { isMounted = false };
  }, [Base, Ingredient, Toppings, Sauce])

  
  useEffect(()=>{
    let isMounted = true
    if(isMounted) getProductBySubCategory()
   
    return () => { isMounted = false };
  },[idSub])

 

  const handleChange = (item) => {
    if(sub_name == "Base"){
      dispatch(addToBase(item))
    }
    else if (sub_name == "INGREDIENT"){
      dispatch(addToIngredient(item))
    }
    else if (sub_name == "Toppings"){
      dispatch(addToToppings(item))
    }
    else if (sub_name == "Sauce"){
      dispatch(addToSauce(item))
    }
    else{
      alert('Errror ')
    }
    
  };

  const items = [];

  useEffect(()=>{

  },[items])

  
    const renderItem = ({ item }) => (
     
     <>
     {/* <Text>helllo</Text> */}
          <View style={{...styles.box, backgroundColor: LIGHT_COLOR}}>

            <View style={styles.item}>
              <Text style={{color: WHITE,fontWeight: 'bold', width: '70%'}}>{item.name}</Text>

              <TouchableOpacity
                  // onPress={()=>{handleChange(item)}}
                  onPress={()=>{handleChange(item)}}
                  style={styles.btnActive}  
              >
                  <View 
                    style={[
                      {...styles.Inchecked, borderColor: WHITE},
                      saladData.map(e=>{
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
       <>

       {
         saladPrice == 30 ?
         sub_name == 'Base' ? <Text style={styles.nbrproduct}>{Base.length > 2 ? 2 : Base.length}/2 {Base.length > 2 ? " + 6 DH" : null}</Text>:
         sub_name == 'Toppings' ? <Text style={styles.nbrproduct}>{Toppings.length > 1 ? 1 : Toppings.length}/1 {Toppings.length > 1 ? " + 6 DH" : null}</Text>:
         sub_name == 'Sauce' ? <Text style={styles.nbrproduct}>{Sauce.length > 2 ? 2 : Sauce.length}/2 {Sauce.length > 2 ? " + 6 DH" : null}</Text>:
         sub_name == 'INGREDIENT' ? <Text style={styles.nbrproduct}>{Ingredient.length > 5 ? 5 : Ingredient.length}/5 {Ingredient.length > 5 ? " + 6 DH" : null}</Text>:
         null

         :
         saladPrice == 40 ?
         sub_name == 'Base' ? <Text style={styles.nbrproduct}>{Base.length > 2 ? 2 : Base.length}/2 {Base.length > 2 ? " + 6 DH" : null}</Text>:
         sub_name == 'Toppings' ? <Text style={styles.nbrproduct}>{Toppings.length > 2 ? 2 : Toppings.length}/2 {Toppings.length > 2 ? " + 6 DH" : null}</Text>:
         sub_name == 'Sauce' ? <Text style={styles.nbrproduct}>{Sauce.length > 2 ? 2 : Sauce.length}/2 {Sauce.length > 2 ? " + 6 DH" : null}</Text>:
         sub_name == 'INGREDIENT' ? <Text style={styles.nbrproduct}>{Ingredient.length > 8 ? 8 : Ingredient.length}/8 {Ingredient.length > 8 ? " + 6 DH" : null}</Text>:
         null
         :

         saladPrice == 60 ?
         sub_name == 'Base' ? <Text style={styles.nbrproduct}>{Base.length > 2 ? 2 : Base.length}/2 {Base.length > 2 ? " + 6 DH" : null}</Text>:
         sub_name == 'Toppings' ? <Text style={styles.nbrproduct}>{Toppings.length > 4 ? 4 : Toppings.length}/4 {Toppings.length > 4 ? " + 6 DH" : null}</Text>:
         sub_name == 'Sauce' ? <Text style={styles.nbrproduct}>{Sauce.length > 2 ? 2 : Sauce.length}/2 {Sauce.length > 2 ? " + 6 DH" : null}</Text>:
         sub_name == 'INGREDIENT' ? <Text style={styles.nbrproduct}>{Ingredient.length > 20 ? 20 : Ingredient.length}/20 {Ingredient.length > 20 ? " + 6 DH" : null}</Text>:
         null
         :

         null
       }
        
       {/* <FlatList
            numColumns={2}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            showsHorizontalScrollIndicator={false}
          /> */}

        <View style={{flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          justifyContent:'center',
          alignItems:'center',
          backgroundColor: LIGHT_COLOR
        }}> 
          {
            products.map((item, key)=>(
              <View key={key} style={{width: "50%",justifyContent: "center", alignItems: 'center'}}>
            

                    <View style={{...styles.box}}>
                      <View style={styles.item}>
                        <Text style={{color: WHITE,fontWeight: 'bold',width: "70%"}}>{item.name}</Text>

                        <TouchableOpacity
                            onPress={()=>{handleChange(item)}}
                            style={styles.btnActive}  
                        >
                            <View 
                              style={[
                                {...styles.Inchecked, borderColor: WHITE},
                                saladData.map(e=>{
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

              </View>
            ))
          }
         
       



        </View>
       
       </>
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
  },
  nbrproduct:{
    color: PRIMARY_COLOR,
    fontWeight: 'bold'
  }

});

export default SaladProduct;










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


import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, ActivityIndicator, ScrollView, LogBox} from 'react-native'
import Menu from '../components/Menu'
import masques from '../../assets/images/masques.png'
import Pagination from '../components/Pagination'
import Product from '../components/ItemList/Product'
import ProductBySub from '../components/ItemList/ProductBySub'
import { LIGHT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/StyleColor'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import {getSubCByCatregory, getProductByCatregory} from '../Redux/Slices/ProviderSlice'
import Button from '../components/Button'
import { clear } from '../Redux/Slices/UserSlice'
import SaladProduct from '../components/ItemList/SaladProduct'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Products = ({navigation, route}) => {



  const itemKEY = route.params.key
  const item_name = route.params.itemName

 // const dispatch = useDispatch();

  //  useEffect(()=>{
  //   dispatch(clear())
  //  },[])
  useEffect(() => {
    
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
   
  }, [])


  const paramsData = route.params;
  const idCategory =  paramsData.id
 
  const [itemId, setItemId] = useState(idCategory);
  const [item_Name, setItem_Name] = useState(item_name);
  const [salad_price, setSalad_price] = useState(null);

  // console.log("--------------------hhhhhhhhhhhhhhhhhh--------------", route.params.itmeName)



  // const [itemKey, setItemKey] = useState(itemKEY);
  // const [subID, setSubID] = useState(null);

  // const [productsData, setProductsData] = useState([]);
   

  const dispatch = useDispatch()
  const {isLoading, category, subCategory, error} = useSelector(state => state.category) 
  const cart = useSelector((state) => state.cart);
  const { Base, Ingredient } = useSelector((state) => state.saladCart);

  // useEffect(()=>{
  // }, [cart, itemKEY])

  const handleSetItemId = async(id, name) =>{
    // console.log(id, name)
    await setItemId(id)
    await setItem_Name(name)
  }

  // const handlePress = (vali) =>{
  //   setItem_Name(name)
  // }
  useEffect(()=>{
    dispatch(getSubCByCatregory(`${itemId}`))  
  }, [itemId])


  const handelChekout = () =>{
    if(cart.length > 0 || Base.length > 0 || Ingredient.length > 0 ){
      navigation.navigate('commande', {salad_price})
      
    }
    else{
      alert('Vous devez ajouter au moins un produit')
    }
  }

  return (
    <View style={styles.container}>
        <ImageBackground source={masques} resizeMode={'cover'} style={{flex: 1}}>
          <Menu navigation = {navigation} />

          <View style={{paddingVertical: 15, 
            backgroundColor: SECONDARY_COLOR, borderColor: LIGHT_COLOR,
            borderWidth: 2, marginTop: 10}}>
            <Pagination 
              setItemId = {handleSetItemId}
              // category = {category}
              itemKey = {itemKEY}
            />
          </View>

          {

            item_Name == "SALADE" ?
              <View style={{padding: 20, flex: 1}}>  
                {
                  subCategory.length > 0 ?
                
                    isLoading ?
                    <View style={{flex: 1, justifyContent: "center"}}>
                      <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                    </View>
                  
                    :
                    <>
                      <View style={{flexDirection: 'row', width: "100%", marginBottom: 10}}>
                        <View style={{width: "33.33%", padding: 5}}>
                            <TouchableOpacity 
                            onPress={()=> {setSalad_price(30)}}
                            style={styles.saladButton}
                            >
                              <Text style={styles.TextSaladButton}> Petite </Text>
                              <Text style={styles.TextSaladButton}>30 DH </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{width: "33.33%", padding: 5}}>
                        <TouchableOpacity 
                            onPress={()=> {setSalad_price(40)}}
                            style={styles.saladButton}
                            >
                              <Text style={styles.TextSaladButton}> Moyenne </Text>
                              <Text style={styles.TextSaladButton}>40 DH </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{width: "33.33%", padding: 5}}>
                             <TouchableOpacity 
                                onPress={()=> {setSalad_price(45)}}
                                style={styles.saladButton}
                                >
                                  <Text style={styles.TextSaladButton}> Grande </Text>
                                  <Text style={styles.TextSaladButton}>45 DH </Text>
                             </TouchableOpacity>
                        </View>

                      </View>
                      
                      <ScrollView nestedScrollEnabled={true}>
                        {
                          subCategory.map((item, index)=>(
                          
                              <View key={index}>
                                <Text style={{color: PRIMARY_COLOR,
                                  //  marginLeft: 10, 
                                  fontWeight: 'bold', 
                                  borderBottomWidth: 2, 
                                  borderBottomColor: PRIMARY_COLOR,
                                  textTransform:'uppercase',
                                  fontSize: 18,
                                  // width: '50%',
                                  marginBottom: 10
                                  }}>{item.name}
                                </Text>

                              <View style={{marginBottom: 30}}>
                                    <SaladProduct 
                                      sub_id = {item._id}
                                      isLoading = {isLoading}
                                      saladPrice = {salad_price}
                                      sub_name = {item.name}
                                    />
                                  </View>
                                
                              </View>
                            )
                          )
                        }
                      </ScrollView>  
                    </>
                  :
                  null
          
                } 
              </View>
             :

              <View style={{padding: 20, flex: 1}}>  
                    {
                      subCategory.length > 0 ?
                    
                        isLoading ?
                        <View style={{flex: 1, justifyContent: "center"}}>
                            <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                        </View>
                        :
                        <ScrollView nestedScrollEnabled={true}>
                          {
                            subCategory.map((item, index)=>(
                              
                                <View key={index}>
                                  <Text style={{color: PRIMARY_COLOR,
                                    //  marginLeft: 10, 
                                    fontWeight: 'bold', 
                                    borderBottomWidth: 2, 
                                    borderBottomColor: PRIMARY_COLOR,
                                    textTransform:'uppercase',
                                    fontSize: 18,
                                    // width: '50%',
                                    marginBottom: 10
                                    }}>{item.name}
                                  </Text>
                                

                                  
                                    <View style={{marginBottom: 30}}>
                                      <ProductBySub 
                                        sub_id = {item._id}
                                        isLoading = {isLoading}
                                      />
                                    </View>
                                  
                                </View>
                              )
                            )
                          }
                        </ScrollView>  
                      :
                      <>  
                        <Product 
                            isLoading = {isLoading}
                            itemId = {itemId}
                          />  
                      </>  
              
                    } 
              </View>
          }


            <View>
              <Text></Text>
              <Button 
               title = "CHECKOUT"
               onPress={handelChekout}
              />
            </View>

          <Footer />

        </ImageBackground>
    </View>
  )
}

export default Products

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  saladButton:{
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    width: "100%"
  },
  TextSaladButton:{
    marginBottom: 5,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
   
  }
})
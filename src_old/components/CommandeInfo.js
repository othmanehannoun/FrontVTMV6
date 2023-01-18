import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { windowHeight } from '../constants/Demonsions'
import { PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
import { useDispatch, useSelector } from 'react-redux'
// import Button from './Button'

const CommandeInfo = ({products, handleTotal, saladData, salad_price, setTotalSaladPrice1}) => {
 
    console.log(handleTotal);
    const { Base, Ingredient } = useSelector((state) => state.saladCart);

    const [totalSaladPrice, setTotalSaladPrice] = useState(null);

    useEffect(()=>{
        salad_price == 30 ?
        Base.length > 2 || Ingredient.length > 2 ? setTotalSaladPrice(salad_price + 6) : setTotalSaladPrice(salad_price)
        :
        salad_price == 40 ?
        Base.length > 3 || Ingredient.length > 3 ? setTotalSaladPrice(salad_price + 6) : setTotalSaladPrice(salad_price)
        :
        salad_price == 45 ?
        Base.length > 4 || Ingredient.length > 4 ? setTotalSaladPrice(salad_price + 6) : setTotalSaladPrice(salad_price)
        :
        null

        setTotalSaladPrice1(totalSaladPrice);
        
    },[salad_price, totalSaladPrice, Base, Ingredient]);

    // console.log("ee", salad_price);
    const HandelSumTotal = () =>{
        let Subtotal = 0
        if(products.length > 0 ){
            products.map(item =>{
                Subtotal += parseInt(item.price)
                handleTotal(Subtotal)
            })
        }
        else{
            handleTotal(0)
        }
           
    }

    useEffect(()=>{
        HandelSumTotal()
    },[handleTotal])

  return (
        <>
            <View style={styles.title}>
                <Text style={{ borderBottomColor:PRIMARY_COLOR, 
                    borderBottomWidth: 2, color: PRIMARY_COLOR,
                    fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                    VOTRE COMMANDE
                </Text>
            </View>

            <ScrollView
                style={{marginBottom: 20, maxHeight: windowHeight / 5}}
            >
                {
                    products.length > 0 ?
              
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                
                        <View style={{...styles.orderInfo, width:'65%'}}>
                            {
                                products.map((item, index)=>(
                                    <Text key={index} style={styles.text}>{item.name}</Text>
                                ))
                            }
                        </View>
                        
                        <View style={{width:'30%'}}>
                            {
                                products.map((item, index)=>(
                                    <Text key={index} style={{...styles.text, marginLeft:'auto'}}>{item.price} DH</Text>
                                ))
                            }
                        </View>

                    </View>
                    :
                    null
                }

                {/* SALADE PRODUCTS */}
               {
                   saladData.length > 0 ?
                      <>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: "red"}}>Salade: </Text>
                        
                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                    
                            <View style={{...styles.orderInfo, width:'65%'}}>
                                
                                {
                                    saladData ?

                                    saladData.map((item, index)=>(
                                        <Text key={index} style={styles.text}>{item.name}</Text>
                                    ))
                                    :
                                    null
                                }
                            </View>
                            
                            <View style={{width:'30%',justifyContent: 'center'}}>
                                {/* {
                                    Base.map((item, index)=>( */}
                                        <Text style={{...styles.text, marginLeft:'auto'}}>
                                            {
                                                totalSaladPrice
                                            }DH</Text>
                                    {/* ))
                                } */}
                            </View>

                        </View>
                      </>
                    :
                    null
               }
            </ScrollView>


        </>

  
  )
}

export default CommandeInfo

const styles = StyleSheet.create({
    container:{
      //height: '100%'
    },
    title:{
        justifyContent:'center', 
        alignItems:'center', 
        marginBottom: 30,
       
    },
    orderInfo:{
        padding: 5,
        borderEndColor: PRIMARY_COLOR,
        borderEndWidth: 2
    },
    text:{
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginBottom: 15
    }
})


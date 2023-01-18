import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { windowHeight } from '../constants/Demonsions'
import { PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
import { useDispatch, useSelector } from 'react-redux'
// import Button from './Button'

const CommandeInfo = ({products, handleTotal, saladData, salad_price, setTotalSaladPrice1}) => {
 
    // console.log(handleTotal);
    const { Base, Ingredient, Sauce, Toppings } = useSelector((state) => state.saladCart);

    const [totalSaladPrice, setTotalSaladPrice] = useState(salad_price);


    useEffect(()=>{
        
        (async()=>{
            let price = salad_price
            if(salad_price == 30){
                if(Base.length > 2) price += 6
                if(Toppings.length > 1) price += 6
                if(Sauce.length > 2) price += 6
                if(Ingredient.length > 5) price += 6
            }
            if(salad_price == 40){
                if(Base.length > 2) price += 6
                if(Toppings.length > 2) price += 6
                if(Sauce.length > 2) price += 6
                if(Ingredient.length > 8) price += 6
            }
            if(salad_price == 60){
                if(Base.length > 2) price += 6
                if(Toppings.length > 4) price += 6
                if(Sauce.length > 2) price += 6
                if(Ingredient.length > 20) price += 6
            }
            setTotalSaladPrice(price)
            setTotalSaladPrice1(price);
            console.log("333: ", totalSaladPrice)
        })()
   
    },[salad_price, Base, Ingredient, totalSaladPrice]);

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


import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import Menu from '../components/Menu'
import masques from '../../assets/images/masques.png'
import { PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
import CommandeInfo from '../components/CommandeInfo'
import Footer from '../components/Footer'
import Button from '../components/Button'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux'
import { clear } from '../Redux/Slices/CartSlice'


const CommandeScreen = ({navigation, route}) => {

    const salad_price = route.params.salad_price;

    useEffect(()=>{

    },[salad_price])

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { Base, Ingredient } = useSelector((state) => state.saladCart);
    
    const [saladData, setSaladData] = useState(null);
    const [total, setTotal] = useState(0);
    const [priceSaladtotal, setPriceSaladtotal] = useState(0);
    const [ checkOutData, setCheckOutData ] = useState(cart);


    useEffect(()=>{

        var saladData = Base.concat(Ingredient)
        setSaladData(saladData)

    }, [Base, Ingredient])

    useEffect(()=>{

    },[total, cart, checkOutData])

    const handleTotal = (value) =>{
        setTotal(value)
    }
    const setTotalSaladPrice = (value) =>{
        setPriceSaladtotal(value)
    }
   
    const handleCheckOut = (data) =>{
        navigation.navigate('cart', data )
    }
    
  return (
    <View style={styles.container}>
        <ImageBackground source={masques} resizeMode={'cover'} style={{flex: 1}}>
        <Menu navigation = {navigation} />
        
        <View style={{padding: 20, flex: 1}}>
            <View style={{flexDirection: 'row', justifyContent:'space-between', marginBottom: 20}}>
                <View style={{...styles.userinfo, width:'65%'}}>
                    <Text style={{color:WHITE, fontWeight:'bold'}}>OTMANE HANNOUNE</Text>
                </View>
                <View style={{...styles.userinfo, width:'30%'}}>
                    <Text style={{color:WHITE, fontWeight:'bold'}}>OTMANE</Text>
                </View>

            </View>

            <View style={{marginBottom: 20}}> 
                {cart.length > 0 || saladData != null ? (
                <>
                    <TouchableOpacity 
                    onPress={()=>{dispatch(clear())}}
                    style={styles.btnClear}
                    >
                        <Text style={{ color: WHITE}}>Clear Products</Text>
                    </TouchableOpacity>

                    {/* <ScrollView > */}
                        <CommandeInfo 
                            products={cart}
                            saladData = {saladData}
                            handleTotal = {handleTotal}
                            salad_price = {salad_price}
                            setTotalSaladPrice1 = {setTotalSaladPrice}
                        />
                    {/* </ScrollView> */}
                </>
                )
                :
                <Text>Noo Data</Text>
                }

               
            </View>

        
        </View>

        <View style={styles.title}>
            <Text style={{color: PRIMARY_COLOR,
                fontSize: 18, fontWeight: 'bold'}}>
                TOTAL: {total + priceSaladtotal} DH
            </Text>
            <Text style={{color: PRIMARY_COLOR,
                fontSize: 15, fontWeight: 'bold'}}>
                LIVRAISON: GRATUIT
            </Text>
        </View>

        <View>
            <Button 
                title='CHECKOUT'
                onPress={()=> {handleCheckOut(checkOutData)}}
            />
        </View>
         <Footer />
        </ImageBackground>
    </View>
  )
}

export default CommandeScreen

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
    title:{
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems:'center', 
        marginBottom: 30,
       
    },
    btnClear:{
        backgroundColor: PRIMARY_COLOR,
        marginBottom: 20,
        padding: 8,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
       
        // width: 200
    }
})
import React , { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import masques from '../../assets/images/masques.png'
import { RadioButton } from 'react-native-paper';
import Button from '../components/Button';
import { LIGHT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from '../constants/StyleColor';
import { useDispatch, useSelector} from 'react-redux';
import { AddOrder, updateSoldVitamix, reset } from '../Redux/Slices/OrderSlice'
import { Get_User } from '../Redux/Slices/UserSlice'
import Feather from 'react-native-vector-icons/Feather'

const PayWith = ({navigation, route}) => {

    const [checked, setChecked] = useState(null)
    const [orderData, setOrderData] = useState(null)
    
    const dispatch = useDispatch()
    const { user, getUser } = useSelector(state => state.user)
    const { isLoading, isError, isSuccess, message } = useSelector(state => state.order)
    const data = route.params.orderData
  

    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", getUser);
    useEffect(()=>{
        const order = data
        const payment = {
        payWith: checked, 
        token: user.token
        };
        const finalResult = Object.assign(order, payment);
        setOrderData(finalResult);
    })

    useEffect(()=>{
        const userData = {
            userId: user._id,
            token: user.token
        }
        dispatch(Get_User(userData))

    },[dispatch])

    useEffect(()=>{
        (async()=>{
            if(isSuccess){
                await dispatch(AddOrder(orderData))
                navigation.navigate('successPage')
            }
            if(isError){
                alert(message.error)
            }
        })()
        
        dispatch(reset())
    }, [isError, isSuccess, message])

    const HandleMakeAnOrder = async() =>{
     
        if(checked == null){
            alert('Choisissez le type de payment')
        }
        if(checked === 'solde vitamix'){
            
            // if(getUser.solde_vitamix < data.totalPrice){
            //     alert('votre solde est insuffisant')
            // }
            // else{
                const dataInfo = {
                    userId: user._id,
                    token: user.token,
                    sumOfPrice: Number(data.totalPrice)
                }
                dispatch(updateSoldVitamix(dataInfo)) 
               
            // }
        }

        if(checked === 'COD'){
            await dispatch(AddOrder(orderData))
            navigation.navigate('successPage')  
        }
      
        
  }

  return (
    <View style={{flex: 1}}>
        <ImageBackground source={masques} style={{flex: 1, padding: 20}}>  
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <Text style={styles.title}>CARTE BANCAIRE</Text>
                    <RadioButton
                        value="cart bank"
                        color={PRIMARY_COLOR} 
                        status={ checked === 'cart bank' ? 'checked' : 'unchecked' } 
                        onPress={() => setChecked('cart bank')}
                    />
                </View>
                {
                    checked === 'cart bank' ? 
                    <Text> {checked} </Text>
                    :
                    null
                }
                <View style={styles.container}>
                    <Text style={styles.title}>COD (Cash on Delivery)</Text>
                    <RadioButton
                        value="COD"
                        color={PRIMARY_COLOR}
                        status={ checked === 'COD' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('COD')}
                    />
                </View>
                {
                    checked === 'COD' ? 
                    <Text> {checked} </Text>
                    :
                    null
                }

                <View style={styles.container}>
                    <Text style={styles.title}>SOLDE VITAMIX</Text>
                    <RadioButton
                        value="solde vitamix"
                        color={PRIMARY_COLOR}
                        status={ checked === 'solde vitamix' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('solde vitamix')}
                    />
                </View>
                {
                    checked === 'solde vitamix' ? 
                    <View style={styles.bodyConatainer}>
                        <Text style={{...styles.title, 
                            textAlign: 'center',
                            marginBottom: 20,
                            fontSize: 18,
                            color: 'white'
                            }}>Solde Disponibl: { getUser != null ? getUser.solde_vitamix: "loading..."}</Text>
                        {
                        getUser == null ? <Text>Loadiing</Text> :
                        
                            getUser.solde_vitamix > data.totalPrice ?
                            <View style={{flexDirection: 'row', padding: 10,borderRadius: 5, justifyContent: 'space-between', backgroundColor: 'white', alignItems: 'center'}}> 
                                <Text style={{
                                    color: LIGHT_COLOR,
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>TOTAL: {data.totalPrice} DH</Text>
                                <Text style={{
                                    color: LIGHT_COLOR,
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>Status:  <Feather name='check-circle' size={20} color={'green'}/></Text>
                            </View>
                            :
                            <>
                            <View style={{padding: 10, borderRadius: 5, backgroundColor: 'white', alignItems: 'center', marginBottom: 5}}> 
                                <Text style={{fontWeight: 'bold'}}>TOTAL: {data.totalPrice} DH</Text>
                            </View>
                            <View style={{padding: 10, borderRadius: 5, backgroundColor: 'white', alignItems: 'center'}}> 
                                <Text style={{fontWeight: 'bold', color: 'red'}}>votre solde est insuffisant</Text>
                            </View>
                            </>
                        }
                        
                    </View>
                    :
                    null
                }
            </View>
            <View>
                <Button 
                    title={!isLoading ? 'Valider': <ActivityIndicator size="large" color={WHITE} />}
                    onPress= {HandleMakeAnOrder}
                />
            </View>
      </ImageBackground>
    </View>
      
  );
}

export default PayWith

const styles = StyleSheet.create({
    container : {
        backgroundColor: 'white',
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 10, 
        padding: 20, 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 3,
    },
    title: {
        fontWeight: 'bold',
        color: LIGHT_COLOR,
        fontSize: 15
    },
    bodyConatainer:{
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: LIGHT_COLOR,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 3,
    }

})
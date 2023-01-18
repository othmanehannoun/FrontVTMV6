import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity, 
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import React,{useEffect, useState} from 'react'
import { LIGHT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from '../constants/StyleColor';
import { useDispatch, useSelector } from 'react-redux'
import {CheckPromoCodeIsValid, reset} from '../Redux/Slices/CodePromoSlice'
import SuccessModal from './Modal/SuccessModal'
import ErrorModal from './Modal/ErrorModal'


const CodePromo = ({navigation, priceToPoint}) => {

    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.user);
    // console.log('-----------------------------');
    // console.log(user);
    const {isLoadingCode, isError, isSuccess, message, data} = useSelector((state) => state.codePromo);
    
    const [codePromo, setCodePromo] = useState(null)
    const [pointFT, setPointFT] = useState(null)
    const [userPoint, setUeserPoint] = useState(user.Point_Fidilite)


    const [visibleSuccess, setVisibleSuccess] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [reqMessage, setReqMessage] = useState(false);


    useEffect(()=>{
       
    },[codePromo, pointFT])

    useEffect(()=>{
        // const resetData = ()=>{
        //     inputs.username_Beneficiary = ''
        //     inputs.userId = ''
        //     inputs.point = null
        // }
      
            if(isSuccess){
                setReqMessage('Code is Valide succès')
                setVisibleSuccess(true)
                // alert('nadiii')
         
              }
              if(isError){
                //console.log("AZERTY", message.error)
                setReqMessage(message.error)
                setVisible2(true)
              }

              dispatch(reset())
        
    }, [isError, isSuccess, message])


    const HandleChangePoint = async()=>{
       
            if(pointFT <= userPoint ){
                // await setUeserPoint(userPoint - pointFT)
                priceToPoint(pointFT)
            }
            else{
                setReqMessage("Vous n'avez pas assez de points")
                setVisible2(true)
            }
        
    }
  return (
        <View>
            <KeyboardAvoidingView style={{flex:1}}>

                <ScrollView>
                    <View style={{backgroundColor: LIGHT_COLOR,  marginBottom: 10, borderRadius: 10, padding: 10}}>
                        <View style={{
                            flexDirection: 'row', 
                            marginBottom: 10, 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                        
                            }}
                        > 
                        <View style={{...styles.codePromoInput, width: '75%',}}>
                            <TextInput
                                style={styles.codePromoText}
                                placeholderTextColor="white"
                                placeholder={"Code Promo"}
                                onChangeText={text => {setCodePromo(text);
                                    
                                }}
                            />
                        </View>

                        <View style={{width: '20%',}}>
                            <TouchableOpacity style={styles.btnInput}
                            onPress={()=>{dispatch(CheckPromoCodeIsValid(codePromo))}}>
                                <Text style={{color: LIGHT_COLOR}}>
                                    {!isLoadingCode ? 'OK' : <ActivityIndicator size="small" color={WHITE} />}
                                </Text>
                            </TouchableOpacity>
                        </View>

                            
                        </View>

                        <View style={{
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            
                            }}
                        > 
                        <View style={{...styles.codePromoInput, width: '75%',}}>
                                <TextInput
                                    style={styles.codePromoText}
                                    keyboardType="number-pad"
                                    placeholderTextColor="white"
                                    placeholder={"Point de Fidilité"}
                                    onChangeText={text => {setPointFT(text);
                                        // text && secondInput.current.focus();
                                    }}
                                />
                        </View>

                        <View style={{width: '20%',}}>
                            <TouchableOpacity style={styles.btnInput}
                            onPress={() => {HandleChangePoint()}}>
                                <Text style={{color: LIGHT_COLOR}}>OK</Text>
                            </TouchableOpacity>
                            
                        </View>

                            
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <SuccessModal 
            visible = {visibleSuccess}
            setVisible = {setVisibleSuccess}
            message = {reqMessage}
            />

            <ErrorModal 
            visible = {visible2}
            setVisible = {setVisible2}
            message = {reqMessage}
            />
        </View>
  )
}

export default CodePromo

const styles = StyleSheet.create({
    btnInput:{
        backgroundColor: WHITE, 
        padding: 10, 
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    codePromoInput: {
        height: 40,
        borderRadius: 5,
        borderColor: WHITE,
        borderWidth: 1,
    },
    codePromoText: {
        color: WHITE,
        fontSize: 15,
    },
  
})


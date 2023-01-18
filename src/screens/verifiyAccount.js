import React, { useEffect, useState, useRef } from 'react'
import {
  SafeAreaView, 
  Image, 
  View, 
  Text, 
  ImageBackground, 
  ActivityIndicator, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput
} from 'react-native'
import masques from '../../assets/images/masques.png'
import lock from '../../assets/images/lock.png'

import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../constants/StyleColor'

import Button from '../components/Button'
import AsyncStorage from "@react-native-async-storage/async-storage";

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import { useDispatch, useSelector } from 'react-redux'
import { VerifyAccount, ResendOTP, reset } from '../Redux/Slices/UserSlice'
import SuccessModal from '../components/Modal/SuccessModal'
import ErrorModal from '../components/Modal/ErrorModal'

const VerifiyAccount = ({navigation}) => {

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [OTP, setOtp] = useState({1: '', 2: '', 3: '', 4: ''});


    const dispatch = useDispatch()
    const {isLoading_S, VerifyError, VerifySuccess, isError_S, isSuccess_S, message, isLoading} = useSelector(state => state.user)

    const [visibleSuccess, setVisibleSuccess] = useState(false);
    const [visibleError, setVisibleError] = useState(false);
    const [reqMessage, setReqMessage] = useState(false);

    const [inputs, setInputs] = useState({
        userId: '',
        email: '',
        otp: ""
    });

  // console.log(inputs)
  const [isErrorTextInput, setIsErrorTextInput] = useState({
    userId : '',
    otp : '',
   
  })
  
  
  const [userId, setUserId] = useState(null);
  const [email, setUserEmail] = useState(null);

  const getDataFromStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("UserVerify");
        if(jsonValue != null){
            const json = await JSON.parse(jsonValue)
            setUserId(json.userId)
            setUserEmail(json.email)
            // setInputs(prev => ({...prev, ['userId']:json.userId}))
            // setInputs(prev => ({...prev, ['email']:json.email}))
        }
        else{
            console.log("ERROR")
        }
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(e);
      }
    };
    
  useEffect(()=>{
      getDataFromStorage()
  },[userId, email])

  const IsObjectValid =(obj) =>{
    return Object.values(obj).every(val => val.trim())
  }

  useEffect(()=>{
      (async()=>{   

        if(!VerifyError && VerifySuccess){
            await AsyncStorage.removeItem("UserVerify");
            setReqMessage("Votre compte a été vérifié")
            await navigation.navigate('Login')
            setVisibleSuccess(true)
        }
        if(VerifyError){
          await setReqMessage(message)
          setVisibleError(true)
          // alert("qq")  
        }
      })()
      dispatch(reset())
  }, [VerifyError, VerifySuccess, message])

  useEffect(()=>{
  
    (async()=>{
      if(isSuccess_S){
        await setReqMessage('Le code a été réinitialisé. vérifier votre boîte de réception')
        setVisibleSuccess(true)
    }
    if(isError_S){
      setReqMessage(message)
      setVisibleError(true)
    }
    })()
   
}, [isError_S, isSuccess_S, isLoading_S])


  const handleVerify = async() =>{
    
    if(IsObjectValid(OTP)){
      let val = '';
      await Object.values(OTP).forEach(v => {
        val += v 
      })
      await setInputs(prev => ({...prev, ['otp']: val}))
      dispatch(VerifyAccount({otp:val, userId, email}))
      
    }
    
  }

  const handleResendOtp = () =>{
        dispatch(ResendOTP({userId, email}))

  }
 
 
  const handlePress = async()=>{
    await AsyncStorage.removeItem("UserVerify");
    navigation.push('Register');
  }
  return (
    <SafeAreaView  style={styles.container}>
        <ImageBackground source={masques} resizeMode={'cover'} style={{flex: 1, padding: 20}}>

          <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20, padding: 20}}>
            <View style={{backgroundColor: '#f6e58d',padding:20, justifyContent: 'center', alignItems: 'center', padding: 30, borderRadius: 100}}>
              {/* <SimpleLineIcons name='lock' size={100} color={'#c7ecee'}/> */}
              <Image source={lock} style={{padding: 20,   width: 100, height: 100}} />
            </View>
          </View>
          <View style={{flex: 1, marginTop: 0}}>
             
              <View style={{marginBottom: 20}}>
                <Text style={{fontWeight: 'bold', fontSize: 25, color: 'black', marginBottom: 10}}>
                    Verification
                </Text>
                <Text style={{marginBottom: 10}}>Entrez l'OTP à partir de l'e-mail qui vient de vous être envoyé à : 
                    <Text style={{color: PRIMARY_COLOR }}>{email}</Text>
                    {/* <Text>{inputs.userId}</Text> */}
                </Text>
                
                <Text style={{color:'black', fontWeight: 'bold'}}>avez-vous entré le bon e-mail ?</Text>
              </View>
              
              <View style={{marginBottom: 10}}>

              {/* <TextInput
                style={styles.input}
                keyboardType="number-pad"
                maxLength={4}
                onFocus={() => handleError(null, 'password')}
                isErrorTextInput= {isErrorTextInput.otp}
                // ref={firstInput}
                onChangeText={text =>{handleOnChange(text, 'otp')}}
              /> */}
               <View style={styles.otpContainer}>
                  <View style={styles.otpBox}>
                    <TextInput
                      style={styles.otpText}
                      keyboardType="number-pad"
                      maxLength={1}
                      ref={firstInput}
                      onChangeText={text => {
                        setOtp({...OTP, 1: text});
                        text && secondInput.current.focus();
                      }}
                    />
                  </View>
                  <View style={styles.otpBox}>
                    <TextInput
                      style={styles.otpText}
                      keyboardType="number-pad"
                      maxLength={1}
                      ref={secondInput}
                      onChangeText={text => {
                        setOtp({...OTP, 2: text});
                        text ? thirdInput.current.focus() : firstInput.current.focus();
                      }}
                    />
                  </View>
                  <View style={styles.otpBox}>
                    <TextInput
                      style={styles.otpText}
                      keyboardType="number-pad"
                      maxLength={1}
                      ref={thirdInput}
                      onChangeText={text => {
                        setOtp({...OTP, 3: text});
                        text ? fourthInput.current.focus() : secondInput.current.focus();
                      }}
                    />
                  </View>
                  <View style={styles.otpBox}>
                    <TextInput
                      style={styles.otpText}
                      keyboardType="number-pad"
                      maxLength={1}
                      ref={fourthInput}
                      onChangeText={text => {
                        setOtp({...OTP, 4: text});
                        !text && thirdInput.current.focus();
                      }}
                    />
                  </View>
               </View>

              </View>

              <View style={{marginBottom: 30, flexDirection: 'row',alignItems: "center"}}>
                    <Text style={{color:'black', fontWeight: 'bold'}}>n'a pas reçu le code: 
                      {/* <Text style={{color:'green'}}> renvoyer le code</Text> */}
                    </Text>
                  
                    {
                        !isLoading_S ? 
                        <TouchableOpacity  onPress={handleResendOtp}>
                            <Text style={{color:PRIMARY_COLOR, fontWeight: 'bold'}}> renvoyer le code</Text> 
                        </TouchableOpacity>
                        : 
                        <ActivityIndicator size="small" color={PRIMARY_COLOR} />
                    }

                    
              </View>
              
              <View style={{marginBottom: 20}}>
                
                <Button 
                    title= {!isLoading ? 'Verifie' : <ActivityIndicator size="large" color={WHITE} />}
                    // title= { 'CONFIRMER' }
                    onPress={handleVerify}
                />
              </View>

              
              <TouchableOpacity
                onPress = {()=>{handlePress()}}
              >
                <Text style={{color: PRIMARY_COLOR, textTransform: 'uppercase',
                    fontSize: 15, fontWeight: 'bold', textAlign:"center"}}>
                      créer un nouvelle compte 
                </Text> 
              </TouchableOpacity>

          </View>

           
        </ImageBackground>

        <SuccessModal 
         visible = {visibleSuccess}
         setVisible = {setVisibleSuccess}
         message = {reqMessage}
        />

        <ErrorModal 
          visible = {visibleError}
          setVisible = {setVisibleError}
          message = {reqMessage}
        />
    </SafeAreaView >
  )
}

export default VerifiyAccount

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: LIGHT_COLOR,
    padding: 10,
  },
  
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: PRIMARY_COLOR,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: PRIMARY_COLOR,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
})
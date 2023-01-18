import React, { useEffect, useState } from 'react'
import {SafeAreaView, ScrollView, View, Text, ImageBackground, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native'
import Header from '../components/Header'
import masques from '../../assets/images/masques.png'
import { windowHeight, windowWidth } from '../constants/Demonsions'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
import Input from '../components/Input'
import Button from '../components/Button'
import SocialButton from '../components/SocialButton'

import { useDispatch, useSelector } from 'react-redux'
import { Login, reset } from '../Redux/Slices/UserSlice'

import PushNotification from "react-native-push-notification";


const LoginScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const {user, isError, isSuccess, message, isLoading} = useSelector(state => state.user)

  const [inputs, setInputs] = useState({
    email : '',
    password : '',
  });

  const [isErrorTextInput, setIsErrorTextInput] = useState({
    email : '',
    password : '',
   
  })
  const [hiddenpassword, setHiddenPassword] = useState(true)

  useEffect(()=>{
    createChannels();
  },[])

  const createChannels = () =>{
    PushNotification.createChannel({
      channelId: "test-channel",
      channelName: "test your channel"
    })
  }
  useEffect(()=>{

    if(user || isSuccess){
      console.log('Success')
    }
    if(isError){
      const HandleMessage = JSON.stringify(message)
      alert(HandleMessage)
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message])
  

  const checkValidate = () =>{
    if(!inputs.email){
      handleError('Veuillez entrer votre Email', 'email')
      return false
    }
    else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("format incorrect votre adresse e-mail", 'email');
      return false
    }

    if(!inputs.password){
      handleError('Veuillez saisir votre mot de passe', 'password')
      return false
    }

    else { 
      return true
    }
  }

  const handelValidate = () =>{
    if(checkValidate()){
      dispatch(Login(inputs))
    }
    else{
      console.log('HONAAALIKA AMROOON MAAAA');
    }
  }

  const handleOnChange = (text, input) =>{
    setInputs(prev => ({...prev, [input]:text}))
  }
  
  const handleError = (error, input) =>{
    setIsErrorTextInput((prev) => ({...prev, [input]:error}))
  }
  
  return (
    <SafeAreaView  style={styles.container}>
        <ImageBackground source={masques} resizeMode={'cover'} style={{flex: 1}}>

          <View style={{height:windowHeight*0.3}}>
            <Header />
          </View>
          
           <ScrollView 
            style={{paddingHorizontal: 20}}
            >
              {Platform.OS === 'android' ? (
                <View style={{flexDirection: 'row', justifyContent:'space-between', paddingVertical: 20}}>
                  <SocialButton
                    buttonTitle="Sign In with Facebook"
                    btnType="facebook"
                    color="#4867aa"
                    backgroundColor="#e6eaf4"
                    // onPress={() => fbLogin()}
                  />

                  <SocialButton
                    buttonTitle="Sign In with Google"
                    btnType="google"
                    color="#de4d41"
                    backgroundColor="#f5e7ea"
                    // onPress={() => googleLogin()}
                  />
                </View>
              ) : null}
          
             <View style={{marginBottom: 30}}>

              <Input
                  onChageText= {text =>{handleOnChange(text, 'email')}}
                  placeholder= "Adresse E-mail"
                  onFocus={() => handleError(null, 'email')}
                  isErrorTextInput= {isErrorTextInput.email}
               />

               <Input 
                  onChageText= {text =>{handleOnChange(text, 'password')}}
                  placeholder= "mot de passe"
                  onFocus={() => handleError(null, 'password')}
                  isErrorTextInput= {isErrorTextInput.password}
                  password
               />
              </View>

              <View style={{marginBottom: 20}}>
               
                  <Button 
                    title= {!isLoading ? 'CONFIRMER' : <ActivityIndicator size="large" color={PRIMARY_COLOR} />}
                    onPress={handelValidate}
              />
               </View>
              <View style={{justifyContent:'center',
                    alignItems: 'center',
                    }}>
                <TouchableOpacity>
                  <Text style={{color: PRIMARY_COLOR, marginBottom: 30,
                        fontSize: 18, fontWeight: 'bold'}}>
                        Mot de passe oublié ?
                  </Text>
                </TouchableOpacity>

                <View style={{flexDirection:'row', 
                      justifyContent:'center', 
                      alignItems:'center',
                      marginBottom: 30
                    }}
                >
                  <View style={{backgroundColor:LIGHT_COLOR,
                        width:'40%', height:'5%', 
                        marginRight: 10
                      }}
                  >
                  </View>

                  <View>
                    <Text style={{color: PRIMARY_COLOR,
                        fontSize: 18, fontWeight: 'bold'}}>
                        OU
                    </Text>
                  </View>

                  <View style={{backgroundColor: LIGHT_COLOR,
                        width:'40%', height:'5%', 
                        marginLeft: 10}}
                  >
                  </View>

                </View>
                <TouchableOpacity
                onPress = {()=>{navigation.navigate('Register')}}
                >
                  <Text style={{color: PRIMARY_COLOR, textTransform: 'uppercase',
                      fontSize: 18, fontWeight: 'bold'}}>
                        créer un compte 
                    </Text> 
                </TouchableOpacity>
                
              </View>
           </ScrollView>

           {/* <Footer /> */}
           
        </ImageBackground>
      </SafeAreaView >
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  
  socialView:{
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    width: windowWidth*0.25
  },
  detailsSocial:{
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent:'center',
    alignItems:'center'
  },
  btnSocailMedia:{
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: '48%',
    justifyContent:'center',
    alignItems:'center'
  }
})
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  KeyboardAvoidingView, 
  ScrollView, 
  View,
  ImageBackground, 
  ActivityIndicator,
  TouchableOpacity, 
  StyleSheet
} from 'react-native'
import Header from '../components/Header'
import masques from '../../assets/images/masques.png'
import { windowHeight, windowWidth } from '../constants/Demonsions'
import { useDispatch, useSelector } from 'react-redux'
import { InsertUser, reset } from '../Redux/Slices/UserSlice'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SocialButton from '../components/SocialButton'
import ErrorModal from '../components/Modal/ErrorModal'

import Input from '../components/Input'
import Button from '../components/Button'
import { WHITE } from '../constants/StyleColor'


const SinupScreen = ({navigation}) => {

  const [visible2, setVisible2] = useState(false);
  const [reqMesage, setReqMessage] = useState(false);

  const dispatch = useDispatch()
  const {isError, isSuccess, message, isLoading} = useSelector(state => state.user)

  const [inputs, setInputs] = useState({
    name : '',
    phone : '',
    email : '',
    password : '',
    confirmPass : '',
  });
 
  const [isErrorTextInput, setIsErrorTextInput] = useState({
    name : '',
    phone : '',
    email : '',
    password : '',
    confirmPass : '',
  })

  useEffect(()=>{

    ( async()=>{
      if(!isError && isSuccess){
        // setReqMessage(message)
        // setVisible1(true)
        navigation.push('verifiyAccount')
      }
  
      if(isError){
        setReqMessage(message.error)
        setVisible2(true)
      }
    })()

    dispatch(reset())

  }, [isError, isSuccess, message])


  const checkValidate = () =>{
    if(!inputs.name){
      handleError("Veuillez votre Nom d'Utilisateur", 'name')
      return false
    }
    if(!inputs.phone){
      handleError('Veuillez entrer votre téléphone', 'phone')
      return false
    }
    if(!inputs.email){
      handleError('Veuillez entrer votre Email', 'email')
      return false

    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("format incorrect votre adresse e-mail", 'email');
      return false
    }

    if(!inputs.password){
      handleError('Veuillez saisir votre mot de passe', 'password')
      return false
    }
    if(!inputs.confirmPass){
      handleError('Veuillez saisir la confirmation mot de passe', 'confirmPass')
      return false
    }
    if(inputs.confirmPass !== inputs.password){
      // alert("Les mots de passe ne correspondent pas")
      setReqMessage("Les mots de passe ne correspondent pas")
      setVisible2(true)
      return false
    }

    else{
      return true
    }
  }


  const handelValidate = async() =>{

    if(checkValidate()){
      dispatch(InsertUser(inputs))
    }
    else{
      console.log('Remplire tout les chomps');
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

          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal:20
          }}>
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
        </View>

          <KeyboardAvoidingView style={{flex:1}}>

           <ScrollView 
            style={{paddingHorizontal: 20}}
           >
           <View style={{marginBottom: 10}}>

              <Input
                onChageText= {text =>{handleOnChange(text, 'name')}}
                placeholder= "Nom d'Utilisateur"
                isErrorTextInput= {isErrorTextInput.name}
                onFocus={() => handleError(null, 'name')}
              />
              {/* <Input 
                onChageText= {text =>{handleOnChange(text, 'prenom')}}
                placeholder= "Prénom"
              /> */}
              <Input 
                onChageText= {text =>{handleOnChange(text, 'phone')}}
                placeholder= "Téléphone"
                isErrorTextInput= {isErrorTextInput.phone}
                onFocus={() => handleError(null, 'phone')}
              />
              <Input 
                onChageText= {text =>{handleOnChange(text, 'email')}}
                placeholder= "Email"
                isErrorTextInput= {isErrorTextInput.email}
                onFocus={() => handleError(null, 'email')}

              />
               <Input 
                onChageText= {text =>{handleOnChange(text, 'password')}}
                placeholder= "mot de passe"
                isErrorTextInput= {isErrorTextInput.password}
                onFocus={() => handleError(null, 'password')}
                password
              />
              <Input 
                onChageText= {text =>{handleOnChange(text, 'confirmPass')}}
                placeholder= "confirme mot de passe"
                isErrorTextInput= {isErrorTextInput.confirmPass}
                onFocus={() => handleError(null, 'confirmPass')}
                password
              />
            
              </View>

              <View style={{marginTop: 20}}>
               
                 <Button 
                  title= {!isLoading ? 'CONFIRMER' : <ActivityIndicator size="large" color={WHITE} />}
                  onPress={handelValidate}
                />
               
              </View>
            
           </ScrollView>
           </KeyboardAvoidingView>

         {/* <Footer /> */}
      </ImageBackground>

        <ErrorModal 
          visible = {visible2}
          setVisible = {setVisible2}
          message = {reqMesage}
        />
    </SafeAreaView >
  )
}

export default SinupScreen

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
























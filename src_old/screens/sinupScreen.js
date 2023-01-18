import React, { useEffect, useState } from 'react'
import {SafeAreaView,KeyboardAvoidingView, ScrollView, View, Text, ImageBackground, TextInput,TouchableOpacity, StyleSheet} from 'react-native'
import Header from '../components/Header'
import masques from '../../assets/images/masques.png'
import { windowHeight, windowWidth } from '../constants/Demonsions'
import { useDispatch, useSelector } from 'react-redux'
import { InsertUser, reset } from '../Redux/Slices/UserSlice'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from '../components/Input'
import Button from '../components/Button'
// import Footer from '../components/Footer'


const SinupScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const {user, isError, isSuccess, message, isLoading} = useSelector(state => state.user)

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

    if(!isError && isSuccess){
      alert('Success')
      navigation.navigate('Login')   
    }

    if(isError){
      const HandleMessage = JSON.stringify(message)
      alert(HandleMessage)
    }

    dispatch(reset())

    console.log(user, isError, isSuccess, message)
  }, [user, isError, isSuccess, message])


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
      alert("Les mots de passe ne correspondent pas")
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

          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding:20
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={styles.btnSocailMedia}>
            <FontAwesome name="google" size={24} color={'green'} />
           {/* <Text> google</Text> */}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            style={styles.btnSocailMedia}>
            <FontAwesome name="facebook" size={24} color={'blue'} />
            {/* <Text>facebook</Text> */}
          </TouchableOpacity>
        
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
               {
                 isLoading ? 
                 <Text>Loading ...</Text>
                 :
                 <Button 
                  title='CONFIRMER ..'
                  onPress={handelValidate}
                />
               }
              </View>
            
           </ScrollView>
           </KeyboardAvoidingView>

         {/* <Footer /> */}
      </ImageBackground>
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
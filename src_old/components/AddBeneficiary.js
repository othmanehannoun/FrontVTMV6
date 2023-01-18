import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View,Modal,TextInput,TouchableWithoutFeedback, ImageBackground } from 'react-native'
import { PRIMARY_COLOR } from '../../constants/StyleColor'
import Button from '../components/Button'
import Input from '../components/Input'
import masques from '../../assets/images/masques.png'


import { useDispatch, useSelector } from 'react-redux'
import { AddNew_Beneficiary, reset} from '../Redux/Slices/TransferSlice'


const AddBeneficiary = ({navigation}) => {

  // console.log(navigation);
  const dispatch = useDispatch()
  const {isLoading, isError, isSuccess_b, message} = useSelector(state=>state.transfer)
  const { user } = useSelector(state=>state.user)

    const [inputs, setInputs] = useState({
      id_user_beneficiary: "",
      username_Beneficiary: "",
      userId: user._id
    });

    const [isErrorTextInput, setIsErrorTextInput] = useState({
      username_Beneficiary : '',
      id_user_beneficiary : '',
    })

    const handleOnChange = (text, input) =>{
        setInputs(prev => ({...prev, [input]:text}))
      }
      
      const handleError = (error, input) =>{
        setIsErrorTextInput((prev) => ({...prev, [input]:error}))
      }

      const checkValidate = () =>{
        if(!inputs.username_Beneficiary){
          handleError('Veuillez entrer votre username', 'username_Beneficiary')
          return false
        }
        if(!inputs.id_user_beneficiary){
          handleError('Veuillez saisir votre id de beneficiary', 'id_user_beneficiary')
          return false
        }
    
        else { 
          return true
        }
      }

      // useEffect(()=>{
      //      dispatch(reset());

      // }, [dispatch])

      useEffect(()=>{
        ( async()=>{
         await dispatch(reset())
          if(isSuccess_b){
              alert('Ajouter new bénéficiare Success')
              navigation.navigate('TRENFERT DE FONDS')
              // setIsOpenedModalAdd(false)
          }
          if(isError){
            alert(message)
          }
          })()
       
    }, [isError, isSuccess_b, message, dispatch])

      const handelValidate = async() =>{
        if(checkValidate()){
            await dispatch(AddNew_Beneficiary(inputs))
        }
        else{
          console.log('HONAAALIKA AMROOON MAAAA');
        }
      }


    return (
        <View style={{flex: 1}}>
        {/* <TouchableWithoutFeedback
          onPress={() => {
            setIsOpenedModalAdd(false);
          }}
        > */}
          <ImageBackground source={masques} resizeMode={'cover'} style={{flex: 1}} >

          <View style={styles.modalContainer}>

              <View style={styles.centeredView}>
                    
              <View style={{marginBottom: 30}}>

              <Input
                  onChageText= {text =>{handleOnChange(text, 'username_Beneficiary')}}
                  placeholder= "Nom d'utilisateur"
                  onFocus={() => handleError(null, 'username_Beneficiary')}
                  isErrorTextInput= {isErrorTextInput.username_Beneficiary}
              />

              <Input 
              style={{color:'red'}}
                  onChageText= {text =>{handleOnChange(text, 'id_user_beneficiary')}}
                  placeholder= "ID d'utilisateur"
                  onFocus={() => handleError(null, 'id_user_beneficiary')}
                  isErrorTextInput= {isErrorTextInput.id_user_beneficiary}
              />
              </View>

              <Button 
              title={!isLoading ? 'Ajouter' : 'Loading ...'}
              onPress={handelValidate}/>
                          
                      
              </View>
              </View>
          </ImageBackground>
           {/* <View style={{
            flex : 1,
            backgroundColor: "#000000AF",
            }}>

            
          </View> */}
        {/* </TouchableWithoutFeedback> */}
      </View>
    )
}

export default AddBeneficiary

const styles = StyleSheet.create({
    //------------------ Modal -------------------------
  modalButtons: {
    backgroundColor: 'red',
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 10,
  },

  modalContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 0,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: 'white',
  },
//   centredModel: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#00000070",
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     justifyContent: "flex-end"
//   },

})

import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View,Modal,TextInput,TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { PRIMARY_COLOR, WHITE } from '../../constants/StyleColor'
import Button from '../Button'
import Input from '../Input'

// import axios from "axios";
// import { endPoint } from "../../constants/GlobaleVariables";

import { useDispatch, useSelector } from 'react-redux'
import { AddNew_Beneficiary, reset} from '../../Redux/Slices/TransferSlice'
import SuccessModal from './SuccessModal'
import ErrorModal from './ErrorModal'

const ModalAddBeneficiary = ({navigation, isOpenedModalAdd, setIsOpenedModalAdd, userID}) => {

  // const [visible1, setVisible1] = useState(false);
  // const [visible2, setVisible2] = useState(false);
  // const [reqMesage, setReqMesage] = useState(false);

  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [reqMessage, setReqMessage] = useState(false);

  // console.log(navigation);
  const dispatch = useDispatch()
  const {isLoading, isError_b, isSuccess_b, message} = useSelector(state=>state.transfer)

    const [inputs, setInputs] = useState({
      id_user_beneficiary: "",
      username_Beneficiary: "",
      userId: userID
    });

    const [isErrorTextInput, setIsErrorTextInput] = useState({
      id_user_beneficiary : '',
      username_Beneficiary : '',
    })

    const handleOnChange = (text, input) =>{
        setInputs(prev => ({...prev, [input]:text}))
      }
      
      const handleError = (error, input) =>{
        setIsErrorTextInput((prev) => ({...prev, [input]:error}))
      }

      const checkValidate = () =>{
        if(!inputs.username_Beneficiary){
          handleError("Veuillez entrer votre Nom d'utilisateur", 'username_Beneficiary')
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

      useEffect(()=>{
       
        if(isSuccess_b){
          const resetData = ()=>{
              inputs.id_user_beneficiary = "",
              inputs.username_Beneficiary = ""
          }
            
            setReqMessage('Ajouter new bénéficiare Success')
            setVisibleSuccess(true)
            setIsOpenedModalAdd(false)
            resetData()
            
        }
        if(isError_b){
            setReqMessage(message)
            setVisible2(true)
        }
        dispatch(reset())
    }, [isError_b, isSuccess_b, message, dispatch])

     

      const handelValidate = async() =>{
        if(checkValidate()){
            dispatch(AddNew_Beneficiary(inputs))
        }
        else{
          console.log('HONAAALIKA AMROOON MAAAA');
        }
      }


    return (
      <>
     
        <Modal
            visible={isOpenedModalAdd}
            transparent
            onRequestClose={() => setIsOpenedModalAdd(false)}
        >
        <TouchableWithoutFeedback
          onPress={() => {
            setIsOpenedModalAdd(false);
          }}
        >
            <View style={{
              flex : 1,
              backgroundColor: "#000000AF",
              justifyContent: 'flex-end'
              }}
            >

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
                  title={!isLoading ? 'Ajouter' : <ActivityIndicator size="small" color={WHITE} /> }
                  onPress={handelValidate}/>
                              
                          
                  </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
        </Modal>

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

      </>
    )
}

export default ModalAddBeneficiary

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

})

import { StyleSheet, Text, View, ImageBackground,TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import masques from '../../assets/images/masques.png'
import transferLogo from  '../../assets/images/transferLogo.png'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
import { windowHeight, windowWidth } from '../constants/Demonsions'
import Footer from '../components/Footer'


import { useDispatch, useSelector } from 'react-redux'
import { Trasfer_Point, Get_Beneficiary, reset } from '../Redux/Slices/TransferSlice'
import ModalChooseBeneficiary from '../components/Modal/ModalChooseBeneficiary'
import ModalAddBeneficiary from '../components/Modal/ModalAddBeneficiary'
import PushNotification from "react-native-push-notification";

import io from 'socket.io-client';

const FundsTransfer = ({navigation}) => {

    const [notification, setNotification] = useState(null)
    const socket = io('http://192.168.0.133:3001', { transports: ['websocket'] });

    const handleNotification = (title, message) =>{
        PushNotification.localNotification({

          channelId: "test-channel",
          title: "My Notification Title", // (optional)
          message: notification.name + " " + "vous a envoyé 120 points", // (required)

        });
    }


    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)
    // const parseUser = JSON.parse(user)
    const {Beneficiary, isSuccess, isLoading, message, isError} = useSelector(state=>state.transfer)
    
    // console.log(Beneficiary)
    // const [data, setData] = useState(Beneficiary);
    const [itemData, setItemData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const [isOpenedModalChoose, setIsOpenedModalChoose] = useState(false);
    const [isOpenedModalAdd, setIsOpenedModalAdd] = useState(false);

    const onRefresh = async () => {
        setIsFetching(true);
        await dispatch(Get_Beneficiary(user._id));
        setIsFetching(false);
    };

    const [inputs, setInput] = useState({
        username_Beneficiary: '',
        userId: itemData ? itemData.id_user_beneficiary : null,
        userIdFROM: user._id,
        userNameFrom: user.name,
        point: null
    })

    // useEffect(()=>{
    //     console.log("Beneficiary", Beneficiary);
    // }, [Beneficiary]);

    useEffect(()=>{
        dispatch(Get_Beneficiary(user._id))
    }, [dispatch])

    useEffect(()=>{
        // console.log(inputs)
     },[inputs])
     

    const handleItem = async(itemData) =>{
        await setInput((prev)=>({...prev, ['userId']: itemData.id_user_beneficiary}))
        setInput((prev)=>({...prev, ['username_Beneficiary']: itemData.username_Beneficiary}))

    }

    useEffect(() => {
        ( async()=>{

            socket.emit("joinNotificationRoom", user._id);
  
            socket.on('newFriendRequest', (data)=>{
               // console.log('hadi hiya ntii:', data)
                setNotification(data)
            })

            notification == null ?
            null 
            :

            await handleNotification()
            // await alert(notification.name + " " + "vous a envoyé 120 points")
            setNotification(null)

            // if(notification == null){
            //      return; 
            // }
            // else{
            //     alert("Rah" + " " + notification.name + " " + "sayfat lik POINT");
            // }

        })();
        
        
  
      }, [])


    useEffect(()=>{

      
            if(isSuccess){
                 alert('Success')
                 socket.emit('sendFriendReques', inputs)

                // inputs.username_Beneficiary = ''
                // inputs.userId = ''
                // inputs.point = null
              }
              if(isError){
                alert(message)
              }

              dispatch(reset())
        
    }, [isError, isSuccess, message])

    

    const handleOnChange = (text, input) =>{  
        setInput((prev)=>({...prev, [input]: text}))
    }
    // const handleError = (error, input) =>{
    //     setIsErrorTextInput((prev) => ({...prev, [input]:error}))
    // }
    
    const checkValidate = () =>{
    
    if(!inputs.userId){
        alert('User id NULL')
        return false
    }
    if(!inputs.point){
        alert('Point_Fidilite NULL')
        return false
    }
    if(isNaN(inputs.point)){
        alert('Please enter Numeric value')
        return false
    }

    else{
        return true
    }
    }

    const handlePress = async () =>{
        if(checkValidate()){
            dispatch(Trasfer_Point(inputs))
        }
    }

    
  return (
    <View style={styles.container}>
        <ImageBackground source={masques} resizeMode={'cover'} style={{flex: 1}} >
          <View style={styles.ViewId}>
            <Text style={{
                color: WHITE,
                fontWeight: 'bold',
                fontSize: 20
            }}>ID : 123456789</Text>

            {
              notification == null ?
              <Text> No Notification </Text>
              :
              <>
                <Text>Rah {notification.name} sayfat lik POINT</Text>
              </>
            }

          </View>
          <KeyboardAvoidingView style={{flex: 1}}  behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView styles={{}}>
                <View style={styles.logoImage}>
                    <Image source={transferLogo} style={{width: 120, height: 150}}/>
                    <Text style={{
                        color: PRIMARY_COLOR,
                        fontSize: 25,
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                    }}>Transfert de fonts</Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal: 20}}>
                    <TouchableOpacity 
                    style={styles.button1}
                    onPress={()=>{setIsOpenedModalChoose(true)}}
                    >
                      <Text style={styles.buttonText1}>
                        Choisissez votre bénéficiaire
                      </Text>
                    </TouchableOpacity>

                    <ModalChooseBeneficiary 
                        navigation = {navigation}
                        isOpenedModalChoose ={isOpenedModalChoose}
                        setIsOpenedModalChoose= {setIsOpenedModalChoose}
                        data  = {Beneficiary}
                        setItemData = {handleItem}
                        onRefresh={onRefresh}
                        isFetching={isFetching}
                        
                        
                    />
                    <ModalAddBeneficiary 
                        navigation = {navigation}
                        isOpenedModalAdd ={isOpenedModalAdd}
                        setIsOpenedModalAdd= {setIsOpenedModalAdd}
                        userID = {user._id}
                    />

                    <TouchableOpacity style={styles.button1}
                     onPress={ async()=>{setIsOpenedModalAdd(true)}}
                    //  onPress={ ()=>{ navigation.navigate('addBeneficiary') }}
                    >
                      <Text style={styles.buttonText1}>
                       Ajouter un bénéficiaire
                      </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputForm}>
                    <View style={styles.inputContainer}>
                        <View style={{width: '50%', marginTop: 5}}>
                            <Text style={styles.textInput}>ID d'utilisateur</Text>
                        </View>
                        <View style={{width:'50%'}}>
                        <TextInput
                            style={{...styles.input, fontSize:10}}
                            value={inputs.userId}
                            // editable={false}
                            // selectTextOnFocus={false}
                            // onChangeText= {text =>{handleOnChange(text, 'userId')}}
                        />
                        </View>
                    </View>

                    <View style={styles.inputContainer} >
                        <View style={{width: '50%', marginTop: 5}}>
                            <Text style={styles.textInput}>Nom d'utilisateur</Text>
                        </View>
                        <View style={{width:'50%'}}>
                            <TextInput
                            value={inputs.username_Beneficiary}
                                style={styles.input}
                                editable={false}
                                selectTextOnFocus={false}
                                // onChangeText= {text =>{handleOnChange(text, 'id_user')}}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={{width: '50%', marginTop: 5}}>
                            <Text style={styles.textInput}>Nembre PT</Text>
                        </View>
                        <View style={{width:'50%'}}>
                            <TextInput
                                style={styles.input}
                                value={inputs.point}
                                keyboardType = 'number-pad'
                                onChangeText= {text =>{handleOnChange(text, 'point')}}
                               
                            />
                        </View>
                    </View>

                </View>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={styles.button} 
                     onPress={()=>{handlePress()}}
                    >
                      <Text style={styles.buttonText}>
                          {
                              !isLoading ?
                              'Envoyer'
                              :
                              'Loading ...'
                          }
                      </Text>
                    </TouchableOpacity>
                </View>
          
            </ScrollView>
            
          </KeyboardAvoidingView>
          
          <Footer />
        </ImageBackground>
      
    </View>
  )
}

export default FundsTransfer

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    ViewId:{
        backgroundColor: LIGHT_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    logoImage:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    inputForm:{
        padding: 20
    },
    inputContainer:{
        flexDirection: 'row',
        backgroundColor: LIGHT_COLOR,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10
    },
    textInput:{
        fontWeight: 'bold',
        fontSize: 15,
        color: WHITE
    },
    input: {
        padding: 0,
        borderBottomWidth: 2,
        borderBottomColor: WHITE,
        color: WHITE,
        fontSize: 20,
        height: 35,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: WHITE,
        borderRadius: 10,
        paddingVertical: 10,
        width: windowWidth / 2
      },
      button1: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: WHITE,
        borderRadius: 10,
        paddingVertical: 5,
        width: '45%'
      },
      buttonText: {
        color: LIGHT_COLOR,
        fontSize: 20,
        fontWeight: "bold",
      },
      buttonText1: {
        color: LIGHT_COLOR,
        fontSize: 15,
        fontWeight: "bold",
      },
})



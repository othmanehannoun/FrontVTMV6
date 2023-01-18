import React,{useEffect, useState} from 'react'
import {
  StyleSheet, 
  Text, 
  View,
  Modal,
  SafeAreaView, 
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Get_Beneficiary} from '../../Redux/Slices/TransferSlice'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../../constants/StyleColor'

const ModalChooseBeneficiary = ({isOpenedModalChoose, setIsOpenedModalChoose, data, setItemData, onRefresh, isFetching }) => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.user)
  const [refreshing, setRefreshing] = React.useState(false);
  // const parseUser = JSON.parse(user)
  const {Beneficiary} = useSelector(state=>state.transfer)

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const onRefresh2 = React.useCallback(() => {
    setRefreshing(true);
    dispatch(Get_Beneficiary(user._id));
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(()=>{
    console.log("Beneficiary22: ", Beneficiary);
  }, [Beneficiary])

  
  useEffect(()=>{
    dispatch(Get_Beneficiary(user._id))
  }, [dispatch])


    const handleSetItem = async(data)=>{
        await setItemData(data)
        setIsOpenedModalChoose(false)
    }

        const renderItem = ({ item }) => (
            <TouchableOpacity style={styles.item}
              onPress = {()=>{handleSetItem(item)}}>
              <Text style={styles.title}>{item.username_Beneficiary}</Text>
              <Text style={styles.title}>{item.id_user_beneficiary}</Text>
            </TouchableOpacity>
            
        );
    return (
        <Modal
            visible={isOpenedModalChoose}
            transparent
            onRequestClose={() => setIsOpenedModalChoose(false)}
        >

           <View style={{
            flex : 1,
            backgroundColor: "#000000AF",
            justifyContent: 'flex-end',
            
            }}>

            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={{marginBottom: 10, marginLeft: "auto"}}
                onPress={() => {
                  setIsOpenedModalChoose(false);
                }}
              >
                  <Fontisto name='close' size={25} color={'#ee5253'}/>
              </TouchableOpacity>
              <View style={styles.centeredView}>

                
                  <SafeAreaView style={styles.container}>
                  {
                  Beneficiary.length == 0 ?
                    <ScrollView
                      contentContainerStyle={styles.scrollView}
                      refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh2} />
                      }
                    >
                      <Text>Vous n'avez pas de bénéficiaire</Text> 

                      <Text>Pull to Refresh</Text>
                    </ScrollView>
                     :
                     
                  
                    <FlatList
                          data={Beneficiary}
                          renderItem={renderItem}
                          keyExtractor={(item, index) => index}
                          onRefresh={onRefresh}
                          refreshing={isFetching}
                    />
                  }
                  </SafeAreaView>
                 
                        
              </View>
            </View>
          </View>
      </Modal>
    )
}

export default ModalChooseBeneficiary

const styles = StyleSheet.create({
  container:{
    // flex: 1,
    // backgroundColor: 'green',
    paddingVertical: 10,
    height: "auto"
  },
  modalButtons: {
    backgroundColor: 'red',
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 10,
  },

  modalContainer: {
    padding: 20,
    borderRadius: 0,
    backgroundColor: WHITE,
    height: "75%",
   
  },
  item:{
    backgroundColor: WHITE,
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10
},
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: LIGHT_COLOR
  },

})

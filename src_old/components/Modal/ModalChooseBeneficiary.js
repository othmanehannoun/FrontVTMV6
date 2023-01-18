import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View,Modal,SafeAreaView, FlatList,TouchableWithoutFeedback,TouchableOpacity } from 'react-native'

import { PRIMARY_COLOR, WHITE } from '../../constants/StyleColor'

const ModalChooseBeneficiary = ({isOpenedModalChoose, setIsOpenedModalChoose, data, setItemData, onRefresh, isFetching }) => {
    
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
            style={{marginBottom: 20}}
             onPress={() => {
                setIsOpenedModalChoose(false);
              }}
            >
                <Text>CLOSE</Text>
            </TouchableOpacity>
            <View style={styles.centeredView}>

            <SafeAreaView style={styles.container}>
            <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index}
                  onRefresh={onRefresh}
                  refreshing={isFetching}
              />
            </SafeAreaView>
                        
             </View>
            </View>
          </View>
      </Modal>
    )
}

export default ModalChooseBeneficiary

const styles = StyleSheet.create({
  // container:{
  //   backgroundColor: 'red' 
  // },
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
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     justifyContent: "flex-end"
//   },

})

import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../../constants/Demonsions'
import pollo from '../../../assets/images/calzon/Pollo.jpg'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../../constants/StyleColor'

const ListItem = () => {
  return (
      <>
      <ScrollView style={{height: windowHeight * 0.5}}>
        <View style={styles.container}>

            <View style={styles.box}>
                <View style={styles.item}>
                    <Image source={pollo} style={{height: 80, width: '100%', borderRadius:10}}/>
                </View>
            </View>

            <View style={{...styles.box}}>
                <View style={styles.item}>
                    <Text style={styles.Item_namePrice}>Friend fish</Text>
                    <Text style={styles.Item_description}>Salmon, cabbage, tomato, sesame seeds</Text>
                    <Text style={styles.Item_namePrice}>AED 34.00</Text>
                </View>
            </View>

            <View style={{...styles.box}}>
                <View style={{...styles.item, justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.titleAdd}>Add + </Text>
                </TouchableOpacity>
                </View>
            </View>

        </View>

        <View style={styles.container}>

            <View style={styles.box}>
                <View style={styles.item}>
                    <Image source={pollo} style={{height: 80, width: '100%', borderRadius:10}}/>
                </View>
            </View>

            <View style={{...styles.box}}>
                <View style={styles.item}>
                    <Text style={styles.Item_namePrice}>Friend fish</Text>
                    <Text style={styles.Item_description}>Salmon, cabbage, tomato, sesame seeds</Text>
                    <Text style={styles.Item_namePrice}>AED 34.00</Text>
                </View>
            </View>

            <View style={{...styles.box}}>
                <View style={{...styles.item, justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.titleAdd}>Add + </Text>
                </TouchableOpacity>
                </View>
            </View>

        </View>


        <View style={styles.container}>
            <View style={styles.box}>
            <View style={styles.item}>
                <Image source={pollo} style={{height: 80, width: '100%', borderRadius:10}}/>
            </View>
            </View>

            <View style={{...styles.box}}>
            <View style={styles.item}>
                <Text style={styles.Item_namePrice}>Friend fish</Text>
                <Text style={styles.Item_description}>Salmon, cabbage, tomato, sesame seeds</Text>
                <Text style={styles.Item_namePrice}>AED 34.00</Text>
            </View>
            </View>

            <View style={{...styles.box}}>
            <View style={{...styles.item, justifyContent:'center',alignItems:'center'}}>

                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.titleAdd}>Add + </Text>
                </TouchableOpacity>
            
            </View>
            </View>
        </View>

      </ScrollView>
      </>
   
  )
}

export default ListItem

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent:'center',
        alignItems:'center',
        marginBottom: 10,
    },
    box:{
        width: '33.33%',
        padding: 5,
    },
   
    Item_namePrice:{
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginBottom: 5
    },
    Item_description:{
        color: PRIMARY_COLOR,
        fontSize: 8,
        marginBottom: 5
    },
    addButton:{
        flexDirection:'row',
        backgroundColor:LIGHT_COLOR,
        width:'70%', 
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center'
    },
    titleAdd:{
        color:WHITE, 
        fontWeight:'bold'
    }
})
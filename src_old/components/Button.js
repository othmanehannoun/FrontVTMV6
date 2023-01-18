import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import { PRIMARY_COLOR, WHITE } from '../constants/StyleColor'
import { windowWidth } from '../constants/Demonsions'

const Button = ({title, onPress}) => {

  return (
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity style={styles.button} 
             onPress={onPress}
            >
            <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 50,
        paddingVertical: 6,
        width: windowWidth*0.6
      },
      buttonText: {
        color: WHITE,
        fontSize: 20,
        fontWeight: "bold",
      },
})
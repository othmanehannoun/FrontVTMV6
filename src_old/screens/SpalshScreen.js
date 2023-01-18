import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const SpalshScreen = () => {
  return (
    <View style={styles.container}>
        <ActivityIndicator size={'large'}/>
      <Text style={styles.textStyle}>loading ...</Text>
    </View>
  )
}

export default SpalshScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    }
})
import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../../constants/StyleColor'
import { CheckBox } from 'react-native-elements'
import Button from '../Button'


const SwitchProduct_2 = ({navigation}) => {
    const [isSelected, setSelection] = useState(true);

    const handlePress = () =>{
        navigation.navigate('commande')
    }
  return (
    <>
        <View>
            <Text style={{
                color: PRIMARY_COLOR, 
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 10
                }}
            >
                GARNITURE 1/1
            </Text>
        </View>
    
        <View style={styles.container}>
        <View style={styles.box}>
            <View style={styles.item}>
                <Text style={{color: WHITE}}>Salade Verte</Text>
                <CheckBox
                    checked={isSelected}
                    onPress={() => setSelection(!isSelected)}
                    containerStyle={styles.checkbox}             
                    checkedColor= {WHITE}
                />
            </View>
        </View>

        <View style={styles.box}>
            <View style={styles.item}>
                <Text style={{color: WHITE}}>Salade Verte</Text>
                <CheckBox
                    checked={false}
                    onPress={() => setSelection(!isSelected)}
                    containerStyle={styles.checkbox}             
                    checkedColor= {WHITE}
                />
            </View>
        </View>

        <View style={styles.box}>
            <View style={styles.item}>
                <Text style={{color: WHITE}}>Salade Verte</Text>
                <CheckBox
                    checked={false}
                    onPress={() => setSelection(!isSelected)}
                    containerStyle={styles.checkbox}             
                    checkedColor= {WHITE}
                />
            </View>
        </View>

        <View style={styles.box}>
            <View style={styles.item}>
                <Text style={{color: WHITE}}>Salade Verte</Text>
                <CheckBox
                    checked={isSelected}
                    onPress={() => setSelection(!isSelected)}
                    containerStyle={styles.checkbox}             
                    checkedColor= {WHITE}
                />
            </View>
        </View>

        </View>

        <Text style={{color: PRIMARY_COLOR, 
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 10
                }}
        >
            PETITE SALADE
        </Text>
        <View style={{flexDirection: 'row'}}>
            <View style={styles.price}>
                <Text style={{color: WHITE, fontWeight:'bold'}}>50 DH</Text>
            </View>
            <View style={styles.price}>
                <Text style={{color: WHITE}}></Text>
            </View>
        </View>

        <View style={{marginTop: 100}}>
           <Button title={'CHECKOUT'} 
             onPress = {handlePress}/>
        </View>
    </>
  )
}

export default SwitchProduct_2

const styles = StyleSheet.create({

    container:{
        flexDirection: 'row',
        width: '100%',
        backgroundColor: LIGHT_COLOR,
        flexWrap: 'wrap',
        padding: 10,
        marginBottom: 20,
        borderRadius:10
    },
    box:{
        width: '50%',
    },
    item:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkbox: {
        padding: 0
    },

    price:{
        backgroundColor: PRIMARY_COLOR,
        color: WHITE,
        paddingHorizontal: 20,
        padding: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    }
})
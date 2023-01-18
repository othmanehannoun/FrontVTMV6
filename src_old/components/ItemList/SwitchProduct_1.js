import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LIGHT_COLOR, PRIMARY_COLOR, WHITE } from '../../constants/StyleColor'
import { CheckBox } from 'react-native-elements'
import { windowHeight } from '../../constants/Demonsions'



const Choice2 = () => {

    const [isSelected, setSelection] = useState(true);

  return (
    <>
    <View>
        <Text style={{
            color: PRIMARY_COLOR, 
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10
            }}
        >BASE 2/2</Text>
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
                checked={isSelected}
                onPress={() => setSelection(!isSelected)}
                containerStyle={styles.checkbox}             
                checkedColor= {WHITE}
              />
          </View>
      </View>

    </View>
    </>
  )
}

export default Choice2

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        width: '100%',
        backgroundColor: LIGHT_COLOR,
        flexWrap: 'wrap',
        padding: 10,
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
})
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { LIGHT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, WHITE } from '../constants/StyleColor';

export default function CustomSwitch({
  selectionMode,
  option1,
  option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = value => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{...styles.buttonSwitch, 
        backgroundColor: getSelectionMode == 1 ? SECONDARY_COLOR : LIGHT_COLOR,
        borderWidth: 2, borderColor: getSelectionMode == 1 ? PRIMARY_COLOR : LIGHT_COLOR
        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? PRIMARY_COLOR : WHITE,
            fontFamily: 'Roboto-Medium',
            fontWeight: 'bold'
          }}>
          Popular
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{...styles.buttonSwitch, 
        backgroundColor: getSelectionMode == 2 ? SECONDARY_COLOR : LIGHT_COLOR,
        borderWidth: 2, borderColor: getSelectionMode == 2 ? PRIMARY_COLOR : LIGHT_COLOR
        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? PRIMARY_COLOR : WHITE,
            fontFamily: 'Roboto-Medium',
            fontWeight: 'bold'
          }}>
          Salads
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(3)}
        style={{...styles.buttonSwitch,
        backgroundColor: getSelectionMode == 3 ? SECONDARY_COLOR : LIGHT_COLOR, 
        borderWidth: 2, borderColor: getSelectionMode == 3 ? PRIMARY_COLOR : LIGHT_COLOR
        }}>
        <Text
          style={{
            color: getSelectionMode == 3 ? PRIMARY_COLOR : WHITE,
            fontFamily: 'Roboto-Medium',
            fontWeight: 'bold'
          }}>
          Main courses
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    width: '100%',
    
  },
  buttonSwitch:{
    flex: 1,
    height: 44,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  }
})
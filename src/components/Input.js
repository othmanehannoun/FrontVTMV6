import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import { PRIMARY_COLOR, LIGHT_COLOR } from '../constants/StyleColor';
import Feather from 'react-native-vector-icons/Feather'


const Input = ({
    placeholder,
    onChageText,
    isErrorTextInput,
    onFocus,
    password,
}) => {

    const [isFocused, setIsFocused] = React.useState(false);
    const [hiddenpassword, setHiddenPassword] = useState(password)
  return (
    <View style={{marginBottom: 0}}>
        <View style={
            password ? 
            {...styles.inputContainer, flexDirection: 'row'}
            :
            styles.inputContainer
        }>
        <TextInput 
         style={
            isErrorTextInput ? 
           { ...styles.input, borderBottomColor: "red", }
           :
           { ...styles.input, borderBottomColor: PRIMARY_COLOR }
    
         }

         autoCorrect={false}
         onFocus={() => {
           onFocus();
         }}
         onChangeText= {onChageText}
         placeholder= {placeholder}
         secureTextEntry= {hiddenpassword}
         placeholderTextColor= {isErrorTextInput ? '#ff4757': PRIMARY_COLOR}
        />
        {
            password ?
            <Feather 
                style={{position:'absolute', right:0}}
                name={hiddenpassword ? 'eye' : 'eye-off'} size={25}
                onPress={() =>{setHiddenPassword(!hiddenpassword)}} 
            />
            :
            <></>
        }
        </View>
        {
           isErrorTextInput ? 
           <Text style={{marginTop: 7, color: 'red', fontSize: 12}}>
               {isErrorTextInput}
            </Text>
           :
           <></>
        }
    
    </View>
  );
};

const styles = StyleSheet.create({
 
    inputContainer: {
        height: 55,
        width: "100%",
        alignItems: 'center',
    },
    input: {
        padding: 10,
        fontSize: 16,
        borderBottomWidth: 2,
        width: "100%",
        color: PRIMARY_COLOR
    },
});

export default Input;
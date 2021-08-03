import React from 'react';
import { Alert, ImagePropTypes, Text, TextInput, Platform } from 'react-native';


const CustumTestInput = function (props) {
    const [value, onChangeText] = React.useState();
    const CheckMaxValue = (numbers) => {
        let TextLength = numbers.length.toString() ;
        
        if (TextLength === props.Length.toString()) {
            Alert.alert("Введенные вами данные некорректны")
        }
    }

    const handleClick = event => {
        if (props.changeText != undefined)
            props.changeText(event);
        if (props.changePass != undefined)
            props.changePass(event);
        if (props.changeValfam != undefined)
            props.changeValfam(event);
        if (props.changeValname != undefined)
            props.changeValname(event);
        if (props.changeValsurname != undefined)
            props.changeValsurname(event);
        if (props.changeValemail != undefined)
            props.changeValemail(event)
    }


    return (
        <TextInput style={{
             height: 50,
             width:309, 
             backgroundColor: '#D8D8D8', 
             borderRadius: 15, 
             paddingLeft: 13,
             marginBottom: 18,
             fontSize: 18, 
             outline: 'none',
             lineHeight: 21}}
        maxLength={props.Length}
        secureTextEntry={props.isPass}
        placeholder= {props.text}
        onChangeText = {text => handleClick(text)}
        keyboardType = {Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
        value={value} />
    );
}

export default CustumTestInput;
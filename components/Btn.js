import React, {useState} from 'react'
import {Text, TouchableOpacity} from 'react-native'

const Btn = props => {
    return (
        <TouchableOpacity
           onPress={props.onPress}
           style={props.styles.btn}
        >
            <Text
             style={props.styles.text}
            >{props.name}</Text>
        </TouchableOpacity>
    )
}

export default Btn
import React from 'react';
import {View, Text, Alert, Image} from 'react-native'
import {defaultView, Btn_1, Btn_2, defText} from '../components/styles'
import Btn from '../components/Btn'

const ConfimReg = ({route, navigation}) => {
    return (
        <View style={defaultView.container}>

            <Btn name="Заполнить сейчас" onPress={()=>navigation.navigate('Аватарка', {email: route.params.email})} styles={Btn_1}/> 
            <Btn name="Заполнить позже" onPress={()=>navigation.navigate('Новости')} styles={Btn_2}/> 
        </View>
    )
}

export default ConfimReg;
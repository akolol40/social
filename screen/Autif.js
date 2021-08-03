import React, { useState, useEffect, useRef } from 'react';
import {  Alert, View, Text, TextInput, Platform } from 'react-native';
import {TouchableOpacity, StyleSheet, Image} from 'react-native'
import Regscreen from './Regscreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import react from 'react';

function CheckAcc ({route, navigation})  {

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);


    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

    const [isVisalbe, setIsVasable] = React.useState(false)
    const [value, onChangeText] = React.useState();
    const [textValue, setTextValue] = React.useState(60); 
    const changeVal = text => {
      onChangeText(text);
    }
    
    const [valText, setValText] = useState('Неверный код');
    const [visable, setVisable] = useState(0)
    const [visablebtn, setVisablebtn] = useState(0)
    useInterval(()=> {
      if (textValue > 0)  {
        setTextValue(textValue-1)
        if (textValue===1)
          setIsVasable(true)
      } 
    }, 1)
 
   
    async function sendCodeFromEmail() {
      const usercode = {
        email: route.params.email,
        code: Math.floor(Math.random() * 1000001)
      }
      let response = await fetch('http://ownunion.com/api/v1/sendcode', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
           Authorization: 'Bearer ' + route.params.token
        },
        credentials: 'same-origin',
        body: JSON.stringify(usercode)
      })  
      route.params.code = usercode.code
    }


   return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 120}}>
         <Image
         style={styles.logo}
         source={require('../img/Union.png')}
        />
        <Text style={{marginLeft: 35, marginRight: 0, fontSize: 16, lineHeight: 21, color: '#141414', width: 220, marginBottom: 19, paddingTop: 10, fontWeight: 'bold'}} >На Ваш почтовый адрес отправлено письмо с
            ĸодом подтверждения </Text>
            <Text style={{fontSize: 14, lineHeight: 16, color: 'red', marginBottom: 10, opacity: visable}}>{valText}</Text>
        <TextInput style={{
             height: 50,
             width: 210, 
             textAlign: 'center',
             borderColor: '#FFD876',
             backgroundColor: '#FFFFFF', 
             borderWidth: 1,
             color: '#FFAA47',
             borderRadius: 15, 
             outline: 'none',  
             marginBottom: 25,
             marginLeft: 30,
             marginRight: 30,
             fontSize: 18, 
             lineHeight: 21}}
        maxLength= {6}
        secureTextEntry={false}
        placeholder= 'Код'
        onChangeText = {text => changeVal(text)}
        keyboardType = {Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number-pad'}
        value={value} />

        <Text style={{fontSize: 14, lineHeight: 16, color: '#141414', marginBottom: 30}}>Запросить повторно можно через 00:{textValue} </Text>  


        {isVisalbe&&<TouchableOpacity
          style={{
            borderRadius: 15,
            width: 260,
            height: 50,
            opacity: 1,
            alignSelf: "center",
            backgroundColor: "rgb(255,191,118)",
            borderColor: "#FFD876",
            marginBottom: 15, 
            marginLeft: 30,
            marginRight: 30
          }}
          onPress={()=> {
             setTextValue(60)
             sendCodeFromEmail()
          }}
        >
        <Text style={styles.text_1}>Отправить код повторно</Text>
        </TouchableOpacity>  }

        <TouchableOpacity
          style={styles.btn_1}
          onPress={()=> {
              let val = Number.parseInt(value);
              if (val===route.params.code)  {
                navigation.navigate('Ввод пароля',{ email: route.params.email, token: route.params.token} )
              } else setVisable(1)
          }}
        >
        <Text style={styles.text_1}>Подтвердить</Text>
        </TouchableOpacity>    

        <TouchableOpacity
          style={styles.btn_2}
          onPress={()=> navigation.navigate('Регистрация')}
        >
        <Text style={styles.text_2}>Назад</Text>
        </TouchableOpacity>
    </View>


   )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
        width: 146,
        height: 117,
        marginTop: -120,
        marginBottom: 10
    },
    btn_1: {
      borderRadius: 15,
      width: 260,
      height: 50,

      alignSelf: "center",
      backgroundColor: "rgb(255,191,118)",
      borderColor: "#FFD876",
      marginBottom: 15, 
      marginLeft: 30,
      marginRight: 30
    },
 
    btn_2: {
      borderRadius: 15,
      width: 260,
      height: 50,
      alignSelf: "center",
      backgroundColor: "rgb(255,255,255)",
      borderWidth: 1,
      borderColor: "#FFD876",
      marginBottom: 15,
      marginLeft: 30,
      marginRight: 30
    },
    text_1: {
      alignSelf: "center",
      marginTop: 14,
      fontSize: 18,
      lineHeight: 21,
      color: "#FFFFFF",
    },
    text_2: {
      alignSelf: "center",
      marginTop: 14,
      fontSize: 18,
      lineHeight: 21,
      color: "#FFAA47",
    }
  });

export default CheckAcc;
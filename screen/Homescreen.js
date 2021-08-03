import CustumTestInput from '../components/inputs';
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import Btn from '../components/Btn'
import {  Alert,  View, Image, TextInput, Text , Platform} from 'react-native';
import  md5 from 'md5'
import {defaultView, Btn_1, Btn_2} from '../components/styles'
import {connect} from 'react-redux'
import {getUserToken, getUserEmail} from '../actions/index'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Homescreen = props => {
    const [val, setInputText] = useState('');
    const [val_pass, setValPass] = useState('');
    const [valText, setValText] = useState('Добро пожаловать в Own Union!');
    const [valColor, setValColor] = useState('#ffffff')
    const [textcolor, setTextColor] = useState('#141414')
    const changeText = (text) => {
        setInputText(text);
    };
   
    const setToken = async(value) => {
      try {
        await AsyncStorage.setItem('@token', value)
      } catch(e) {
        console.log(e)
      }
    }
    const setEmail = async(value) => {
      try {
        await AsyncStorage.setItem('@email', value)
      } catch(e) {
        console.log(e)
      }
    }

    async function dontAuth() {
      try {
        const Token = await AsyncStorage.getItem('@token')
        
        const Email = await AsyncStorage.getItem('@email')

      
        if (Token!==null && Email!==null) {
        props.getUserToken(Token)
        props.getUserEmail(Email) 
        let response = await fetch('http://ownunion.com/api/v1/getUser', {
          // credentials: 'same-origin', 
            headers: {
              Authorization: 'Bearer ' + Token
            }
          })
          let result = await response.json()
          response = await fetch('http://ownunion.com/api/v1/getAvaUrl', {
            // credentials: 'same-origin', 
            headers: {
              Authorization: 'Bearer ' + Token
            }
          })
          let rez = await response.json()
          props.navigation.navigate("Личный кабинет", {data: result.message, token: Token, ava: rez.link})
          }
      } catch (e) {
        console.log(e)
      }
    }
    useEffect(() => {
      dontAuth()
    }, [])
    
    const changePass = (text) => {
      setValPass(text);
    };

    function passEncrypt(pass){
      return md5("max_poltavchev_pidr"+pass)
    }

    function GoTotheReg (val) {
        props.navigation.navigate("Регистрация")
    }


    async function CheckUser(login, pass){

        const user = {
          email: login.toLowerCase() ,
          pwd: pass
        }
        let response = await fetch('http://ownunion.com/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify(user)
        }) 
        let result = await response.json()
        let token = result.token;
        
        if (result.message==="ok") {
          setValText('Добро пожаловать в Own Union!');
          setValColor('#ffffff')
          setToken(token)
          setEmail(user.email)
          props.getUserToken(token)
          props.getUserEmail(user.email)
          response = await fetch('http://ownunion.com/api/v1/getUser', {
           // credentials: 'same-origin', 
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          let result = await response.json()
          response = await fetch('http://ownunion.com/api/v1/getAvaUrl', {
            // credentials: 'same-origin', 
             headers: {
               Authorization: 'Bearer ' + token
             }
           })
           let rez = await response.json()
          props.navigation.navigate("Личный кабинет", {data: result.message, token: token, ava: rez.link})
          //props.navigation.navigate('Чат', {token: token, email: user.email})
        } else if (result.message==="Incorrect username/password") {
          setValColor('red');
          setValText('Неправильный логин или пароль!');
          setTextColor('red')
        }
    }



    return (
      <View style={defaultView.container}>
        <Image
         style={{
            width: 116,
            height: 90,
            marginTop: 60,
            marginBottom: 70
         }}
         source={require('../img/logo.png')}
        />
        <Text style={{fontSize: 18, lineHeight: 21, color: textcolor, marginBottom: 40}}>{valText}</Text>
        <TextInput style={{
             height: 50,
             width:309, 
             backgroundColor: '#D8D8D8', 
             borderRadius: 15, 
             paddingLeft: 13,
             marginBottom: 18,
             borderColor: valColor,
             borderWidth: 1,
             fontSize: 18, 
             outline: 'none',
             lineHeight: 21}}
        maxLength={50}
        secureTextEntry={false}
        placeholder= {'Телефон или эл. адрес'}
        onChangeText = {text => changeText(text)}
        keyboardType = {Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
        value={val} />
        <TextInput style={{
             height: 50,
             width:309, 
             backgroundColor: '#D8D8D8', 
             borderRadius: 15, 
             paddingLeft: 13,
             borderColor: valColor,
             borderWidth: 1,
             marginBottom: 18,
             fontSize: 18, 
             outline: 'none',
             lineHeight: 21}}
        maxLength={50}
        secureTextEntry={true}
        placeholder= {'Пароль'}
        onChangeText = {text => changePass(text)}
        keyboardType = {Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
        value={val_pass} />
        
        <Btn name="Войти" onPress={()=>CheckUser(val,val_pass)} styles={Btn_1}/> 
        <Btn name="Создать аккаунт" onPress={()=>GoTotheReg()} styles={Btn_2}/> 
        <Text onPress={()=>{props.navigation.navigate("Восстановление пароля")}} style={{fontSize: 16, lineHeight: 21, color: '#141414', marginBottom: 40}}>Забыли пароль?</Text>
         
      </View>
     
    );
}

const mapStateToProps = state => {
  return {
    Token: state.AuthToken.token, 
    Email: state.UserEmail.email
  }
}

export default connect(mapStateToProps, {getUserToken, getUserEmail})(Homescreen)
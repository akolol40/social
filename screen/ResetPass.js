import React, {useState} from 'react';
import {View, Text, Alert, Image} from 'react-native'
import {defaultView, Btn_1, Btn_2, defText} from '../components/styles'
import Btn from '../components/Btn'
import CustumTestInput from '../components/inputs';

const ResetPass = props => {
    const [val_email, setValemail] = useState('');
    const changeValemail = (text) => {
        setValemail(text);
    } 

    function ResPass(){
        let cods = Math.floor(Math.random() * 1000001);
        fetch('http://ownunion.com/Registration/reg.php?email='+val_email.toLowerCase()).then((response)=>{
            return response.json();
        }).then((data)=>{
            if (data.STATUS==="Email is used"){
                fetch('http://ownunion.com/mail/send.php?email='+val_email.toLowerCase()+'&mess='+cods)
                .then((response) => {
                  return response.json();
                }).then((data)=>{
                  if (data.STATUS==="OK"){
                    fetch('http://ownunion.com/mail/createUser.php?email='+val_email.toLowerCase()+'&code='+cods)
                    .then((response) => {
                      return response.json();
                    })
                    .then((data) => {
                      props.navigation.navigate('Подтверждение', {code: cods, email: val_email.toLowerCase()})
                    });
                    
                  }
                });  
            } else {
                Alert.alert("Информация", "Аккаунт не найдет, желаете зарегистрироваться?",[
                {
                    text: "Нет", 
                    onPress: () => console.log("no"),
                }, 
                {
                    text: "Да", 
                    onPress: () => props.navigation.navigate('Регистрация'),
                }])
            }
        })
        
    }
    
    return (
        <View style={defaultView.container}>
           <Text style={{fontSize: 18, lineHeight: 21, color: '#141414', marginBottom: 40, width: 275}}>Ведите адрес электронной почты к которой привязан Ваш аккаунт</Text>     
           <CustumTestInput changeValemail={changeValemail} isPass={false} Length={50} text="Электронная почта"> </CustumTestInput>
           <Btn name="Восстановить" onPress={()=>ResPass()} styles={Btn_1}/> 
           <Btn name="Назад" onPress={()=>props.navigation.navigate("Авторизация")} styles={Btn_2}/>  
        </View>
    )
}

export default ResetPass
import React, {useState} from 'react';
import {View, Alert, KeyboardAvoidingView, Text, TextInput, Platform, Picker} from 'react-native';
import CustumTestInput from '../components/inputs'
import Btn from '../components/Btn'
import {defaultView, Btn_1, Btn_2} from '../components/styles'
import {connect} from 'react-redux'
import {getUserToken, getUserEmail} from '../actions/index'
//import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
function Regscreen(props){
  const [val_fam, setValfam] = useState('');
  const [val_name, setValname] = useState('');
  const [val_surname, setValsurname] = useState('');
  const [val_email, setValemail] = useState('');
  const [sheeftpos, setsheeftpos] = useState(false);
  const [valText, setvalText] = useState('');
  const [valColor, setValColor] = useState('#ffffff');
  const [selectedValue, setSelectedValue] = useState(1)
  const [selectedValueMonth, setSelectedValueMonth] = useState(1)
  const [selectedValueDate, setSelectedValueDate] = useState(1960)

  const changevalMonth = input => {
    setSelectedValueMonth(input)
  }

  const chanageselValDate = input => {
    setSelectedValueDate(input)
  }

  const GetPickerInput = input => {
    setSelectedValue(input)
  }
  const changesetSheeftpos = (event) => {
    setsheeftpos(event)
  }

  const changeValfam = (text) => {
    setValfam(text);
  };

  const changeValname = (text) => {
    setValname(text);
  };

  const changeValsurname = (text) => {
    setValsurname(text);
  }

  async function ConfimReg(fam, email, surname, name){
    if (fam !== "" && email !== "" && surname !== "" && name !=="" )
    {
    if (email.indexOf('@', email) >= 0){
      setValColor('#ffffff')
      const user = {
        email: email.toLowerCase() ,
        surname: fam,
        middleName: surname, 
        name: name, 
        phone: 79009461589
      }
      let response = await fetch('http://ownunion.com/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(user)
      }) 
      let result = await response.json()
      let token = result.token;
      if (result.message === "null"){
        const usercode = {
          email: email.toLowerCase(),
          code: Math.floor(Math.random() * 1000001)
        }
        let response = await fetch('http://ownunion.com/api/v1/sendcode', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
             Authorization: 'Bearer ' + token
          },
          credentials: 'same-origin',
          body: JSON.stringify(usercode)
        }) 
        let result = await response.json()
        if (result.status==="ok") {
          props.getUserToken(token)
          props.getUserEmail(email.toLowerCase())
          props.navigation.navigate('Подтверждение', {code: usercode.code, email: email.toLowerCase(), token: token})
        }

      } else 
      if (result.message === "Email alredy exits") {
        Alert.alert("Информация", "Аккаунт с таким адресом электронной почты уже существует, хотите войти в него?",[
          {
             text: "Нет", 
             onPress: () => console.log("no"),
          }, 
          {
            text: "Да", 
            onPress: () => props.navigation.navigate('Авторизация'),
          }
        ])
      }
      } else 
        {
         setvalText('Электронная почта введена некорректно!')
         setValColor('red')
        }

    }
  }

  const changeValemail = (text) => {
    setValemail(text);
  } 

  const renderDayPickerItems = () => {
    const Dateofbth = []
    for (let i = 1; i<32; i++)
      Dateofbth.push(<Picker.Item label={i.toString()} value={i} key={i} />)
  
    return Dateofbth
  }

  const renderDatePickerItems = () => {
    const Dateofbth = []
    for (let i = 1960; i<2022; i++)
      Dateofbth.push(<Picker.Item style={{backgroundColor: '#D8D8D8'}} label={i.toString()} value={i} key={i} />)
  
    return Dateofbth
  }

  const renderMonthPickerItems = () => {
    const Dateofbth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
                      'Октябрь', 'Ноябрь', 'Декабрь']
    
  
    return Dateofbth
  }
 

  
  const pickMonth = renderMonthPickerItems().map((val, ind) => 
  <Picker.Item key={ind} value={val} label={val}/>)


return (
      <View 
       style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 35,flex: 1}}
      > 
        <CustumTestInput changeValfam={changeValfam}   isPass={false} Length={20} text="Фамилия"> </CustumTestInput>
        <CustumTestInput changeValname={changeValname}  isPass={false} Length={20} text="Имя"> </CustumTestInput>
        <CustumTestInput changeValsurname={changeValsurname}  isPass={false} Length={20} text="Отчество"> </CustumTestInput>
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
          placeholder= {'Электронная почта'}
          onChangeText = {text => changeValemail(text)}
          keyboardType = {Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
          value={val_email} />
        
        <Picker
          style={{ height: 50, width: 67, backgroundColor: "#D8D8D8", borderRadius: 15, marginTop: 0, marginRight: 238, outline: 'none', textAlign: 'center', paddingLeft: 18 }}
          onValueChange={(itemValue, itemIndex) => GetPickerInput(itemValue)}
          mode='dropdown'
          selectedValue={selectedValue}
       >
          {renderDayPickerItems()}
        </Picker>

        <Picker
          style={{ height: 50, width: 133, backgroundColor: "#D8D8D8", borderRadius: 15, marginTop: -50, marginRight: 26, outline: 'none', textAlign: 'center', paddingLeft: 20 }}
          onValueChange={(itemValue, itemIndex) => changevalMonth(itemValue)}
          mode='dropdown'
          selectedValue={selectedValueMonth}
        >
          {pickMonth}
        </Picker>   

        <Picker
          style={{ height: 50, width: 92, backgroundColor: '#D8D8D8', borderRadius: 15, marginTop: -50, marginLeft: 210, outline: 'none', textAlign: 'center', paddingLeft: 20, marginBottom: 20 }}
          onValueChange={(itemValue, itemIndex) => chanageselValDate(itemValue)}
          mode='dropdown'
          selectedValue={selectedValueDate}
        >
          {renderDatePickerItems()}
        </Picker> 
        
        <Text style={{fontSize: 14, lineHeight: 16, color: '#FF4747', marginTop: 5, marginBottom: 15}}>{valText}</Text> 
        <Btn name="Создать аккаунт" onPress={()=>ConfimReg(val_fam,val_email,val_surname, val_name)} styles={Btn_1}/> 
        <Btn name="Уже есть аккаунт" onPress={()=>props.navigation.navigate('Авторизация')} styles={Btn_2}/> 
      </View>
  );
} 


const mapStateToProps = state => {
  return {
    Token: state.AuthToken.token, 
    Email: state.UserEmail.email
  }
}

export default connect(mapStateToProps, {getUserToken, getUserEmail})(Regscreen)
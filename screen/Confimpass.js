import React, {useState} from 'react';
import CustumTestInput from '../components/inputs'
import {View, Text, TouchableOpacity, Alert, TextInput, Platform, CheckBox, Clipboard} from 'react-native'
import md5 from 'md5'
import Btn from '../components/Btn'
import {defaultView, Btn_1, Btn_2} from '../components/styles'


function Confimpass ({route, navigation})  {

    function passEncrypt(pass){
      return md5("max_poltavchev_pidr"+pass)
    }
    const [val, setInputText] = useState('');
    const [val_pass, setValPass] = useState('');
    const [visable, setVisable] = useState(false)
    const [isSelected, setSelection] = useState(false)
    const [valText, setValText] = useState('');
    const [colorInput, setcolorInput] = useState('#D8D8D8')
    const [visableText, setVisableText] = useState(false)
    const [copiedText, setCopiedText] = useState('')
    const changeText = (text) => {
      setInputText(text);
    };
    const changePass = (text) => {
      setValPass(text);
    };
    const copyToClipborad = (text) => {
      Clipboard.setString(text)
    }
    async function CheckPass(){
      if (val === val_pass) {
        const usersetpwd = {
          email: route.params.email,
          pwd: val
        }
        let response = await fetch('http://ownunion.com/api/v1/pass', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
             Authorization: 'Bearer ' + route.params.token
          },
          credentials: 'same-origin',
          body: JSON.stringify(usersetpwd)
        }) 
        let result = await response.json() 
        navigation.navigate("Аватарка", {email: route.params.email, token: route.params.token});

        } else {
          setValText('Пароли не совпадают')
          setVisableText(true)
          setcolorInput('red')
        }
     }

     function random(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
     }
    
    
    
    function generateWord(countWord) {
      let word = "";
      const alphabetV = "ae";
      const alphabetC = "bdfmnprtz";
      if (random(1, 2) == 2) {
        word += alphabetV[random(0, 1)];
        countWord--;
      }
    
      for (let i = 1; i <= countWord; i++) {
        if (i % 2 == 1) {
          word += alphabetC[random(0, 8)];
        } else {
          word += alphabetV[random(0, 1)];
        }
      } 
      return word;
    }
    

    return (
        <View style={defaultView.container}>

            <TextInput style={{
                    height: 50,
                    width:309, 
                    backgroundColor: '#D8D8D8', 
                    borderColor: colorInput,
                    borderRadius: 15, 
                    borderWidth: 1,
                    paddingLeft: 13,
                    marginBottom: 18,
                    fontSize: 18, 
                    outline: 'none',
                    lineHeight: 21}}
                maxLength={20}
                secureTextEntry={!isSelected}
                placeholder= {'Придумайте пароль'}
                onChangeText = {text => changeText(text)}
                keyboardType = {Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
                value={val} />

                <TextInput style={{
                    height: 50,
                    width:309, 
                    backgroundColor: '#D8D8D8', 
                    borderColor: colorInput,
                    borderWidth: 1,
                    borderRadius: 15, 
                    paddingLeft: 13,
                    marginBottom: 18,
                    fontSize: 18, 
                    outline: 'none',
                    lineHeight: 21}}
                maxLength={20}
                secureTextEntry={!isSelected}
                placeholder= {'Подтвердите пароль'}
                onChangeText = {text => changePass(text)}
                keyboardType = {Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
                value={val_pass} />   
            <Text style={{fontSize: 14, lineHeight: 16, color: '#141414', marginLeft: 135, marginBottom: 0, marginTop: 0}}>Показать пароль</Text>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={{
                marginLeft: 275,
                marginTop: -24
              }}
            />
            <TouchableOpacity
                style={{
                    borderRadius: 15,
                    width: 309,
                    marginTop: 20,
                    height: 50,
                    alignSelf: "center",
                    backgroundColor: "rgb(255,255,255)",
                    borderWidth: 1,
                    borderColor: "#FFD876",
                    marginBottom: 15
                }}
                 onPress={()=> 
                 {
                   const countFirstWord = random(3, 5);
                   const countSecondWord = random(3, (9 - countFirstWord));
                   const countThirdWord = 12 - countFirstWord - countSecondWord;
                   const genPass = `${generateWord(countFirstWord)}-${generateWord(countSecondWord)}-${generateWord(countThirdWord)}`;
                   changePass(genPass);
                   changeText(genPass);
                   setVisable(true)
                   setcolorInput('#D8D8D8')
                   setVisableText(false)
                 }}>
             <Text style={Btn_2.text}>Сгенерировать</Text>
            </TouchableOpacity>

            {visable&&<TouchableOpacity
                style={{
                    borderRadius: 15,
                    width: 309,
                    height: 50,
                    alignSelf: "center",
                    backgroundColor: "rgb(255,255,255)",
                    borderWidth: 1,
                    borderColor: "#FFD876",
                    marginBottom: 20,
                    opacity: 1
                }}
                 
                 onPress={()=> 
                 {
                  copyToClipborad(val_pass)
                 }
              }>
             <Text style={Btn_2.text}>Скопировать</Text>
            </TouchableOpacity>}
             {visableText&&
              <Text style={{fontSize: 14, lineHeight: 16, color: 'red', marginBottom: 20}}>Пароли не совпадают</Text>
             }   
            <Btn name="Подтвердить" onPress={()=>CheckPass()} styles={Btn_1}/> 
            <Btn name="Назад" onPress={()=>navigation.navigate('Подтверждение')} styles={Btn_2}/> 
        </View>
    )
  }


export default Confimpass;
import React, {useState, useEffect} from 'react'
import {Text, View, TextInput, Platform, ScrollView, FlatList} from 'react-native'
import {footerUi, defaultView} from '../components/styles'
import {connect} from 'react-redux'
import {getUserToken, getUserEmail, getUseFromSendEmail} from '../actions/index'
import SvgScrep from '../svg/Screp'
import SvgSendbtn from '../svg/Send'


const Message = props => {
    const {Token, Email, SendEmail} = props
    const [MessageList, GetMessageList] = useState([{
        "time": '',
        "mess": '',
        "from": '',
        "to": ''
    }]);
    const [mount, setunmount] = useState(true)
    const [val_fam, setValfam] = useState('');
    const changeValfam = (text) => {
        setValfam(text);
      };
    
    const sendMess = async(mess, object) => {
        const MessageData = {
            email: SendEmail,
            text: mess
        }
 
        let response = await fetch('http://ownunion.com/api/v1/message', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer '+Token
              },
            credentials: 'same-origin',
            body: JSON.stringify(MessageData)
        })
        let result = await response.json()
        GetMessageList([MessageData])

    }  
     function sortTime(object) {
        let data = new Date()
        let data_2 = new Date()
        let testMass = []
        if (object!==undefined)
            data_2.setHours(object.hours, object.min, object.second)
            testMass.push(object)
            const sortFunction = (a,b) => {
                let aTime = new Date() 
                let bTime = new Date()
                aTime.setMonth(a.month) 
                bTime.setMonth(b.month)
                aTime.setDate(a.data)
                bTime.setDate(b.data)
                aTime.setHours(a.hours,a.min,a.second)
                bTime.setHours(b.hours,b.min,b.second)
                if ((aTime >= bTime) ) 
                {
                    return 1
                }
                else
                if ((aTime <= bTime) ) return -1

                return 0
            }
            object.sort(sortFunction)   
    }
    useEffect(()=>{
        setunmount(true)

        const FetchData = async()  =>{
           
           //setTime(5000)
           let response =   await fetch('http://ownunion.com/api/v1/getAllMessage', {
               headers: {
                    Authorization: 'Bearer '+Token
               }
           })
           
           let result =  await response.json()
           let Mess = []
           //GetMessageList(result.message)
           result.message.forEach(element => {
               //console.log(element.from)
               if (element.from===SendEmail || element.to===Email) {
                   //GetMessageList(element)
                   if (element.from === undefined) 
                       element.from='Я'


                   Mess.push(element)
                   
               } else if (element.to===SendEmail || element.from===Email){
                    if (element.from === undefined) 
                    element.from='Я'

                  Mess.push(element)
               }
           })
           if (mount) {
           sortTime(Mess)
           GetMessageList(Mess)}
        }


        FetchData()
        return () => setunmount(false)

        //

   
        //setTime(10)
    })


///style={{listStyleType: 'none', marginLeft: -40, paddingBottom: 10}}
    const MessageItems = MessageList.map((message)=>
    
     <Text style={{backgroundColor: message.from==='Я'? '#FFFFFF': '#FFAA47', borderColor: '#FFAA47', borderWidth: 1, marginBottom: 10, borderRadius: 20, fontSize: 14, lineHeight: 16, textAlign: 'left',   paddingHorizontal: 15, paddingTop: 18,  marginHorizontal: message.from==='Я'? 100: 0, marginRight: 40 }}>{message.mess + '\n'}</Text>

    )

    /* 
    
     <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{display: 'flex',top: 20, flex: 1,  marginHorizontal: 0}}>       
                    <Text style={{listStyleType: 'none',  paddingBottom: 10}}  >{MessageItems}</Text>  
            </ScrollView>

    */
   const Item = ({ title }) => (
    <View style={{paddingBottom: 10}}>
      <Text>{title}</Text>
    </View>
  );
   const renderItem = ({ item }) => (
    <Item title={item.mess} />
  );
    return (
            <View style={{display: 'flex', flex: 1}}>
 
             <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{display: 'flex',top: 20, flex: 1,  marginHorizontal: 0, position: 'relative'}}>  
            <View style={{marginRight: 10, padding: 10, flex: 1, justifyContent: 'space-between', position: 'relative'}}>     
                    {MessageItems}
            </View>
            </ScrollView>  
       
            <View style={footerUi.theme_2}>    
            <Text style={{marginTop: 20, marginRight: 10}}>
            <SvgScrep></SvgScrep>
            </Text>
            
            <TextInput style={{
                height: 35, //35
                width:261, 
                borderWidth: 1,
                borderColor: '#D8D8D8',
                backgroundColor: '#ffffff', 
                borderRadius: 20, 
                paddingLeft: 13,
                marginTop: 14,
                position: 'relative',
                fontSize: 18, 
                outline: 'none',
                lineHeight: 21}}
                
                placeholder={'Сообщение'}
                onChangeText = {text => changeValfam(text)}
                keyboardType = {Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
                value={val_fam} />
             <Text onPress={()=>sendMess(val_fam, MessageList)} style={{marginTop: 20, marginLeft: 9}}>   
            <SvgSendbtn/></Text>
                </View>
  
            </View>

    )
}

const mapStateToProps = state => {
    return {
      Token: state.AuthToken.token,
      Email: state.UserEmail.email,
      SendEmail: state.UserSendEmail.userEmail
    }
  }
  
  export default connect(mapStateToProps, {getUserToken, getUserEmail, getUseFromSendEmail})(Message)
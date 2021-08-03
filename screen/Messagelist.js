import React, {useState, useEffect} from 'react'
import {View, Text, TextInput, Platform, Image, KeyboardAvoidingView, Dimensions} from 'react-native'
import { ForceTouchGestureHandler } from 'react-native-gesture-handler'
import {defaultView} from '../components/styles'

import SvgChat from '../svg/Chat'
import Svgloop from '../svg/loop'
import SvgPrivatechat from '../svg/Privatechat'
import Footer from '../components/footer'
import {connect} from 'react-redux'
import {getUserToken, getUseFromSendEmail} from '../actions/index'


const height = Dimensions.get('window').height
const Messagelist = props => {
    const {Token} = props  
  const [friendName, SetFriendName] = useState('')
  const [GetFriend, SetFriend] = useState(false)
  const [GetLink, SetLink] = useState([{
      link: '', email: '', name: '', middlename: '', time: '', lastMess: ''
  }])
  const [GetEmail, SetEmail] = useState('')
  const [Timeout, setTime] = useState(200)
  const [lengthMess, setlengthMess] = useState(0)
  const [styleMap, setStyleMap] = useState(-68)
  const [mount, setunmount] = useState(true)
  const [lastMess, setlastMess] = useState([{
    lastMess: '', email: ''
  }])
  useEffect(()=>{
   
   
   setunmount(true)

   const FetchData = async()  =>{
      //setTime(5000)
      setunmount(true)
      let response =   await fetch('http://ownunion.com/api/v1/getAllMessage', {
        headers: {
             Authorization: 'Bearer '+Token
        }
      })

      let result =  await response.json()


      if (mount) {
        const uniqueSet = new Set(result.avatarlink)
        let newMess = []
        newMess = [...uniqueSet]
        setlastMess(newMess)
        
        lengthMess!==result.avatarlink.length? SetLink(result.avatarlink) : 0
        setlengthMess(result.avatarlink.length)
        if (result.avatarlink.length >= 2)
        setStyleMap(-140)
        
      }
  }
  


   FetchData()

   return () => setunmount(false)
    
    
    
})

  const MapFriendChat = GetLink.map((link) => 
    <Image  key={link.id} style={{height: 50, width: 50, borderRadius: 300, marginBottom: 20}} source={{uri: link.link}}/>  )

  const MapFriendNames = GetLink.map((link)=><Text onPress={()=>{props.getUseFromSendEmail(link.email)
    props.navigation.navigate("Чат", {data: {email: GetEmail}})
    }} style={{marginLeft: 50, marginBottom: 50,fontWeight: '500', fontSize: 18, lineHeight: 21}}>{link.name!==undefined? link.name+' ' + link.middlename : 'loading'}</Text>)  

  const MapLastMessage = lastMess.map((link)=> <Text key={link.id} onPress={()=>{props.getUseFromSendEmail(link.email)
    props.navigation.navigate("Чат", {data: {email: GetEmail}})
    }} style={{
      fontWeight: '400', fontSize: 14, lineHeight: 16, marginBottom: 35, marginTop: 20
  }}>{link.lastMess + '   •   ' + link.time}</Text> )

   return(
      <View style={defaultView.container}>
         
        <View style={{display: 'flex', justifyContent: 'center',position: 'absolute', top: 20, width: 375, heigh: 90, left: 50}}>  
        {MapFriendChat}
        <View style={{marginTop: 0,marginLeft: 10, position: 'absolute', top: 0}}>        
        {MapFriendNames}
        </View>
        <View style={{position: 'absolute', left: 60, top: 4}}>
        {MapLastMessage}
        </View>
        {GetFriend&&<Image style={{position: 'absolute', height: 46, width: 46, borderRadius: 300, bottom: height-300, left: -60}} source={{uri: GetLink}}/>}
        {GetFriend&&<Text style={{position: 'relative', marginBottom: height-280, marginLeft: 0, fontWeight: '500', fontSize: 16, lineHeight: 21}}>{friendName}</Text>} 
        {GetFriend&&<Text onPress={()=> props.navigation.navigate("Чат", {data: {email: GetEmail}})} style={{position: 'absolute', right: -55, top: height-635}}><SvgPrivatechat/> </Text>}
         </View> 
        <Footer NavList={props}/>   
      </View>
  )
}
// сделать паддинг у последнего
const mapStateToProps = state => {
  return {
    Token: state.AuthToken.token,
    SendEmail: state.UserSendEmail.userEmail
  }
}

export default connect(mapStateToProps, {getUserToken, getUseFromSendEmail})(Messagelist)
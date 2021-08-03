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
const Friends = props => {
  const [friendName, SetFriendName] = useState('')
  const [GetFriend, SetFriend] = useState(false)
  const [GetLink, SetLink] = useState('')
  const [GetEmail, SetEmail] = useState('')
  const GetAllFriends = () => {

  }    

  const SearchFriend = async () => {
    let data = friendName.split(' ')

    
    const FriendData = {
        name: data[0],
        surname: data[1]
    }  
    let response = await fetch('http://ownunion.com/api/v1/SearchFriend', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(FriendData)
      }) 
      let result = await response.json()
      props.getUseFromSendEmail(result.email)
      
      SetLink(result.link)
      SetEmail(result.email)
      SetFriend(true)
  }

  return(
      <View style={defaultView.container}>
        <View style={defaultView.friendContainer}>
        
        <TextInput style={{
        height: 35,
        width:309, 
        borderWidth: 1,
        borderColor: '#D8D8D8',
        backgroundColor: '#ffffff', 
        borderRadius: 20, 
        paddingLeft: 13,
        marginBottom: 18,
        position: 'relative',
        fontSize: 18, 
        outline: 'none',
        lineHeight: 21}}
        
        placeholder={'Поиск...'}
        onChangeText = {text => SetFriendName(text)}
        keyboardType = {Platform.OS === 'ios' ? 'ascii-capable' : 'default'}
        value={friendName} />
          <Text style={{marginLeft: 275,marginTop: 5, position: 'absolute'}}onPress={()=>SearchFriend()}>
            <Svgloop/>
          </Text>
        
        </View>
      
        <View style={{display: 'flex', justifyContent: 'center', flex: 1, position: 'absolute'}}>  
        {GetFriend&&<Image style={{position: 'absolute', height: 46, width: 46, borderRadius: 300, bottom: height-300, left: -60}} source={{uri: GetLink}}/>}
        {GetFriend&&<Text style={{position: 'relative', marginBottom: height-280, marginLeft: 0, fontWeight: '500', fontSize: 16, lineHeight: 21}}>{friendName}</Text>} 
        {GetFriend&&<Text style={{color: '#FFAA47',position: 'absolute', top: height-620, marginLeft:0, fontWeight: '400', fontSize: 12, lineHeight: 16}}>В сети</Text>} 
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

export default connect(mapStateToProps, {getUserToken, getUseFromSendEmail})(Friends)

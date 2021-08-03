import React from 'react'
import {View, Text} from 'react-native'
import {footerUi} from './styles'
import SvgChat from '../svg/Chat'
import SvgNews from '../svg/News'
import SvgGroup from '../svg/Group'
import SvgCabinet from '../svg/Cabinet'
import SvgCompany from '../svg/Company'
import {connect} from 'react-redux'
import {getUserToken}  from '../actions/index'

//<SvgGroup/>  <SvgChat/> <SvgCabinet/>
const Footer = props => {
    console.log(props)
    return (
        <View
            style={footerUi.theme}
        >
            <View style={{position: 'absolute', bottom: 0, left: 0, flexDirection: 'row'}}>
                <View style={{marginLeft: 10}}>
                <Text onPress={()=> props.NavList.navigation.navigate("Новости")}><SvgNews/> </Text>
                </View>
                <View style={{marginTop: 4, marginLeft: 30}}>
                    <Text onPress={()=> props.NavList.navigation.navigate('Друзья', {token: props.Token})}> <SvgGroup/> </Text>
                </View>
                <View style={{marginLeft: 40}}>
                    <Text onPress={()=> props.NavList.navigation.navigate("Чатc", {token: props.Token})}> <SvgChat/> </Text>
                </View>
                <View style={{marginLeft: 50}}>
                    <SvgCompany/>
                </View>
                <View style={{marginTop: 4, marginLeft: 40}}>
                    <Text onPress={()=> props.NavList.navigation.navigate("Личный кабинет")}><SvgCabinet/> </Text>
                </View>
           </View>
        </View>
    )
}
const mapStateToProps = state => {
    return {
      Token: state.AuthToken.token
    }
  }
  
  export default connect(mapStateToProps, {getUserToken})(Footer)
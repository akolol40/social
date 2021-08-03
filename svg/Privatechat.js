import React from 'react'

import Image from 'react-native-remote-svg'

export default function SvgPrivatechat()  {
    return (
     //23
        <Image source={require('../img/privatechat.svg')}
             style={{
                width: 26, height:23,
                marginTop: 0, marginRight: 40
             }}/>
    
        ) 
}
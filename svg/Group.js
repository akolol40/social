import React from 'react'
import Svg, { Path } from 'react-native-svg'
import Image from 'react-native-remote-svg'

export default function SvgGroup(props)  {
    return (
     //23
     <Svg
     width={28}
     height={23}
     style={{marginHorizontal: 5,marginTop: 4 }}
     viewBox="0 0 28 23"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     {...props}
   >
     <Path
       d="M19.56 21.88v-2.32a4.64 4.64 0 00-4.64-4.64H5.64A4.64 4.64 0 001 19.56v2.32M10.28 10.28a4.64 4.64 0 100-9.28 4.64 4.64 0 000 9.28zM26.52 21.88v-2.32a4.64 4.64 0 00-3.48-4.49M18.4 1.15a4.64 4.64 0 010 8.99"
       stroke="#141414"
       strokeWidth={2}
       strokeLinecap="round"
       strokeLinejoin="round"
     />
   </Svg>
    )
}
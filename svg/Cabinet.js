import React from 'react'

import Svg, { Path } from "react-native-svg"
import Image from 'react-native-remote-svg'

export default function SvgCabinet(props)  {
    return (
     //23
     <Svg
     width={21}
     height={23}
     style={{marginHorizontal: 10, marginTop: 4}}
     viewBox="0 0 21 23"
     fill="none"
     xmlns="http://www.w3.org/2000/svg"
     {...props}
   >
     <Path
       fillRule="evenodd"
       clipRule="evenodd"
       d="M6.64 5.64a3.64 3.64 0 117.28 0 3.64 3.64 0 01-7.28 0zM10.28 0a5.64 5.64 0 100 11.28 5.64 5.64 0 000-11.28zM5.64 13.92A5.64 5.64 0 000 19.56v2.32a1 1 0 102 0v-2.32a3.64 3.64 0 013.64-3.64h9.28a3.64 3.64 0 013.64 3.64v2.32a1 1 0 102 0v-2.32a5.64 5.64 0 00-5.64-5.64H5.64z"
       fill="#141414"
     />
   </Svg>
    
        ) 
}


import React from 'react'

import Svg, { Path } from "react-native-svg"
import Image from 'react-native-remote-svg'

export default function SvgCompany(props)  {
    return (
        //27
        <Svg
        width={26}
        height={23}
        style={{marginTop: 4}}
        viewBox="0 0 26 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          d="M21.88 5.64H3.32A2.32 2.32 0 001 7.96v11.6a2.32 2.32 0 002.32 2.32h18.56a2.32 2.32 0 002.32-2.32V7.96a2.32 2.32 0 00-2.32-2.32z"
          stroke="#141414"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.24 21.88V3.32A2.32 2.32 0 0014.92 1h-4.64a2.32 2.32 0 00-2.32 2.32v18.56"
          stroke="#141414"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    
        ) 
}
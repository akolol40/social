import React from 'react'

import Svg, { Path } from 'react-native-svg'
import Image from 'react-native-remote-svg'

export default function SvgNews(props)  {
    return (
        //26
          <Svg
            width={21}
            height={26}
            style={{marginHorizontal: 10, marginTop: 4}}
            viewBox="0 0 21 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
          >
            <Path
              d="M12.6 1H3.32A2.32 2.32 0 001 3.32v18.56a2.32 2.32 0 002.32 2.32h13.92a2.32 2.32 0 002.32-2.32V7.96L12.6 1z"
              stroke="#141414"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M12.6 1v6.96h6.96M14.92 13.76H5.64M14.92 18.4H5.64M7.96 9.12H5.64"
              stroke="#141414"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        
    
        ) 
}

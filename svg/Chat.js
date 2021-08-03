import React from 'react'

import Svg, { Path } from "react-native-svg"
import Image from 'react-native-remote-svg'

export default function SvgChat(props)  {
    return (
        //27
        <Svg
        width={34}
        height={31}
        viewBox="0 0 34 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          d="M4.25 14.854a10.053 10.053 0 001.275 4.909c1 1.823 2.536 3.357 4.438 4.429a12.92 12.92 0 006.329 1.641c1.87.005 3.714-.393 5.383-1.162l8.075 2.454-2.692-7.363a10.053 10.053 0 001.275-4.908c0-2.038-.624-4.036-1.8-5.77-1.176-1.734-2.858-3.135-4.858-4.046a12.818 12.818 0 00-5.383-1.163h-.709C12.63 4.024 9.842 5.16 7.75 7.067c-2.09 1.906-3.337 4.45-3.5 7.141v.646z"
          stroke="#FFAA47"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    
        ) 
}


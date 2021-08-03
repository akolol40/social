import React from 'react'
import Svg, {Path} from 'react-native-svg'


export default function Svgloop(props)  {
    return (
      <Svg
      width={28}
      height={28}
      style={{position: 'absolute'}}
      viewBox="0 0 19 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.173 9.071a6.187 6.187 0 1110.648 4.288 1.013 1.013 0 00-.173.173 6.187 6.187 0 01-10.475-4.46zM13.4 15.525a8.187 8.187 0 111.414-1.414l3.238 3.237a1 1 0 01-1.414 1.415L13.4 15.525z"
        fill="#5C5C5C"
      />
    </Svg>
        ) 
}
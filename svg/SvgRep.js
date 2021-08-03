import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgReps(props) {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21.33 14.49c0 .597-.238 1.169-.661 1.59a2.264 2.264 0 01-1.598.66H5.518L1 21.235V3.248c0-.596.238-1.168.662-1.59A2.264 2.264 0 013.259 1H19.07c.6 0 1.174.237 1.598.659.423.421.661.993.661 1.59V14.49z"
        stroke="#141414"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgReps

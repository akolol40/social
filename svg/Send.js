import * as React from "react"

import Svg, {Path} from 'react-native-svg'

function SvgSendbtn(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M1 11.421L23 1 12.579 23l-2.316-9.263L1 11.42z"
        stroke="#141414"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgSendbtn

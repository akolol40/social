import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgWriter(props) {
  return (
    <Svg
      width={26}
      height={24}
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.332 3.082a1.652 1.652 0 012.336 2.336L6.238 20.847l-3.114.779.779-3.115 15.43-15.429zM20.5.598c-.968 0-1.897.385-2.582 1.07L2.293 17.293a1 1 0 00-.263.464l-1.25 5a1 1 0 001.213 1.213l5-1.25a1 1 0 00.464-.263L23.082 6.832A3.651 3.651 0 0020.5.598zM13 22a1 1 0 100 2h11.25a1 1 0 100-2H13z"
        fill="#141414"
      />
    </Svg>
  )
}

export default SvgWriter

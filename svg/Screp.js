import * as React from "react"
import Svg, {Path} from 'react-native-svg'

function SvgScrep(props) {
  return (
    <Svg
      width={22}
      height={23}
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.438 10.662l-9.19 9.19a6.003 6.003 0 11-8.49-8.49l9.19-9.19a4.002 4.002 0 015.66 5.66l-9.2 9.19a2.001 2.001 0 11-2.83-2.83l8.49-8.48"
        stroke="#141414"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgScrep

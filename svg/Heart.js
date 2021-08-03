import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgHeart(props) {
  return (
    <Svg
      width={26}
      height={23}
      viewBox="0 0 26 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22.788 2.812A6.214 6.214 0 0018.395 1a6.237 6.237 0 00-4.394 1.812l-1.197 1.192-1.197-1.192a6.228 6.228 0 00-4.394-1.811A6.228 6.228 0 002.82 2.812 6.17 6.17 0 001 7.185a6.17 6.17 0 001.82 4.374l1.197 1.191 8.787 8.747 8.787-8.747 1.197-1.191a6.182 6.182 0 001.821-4.374 6.16 6.16 0 00-1.82-4.373v0z"
        stroke="#141414"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgHeart

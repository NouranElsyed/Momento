import type { ReactNode } from "react"

interface IProps{
    children:ReactNode,
    className?:string
}

const ErrMsg = ({children,className}:IProps) => {
  return (
    <p className={`text-[#ff291e] ${className}`}>* {children}</p>
  )
}

export default ErrMsg
import type { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode
    className?:string
}
const Button = ({children,className,...props}:IProps) => {
  return (
    <button {...props}  className={`${className}  bg-[#0c1024] text-[#f2f2f2] font-medium px-6 py-2 rounded-md` }>{children}</button>
  )
}

export default Button
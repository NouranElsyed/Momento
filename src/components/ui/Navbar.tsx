import type { ReactNode } from "react"

interface IProps{
  className?: string
  children?: ReactNode
}
const Navbar = ({className,children}:IProps) => {
  return (
    <nav className={`navbar ${className}`}>
      {children}
    </nav>
  )
}

export default Navbar
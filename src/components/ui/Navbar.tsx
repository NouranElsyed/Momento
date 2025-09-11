import type { ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import type { RootState } from "../../app/store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket, faCircleChevronDown, faCircleChevronUp } from "@fortawesome/free-solid-svg-icons"
import { toggleSideNav } from "../../app/features/sideNavSlice"

interface IProps{
  className?: string
  children?: ReactNode
}
const Navbar = ({className}:IProps) => {
    const logOut = () => {
    localStorage.removeItem("user");
    location.replace("/auth/login");
  };
  const showSideNav = useSelector(
    (state: RootState) => state.sideNav.showSideNav
  );
  const dispatch = useDispatch();
  return (
    <nav className={`navbar ${className}`}>
       <NavLink to={'/'} className="font-bold px-7 text-md flex gap-2  items-center">
          <img src="/Logo.svg" alt="Monento logo" className="MonentoLogo" />
          <h2>Momento</h2>
        </NavLink>

        <div
          onClick={logOut}
          className="hidden md:flex items-center gap-1.5 px-5 font-sm  text-red-600 cursor-pointer "
        >
          <a>Logout</a>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
        <div
          onClick={()=>dispatch(toggleSideNav())}
          className="block md:hidden px-5 font-sm  text-blue-600 cursor-pointer "
        >
          {(!showSideNav && <FontAwesomeIcon icon={faCircleChevronDown} />) || (
            <FontAwesomeIcon icon={faCircleChevronUp} />
          )}
        </div>
    </nav>
  )
}

export default Navbar
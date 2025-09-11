import {  Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import SideNav from "../components/SideNav";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const MainLayout = () => {

  const showSideNav = useSelector(
    (state: RootState) => state.sideNav.showSideNav
  );

  return ( 
    <>
      <Navbar className="z-50">
       
      </Navbar>

      <div
        className={`outlet w-full min-h-screen bg-[#f6f9fd] flex ${
          showSideNav ? "flex-col md:flex-row" : ""
        } md:px-5 lg:px-10 gap-5 py-20 relative`}
      >
        <AnimatePresence>
        {showSideNav && (
         <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-20 left-1/2 -translate-x-1/2 w-11/12 md:hidden mx-auto bg-white border border-[#dadde0db] text-[#646464] rounded-xl shadow-lg z-50"
    >
          <SideNav showSideNav={showSideNav} />

         </motion.div>
        )}
        </AnimatePresence>
        <div className="h-fit w-[250px] hidden md:block infoBox bg-[#ffffff] border border-[#dadde0db]  text-[#646464] md:ms-1 lg:ms-7 rounded-xl  ">
          <SideNav showSideNav={!showSideNav} />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;

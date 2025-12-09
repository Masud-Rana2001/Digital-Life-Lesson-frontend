import React from 'react' 
import logo from "../../assets/images/logodll.png"
import { NavLink } from 'react-router';

function Logo() {
  return (
    <>
      <NavLink to="/">

    <div className="flex items-end ">
      <img className=" w-40" src={logo} alt="" />
     
    </div>
      </NavLink>
    </>
  )
}

export default Logo
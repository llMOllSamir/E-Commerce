import React, { useContext, useEffect } from 'react'
import styles from "./Layout.module.css";
import { Outlet } from 'react-router-dom';
import NavBar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Layout({userData,setUserData}) {
  let navigate=useNavigate()
  let logOut=()=>{
    localStorage.removeItem("userToken")
    setUserData(null)
    navigate("/login")
  }

  return (
    <>
    <NavBar userData={userData} logOut={logOut}/>
   <div id='main'>
   <Outlet />
    <Footer/>
   </div>
    </>
  )
}

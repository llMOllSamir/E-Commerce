import React from 'react'
import styles from "./Setting.module.css";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Setting() {
  return (
    <>
     <div className="application">
            <Helmet>
                <title>Setting</title>
            </Helmet>
        </div>
    <div className="container py-5">
      <h2>Settings...</h2>
      <div className="row w-75 mx-auto ">
        <ul>
          <li><h5><Link to={"resetpassword"} className='nav-link p-2'>Reset Password</Link></h5></li>
          <li><h5><Link to={"resetdata"} className='nav-link p-2'>Reset Data</Link></h5></li>
        </ul>
       </div>
      </div>
      <div className="container">
      <Outlet/>
      </div>
    </>
  )
}

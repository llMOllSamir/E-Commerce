import React from 'react'
import styles from "./Footer.module.css";
import {Link} from "react-router-dom"

export default function Footer() {
  return (
    <><footer className='bg-dark mt-5'>
      <div className="container p-5 pb-2 ">
        <div className="row ">
          <div className="col-md-6">
          <div className="d-flex align-items-center"><i className="fa-solid fa-cart-shopping fa-flip-horizontal text-success fs-3 "></i><h2 className='font-brand'>Online Shopping</h2></div>
            <p className='fst-italic'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde hic voluptatem quaerat tempore dignissimos? Non nesciunt magnam deleniti distinctio ex quas dolorem. Repellendus consectetur, recusandae placeat suscipit eum magni ratione!</p>
          </div>
          <div className="col-md-6">
           <div className="row gy-3">
            <div className="col-lg-4 align-self-end"> <ul className='m-0'>
              <li><a href="https://www.facebook.com/profile.php?id=100082859111033" className='nav-link badge bg-primary fs-6 my-1'><i className='fa-brands fa-facebook-f'></i> <span className=''> Face Book</span></a></li>
              <li><a href="https://github.com/llMOllSamir" className='nav-link badge bg-secondary my-1 fs-6'><i className='fa-brands fa-github '></i> <span className=''> Git Hub</span></a></li>
              <li><a href="https://www.linkedin.com/" className='nav-link badge bg-light text-primary my-1 fs-6'><i className='fa-brands fa-linkedin '></i> <span className=''> Linked In</span></a></li>
            </ul></div>
            <div className="col-lg-8 text-center">
              <h2>Contact Us ..</h2>
              <form  >
                <div className="row">
                  <div className="col-6"><input type="text" placeholder='Name' className="form-control mb-1" />
                <input type="tel" placeholder='Phone' className="form-control mb-1" /></div>
                <div className="col-6">
                  <textarea placeholder='Message' id="" className='form-control mb-1' rows="1"></textarea>
               <button type='button' className='btn btn-success w-100'>Send</button>
                </div>
                </div>
              </form>
            </div>
           </div>
          </div>
        </div>
      <div className="border-bottom border-light "></div>
      <div className="container mt-3">
        <div className="row gy-1 text-center"><div className="col-12">Copyright © 2023 All Rights Reserved For Route Center</div><div className="col-12"><p className='text-danger'> Created By Mohamed Samir</p></div></div>
      </div>
      </div>
      </footer></>
  )
}

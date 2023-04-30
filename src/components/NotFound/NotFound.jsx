import React from 'react'
import err from "../../images/Error.svg"
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <div className='error'>
        <img src={err} className='img-fluid' alt="" />
        <button className='btn btn-primary'><Link className='nav-link' to={"home"}>Go Home</Link></button>
      </div>
    </>
  )
}

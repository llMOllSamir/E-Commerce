import React, { useState } from 'react'
import styles from "./ResetData.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetData({setUserData}) {
  let [isLoading,setIsLoading]=useState(false)
let[errMessage,setError]=useState(null)
let navigate = useNavigate()
  let resetPassword=async(values)=>{
    setIsLoading(true)
    let {data}= await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe",values,{headers:{token:localStorage.getItem("userToken")}}).catch((err)=>{
      setIsLoading(false)
     setError(err.response.data.errors.msg)
    })
    if (data.message=="success"){
      setIsLoading(false)
      localStorage.removeItem("userToken")
      setUserData(null)
      navigate("/login")
    }
  }
  
  let resetSchema = Yup.object({
    name: Yup.string().required("Name Required").min(3,"min char is 3").max(18,"max char is 18"),
    email: Yup.string().email("invalid email").required("email Required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"please enter valid phone number").required("please enter your phone number")
  });
  let formik=useFormik({
    initialValues:{
      name: "",
      email: "",
      phone: ""
    },validationSchema:resetSchema
    ,onSubmit:values=>{resetPassword(values);}
  })
  return (
    <>
    <div className="container">
      <h2 className=" badge w-75 d-block mx-auto bg-success text-center my-4 fs-3">Reset Data</h2>
      {errMessage?<div className='alert alert-danger w-75 mx-auto'>{errMessage}</div>:""}
      <form className='w-75 mx-auto' onSubmit={formik.handleSubmit} >
        <div className="form-group mb-3">
        <label htmlFor="name" className='fw-bold'>Name : {}</label>
        <input 
        type="text" 
        id='name' 
        name='name' 
        value={formik.values.name} 
        className='form-control mt-1'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        />

        {(formik.touched.name&&formik.errors.name)? <div className='alert alert-danger p-1'>{formik.errors.name}</div>:""}
        </div>

        <div className="form-group mb-3">
        <label htmlFor="email" className='fw-bold'> New Email :</label>
        <input 
        type="email" 
        id='email' 
        name='email' 
        value={formik.values.password} 
        className='form-control mt-1'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        />
        {(formik.touched.email&&formik.errors.email)?<div className='alert alert-danger p-1'>{formik.errors.email}</div>:""}
        </div>

        <div className="form-group mb-3">
        <label htmlFor="phone" className='fw-bold'>Phone :</label>
        <input 
        type="tel" 
        id='phone' 
        name='phone' 
        value={formik.values.rePassword} 
        className='form-control mt-1'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        />
        {(formik.touched.phone&&formik.errors.phone)?<div className='alert alert-danger p-1'>{formik.errors.phone}</div>:""}
        </div>
        {isLoading?<button className='btn btn-success my-3 d-flex ms-auto'><i className="fa-solid fa-spin fa-spinner"></i></button>:<button type='submit' disabled={!(formik.dirty && formik.isValid)} className='btn btn-success my-3 d-flex ms-auto'>Submit</button>}
 
      </form>
    </div>
    </>
  )
}

import React, { useState } from 'react'
import styles from "./ResetPassword.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword({setUserData}) {
let [isLoading,setIsLoading]=useState(false)
let[errMessage,setError]=useState(null)
let navigate = useNavigate()
  let resetPassword=async(values)=>{
    setIsLoading(true)
    let {data}= await axios.put("https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword",values,{headers:{token:localStorage.getItem("userToken")}}).catch((err)=>{
      setIsLoading(false)
      if(err.response?.data?.message=="fail"){
        setError(err.response.data.errors.msg)
      }else if(err.response?.data?.message!="fail"){
        setError(err.response.data.message)
      }else{
        setError(err.message)
      }
    })
    if (data.message=="success"){
      setIsLoading(false)
      localStorage.removeItem("userToken")
      setUserData(null)
      navigate("/login")
    }
  }
  
  let resetSchema = Yup.object({
    currentPassword: Yup.string().required("Requierd").matches(/^[A-Z][a-zA-Z0-9]{5,10}$/," invalid password"),
    password: Yup.string().required("password required").matches(/^[A-Z][a-zA-Z0-9]{5,10}$/,"please enter valid password"),
    rePassword:Yup.string().required("rePassword requierd").oneOf([Yup.ref("password")],["password must matched"]),
  });
  let formik=useFormik({
    initialValues:{
      currentPassword:"",
      password:"",
      rePassword:""
    },validationSchema:resetSchema
    ,onSubmit:values=>{resetPassword(values);}
  })
  return (
    <>
    <div className="container">
      <h2 className=" badge w-75 d-block mx-auto bg-success text-center my-4 fs-3">Reset Password</h2>
      {errMessage?<div className='alert alert-danger w-75 mx-auto'>{errMessage}</div>:""}
      <form className='w-75 mx-auto' onSubmit={formik.handleSubmit} >
        <div className="form-group mb-3">
        <label htmlFor="currentPassword" className='fw-bold'>Current Password :</label>
        <input 
        type="password" 
        id='currentPassword' 
        name='currentPassword' 
        value={formik.values.currentPassword} 
        className='form-control mt-1'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        />
        {(formik.touched.currentPassword&&formik.errors.currentPassword)? <div className='alert alert-danger p-1'>{formik.errors.currentPassword}</div>:""}
        </div>

        <div className="form-group mb-3">
        <label htmlFor="password" className='fw-bold'> New Password :</label>
        <input 
        type="password" 
        id='password' 
        name='password' 
        value={formik.values.password} 
        className='form-control mt-1'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        />
        {(formik.touched.password&&formik.errors.password)?<div className='alert alert-danger p-1'>{formik.errors.password}</div>:""}
        </div>

        <div className="form-group mb-3">
        <label htmlFor="rePassword" className='fw-bold'>Re-Password :</label>
        <input 
        type="password" 
        id='rePassword' 
        name='rePassword' 
        value={formik.values.rePassword} 
        className='form-control mt-1'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        />
        {(formik.touched.rePassword&&formik.errors.rePassword)?<div className='alert alert-danger p-1'>{formik.errors.rePassword}</div>:""}
        </div>
        {isLoading?<button className='btn btn-success my-3 d-flex ms-auto'><i class="fa-solid fa-spin fa-spinner"></i></button>:<button type='submit' disabled={!(formik.dirty && formik.isValid)} className='btn btn-success my-3 d-flex ms-auto'>Submit</button>}
        
        
      </form>
    </div>
    </>
  )
}

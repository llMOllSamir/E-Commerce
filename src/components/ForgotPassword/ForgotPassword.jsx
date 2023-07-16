import React, { useState } from 'react'
import styles from "./ForgotPassword.module.css";
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword({setSuccess}) {
  let [isLoading,setIsLoading]=useState(false)
  let [err,setErr]=useState(null)
  let navigate = useNavigate()


  let validEmail = Yup.object({
    email: Yup.string().email("invalid email").required("email Required"),
  });

  let getCode=async (values)=>{
    setIsLoading(true)
    let{data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values).catch((err)=>{
      setIsLoading(false)
    setErr(err.response.data.message)
    ;})
    if(data.statusMsg==="success"){
      setIsLoading(false)
      setSuccess(data.message)
      navigate("/login/codeConfirm")
    }
  }
  

  let formEmail = useFormik({
    initialValues:{
     email:""
    },
    validationSchema:validEmail
    ,onSubmit:(values)=>{getCode(values);}
  })


  return (
    <>
    <h3 className='text-center'><span className='badge main-bg mt-5'>Forgot Password</span></h3>
      <form onSubmit={formEmail.handleSubmit} className='w-75 mx-auto'>
      {err?<div className='alert alert-danger'>{err}</div>:""}
      <label htmlFor="email">
          Email :
      </label>
      <input type="email" onBlur={formEmail.handleBlur} onChange={formEmail.handleChange} name='email' id='email' className='form-control my-2' />
      {formEmail.touched.email&&formEmail.errors.email?<div className='alert alert-danger p-1 px-3'>{formEmail.errors.email}</div>:""}
      {isLoading?<button  type='submit' className='main-btn ms-auto d-flex'> <i className="fa-solid fa-spin fa-spinner"></i> </button>:
      <button disabled={!(formEmail.dirty&&formEmail.isValid)} className='main-btn ms-auto d-flex'>confirm</button>
      }
      </form>
    </>
  )
}

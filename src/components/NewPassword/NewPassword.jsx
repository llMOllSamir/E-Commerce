import React, { useState } from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { useNavigate } from 'react-router-dom';
export default function NewPassword() {
  let [isLoading,setIsLoading]=useState(false)
  let [err,setErr]=useState(null)
  let navigate = useNavigate()


  let validEmail = Yup.object({
    email: Yup.string().email("invalid email").required("email Required"),
    newPassword: Yup.string().required("password required").matches(/^[A-Z][a-zA-Z0-9]{5,10}$/,"please enter valid password"),
  });

  let getCode=async (values)=>{
    setIsLoading(true)
    let{data}= await axios.put("https://route-ecommerce.onrender.com/api/v1/auth/resetPassword",values).catch((err)=>{
      console.log(err);
      setIsLoading(false)
    setErr(err.response.data.message)
    ;})
    if(data.token){
      setIsLoading(false)
      navigate("/login")
    }
  }
  

  let formEmail = useFormik({
    initialValues:{
     email:"",
     newPassword:""
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

      <label htmlFor="newPassword">
          New Password :
      </label>
      <input type="password" onBlur={formEmail.handleBlur} onChange={formEmail.handleChange} name='newPassword' id='newPassword' className='form-control my-2' />
      {formEmail.touched.newPassword&&formEmail.errors.newPassword?<div className='alert alert-danger p-1 px-3'>{formEmail.errors.newPassword}</div>:""}


      {isLoading?<button  type='submit' className='main-btn ms-auto d-flex'> <i className="fa-solid fa-spin fa-spinner"></i> </button>:
      <button disabled={!(formEmail.dirty&&formEmail.isValid)} className='main-btn ms-auto d-flex'>confirm</button>
      }
      </form>
    </>
  )
}

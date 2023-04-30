import React, { useState } from 'react'
import styles from "./SignUp.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function SignUp() {
  let [isLoading,setIsLoading]=useState(false)
  let[err,setErr]=useState(null)
  let navigate=useNavigate()
  let signupSchema = Yup.object({
    name: Yup.string().required("Name Required").min(3,"min char is 3").max(18,"max char is 18"),
    email: Yup.string().email("invalid email").required("email Required"),
    password: Yup.string().required("password required").matches(/^[A-Z][a-zA-Z0-9]{5,10}$/,"please enter valid password"),
    rePassword:Yup.string().required("rePassword requierd").oneOf([Yup.ref("password")],["password must matched"]),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"please enter valid phone number").required("please enter your phone number")
  });
   let register= async values=>{
    setIsLoading(true)
    let {data}= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/signup",values).catch((err)=>{
    setIsLoading(false)
    setErr(err.response.data.message)})
    if(data.message=="success"){
      setIsLoading(false)
      navigate("/login")
    }
  }
  const formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    validationSchema:signupSchema
    ,onSubmit:values=>{register(values)}
  })
  return (
    <>
    <div className="container my-5 py-5">
    <div className="row gx-md-5 gy-5">
      <div className="col-md-5" style={{borderRight:"solid 2px green"}}>
      <div className=''>
      <h2 className='text-success  mb-5 h3'>Welcome to Online Shopping</h2>
      <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores autem accusamus officia itaque exercitationem culpa, iste nemo incidunt. Saepe dolore earum necessitatibus ducimus inventore tenetur. Consectetur ab fugiat nesciunt nihil, impedit aut provident perspiciatis hic dolorum fugit unde incidunt. Quo dolorum neque eos optio sint facere ea deserunt quas repellat!</p>
      </div>
      </div>
      <div className="col-md-7">
        {err?<div className='alert alert-danger'>{err}</div>:""}
      <h2 className='text-success mb-5 '>Register ....</h2>
      <form onSubmit={formik.handleSubmit}>
      <input
       type="text" 
       className='form-control mb-3' 
       placeholder='Name' 
       value={formik.values.name} 
       onChange={formik.handleChange} 
       name='name' 
       id='name'
       onBlur={formik.handleBlur} />
       {formik.errors.name&&formik.touched.name ?<div className='alert alert-danger'>{formik.errors.name}</div>:"" }

<input
       type="email" 
       className='form-control mb-3' 
       placeholder='Email' 
       value={formik.values.email} 
       onChange={formik.handleChange} 
       name='email' 
       id='email'
       onBlur={formik.handleBlur} />
       {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div>:"" }

<input
       type="password" 
       className='form-control mb-3' 
       placeholder='Password' 
       value={formik.values.password} 
       onChange={formik.handleChange} 
       name='password' 
       id='password'
       onBlur={formik.handleBlur} />
       {formik.errors.password && formik.touched.password?<div className='alert alert-danger'>{formik.errors.password}</div>:"" }

<input
       type="password" 
       className='form-control mb-3' 
       placeholder='Re-Password' 
       value={formik.values.rePassword} 
       onChange={formik.handleChange}
       name='rePassword'
       id='rePassword'
       onBlur={formik.handleBlur} />
       {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger'>{formik.errors.rePassword}</div>:"" }

<input
       type="tel" 
       className='form-control mb-3' 
       placeholder='Phone' 
       value={formik.values.phone} 
       onChange={formik.handleChange} 
       name='phone' 
       id='phone'
       onBlur={formik.handleBlur} />
       {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger'>{formik.errors.phone}</div>:"" }

        {isLoading?<button disabled={!(formik.dirty&&formik.isValid)} type='submit' className='btn btn-success ms-auto d-flex'> <i className="fa-solid fa-spin fa-spinner"></i> </button>:<button disabled={!(formik.dirty&&formik.isValid)} type='submit' className='btn btn-success ms-auto d-flex'> Register </button>}
      
      
    </form>
      </div>
      </div>
    </div>
    </>
  )
}

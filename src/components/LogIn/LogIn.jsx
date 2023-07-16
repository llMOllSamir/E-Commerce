import React, {  useState } from 'react'
import styles from "./LogIn.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function LogIn({saveUser}) {

  let [isLoading,setIsLoading]=useState(false)
  let[err,setErr]=useState(null)
  let navigate=useNavigate()


  let signinSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email Required"),
    password: Yup.string().required("password required").matches(/^[A-Z][a-zA-Z0-9]{5,10}$/,"please enter valid password"),
  });
  
   let logIn= async values=>{
    setIsLoading(true)
    let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).catch((err)=>{
      setIsLoading(false)
      setErr(err.response.data.message)})
    if(data.message=="success"){
      setErr(null)
      setIsLoading(false)
      localStorage.setItem("userToken",data.token)
      saveUser()
      navigate("/home")
    }
  }
  const formik=useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:signinSchema
    ,onSubmit:values=>{logIn(values)}
  })


  return (
    <>
     <div className="application">
            <Helmet>
                <title>Online Shopping</title>
            </Helmet>
        </div>
     <div className="container my-5 py-5">
    <div className="row gx-md-5 gy-5">
      <div className="col-md-5" style={{borderRight:"solid 2px teal"}}>
      <div className=''>
      <h2 className='main-color  mb-5 h3'>Welcome to Online Shopping</h2>
      <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores autem accusamus officia itaque exercitationem culpa, iste nemo incidunt. Saepe dolore earum necessitatibus ducimus inventore tenetur. Consectetur ab fugiat nesciunt nihil, impedit aut provident perspiciatis hic dolorum fugit unde incidunt. Quo dolorum neque eos optio sint facere ea deserunt quas repellat!</p>
      </div>
      </div>
      <div className="col-md-7">
      {err?<div className='alert alert-danger'>{err}</div>:""}

      <h2 className='main-color mb-5 '>Login ....</h2>
      <form onSubmit={formik.handleSubmit}>

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
     <div className='d-flex justify-content-space-between  align-items-center '> 
      <Link to={"forgotPassword"} className='fw-bold' >Forgot My Password</Link>
      {isLoading?<button  type='submit' className='main-btn ms-auto d-flex'> 
      <i className="fa-solid fa-spin fa-spinner"></i> </button>:
      <button disabled={!(formik.dirty&&formik.isValid)} type='submit' className='main-btn ms-auto d-flex'> Login </button>}
      </div>
    </form>
      </div>
      </div>
      <div className="container my-5">
        <Outlet />
      </div>
    </div>
    </>
  )
}

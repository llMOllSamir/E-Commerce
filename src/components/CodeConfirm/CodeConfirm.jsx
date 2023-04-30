import React ,{useState} from 'react'
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { Navigate, useNavigate } from 'react-router-dom';

export default function CodeConfirm({success,setSuccess}) {
  let [isLoading,setIsLoading]=useState(false)
  let [err,setErr]=useState(null)
  let navigate = useNavigate()


  let sendCode=async (values)=>{
    setIsLoading(true)
    let{data}= await axios.post("https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode",values).catch((err)=>{
      setIsLoading(false)
    setErr(err.response.data.message)
    ;})
    if(data.status=="Success"){
      setIsLoading(false)
      navigate("/login/newPassword")
    }
  }

  let codeValid= Yup.object({
    resetCode: Yup.string().required("Required").min(6,"code from 6 char").max(6,"code from 6 char")
  })
  let formCode = useFormik({
    initialValues:{resetCode:""},validationSchema:codeValid,onSubmit:values=>{sendCode(values);}
  })

  let back=()=>{
    setSuccess(null)
    navigate("/login/forgotPassword")
  }
  return (
    <>
   {success?<><h3 className='text-center'><span className='badge main-bg mt-5'>Verify Reset Code </span></h3>
     <form onSubmit={formCode.handleSubmit} className='w-75 mx-auto'>
    {err?<div className='alert alert-danger'>{err}</div>:<>{success?<div className='alert alert-success' >{success}</div>:""}</>}
  <label htmlFor="resetCode">Code :</label>
  <input type="text" name='resetCode' onBlur={formCode.handleBlur} onChange={formCode.handleChange} id='resetCode' className='form-control my-2' />
    {formCode.errors.resetCode&&formCode.touched.resetCode?<div className='alert alert-danger p-1 px-3'>{formCode.errors.resetCode}</div>:""}
  <div className="d-flex">
  <button  type='submit' className='main-btn me-auto d-flex' onClick={back}>Back</button>
  {isLoading?<button  type='submit' className='main-btn'> <i className="fa-solid fa-spin fa-spinner"></i> </button>:
  <button className='main-btn ' disabled={!(formCode.dirty&&formCode.isValid)}>confirm</button>
  }
  </div>
</form></>:<Navigate to={"/login/forgotPassword"}></Navigate>}
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import * as Yup from "yup"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Payment({userData}) {
  const [show, setShow] = useState(false);
  const [payLoading,setPayLoding]=useState(false)
  let [payData,setPayData]=useState({})
  let headers ={token: localStorage.getItem("userToken")}
  let [allCountries,setAllCountries]=useState([])
  let [errPayment,setErrPayment]=useState(false)
  let [allCities,setAllCities]=useState([])
  let {cartid}=useParams()
  let navegate = useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  //  validation with Yup
  let paySchema = Yup.object({
    details: Yup.string().required("Requierd"),
    phone: Yup.string().required("Requierd").matches(/^01[0125][0-9]{8}$/,"invalid Phone"),
    city: Yup.string().required("Requierd")
  })

  // payment method
  let formInput=()=>{
    let inputs = document.querySelectorAll("form input[name=payment]")
    for (const input of inputs) {
      if(input.checked){
        return input.value;
      }
    }
  }

  let paymentMethode = async(value)=>{
    let method= formInput()
    if (method==undefined) {
      setErrPayment(true)
    }else if (method=="cash"){
     await payCach(value)
      setErrPayment(false);
    }else if(method=="visa"){
      await payVisa(value)
      setErrPayment(false);
    }
   

  }
// payment method by cash 
  let payCach = async(value)=>{
    setPayLoding(true)
    let {data} = await axios.post("https://route-ecommerce-app.vercel.app/api/v1/orders/"+cartid,{shippingAddress:{value}},{headers}).catch(()=>{toast.error("check connection");setPayLoding(false)})
    if(data?.status=="success"){
      setPayLoding(false)
      setPayData(data?.data)
      handleShow()
    }
  }
// payment method by online 
  let payVisa = async(value)=>{
    setPayLoding(true)
    let {data} = await axios.post("https://route-ecommerce-app.vercel.app/api/v1/orders/checkout-session/"+cartid+"?url=https://e-commerce-gray-alpha.vercel.app",{shippingAddress:value},{headers}).catch(()=>{
    toast.error("check connection");setPayLoding(false)})
    if(data?.status=="success"){
      setPayLoding(false)
      window.open(data?.session?.url, "_self")
    }
  }
  // get country from api 
  let country=async()=>{
    let {data}= await axios.get("https://countriesnow.space/api/v0.1/countries").catch(()=>{toast.error("check data connection")})
    setAllCountries(data?.data?.map(((arr)=>arr.country)))
  }
  // get cities from api 
  let cities=async(country)=>{
    let {data}= await axios.post("https://countriesnow.space/api/v0.1/countries/cities",{"country":country}).catch(()=>{ 
    toast.error("check data connection")})
    setAllCities(data.data)
  }

  // using formik hook for validate form
  let paymentForm =useFormik({
    initialValues:{
        details: "",
        phone: "",
        city: ""
    },validationSchema:paySchema,onSubmit :(values)=>{paymentMethode(values)}
  })

  useEffect(()=>{
    country()
  },[])
  return (
    <>
      <div className="container py-5 my-5">
          <div className="row">
            <div className="col-md-6 mx-auto">
                <div className="shadow-lg p-5 text-center">
                  <button className='btn btn-sm btn-secondary d-flex'><Link to={"/cart"} className="nav-link">Back</Link></button>
                  <h3 className='badge bg-success fs-2 mt-2 mb-5'>Payment Details</h3>
                    <p className='h5 text-start my-2'> Name : <span className='text-muted'>{userData?.name}</span></p>
                <form onSubmit={paymentForm.handleSubmit}> 

                      <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="details" value={paymentForm.values.details} onBlur={paymentForm.handleBlur} onChange={paymentForm.handleChange} name='details'placeholder ="name@example.com"/>
                        <label htmlFor="details">Address</label>
                      </div>
                      {paymentForm.errors.details && paymentForm.touched.details?<><div className='alert alert-danger text-start'>{paymentForm.errors.details}</div></>:""}

                      <div className="form-floating mb-2">
                          <input type="tel" className="form-control" id="phone" value={paymentForm.values.phone} onBlur={paymentForm.handleBlur} onChange={paymentForm.handleChange} name='phone' placeholder="phone"/>
                          <label htmlFor="phone">Phone</label>
                      </div>
                      {paymentForm.errors.phone && paymentForm.touched.phone?<><div className='alert alert-danger text-start'>{paymentForm.errors.phone}</div></>:""}

                      <div className="row">
                        <div className="col-md-4">
                        <div className="form-floating mb-2">
                          <select className='form-control fw-bold ' onChange={(e)=>{cities(e.target.value.toLowerCase());}} id="country">
                            <optgroup>
                            <option selected className='fw-bold'>Select Country</option>
                            {allCountries?.map((country,index)=><><option key={index} value={country}>{country.split(" ").splice(0,2).join(" ").toUpperCase()}</option></>)}
                            </optgroup>
                          </select>
                          <label htmlFor="country">country</label>
                      </div>

                        </div>
                        <div className="col-md-8"><div className="form-floating mb-2">
                        <select className="form-control"  name='city' value={paymentForm.values.city} onBlur={paymentForm.handleBlur} onChange={paymentForm.handleChange}   id="city">
                            <optgroup label="Select your City">
                            {allCities?.map((city,index)=><><option key={index} value={city}>{city.split(" ").splice(0,2).join(" ").toUpperCase()}</option></>)}
                            </optgroup>
                          </select>
                          <label htmlFor="city">city</label>
                      </div>
                      {paymentForm.errors.city && paymentForm.touched.city?<><div className='alert alert-danger text-start'>{paymentForm.errors.city}</div></>:""}</div>
                      </div>
                   
                      <div>
                              <div className="my-3"><div className="form-check text-start" >
                                <input className="form-check-input" type="radio" name="payment" value="cash" id="cash"  />
                                <label className="form-check-label " htmlFor="cash">Pay Cash</label >
                              </div>
                              <div className="form-check text-start ">
                                <input className="form-check-input" type="radio" name="payment" value="visa" id="visa"/>
                                <label className="form-check-label text-start" htmlFor="visa"> Pay Online </label>
                              </div>
                              {errPayment?<><div className='alert alert-danger'>please check Payment</div></>:""}
                              </div>
                          </div>

                      <button type='submit' className='btn btn-success w-50 my-2' disabled={!(paymentForm.dirty&&paymentForm.isValid)} >{payLoading?<i className='fa-solid fa-spin fa-spinner' ></i>:"Submit"}</button>
                  </form>
                  <>
                  <Modal show={show} onHide={()=>{handleClose();navegate("/allorders")}}>
                      <Modal.Header closeButton>
                        <Modal.Title>Payment Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {payData?<>
                          <h3 className='h5 pt-1'>Name : {userData?.name}</h3>
                          <p className='my-0'> <span className='fw-bold'>Payment Method :</span> {payData?.paymentMethodType}</p>
                          <p className='my-0'> <span className='fw-bold'>Tax Price :</span> {payData?.taxPrice}</p>
                          <p className='my-0'><span className='fw-bold'>Total Price :</span> {payData?.totalOrderPrice} EGP </p>
                        </>:""}
                      </Modal.Body>
                    </Modal></>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

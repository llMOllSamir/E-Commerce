import React, { useEffect, useState } from 'react'
import styles from "./Allorders.module.css";
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Allorders({userData}) {
let [isLoading,setIsLoading]=useState(false)
let [allorders,setAllOrders]=useState([])
let [error,setError]=useState(null)


let dataOrders=async()=>{
  if (userData!=undefined) {
    setIsLoading(true)
    let data = await axios.get("https://route-ecommerce-app.vercel.app/api/v1/orders/user/"+userData?.id).catch(err=>setError("error") ,setIsLoading(false))
    if (data.status==200) {
      setAllOrders(data.data)
      setIsLoading(false)
    }
  }
}
useEffect(()=>{
  dataOrders()
},[])
useEffect(()=>{
  dataOrders()
},[userData])
  return (
    
    <>
     <div className="application">
            <Helmet>
                <title>All Orders</title>
            </Helmet>
        </div>
    {isLoading?<><div className="loader-header"><div className="loader"></div></div></>:<>
      <div className="container bg-light p-5 my-5 shadow-lg">
        <div className="text-center border-bottom border-secondary"><h2 className='badge bg-success fs-2 '>All Orders</h2>
        <div className="d-flex justify-content-around mt-2"> <h3 className='h4'>Name : <span className='badge bg-secondary'>{userData?.name}</span></h3> <h3 className='h4'>User ID : <span className='badge bg-secondary'>{userData?.id} </span></h3></div></div>
        {error?<div className="alert alert-danger">Data {error}</div>:""}
      {allorders?.map((order,index)=>
      <div className="row pb-1 gy-1 border-bottom border-secondary my-4" key={index}>
            <div className="col-12 text-end"><h5 className='badge bg-success fs-5'>Order ID :{order.id}</h5></div>
            <div className="row"><div className="col-md-4"><h5>Total Price : {order.totalOrderPrice} EGP</h5></div> <div className="col-md-4"><h5>Payment Method : {order.paymentMethodType}</h5></div> <div className="col-md-4"><h5>Is Paid : {order.isPaid?<i className='text-success fa-solid fa-circle-check'></i>:<i className='fa-solid text-danger fa-circle-xmark' ></i>}</h5></div></div>
            <h5 className='my-2'>Shipping Address : </h5>
            <div className="row"><div className="col-md-4"><h6>City : {order?.shippingAddress?.city}</h6></div><div className="col-md-4"><h6>Details : {order.shippingAddress?.details}</h6></div><div className="col-md-4"><h6>Phone : {order?.shippingAddress?.phone}</h6></div></div>
      </div>
      )}
      </div>
    </>}</>
  )
}

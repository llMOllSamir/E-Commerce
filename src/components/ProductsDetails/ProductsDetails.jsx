import React, { useContext, useEffect } from 'react'
import styles from "./ProductsDetails.module.css";
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext.js';
import { WishContext } from '../../Context/WishContext';


export default function ProductsDetails() {
  let [isLoading,setIsLoading]=useState(true)
  let [cartLoading,setCartLoading]=useState(false)
  let [product,setProduct]=useState({})
  let {id}=useParams()
  let {wishing,wishData} =useContext(WishContext)


 let {addCartItem,setCartCounter}= useContext(CartContext)

  let getProducts= async ()=>{
    setIsLoading(true)
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products/"+id);
    setProduct(data.data);
    setIsLoading(false)
    
  };

  let addCartItemhandel = async (id)=>{
    setCartLoading(true)
   let response = await addCartItem(id)
   if(response?.data?.status=="success"){
    toast.success(response.data.message,{position:"bottom-left",className:"shadow-lg text-center"})
    setCartLoading(false)
    setCartCounter(response?.data?.numOfCartItems)

   }else{
    toast.error("Check Connection",{position:"bottom-left",className:"shadow-lg text-center"})
    setCartLoading(false)
   }
  }
  
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: false,
    autoplay:true,
    infinite: true,
    autoplaySpeed:2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />
  };

  let isWish =(id)=>{
    
    for (const data of wishData) {
      if(data._id==id){
        return true
      }
    }
    return false
  }
  useEffect(()=>{
    getProducts()}
  ,[])

  return (
    <>
      {isLoading?<>
        <div className="loader-header">
          <div className="loader"></div>
        </div>
      </>:<>
      <div className="container d-flex align-items-center my-5">
        <div className="bg-main-light d-flex align-items-center w-100 pt-5 shadow-lg " >
            <div className="row w-100 px-5">
                <div className="col-lg-2">
                <Slider {...settings}>
                        {product.images.map((img)=><div><img src={img}  className='w-100'    alt="" /></div>)}
                        </Slider>
                  </div>
                <div className="col-lg-10 my-3">
                    <h2>{product.title}</h2>
                   <div className="d-flex align-align-items-center my-3"><h4>Category:</h4><p className='badge bg-success fw-bold mx-2 fs-6 my-auto'>{product?.category?.name}</p></div>
                   <div className="d-flex align-align-items-center my-3"><h4>Brand:</h4><p className='badge bg-success fw-bold mx-2 fs-6 my-auto'>{product?.brand?.name}</p></div>
                   <div className="my-3"><h4>Description:</h4><p className=' fw-bold mx-2 fs-6 my-auto'>{product.description}</p></div>
                   <div className="row ps-1 pe-5 my-3"> 
                        <div className="col-lg-6"><div className='fw-bold d-flex align-align-items-center my-1'><h5>Price:</h5> <p className='badge bg-success fw-bold mx-2 fs-6 my-auto'>{product?.price} EGP</p></div></div>
                        <div className="col-lg-6"><div className='fw-bold d-flex align-align-items-center my-1'><h5>Rating:</h5> <p className='badge bg-success fw-bold mx-2 fs-6 my-auto'> {product?.ratingsAverage}<i className='fa fa-star text-warning'></i></p></div></div>
                      <div className="row align-items-baseline gx-0">
                        <div className="col-11"><button className='btn btn-success w-100 fw-bold my-5' onClick={()=>{addCartItemhandel(product._id)}}>{cartLoading?<i className="fa-solid fa-spin fa-spinner"></i>:"+ Add Cart"}</button></div>
                        <div className="col-1"><button className='btn mb-1 text-danger' onClick={(event)=>{wishing(event,product._id)}}>
                          <i className={isWish(product._id)?"fa-solid fa-heart fa-2x":"fa-regular fa-heart fa-2x"}></i></button></div>
                        </div>
                        
            </div>
                </div>
            </div>
        </div>
        </div></>}
    </>
  )
}
import React, { useEffect, useState,useContext } from 'react'
import toast from 'react-hot-toast';
import { CartContext } from '../../../Context/CartContext.js';
import styles from "./FeaturesProducts.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { WishContext } from '../../../Context/WishContext.js';

export default function FeaturesProducts({}) {
  const [products,setProducts] = useState([]);
  let [cartLoading,setCartLoading]=useState(false)
  let [isLoading,setIsLoading]=useState(false)
  let {addCartItem,setCartCounter,getCartCounter}= useContext(CartContext)

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
  let {wishing,wishData, getWishinglist} =useContext(WishContext)
  
  // add wishing 

  let getProducts=async()=>{
    setIsLoading(true)
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data.filter((product,index)=> index<12));
    setIsLoading(false)
  };
    useEffect(()=>{
      getProducts()
      getCartCounter()
      getWishinglist()
    },[])
    let isWish =(id)=>{
    
      for (const data of wishData) {
        if(data._id==id){
          return true
        }
      }
      return false
    }

  return (
    <>{isLoading?<><div className="loader-header bg-transparent h-50"><div className="loader"></div></div></>:<>
    <div className="container my-5">
      <div className="row g-2">
      {products?.map((product,index)=> <div key={index} className='col-lg-2 col-md-4'><div className="product p-2  shadow-lg">
          <Link to={"/productsDetails/"+product._id} className='nav-link'>
          <img src={product?.imageCover} className='img-fluid' alt="" />
          <p className='text-success fw-bold'>{product?.category?.name}</p>
            <h3 className='h6'>{product?.title?.split(" ").splice(0,2).join(" ")}</h3>
            <div className="d-flex justify-content-between"> 
            <p className='mb-1'>{product?.price} EGP</p>
            <div className="rate">
              <span>{product?.ratingsAverage}</span><i className='fa fa-star text-warning'></i>
            </div>
            </div>
            </Link>
            <button className='btn mb-1 text-danger' onClick={(event)=>{wishing(event,product._id)}}><i className={isWish(product._id)?"fa-solid fa-heart fa-2x":"fa-regular fa-heart fa-2x"}></i></button>
          <button className='btn btn-success w-100' onClick={()=>{addCartItemhandel(product._id)}}>{cartLoading?<i className="fa-solid fa-spin fa-spinner"></i>:"+ Add Cart"}</button>
        </div></div>)}
        <div className="col-lg-2 col-md-4 align-self-end my-5"><Link to={"/products"} className='mt-auto badge fs-6 bg-main nav-link'> More Products....</Link></div>
      </div>
    </div>
    </>}</>
  )
}

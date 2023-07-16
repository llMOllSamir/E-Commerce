import React, { useState,useContext ,useEffect } from 'react'
import styles from "./Products.module.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext.js';
import { WishContext } from '../../Context/WishContext.js';
import { Helmet } from 'react-helmet';


export default function Products() {
  let [isLoading,setIsLoading]=useState(true)
 const [products,setProducts] = useState([]);
 let [cartLoading,setCartLoading]=useState(false)
  let {addCartItem,setCartCounter}= useContext(CartContext)
  let {wishing,wishData} =useContext(WishContext)

  let addCartItemhandel = async (id)=>{
    setCartLoading(true)
   let response = await addCartItem(id)
   if(response?.data?.status=="success"){
    setCartCounter(response?.data?.numOfCartItems)
    toast.success(response.data.message,{position:"bottom-left",className:"shadow-lg text-center"})
    setCartLoading(false)
   }else{
    toast.error("Check Connection",{position:"bottom-left",className:"shadow-lg text-center"})
    setCartLoading(false)
   }
  }

  let isWish =(id)=>{
    
    for (const data of wishData) {
      if(data._id==id){
        return true
      }
    }
    return false
  }

  let getProducts=async()=>{
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/products");
    setProducts(data.data);
    setIsLoading(false)
  };
    useEffect(()=>{
      getProducts()
    },[])
  return (
    <>
     <div className="application">
            <Helmet>
                <title>Products</title>
            </Helmet>
        </div>
    {isLoading?<>
    <div className="loader-header">
      <div className="loader"></div>
    </div>
    </>:<>
    <div className="container my-5">
      <div className="row g-2">
      {products?.map((product,index)=> <div key={index} className='col-lg-2 col-md-4'><div className="product p-2 shadow-lg ">
          <Link to={"/productsDetails/"+product._id} className='nav-link'>
          <img src={product?.imageCover} className='img-fluid' alt="" />
          <p className='text-success fw-bold'>{product?.category?.name}</p>
            <h3 className='h6'>{product?.title?.split(" ").splice(0,2).join(" ")}</h3>
            <div className="d-flex justify-content-between"> 
            <p>{product?.price} EGP</p>
          
            <div className="rate">
              <span>{product?.ratingsAverage}</span><i className='fa fa-star text-warning'></i>
            </div>
            </div>
            </Link>
            <button className='btn mb-1 text-danger' onClick={(event)=>{wishing(event,product._id)}}><i className={isWish(product._id)?"fa-solid fa-heart fa-2x":"fa-regular fa-heart fa-2x"}></i></button>
          <button className='btn btn-success w-100'onClick={()=>{addCartItemhandel(product._id)}}>{cartLoading?<i className="fa-solid fa-spin fa-spinner"></i>:"+ Add Cart"}</button>
        </div></div>)}
      </div>
    </div>

    </>}
    </>
  )
}

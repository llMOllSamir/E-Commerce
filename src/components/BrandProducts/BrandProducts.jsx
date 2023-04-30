import React, { useEffect,useContext, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext.js';
import { WishContext } from '../../Context/WishContext.js';

export default function BrandProducts() {
  let [isLoading,setIsLoading]=useState(true)
  const [products,setProducts] = useState([]);
  let [specialBrand,setSpecialBrand]=useState([])
  let {id} = useParams()
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
  async function getSpecialBrands(){
    let {data}= await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/brands/`+id);
    setSpecialBrand(data.data);
   getProducts(data.data.name)
  };

  let getProducts=async(brands)=>{
    setIsLoading(true)
    let {data}= await axios.get("https://route-ecommerce-app.vercel.app/api/v1/products");
    setProducts(data.data.filter((product)=> product?.brand?.name==brands ));
    setIsLoading(false)
  };

  useEffect(()=>{
    getSpecialBrands()
  },[id])

  return (
   <>
   {isLoading?<>
   <div className="loader-header bg-transparent h-50">
    <div className="loader"></div></div></>:
     <>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="text-center">
            <img src={specialBrand?.image} className='shadow-lg' height={"300px"} width={"300px"} alt="" />
          </div>
        </div>
        <div className="row my-5">

        {products?.map((product,index)=> <div key={index} className='col-lg-2 col-md-4'><div className="product p-2 shadow-lg ">
          <Link to={"/productsDetails/"+product._id} className='nav-link'>
          <img src={product?.imageCover} className='img-fluid mb-1' alt="" />
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
    </div>
    
    </>}
   
   </>
  )
}

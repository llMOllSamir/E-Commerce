import React, { useContext, useEffect, useState } from 'react'
import styles from "./Cart.module.css";
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Component For Getting Cart Details
export default function Cart() {
  let {userID}=useContext(CartContext)
  const [show, setShow] = useState(false);
  let[isLoading,setIsLoading]=useState(true)
  let [cartData,setCartData]=useState([])
  let [err,setErr]=useState(null)
  let [counLoading,setCountLoading]=useState(false)
  let [removeLoading,setRemoveLoading]=useState(false)
  let {setCartCounter}= useContext(CartContext)
//  getting Cart  
  let getCartData= async()=>{
    setIsLoading(true)
    let { data } = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .catch(()=> {
      setIsLoading(false)
      setErr("No cart exist for this user")
      ;
      });
      setIsLoading(false)
      setCartData(data.data)
      setCartCounter(data.numOfCartItems)
  }

// Updating cart Product quantity
let updateProductQuantity=async(productId,productCount)=>{
  setCountLoading(true)
 if (productCount>0){ let {data} = await axios
 .put("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{count:productCount}, {
   headers: {
     token: localStorage.getItem("userToken"),
   },
 }).catch((err)=>{setCountLoading(false)
   toast.error(err.status)})
   setCartData(data.data)
   setCartCounter(data.numOfCartItems)
   if (data.status=="success") {
   toast.success(data.status)
   setCountLoading(false);
   setCartCounter(data.numOfCartItems)
   }}else{await removeItemCart(productId)
    setCountLoading(false)}
}


// remove Item From Cart 
let removeItemCart=async(productId)=>{
  setRemoveLoading(true)
  let {data} = await axios
  .delete("https://ecommerce.routemisr.com/api/v1/cart/"+productId,{
    headers: {
      token: localStorage.getItem("userToken"),
    },
  }).catch((err)=>{
    setRemoveLoading(false)
  toast.error(err.response.data.statusMsg + " check connection")
  })
  if (data.status=="success") {
    setRemoveLoading(false)
    toast.success(data.status)
    setCartCounter(data.numOfCartItems)
      setCartData(data.data)
      if(data.numOfCartItems==0){removeCart()}
    }
}

// remove Cart
let removeCart= async()=>{
let {data} = await axios
.delete("https://ecommerce.routemisr.com/api/v1/cart/",{
  headers: {
    token: localStorage.getItem("userToken"),
  },
}).catch((err)=>{toast.error("error check Connection")})
  if(data.message){getCartData()}
}
// remove cart alert
const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

// Loading Data In the Cart
  useEffect(()=>{
    getCartData()
  },[])

  
  return (
    <>
     <div className="application">
            <Helmet>
                <title>Cart</title>
            </Helmet>
        </div>
    {isLoading?
      <>
      <div className="loader-header">
        <div className="loader"></div>
      </div>
      </>
    :<>{err?<><div className="container">
      <div className='container pt-5 mt-5'><div className="alert alert-danger py-5 mt-5"><h3>{err}</h3></div></div>
    <button className='btn btn-success d-flex mx-auto'><Link to={"/"} className='nav-link'>Go Home</Link></button>
    </div>
    </>:<>
        <div className="container my-5 py-5">
          <div className="bg-main-light shadow-lg my-5 p-5">
            <h3 className='mb-3'> Cart Details</h3>
            <h4 className='mb-3 text-end'> Total Price : <span className='badge bg-success'>{cartData.totalCartPrice} EGP</span></h4>
            {cartData?.products?.map((product)=><div key={product._id} className="row border-bottom border-bottom-1 border-secondary py-2 my-3 ">
                  <div className=" col-md-2 col-lg-1"> <img src={product.product.imageCover} className='w-100' alt="" /></div>
                  <div className="col-md-10 col-lg-11">
                    <h4>{product.product.title}</h4>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>Price : {product.price} EGP</h5>
                      <div className="d-flex justify-content-center align-items-center">
                        <button className='btn btn-danger btn-sm mx-1' onClick={()=>{updateProductQuantity(product.product._id,(product.count-1))}}>-</button>
                        <p className='badge bg-secondary fs-6 my-0 py-2'>{counLoading?<><i className="fa-solid fa-spin fa-spinner"></i></>:<>{product.count}</>}</p>

                        <button className='btn btn-success btn-sm mx-1' onClick={()=>{updateProductQuantity(product.product._id,(product.count+1))}}>+</button>
                      </div>
                      </div>
                      <button className='btn btn-outline-danger btn-sm' onClick={()=>{removeItemCart(product.product._id)}}>{removeLoading?<i className='fa-solid fa-spin fa-spinner' ></i>:<i className='fa fa-trash' ></i>} Remove</button>
                  </div>
            </div>)}
            <div className="d-flex justify-content-end">
              <button className='btn btn-danger mx-1' onClick={handleShow}>Cancel Order</button>
              <button className='btn btn-success mx-1'><Link to={"/payment/"+cartData?._id} className='nav-link'>Confirm Order</Link></button>
              <>

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Remove Cart</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are You Sure You Want Remove Cart
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      NO
                    </Button>
                    <Button variant="danger" onClick={removeCart}>YES</Button>
                  </Modal.Footer>
                </Modal>
              </>
             


            </div>
          </div>
        </div>
         </>}</>}
    
    </>
  )
}

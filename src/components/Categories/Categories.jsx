import React, { useEffect, useState } from 'react'
import styles from "./Categories.module.css";
import axios from 'axios';
import Slider from 'react-slick';
import { Link, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Categories() {
  let[isLoading,setIsLoading]=useState(true)
  const [categories,setCategories] = useState([]);


  async function getCategories(){
    setIsLoading(true)
    let {data}= await axios.get("https://route-ecommerce-app.vercel.app/api/v1/categories");
    setCategories(data.data);
    setIsLoading(false)
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  


  let settings = {
    dots: false,
    className:"my-5 ",
    autoplaySpeed:2000,
    focusOnSelect:true,
    autoplay:true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
      prevArrow: <SampleNextArrow />,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },{
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          className:"w-90",
          slidesToScroll: 1,}
        }]
  };

useEffect(()=>{
  getCategories()
},[])


  return (
    
   <>
    <div className="application">
            <Helmet>
                <title>Categories</title>
            </Helmet>
        </div>
   {isLoading?<>
   <div className="loader-header">
    <div className="loader"></div>
   </div>
   </>:<><div className="container">
    <Slider {...settings}>
    {categories.map((category,index)=><div key={index} className=''>
      <Link to={`categoryProducts/`+category?._id} className='nav-link'>
      <img src={category?.image} className='w-100 px-2 shadow-lg' height={"250px"}   alt="" />
      <div className="text-center my-2">
      <h3 className='badge bg-dark fs-6'>{category.name}</h3>
      </div>
      </Link>
    </div>)}
      </Slider> 
      <Outlet/>
    </div></>}
    
    
   </>
    
  )
}

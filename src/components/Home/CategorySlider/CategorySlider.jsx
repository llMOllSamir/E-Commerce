import React, { useEffect, useState } from 'react'
import styles from "./CategorySlider.module.css";
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function CategorySlider({}) {
  const [categories,setCategories] = useState([]);



  async function getCategories(){
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    setCategories(data.data);
  };

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
    centerMode: true,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },{
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          className:"w-75 mx-auto",
          slidesToScroll: 1,}
        }]
  };

useEffect(()=>{
  getCategories()
},[])

  return (
    <>
    <Slider {...settings}>
    {categories.map((category,index)=><div key={index} className=''>
      <Link to={`/categories/categoryProducts/`+category._id} className='nav-link'>
      <img src={category?.image} className='w-100 px-2 shadow-lg' height={"250px"}   alt="" />
      <div className="text-center my-2">
      <h3 className='badge bg-success fs-6'>{category.name}</h3>
      </div>
      </Link>
    </div>)}
      </Slider> 
      
      </>
  )
}

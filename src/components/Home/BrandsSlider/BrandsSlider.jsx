import React, { useEffect, useState } from 'react'
import styles from "./BrandsSlider.module.css";
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export default function BrandsSlider({}) {
  const [brands,setBrands] = useState([]);


  let getBrands=async()=>{
    let {data}= await axios.get("https://route-ecommerce-app.vercel.app/api/v1/brands");
    setBrands(data.data);
  };

  let settings = {
    dots: false,
    className:"my-5",
    autoplaySpeed:2000,
    focusOnSelect:true,
    centerMode: true,
    autoplay:true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,

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
          className:"w-75 mx-auto",
          slidesToScroll: 1,}
        }],
    swipeToSlide:true
  };

useEffect(()=>{
  getBrands()
  },[])

  return (
   <>
<Slider {...settings}>
    {brands.map((brand,index)=><div key={index}>
      <Link to={"/brands/brandProducts/"+brand._id} className='nav-link'>
      <img src={brand?.image} className='img-fluid shadow-lg' alt="" />
      <div className="text-center my-2">
          <h3 className='badge bg-success fs-6'>{brand.name}</h3>
          </div>
      </Link>
    </div>)}
      </Slider> 
   </>
  )
}

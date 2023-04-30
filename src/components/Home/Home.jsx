import React, { useEffect, useState } from 'react'
import styles from "./Home.module.css";
import slide1 from '../../images/slider-image-1.jpeg';
import slide2 from '../../images/slider-image-2.jpeg';
import slide3 from '../../images/slider-image-3.jpeg';
import Slider from 'react-slick';
import CategorySlider from "./CategorySlider/CategorySlider.jsx"
import FeaturesProducts from "./FeaturesProducts/FeaturesProducts.jsx"
import BrandsSlider from "./BrandsSlider/BrandsSlider.jsx"
import {Helmet} from "react-helmet";

export default function Home() {
  let [isLoading,setIsLoading]=useState(true)
  let settings = {
    dots: false,
    autoplaySpeed:2000,
    focusOnSelect:true,
    autoplay:true,
    infinite: true,
    className:"w-50 mx-auto",
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  useEffect(()=>{
    setIsLoading(false)
  },[])

  return (
    <>
     <div className="application">
            <Helmet>
                <title>Home Page</title>
            </Helmet>
        </div>
    {isLoading?<>
      <div className="loader-header">
      <div className="loader"></div>
    </div>
    </>:<>

<div className="container">
  <Slider {...settings}>
    <div><img  src={slide1} height={"250px"} className='w-100' alt="" /></div>
      <div><img  src={slide2} height={"250px"} className='w-100' alt="" /></div>
     <div><img  src={slide3}  height={"250px"} className='w-100' alt="" /></div>
      </Slider> 
</div>
<div className="container">
<BrandsSlider />
<CategorySlider />
<FeaturesProducts />

</div>

</> }
    </>
  )
}

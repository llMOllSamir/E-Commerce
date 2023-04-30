import React, { useEffect, useState } from 'react'
import styles from "./Brands.module.css";
import axios from 'axios';
import Slider from 'react-slick';
import { Link, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Brands() {
  let [isLoading,setIsLoading]=useState(true)
  const [brands,setBrands] = useState([]);


  async function getBrands(){
    setIsLoading(true)
    let {data}= await axios.get("https://route-ecommerce-app.vercel.app/api/v1/brands");
    setBrands(data.data);
    setIsLoading(false)
  };
  useEffect(()=>{
    getBrands()
  },[])
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
    nextArrow: <SampleNextArrow />,
      prevArrow: <SampleNextArrow />,
    slidesToShow: 5,
    slidesToScroll: 1,
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
  return (
    <>
     <div className="application">
            <Helmet>
                <title>Brands</title>
            </Helmet>
        </div>
    { isLoading ?<> <div className="loader-header">
      <div className="loader"></div></div> </>:<> <div className="container">
       <Slider {...settings}>
       {brands.map((brand,index)=><div key={index}  className=''>
         <Link to={`brandProducts/`+brand?._id} className='nav-link'>
         <img src={brand?.image} className='w-100 px-2 shadow-lg' height={"250px"}   alt={brand?.slug} />
         <div className="text-center my-2">
          <h3 className='badge bg-dark fs-6'>{brand.name}</h3>
          </div>
         </Link>
       </div>)}
         </Slider> 
         <Outlet/>
       </div> </>}
       </>
  )
}

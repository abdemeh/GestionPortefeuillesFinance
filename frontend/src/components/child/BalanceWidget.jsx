import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const BalanceWidget = () => {
  const settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    speed: 800,
    centerPadding: "20px",
    infinite: true,
    autoplaySpeed: 2000,
    centerMode: true,
    autoplay: false,
  };
  return (
    <div className='card radius-16'>
      <div className='card-header'>
        <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
          <h6 className='mb-2 fw-bold text-lg mb-0'>Balance</h6>
        </div>
      </div>
      <div className='card-body p-0'>
        <div className='p-20'>
          <div className='position-relative z-1 py-32 text-center px-3'>
            <img
              src='assets/images/home-eleven/bg/bg-orange-gradient.png'
              alt=''
              className='position-absolute top-0 start-0 w-100 h-100 z-n1'
            />
            <h3 className='text-white'>$500.00</h3>
            <span className='text-white'>Your Balance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceWidget;

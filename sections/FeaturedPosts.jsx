import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


// import required modules
import { EffectCoverflow, Pagination } from "swiper";

import { FeaturedPostCard } from '../components';
import { getFeaturedPosts } from '../services';



const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, []);

  return (
    <div className="mb-8">
      <Swiper 
        effect={"coverflow"}
        
        spaceBetween={30}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        initialSlide={3}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        
        // responsive breakpoints 
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1278: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
          
               
      >
        {dataLoaded && featuredPosts.map((post, index) => (
          <SwiperSlide><FeaturedPostCard key={index} post={post} /></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedPosts;
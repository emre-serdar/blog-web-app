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
        slidesPerView={5}
        spaceBetween={30}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        initialSlide={3}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {dataLoaded && featuredPosts.map((post, index) => (
          <SwiperSlide><FeaturedPostCard key={index} post={post} /></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedPosts;
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

export default function SwipperSlide({videos}) {
  if(videos.length === undefined) return null
  else
  return (
    <>
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 7,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="dark:bg-medium mySwiper"
      >

        {
          videos.map(video => {
            if (video.Short === 0 && video.Visible === 1) {
              return (
                <SwiperSlide key={video.ID}><Slide video={video} /></SwiperSlide>
              )
            }
          })
        }
      </Swiper>
    </>
  );
}

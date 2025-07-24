// CustomSwiper.jsx
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CustomSwiper = ({ 
  slides, 
  autoplayDelay = 2500,
  spaceBetween = 30,
  showProgress = true,
  className = ''
}) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className={`w-full h-full ${className}`}>
      <Swiper
        spaceBetween={spaceBetween}
        centeredSlides={true}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          className: 'swiper-pagination-custom'
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={showProgress ? onAutoplayTimeLeft : undefined}
        className="relative w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide 
            key={index}
            className="flex items-center justify-center px-2.5 md:p-0 bg-white/95 dark:bg-gray-700 text-white"
          >
            {slide}
          </SwiperSlide>
        ))}

        {showProgress && (
          <div className="absolute right-4 bottom-4 z-10 w-12 h-12 flex items-center justify-center font-bold text-blue-500">
            <svg 
              viewBox="0 0 48 48" 
              ref={progressCircle}
              className="absolute left-0 top-0 w-full h-full stroke-current fill-none stroke-[4px]"
              style={{
                strokeDasharray: '125.6',
                transform: 'rotate(-90deg)'
              }}
            >
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
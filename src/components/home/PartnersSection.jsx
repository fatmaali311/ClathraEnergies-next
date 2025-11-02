import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { containerVariants, itemVariants, viewportSettings } from '../../utils/animations'

export default function PartnersSection({ images = {}, theme = {} }) {
  const partnerImages = Object.keys(images)
    .filter(key => key.startsWith('partners_section['))
    .sort((a, b) => {
      const indexA = parseInt(a.match(/\[(\d+)\]/)?.[1] || 0)
      const indexB = parseInt(b.match(/\[(\d+)\]/)?.[1] || 0)
      return indexA - indexB
    })
    .map(key => images[key])
    .filter(Boolean)

  const titleColor = 'var(--title-color)'
  const accentColor = theme?.accentColor || '#1e90ff'
  const showSlider = partnerImages.length > 6

  return (
    <motion.section
      className="py-12 px-4 sm:px-8 lg:px-12 bg-white relative overflow-visible" 
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportSettings}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <style>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: ${accentColor};
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          top: 50%;
          transform: translateY(-50%);
        }

        .swiper-button-prev { left: 0; }
        .swiper-button-next { right: 0; }

        @media (min-width: 768px) {
          .swiper-button-prev { left: -12px; }
          .swiper-button-next { right: -12px; }
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: ${accentColor};
          color: #fff;
        }

        @media (max-width: 640px) {
          .swiper-button-prev,
          .swiper-button-next {
            width: 32px;
            height: 32px;
            display: none !important;
          }
        }

        .swiper-pagination-bullet {
          background: rgba(0, 0, 0, 0.2);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: ${accentColor};
        }
      `}</style>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={viewportSettings}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 lg:gap-24"
      >
        {/* Title */}
        <motion.h2
          variants={itemVariants}
          className="font-semibold tracking-wide uppercase text-3xl sm:text-4xl text-center md:text-left md:whitespace-nowrap"
          style={{ color: titleColor }}
        >
          Our Partners
        </motion.h2>

        {/* Logos */}
        <motion.div
          variants={itemVariants}
          className={`flex-1 w-full ${showSlider ? 'max-w-6xl overflow-visible' : 'max-w-none'} mt-8 md:mt-12 lg:mt-16`}
        >
          {showSlider ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                480: { slidesPerView: 1 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
              loop
              className="pb-12"
            >
              {partnerImages.map((src, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-center py-6">
                    <img
                      src={src}
                      alt={`Partner ${index + 1}`}
                      className={`object-contain transition-transform duration-300 w-auto mx-auto ${
                        index === 1
                          ? 'h-44 md:h-48 lg:h-52 scale-125'
                          : 'h-32 sm:h-36 md:h-40 lg:h-44'
                      }`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start items-center gap-10 sm:gap-16 mt-4 w-full">
              {partnerImages.map((src, index) => (
                <div key={index} className="flex justify-center items-center w-full md:w-auto">
                  <img
                    src={src}
                    alt={`Partner ${index + 1}`}
                    className={`object-contain transition-transform duration-300 w-auto mx-auto ${
                      index === 1
                        ? 'h-44 md:h-48 lg:h-52 scale-125'
                        : 'h-32 sm:h-36 md:h-40 lg:h-44'
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

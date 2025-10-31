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
      className="py-12 px-4 sm:px-8 bg-white relative overflow-hidden"
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
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12"
      >
        {/* ✅ Title stays readable and never overflows */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-wide uppercase text-center md:text-left flex-shrink-0"
          style={{ color: titleColor }}
        >
          Our Partners
        </motion.h2>

        {/* ✅ Slider/Grid stays inside a safe max-width */}
        <motion.div
          variants={itemVariants}
          className="flex-1 w-full max-w-5xl overflow-hidden"
        >
          {showSlider ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                768: { slidesPerView: 5 },
                1024: { slidesPerView: 6 },
              }}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500 }}
              loop
              className="pb-10"
            >
              {partnerImages.map((src, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-center">
                    <img
                      src={src}
                      alt={`Partner ${index + 1}`}
                      className="h-12 sm:h-16 md:h-20 lg:h-24 object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {partnerImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Partner ${index + 1}`}
                  className="h-12 sm:h-16 md:h-20 lg:h-24 object-contain"
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

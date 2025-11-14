import React from 'react'
import { motion } from 'framer-motion'
import { fadeUp, zoomIn, viewportSettings } from '../../utils/animations'
import { getImageUrl } from '../../utils/imageUtils'

const WhyContent = ({ page = {}, images = {} }) => {
  const stats = page.stats_section || {}
  const temps = page.temp_section || {}
  const safe = page.safe_section || {}
  const econ = page.economics_section || {}

  const getImage = (key) => getImageUrl(images?.[key] || '')

  return (
    <section className="w-full py-14 md:py-20 flex flex-col items-center bg-white">
      <div className="w-full max-w-6xl flex flex-col gap-12 px-4 md:px-6 lg:px-8">

        {/* ------------------ TOP BOX ------------------ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp()}
          className="bg-white shadow-[8px_8px_20px_rgba(0,0,0,0.15)] 
                     p-5 sm:p-6 md:p-12 flex flex-col md:flex-row items-center 
                     justify-between border-2 border-[var(--primary-green)] border-r-[var(--primary-blue)] 
                     gap-6 md:gap-0"
        >
          <motion.img
            src={getImage('why_ball_left')}
            alt="ball left"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain"
            variants={zoomIn}
          />

          <div className="flex-1 flex flex-col items-center justify-center text-center px-2 md:px-8">
            <p className="font-semibold text-lg sm:text-xl md:text-2xl mb-1 leading-tight"
              style={{ color: "var(--title-color)" }}>
              {stats.methane_text || '100–170 Nm³ methane / m³'}
            </p>

            <div className="flex items-center justify-center w-full mt-2 relative">
              <div
                className="flex-grow min-h-[3px] relative rounded-full z-0"
                style={{ backgroundColor: "var(--subtitle-color)" }}
              >
                <span
                  className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-3 h-3 border-t-[4px] border-r-[4px] rotate-45 z-10"
                  style={{ borderColor: "var(--subtitle-color)" }}
                />
              </div>



            </div>

            <p className="font-medium text-lg sm:text-xl md:text-2xl mt-2"
              style={{ color: "var(--title-color)" }}>
              {stats.brand_text || 'ClathraEnergies™'}
            </p>
          </div>

          <motion.img
            src={getImage('why_ball_right')}
            alt="ball right"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
            variants={zoomIn}
          />
        </motion.div>


        {/* ------------------ TEMP + SAFE GRID ------------------ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp()}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20"
        >
          {/* Left Temps Card */}
          <motion.div
            variants={zoomIn}
            className="bg-white shadow-[8px_8px_20px_rgba(0,0,0,0.15)] 
                       p-8 md:p-10 border-2 border-[var(--primary-green)] border-r-[var(--primary-blue)] 
                       flex flex-col items-center justify-center w-full"
          >
            <div className="grid grid-cols-2 gap-8 md:gap-16 w-full place-items-center">

              {/* Left Temp */}
              <div className="flex flex-col items-center w-full">
                <span className="font-semibold text-base md:text-lg mb-4 text-center translate-x-10"
                  style={{ color: "var(--subtitle-color)" }}>
                  {temps.left_label || 'ClathraEnergies™'}
                </span>

                <div className="flex items-center justify-center gap-3 md:gap-4">
                  <motion.img src={getImage('why_sun1')}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    alt="sun1" whileHover={{ scale: 1.1 }} />

                  <div className="flex flex-col items-center">
                    <img src={getImage('why_temp_hot')}
                      className="w-16 md:w-20 h-56 md:h-64 object-contain"
                      alt="hot thermometer" />
                    <span className="mt-3 text-base md:text-lg font-medium"
                      style={{ color: "var(--subtitle-color)" }}>
                      {temps.left_temp || '-20°C'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Temp */}
              <div className="flex flex-col items-center w-full">
                <span className="font-semibold text-base md:text-lg mb-4 text-center translate-x-10 md:translate-x-12"
                  style={{ color: "var(--subtitle-color)" }}>
                  {temps.right_label || 'BML'}
                </span>

                <div className="flex items-center justify-center gap-3 md:gap-4">
                  <motion.img src={getImage('why_sun2')}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    alt="sun2" whileHover={{ scale: 1.1 }} />

                  <div className="flex flex-col items-center">
                    <img src={getImage('why_temp_cold')}
                      className="w-16 md:w-20 h-56 md:h-64 object-contain"
                      alt="cold thermometer" />
                    <span className="mt-3 text-base md:text-lg font-medium"
                      style={{ color: "var(--subtitle-color)" }}>
                      {temps.right_temp || '-162°C'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Safe Tech */}
          <motion.div
            variants={zoomIn}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-[8px_8px_20px_rgba(0,0,0,0.15)] 
                       p-8 md:p-10 border-2 border-[var(--primary-green)] border-r-[var(--primary-blue)] 
                       flex flex-col items-center justify-center w-full"
          >
            <img src={getImage('why_green_safe')}
              className="w-52 h-52 md:w-60 md:h-60 object-contain"
              alt="safe" />

            <p className="mt-6 font-medium text-xl md:text-2xl text-center"
              style={{ color: "var(--subtitle-color)" }}>
              {safe.title || 'Safe and Green Technology'}
            </p>
          </motion.div>
        </motion.div>


        {/* ------------------ ECONOMICS ------------------ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp()}
          className="bg-white shadow-[8px_8px_20px_rgba(0,0,0,0.15)] 
                     p-8 md:p-12 flex flex-col md:flex-row items-center justify-between 
                     border-2 border-[var(--primary-green)] border-r-[var(--primary-blue)]"
        >
          <div className="flex gap-10 md:gap-14 items-center justify-center w-full md:w-1/2">
            <motion.img src={getImage('why_money')}
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
              alt="money" variants={zoomIn} />

            <motion.img src={getImage('why_growth')}
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
              alt="growth" variants={zoomIn} />
          </div>

          <div className="flex items-center justify-center w-full md:w-1/2 mt-8 md:mt-0 space-x-6">
            <div className="flex flex-col items-start space-y-3 text-lg md:text-2xl font-medium"
              style={{ color: "var(--subtitle-color)" }}>
              <p>{econ.capex_text || '25 - 50 % CAPEX'}</p>
              <p>{econ.opex_text || '18 - 25 % OPEX'}</p>
            </div>

            <div className="flex flex-col items-center ml-4 md:ml-6">
              <div className="h-20 md:h-24 w-1 relative rounded-full"
                style={{ backgroundColor: "var(--subtitle-color)" }}>
                <span
                  className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 
               w-3 h-3 border-b-[4px] border-r-[4px] rotate-45"
                  style={{ borderColor: "var(--subtitle-color)" }}
                />
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default WhyContent

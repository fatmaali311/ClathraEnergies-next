import React from 'react'
import { motion } from 'framer-motion'
import { getImageUrl } from '../../utils/imageUtils'

const OurGasSeparation = ({ page = {}, images = {} }) => {
  const gasSection = page.gas_separation || {}
  const gases = gasSection.gases || []

  const fireImg = getImageUrl(images?.floating_fire_image)
  const iceImg = getImageUrl(images?.floating_ice_image)
  const leafImg = getImageUrl(images?.floating_leaf_image)

  return (
    <section className="w-full max-w-6xl mx-auto p-4 ">
      {/* Title */}
      <motion.div
        className="text-center mb-6 w-full mt-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {gasSection.title || 'Cryogenic Gas Separation'}
        </motion.h2>

        <motion.p
          className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {gasSection.sub_title || ''}
        </motion.p>
      </motion.div>

      {/* Big Arrow */}
      <div className="relative w-full mb-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full aspect-[4/1] md:aspect-[5/1] max-h-56"
        >
          <svg className="w-full h-full" viewBox="0 0 1000 220" preserveAspectRatio="none">
            <defs>
              <linearGradient id="arrowGradientNext" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={(gases[0] && gases[0].color) || '#e14b2c'} />
                <stop offset="50%" stopColor={(gases[1] && gases[1].color) || '#f5a623'} />
                <stop offset="100%" stopColor={(gases[2] && gases[2].color) || '#6bbf59'} />
              </linearGradient>
            </defs>

            <rect x="0" y="65" width="880" height="95" fill="url(#arrowGradientNext)" rx="12" />
            <polygon points="870,35 870,185 990,110" fill={(gases[2] && gases[2].color) || '#6bbf59'} />
          </svg>
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.5, delayChildren: 1.4 } } }}
          className="absolute top-0 left-0 right-0 h-full flex items-center w-full pointer-events-none px-10"
        >
          <div className="w-full flex justify-between items-center">
            {fireImg && (
              <motion.img
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, transition: { duration: 1.2 } }}
                src={fireImg}
                alt="fire"
                className="w-14 sm:w-16 md:w-24"
              />
            )}

            {iceImg && (
              <motion.img
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, transition: { duration: 1.2 } }}
                src={iceImg}
                alt="ice"
                className="w-14 sm:w-20 md:w-28"
              />
            )}

            {leafImg && (
              <motion.img
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, transition: { duration: 1.2 } }}
                src={leafImg}
                alt="leaf"
                className="w-14 sm:w-16 md:w-24 mr-8"
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* Cylinders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 w-full justify-items-center mt-2">
        {(gases.length ? gases : [ { name: 'CH4', color: '#e14b2c' }, { name: 'CO2', color: '#f5a623' }, { name: 'H2', color: '#6bbf59' } ]).map((gas, i) => (
          <motion.div key={i} className="flex flex-col items-center w-3/4 max-w-[200px] md:w-full" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>

            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
              <svg className="w-14 h-28 md:w-16 md:h-36 z-10" viewBox="0 0 50 100">
                <rect x="13" y="0" width="24" height="75" fill={gas.color} rx="4" />
                <path d="M5 70 L45 70 L25 95 Z" fill={gas.color} />
              </svg>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="mb-3 z-20 bg-white/80 px-4 py-1 rounded-full shadow-sm border border-gray-100">
              <span className="text-xl md:text-2xl font-bold" style={{ color: gas.color }}>
                {gas.name && gas.name.slice(0, -1)}
                <sub className="text-sm md:text-base">{gas.name && gas.name.slice(-1)}</sub>
              </span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
              <svg className="w-14 h-28 md:w-16 md:h-36 z-10" viewBox="0 0 50 100">
                <rect x="13" y="0" width="24" height="75" fill={gas.color} rx="4" />
                <path d="M5 70 L45 70 L25 95 Z" fill={gas.color} />
              </svg>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
              {images[`gases[${i}]`] ? (
                <img src={getImageUrl(images[`gases[${i}]`])} className="w-full drop-shadow-xl relative z-0" alt={`${gas.name} cylinder`} />
              ) : null}
            </motion.div>

          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default OurGasSeparation

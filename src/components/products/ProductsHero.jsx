'use client';

import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn, fadeUp, viewportSettings } from '../../utils/animations'
import { getImageUrl } from '../../utils/imageUtils'

const ProductsHero = ({ hero = {}, images = {}, config = {} }) => {
  const bg = getImageUrl(images?.our_products_hero_image || '')

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={fadeIn}
      className="relative flex items-center justify-center h-[220px] md:h-[280px] lg:h-[320px] w-full bg-cover bg-center"
      style={{ backgroundImage: bg ? `url(${bg})` : undefined }}
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, var(--primary-green), var(--primary-green), var(--primary-blue))', opacity: 'var(--hero-gradient-opacity)' }} />
      <motion.div className="relative z-10 text-center px-4">
        <motion.h2
          variants={fadeUp()}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide"
        >
          {hero.title || 'Our Products'}
        </motion.h2>
        {hero.sub_title && (
          <motion.p variants={fadeIn} className="mt-3 text-white/90 text-sm md:text-lg leading-relaxed mx-auto" style={{ color: 'var(--subtitle-color)' }}>
            {hero.sub_title}
          </motion.p>
        )}
      </motion.div>
    </motion.section>
  )
}

export default ProductsHero

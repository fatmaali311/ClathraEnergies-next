'use client';

import React from 'react'
import { motion } from 'framer-motion'
import { getImageUrl } from '../../utils/imageUtils'
import { slideUp } from '../../utils/animations'

export default function ContactHero({ hero = {}, images = {} }) {
  const bg = getImageUrl(images.contact_hero_image || '')

  return (
    <section
      className="relative z-10 flex items-center justify-center h-[280px] w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, var(--primary-green), var(--primary-green), var(--primary-blue))', opacity: 'var(--hero-gradient-opacity)' }} />

      <motion.div initial="hidden" animate="show" variants={slideUp} className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center">{hero.title || 'Contact Us'}</h1>
        {hero.sub_title && (
          <p className="mt-3 text-white/90 text-base md:text-xl leading-relaxed mx-auto text-center" >
            {hero.sub_title}
          </p>
        )}
      </motion.div>
    </section>
  )
}

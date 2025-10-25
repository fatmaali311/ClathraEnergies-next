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
      <div className="absolute inset-0 bg-gradient-to-l from-[var(--primary-green)]/85 via-[var(--primary-green)]/75 to-[var(--primary-blue)]/70" />

      <motion.div initial="hidden" animate="show" variants={slideUp} className="relative z-10 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">{hero.title || 'Contact Us'}</h1>
      </motion.div>
    </section>
  )
}

'use client';

import Image from 'next/image'

import GButton from '../GButton'

import { motion } from 'framer-motion'
import { slideLeft, slideUp, viewportSettings } from '../../utils/animations'
import { getImageUrl } from '../../utils/imageUtils'

export default function HeroSection({ hero = {}, images = {}, theme = {} }) {
  const buttons = hero.buttons || []
  const bg = getImageUrl(images.home_hero_image || '')

  return (
    <section
      className="relative min-h-[93vh] bg-cover flex items-center w-full bg-center"
      style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center 60%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, var(--primary-green), var(--primary-green), var(--primary-blue))', opacity: 'var(--hero-gradient-opacity)' }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white font-sans text-center lg:text-left">
        <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight max-w-3xl mx-auto lg:mx-0" variants={slideLeft} initial="hidden" whileInView="show" viewport={viewportSettings}>{hero.title}</motion.h1>
        <motion.p className="mt-6 sm:mt-8 text-lg sm:text-2xl font-normal leading-sung max-w-5xl text-white/95 mx-auto lg:mx-0" variants={slideUp} initial="hidden" whileInView="show" transition={{ delay: 0.2 }} viewport={viewportSettings}>{hero.sub_title}</motion.p>

        <motion.div className="mt-10 flex flex-col md:flex-row gap-4 sm:gap-5 lg:gap-8 w-full items-center justify-center" variants={slideLeft} initial="hidden" whileInView="show" transition={{ delay: 0.4 }} viewport={viewportSettings}>
          {buttons.map((item, idx) => {
            const key = `${item.id ?? item.name ?? item.link ?? `btn-${idx}`}`
            return (
              <GButton
                key={key}
                href={item.link}
                size="xl"
                className="w-full sm:w-72 shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1 text-center"
                ariaLabel={item.name || `button-${idx}`}
              >
                {item.name}
              </GButton>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn, fadeUp, viewportSettings } from '../../utils/animations'
import { getImageUrl } from '../../utils/imageUtils'

const OurHero = ({ hero = {}, images = {}, config = {} }) => {
  const bg = getImageUrl(images?.our_hero_image || '')
const heroOpacity = config.heroGradientOpacity || '0.75'; // '0.75'

  // 2. Calculate the specific opacity values for the gradient stops
  // We use parseFloat and Math.min/max for safety and calculate derived opacities.
  const baseOpacity = Math.max(0.1, Math.min(1, parseFloat(heroOpacity))); // Ensure between 0.1 and 1
  const stop1Opacity = baseOpacity; // 100% of base
  const stop2Opacity = baseOpacity * 0.8; // 80% of base
  const stop3Opacity = baseOpacity * 0.6; // 60% of base

  // 3. Construct the inline style for the gradient overlay
  const gradientStyle = {
    backgroundImage: `linear-gradient(to left, 
      rgba(var(--primary-green-rgb), ${stop1Opacity}) 60%, 
      rgba(var(--primary-green-rgb), ${stop2Opacity}) 70%, 
      rgba(var(--primary-blue-rgb), ${stop3Opacity}) 100%
    )`,
  };
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={fadeIn}
      className="relative flex items-center justify-center h-[220px] md:h-[280px] lg:h-[320px] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
<div 
        className="absolute inset-0"
        style={gradientStyle} 
      />      <motion.div className="relative z-10 text-center px-4">
        <motion.h2
          variants={fadeUp()}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide"
        >
          {hero.title || 'Our Technology'}
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

export default OurHero

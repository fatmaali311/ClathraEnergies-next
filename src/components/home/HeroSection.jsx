import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { slideLeft, slideUp, viewportSettings, cardSlideUp } from '../../utils/animations'
import { getImageUrl } from '../../utils/imageUtils'

export default function HeroSection({ hero = {}, images = {}, theme = {} }) {
  const buttons = hero.buttons || []
  const bg = getImageUrl(images.home_hero_image || '')

  return (
    <section
      className="relative min-h-[90vh] bg-cover flex items-center w-full bg-center"
      style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center 60%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0 bg-gradient-to-l from-[var(--primary-green)]/55 via-[var(--primary-green)]/45 to-[var(--primary-blue)]/40" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white font-sans text-center lg:text-left">
        <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight max-w-3xl mx-auto lg:mx-0" variants={slideLeft} initial="hidden" whileInView="show" viewport={viewportSettings}>{hero.title}</motion.h1>
        <motion.p className="mt-6 sm:mt-8 text-lg sm:text-2xl font-normal leading-relaxed max-w-4xl text-white/95 mx-auto lg:mx-0" variants={slideUp} initial="hidden" whileInView="show" transition={{ delay: 0.2 }} viewport={viewportSettings}>{hero.sub_title}</motion.p>

  <motion.div className="mt-10 flex flex-col md:flex-row gap-4 sm:gap-5 lg:gap-8 w-full items-center justify-center" variants={slideLeft} initial="hidden" whileInView="show" transition={{ delay: 0.4 }} viewport={viewportSettings}>
          {buttons.map((item, idx) => {
            const key = `${item.id ?? item.name ?? item.link ?? `btn-${idx}`}`
            return (
              <Link key={key} href={item.link || '/'} aria-label={item.name || `button-${idx}`} className="w-full sm:w-[260px] md:w-[280px] lg:w-[240px] h-[60px] sm:h-[70px] md:h-[75px] lg:h-[80px] text-base sm:text-lg font-normal flex items-center justify-center bg-white text-[var(--primary-green)] transition-all duration-300 hover:bg-[var(--primary-green)] hover:text-white shadow-md">
                {item.name}
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

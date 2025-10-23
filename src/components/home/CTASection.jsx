import GButton from '../GButton'
import BorderLines from '../common/BorderLines'
import { motion } from 'framer-motion'
import { viewportSettings } from '../../utils/animations'

export default function CTASection({ cta = {}, images = {} }) {
  const title = cta.title || 'Get Free Consultation'
  const bg = images.home_cta_image || ''
  return (
    <section
      className="relative bg-no-repeat bg-[center_90%] bg-cover mb-12 min-h-[180px] md:h-[220px] flex items-center justify-center w-full min-w-full overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
      role="img"
      aria-label="Laboratory background with call to action for free consultation"
    >
      <BorderLines position="left" />

      <div className="absolute inset-0 bg-gradient-to-l from-[var(--primary-green)]/70 via-[var(--primary-green)]/50 to-[var(--primary-blue)]/60"></div>
      <div className="relative z-10 flex items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8 ">
        <motion.div
          className={`bg-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl shadow-2xl 
             w-full max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto flex 
             items-center justify-center`}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={viewportSettings}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-6 text-gray-700 w-full text-center md:text-left">
            <motion.h2
              className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-[var(--primary-green)] leading-snug"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={viewportSettings}
            >
              {title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={viewportSettings}
            >
              <GButton
                href={cta.button?.link || '/contact'}
                size="md"
                className="sm:min-h-[64px] sm:px-12 sm:text-lg lg:min-h-[80px] lg:px-16 lg:text-xl"
              >
                {cta.button?.name || 'Contact Us'}
              </GButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

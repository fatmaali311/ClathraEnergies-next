import React from 'react'
import { motion } from 'framer-motion'
import { viewportSettings } from '../../utils/animations'

const getCardStyle = (color) => {
  if (!color) return {}
  if (typeof color !== 'string') return {}
  if (color.startsWith('#')) return { backgroundColor: color }
  return {}
}

// Fade-up animation for large cards
const fadeUpCard = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
}

// Fade-up animation for small cards inside large card
const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4 },
  }),
}

const SolutionsCards = ({ page = {} }) => {
  const categories = page.solutions_section || []
  const sectionTitle = page.solutions_section_title || 'Our Innovative Solutions'

  return (
    <section className="w-full py-20 bg-white flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-14 tracking-wide text-center"
      >
        {sectionTitle}
      </motion.h2>

      <div className="w-full max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-6">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={fadeUpCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`rounded-2xl p-5 flex flex-col items-center min-h-[550px] shadow-md border border-[#1b85b816] bg-gradient-to-b`}
            style={{ background: `linear-gradient(180deg, ${cat.bgFrom || '#e8f5f8'}, ${cat.bgTo || '#f1faef'})` }}
          >
            {/* Large Card Title */}
            <motion.div
              variants={fadeUpItem}
              custom={0}
              initial="hidden"
              animate="visible"
              className="h-20 flex items-start justify-center mt-6 mb-4"
            >
              <h3 className="font-bold text-center tracking-wide leading-snug whitespace-pre-line text-[17px] md:text-[19px] text-gray-900">
                {cat.title}
              </h3>
            </motion.div>

            {/* Small Cards */}
            <div className="flex flex-col w-full gap-6 flex-1 mb-6">
              {cat.cards.map((item, i) => {
                const color = cat.cardColors?.[i]
                const style = getCardStyle(color)
                const classFrom = typeof color === 'string' && color.startsWith('bg-') ? color : ''
                return (
                  <motion.div
                    key={i}
                    custom={i + 1}
                    variants={fadeUpItem}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`flex-1 w-full rounded-xl ${classFrom} flex items-center justify-center text-white font-semibold text-center px-4 text-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.03]`}
                    style={style}
                  >
                    {item}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default SolutionsCards

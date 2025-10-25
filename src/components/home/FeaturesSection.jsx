import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants, viewportSettings } from '../../utils/animations'
import { getImageUrl } from '../../utils/imageUtils'

export default function FeaturesSection({ features = [], images = {} }) {
  return (
    <motion.section
      className="section-container relative overflow-hidden"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportSettings}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSettings}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const iconKey = `home_feature_icon${index + 1}`
            const iconSrc = getImageUrl(images[iconKey])

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 flex flex-col items-center text-center"
              >
                <motion.div
                  className="mb-6"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 150
                  }}
                >
                  {iconSrc ? (
                    <img
                      src={iconSrc}
                      alt={feature.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                    />
                  ) : null}
                </motion.div>

                <h3
                  className="text-xl sm:text-2xl font-semibold mb-3"
                  style={{ color: 'var(--title-color)' }}
                >
                  {feature.title}
                </h3>

                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: 'var(--subtitle-color)' }}
                >
                  {feature.sub_title}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}

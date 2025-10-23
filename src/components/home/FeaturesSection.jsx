import { motion } from 'framer-motion'
import { containerVariants, itemVariants, viewportSettings } from '../../utils/animations'

export default function FeaturesSection({ features = [], images = {} }) {
  return (
    <motion.section className="section-container relative overflow-hidden"
     initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportSettings} transition={{ duration: 0.8, ease: 'easeOut' }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div variants={containerVariants} initial="hidden"
         whileInView="show" viewport={viewportSettings} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const iconKey = `home_feature_icon${index + 1}`
            const iconSrc = images[iconKey]
            return (
              <motion.div key={index} variants={itemVariants} className="p-10 sm:p-12 flex flex-col items-center text-center">
                <div className="mb-8">
                  {iconSrc ? <img src={iconSrc} alt={feature.title} className="w-28 h-28 sm:w-32 sm:h-32 object-contain" /> : null}
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold  mb-4"  style={{ color: 'var(--title-color)' }}>{feature.title}</h3>
                <p className=" leading-relaxed text-lg sm:text-xl"  style={{ color: 'var(--subtitle-color)' }}>{feature.sub_title}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}

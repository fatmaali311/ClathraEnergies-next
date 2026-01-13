'use client';

import React from 'react'
import { motion } from 'framer-motion'
import { stepVariant } from '../../utils/animations'
import { getImageUrl } from '../../utils/imageUtils'

const BiogasCycle = ({ page = {}, images = {} }) => {
  const steps = page.steps || []
  const cycleImage = getImageUrl(images?.our_circle_image || '')

  const stepVar = stepVariant(0.35)

  const colors = [
    'bg-[var(--primary-green)]',
    'bg-[var(--primary-green)]',
    'bg-[var(--primary-green)]',
    'bg-[var(--primary-blue)]',
    'bg-[var(--primary-blue)]',
    'bg-[var(--primary-blue)]',
  ]

  const mdPositions = [
    'md:top-[8%] md:left-[14%]',
    'md:top-[40%] md:left-[0%]',
    'md:bottom-[0%] md:left-[14%]',
    'md:bottom-[0%] md:right-[14%]',
    'md:top-[40%] md:right-[0%]',
    'md:top-[8%] md:right-[14%]',
  ]

  const lgPositions = [
    'lg:top-[8%] lg:left-[10%]',
    'lg:top-[40%] lg:left-[0%]',
    'lg:bottom-[0%] lg:left-[10%]',
    'lg:bottom-[0%] lg:right-[10%]',
    'lg:top-[40%] lg:right-[0%]',
    'lg:top-[8%] lg:right-[10%]',
  ]

  return (
    <section className="w-full pb-10 md:pb-14 flex flex-col items-center bg-white">
      <div className="w-full">
        <div className="hidden md:flex relative w-full max-w-5xl mx-auto h-[500px] lg:h-[650px] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="absolute flex items-center justify-center p-24 lg:p-32"
          >
            {cycleImage && (
              <img
                src={cycleImage}
                alt="Cycle"
                className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[500px] lg:h-[500px] object-contain"
              />
            )}
          </motion.div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              custom={index}
              variants={stepVar}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`absolute ${mdPositions[index] || mdPositions[0]} ${lgPositions[index] || lgPositions[0]} flex flex-col items-center gap-1.5 max-w-[160px] lg:max-w-[220px]`}
            >
              <div className={`${colors[index]} rounded-full aspect-square w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center shadow-md`}>
                <span className="text-white font-bold text-lg lg:text-xl">{step.id}</span>
              </div>

              {images[`steps[${index}]`] && (
                <div className="w-10 h-10 lg:w-14 lg:h-14">
                  <img src={getImageUrl(images[`steps[${index}]`])} alt={step.text} className="w-full h-full object-contain" />
                </div>
              )}

              <p className="text-gray-700 text-base lg:text-lg leading-snug font-medium text-center mt-0.5">{step.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden mt-0 mb-10 px-4">
          <motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: 'easeOut' }} className="relative flex items-center justify-center w-60 h-60 mb-6 mx-auto">
            <img src={cycleImage} alt="Cycle" className="absolute inset-0 w-full h-full object-contain" />
          </motion.div>

          <div className="space-y-3 max-w-sm mx-auto">
            {steps.map((step, index) => (
              <motion.div key={step.id} custom={index} variants={stepVar} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="flex flex-col items-center gap-1">
                <div className={`${index < 3 ? 'bg-[var(--primary-green)]' : 'bg-[var(--primary-blue)]'} rounded-full w-10 h-10 flex items-center justify-center shadow-md`}>
                  <span className="text-white font-bold text-base">{step.id}</span>
                </div>

                {images[`steps[${index}]`] && (
                  <div className="w-10 h-10">
                    <img src={getImageUrl(images[`steps[${index}]`])} alt={step.text} className="w-full h-full object-contain" />
                  </div>
                )}

                <p className="text-gray-700 text-sm leading-snug font-medium text-center">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BiogasCycle

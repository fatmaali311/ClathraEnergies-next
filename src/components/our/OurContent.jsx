import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, stepVariant } from '../../utils/animations'
import { getImageUrl } from '../../utils/imageUtils'

const OurContent = ({ page = {}, images = {} }) => {
  const steps = page.steps || []
  const cycleImage = getImageUrl(images?.our_circle_image || '')

  const fadeInUpLocal = fadeInUp
  const stepVar = stepVariant(0.35)

  const LG_OUTER_HORIZONTAL = ' lg:left-[12%]'
  const LG_INNER_HORIZONTAL = 'lg:left-[0%]'
  const LG_OUTER_RIGHT = 'lg:right-[10%]'
  const LG_INNER_RIGHT = 'lg:right-[-2%]'

  const stepsWithPositions = steps.map((step, index) => {
    const mdPositions = [
      'md:top-[14%] md:left-[10%]',
      'md:top-[42%] md:left-[0%]',
      'md:bottom-[10%] md:left-[13%]',
      'md:bottom-[10%] md:right-[13%]',
      'md:top-[42%] md:right-[0%]',
      'md:top-[14%] md:right-[10%]',
    ]
    
    const lgPositions = [
      `lg:top-[14%] ${LG_OUTER_HORIZONTAL}`,
      `lg:top-[42%] ${LG_INNER_HORIZONTAL}`,
      `lg:bottom-[10%] ${LG_OUTER_HORIZONTAL}`,
      `lg:bottom-[10%] ${LG_OUTER_RIGHT}`,
      `lg:top-[42%] ${LG_INNER_RIGHT}`,
      `lg:top-[14%] ${LG_OUTER_RIGHT}`,
    ]

    const colors = [
      'bg-[var(--primary-green)]',
      'bg-[var(--primary-green)]',
      'bg-[var(--primary-green)]',
      'bg-[var(--primary-blue)]',
      'bg-[var(--primary-blue)]',
      'bg-[var(--primary-blue)]',
    ]
    
    const combinedPositions = `${mdPositions[index] || mdPositions[0]} ${lgPositions[index] || ''}`

    return {
      ...step,
      pos: combinedPositions,
      color: colors[index] || colors[0],
    }
  })

  return (
<section className="w-full pb-14 md:pb-20 flex flex-col items-center bg-white">
      <div className="w-full">
        
        {/* DESKTOP/TABLET */}
        <div className="hidden md:flex relative w-full max-w-5xl mx-auto h-[600px] lg:h-[820px] items-center justify-center">
          {/* Cycle Image Only */}
          <div className="absolute flex items-center justify-center">
            {cycleImage && (
              <img
                src={cycleImage}
                alt="Biogas Cycle Diagram"
                className="w-[380px] h-[380px] lg:w-[600px] lg:h-[600px] object-contain"
              />
            )}
          </div>

          {/* Steps */}
          {stepsWithPositions.map((step, index) => (
            <motion.div
              key={step.id}
              custom={index}
              variants={stepVar}
              initial="hidden"
              animate="visible"
              className={`absolute ${step.pos} flex items-center gap-3 max-w-[180px] lg:max-w-[230px]`}
            >
              <div className={`${step.color} rounded-full aspect-square w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center shadow-md`}>
                <span className="text-white font-bold text-lg lg:text-2xl">{step.id}</span>
              </div>

              <p className="text-gray-700 text-base lg:text-lg leading-snug font-medium">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* MOBILE */}
        <div className="md:hidden mt-2 mb-16 px-4">
          
          {/* Cycle Image Only */}
          <div className="relative flex items-center justify-center w-72 h-72 mb-8 mx-auto">
            {cycleImage && (
              <img
                src={cycleImage}
                alt="Biogas Cycle Diagram"
                className="absolute inset-0 w-full h-full object-contain"
              />
            )}
          </div>

          {/* Steps */}
          <div className="space-y-4 max-w-xs mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                custom={index}
                variants={stepVar}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3"
              >
                <div className={`${index < 3 ? 'bg-[var(--primary-green)]' : 'bg-[var(--primary-blue)]'} rounded-full aspect-square w-10 h-10 flex items-center justify-center shadow-md`}>
                  <span className="text-white font-bold text-base">{step.id}</span>
                </div>

                <p className="text-gray-700 text-sm leading-snug font-medium">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default OurContent

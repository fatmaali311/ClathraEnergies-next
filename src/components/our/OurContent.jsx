import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, stepVariant, rotateVariant } from '../../utils/animations'
import { getImageUrl } from '../../utils/imageUtils'

const OurContent = ({ page = {}, images = {}, config = {} }) => {
  const steps = page.steps || []
  const cycleImage = getImageUrl(images?.our_circle_image || '')
  // Get logo from config.images (full config object with images property)
  const logoImage = getImageUrl(config?.images?.main_logo || '')

  // Animation Variants
  const fadeInUpLocal = fadeInUp
  const stepVar = stepVariant(0.35)
  const rotateVar = rotateVariant(20)

  // Map steps to positions and colors for desktop layout
  const stepsWithPositions = steps.map((step, index) => {
    const positions = [
      'md:top-[14%] md:left-[10%]',
      'md:top-[42%] md:left-[0%]',
      'md:bottom-[10%] md:left-[13%]',
      'md:bottom-[10%] md:right-[13%]',
      'md:top-[42%] md:right-[0%]',
      'md:top-[14%] md:right-[10%]',
    ]
    const colors = [
      'bg-[var(--primary-green)]',
      'bg-[var(--primary-green)]',
      'bg-[var(--primary-green)]',
      'bg-[var(--primary-blue)]',
      'bg-[var(--primary-blue)]',
      'bg-[var(--primary-blue)]',
    ]
    return {
      ...step,
      pos: positions[index] || positions[0],
      color: colors[index] || colors[0],
    }
  })

  return (
    <section className="w-full py-14 md:py-20 flex flex-col items-center bg-white">
      <div className="w-full">
        {/* DESKTOP/TABLET VIEW */}
        <div className="hidden md:flex relative w-full max-w-5xl mx-auto h-[600px] lg:h-[820px] items-center justify-center">
          {/* Cycle + Logo Wrapper (Perfect Circle) */}
          <div className="absolute flex items-center justify-center rounded-full overflow-hidden">
            {/* Rotating Cycle */}
            {cycleImage && (
              <motion.img
                src={cycleImage}
                alt="Biogas Cycle Diagram"
                variants={rotateVar}
                animate="animate"
                className="w-[380px] h-[380px] lg:w-[600px] lg:h-[600px] object-cover"
              />
            )}

            {/* Centered Logo */}
            {logoImage && (
              <img
                src={logoImage}
                alt="ClathraEnergies Logo"
                className="absolute w-40 h-40 lg:w-56 lg:h-56 object-contain"
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
              {/* Circle */}
              <div className={`${step.color} rounded-full w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center flex-shrink-0 shadow-md`}>
                <span className="text-white font-bold text-lg lg:text-2xl">{step.id}</span>
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-gray-700 text-base lg:text-lg leading-snug font-medium">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MOBILE VIEW */}
        <div className="md:hidden mt-4 mb-16 px-4">
          {/* Mobile Cycle */}
          <div className="relative flex items-center justify-center w-60 h-60 mb-8 mx-auto rounded-full overflow-hidden">
            {cycleImage && (
              <motion.img
                src={cycleImage}
                alt="Biogas Cycle Diagram"
                variants={rotateVar}
                animate="animate"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {logoImage && (
              <img
                src={logoImage}
                alt="ClathraEnergies Logo"
                className="absolute w-24 h-24 object-contain"
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
                {/* Circle */}
                <div className={`${index < 3 ? 'bg-[var(--primary-green)]' : 'bg-[var(--primary-blue)]'} rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <span className="text-white font-bold text-base">{step.id}</span>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-gray-700 text-sm leading-snug font-medium">
                    {step.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurContent

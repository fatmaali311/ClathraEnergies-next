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

  // Define new positions for large screens (lg)
  // We'll use 18% instead of the original 10% and 13% for the horizontal positioning
  const LG_OUTER_HORIZONTAL = ' lg:left-[12%]'
  const LG_INNER_HORIZONTAL = 'lg:left-[0%]'
  const LG_OUTER_RIGHT = 'lg:right-[10%]'
  const LG_INNER_RIGHT = 'lg:right-[-4%]'

  // Map steps to positions and colors for desktop layout
  const stepsWithPositions = steps.map((step, index) => {
    // These are the original positions for MD (tablet) screens.
    // NOTE: Tailwind applies the largest breakpoint utility that matches, so we use 'md:' here.
    const mdPositions = [
      'md:top-[14%] md:left-[10%]', // top-left (Outer)
      'md:top-[42%] md:left-[0%]',  // mid-left (Inner)
      'md:bottom-[10%] md:left-[13%]', // bottom-left (Outer)
      'md:bottom-[10%] md:right-[13%]', // bottom-right (Outer)
      'md:top-[42%] md:right-[0%]', // mid-right (Inner)
      'md:top-[14%] md:right-[10%]', // top-right (Outer)
    ]
    
    // Define the LG (desktop) overrides for outer steps (1, 3, 4, 6)
    const lgPositions = [
      `lg:top-[14%] ${LG_OUTER_HORIZONTAL}`,  // top-left (Outer)
      `lg:top-[42%] ${LG_INNER_HORIZONTAL}`,   // mid-left (Inner - no change needed, but included for clarity)
      `lg:bottom-[10%] ${LG_OUTER_HORIZONTAL}`, // bottom-left (Outer)
      `lg:bottom-[10%] ${LG_OUTER_RIGHT}`,  // bottom-right (Outer)
      `lg:top-[42%] ${LG_INNER_RIGHT}`,   // mid-right (Inner - no change needed)
      `lg:top-[14%] ${LG_OUTER_RIGHT}`,   // top-right (Outer)
    ]

    const colors = [
      'bg-[var(--primary-green)]',
      'bg-[var(--primary-green)]',
      'bg-[var(--primary-green)]',
      'bg-[var(--primary-blue)]',
      'bg-[var(--primary-blue)]',
      'bg-[var(--primary-blue)]',
    ]
    
    // Combine MD and LG positions, with LG overriding MD
    const combinedPositions = `${mdPositions[index] || mdPositions[0]} ${lgPositions[index] || ''}`

    return {
      ...step,
      // Use the combined string
      pos: combinedPositions, 
      color: colors[index] || colors[0],
    }
  })

  return (
    <section className="w-full py-14 md:py-20 flex flex-col items-center bg-white">
      <div className="w-full">
        {/* DESKTOP/TABLET VIEW */}
        <div className="hidden md:flex relative w-full max-w-5xl mx-auto h-[600px] lg:h-[820px] items-center justify-center">
          {/* Cycle + Logo Wrapper */}
          <div className="absolute flex items-center justify-center">
            {/* Cycle Image (Non-Rotating, object-contain) */}
            {cycleImage && (
              <img
                src={cycleImage}
                alt="Biogas Cycle Diagram"
                className="w-[380px] h-[380px] lg:w-[600px] lg:h-[600px] object-contain"
              />
            )}

            {/* Centered Logo */}
            {logoImage && (
              <img
                src={logoImage}
                alt="ClathraEnergies Logo"
                className="absolute w-40 h-40 lg:w-56 lg:h-56 object-contain md:translate-y-6 md:translate-x-2
                  lg:translate-y-10 lg:translate-x-3"
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
              // step.pos now contains both md: and lg: classes
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
        <div className="md:hidden mt-2 mb-16 px-4">

          <div className="relative flex items-center justify-center w-72 h-72 mb-8 mx-auto">
            {cycleImage && (
              <img
                src={cycleImage}
                alt="Biogas Cycle Diagram"
                className="absolute inset-0 w-full h-full object-contain"
              />
            )}

            {logoImage && (
              <img
                src={logoImage}
                alt="ClathraEnergies Logo"
                className="absolute w-28 h-28 object-contain translate-y-5 translate-x-1"
              />
            )}
          </div>

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
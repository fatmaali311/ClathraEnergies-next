import React from 'react'
import { motion } from 'framer-motion'
import {
  containerVariants,
  cardSlideUp,
  fadeUp,
  listContainer,
  listItem,
} from '../../utils/animations'
import CustomButton from '../common/CustomButton'

export default function ServicesCards({ services = [] }) {
  if (!services?.length) return null

  return (
    <section className="section-container bg-white">

      <div className="flex flex-col gap-24 mb-12">
        {services.map((svc, i) => {
          const obj = svc.data?.serviceObj || {}
          const images = svc.data?.images || {}

          const mainColor = obj.main_color || 'var(--primary-green)'
          const buttonText = obj.main_button?.name || obj.home_button?.name || 'Learn More'
          const buttonLink = obj.main_button?.link
          const buttonBgColor = mainColor
          const buttonHoverColor = obj.buttonColor || mainColor

          return (
            <motion.div
              key={svc._id}
              variants={cardSlideUp}
              initial="hidden"
              animate={i === 0 ? 'show' : undefined}
              whileInView={i !== 0 ? 'show' : undefined}
              viewport={{ once: true, amount: 0.2 }}

              whileHover={{ y: -12, scale: 1.01 }}
              className={`relative bg-white cursor-pointer
                flex flex-col items-center text-center
                w-full max-w-6xl mx-auto p-6 sm:p-10 md:p-16 pt-20
                shadow-[8px_8px_20px_rgba(0,0,0,0.15)]
                transition-all duration-300`}
              style={{ border: `3px solid ${mainColor || 'transparent'}` }}
              id={`service-${svc.slug || svc._id}`}
            >

              <motion.div
                variants={fadeUp(i, 0.2)}
                initial="hidden"
                animate={i === 0 ? 'visible' : undefined}
                whileInView={i !== 0 ? 'visible' : undefined}
                viewport={{ once: true, amount: 0.2 }}
                className={`absolute -top-6 -left-2 sm:-left-4 md:-top-8 md:-left-4
                  w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20
                  flex items-center justify-center
                  text-white text-lg sm:text-xl md:text-3xl font-bold
                  shadow-[6px_6px_15px_rgba(0,0,0,0.25)]`}
                style={{ background: mainColor }}
              >
                {i + 1}
              </motion.div>


              <motion.div
                variants={fadeUp(i, 0.3)}
                initial="hidden"
                animate={i === 0 ? 'visible' : undefined}
                whileInView={i !== 0 ? 'visible' : undefined}
                viewport={{ once: true, amount: 0.2 }}
                className="px-4 sm:px-12 mb-10 mx-auto text-center"
              >

                <h3 className="text-xl sm:text-3xl md:text-5xl font-medium mb-6 text-gray-400">
                  {svc.title}
                </h3>

                {obj.sub_title && (

                  <p className="text-gray-700 text-sm sm:text-lg md:text-xl mb-4">
                    {obj.sub_title}
                  </p>
                )}

                {obj.paragraph && (

                  <p className="text-gray-700 text-sm sm:text-lg md:text-xl leading-relaxed">
                    {obj.paragraph}
                  </p>
                )}
              </motion.div>


              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-8 w-full grid-cols-1 sm:grid-cols-2 justify-items-center items-stretch"
              >
                {(obj.details || []).map((box, j) => {
                  const points = box.points ? Object.values(box.points) : []
                  const iconUrl = images[box.icon] || ''
                  const isLastOdd = (obj.details || []).length % 2 !== 0 && j === (obj.details || []).length - 1

                  return (
                    <motion.div
                      key={j}
                      variants={cardSlideUp}
                      whileHover={{
                        y: -12,
                        scale: 1.01,
                        boxShadow: '0 14px 20px -5px rgba(107,114,128,0.3)',
                        transition: { type: 'spring', stiffness: 300, damping: 20 },
                      }}

                      className={`relative flex flex-col items-center text-center 
                        w-full max-w-sm sm:max-w-md p-6 sm:p-8 min-h-[300px] 
                        bg-white 
                        shadow-[0_10px_15px_-5px_rgba(0,0,0,0.2)] transition-all duration-300 
                        ${isLastOdd ? 'sm:col-span-2 sm:w-1/2 mx-auto' : ''}`}
                      style={{ border: `2px solid ${mainColor}` }}
                    >
                      <h4 className={`mb-4 font-medium text-lg sm:text-xl md:text-2xl`}>
                        {box.title}
                      </h4>
                      <motion.ol
                        variants={listContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="list-decimal w-full space-y-1 text-left max-w-xs
                          pl-5 sm:pl-7 md:pl-10 lg:pl-14
                          text-sm sm:text-base md:text-lg"
                      >
                        {points.map((p, k) => (
                          <motion.li
                            key={k}
                            variants={listItem}
                            className="leading-relaxed text-gray-700"
                          >
                            {p}
                          </motion.li>
                        ))}
                      </motion.ol>
                    </motion.div>
                  )
                })}
              </motion.div>


              <div className="mt-10 w-full flex justify-center">
                <div className="w-md mx-auto">
                  <CustomButton
                    text={buttonText}
                    as="link"           // <-- change this
                    to={buttonLink}     // <-- pass the URL via 'to'
                    bgColor={buttonBgColor}
                    hoverColor={buttonHoverColor}
                    target="_blank"     // optional if you want new tab
                  />

                </div>
              </div>


            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
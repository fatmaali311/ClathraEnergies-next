'use client';

import React from 'react'
import { motion } from 'framer-motion'

// Define color classes matching the desired design example
const colorClasses = {
  blue: {
    bg: 'bg-[var(--primary-blue)]',
    border: 'border-[var(--primary-blue)]',
  },
  green: {
    bg: 'bg-[var(--primary-green)]',
    border: 'border-[var(--primary-green)]',
  },
}

const MessageBubble = ({ question, answer, color = 'blue', tail = 'left', icon, isTyping, showBubble = true, delayTime = 0.8, initial, whileInView, animate }) => {
  const classes = colorClasses[color] || colorClasses.blue
  const bubbleColor = (classes.bg || '').replace('bg-[', '').replace(']', '') || 'var(--primary-blue)'

  const bubbleVariants = {
    hidden: {
      opacity: 0,
      x: tail === 'left' ? -60 : 60, // only slight slide, not offscreen
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 70,
        damping: 12
      }
    }
  }



  const tailVariants = { hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 0.5, ease: 'easeOut', delay: delayTime || 0.5 } } }

  if (!showBubble) return null

  return (
    <motion.div
      variants={bubbleVariants}
      initial={initial || "hidden"}
      whileInView={whileInView || "visible"}
      // Use the 'animate' prop if it's explicitly passed to override default 'visible' on load
      animate={animate}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-full p-4 sm:p-6 md:p-8 lg:p-10 mb-10 sm:mb-16 md:mb-20 w-full shadow ${classes.bg} min-h-[120px] overflow-hidden sm:overflow-visible`}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 sm:gap-3 ml-3 sm:ml-4 md:ml-5">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-100">{question}</h2>
          {icon && (
            <motion.img
              src={icon}
              alt="icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
            />
          )}
        </div>
        <p className="text-white/90 text-xs sm:text-sm md:text-lg lg:text-xl leading-relaxed ml-3 sm:ml-4 md:ml-5">
          {answer}
          {isTyping && <span className="inline-block animate-pulse w-2 h-4 sm:h-5 bg-white ml-0.5 align-text-top" />}
        </p>
      </div>

      {tail === 'left' && (
        <motion.div variants={tailVariants} initial="hidden" animate="visible" className="absolute bottom-10 -left-2 transform translate-y-1/2 w-8 sm:w-12 h-16 sm:h-24">
          <svg width="100%" height="100%" viewBox="0 0 64 48">
            <path d="M48,0 C48,16 0,16 0,32 L48,32 Z" fill={bubbleColor} />
          </svg>
        </motion.div>
      )}

      {tail === 'right' && (
        <motion.div variants={tailVariants} initial="hidden" animate="visible" className="absolute bottom-10 -right-2 transform translate-y-1/2 w-8 sm:w-12 h-16 sm:h-24">
          <svg width="100%" height="100%" viewBox="0 0 64 48" className="absolute bottom-0 right-0">
            <path d="M16,0 C16,16 64,16 64,32 L16,32 Z" fill={bubbleColor} />
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}

export default MessageBubble
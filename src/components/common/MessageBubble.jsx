'use client';

import React from 'react'
import { motion } from 'framer-motion'
import { getImageUrl } from '../../utils/imageUtils'

// MessageBubble matches the Vite frontend's bubble visual (rounded 40px, p-8, tail)
export default function MessageBubble({ question, answer, bgColor = 'var(--primary-blue)', tail = 'left', icon, isTyping = false, show = true }) {
  if (!show) return null

  const bubbleVariants = {
    hidden: { opacity: 0, x: tail === 'left' ? -200 : 200, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  }

  const tailVariants = { hidden: { scale: 0 }, visible: { scale: 1, transition: { duration: 0.4, ease: 'easeOut' } } }

  // tail color for the small triangle; we'll use the same color as bubble
  const tailFill = bgColor

  return (
    <motion.div variants={bubbleVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="relative w-full max-w-xl rounded-[40px] p-8 font-sans text-base leading-6 shadow-sm overflow-visible" style={{ background: bgColor, color: 'white' }}>
      <div className="relative z-10">
        <div className="flex items-center gap-3 ml-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">{question}</h2>
          {icon && (
            <motion.img src={getImageUrl(icon)} alt="icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.25, delay: 0.2 }} className="w-10 h-10 object-contain" />
          )}
        </div>
        <p className="text-white/95 mt-3">{answer}{isTyping && <span className="inline-block animate-pulse w-2 h-4 bg-white ml-1 align-text-top" />}</p>
      </div>

      {tail === 'left' && (
        <motion.div variants={tailVariants} initial="hidden" animate="visible" className="absolute -left-6 bottom-6 w-10 h-10 overflow-visible">
          <svg width="100%" height="100%" viewBox="0 0 64 48">
            <path d="M48,0 C48,16 0,16 0,32 L48,32 Z" fill={tailFill} />
          </svg>
        </motion.div>
      )}

      {tail === 'right' && (
        <motion.div variants={tailVariants} initial="hidden" animate="visible" className="absolute -right-6 bottom-6 w-10 h-10 overflow-visible">
          <svg width="100%" height="100%" viewBox="0 0 64 48">
            <path d="M16,0 C16,16 64,16 64,32 L16,32 Z" fill={tailFill} />
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}

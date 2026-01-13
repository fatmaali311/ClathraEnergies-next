'use client';

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const CustomButton = ({
  text,
  to,
  as = 'button', // 'button', 'link', or 'router'
  bgColor = '#007BFF',
  hoverColor = '#007BFF',
  delay = 0,
  i = 0,
  type = 'button', // forward to native button (use 'submit' when used inside forms)
  ariaLabel, // New prop
}) => {
  const baseClasses = `
  w-full h-[55px] sm:h-[75px]
  text-white lg:text-xl font-medium sm:text-lg text-center
  rounded-lg shadow-lg shadow-gray-400/40
  transition-all duration-300 flex items-center justify-center
`;

  const hoverStyle = {
    scale: 1.05,
    backgroundColor: '#fff',
    color: hoverColor,
    border: `2px solid ${hoverColor}`,
  }

  const tapStyle = { scale: 0.95 }

  const motionProps = {
    initial: 'hidden',
    animate: i === 0 ? 'visible' : undefined,
    whileInView: i !== 0 ? 'visible' : undefined,
    viewport: { once: true, amount: 0.2 },
    whileHover: hoverStyle,
    whileTap: tapStyle,
  }

  const style = { width: '100%', backgroundColor: bgColor }

  if (as === 'link') {
    return (
      <motion.a href={to} {...motionProps} className={`${baseClasses}`} style={style} aria-label={ariaLabel || text}>
        {text}
      </motion.a>
    )
  }

  if (as === 'router') {
    return (
      <motion.div {...motionProps} style={{ width: '100%' }}>
        <Link href={to} className={`${baseClasses} w-full block`} aria-label={ariaLabel || text}>
          {text}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button {...motionProps} type={type} aria-label={`Button: ${text}`} className={`${baseClasses}`} style={style}>
      {text}
    </motion.button>
  )
}

export default CustomButton

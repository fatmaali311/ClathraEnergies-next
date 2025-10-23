import React from 'react'

const sizeClasses = {
  sm: 'min-h-[40px] px-6 text-sm',
  md: 'min-h-[52px] px-8 text-base',
  lg: 'min-h-[64px] px-12 text-lg',
  xl: 'min-h-[80px] px-16 text-xl',
}

export default function GButton({ children, href, className = '', size = 'md', type = 'button', onClick, isActive = false, bgColor }) {
  const classes = `g-button inline-flex items-center justify-center font-medium shadow-md cursor-pointer ${sizeClasses[size]} ${className} ${isActive ? 'g-button--active' : ''}`
  const style = {}
  if (bgColor) style.background = bgColor

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} style={style}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} style={style}>
      {children}
    </button>
  )
}

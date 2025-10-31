/** 
 * This is a reusable heading component that ensures proper heading levels 
 * and maintains heading hierarchy throughout the site.
 */
import React from 'react'

export default function Heading({ 
  level = 2,
  children, 
  className = '',
  color = 'var(--title-color)',
  ...props 
}) {
  // Ensure level is between 1 and 6
  const safeLevel = Math.max(1, Math.min(6, level))
  const Tag = `h${safeLevel}`

  const baseStyles = `
    font-bold
    leading-tight
    ${level === 1 ? 'text-4xl md:text-5xl lg:text-6xl mb-6' : ''}
    ${level === 2 ? 'text-3xl md:text-4xl lg:text-5xl mb-5' : ''}
    ${level === 3 ? 'text-2xl md:text-3xl lg:text-4xl mb-4' : ''}
    ${level === 4 ? 'text-xl md:text-2xl lg:text-3xl mb-3' : ''}
    ${level === 5 ? 'text-lg md:text-xl lg:text-2xl mb-2' : ''}
    ${level === 6 ? 'text-base md:text-lg lg:text-xl mb-2' : ''}
  `

  return (
    <Tag 
      className={`${baseStyles} ${className}`}
      style={{ color, ...props.style }}
      {...props}
    >
      {children}
    </Tag>
  )
}
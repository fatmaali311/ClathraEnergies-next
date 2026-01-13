import Link from 'next/link'

const sizeClasses = {
  sm: 'min-h-[40px] px-6 text-sm',
  md: 'min-h-[52px] px-8 text-base',
  lg: 'min-h-[64px] px-12 text-lg',
  xl: 'min-h-[80px] px-16 text-xl',
}

export default function GButton({ children, href, className = '', size = 'md', type = 'button', onClick, isActive = false, bgColor, ariaLabel, ...props }) {
  const classes = `g-button inline-flex items-center justify-center font-medium shadow-md cursor-pointer ${sizeClasses[size]} ${className} ${isActive ? 'g-button--active' : ''}`
  const style = {}
  if (bgColor) style.background = bgColor

  const label = ariaLabel || (typeof children === 'string' ? children : 'Button')

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')
    if (isExternal) {
      return (
        <a href={href} className={classes} onClick={onClick} style={style} aria-label={label} {...props} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} onClick={onClick} style={style} aria-label={label} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} style={style} aria-label={label} {...props}>
      {children}
    </button>
  )
}

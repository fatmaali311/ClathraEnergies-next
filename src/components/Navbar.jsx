import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { HiMenu, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'
import { menuVariants, itemVariants } from '../utils/animations'
import GButton from './GButton'
import { navLinks as defaultNavLinks } from '../data/navLinks'

export default function Navbar({ config = {}, images = {}, navLinks = null }) {
  const [isOpen, setIsOpen] = useState(false)
  const mainColor = config.mainColor || config.main_color || '#111'
  const links = navLinks || defaultNavLinks
  const router = useRouter()
  const currentPath = router?.asPath || router?.pathname || ''

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 py-4 flex items-center justify-between">
        <a href="/" className="transition-transform duration-300 hover:scale-105">
          {images?.main_logo ? (
            <img src={images.main_logo} alt={config.name || 'logo'} className="h-16 md:h-20" />
          ) : (
            <span className="site-name text-[var(--primary-green)]">{config.name || 'Site'}</span>
          )}
        </a>

        <ul className="hidden md:flex flex-1 justify-center text-xl gap-10 text-gray-800 font-medium">
          {links.slice(0, -1).map((l, index) => {
            const isActive = currentPath === l.path || (l.path !== '/' && currentPath.startsWith(l.path))
            return (
              <li key={l.path} className="animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link href={l.path} className={`block nav-link transition-all duration-300 ${isActive ? 'text-[var(--primary-green)] font-semibold' : 'hover:text-[var(--primary-green)]'}`}>
                  {l.name}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden md:inline-block">
          <GButton href="/contact-us" isActive={currentPath === '/contact-us' || currentPath.startsWith('/contact-us')}> Contact Us</GButton>
        </div>

        <div className="md:hidden cursor-pointer text-3xl text-gray-800 transition-transform duration-300 hover:scale-110" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div key="mobile-menu" initial="hidden" animate="show" exit="exit" variants={menuVariants} className="md:hidden bg-white shadow-xl rounded-b-xl px-6 py-8 space-y-6 mobile-menu">
            <motion.ul className="flex flex-col space-y-5 text-lg" variants={menuVariants}>
              {links.slice(0, -1).map((l) => {
                const isActive = currentPath === l.path || (l.path !== '/' && currentPath.startsWith(l.path))
                return (
                  <motion.li key={l.path} variants={itemVariants}>
                    <Link href={l.path} className={`block nav-link transition-all duration-300 ${isActive ? 'text-[var(--primary-green)] font-semibold' : 'hover:text-[var(--primary-green)]'}`} onClick={() => setIsOpen(false)}>
                      {l.name}
                    </Link>
                  </motion.li>
                )
              })}
                <motion.li variants={itemVariants} className="pt-4 border-t border-gray-200">
                <div onClick={() => setIsOpen(false)} className="flex justify-center">
                  <GButton href="/contact-us" className="shadow-xl py-4 px-8" isActive={currentPath === '/contact-us' || currentPath.startsWith('/contact-us')}>Contact Us</GButton>
                </div>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

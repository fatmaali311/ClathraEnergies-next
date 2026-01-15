'use client';

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiMenu, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'
import { menuVariants, itemVariants } from '../../utils/animations'
import GButton from '../GButton'
import { getImageUrl } from '../../utils/imageUtils'
import { navLinks as defaultNavLinks } from '../../data/navLinks'
import LanguageSwitcher from '../common/LanguageSwitcher'

export default function Header({ config = {}, images = {}, navLinks = null, dict = {} }) {
    const [isOpen, setIsOpen] = useState(false)
    const links = navLinks || defaultNavLinks || []
    const currentPath = usePathname() || ''

    return (
        <header className="bg-white shadow-lg sticky top-0 left-0 right-0 z-50">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 py-4 flex items-center justify-between">
                <Link href="/" className="transition-transform duration-300 hover:scale-105">
                    {images?.main_logo ? (
                        <img src={getImageUrl(images.main_logo)} alt={config.name || 'Clathra Energies Logo'} className="h-12 md:h-14 lg:h-16" />
                    ) : (
                        <span className="site-name text-[var(--primary-green)]">{config.name || 'ClathraEnergies'}</span>
                    )}
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex flex-1 justify-center md:text-md lg:text-lg xl:text-xl md:gap-4 lg:gap-10 text-gray-800 font-medium" aria-label="Main Navigation">
                    <ul className="flex md:space-x-4 lg:space-x-10">
                        {links.slice(0, -1).map((l, index) => {
                            const isActive = currentPath === l.path || (l.path !== '/' && currentPath.startsWith(l.path))
                            // Map path to dict key
                            let label = l.name
                            if (dict?.nav) {
                                if (l.path === '/') label = dict.nav.home
                                else if (l.path.includes('about')) label = dict.nav.about
                                else if (l.path.includes('services')) label = dict.nav.services
                                else if (l.path.includes('biogas')) label = dict.nav.biogas
                                else if (l.path.includes('careers')) label = dict.nav.careers
                                else if (l.path.includes('technology')) label = dict.nav.technology
                            }

                            return (
                                <li key={l.path} className="animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <Link href={l.path} className={`block nav-link transition-all duration-300 ${isActive ? 'text-[var(--primary-green)] font-semibold' : 'hover:text-[var(--primary-green)]'}`}>
                                        {label}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className="hidden md:flex items-center gap-3 lg:gap-4">
                    <GButton
                        href="/contact-us"
                        className="min-h-[38px] px-4 md:text-xs lg:min-h-[52px] lg:px-8 lg:text-base"
                        isActive={currentPath === '/contact-us' || currentPath.startsWith('/contact-us')}
                    >
                        {dict?.nav?.contact || 'Contact Us'}
                    </GButton>
                    <LanguageSwitcher />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden cursor-pointer text-3xl text-gray-800 transition-transform duration-300 hover:scale-110"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div key="mobile-menu" initial="hidden" animate="show" exit="exit" variants={menuVariants} className="md:hidden bg-white shadow-xl rounded-b-xl px-6 py-8 space-y-6 mobile-menu">
                        <nav aria-label="Mobile Navigation">
                            <motion.ul className="flex flex-col space-y-5 text-lg" variants={menuVariants}>
                                {links.slice(0, -1).map((l) => {
                                    const isActive = currentPath === l.path || (l.path !== '/' && currentPath.startsWith(l.path))
                                    let label = l.name
                                    if (dict?.nav) {
                                        if (l.path === '/') label = dict.nav.home
                                        else if (l.path.includes('about')) label = dict.nav.about
                                        else if (l.path.includes('services')) label = dict.nav.services
                                        else if (l.path.includes('biogas')) label = dict.nav.biogas
                                        else if (l.path.includes('careers')) label = dict.nav.careers
                                        else if (l.path.includes('technology')) label = dict.nav.technology
                                    }
                                    return (
                                        <motion.li key={l.path} variants={itemVariants}>
                                            <Link href={l.path} className={`block nav-link transition-all duration-300 ${isActive ? 'text-[var(--primary-green)] font-semibold' : 'hover:text-[var(--primary-green)]'}`} onClick={() => setIsOpen(false)}>
                                                {label}
                                            </Link>
                                        </motion.li>
                                    )
                                })}
                                <motion.li variants={itemVariants} className="pt-4 border-t border-gray-200">
                                    <div className="flex flex-col gap-4 items-center">

                                        <div onClick={() => setIsOpen(false)} className="w-full">
                                            <GButton
                                                href="/contact-us"
                                                className="shadow-xl py-4 px-8 w-full"
                                                isActive={currentPath === '/contact-us' || currentPath.startsWith('/contact-us')}
                                            >
                                                {dict?.nav?.contact || 'Contact Us'}
                                            </GButton>
                                        </div>
                                        <LanguageSwitcher mobile={true} />

                                    </div>
                                </motion.li>
                            </motion.ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

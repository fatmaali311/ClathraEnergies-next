'use client';

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiMenu, HiX } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'
import { menuVariants, itemVariants } from '../../utils/animations'
import { getImageUrl } from '../../utils/imageUtils'
import LanguageSwitcher from '../common/LanguageSwitcher'

export default function Header({ config = {}, images = {}, dict = {} }) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeMobileDropdown, setActiveMobileDropdown] = useState(null)
    const currentPath = usePathname() || ''

    const navStructure = [
        {
            type: 'dropdown',
            dictKey: 'discover_technology',
            defaultLabel: 'Discover Our Technology',
            items: [
                { path: '/why-technology', dictKey: 'why_technology', defaultLabel: 'Why ClathraEnergies Technology?' },
                { path: '/our-technology', dictKey: 'our_solutions', defaultLabel: 'Our Solutions' }
            ]
        },
        {
            type: 'dropdown',
            dictKey: 'services',
            defaultLabel: 'Services',
            items: [
                { path: '/our-products', dictKey: 'products', defaultLabel: 'Our Products' },
                { path: '/biogas-solutions', dictKey: 'biogas_solution', defaultLabel: 'Biogas Solution' }
            ]
        },
        {
            type: 'link',
            path: '/about-us',
            dictKey: 'about',
            defaultLabel: 'About Us'
        },
        {
            type: 'link',
            path: '/careers',
            dictKey: 'careers',
            defaultLabel: 'Careers'
        }
    ]

    const getNavLabel = (item) => {
        if (dict?.nav && dict.nav[item.dictKey]) {
            return dict.nav[item.dictKey]
        }
        return item.defaultLabel
    }

    const cfg = config || {}

    return (
        <header className="bg-white shadow-lg sticky top-0 left-0 right-0 z-50">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 py-4 flex items-center justify-between">
                <Link href="/" className="transition-transform duration-300 hover:scale-105">
                    {images?.main_logo ? (
                        <img src={getImageUrl(images.main_logo)} alt={cfg.name || 'Clathra Energies Logo'} className="h-12 md:h-14 lg:h-16" />
                    ) : (
                        <span className="site-name text-[var(--primary-green)]">{cfg.name || 'ClathraEnergies'}</span>
                    )}
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex flex-1 justify-center md:text-md lg:text-lg xl:text-xl md:gap-4 lg:gap-10 text-gray-800 font-medium" aria-label="Main Navigation">
                    <ul className="flex items-center md:space-x-4 lg:space-x-10">
                        {navStructure.map((item, index) => {
                            const label = getNavLabel(item);

                            if (item.type === 'link') {
                                const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
                                return (
                                    <li key={item.path} className="animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <Link href={item.path} className={`block nav-link transition-all duration-300 ${isActive ? 'text-[var(--primary-green)] font-semibold' : 'hover:text-[var(--primary-green)]'}`}>
                                            {label}
                                        </Link>
                                    </li>
                                );
                            } else {
                                const isSubActive = item.items.some(sub => currentPath === sub.path || currentPath.startsWith(sub.path));
                                return (
                                    <li key={item.dictKey} className="relative group animate-slideUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <button className={`flex items-center gap-1 nav-link transition-all duration-300 ${isSubActive ? 'text-[var(--primary-green)] font-semibold' : 'hover:text-[var(--primary-green)]'} cursor-pointer`}>
                                            {label}
                                            <span className="text-xs transition-transform duration-200 group-hover:rotate-180">▼</span>
                                        </button>
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-64 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                                            <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2">
                                                {item.items.map(subItem => {
                                                    const subLabel = getNavLabel(subItem);
                                                    const isSubItemActive = currentPath === subItem.path || currentPath.startsWith(subItem.path);
                                                    return (
                                                        <Link 
                                                            key={subItem.path} 
                                                            href={subItem.path} 
                                                            className={`block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary-green)] transition-all ${isSubItemActive ? 'text-[var(--primary-green)] font-semibold' : ''}`}
                                                        >
                                                            {subLabel}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </nav>

                <div className="hidden md:flex items-center gap-3 lg:gap-4">
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
                                {navStructure.map((item) => {
                                    const label = getNavLabel(item);

                                    if (item.type === 'link') {
                                        const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
                                        return (
                                            <motion.li key={item.path} variants={itemVariants}>
                                                <Link 
                                                    href={item.path} 
                                                    className={`block nav-link transition-all duration-300 ${isActive ? 'text-[var(--primary-green)] font-semibold' : 'hover:text-[var(--primary-green)]'}`} 
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {label}
                                                </Link>
                                            </motion.li>
                                        );
                                    } else {
                                        const isExpanded = activeMobileDropdown === item.dictKey;
                                        const isSubActive = item.items.some(sub => currentPath === sub.path || currentPath.startsWith(sub.path));
                                        return (
                                            <motion.li key={item.dictKey} variants={itemVariants} className="flex flex-col">
                                                <button 
                                                    onClick={() => setActiveMobileDropdown(isExpanded ? null : item.dictKey)}
                                                    className={`flex items-center justify-between w-full nav-link transition-all duration-300 text-left ${isSubActive ? 'text-[var(--primary-green)] font-semibold' : 'hover:text-[var(--primary-green)]'}`}
                                                >
                                                    <span>{label}</span>
                                                    <span className={`text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                                                </button>
                                                
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={isExpanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden pl-4 flex flex-col gap-3 mt-3 border-l-2 border-gray-100"
                                                >
                                                    {item.items.map(subItem => {
                                                        const subLabel = getNavLabel(subItem);
                                                        const isSubItemActive = currentPath === subItem.path || currentPath.startsWith(subItem.path);
                                                        return (
                                                            <Link
                                                                key={subItem.path}
                                                                href={subItem.path}
                                                                className={`block text-md text-gray-600 hover:text-[var(--primary-green)] ${isSubItemActive ? 'text-[var(--primary-green)] font-medium' : ''}`}
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                {subLabel}
                                                            </Link>
                                                        );
                                                    })}
                                                </motion.div>
                                            </motion.li>
                                        );
                                    }
                                })}
                                <motion.li variants={itemVariants} className="pt-4 border-t border-gray-200">
                                    <div className="flex flex-col gap-4 items-center">
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

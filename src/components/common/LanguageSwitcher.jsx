'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CONFIG } from '../../config';
import { motion, AnimatePresence } from 'framer-motion';
import { HiGlobeAlt, HiChevronDown, HiCheck } from 'react-icons/hi';

import { GB, FR, CN } from 'country-flag-icons/react/3x2';

export default function LanguageSwitcher({ align = 'right', mobile = false }) {
    const router = useRouter();
    const [currentLang, setCurrentLang] = useState(CONFIG.DEFAULT_LANG);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const match = document.cookie.match(new RegExp('(^| )NEXT_LOCALE=([^;]+)'));
        if (match) {
            setCurrentLang(match[2]);
        }

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (langCode) => {
        document.cookie = `NEXT_LOCALE=${langCode}; path=/; max-age=31536000`; // 1 year
        setCurrentLang(langCode);
        setIsOpen(false);
        router.refresh();
    };

    const getFlagComponent = (code) => {
        switch (code) {
            case 'en': return <GB title="United Kingdom" className="w-6 h-4 rounded shadow-sm" />;
            case 'fr': return <FR title="France" className="w-6 h-4 rounded shadow-sm" />;
            case 'zh': return <CN title="China" className="w-6 h-4 rounded shadow-sm" />;
            default: return <GB title="United Kingdom" className="w-6 h-4 rounded shadow-sm" />;
        }
    };

    const currentLangObj = CONFIG.LANGUAGES.find(l => l.code === currentLang) || CONFIG.LANGUAGES[0];

    // Mobile-optimized text sizes and padding to match Contact Us button (GButton md)
    const fontSize = 'text-base';
    const padding = mobile ? 'px-8 py-4 min-h-[52px]' : 'px-8 min-h-[52px]';

    return (
        <div className={`relative z-50 ${mobile ? 'w-full' : ''}`} ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center ${mobile ? 'justify-between w-full' : 'gap-2'} 
                    ${padding} rounded-full font-medium transition-all duration-300
                    border-2
                    ${isOpen
                        ? 'border-[var(--primary-green)] bg-[var(--primary-green)]/5 text-[var(--primary-green)]'
                        : 'border-[var(--primary-green)] hover:border-[var(--primary-green)] text-gray-700 hover:text-[var(--primary-green)] hover:bg-[var(--primary-green)]/5'
                    }
                    ${fontSize}
                `}
                aria-label="Select Language"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center filter drop-shadow-sm">
                        {getFlagComponent(currentLangObj.code)}
                    </span>
                    <span className="uppercase tracking-wider font-semibold text-xs">{currentLangObj.code}</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <HiChevronDown className={`${mobile ? 'w-5 h-5' : 'w-3.5 h-3.5'} opacity-60`} />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className={`
                            absolute mt-2 rounded-xl bg-white/95 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                            border border-white/20 overflow-hidden ring-1 ring-black/5 z-[60]
                            ${mobile ? 'w-full left-0' : 'w-48 right-0 origin-top-right'}
                        `}
                    >
                        <div className="p-1.5 space-y-0.5">
                            {CONFIG.LANGUAGES.map((lang) => {
                                const isActive = currentLang === lang.code;
                                return (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLanguageChange(lang.code)}
                                        className={`
                                            w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200
                                            ${isActive
                                                ? 'bg-[var(--primary-green)]/10 text-[var(--primary-green)] font-semibold'
                                                : 'text-gray-600 hover:bg-[var(--primary-green)]/5 hover:text-[var(--primary-green)]'
                                            }
                                            ${fontSize}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center justify-center filter drop-shadow-sm">
                                                {getFlagComponent(lang.code)}
                                            </span>
                                            <span>{lang.name}</span>
                                        </div>
                                        {isActive && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="text-[var(--primary-green)]"
                                            >
                                                <HiCheck className="w-4 h-4" />
                                            </motion.div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

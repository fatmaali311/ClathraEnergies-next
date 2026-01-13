'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GButton from '../components/GButton';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center relative overflow-hidden">
            {/* Optional: Background blobs or gradient for visual interest */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-[var(--primary-green)] opacity-5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[350px] h-[350px] bg-[var(--primary-blue)] opacity-5 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1 className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-green)] to-[var(--primary-blue)] mb-2">
                    404
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
                <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <GButton href="/" size="lg">
                    Back to Home
                </GButton>
            </motion.div>
        </div>
    );
}

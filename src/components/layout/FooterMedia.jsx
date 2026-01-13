'use client';

import { useState } from 'react'

export default function FooterMedia({ src, type, poster, fallbackLogo }) {
    const [error, setError] = useState(null)
    const [showFallback, setShowFallback] = useState(false)

    const getVideoType = (url) => {
        if (!url) return 'video/mp4'
        const u = url.split('?')[0].toLowerCase()
        if (u.endsWith('.webm')) return 'video/webm'
        if (u.endsWith('.ogg') || u.endsWith('.ogv')) return 'video/ogg'
        if (u.endsWith('.mp4') || u.endsWith('.m4v')) return 'video/mp4'
        return 'video/mp4'
    }

    // If there's no src or media failed, show the fallback logo image
    if (!src || showFallback) {
        const logoSrc = fallbackLogo || poster || ''
        return (
            <div className="relative">
                <img
                    src={logoSrc}
                    alt="logo"
                    className="w-40 sm:w-48 md:w-56 lg:w-64 h-40 sm:h-48 md:h-56 lg:h-64 rounded-full object-contain bg-white"
                />
            </div>
        )
    }

    // Render video if type is video
    if (type === 'video') {
        return (
            <div className="relative">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster={poster || ''}
                    className="w-40 sm:w-48 md:w-56 lg:w-64 h-40 sm:h-48 md:h-56 lg:h-64 rounded-full object-cover"
                    onError={() => {
                        setError('Video failed to load')
                        setShowFallback(true)
                    }}
                    onLoadedData={() => setError(null)}
                >
                    <source src={src} type={getVideoType(src)} />
                </video>

                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <div className="bg-white/90 text-sm text-black p-3 rounded">{error}</div>
                        <a className="mt-2 text-xs underline text-white" href={src} target="_blank" rel="noopener noreferrer">
                            Open video in new tab
                        </a>
                    </div>
                )}
            </div>
        )
    }

    // Render image if type is image
    return (
        <div className="relative">
            <img
                src={src}
                alt="footer-media"
                className="w-40 sm:w-48 md:w-56 lg:w-64 h-40 sm:h-48 md:h-56 lg:h-64 rounded-full object-cover "
                onError={() => {
                    setError('Image failed to load')
                    setShowFallback(true)
                }}
            />
            {error && (
                <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                    <div className="bg-white/90 text-sm text-black p-3 rounded">{error}</div>
                </div>
            )}
        </div>
    )
}

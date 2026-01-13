'use client';

import { useEffect } from 'react';

export default function ThemeRegistry({ config = {} }) {
    const cfg = config?.configObj || config || {};
    const heroGradientOpacity = cfg?.heroGradientOpacity || cfg?.hero_gradient_opacity || 0.55;

    useEffect(() => {
        if (!cfg) return;
        const main = cfg.mainColor || cfg.main_color || '#ADD0B3';
        const secondary = cfg.secondaryColor || cfg.secondary_color || '#0f766e';
        const title = cfg.titleColor || cfg.title_color || '#111827';
        const subtitle = cfg.subtitleColor || cfg.subtitle_color || '#4b5563';

        const root = document.documentElement;
        root.style.setProperty('--primary-green', main);
        root.style.setProperty('--primary-blue', secondary);
        root.style.setProperty('--title-color', title);
        root.style.setProperty('--subtitle-color', subtitle);
        root.style.setProperty('--hero-gradient-opacity', heroGradientOpacity);
        root.style.setProperty('--btn-color', main); // Assuming btn color follows primary green
    }, [cfg, heroGradientOpacity]);

    return null; // This component doesn't render anything visible
}

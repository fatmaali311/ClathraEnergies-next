'use client';

import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'
import { getImageUrl } from '../../utils/imageUtils'

export default function AboutClient({ pageObj, pageImages, cfg }) {
    return (
        <section
            className="relative flex items-center justify-center 
        min-h-[350px] md:min-h-[400px] lg:min-h-[500px]
        w-full bg-center bg-no-repeat bg-cover md:bg-cover"
            style={{
                backgroundImage: `url(${getImageUrl((pageObj.hero_section && pageObj.hero_section.image) || pageImages?.about_hero_image || cfg.about_hero_image)})`
            }}
        >
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to left, var(--primary-green), var(--primary-green), var(--primary-blue))',
                    opacity: 'var(--hero-gradient-opacity)'
                }}
            />
            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="relative z-10 text-center px-4 max-w-3xl"
            >
                <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                    {pageObj.hero_section?.title || pageObj.title || cfg.name}
                </h1>
                <p className="text-white/90 text-sm md:text-lg leading-relaxed mx-auto">
                    {pageObj.hero_section?.sub_title}
                </p>
            </motion.div>
        </section>
    )
}

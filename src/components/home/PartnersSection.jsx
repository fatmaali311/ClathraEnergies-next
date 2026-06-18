'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, viewportSettings } from '../../utils/animations';

export default function PartnersSection({ images = {}, title = "Our Partners" }) {
  // Extract and sort partner images cleanly
  const partnerImages = Object.keys(images)
    .filter((key) => key.startsWith('partners_section['))
    .sort((a, b) => {
      const indexA = parseInt(a.match(/\[(\d+)\]/)?.[1] || '0', 10);
      const indexB = parseInt(b.match(/\[(\d+)\]/)?.[1] || '0', 10);
      return indexA - indexB;
    })
    .map((key) => images[key])
    .filter(Boolean);

  if (partnerImages.length === 0) return null;

  const titleColor = 'var(--title-color, #0f172a)';

  return (
    <motion.section
      className="py-16 sm:py-20 bg-white border-y border-slate-100"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportSettings}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={viewportSettings}
          className="flex flex-col lg:flex-row lg:items-center gap-12 xl:gap-16"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="shrink-0 text-center lg:text-left">
            <h2
              className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
          </motion.div>

          {/* Slightly Tighter Visual Balance Grid */}
          <motion.div variants={itemVariants} className="flex-1 w-full">
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-12 gap-y-12">
              {partnerImages.map((src, index) => (
                <div
                  key={index}
                  className="h-24 sm:h-32 xl:h-36 min-w-[120px] max-w-[260px] flex items-center justify-center "
                >
                  <img
                    src={src}
                    alt={`Partner Corporate Logo ${index + 1}`}
                    className="max-h-full max-w-full object-contain aspect-auto mix-blend-multiply"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
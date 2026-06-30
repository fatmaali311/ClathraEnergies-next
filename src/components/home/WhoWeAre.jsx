'use client';

import Image from 'next/image'
import { getImageUrl } from '../../utils/imageUtils'
import GButton from '../GButton'
import { motion } from 'framer-motion'
import { slideLeft, slideRight, viewportSettings } from '../../utils/animations'

export default function WhoWeAre({ section = {}, images = {} }) {
  const img = getImageUrl(images.home_about_image || '')

  return (
    <section className="relative bg-white" aria-labelledby="who-we-are-title">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 block lg:flex justify-center gap-2 items-center relative overflow-hidden">

        {/* LEFT SIDE - TEXT */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportSettings}
          className="w-full text-center lg:text-left lg:text-base lg:w-5/12 lg:ml-6 mt-10"
        >
          <header>
            <h2
              id="who-we-are-title"
              className="section-title mb-8"
              style={{ color: 'var(--title-color)' }}
            >
              {section.title || 'Who Are We?'}
            </h2>
          </header>

          <div
            className="space-y-6 text-base md:text-lg lg:text-xl leading-relaxed font-medium mb-8"
            style={{ color: 'var(--subtitle-color)' }}
          >
            <p>{section.sub_title}</p>
          </div>

          {section?.button?.name && (
            <div className="inline-block mt-4">
              <GButton
                href={section.button?.link || '/contact'}
                size="md"
                className="sm:min-h-[64px] sm:px-12 sm:text-lg lg:min-h-[80px] lg:px-16 lg:text-xl"
                aria-label={section.button?.name}
              >
                {section.button?.name}
              </GButton>
            </div>
          )}
        </motion.div>

        {/* RIGHT SIDE - IMAGE & LABELS BELOW IT */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportSettings}
          className="w-full lg:w-7/12 p-4 rounded-xl flex flex-col items-center relative mt-8 lg:mt-0"
        >
          <figure className="w-full max-w-[620px] mx-auto">
            {img ? (
              <Image
                src={img}
                alt={section.title || 'About image'}
                width={1200}
                height={650}
                className="w-full h-auto block rounded-lg mx-auto"
                loading="lazy"
                unoptimized
              />
            ) : null}

            <figcaption className="sr-only">
              Offices located in France and Egypt.
            </figcaption>

            {/* FLEXBOX TIMELINE LABELS */}
            <div className="w-full flex mt-2 text-[var(--text-gray-500)] text-[0.75rem] sm:text-[0.9rem] font-semibold uppercase tracking-wider select-none">
              
              {/* 1. LEFT GUTTER */}
              <div style={{ flexGrow: 408 }} />

              {/* FRANCE */}
              <div className="flex justify-center w-0 min-w-max">
                <span className="text-center">
                  {section?.locations?.[0]?.label || 'France'}
                </span>
              </div>

              {/* 2. MIDDLE GAP */}
              <div style={{ flexGrow: 260 }} />

              {/* EGYPT */}
              <div className="flex justify-center w-0 min-w-max">
                <span className="text-center">
                  {section?.locations?.[1]?.label || 'Egypt'}
                </span>
              </div>

              {/* 3. RIGHT GUTTER */}
              <div style={{ flexGrow: 380 }} />
              
            </div>
          </figure>
        </motion.div>

      </div>
    </section>
  )
}
import Image from 'next/image'
import GButton from '../GButton'
import { motion } from 'framer-motion'
import { slideLeft, slideRight, viewportSettings } from '../../utils/animations'

export default function WhoWeAre({ section = {}, images = {} }) {
  const img = images.home_about_image || ''

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

        {/* RIGHT SIDE - IMAGE */}
        <motion.div
          variants={slideRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportSettings}
          className="w-full lg:w-7/12 p-4 rounded-xl flex flex-col items-center relative mt-8 lg:mt-0"
        >
          <figure className="relative w-full">
            {img ? (
              <Image
                src={img}
                alt={section.title || 'About image'}
                width={1200}
                height={650}
                className="w-full h-auto max-h-[650px] object-cover rounded-lg"
                loading="lazy"
              />
            ) : null}

            <figcaption className="sr-only">
              Offices located in France, Egypt, and China.
            </figcaption>

            <div className="grid grid-cols-3 mt-4 w-full text-[var(--text-gray-500)] text-[0.8rem] sm:text-[1rem] font-semibold text-center">
              <span className="text-left md:pl-4 sm:pl-2">FRANCE</span>
              <span className="text-center">EGYPT</span>
              <span className="text-right md:pr-4 sm:pr-2">CHINA</span>
            </div>
          </figure>
        </motion.div>

      </div>
    </section>
  )
}

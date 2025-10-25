import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa'
import { IoChevronDown } from 'react-icons/io5'

export default function PositionCard({ p, mainColor = 'var(--primary-green)' }) {
  const [open, setOpen] = useState(false)

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.4, ease: 'easeOut' },
    }),
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-gray-800 text-lg font-medium">
          <span className="text-2xl sm:text-3xl font-semibold text-gray-900">{p.name || p.title}</span>
          <span className="text-gray-400">|</span>
          {p.location && (
            <>
              <FaMapMarkerAlt className="text-gray-400" />
              <span>{p.location}</span>
            </>
          )}
          <span className="text-gray-400">|</span>
          <FaBriefcase className="text-gray-400" />
          <span>{p.type || p.employmentType || 'Full-time'}</span>
        </div>

        <Link
          href={`/careers/open-application?positionId=${p._id}`}
          className="text-lg text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          Apply
        </Link>
      </div>

      {/* Separator Line */}
      <div className="h-px bg-black my-4"></div>

      {/* Show More Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="mt-3 text-base font-semibold text-gray-700 inline-flex items-center gap-2 hover:text-[var(--primary-blue)] transition-colors"
      >
        <span>{open ? 'Hide details' : 'Show more details'}</span>
        <IoChevronDown
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Details Section */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg text-gray-700">
              
              {/* Box Style (equal size for all) */}
              {[
                {
                  title: 'What We Offer',
                  content: p.whatWeOffer || 'No details provided.',
                  color: 'white',
                },
                {
                  title: 'Why We Are Looking',
                  content: p.whyWeAreLooking || p.why_we_are_looking || 'No description provided.',
                  color: mainColor,
                },
                {
                  title: 'Responsibilities',
                  content: p.responsibilities || 'N/A',
                  color: mainColor,
                },
                {
                  title: 'Skills',
                  content: Array.isArray(p.skills)
                    ? p.skills.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                          className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-base font-medium"
                        >
                          {String(s).trim()}
                        </motion.div>
                      ))
                    : (p.skills || '')
                        .split(',')
                        .filter(Boolean)
                        .map((s, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-base font-medium"
                          >
                            {s.trim()}
                          </motion.div>
                        )),
                  color: 'white',
                  isSkills: true,
                },
              ].map((section, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  className={`rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between ${
                    section.color === 'white' ? 'bg-white text-gray-800' : 'text-white'
                  }`}
                  style={
                    section.color !== 'white'
                      ? { backgroundColor: section.color }
                      : {}
                  }
                >
                  <strong
                    className={`block mb-2 text-xl ${
                      section.color === 'white' ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    {section.title}
                  </strong>
                  <div className="flex-1">
                    {section.isSkills ? (
                      <div className="mt-2 space-y-2">
                        {section.content?.length ? section.content : <div>N/A</div>}
                      </div>
                    ) : (
                      <p
                        className={`leading-relaxed ${
                          section.color === 'white'
                            ? 'text-gray-700'
                            : 'text-white'
                        }`}
                      >
                        {section.content}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

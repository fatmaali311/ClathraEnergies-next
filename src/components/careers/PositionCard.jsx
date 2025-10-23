import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBriefcase, FaMapMarkerAlt, FaTools, FaLayerGroup } from 'react-icons/fa'
import { IoChevronDown } from 'react-icons/io5'

export default function PositionCard({ p, mainColor = 'var(--primary-green)' }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-6">
        {/* Info */}
        <div className="flex-1">
          <h4 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
            {p.name || p.title}
          </h4>

          <div className="text-base text-gray-600 space-y-2">
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-gray-400 text-lg" />
              <span>{p.type || p.employmentType || 'Full-time'}</span>
            </div>

            {p.location && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-400 text-lg" />
                <span>{p.location}</span>
              </div>
            )}

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
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex flex-col items-end gap-3">
          <Link
            href={`/careers/open-application?positionId=${p._id}`}
            className="inline-block text-lg text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition-all"
            style={{ backgroundColor: mainColor }}
          >
            Apply
          </Link>
        </div>
      </div>

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
            <div className="mt-6 border-t border-gray-100 pt-6 text-lg text-gray-700 grid gap-6">
              {/* Why We Are Looking */}
              <div className="flex items-start gap-3">
                <FaLayerGroup className="text-[var(--primary-blue)] mt-0.5 text-xl" />
                <div>
                  <strong className="block text-gray-900 mb-2 text-xl">Why we are looking</strong>
                  <p className="text-gray-700 leading-relaxed">
                    {p.whyWeAreLooking || p.why_we_are_looking || 'No description provided.'}
                  </p>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="flex items-start gap-3">
                <FaTools className="text-[var(--primary-blue)] mt-0.5 text-xl" />
                <div>
                  <strong className="block text-gray-900 mb-2 text-xl">Responsibilities</strong>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {p.responsibilities || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex items-start gap-3">
                <FaBriefcase className="text-[var(--primary-blue)] mt-0.5 text-xl" />
                <div>
                  <strong className="block text-gray-900 mb-2 text-xl">Skills</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.isArray(p.skills)
                      ? p.skills.map((s, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-base font-medium"
                          >
                            {String(s).trim()}
                          </span>
                        ))
                      : (p.skills || '')
                          .split(',')
                          .filter(Boolean)
                          .map((s, i) => (
                            <span
                              key={i}
                              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-base font-medium"
                            >
                              {s.trim()}
                            </span>
                          ))}
                    {!p.skills && <div>N/A</div>}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

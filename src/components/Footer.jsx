import { FaLinkedin, FaSquareXTwitter, FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa6'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { fadeUp, fadeLeft, fadeRight, viewportSettings } from '../utils/animations'
import { getImageUrl } from '../utils/imageUtils'
import { navLinks as localNavLinks } from '../data/navLinks'
import { MdEmail } from 'react-icons/md'
import { FaPhone, FaLocationDot } from 'react-icons/fa6'

export default function Footer({ config = {}, images = {} }) {
  //  ensure config is an object and configObj exists
  if (!config || typeof config !== 'object') config = {}
  const safeConfig = config || {}
  const configObj = (safeConfig && typeof safeConfig === 'object' && safeConfig.configObj) ? safeConfig.configObj : {}

  const mergedConfig = { ...configObj, ...safeConfig }

  const mainColor = mergedConfig.mainColor || mergedConfig.main_color || '#111'
  const workingHours = mergedConfig.workingHours || mergedConfig.working_hours || []

  const formatTime = (t) => {
    if (!t) return ''
    const s = t.toString().trim()

    const ampmMatch = s.match(/^(\s*)(\d{1,2})(?::(\d{2}))?\s*([ap]m)\s*$/i)
    if (ampmMatch) {
      let hh = parseInt(ampmMatch[2], 10)
      const mm = ampmMatch[3] || '00'
      const period = ampmMatch[4].toUpperCase()
      if (Number.isNaN(hh)) return s.replace(/\s+/g, ' ')
      let displayHour = hh % 12
      if (displayHour === 0) displayHour = 12
      return `${displayHour}:${mm} ${period}`
    }

    const m = s.match(/^(\d{1,2})(?::(\d{2}))?$/)
    if (!m) return s
    let hh = parseInt(m[1], 10)
    const mm = m[2] || '00'
    if (Number.isNaN(hh)) return s
    const period = hh >= 12 ? 'PM' : 'AM'
    let displayHour = hh % 12
    if (displayHour === 0) displayHour = 12
    return `${displayHour}:${mm} ${period}`
  }

  const formatTimeRange = (rangeStr) => {
    if (!rangeStr) return ''
    if (rangeStr.includes('-')) {
      const parts = rangeStr.split('-').map(p => p.trim())
      const left = formatTime(parts[0])
      const right = parts[1] ? formatTime(parts[1]) : ''
      return right ? `${left} – ${right}` : left
    }
    return formatTime(rangeStr)
  }

  return (
    <>
      <footer role="contentinfo" className="bg-[var(--primary-green)] text-white py-8 sm:py-12 font-sans overflow-hidden">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center tracking-wide"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp(0)}
        >
          {mergedConfig.name || 'ClathraEnergies'}
        </motion.h1>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-0 gap-6 sm:gap-10 text-center md:text-left">

          <motion.div
            className="flex justify-center md:col-span-2 lg:col-span-1"
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={fadeLeft(0.2)}
          >
            {(() => {
              // Check for video first in the separate videos object
              const videosObj = config?.videos || {}
              const imagesObj = config?.images || images || {}
              
              const mainVideo = videosObj?.main_video || videosObj?.mainVideo || null
              const mainImage = imagesObj?.main_video || imagesObj?.mainImage || null

              let mediaSrc = null
              let mediaType = null

              if (mainVideo) {
                // ensure video uses API domain
                if (mainVideo.startsWith('http://') || mainVideo.startsWith('https://')) mediaSrc = mainVideo
                else mediaSrc = getImageUrl(mainVideo)
                mediaType = 'video'
              } else if (mainImage) {
                // fallback to image if no video
                if (mainImage.startsWith('http://') || mainImage.startsWith('https://')) mediaSrc = mainImage
                else mediaSrc = getImageUrl(mainImage)
                mediaType = 'image'
              }

              const fallbackLogo = getImageUrl(imagesObj?.secondary_logo || mergedConfig.images?.secondary_logo || '')
              
              return mediaSrc ? (
                <FooterMedia src={mediaSrc} type={mediaType} poster={fallbackLogo} fallbackLogo={fallbackLogo} />
              ) : (
                <div className="w-40 sm:w-48 md:w-56 lg:w-64 h-40 sm:h-48 md:h-56 lg:h-64 rounded-full bg-white/30" />
              )
            })()}
          </motion.div>


          <div className="md:col-span-2 md:flex md:justify-between lg:col-span-2 lg:flex lg:justify-between pl-0 md:pl-32 lg:pl-4">

            {workingHours && workingHours.length > 0 ? (
              <motion.div
                className="space-y-3 mt-6 flex-1"
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeUp(0.4)}
              >
                {mergedConfig.working_title ? (
                  <h4 className="font-bold mb-3 text-xl sm:text-2xl md:text-3xl">
                    {mergedConfig.working_title}
                  </h4>
                ) : null}
                {workingHours.map((wh, i) => {
                  const rawDayFrom = wh.dayFrom || wh.day || wh.day_from || wh.from_day || ''
                  const rawDayTo = wh.dayTo || wh.day_to || wh.to_day || ''
                  const dayFrom = (rawDayFrom || '').trim()
                  const dayTo = (rawDayTo || '').trim()
                  const dayLine = dayFrom && dayTo ? `${dayFrom} – ${dayTo}` : (dayFrom || dayTo || '')

                  let timeLine = ''
                  if (wh.isClosed || wh.closed) timeLine = 'Closed'
                  else if (wh.hoursFrom || wh.hoursTo)
                    timeLine = `${wh.hoursFrom || ''} - ${wh.hoursTo || ''}`.trim()
                  else if (wh.hours) timeLine = wh.hours

                  if (timeLine && timeLine !== 'Closed') timeLine = formatTimeRange(timeLine)

                  return (
                    <div key={i} className="text-base sm:text-lg font-normal">
                      {dayLine ? (
                        <div className="font-semibold text-center md:text-left">
                          {dayLine.endsWith(':') ? dayLine : `${dayLine}:`}
                        </div>
                      ) : null}

                      {timeLine ? (
                        <div className="mt-1 text-base font-normal text-center md:text-left">
                          {timeLine}
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </motion.div>
            ) : null}


            {(mergedConfig.contactInfo?.details?.email ||
              mergedConfig.contactInfo?.details?.phone ||
              mergedConfig.contactInfo?.details?.address) && (
              <motion.div
                className="space-y-3 mt-6 flex-1"
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                variants={fadeRight(0.6)}
              >
                {(mergedConfig.contactInfo?.title || mergedConfig.contactInfo?.name) && (
                  <h4 className="font-bold mb-3 text-xl sm:text-2xl md:text-3xl">
                    {mergedConfig.contactInfo?.title || mergedConfig.contactInfo?.name}
                  </h4>
                )}
                {mergedConfig.contactInfo?.details?.email && (
                  <a
                    href={`mailto:${mergedConfig.contactInfo.details.email}`}
                    className="flex items-center justify-center md:justify-start gap-2 hover:text-black transition-colors text-base sm:text-lg font-normal"
                  >
                    <MdEmail className="text-xl sm:text-2xl" />
                    <span>{mergedConfig.contactInfo.details.email}</span>
                  </a>
                )}

                {mergedConfig.contactInfo?.details?.phone && (
                  <a
                    href={`tel:${mergedConfig.contactInfo.details.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center md:justify-start gap-2 hover:text-black transition-colors text-base sm:text-lg font-normal"
                  >
                    <FaPhone className="text-xl sm:text-2xl" />
                    <span>{mergedConfig.contactInfo.details.phone}</span>
                  </a>
                )}

                {mergedConfig.contactInfo?.details?.address?.street && (
                  <p className="flex items-start justify-center md:justify-start gap-2 text-base sm:text-lg font-normal">
                    <FaLocationDot className="text-xl sm:text-2xl mt-1" />
                    <span>
                      {mergedConfig.contactInfo.details.address.street}
                      {mergedConfig.contactInfo.details.address.city && (
                        <>
                          <br />
                          {mergedConfig.contactInfo.details.address.city}
                        </>
                      )}
                      {mergedConfig.contactInfo.details.address.country && (
                        <>
                          <br />
                          {mergedConfig.contactInfo.details.address.country}
                        </>
                      )}
                    </span>
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>


        <motion.nav
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl mt-8 sm:mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp(0.8)}
        >
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 text-base sm:text-lg font-normal">
            {(mergedConfig.navLinks && mergedConfig.navLinks.length
              ? mergedConfig.navLinks
              : localNavLinks
            ).map((link, i) => (
              <a key={i} href={link.path} className="relative hover:text-black transition-colors group">
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <motion.div
            className="border-t-2 border-white mt-6 w-3/4 sm:w-2/3 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportSettings}
            transition={{ duration: 0.8, delay: 1 }}
          />
        </motion.nav>
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex justify-center md:justify-end mt-6 gap-8 sm:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeRight(1)}
        >
          {(mergedConfig.socialLinks && mergedConfig.socialLinks.length
            ? mergedConfig.socialLinks
            : []
          ).map((item, i) => {
            const raw = (item.iconClass || item.icon || item.name || '').toString()
            const key = raw.toLowerCase()
            let IconComponent = null

            if (key.includes('linkedin')) IconComponent = FaLinkedin
            else if (key.includes('twitter') || key === 'x' || key.includes('squarex')) IconComponent = FaSquareXTwitter
            else if (key.includes('instagram')) IconComponent = FaInstagram
            else if (key.includes('facebook')) IconComponent = FaFacebookF
            else if (key.includes('youtube') || key.includes('yt')) IconComponent = FaYoutube
            else if (key.includes('whatsapp') || key.includes('wa')) IconComponent = FaWhatsapp

            return (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="flex items-center gap-2 hover:text-black transition-colors group relative"
              >
                {IconComponent ? (
                  <IconComponent className="text-xl sm:text-2xl" />
                ) : (
                  <span className="inline-block w-4 h-4 rounded-full bg-white/40" />
                )}
                <span className="relative text-base sm:text-lg font-normal group-hover:text-black transition-colors">
                  {item.name}
                </span>
              </a>
            )
          })}
        </motion.div>
      </footer>

   
      <motion.div
        className="text-center mt-4 mb-6 text-sm sm:text-base md:text-md lg:text-lg font-normal text-gray-600 hover:text-gray-800 transition-colors duration-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp(1.2)}
      >
        {mergedConfig.copyright ||
          `Copyright ©${new Date().getFullYear()} ${mergedConfig.name || 'ClathraEnergies'}`}
      </motion.div>
    </>
  )
}

function FooterMedia({ src, type, poster, fallbackLogo }) {
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
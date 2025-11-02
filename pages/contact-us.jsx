import Head from 'next/head'
import MainLayout from '../src/components/layout/MainLayout'
import ContactHero from '../src/components/contact/ContactHero'
import ContactFormFormik from '../src/components/contact/ContactFormFormik'
import ContactMap from '../src/components/contact/ContactMap'
import SEO from '../src/components/SEO'
import defaultKeywords from '../src/data/seoKeywords'
import BorderLines from '../src/components/common/BorderLines'
import { motion } from 'framer-motion'
import { fadeUp, slideUp, viewportSettings, cardSlideUp } from '../src/utils/animations'
import WorkingHours from '../src/components/common/WorkingHours'
import { MdEmail } from 'react-icons/md'
import { FaPhone, FaLocationDot } from 'react-icons/fa6'
import { getImageUrl, processImageUrls } from '../src/utils/imageUtils'

export default function ContactPage({ config, page }) {
  const cfg = config?.configObj || {}
  const pageObj = page?.pageObj || {}

  return (
    <MainLayout config={config} page={page}>
      <SEO
        title={`Contact`}
        description={pageObj.hero_section?.sub_title || cfg.name}
        keywords={(page?.meta?.keywords || config?.configObj?.metaKeywords || defaultKeywords)}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact-us`}
        image={page?.images?.contact_hero_image || config?.images?.main_logo}
        config={cfg}
      />

      <div>
        <ContactHero hero={pageObj.hero_section || {}} images={page?.images || config?.images || {}} />

        <div className="relative">
          <BorderLines position="left" />
          <div>
            <div className="mx-auto px-4 pt-8 md:pt-12 text-center">
              <motion.h2
                variants={slideUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportSettings}
                className="text-2xl md:text-3xl  leading-snug"
                 style={{ color: 'var(--subtitle-color)' }}
              >
                {pageObj.paragraph || "Tell us about your project, and we'll respond with clear next steps."}
              </motion.h2>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-2">
              {/* Left info card - visible on lg */}
              <motion.div
                className="hidden lg:flex flex-col text-white p-12 justify-between shadow-[8px_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300"
                style={{ backgroundColor: (cfg.mainColor || cfg.main_color || 'var(--green-500)'), border: `2px solid ${cfg.mainColor || cfg.main_color || 'transparent'}` }}
                variants={cardSlideUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportSettings}
              >
                <div className="flex flex-col items-center mt-12">
                  {config?.images?.secondary_logo ? (
                    <img src={getImageUrl(config.images.secondary_logo)} alt={cfg.name || 'logo'} className="w-58 h-58 lg:w-88 lg:h-88 md:w-68 md:h-68 object-contain" />
                  ) : (
                    <h3 className="text-2xl font-bold">{cfg.name || 'ClathraEnergies'}</h3>
                  )}
                </div>

                <div className="mt-2 flex flex-col md:flex-row md:justify-center md:gap-28 lg:gap-0 lg:flex lg:justify-between items-center md:items-start text-center md:text-left">
                  {cfg.workingHours && cfg.workingHours.length > 0 && (
                    <div className="mb-4 md:mb-10">
                      <WorkingHours 
                        hours={cfg.workingHours} 
                        title={cfg.working_title}
                      />
                    </div>
                  )}

                  <div className="flex flex-col items-center md:items-start">
                    {((cfg.contactInfo && (cfg.contactInfo.title || cfg.contactInfo.name)) || cfg.contact_info?.title) && (
                      <h4 className="font-semibold text-lg mb-3">{cfg.contactInfo?.title || cfg.contact_info?.title || cfg.contactInfo?.name}</h4>
                    )}
                    <ul className="space-y-3">
                      {/* Email */}
                      {cfg.contactInfo?.details?.email || cfg.contact_info?.email ? (
                        <li className="flex items-center gap-2 text-sm md:text-base">
                          <span className="text-xl"><MdEmail /></span>
                          <span>{cfg.contactInfo?.details?.email || cfg.contact_info?.email}</span>
                        </li>
                      ) : null}

                      {/* Phone */}
                      {cfg.contactInfo?.details?.phone || cfg.contact_info?.phone ? (
                        <li className="flex items-center gap-2 text-sm md:text-base">
                          <span className="text-xl"><FaPhone /></span>
                          <span>{cfg.contactInfo?.details?.phone || cfg.contact_info?.phone}</span>
                        </li>
                      ) : null}

                      {/* Address */}
                      {cfg.contactInfo?.details?.address && (
                        <li className="flex items-start gap-2 text-sm md:text-base">
                          <span className="text-xl mt-1"><FaLocationDot /></span>
                          <span>{cfg.contactInfo.details.address.street}<br />{cfg.contactInfo.details.address.city}<br />{cfg.contactInfo.details.address.country}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="mt-3 flex justify-center gap-2 sm:gap-12">
                  {(cfg.socialLinks || cfg.social_links || []).map((item, i) => {
                    const raw = (item.iconClass || item.icon || item.name || item.text || '').toString()
                    const key = raw.toLowerCase()
                    let IconComponent = null
                    if (key.includes('linkedin')) IconComponent = require('react-icons/fa6').FaLinkedin
                    else if (key.includes('twitter') || key === 'x' || key.includes('fa_square_x') || key.includes('squarex')) IconComponent = require('react-icons/fa6').FaSquareXTwitter
                    else if (key.includes('instagram')) IconComponent = require('react-icons/fa6').FaInstagram
                    else if (key.includes('facebook')) IconComponent = require('react-icons/fa6').FaFacebookF
                    else if (key.includes('youtube') || key.includes('yt')) IconComponent = require('react-icons/fa6').FaYoutube
                    else if (key.includes('whatsapp') || key.includes('wa')) IconComponent = require('react-icons/fa6').FaWhatsapp

                    return (
                      <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" aria-label={item.name || item.text} className="flex items-center gap-2 hover:text-black transition-colors group relative text-sm md:text-base">
                        {IconComponent ? <IconComponent className="text-xl sm:text-2xl" /> : <span className="text-2xl">{item.icon || ''}</span>}
                        <span className="relative font-normal group-hover:text-black transition-colors">{item.name || item.text}</span>
                      </a>
                    )
                  })}
                </div>
              </motion.div>

              {/* Right - contact form */}
              <motion.div
                variants={cardSlideUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportSettings}
              >
                <ContactFormFormik formConfig={pageObj.form_section || {}} colors={cfg} />
              </motion.div>

            </main>

            {/* Map Section */}
            <section className="relative z-10 h-[450px] mb-4">
              <iframe src={pageObj.gps_location || config?.maps_embed || ''} title="Location" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </section>
          </div>
        </div>

      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000'

  const [configRes, pageRes] = await Promise.all([
    fetch(`${API_BASE}/config`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/pages/contact-us`).then(r => r.json()).catch(() => null),
  ])

  // Process images to ensure they use API domain
  const config = processImageUrls(configRes)
  const page = processImageUrls(pageRes)

  return {
    props: {
      config,
      page,
    },
  }
}

'use client';

import { motion } from 'framer-motion'
import { slideUp, viewportSettings, cardSlideUp } from '../../utils/animations'
import WorkingHours from '../../components/common/WorkingHours'
import { MdEmail } from 'react-icons/md'
import { FaPhone, FaLocationDot, FaLinkedin, FaSquareXTwitter, FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from 'react-icons/fa6'
import { getImageUrl } from '../../utils/imageUtils'
import ContactFormFormik from '../../components/contact/ContactFormFormik'
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { getLocalizedValue } from '../../utils/localizationUtils'

export default function ContactClient({ config, page, dict, lang = 'en' }) {
    const cfg = config?.configObj || {}
    const pageObj = page?.pageObj || {}

    const getIcon = (key) => {
        const k = key.toLowerCase()
        if (k.includes('linkedin')) return FaLinkedin
        if (k.includes('twitter') || k === 'x' || k.includes('fa_square_x') || k.includes('squarex')) return FaSquareXTwitter
        if (k.includes('instagram')) return FaInstagram
        if (k.includes('facebook')) return FaFacebookF
        if (k.includes('youtube') || k.includes('yt')) return FaYoutube
        if (k.includes('whatsapp') || k.includes('wa')) return FaWhatsapp
        return null
    }

    return (
        <>
            <div className="mx-auto px-4 pt-8 md:pt-12 text-center">
                <motion.h2
                    variants={slideUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportSettings}
                    className="text-2xl md:text-3xl leading-snug font-semibold"
                    style={{ color: 'var(--subtitle-color)' }}
                >
                    {getLocalizedValue(pageObj.paragraph, lang) || "Tell us about your project, and we'll respond with clear next steps."}
                </motion.h2>
            </div>

            <main className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    className="flex flex-col text-white p-12 justify-between shadow-[8px_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 rounded-2xl"
                    style={{ backgroundColor: (cfg.mainColor || cfg.main_color || '#ADD0B3'), border: `2px solid ${cfg.mainColor || cfg.main_color || 'transparent'}` }}
                    variants={cardSlideUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportSettings}
                >
                    <div className="flex flex-col items-center mt-4">
                        {config?.images?.secondary_logo ? (
                            <Image
                                src={getImageUrl(config.images.secondary_logo)}
                                alt={cfg.name ? `${cfg.name} Logo` : 'Clathra Energies Logo'}
                                width={240}
                                height={240}
                                className="w-58 h-58 lg:w-88 lg:h-88 md:w-68 md:h-68 object-contain"
                                priority
                                unoptimized
                            />
                        ) : (
                            <h3 className="text-2xl font-bold">{cfg.name || 'ClathraEnergies'}</h3>
                        )}
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row md:justify-center md:gap-28 lg:gap-0 lg:flex lg:justify-between items-center md:items-start text-center md:text-left">
                        {cfg.workingHours && cfg.workingHours.length > 0 && (
                            <div className="mb-4">
                                <WorkingHours hours={cfg.workingHours} title={cfg.working_title} />
                            </div>
                        )}

                        <div className="flex flex-col items-center md:items-start">
                            {((cfg.contactInfo && (cfg.contactInfo.title || cfg.contactInfo.name)) || cfg.contact_info?.title) && (
                                <h4 className="font-semibold text-lg mb-3">{cfg.contactInfo?.title || cfg.contact_info?.title || cfg.contactInfo?.name}</h4>
                            )}
                            <ul className="space-y-4">
                                {(cfg.contactInfo?.details?.email || cfg.contact_info?.email) && (
                                    <li className="flex items-center gap-3 text-sm md:text-base">
                                        <MdEmail className="text-xl" />
                                        <span>{cfg.contactInfo?.details?.email || cfg.contact_info?.email}</span>
                                    </li>
                                )}
                                {(cfg.contactInfo?.details?.phone || cfg.contact_info?.phone) && (
                                    <li className="flex items-center gap-3 text-sm md:text-base">
                                        <FaPhone className="text-xl" />
                                        <span>{cfg.contactInfo?.details?.phone || cfg.contact_info?.phone}</span>
                                    </li>
                                )}
                                {cfg.contactInfo?.details?.address && (
                                    <li className="flex items-start gap-3 text-sm md:text-base">
                                        <FaLocationDot className="text-xl mt-1" />
                                        <span>{cfg.contactInfo.details.address.street}<br />{cfg.contactInfo.details.address.city}<br />{cfg.contactInfo.details.address.country}</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center gap-6">
                        {(cfg.socialLinks || cfg.social_links || []).map((item, i) => {
                            const raw = (item.iconClass || item.icon || item.name || item.text || '').toString()
                            const IconComponent = getIcon(raw)
                            return (
                                <a
                                    key={i}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={item.name || item.text}
                                    className="flex items-center gap-2 hover:text-black transition-colors group"
                                >
                                    {IconComponent ? <IconComponent className="text-2xl" /> : <span className="text-2xl">{item.icon || ''}</span>}
                                    <span className="text-base sm:text-lg font-normal group-hover:text-black transition-colors">
                                        {item.name || item.text}
                                    </span>
                                </a>
                            )
                        })}
                    </div>
                </motion.div>

                <motion.div variants={cardSlideUp} initial="hidden" whileInView="show" viewport={viewportSettings}>
                    <ContactFormFormik formConfig={pageObj.form_section || {}} colors={cfg} dict={dict} lang={lang} />
                </motion.div>
            </main>

            <section className="relative z-10 h-[450px] w-full mb-8 overflow-hidden shadow-inner">
                <iframe
                    src={pageObj.gps_location || config?.maps_embed || ''}
                    title="Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                />
            </section>
        </>
    )
}

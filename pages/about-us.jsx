 import Head from 'next/head'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import StrategicObjectives from '../src/components/about/StrategicObjectives'
import { motion } from 'framer-motion'
import { fadeUp, viewportSettings, containerVariants, cardVariants } from '../src/utils/animations'
import SEO from '../src/components/SEO'
import defaultKeywords from '../src/data/seoKeywords'
import BorderLines from '../src/components/common/BorderLines'

export default function About({ config, page, apiBase }) {
  const cfg = config?.configObj || {}
  const pageObj = page?.pageObj || {}
  const resolveImage = (img) => {
    if (!img) return ''
    // Accept several shapes: string path/url, or object with url/path
    const src = typeof img === 'string' ? img : img.url || img.path || img.src || img.file || ''
    if (!src) return ''
    if (src.startsWith('http') || src.startsWith('data:')) return src
    // Ensure leading slash
    const path = src.startsWith('/') ? src : `/${src}`
    return (apiBase || '') + path
  }
  // Merge images from config and page so callers can find named images like
  // about_detail_icon_1 or objective_icon_1 (page may include these keys)
  const pageImages = { ...(config?.images || {}), ...(page?.images || {}) }

  return (
    <div>
      <SEO
        title={`About`}
        description={pageObj.company_purpose?.sub_title || cfg.name}
        keywords={(page?.meta?.keywords || config?.configObj?.metaKeywords || defaultKeywords)}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about-us`}
        image={pageImages?.about_hero_image || config?.images?.main_logo}
        config={cfg}
      />
      <Navbar config={cfg} images={config?.images} />

      <main>
        {/* Hero (mirrors frontend AboutHero) */}
        <section
          className="relative flex items-center justify-center h-[300px] md:h-[300px] lg:h-[400px] w-full bg-cover bg-[right_center]"
          style={{ backgroundImage: `url(${resolveImage((pageObj.hero_section && pageObj.hero_section.image) || pageImages?.about_hero_image || config?.images?.about_hero_image)})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-[var(--primary-green)]/85 via-[var(--primary-green)]/75 to-[var(--primary-blue)]/70" />
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="relative z-10 text-center px-4 max-w-3xl">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4" >{pageObj.hero_section?.title || pageObj.title || cfg.name}</h1>
            <p className="text-white/90 text-sm md:text-lg leading-relaxed mx-auto ">{pageObj.hero_section?.sub_title}</p>
          </motion.div>
  </section>

  <div className="relative">
    <BorderLines position="left" />
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Company Purpose */}
      <section className="mb-12">
        <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} viewport={viewportSettings} className="section-title mb-8 text-center"  style={{ color: 'var(--title-color)' }}>
          {pageObj.company_purpose?.title}
        </motion.h2>
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} transition={{ delay: 0.2 }} viewport={viewportSettings}
         className="text-[var(--text-gray-600)] text-base md:text-lg leading-relaxed text-center mx-auto max-w-5xl"  style={{ color: 'var(--subtitle-color)' }}>
          {pageObj.company_purpose?.sub_title}
        </motion.div>

        {/* Render company details in a Mission/Vision style grid (icons + colored cards) */}
        <div className="mt-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={viewportSettings}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {(pageObj.company_purpose?.company_details || []).map((d, i) => {
              const colorVal = d.bg_color || d.color || ''
              const useClass = colorVal && !colorVal.startsWith('#')
              const cardStyle = !useClass && colorVal ? { backgroundColor: colorVal } : {}
              const impliedIconKey = `about_detail_icon_${i + 1}`
              const iconSrc = resolveImage(d.icon || d.image || pageImages[impliedIconKey])

              return (
                <motion.div
                  key={d.id ?? i}
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    boxShadow: "-12px 12px 24px rgba(107,114,128,0.45), -8px 0px 18px rgba(107,114,128,0.3)",
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                  className={`pt-16 p-10 text-white ${useClass ? colorVal : ''} flex flex-col items-center text-center cursor-pointer card-shadow w-full max-w-lg mx-auto min-h-[380px]`}
                  style={cardStyle}
                >
                  <h3 className="text-4xl font-bold flex items-center justify-center mb-4">
                    <motion.span whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="mr-2">
                      {iconSrc ? <img src={iconSrc} alt={`${d.title} Icon`} className="md:w-16 md:h-16 w-12 h-12" /> : null}
                    </motion.span>
                    {d.title}
                  </h3>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.2 + 0.4 }} viewport={{ once: true }} className="text-sm md:text-base leading-relaxed">
                    {d.sub_title || d.text}
                  </motion.p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Strategic Objectives */}
      <StrategicObjectives objectives={pageObj.our_strategic_objectives || []} images={pageImages} />
    </div>
  </div>


      </main>

       <Footer config={config} images={config?.images} />
    </div>
  )
}

export async function getServerSideProps() {
  const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000'

  const [configRes, pageRes] = await Promise.all([
    fetch(`${API_BASE}/config`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/pages/about-us`).then(r => r.json()).catch(() => null),
  ])

  return {
    props: {
      config: configRes,
      page: pageRes,
      apiBase: API_BASE,
    },
  }
}
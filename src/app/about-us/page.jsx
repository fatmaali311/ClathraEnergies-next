import { motion } from 'framer-motion'
import StrategicObjectives from '../../components/about/StrategicObjectives'
import MainLayout from '../../components/layout/MainLayout'
import { constructMetadata } from '../../utils/seoUtils'
import BorderLines from '../../components/common/BorderLines'
import { getImageUrl, processImageUrls } from '../../utils/imageUtils'
import defaultKeywords from '../../data/seoKeywords'
import { fadeUp, viewportSettings, containerVariants, cardVariants } from '../../utils/animations'
import AboutClient from './AboutClient'

import { cookies } from 'next/headers'
import { configService } from '../../services/configService'
import { pageService } from '../../services/pageService'

import { getDictionary } from '../../dictionaries'

async function getAboutData() {
    const cookieStore = await cookies()
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en'

    const [config, page] = await Promise.all([
        configService.getGlobalConfig(lang),
        pageService.getPage('about-us', lang)
    ])
    const dict = getDictionary(lang)
    return { config, page, dict }
}

export async function generateMetadata() {
    const { config, page } = await getAboutData()
    const pageImages = { ...(config?.images || {}), ...(page?.images || {}) }
    return constructMetadata({
        title: "About",
        description: page?.pageObj?.company_purpose?.sub_title,
        image: pageImages?.about_hero_image,
        config,
        page,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about-us`
    })
}

export default async function AboutPage() {
    const { config, page, dict } = await getAboutData()

    const cfg = config?.configObj || {}
    const pageObj = page?.pageObj || {}
    const pageImages = { ...(config?.images || {}), ...(page?.images || {}) }

    return (
        <MainLayout config={config} page={page} dict={dict}>


            <main>
                <AboutClient pageObj={pageObj} pageImages={pageImages} cfg={cfg} />

                <div className="relative">
                    <BorderLines position="left" />
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                        <section className="mb-20">
                            <AboutHeading title={pageObj.company_purpose?.title} subtitle={pageObj.company_purpose?.sub_title} />

                            <div className="mt-20">
                                <AboutDetails details={pageObj.company_purpose?.company_details || []} pageImages={pageImages} />
                            </div>
                        </section>

                        <StrategicObjectives
                            objectives={pageObj.our_strategic_objectives || []}
                            images={pageImages}
                            title={pageObj.our_strategic_objectives_title}
                        />
                    </div>
                </div>
            </main>
        </MainLayout>
    )
}

// Sub-components can be kept in the same file or moved if they need "use client"
function AboutHeading({ title, subtitle }) {
    return (
        <>
            <h2 className="section-title mb-12 text-center" style={{ color: 'var(--title-color)' }}>
                {title}
            </h2>
            <div className="text-base md:text-lg leading-relaxed text-center mx-auto max-w-5xl" style={{ color: 'var(--subtitle-color)' }}>
                {subtitle}
            </div>
        </>
    )
}

function AboutDetails({ details, pageImages }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {details.map((d, i) => {
                const colorVal = d.bg_color || d.color || ''
                const useClass = colorVal && !colorVal.startsWith('#')
                const cardStyle = !useClass && colorVal ? { backgroundColor: colorVal } : {}
                const impliedIconKey = `about_detail_icon_${i + 1}`
                const iconSrc = getImageUrl(d.icon || d.image || pageImages[impliedIconKey])

                return (
                    <div
                        key={d.id ?? i}
                        className={`pt-16 p-10 text-white ${useClass ? colorVal : ''} flex flex-col items-center text-center cursor-pointer w-full max-w-lg mx-auto min-h-[380px] border-none shadow-lg`}
                        style={{ ...cardStyle, borderRadius: 0 }}
                    >
                        <h3 className="text-4xl font-bold flex items-center justify-center mb-4">
                            {iconSrc ? <img src={iconSrc} alt={`${d.title} Icon`} className="md:w-16 md:h-16 w-12 h-12 mr-2" /> : null}
                            {d.title}
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed">
                            {d.sub_title || d.text}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

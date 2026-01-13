import HeroSection from '../components/home/HeroSection'
import BorderLines from '../components/common/BorderLines'
import WhoWeAre from '../components/home/WhoWeAre'
import FeaturesSection from '../components/home/FeaturesSection'
import CTASection from '../components/home/CTASection'
import ServicesSection from '../components/home/ServicesSection'
import PartnersSection from '../components/home/PartnersSection'
import MainLayout from '../components/layout/MainLayout'
import { constructMetadata } from '../utils/seoUtils'
import defaultKeywords from '../data/seoKeywords'
import { cookies } from 'next/headers'
import { configService } from '../services/configService'
import { pageService } from '../services/pageService'
import { serviceService } from '../services/serviceService'

import { getDictionary } from '../dictionaries'

async function getData() {
    const cookieStore = await cookies()
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en'

    const [config, page, servicesData] = await Promise.all([
        configService.getGlobalConfig(lang),
        pageService.getPage('home', lang),
        serviceService.getServices({ limit: 10, page: 1, lang })
    ])

    const dict = getDictionary(lang)

    return { config, page, services: servicesData, dict }
}

export async function generateMetadata() {
    const { config, page } = await getData()
    return constructMetadata({
        title: "Home - ClathraEnergies",
        description: page?.pageObj?.hero_section?.sub_title,
        image: page?.images?.hero,
        config,
        page,
        url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    })
}

export default async function Home() {
    const { config, page, services, dict } = await getData()

    const cfg = config?.configObj || {}
    const pageObj = page?.pageObj || {}
    const servicesList = services?.services || []

    return (
        <MainLayout config={config} page={page} dict={dict}>


            <div>
                <HeroSection hero={pageObj.hero_section || {}} images={page?.images || config?.images || {}} theme={cfg} />

                <div className="relative pt-12">
                    <BorderLines position="right" />
                    <div className="md:pr-10">
                        <WhoWeAre section={pageObj.who_we_are_section || {}} images={page?.images || config?.images || {}} dict={dict} />
                        <FeaturesSection
                            features={Array.isArray(pageObj.features_section) ? pageObj.features_section : []}
                            images={page?.images || config?.images || {}}
                        />
                        <ServicesSection
                            services={Array.isArray(servicesList) ? servicesList : []}
                            title={pageObj.services_section_title}
                        />
                        <PartnersSection
                            images={page?.images || config?.images || {}}
                            theme={cfg}
                            title={pageObj.partners_section_title}
                        />
                    </div>
                </div>

                <CTASection cta={pageObj.cta_section || {}} images={page?.images || config?.images || {}} />
            </div>
        </MainLayout>
    )
}

import MainLayout from '../../components/layout/MainLayout'
import ServicesHero from '../../components/services/ServicesHero'
import ServicesCards from '../../components/services/ServicesCards'
import { constructMetadata } from '../../utils/seoUtils'
import { processImageUrls } from '../../utils/imageUtils'
import defaultKeywords from '../../data/seoKeywords'
import BorderLines from '../../components/common/BorderLines'

import { cookies } from 'next/headers'
import { configService } from '../../services/configService'
import { pageService } from '../../services/pageService'
import { serviceService } from '../../services/serviceService'

import { getDictionary } from '../../dictionaries'

async function getData() {
    const cookieStore = await cookies()
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en'

    const [config, page, servicesData] = await Promise.all([
        configService.getGlobalConfig(lang),
        pageService.getPage('services', lang),
        serviceService.getServices({ limit: 10, page: 1, lang })
    ])
    const dict = getDictionary(lang)
    return { config, page, servicesData, dict }
}

export async function generateMetadata() {
    const { config, page } = await getData()
    return constructMetadata({
        title: "Services",
        description: page?.pageObj?.hero_section?.sub_title,
        image: page?.images?.services_hero,
        config,
        page,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/services`
    })
}

export default async function ServicesPage() {
    const { config, page, servicesData, dict } = await getData()
    const cfg = config?.configObj || {}
    return (
        <MainLayout config={config} page={page} dict={dict}>

            <div>
                <ServicesHero hero={page?.pageObj?.hero_section || { title: 'Services' }} images={page?.images || config?.images || {}} />
                <div className="relative pt-12">
                    <BorderLines position="left" />
                    <div className="md:pl-10">
                        <ServicesCards services={servicesData?.services || []} />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

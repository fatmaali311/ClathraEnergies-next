import MainLayout from '../../components/layout/MainLayout'
import { constructMetadata } from '../../utils/seoUtils'
import BorderLines from '../../components/common/BorderLines'
import WhyHero from '../../components/why/WhyHero'
import WhyContent from '../../components/why/WhyContent'
import { processImageUrls } from '../../utils/imageUtils'

import { cookies } from 'next/headers'
import { configService } from '../../services/configService'
import { pageService } from '../../services/pageService'

import { getDictionary } from '../../dictionaries'

async function getData() {
    const cookieStore = await cookies()
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en'

    const [config, page] = await Promise.all([
        configService.getGlobalConfig(lang),
        pageService.getPage('why-technology', lang)
    ])
    const dict = getDictionary(lang)
    return { config, page, dict }
}

export async function generateMetadata() {
    const { config, page } = await getData()
    return constructMetadata({
        title: "Why Technology",
        description: page?.pageObj?.hero_section?.sub_title,
        image: page?.images?.why_hero_image,
        config,
        page,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/why-technology`
    })
}

export default async function WhyTechnologyPage() {
    const { config, page, dict } = await getData()
    const cfg = config?.configObj || {}
    const pageObj = page?.pageObj || {}
    const images = page?.images || config?.images || {}

    return (
        <MainLayout config={config} page={page} dict={dict}>

            <WhyHero hero={pageObj.hero_section || {}} images={images} config={cfg} />
            <div className="relative">
                <BorderLines position="right" />
                <div className="md:pr-10">
                    <WhyContent page={pageObj} images={images} />
                </div>
            </div>
        </MainLayout>
    )
}

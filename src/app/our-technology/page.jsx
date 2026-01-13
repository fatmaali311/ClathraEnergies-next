import MainLayout from '../../components/layout/MainLayout'
import { constructMetadata } from '../../utils/seoUtils'
import BorderLines from '../../components/common/BorderLines'
import OurHero from '../../components/our/OurHero'
import OurGasSeparation from '../../components/our/OurGasSeparation'
import SolutionsCards from '../../components/why/SolutionsCards'
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
        pageService.getPage('our-technology', lang)
    ])
    const dict = getDictionary(lang)
    return { config, page, dict }
}

export async function generateMetadata() {
    const { config, page } = await getData()
    return constructMetadata({
        title: "Our Technology",
        description: page?.pageObj?.hero_section?.sub_title,
        image: page?.images?.our_hero_image,
        config,
        page,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/our-technology`
    })
}

export default async function OurTechnologyPage() {
    const { config, page, dict } = await getData()
    const cfg = config?.configObj || {}
    const pageObj = page?.pageObj || {}
    const images = page?.images || config?.images || {}

    return (
        <MainLayout config={config} page={page} dict={dict}>

            <OurHero hero={pageObj.hero_section || {}} images={images} config={config} />
            <div className="relative pt-12">
                <BorderLines position="right" />
                <OurGasSeparation page={pageObj} images={images} />
                <div className="md:pr-10">
                    <SolutionsCards page={pageObj} dict={dict} />
                </div>
            </div>
        </MainLayout>
    )
}

import MainLayout from '../../components/layout/MainLayout'
import { constructMetadata } from '../../utils/seoUtils'
import BiogasHero from '../../components/biogas/BiogasHero'
import BiogasCycle from '../../components/biogas/BiogasCycle'
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
        pageService.getPage('biogas-solutions', lang)
    ])
    const dict = getDictionary(lang)
    return { config, page, dict }
}

export async function generateMetadata() {
    const { config, page } = await getData()
    return constructMetadata({
        title: "Biogas Solutions",
        description: page?.pageObj?.hero_section?.sub_title,
        image: page?.images?.biogas_hero_image,
        config,
        page,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/biogas-solutions`
    })
}

export default async function BiogasSolutionsPage() {
    const { config, page, dict } = await getData()
    const cfg = config?.configObj || {}
    const pageObj = page?.pageObj || {}
    const images = page?.images || config?.images || {}

    return (
        <MainLayout config={config} page={page} dict={dict}>

            <BiogasHero hero={pageObj.hero_section || {}} images={images} config={config} />
            <div className="relative pt-12">
                <div className="md:pr-10">
                    <BiogasCycle page={pageObj} images={images} />
                </div>
            </div>
        </MainLayout>
    )
}

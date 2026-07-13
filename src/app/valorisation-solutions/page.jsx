import MainLayout from '../../components/layout/MainLayout'
import { constructMetadata } from '../../utils/seoUtils'
import ValorisationHero from '../../components/valorisation/ValorisationHero'
import ValorisationContent from '../../components/valorisation/ValorisationContent'

import { cookies } from 'next/headers'
import { configService } from '../../services/configService'
import { pageService } from '../../services/pageService'

import { getDictionary } from '../../dictionaries'

async function getData() {
    const cookieStore = await cookies()
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en'

    const [config, page] = await Promise.all([
        configService.getGlobalConfig(lang),
        pageService.getPage('valorisation-solutions', lang)
    ])
    const dict = getDictionary(lang)
    return { config, page, dict }
}

export async function generateMetadata() {
    const { config, page } = await getData()
    return constructMetadata({
        title: "Valorisation Solutions",
        description: page?.pageObj?.hero_section?.sub_title,
        image: page?.images?.valorisation_hero_image,
        config,
        page,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/valorisation-solutions`
    })
}

export default async function ValorisationSolutionsPage() {
    const { config, page, dict } = await getData()
    const pageObj = page?.pageObj || {}
    const images = page?.images || config?.images || {}

    return (
        <MainLayout config={config} page={page} dict={dict}>
            <ValorisationHero hero={pageObj.hero_section || {}} images={images} config={config} />
            <ValorisationContent page={pageObj} images={images} />
        </MainLayout>
    )
}

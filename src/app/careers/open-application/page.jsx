import MainLayout from '../../../components/layout/MainLayout'
import { constructMetadata } from '../../../utils/seoUtils'
import ApplicationForm from '../../../components/careers/ApplicationForm'
import defaultKeywords from '../../../data/seoKeywords'
import { processImageUrls } from '../../../utils/imageUtils'

import { getDictionary } from '../../../dictionaries'
import { cookies } from 'next/headers'

import { configService } from '../../../services/configService'
import { pageService } from '../../../services/pageService'
import { positionService } from '../../../services/positionService'

async function getData() {
    const cookieStore = await cookies()
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en'

    try {
        const [config, page, positionsRes] = await Promise.all([
            configService.getGlobalConfig(lang),
            pageService.getPage('careers', lang),
            positionService.getPositions({ limit: 100, page: 1, lang })
        ])
        const positions = positionsRes || []
        const dict = getDictionary(lang)
        return { config, page, positions, dict, lang }
    } catch (err) {
        console.error(err)
        return { config: null, page: null, positions: [], dict: getDictionary('en'), lang: 'en' }
    }
}

export async function generateMetadata() {
    const { config, page } = await getData()
    return constructMetadata({
        title: "Open Application - Careers",
        description: page?.pageObj?.hero_section?.sub_title || `Apply for open positions at ${config?.configObj?.name}`,
        image: page?.images?.main_logo || config?.images?.main_logo,
        config,
        page,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/careers/open-application`
    })
}

export default async function OpenApplicationPage() {
    const { config, page, positions, dict, lang } = await getData()
    const cfg = config?.configObj || {}
    const pageObj = page?.pageObj || {}
    const images = page?.images || config?.images || {}

    return (
        <MainLayout config={config} page={page} dict={dict}>

            <main>
                <section className="py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <ApplicationForm formConfig={page?.pageObj?.application || {}} positions={positions} colors={cfg} dict={dict} lang={lang} />
                    </div>
                </section>
            </main>
        </MainLayout>
    )
}

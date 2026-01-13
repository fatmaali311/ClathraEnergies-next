import MainLayout from '../../components/layout/MainLayout'
import SEO from '../../components/SEO'
import BorderLines from '../../components/common/BorderLines'
import { getImageUrl, processImageUrls } from '../../utils/imageUtils'
import CareersClient from './CareersClient'

import { cookies } from 'next/headers'
import { configService } from '../../services/configService'
import { pageService } from '../../services/pageService'
import { positionService } from '../../services/positionService'

import { getDictionary } from '../../dictionaries'

async function getData() {
    try {
        const cookieStore = await cookies()
        const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en'

        const [config, page, positions] = await Promise.all([
            configService.getGlobalConfig(lang),
            pageService.getPage('careers', lang),
            positionService.getPositions({ limit: 100, page: 1, lang })
        ])
        const dict = getDictionary(lang)
        return { config, page, positions, dict, lang }
    } catch (err) {
        console.error(err)
        return { config: null, page: null, positions: [], dict: getDictionary('en'), lang: 'en' }
    }
}

export default async function CareersPage() {
    const { config, page, positions, dict, lang } = await getData()
    const cfg = config?.configObj || {}
    const pageObj = page?.pageObj || {}
    const images = page?.images || config?.images || {}

    return (
        <MainLayout config={config} page={page} dict={dict}>
            <SEO
                title="Careers"
                description={pageObj.hero_section?.sub_title || cfg.name}
                keywords={config?.configObj?.metaKeywords}
                url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/careers`}
                image={images?.career_hero_image || config?.images?.main_logo}
                config={cfg}
            />

            <main>
                <CareersClient
                    config={config}
                    page={page}
                    positions={positions}
                    pageObj={pageObj}
                    images={images}
                    cfg={cfg}
                    dict={dict}
                    lang={lang}
                />
            </main>
        </MainLayout>
    )
}

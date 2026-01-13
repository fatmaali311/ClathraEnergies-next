import MainLayout from '../../components/layout/MainLayout'
import ContactHero from '../../components/contact/ContactHero'
import { constructMetadata } from '../../utils/seoUtils'
import BorderLines from '../../components/common/BorderLines'
import { processImageUrls } from '../../utils/imageUtils'
import defaultKeywords from '../../data/seoKeywords'
import ContactClient from './ContactClient'

import { cookies } from 'next/headers'
import { configService } from '../../services/configService'
import { pageService } from '../../services/pageService'

import { getDictionary } from '../../dictionaries'

async function getData() {
    const cookieStore = await cookies()
    const lang = cookieStore.get('NEXT_LOCALE')?.value || 'en'

    const [config, page] = await Promise.all([
        configService.getGlobalConfig(lang),
        pageService.getPage('contact-us', lang)
    ])
    const dict = getDictionary(lang)
    return { config, page, dict, lang }
}

export async function generateMetadata() {
    const { config, page } = await getData()
    return constructMetadata({
        title: "Contact Us",
        description: page?.pageObj?.hero_section?.sub_title,
        image: page?.images?.contact_hero_image,
        config,
        page,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact-us`
    })
}

export default async function ContactPage() {
    const { config, page, dict, lang } = await getData()
    const cfg = config?.configObj || {}
    const pageObj = page?.pageObj || {}

    return (
        <MainLayout config={config} page={page} dict={dict}>

            <div>
                <ContactHero hero={pageObj.hero_section || {}} images={page?.images || config?.images || {}} />
                <div className="relative">
                    <BorderLines position="left" />
                    <ContactClient config={config} page={page} dict={dict} lang={lang} />
                </div>
            </div>
        </MainLayout>
    )
}

import React from 'react'
import MainLayout from '../src/components/layout/MainLayout'
import SEO from '../src/components/SEO'
import BorderLines from '../src/components/common/BorderLines'
import OurHero from '../src/components/our/OurHero'
import OurContent from '../src/components/our/OurContent'
import OurGasSeparation from '../src/components/our/OurGasSeparation'
import { processImageUrls } from '../src/utils/imageUtils'

export default function OurTechnology({ config, page, apiBase }) {
  const cfg = config?.configObj || {}
  const pageObj = page?.pageObj || {}
  const images = page?.images || config?.images || {}

  return (
    <MainLayout config={config} page={page}>
      <SEO
        title={`Our Technology`}
        description={pageObj.hero_section?.sub_title || cfg.name}
        keywords={(page?.meta?.keywords || config?.configObj?.metaKeywords || [])}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/our-technology`}
        image={images?.our_hero_image || config?.images?.main_logo}
        config={cfg}
      />

      <OurHero hero={pageObj.hero_section || {}} images={images} config={config} />

      <div className="relative pt-12">
        <BorderLines position="right" />
        <div className="md:pr-10">
          <OurGasSeparation page={pageObj} images={images} />
          <OurContent page={pageObj} images={images} config={config} />
          
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const API_BASE = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  const [configRes, pageRes] = await Promise.all([
    fetch(`${API_BASE}/config`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/pages/our-technology`).then(r => r.json()).catch(() => null),
  ])

  // Process image URLs to ensure they have full paths
  const config = processImageUrls(configRes)
  const page = processImageUrls(pageRes)

  return {
    props: {
      config,
      page,
      apiBase: API_BASE,
    },
  }
}

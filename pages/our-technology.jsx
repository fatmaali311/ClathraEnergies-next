import React from 'react'
import MainLayout from '../src/components/layout/MainLayout'
import SEO from '../src/components/SEO'
import OurHero from '../src/components/our/OurHero'
import OurContent from '../src/components/our/OurContent'

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
      <OurContent page={pageObj} images={images} config={config} />
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const API_BASE = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  const [configRes, pageRes] = await Promise.all([
    fetch(`${API_BASE}/config`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/pages/our-technology`).then(r => r.json()).catch(() => null),
  ])

  return {
    props: {
      config: configRes,
      page: pageRes,
      apiBase: API_BASE,
    },
  }
}

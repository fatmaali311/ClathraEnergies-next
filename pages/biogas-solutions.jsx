import React from 'react'
import MainLayout from '../src/components/layout/MainLayout'
import SEO from '../src/components/SEO'
import BiogasHero from '../src/components/biogas/BiogasHero'
import BiogasCycle from '../src/components/biogas/BiogasCycle'
import { processImageUrls } from '../src/utils/imageUtils'

export default function BiogasSolutions({ config, page, apiBase }) {
  const cfg = config?.configObj || {}
  const pageObj = page?.pageObj || {}
  const images = page?.images || config?.images || {}

  return (
    <MainLayout config={config} page={page}>
      <SEO
        title={`Biogas Solutions`}
        description={pageObj.hero_section?.sub_title || cfg.name}
        keywords={(page?.meta?.keywords || config?.configObj?.metaKeywords || [])}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/biogas-solutions`}
        image={images?.biogas_hero_image || config?.images?.main_logo}
        config={cfg}
      />

      <BiogasHero hero={pageObj.hero_section || {}} images={images} config={config} />

      <div className="relative pt-12">
        <div className="md:pr-10">
          <BiogasCycle page={pageObj} images={images} />
        </div>
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const API_BASE = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  const [configRes, pageRes] = await Promise.all([
    fetch(`${API_BASE}/config`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/pages/biogas-solutions`).then(r => r.json()).catch(() => null),
  ])

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

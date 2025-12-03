import React from 'react';
import MainLayout from '../src/components/layout/MainLayout'
import SEO from '../src/components/SEO'
import BorderLines from '../src/components/common/BorderLines'
import WhyHero from '../src/components/why/WhyHero'
import WhyContent from '../src/components/why/WhyContent'
import { processImageUrls } from '../src/utils/imageUtils'
import SolutionsCards from '../src/components/why/SolutionsCards'

export default function WhyTechnology({ config, page, apiBase }) {
  const cfg = config?.configObj || {}
  const pageObj = page?.pageObj || {}
  const images = page?.images || config?.images || {}

  return (
    <MainLayout config={config} page={page}>
      <SEO
        title={`Why`}
        description={pageObj.hero_section?.sub_title || cfg.name}
        keywords={(page?.meta?.keywords || config?.configObj?.metaKeywords || [])}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/why-technology`}
        image={images?.why_hero_image || config?.images?.main_logo}
        config={cfg}
      />

      <WhyHero hero={pageObj.hero_section || {}} images={images} config={cfg} />

      {/* Solutions  */}
      <div className="relative">
        <BorderLines position="right" />
        <div className="md:pr-10">
        
          <SolutionsCards page={pageObj} />
        </div>

        {/* <div className="md:pr-10"> */}
          <WhyContent page={pageObj} images={images} />
        {/* </div> */}
        </div>
     
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const API_BASE = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  const [configRes, pageRes] = await Promise.all([
    fetch(`${API_BASE}/config`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/pages/why-technology`).then(r => r.json()).catch(() => null),
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

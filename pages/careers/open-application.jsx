import React from 'react'
import MainLayout from '../../src/components/layout/MainLayout'
import SEO from '../../src/components/SEO'
import ApplicationForm from '../../src/components/careers/ApplicationForm'
import defaultKeywords from '../../src/data/seoKeywords'

export default function OpenApplication({ config, page, positions }) {
  const cfg = config?.configObj || {}
  const pageObj = page?.pageObj || {}
  const images = page?.images || config?.images || {}

  return (
    <MainLayout config={config} page={page}>
      <SEO 
        title={`Open Application - Careers`}
        description={pageObj.hero_section?.sub_title || `Apply for open positions at ${cfg.name}`}
        keywords={(page?.meta?.keywords || config?.configObj?.metaKeywords || defaultKeywords)}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/careers/open-application`}
        image={images?.main_logo || config?.images?.main_logo}
        config={cfg}
      />
      <main>
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <ApplicationForm formConfig={page?.pageObj?.application || {}} positions={positions} colors={cfg} />
          </div>
        </section>
      </main>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000'
  try {
    const [configRes, pageRes, positionsRes] = await Promise.all([
      fetch(`${API_BASE}/config`).then(r => r.json()).catch(() => null),
      fetch(`${API_BASE}/pages/careers`).then(r => r.json()).catch(() => null),
      fetch(`${API_BASE}/positions?limit=100&page=1`).then(r => r.json()).catch(() => null),
    ])
    const positions = positionsRes?.data || positionsRes || []
    return { props: { config: configRes, page: pageRes, positions: positions.data || positions } }
  } catch (err) {
    console.error(err)
    return { props: { config: null, page: null, positions: [] } }
  }
}

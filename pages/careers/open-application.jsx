import React from 'react'
import SEO from '../../src/components/SEO'
import Navbar from '../../src/components/Navbar'
import Footer from '../../src/components/Footer'
import ApplicationForm from '../../src/components/careers/ApplicationForm'

export default function OpenApplication({ config, page, positions }) {
  const cfg = config?.configObj || {}
  const images = page?.images || config?.images || {}

  return (
    <div>
      <SEO title={`Open Application`} description={page?.pageObj?.hero_section?.sub_title || cfg.name} config={cfg} />
      <Navbar config={cfg} images={config?.images} />
      <main>
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <ApplicationForm formConfig={page?.pageObj?.application || {}} positions={positions} colors={cfg} />
          </div>
        </section>
      </main>
       <Footer config={config} images={config?.images} />
    </div>
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

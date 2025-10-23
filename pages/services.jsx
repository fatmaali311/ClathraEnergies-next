import Head from 'next/head'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import ServicesHero from '../src/components/services/ServicesHero'
import ServicesCards from '../src/components/services/ServicesCards'
import SEO from '../src/components/SEO'
import defaultKeywords from '../src/data/seoKeywords'
import BorderLines from '../src/components/common/BorderLines'

export default function ServicesPage({ config, page, servicesData }) {
  const cfg = config?.configObj || {}

  return (
    <div>
      <SEO
        title={`Services`}
        description={page?.pageObj?.hero_section?.sub_title || cfg.name}
        keywords={(page?.meta?.keywords || config?.configObj?.metaKeywords || defaultKeywords)}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/services`}
        image={page?.images?.services_hero || config?.images?.main_logo}
        config={cfg}
      />

      <Navbar config={cfg} images={config?.images} />

      <main>
        <ServicesHero hero={page?.pageObj?.hero_section || { title: 'Services' }} images={page?.images || config?.images || {}} />

        <div className="relative pt-12">
          <BorderLines position="left" />
          <div className="container">
            <ServicesCards services={servicesData?.services || []} />
          </div>
        </div>

      </main>

       <Footer config={config} images={config?.images} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000'

  const [configRes, pageRes, servicesRes] = await Promise.all([
    fetch(`${API_BASE}/config`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/pages/services`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/services?limit=10&page=1`).then(r => r.json()).catch(() => ({ services: [] })),
  ])

  return {
    props: {
      config: configRes,
      page: pageRes,
      servicesData: servicesRes,
    },
  }
}

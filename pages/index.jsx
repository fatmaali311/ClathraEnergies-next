import Head from 'next/head'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import HeroSection from '../src/components/home/HeroSection'
import BorderLines from '../src/components/common/BorderLines'
import WhoWeAre from '../src/components/home/WhoWeAre'
import FeaturesSection from '../src/components/home/FeaturesSection'
import CTASection from '../src/components/home/CTASection'
import ServicesSection from '../src/components/home/ServicesSection'
import { motion } from 'framer-motion'
import { fadeUp, containerVariants, listItem, cardSlideUp, viewportSettings } from '../src/utils/animations'
import SEO from '../src/components/SEO'
import defaultKeywords from '../src/data/seoKeywords'

export default function Home({ config, page, services }) {
  const cfg = config?.configObj || {}
  const pageObj = page?.pageObj || {}
  // API returns an object { total, page, limit, totalPages, services: [...] }
  // Accept either that shape or a raw array.
  const servicesList = services?.services || services || []

  return (
    <div>
      <SEO
        title={`Home`}
        description={pageObj.hero_section?.sub_title || cfg.name}
        keywords={(page?.meta?.keywords || config?.configObj?.metaKeywords || defaultKeywords)}
        url={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
        image={page?.images?.hero || config?.images?.main_logo}
        config={cfg}
      />

      <Navbar config={cfg} images={config?.images} />

      <main>
        <HeroSection hero={pageObj.hero_section || {}} images={page?.images || config?.images || {}} theme={cfg} />

        {/* content container with top spacing; BorderLines placed inside so it begins after the hero and ends before footer */}
        <div className="relative pt-12">
          <BorderLines position="right" />
          {/* Use the same inner container classes used in the Navbar so left edges align exactly */}

          <div className="md:pr-10 ">
            <WhoWeAre section={pageObj.who_we_are_section || {}} images={page?.images || config?.images || {}} />

            <FeaturesSection
              features={Array.isArray(pageObj.features_section) ? pageObj.features_section : []}
              images={page?.images || config?.images || {}}
            />
            <ServicesSection services={Array.isArray(servicesList) ? servicesList : []} />

          </div>
        </div>

        {/* CTA is full-bleed, render outside the constrained container */}
        <CTASection cta={pageObj.cta_section || {}} images={page?.images || config?.images || {}} />
      </main>

      <Footer config={config} images={config?.images} />
    </div>
  )
}

export async function getServerSideProps() {
  const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000'

  const [configRes, pageRes] = await Promise.all([
    fetch(`${API_BASE}/config`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/pages/home`).then(r => r.json()).catch(() => null),
  ])

  return {
    props: {
      config: configRes,
      page: pageRes,
      services: await fetch(`${API_BASE}/services?limit=10&page=1`).then(r => r.json()).catch(() => ({ services: [] })),
    },
  }
}

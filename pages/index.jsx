import Head from 'next/head'
import MainLayout from '../src/components/layout/MainLayout'
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
import { processImageUrls } from '../src/utils/imageUtils'
import PartnersSection from '../src/components/home/PartnersSection'


export default function Home({ config, page, services }) {
  const cfg = config?.configObj || {}
  const pageObj = page?.pageObj || {}
  // API returns an object { total, page, limit, totalPages, services: [...] }
  // Accept either that shape or a raw array.
  const servicesList = services?.services || services || []

  return (
    <MainLayout config={config} page={page}>
      <SEO
        title={`Home`}
        description={pageObj.hero_section?.sub_title || cfg.name}
        keywords={(page?.meta?.keywords || config?.configObj?.metaKeywords || defaultKeywords)}
        url={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
        image={page?.images?.hero || config?.images?.main_logo}
        config={cfg}
      />

      <div>
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
             <PartnersSection images={page?.images || config?.images || {}} theme={cfg} />

          </div>
        </div>
      
        {/* CTA is full-bleed, render outside the constrained container */}
        <CTASection cta={pageObj.cta_section || {}} images={page?.images || config?.images || {}} />
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps() {
  const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000'

  const [configRes, pageRes] = await Promise.all([
    fetch(`${API_BASE}/config`).then(r => r.json()).catch(() => null),
    fetch(`${API_BASE}/pages/home`).then(r => r.json()).catch(() => null),
  ])

  // Process all images to ensure they use API domain
  const config = processImageUrls(configRes)
  const page = processImageUrls(pageRes)
  const servicesRes = await fetch(`${API_BASE}/services?limit=10&page=1`).then(r => r.json()).catch(() => ({ services: [] }))
  
  // Process services data to ensure all images use API domain
  const services = servicesRes?.services?.map(svc => {
    // Process service images
    if (svc.data?.images) {
      svc.data.images = Object.keys(svc.data.images).reduce((acc, key) => {
        acc[key] = svc.data.images[key];
        return acc;
      }, {});
    }
    return processImageUrls(svc);
  }) || [];

  return {
    props: {
      config,
      page,
      services: { services }
    },
  }
}

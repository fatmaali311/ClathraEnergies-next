'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { getImageUrl } from '../../utils/imageUtils'
import { fadeUp, viewportSettings } from '../../utils/animations'


const IMAGE_SIZES = {
  dome: 'h-[150px] sm:h-[180px] md:h-[210px] lg:h-[clamp(290px,22vw,390px)]',
  truck: 'h-[150px] sm:h-[180px] md:h-[210px] lg:h-[clamp(290px,22vw,390px)]',
  station: 'h-[150px] sm:h-[180px] md:h-[210px] lg:h-[clamp(290px,22vw,390px)]',
  pipe: 'h-[80%] sm:h-[82%] md:h-[82%] lg:h-[92%]',
}


const IMAGE_WIDTHS = {
  dome: 'flex-[1.3]',
  truck: 'flex-[2.2]',
  station: 'flex-[1.2]',
}

const PIPE_OFFSET = 'right-[-40%] sm:right-[-43%] md:right-[-50%]'

const FlowArrow = ({ direction }) => {
  const isLeft = direction === 'left'

  return (
<div className="pointer-events-none mt-[-55px] h-4 w-full overflow-visible sm:mt-[-54px] md:mt-[-73] lg:mt-[-120px]">      <svg className="h-full w-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker
            id={`arrow-head-${direction}`}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="4.5"
            markerHeight="4.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#4B5563" />
          </marker>
        </defs>

        <line
          x1={isLeft ? '14%' : '86%'}
          y1="50%"
          x2={isLeft ? '86%' : '14%'}
          y2="50%"
          stroke="#4B5563"
          strokeWidth="1.75"
          strokeDasharray="5 4"
          strokeLinecap="round"
          markerEnd={`url(#arrow-head-${direction})`}
        />
      </svg>
    </div>
  )
}

const DiagramAsset = ({ src, alt, variant, pipeSrc, isStation = false }) => {
  return (
    <div className={`relative z-10 flex  items-end ${IMAGE_WIDTHS[variant]} ${IMAGE_SIZES[variant]}`}>
      <img src={src} alt={alt} className="h-full w-full object-contain md:scale-120 lg:scale-150
      " loading="lazy" />
      {isStation && pipeSrc && (
        <img
          src={pipeSrc}
          alt="Injection pipe"
          className={`pointer-events-none absolute bottom-0 ${PIPE_OFFSET} ${IMAGE_SIZES.pipe} w-auto object-contain z-20`}
          loading="lazy"
        />
      )}
    </div>
  )
}

// ============================================================
// CompositeDiagram
// Renders the animated flow diagram for the "producers" section:
// dome -> truck -> injection station (left), or reversed (right).
// A dashed arrow (SVG) connects the icons to show the flow direction.
// ============================================================
const CompositeDiagram = ({ images, type = 'left' }) => {
  const isLeft = type === 'left'

  const domeImg = getImageUrl(images?.producers_biogas_dome_image || '')
  const stationImg = getImageUrl(images?.producers_injection_station_image || '')

  const truckImg = isLeft
    ? getImageUrl(images?.producers_left_truck_image || '')
    : getImageUrl(images?.producers_right_truck_image || '')
  const pipeImg = isLeft
    ? getImageUrl(images?.producers_left_pipe_image || '')
    : getImageUrl(images?.producers_right_pipe_image || '')

  if (!domeImg && !stationImg && !truckImg) return null

  const diagramItems = isLeft
    ? [
        { key: 'dome', src: domeImg, alt: 'Biogas dome', variant: 'dome' },
        { key: 'truck', src: truckImg, alt: 'Transport truck', variant: 'truck' },
        {
          key: 'station',
          src: stationImg,
          alt: 'Injection station',
          variant: 'station',
          pipeSrc: pipeImg,
          isStation: true,
        },
      ]
    : [
        { key: 'truck', src: truckImg, alt: 'Transport truck', variant: 'truck' },
        { key: 'dome', src: domeImg, alt: 'Biogas dome', variant: 'dome' },
        {
          key: 'station',
          src: stationImg,
          alt: 'Injection station',
          variant: 'station',
          pipeSrc: pipeImg,
          isStation: true,
        },
      ]

  return (
    <div className="w-full select-none overflow-visible">
      <div className="mx-auto flex w-full max-w-[460px] flex-col items-center gap-1 overflow-visible pb-0 sm:max-w-[560px] sm:gap-2 md:max-w-[680px] md:gap-3 lg:max-w-[1150px] xl:max-w-[1350px]">
        <div className="flex w-full items-end justify-center gap-0 overflow-visible sm:gap-0 md:gap-1 lg:gap-2 xl:gap-3">
          {diagramItems.map(({ key, ...itemProps }) => (
            <DiagramAsset key={key} {...itemProps} />
          ))}
        </div>
        <FlowArrow direction={type} />
      </div>
    </div>
  )
}

// ============================================================
// ValorisationContent
// Main section combining:
//   1. Producers subsection — two side-by-side flow diagrams with
//      a vertical divider/badge between them.
//   2. Operators subsection — a central image flanked by two
//      supporting text callouts, with a title beneath it.
// Content (titles, text, badge) is CMS-driven via the `page` prop,
// with sensible fallback copy if fields are missing.
// ============================================================
const ValorisationContent = ({ page = {}, images = {} }) => {
  const producers = page.producers_section || {}
  const operators = page.operators_section || {}
  const operatorsImg = getImageUrl(images?.operators_image || '')

  return (
    <section className="w-full overflow-hidden bg-transparent py-5 antialiased sm:py-6 md:py-7">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= PRODUCERS SECTION ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp()}
          className="mb-0"
        >
          <div className="mb-3 text-center sm:mb-4 md:mb-5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {producers.title || 'Valorisation solutions for producers'}
            </h3>
          </div>

          <div className="relative flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-stretch lg:gap-3">
            <div className="flex w-full flex-col items-center px-1 text-center lg:flex-1 lg:px-0 ">
              <div className="mb-1 w-full">
                <CompositeDiagram images={images} type="left" />
              </div>
              <p
                className="max-w-md text-lg font-normal leading-relaxed sm:text-xl md:text-2xl"
                style={{ color: 'var(--subtitle-color)' }}
              >
                {producers.left_text || 'Injection of biomethane or biogas without a grid connection'}
              </p>
            </div>

            <div className="hidden lg:flex min-w-fit select-none flex-col items-center justify-start">
              {producers.badge && (
                <span className="mb-2 block whitespace-nowrap text-center text-2xl font-bold tracking-widest text-[var(--primary-blue)] lg:text-3xl">
                  {producers.badge}
                </span>
              )}
              <div className="w-[3px] flex-grow rounded-full bg-slate-200/90" />
            </div>

            <div className="order-first mb-2 flex justify-center lg:hidden">
              {producers.badge && (
                <span className="whitespace-nowrap text-center text-lg font-bold uppercase tracking-wider text-[var(--primary-blue)] sm:text-xl">
                  {producers.badge}
                </span>
              )}
            </div>
            <div className="flex w-full flex-col items-center px-2 text-center lg:flex-1 lg:px-0">
              <div className="mb-1 w-full">
                <CompositeDiagram images={images} type="right" />
              </div>
              <p
                className="max-w-md text-lg font-normal leading-relaxed sm:text-xl md:text-2xl"
                style={{ color: 'var(--subtitle-color)' }}
              >
                {producers.right_text || 'Storage solution in the event of network saturation (biomethane)'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ================= OPERATORS SECTION ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp()}
          className="pt-2 md:pt-3"
        >
          <div className="hidden items-center gap-3 md:grid md:grid-cols-[1fr_auto_1fr] lg:gap-6">
            <div className="pr-4 text-right">
              <p className="text-lg font-normal leading-relaxed md:text-xl lg:text-2xl" style={{ color: 'var(--subtitle-color)' }}>
                {operators.left_text || 'Green maintenance'}
              </p>
            </div>

            <div className="flex justify-center">
              {operatorsImg && (
                <img
                  src={operatorsImg}
                  alt="Operators solution"
                  className="w-auto max-h-[250px] object-contain lg:max-h-[390px]"
                  loading="lazy"
                />
              )}
            </div>

            <div className="pl-4 text-left">
              <p className="text-lg font-normal leading-relaxed md:text-xl lg:text-2xl" style={{ color: 'var(--subtitle-color)' }}>
                {operators.right_text || 'Reduce saturation'}
              </p>
            </div>
          </div>

          <div className="mb-2 flex flex-col items-center gap-2 md:hidden">
            {operatorsImg && (
              <img
                src={operatorsImg}
                alt="Operators solution"
                className="w-full max-h-[200px] object-contain"
                loading="lazy"
              />
            )}
            <div className="grid w-full grid-cols-2 gap-4 px-2 text-center">
              <div>
                <p className="text-base font-normal leading-snug" style={{ color: 'var(--subtitle-color)' }}>
                  {operators.left_text || 'Green maintenance'}
                </p>
              </div>
              <div>
                <p className="text-base font-normal leading-snug" style={{ color: 'var(--subtitle-color)' }}>
                  {operators.right_text || 'Reduce saturation'}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl md:-mt-6 font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {operators.title || 'For gas network operators'}
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ValorisationContent
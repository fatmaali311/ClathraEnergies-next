'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { getImageUrl } from '../../utils/imageUtils'
import { fadeUp, viewportSettings } from '../../utils/animations'

const CompositeDiagram = ({ images, type = 'left' }) => {
  const isLeft = type === 'left'
  const assetHeight = 'h-[95px] sm:h-[120px] md:h-[145px] lg:h-[165px] xl:h-[185px]'

  const domeImg = getImageUrl(images?.producers_biogas_dome_image || '')
  const stationImg = getImageUrl(images?.producers_injection_station_image || '')
  const truckImg = isLeft
    ? getImageUrl(images?.producers_left_truck_image || '')
    : getImageUrl(images?.producers_right_truck_image || '')
  const pipeImg = isLeft
    ? getImageUrl(images?.producers_left_pipe_image || '')
    : getImageUrl(images?.producers_right_pipe_image || '')

  if (!domeImg && !stationImg && !truckImg) return null

  return (
    <div className="w-full flex items-end justify-center select-none overflow-visible">
      <div className="relative flex items-end justify-center w-full max-w-[420px] sm:max-w-[520px] md:max-w-[620px] lg:max-w-[700px] gap-3.5 overflow-visible pr-20 pb-2">

        <div className="absolute inset-y-0 left-0 right-20 pointer-events-none z-30 overflow-visible">
          <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker
                id={`arrow-head-${type}`}
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
            {isLeft ? (
              <line
                x1="16%"
                y1="68%"
                x2="88%"
                y2="68%"
                stroke="#4B5563"
                strokeWidth="1.75"
                strokeDasharray="5 4"
                strokeLinecap="round"
                markerEnd={`url(#arrow-head-${type})`}
              />
            ) : (
              <line
                x1="84%"
                y1="68%"
                x2="12%"
                y2="68%"
                stroke="#4B5563"
                strokeWidth="1.75"
                strokeDasharray="5 4"
                strokeLinecap="round"
                markerEnd={`url(#arrow-head-${type})`}
              />
            )}
          </svg>
        </div>

        {isLeft ? (
          <>
            <div className={`${assetHeight} w-[30%] flex items-end flex-shrink-0 relative z-10`}>
              <img src={domeImg} alt="Biogas dome" className="h-full w-full object-contain" loading="lazy" />
            </div>
            <div className={`${assetHeight} w-[50%] flex items-end flex-shrink-0 relative z-10`}>
              <img src={truckImg} alt="Transport truck" className="h-full w-full object-contain" loading="lazy" />
            </div>
            <div className={`relative ${assetHeight} w-[30%] flex items-end flex-shrink-0 overflow-visible z-10`}>
              <img src={stationImg} alt="Injection station" className="h-full w-full object-contain relative z-10" loading="lazy" />
              {pipeImg && (
                <img
                  src={pipeImg}
                  alt="Injection pipe"
                  className="absolute bottom-0 right-0 h-[75%] w-auto object-contain z-20 pointer-events-none transform translate-x-[43%]"
                  loading="lazy"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className={`${assetHeight} w-[50%] flex items-end flex-shrink-0 relative z-10`}>
              <img src={truckImg} alt="Transport truck" className="h-full w-full object-contain" loading="lazy" />
            </div>
            <div className={`${assetHeight} w-[30%] flex items-end flex-shrink-0 relative z-10`}>
              <img src={domeImg} alt="Biogas dome" className="h-full w-full object-contain" loading="lazy" />
            </div>
            <div className={`relative ${assetHeight} w-[30%] flex items-end flex-shrink-0 overflow-visible z-10`}>
              <img src={stationImg} alt="Injection station" className="h-full w-full object-contain relative z-10" loading="lazy" />
              {pipeImg && (
                <img
                  src={pipeImg}
                  alt="Injection pipe"
                  className="absolute bottom-0 right-0 h-[75%] w-auto object-contain z-20 pointer-events-none transform translate-x-[48%]"
                  loading="lazy"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const ValorisationContent = ({ page = {}, images = {} }) => {
  const producers = page.producers_section || {}
  const operators = page.operators_section || {}
  const operatorsImg = getImageUrl(images?.operators_image || '')

  return (
    <section className="w-full bg-transparent py-14 overflow-hidden antialiased">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp()}
          className="mb-8 md:mb-10"
        >
          <div className="mb-6 md:mb-10 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {producers.title || 'Valorisation solutions for producers'}
            </h3>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-0 relative">
            <div className="flex flex-col items-center text-center w-full lg:w-[48%] px-4">
              <div className="mb-6 w-full">
                <CompositeDiagram images={images} type="left" />
              </div>
              <p className="max-w-md text-lg sm:text-xl md:text-2xl font-normal leading-relaxed" style={{ color: 'var(--subtitle-color)' }}>
                {producers.left_text || 'Injection of biomethane or biogas without a grid connection'}
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-start min-h-[260px] w-[4%] select-none">
              {producers.badge && (
                <span className="text-xl lg:text-2xl font-bold text-[var(--primary-blue)] mb-3 tracking-widest block uppercase text-center">
                  {producers.badge}
                </span>
              )}
              <div className="w-[3px] bg-slate-200/90 rounded-full flex-grow" />
            </div>

            <div className="lg:hidden flex justify-center order-first mb-4">
              {producers.badge && (
                <span className="text-lg sm:text-xl font-bold text-[var(--primary-blue)] uppercase tracking-wider text-center">{producers.badge}</span>
              )}
            </div>

            <div className="flex flex-col items-center text-center w-full lg:w-[48%] px-4">
              <div className="mb-6 w-full">
                <CompositeDiagram images={images} type="right" />
              </div>
              <p className="max-w-md text-lg sm:text-xl md:text-2xl font-normal leading-relaxed" style={{ color: 'var(--subtitle-color)' }}>
                {producers.right_text || 'Storage solution in the event of network saturation (biomethane)'}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUp()}
            className="pt-6 md:pt-8"
        >
          <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-12 items-center mb-6">
            <div className="text-right pr-6">
              <p className="text-lg md:text-xl lg:text-2xl font-normal leading-relaxed" style={{ color: 'var(--subtitle-color)' }}>
                {operators.left_text || 'Green maintenance'}
              </p>
            </div>

            <div className="flex justify-center">
              {operatorsImg && (
                <img
                  src={operatorsImg}
                  alt="Operators solution"
                  className="max-h-[190px] lg:max-h-[300px] w-auto object-contain "
                  loading="lazy"
                />
              )}
            </div>

            <div className="text-left pl-6">
              <p className="text-lg md:text-xl lg:text-2xl font-normal leading-relaxed" style={{ color: 'var(--subtitle-color)' }}>
                {operators.right_text || 'Reduce saturation'}
              </p>
            </div>
          </div>

          <div className="md:hidden flex flex-col items-center gap-4 mb-6">
            {operatorsImg && (
              <img
                src={operatorsImg}
                alt="Operators solution"
                className="w-full max-h-[170px] object-contain"
                loading="lazy"
              />
            )}
            <div className="grid grid-cols-2 w-full gap-4 text-center px-2">
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

          <div className="mt-4 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              {operators.title || 'For gas network operators'}
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ValorisationContent
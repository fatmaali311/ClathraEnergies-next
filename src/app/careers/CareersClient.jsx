'use client';

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, slideUp, viewportSettings } from '../../utils/animations'
import Link from 'next/link'
import { getImageUrl } from '../../utils/imageUtils'
import PositionCard from '../../components/careers/PositionCard'
import MessageBubble from '../../components/careers/MessageBubble'
import BorderLines from '../../components/common/BorderLines'

import { getLocalizedValue } from '../../utils/localizationUtils'

export default function CareersClient({ config, page, positions, pageObj, images, cfg, dict, lang = 'en' }) {
    const mainColor = cfg.mainColor || cfg.main_color || '#ADD0B3'

    const [firstQuestion, setFirstQuestion] = useState("")
    const [firstAnswer, setFirstAnswer] = useState("")
    const [secondQuestion, setSecondQuestion] = useState("")
    const [secondAnswer, setSecondAnswer] = useState("")
    const [step, setStep] = useState(1)
    const [isTypingFirst, setIsTypingFirst] = useState(true)
    const [shouldStartSecondTyping, setShouldStartSecondTyping] = useState(false)
    const [isTypingSecond, setIsTypingSecond] = useState(false)

    const fullFirstQ = getLocalizedValue(pageObj?.bubbles?.[0]?.title, lang) || "Why Join Us?"
    const fullFirstA = getLocalizedValue(pageObj?.bubbles?.[0]?.paragraph, lang) || `At ${cfg.name || 'our company'}, we foster a culture of innovation, teamwork, and growth.`
    const fullSecondQ = getLocalizedValue(pageObj?.bubbles?.[1]?.title, lang) || "Can’t find your position?"
    const fullSecondA = getLocalizedValue(pageObj?.bubbles?.[1]?.paragraph, lang) || "We're always looking for talented people to join our team!"


    useEffect(() => {
        if (step === 1 && firstQuestion.length < fullFirstQ.length) {
            const timer = setTimeout(() => {
                setFirstQuestion(fullFirstQ.slice(0, firstQuestion.length + 1))
            }, 40)
            return () => clearTimeout(timer)
        } else if (step === 1 && firstQuestion.length === fullFirstQ.length) {
            setTimeout(() => setStep(2), 300)
        }
    }, [firstQuestion, step, fullFirstQ])

    useEffect(() => {
        if (step === 2 && firstAnswer.length < fullFirstA.length) {
            const timer = setTimeout(() => {
                setFirstAnswer(fullFirstA.slice(0, firstAnswer.length + 1))
            }, 25)
            return () => clearTimeout(timer)
        } else if (step === 2 && firstAnswer.length === fullFirstA.length) {
            setIsTypingFirst(false)
        }
    }, [firstAnswer, step, fullFirstA])

    useEffect(() => {
        if (shouldStartSecondTyping) {
            if (secondQuestion.length < fullSecondQ.length) {
                const timer = setTimeout(() => {
                    setSecondQuestion(fullSecondQ.slice(0, secondQuestion.length + 1))
                }, 40)
                return () => clearTimeout(timer)
            }
            else if (secondAnswer.length < fullSecondA.length) {
                const timer = setTimeout(() => {
                    setSecondAnswer(fullSecondA.slice(0, secondAnswer.length + 1))
                }, 25)
                return () => clearTimeout(timer)
            }
            else if (secondAnswer.length === fullSecondA.length) {
                setIsTypingSecond(false)
            }
        }
    }, [secondQuestion, secondAnswer, fullSecondQ, fullSecondA, shouldStartSecondTyping])

    return (
        <>
            <section
                className="relative flex flex-col items-center justify-center text-center h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${getImageUrl(images?.career_hero_image || '')})` }}
            >
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, var(--primary-green), var(--primary-green), var(--primary-blue))', opacity: 'var(--hero-gradient-opacity)' }} />
                <motion.h1 variants={slideUp} initial="hidden" whileInView="show" viewport={viewportSettings} className="relative text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {getLocalizedValue(pageObj.hero_section?.title, lang) || 'Careers'}
                </motion.h1>
                <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportSettings} className="relative text-white/90 text-sm md:text-lg max-w-2xl mx-auto px-4">
                    {getLocalizedValue(pageObj.hero_section?.sub_title, lang) || 'We are always looking for passionate individuals to join us.'}
                </motion.p>
            </section>

            <div className="relative">
                <BorderLines position="left" />
                <section className="md:pl-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
                    <div className="mb-12">
                        <MessageBubble
                            question={firstQuestion}
                            answer={firstAnswer}
                            color="blue"
                            tail="left"
                            icon={images?.career_bubble_icon_1}
                            isTyping={isTypingFirst}
                            showBubble={true}
                            delayTime={0.8}
                            animate="visible"
                        />
                    </div>

                    <div className="mb-12">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
                            {dict?.common?.openPositions || 'Open Positions'}
                        </h2>
                        {positions && positions.length ? (
                            <div className="grid gap-6">
                                {positions.map((p) => (
                                    <PositionCard key={p._id} p={p} mainColor={mainColor} dict={dict} lang={lang} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-gray-400">
                                {dict?.common?.noPositions || 'No open positions at the moment.'}
                            </div>
                        )}
                    </div>

                    <motion.div
                        onViewportEnter={() => {
                            if (!shouldStartSecondTyping) {
                                setShouldStartSecondTyping(true)
                                setIsTypingSecond(true)
                            }
                        }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="mb-12"
                    >
                        <MessageBubble
                            question={secondQuestion}
                            answer={secondAnswer}
                            color="green"
                            tail="right"
                            icon={images?.career_bubble_icon_2}
                            isTyping={isTypingSecond}
                            showBubble={true}
                            delayTime={0.8}
                            initial="hidden"
                            whileInView="visible"
                        />
                    </motion.div>

                    <div className="pt-4">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                            <Link href="/careers/open-application" className="bg-white border border-gray-300 text-gray-600 w-full py-6 rounded-xl font-medium shadow-sm text-lg flex justify-center items-center">
                                {dict?.common?.openApplication || 'Open Application'}
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    )
}

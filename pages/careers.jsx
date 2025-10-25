import React, { useState, useEffect } from 'react'
import SEO from '../src/components/SEO'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import BorderLines from '../src/components/common/BorderLines'
import { motion } from 'framer-motion'
import { fadeUp, slideUp, viewportSettings } from '../src/utils/animations'
import Link from 'next/link'

// Import the separated components
import PositionCard from '../src/components/careers/PositionCard'
import MessageBubble from '../src/components/careers/MessageBubble'


export default function Careers({ config, page, positions }) {
  const cfg = config?.configObj || {}
  const pageObj = page?.pageObj || {}
  const images = page?.images || config?.images || {}

  const mainColor = cfg.mainColor || cfg.main_color || 'var(--primary-green)'
  const secondaryColor = cfg.secondaryColor || cfg.secondary_color || 'var(--primary-blue)'

  // Message bubble typing states
  const [firstQuestion, setFirstQuestion] = useState("")
  const [firstAnswer, setFirstAnswer] = useState("")
  // We now control the second bubble's state with Framer Motion scroll and local states
  const [secondQuestion, setSecondQuestion] = useState("")
  const [secondAnswer, setSecondAnswer] = useState("")
  const [step, setStep] = useState(1)
  const [isTypingFirst, setIsTypingFirst] = useState(true)
  // New state to control if the second bubble should be typing/animating
  const [shouldStartSecondTyping, setShouldStartSecondTyping] = useState(false) 
  const [isTypingSecond, setIsTypingSecond] = useState(false)
  

  // Use API data for full text, or fallbacks
  const fullFirstQ = pageObj?.bubbles?.[0]?.title || "Why Join Us?"
  const fullFirstA = pageObj?.bubbles?.[0]?.paragraph || (cfg?.name ? `At ${cfg.name}, we foster a culture of innovation, teamwork, and growth. Join us to be part of a supportive environment that values your ideas and invests in your success.` : 'At our company we foster a culture of innovation and growth. Join us!')
  const fullSecondQ = pageObj?.bubbles?.[1]?.title || "Can’t find your position?"
  const fullSecondA = pageObj?.bubbles?.[1]?.paragraph || "We're always looking for talented people to join our team! If you don't see a role that fits you right now, you can still share your CV with us."

  // --- Typing Effects for First Bubble (Unchanged) ---
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
  // -----------------------------

  // --- Typing Effects for Second Bubble (Controlled by shouldStartSecondTyping) ---
  useEffect(() => {
    if (shouldStartSecondTyping) {
        // Start typing question 
        if (secondQuestion.length < fullSecondQ.length) {
            const timer = setTimeout(() => {
                setSecondQuestion(fullSecondQ.slice(0, secondQuestion.length + 1))
            }, 40)
            return () => clearTimeout(timer)
        } 
        // Question finished, start typing answer after a small delay
        else if (secondAnswer.length < fullSecondA.length) {
            const timer = setTimeout(() => {
                setSecondAnswer(fullSecondA.slice(0, secondAnswer.length + 1))
            }, 25)
            return () => clearTimeout(timer)
        } 
        // Answer finished
        else if (secondAnswer.length === fullSecondA.length) {
            setIsTypingSecond(false)
        }
    }
  }, [secondQuestion, secondAnswer, fullSecondQ, fullSecondA, shouldStartSecondTyping])
  // -----------------------------


  return (
    <div>
      <SEO
        title={`Careers`}
        description={pageObj.hero_section?.sub_title || cfg.name}
        keywords={config?.configObj?.metaKeywords}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/careers`}
        image={images?.career_hero_image || config?.images?.main_logo}
        config={cfg}
      />


      <Navbar config={cfg} images={config?.images} useSecondaryLogo={true} />




      <main>
        {/* Hero Section */}
        <section
          className="relative flex flex-col items-center justify-center text-center h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] w-full bg-cover bg-[center]"
          style={{ backgroundImage: `url(${images?.career_hero_image || ''})` }}
        >
          {/* Using dynamic colors for gradient overlay */}
          <div className="absolute inset-0" style={{ background: `linear-gradient(to left, ${mainColor}d9, ${mainColor}bf, ${secondaryColor}b3)` }} />
          <motion.h1 variants={slideUp} initial="hidden" whileInView="show" viewport={viewportSettings} className="relative text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
            {pageObj.hero_section?.title || 'Careers'}
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportSettings} className="relative text-white/90 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4">
            {pageObj.hero_section?.sub_title || 'We are always looking for passionate, skilled, and motivated individuals to join us in powering the future'}
          </motion.p>
        </section>

        <div className="relative">
          <BorderLines position="left" />
          {/* Content Section - Updated width and padding to match the desired design example */}
          <section className="md:pl-10 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
            {/* First Message Bubble (Visible on load) */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
              <MessageBubble
                question={firstQuestion}
                answer={firstAnswer}
                color="blue"
                tail="left"
                icon={images?.career_bubble_icon_1}
                isTyping={isTypingFirst}
                showBubble={true}
                delayTime={0.8}
                // No whileInView/initial here, it animates on load
                animate="visible" 
              />
            </div>

            {/* Available Positions Area */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">
                Shows available open positions
              </h2>
              {positions && positions.length ? (
                <div className="p-6 bg-white rounded shadow-md">
                  <h3 className="text-2xl font-semibold mb-4">Open Positions</h3>
                  <div className="grid gap-4">
                    {positions.map((p) => (
                      <PositionCard key={p._id} p={p} mainColor={mainColor} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 text-gray-400 w-full text-sm sm:text-base">No open positions at the moment.</div>
              )}
            </div>

            {/* Second Message Bubble (New scroll-triggered logic) */}
            <motion.div 
                // This motion.div acts as the scroll trigger point
                onViewportEnter={() => {
                    // This function runs when the div scrolls into view
                    if (!shouldStartSecondTyping) {
                        setShouldStartSecondTyping(true)
                        setIsTypingSecond(true)
                    }
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="mb-8 sm:mb-12 lg:mb-16"
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
                // Use Framer Motion to control its initial state and trigger animation
                initial="hidden"
                whileInView="visible"
                // Important: We don't use 'animate' here as 'whileInView' handles the visibility animation
              />
            </motion.div>

            {/* Open Application Link */}
            <div className="pt-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Link href="/careers/open-application" className="bg-white border border-gray-300 text-gray-600 w-full py-4 sm:py-6 md:py-8 rounded-xl font-medium shadow-sm text-base sm:text-lg flex justify-center items-center">
                  Open Application
                </Link>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
 <Footer config={config} images={config?.images} />
    </div>
  )
}

// --- getServerSideProps remains unchanged ---
export async function getServerSideProps() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
  try {
    const [configRes, pageRes, positionsRes] = await Promise.all([
      fetch(`${API_BASE}/config`).then(r => r.json()).catch(() => null),
      fetch(`${API_BASE}/pages/careers`).then(r => r.json()).catch(() => null),
      fetch(`${API_BASE}/positions?limit=100&page=1`).then(r => r.json()).catch(() => null),
    ])

    const positions = positionsRes?.data?.data || positionsRes?.data || positionsRes || []
    
    // Ensure data is structured correctly for page prop
    const pageData = pageRes?.pageObj ? pageRes : { pageObj: pageRes, images: pageRes?.images } || null

    return { props: { config: configRes, page: pageData, positions: positions.data || positions } }
  } catch (err) {
    console.error(err)
    return { props: { config: null, page: null, positions: [] } }
  }
}
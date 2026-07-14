'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './PartnersSection.module.css'

const partners = [
  {
    id: 1,
    name: 'CMA CGM',
    logo: '/images/partenaires-logos-CMA_CGM.png',
    description: 'A global leader in shipping and logistics, CMA CGM operates a fleet of over 600 vessels serving more than 420 ports worldwide. Our partnership enables seamless container shipping solutions across all major trade routes.'
  },
  {
    id: 2,
    name: 'Evergreen',
    logo: '/images/partenaires-logos-Evergreen.png',
    description: 'One of the world\'s largest container shipping companies, Evergreen Line provides reliable ocean freight services with a modern fleet and extensive network. Together, we deliver efficient maritime transportation solutions.'
  },
  {
    id: 3,
    name: 'MGLN',
    logo: '/images/partenaires-logos-MGLN.png',
    description: 'MGLN specializes in international freight forwarding and logistics management. Their expertise in customs clearance and cargo coordination complements our comprehensive logistics services perfectly.'
  },
  {
    id: 4,
    name: 'MSC',
    logo: '/images/partenaires-logos-MSC.png',
    description: 'Mediterranean Shipping Company (MSC) is the world\'s second-largest container shipping line. Our collaboration ensures access to their global network of routes and state-of-the-art shipping capabilities.'
  }
]

export default function PartnersSection() {
  const [selectedPartner, setSelectedPartner] = useState<typeof partners[0] | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  
  const headerText = "Our Partners"
  
  // Animation variants for letter-by-letter appearance
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  // Infinite scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollPosition += scrollSpeed
        
        // Reset scroll when we've scrolled one full set
        const maxScroll = scrollContainer.scrollWidth / 2
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0
        }
        
        scrollContainer.scrollLeft = scrollPosition
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused])

  const handlePartnerClick = (partner: typeof partners[0]) => {
    if (selectedPartner?.id === partner.id) {
      setSelectedPartner(null)
    } else {
      setSelectedPartner(partner)
    }
  }

  // Duplicate partners array for infinite scroll effect
  const duplicatedPartners = [...partners, ...partners, ...partners]

  return (
    <section className={styles.partnersSection}>
      {/* Header with Letter Animation */}
      <div className={styles.headerWrapper}>
        <motion.h2 
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
        >
          {headerText.split('').map((char, index) => (
            <motion.span
              key={`header-${index}`}
              variants={letterVariants}
              transition={{
                duration: 0.03,
                delay: index * 0.05,
                ease: 'easeOut'
              }}
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h2>
        
        {/* Scribble underline */}
        <motion.svg
          className={styles.scribble}
          viewBox="0 0 400 30"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.3, delay: headerText.length * 0.05 + 0.2 }}
        >
          <motion.path
            d="M 10 15 Q 50 8, 100 16 T 200 14 T 300 17 T 390 15"
            stroke="#C38E4A"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 1,
              delay: headerText.length * 0.05 + 0.2,
              ease: 'easeInOut'
            }}
          />
          <motion.path
            d="M 15 18 Q 55 12, 105 19 T 205 17 T 305 20 T 385 18"
            stroke="#C38E4A"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 1,
              delay: headerText.length * 0.05 + 0.3,
              ease: 'easeInOut'
            }}
          />
        </motion.svg>
      </div>
      
      {/* Scrolling Cards Row */}
      <div 
        className={styles.scrollContainer}
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={styles.scrollContent}>
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className={`${styles.partnerCard} ${selectedPartner?.id === partner.id ? styles.partnerCardActive : ''}`}
              onClick={() => handlePartnerClick(partner)}
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className={styles.cardLogo}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Content Below */}
      <AnimatePresence mode="wait">
        {selectedPartner && (
          <motion.div
            key={selectedPartner.id}
            className={styles.expandedContent}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.div
              className={styles.expandedInner}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <motion.div 
                className={styles.expandedLogo}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <img 
                  src={selectedPartner.logo} 
                  alt={selectedPartner.name}
                  className={styles.expandedLogoImage}
                />
              </motion.div>
              <motion.p 
                className={styles.expandedDescription}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
              >
                {selectedPartner.description}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

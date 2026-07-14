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

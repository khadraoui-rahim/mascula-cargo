'use client'

import { motion } from 'framer-motion'
import styles from './ServicesCardsSection.module.css'

const services = [
  {
    id: 1,
    title: 'MARITIME FREIGHT',
    description: 'Reliable ocean freight solutions for full-container (FCL), less-than-container (LCL), and oversized cargo. We ensure secure transportation with transparent tracking from departure to destination.',
    image: '/images/image4.jpg'
  },
  {
    id: 2,
    title: 'AIR FREIGHT',
    description: 'Fast and dependable air cargo services for urgent international shipments. Designed for businesses that require speed, reliability, and on-time delivery across global destinations.',
    image: '/images/image6.jpg'
  },
  {
    id: 3,
    title: 'LOGISTICS SOLUTIONS',
    description: 'End-to-end logistics services including customs clearance, warehousing, cargo coordination, and shipment management—tailored to simplify every stage of your supply chain.',
    image: '/images/image7.jpg'
  }
]

export default function ServicesCardsSection() {
  const headingText = "Our Service Moving cargo, without compromise."
  
  // Animation variants for letter-by-letter appearance
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <section className={styles.servicesCardsSection}>
      {/* Background Image */}
      <div 
        className={styles.backgroundImage}
        style={{ backgroundImage: 'url(/images/image2.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className={styles.overlay} />
      
      {/* Content Container */}
      <div className={styles.content}>
        {/* Heading with letter-by-letter animation */}
        <motion.h2 
          className={styles.heading}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {headingText.split('').map((char, index) => (
            <motion.span
              key={`heading-${index}`}
              variants={letterVariants}
              transition={{
                duration: 0.03,
                delay: index * 0.015,
                ease: 'easeOut'
              }}
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h2>
        
        {/* Cards Container */}
        <div className={styles.cardsContainer}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: headingText.length * 0.015 + 0.2 + index * 0.15,
                ease: 'easeOut'
              }}
            >
              {/* Background Image with hover effect */}
              <div 
                className={styles.cardBackground}
                style={{ backgroundImage: `url(${service.image})` }}
              />
              
              {/* Text Box in Bottom Right */}
              <div className={styles.cardTextBox}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <button className={styles.learnMoreButton}>
                  Learn More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import styles from './ServicesSection.module.css'

export default function ServicesSection() {
  const mainHeadingText = "Your trusted partner for global logistics."
  const bottomHeadingText = "Mascula Cargo & Logistics"
  
  // Animation variants for letter-by-letter appearance
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <section className={styles.servicesSection}>
      {/* Background Image */}
      <div 
        className={styles.backgroundImage}
        style={{ backgroundImage: 'url(/images/image5.jpg)' }}
      />
      
      {/* Dark Overlay */}
      <div className={styles.overlay} />
      
      {/* Content Container */}
      <div className={styles.content}>
        <div className={styles.topContent}>
          {/* Main Heading - Letter by letter animation */}
          <motion.h1 
            className={styles.mainHeading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {mainHeadingText.split('').map((char, index) => (
              <motion.span
                key={`main-${index}`}
                variants={letterVariants}
                transition={{
                  duration: 0.03,
                  delay: index * 0.02,
                  ease: 'easeOut'
                }}
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Description Text */}
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: mainHeadingText.length * 0.02, ease: 'easeOut' }}
          >
            From sea freight to air cargo, Mascula Cargo delivers secure, transparent, and tailored logistics solutions for businesses and individuals worldwide.
          </motion.p>
          
          {/* Contact US Button */}
          <motion.button 
            className={styles.contactButton}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.5, 
              delay: mainHeadingText.length * 0.02 + 0.4, 
              ease: 'easeOut' 
            }}
          >
            Contact US
          </motion.button>
        </div>
        
        {/* Bottom Heading - Scribble animation with SVG underline */}
        <div className={styles.bottomHeadingWrapper}>
          <motion.h2 
            className={styles.bottomHeading}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {bottomHeadingText.split('').map((char, index) => (
              <motion.span
                key={`bottom-${index}`}
                variants={letterVariants}
                transition={{
                  duration: 0.03,
                  delay: mainHeadingText.length * 0.02 + 0.8 + index * 0.015,
                  ease: 'easeOut'
                }}
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h2>
          
          {/* Scribble underline SVG */}
          <motion.svg
            className={styles.scribble}
            viewBox="0 0 800 40"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, delay: mainHeadingText.length * 0.02 + bottomHeadingText.length * 0.015 + 1 }}
          >
            <motion.path
              d="M 10 20 Q 100 10, 200 22 T 400 18 T 600 24 T 790 20"
              stroke="#C38E4A"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.2,
                delay: mainHeadingText.length * 0.02 + bottomHeadingText.length * 0.015 + 1,
                ease: 'easeInOut'
              }}
            />
            <motion.path
              d="M 15 25 Q 110 18, 210 26 T 410 22 T 610 28 T 785 24"
              stroke="#C38E4A"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1.2,
                delay: mainHeadingText.length * 0.02 + bottomHeadingText.length * 0.015 + 1.1,
                ease: 'easeInOut'
              }}
            />
          </motion.svg>
        </div>
        
        {/* About Us text in bottom right of viewport */}
        <motion.p
          className={styles.aboutUsText}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.6, 
            delay: mainHeadingText.length * 0.02 + bottomHeadingText.length * 0.015 + 2.2,
            ease: 'easeOut' 
          }}
        >
          ABOUT US
        </motion.p>
      </div>
    </section>
  )
}

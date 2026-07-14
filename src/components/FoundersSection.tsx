'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FoundersSection.module.css'

const founders = [
  {
    id: 1,
    image: '/images/portrait1.jpg',
    name: 'Sarah Mitchell',
    title: 'Chief Executive Officer',
    description: 'With over 20 years of experience in global logistics, Sarah leads our vision to revolutionize cargo transportation through innovation and sustainable practices.'
  },
  {
    id: 2,
    image: '/images/portrait2.jpg',
    name: 'James Rodriguez',
    title: 'Head of Operations',
    description: 'James brings expertise in supply chain optimization and has successfully coordinated over 10,000 international shipments across six continents.'
  },
  {
    id: 3,
    image: '/images/portrait3.jpg',
    name: 'Emily Chen',
    title: 'Director of Maritime Services',
    description: 'A veteran in ocean freight with 15 years of experience, Emily ensures our maritime operations maintain the highest standards of reliability and efficiency.'
  },
  {
    id: 4,
    image: '/images/portrait4.jpg',
    name: 'Michael Thompson',
    title: 'Chief Technology Officer',
    description: 'Michael drives our digital transformation, implementing cutting-edge tracking systems and AI-powered logistics solutions that keep us ahead of the industry.'
  }
]

export default function FoundersSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + (100 / (5000 / 50)) // Update every 50ms for smooth animation
      })
    }, 50)

    // Switch to next founder every 5 seconds
    const switchInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % founders.length)
      setProgress(0)
    }, 5000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(switchInterval)
    }
  }, [])

  const currentFounder = founders[currentIndex]

  return (
    <section className={styles.foundersSection}>
      <div className={styles.content}>
        {/* Image and Description Container */}
        <div className={styles.mainContent}>
          {/* Square Image on Left */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFounder.id}
              className={styles.imageContainer}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={currentFounder.image} 
                alt={currentFounder.name}
                className={styles.founderImage}
              />
            </motion.div>
          </AnimatePresence>

          {/* Description on Right */}
          <div className={styles.descriptionContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFounder.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className={styles.description}>
                  {currentFounder.description}
                </p>
                <h3 className={styles.founderName}>{currentFounder.name}</h3>
                <p className={styles.founderTitle}>{currentFounder.title}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Line with 4 Chunks */}
        <div className={styles.progressContainer}>
          {founders.map((founder, index) => (
            <div key={founder.id} className={styles.progressChunk}>
              <div 
                className={styles.progressFill}
                style={{
                  width: index < currentIndex 
                    ? '100%' 
                    : index === currentIndex 
                      ? `${progress}%` 
                      : '0%'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

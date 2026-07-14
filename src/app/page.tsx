'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
// import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ServicesCardsSection from '@/components/ServicesCardsSection'
import FoundersSection from '@/components/FoundersSection'
import styles from './page.module.css'

// Dynamically import InfiniteParallax with no SSR for better performance
const InfiniteParallax = dynamic(() => import('@/components/InfiniteParallax'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <>
          <Navbar />
          <main className={styles.main}>
            {/* Hero Section - 100vh */}
            <section className={styles.hero}>
              <InfiniteParallax />
            </section>
            
            {/* About Section - 100vh - TEMPORARILY HIDDEN */}
            {/* <AboutSection /> */}
            
            {/* Services Section - 100vh */}
            <ServicesSection />
            
            {/* Services Cards Section - 100vh */}
            <ServicesCardsSection />
            
            {/* Founders Section - 100vh */}
            <FoundersSection />
          </main>
        </>
      )}
    </>
  )
}


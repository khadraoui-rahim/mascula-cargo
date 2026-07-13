'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import AboutSection from '@/components/AboutSection'
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
            
            {/* About Section - 100vh */}
            <AboutSection />
          </main>
        </>
      )}
    </>
  )
}


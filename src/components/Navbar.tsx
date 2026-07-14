'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [logoColor, setLogoColor] = useState<'black' | 'white' | 'golden'>('black')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      
      // Calculate which section we're in
      const sectionIndex = Math.floor(scrollPosition / viewportHeight)
      
      // Section 0: Hero (black logo)
      // Section 1: Services (white logo)
      // Section 2: Services Cards (white logo)
      // Section 3: Founders (black logo on light background)
      // Section 4: Partners (golden logo on light background)
      
      if (sectionIndex === 0) {
        setLogoColor('black')
      } else if (sectionIndex === 1 || sectionIndex === 2) {
        setLogoColor('white')
      } else if (sectionIndex === 3) {
        setLogoColor('black')
      } else if (sectionIndex >= 4) {
        setLogoColor('golden')
      }
    }

    handleScroll() // Initial check
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <svg 
            width="45" 
            height="42" 
            viewBox="0 0 389 358" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={
              logoColor === 'white' ? styles.logoWhite : 
              logoColor === 'golden' ? styles.logoGolden : 
              ''
            }
          >
            <path d="M129.524 313.862L113.87 279.423L193.705 258.29L274.323 279.423L258.073 313.862L227.197 320.906C215.822 317.514 196.955 311.357 193.705 313.862C190.574 311.357 170.224 317.514 159.266 320.906L129.524 313.862Z" fill="currentColor"/>
            <path d="M42.2699 29.3301V301.065L73.3253 308.829V102.655L193.234 200.135L311.417 102.655L313.142 308.829L344.198 301.065V29.3301L193.234 153.552L42.2699 29.3301Z" fill="currentColor" stroke="currentColor" strokeWidth="1.7253"/>
            <path d="M248.443 182.019V248.443L284.675 261.383V151.826L248.443 182.019Z" fill="currentColor"/>
            <path d="M102.655 261.383L138.024 248.443V182.019L102.655 151.826V261.383Z" fill="currentColor"/>
            <path d="M248.443 182.019V248.443L284.675 261.383V151.826L248.443 182.019Z" stroke="currentColor" strokeWidth="1.7253"/>
            <path d="M102.655 261.383L138.024 248.443V182.019L102.655 151.826V261.383Z" stroke="currentColor" strokeWidth="1.7253"/>
            <path d="M266.559 314.005C268.943 310.036 271.317 306.061 273.68 302.081C278.484 293.992 283.246 285.881 287.965 277.748L289.063 275.854L286.849 275.193C256.361 266.075 225.734 257.484 194.97 249.419L193.245 249.413C192.84 249.516 192.436 249.619 192.031 249.722C160.805 257.67 129.717 266.16 98.7669 275.19L96.613 275.661L97.6393 277.748C102.359 285.881 107.121 293.992 111.924 302.081C114.288 306.061 116.662 310.036 119.046 314.005C117.068 309.819 115.079 305.638 113.081 301.462C109.019 292.977 104.916 284.514 100.77 276.073L99.6427 278.631C131.144 271.765 162.508 264.358 193.733 256.41C194.138 256.307 194.543 256.203 194.947 256.1L193.223 256.095C223.994 264.132 254.904 271.643 285.951 278.628L284.834 276.073C280.689 284.514 276.586 292.977 272.524 301.462C270.526 305.638 268.537 309.819 266.559 314.005Z" fill="#C38E4A"/>
            <path d="M196.684 234.641C196.684 232.735 195.139 231.19 193.234 231.19C191.328 231.19 189.783 232.735 189.783 234.641H193.234H196.684ZM193.234 324.357H196.684V234.641H193.234H189.783V324.357H193.234Z" fill="#C38E4A"/>
          </svg>
        </Link>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <Link href="#team" className={styles.navItem}>
            OUR TEAM
          </Link>
          <Link href="#services" className={styles.navItem}>
            SERVICES
          </Link>
          <Link href="#why-us" className={styles.navItem}>
            WHY US
          </Link>
          <Link href="#contact" className={styles.navItem}>
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  )
}

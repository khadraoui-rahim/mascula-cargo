'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { gsap } from 'gsap'
import styles from './InfiniteParallax.module.css'

// Use images from public/images folder
const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  '/images/image4.jpg',
  '/images/image5.jpg',
  '/images/image6.jpg',
  '/images/image7.jpg',
  '/images/image8.jpg',
]

type CardData = {
  id: string
  src: string
  xPercent: number
  yPercent: number
  depth: number // 0-3 for parallax intensity
  phrase: string // Unique cargo phrase for each card
}

// Cargo phrases for each image
const cargoPhraases = [
  'Spaces for cargo, made for logistics.',
  'Efficient storage, seamless delivery.',
  'Where cargo finds its home.',
  'Built for scale, designed for speed.',
  'Smart spaces for modern freight.',
  'Your cargo, our commitment.',
  'Precision logistics, every time.',
  'Warehousing redefined for tomorrow.',
]

// Generate random card positions
const generateCardData = () => {
  const cards: CardData[] = []
  const verticalSections = 4

  let imageIndex = 0

  // For each vertical section
  for (let y = 0; y < verticalSections; y++) {
    // Random number of cards per row (2-3)
    const cardsInRow = Math.floor(Math.random() * 2) + 2
    
    // Generate random horizontal positions
    const positions: number[] = []
    
    for (let i = 0; i < cardsInRow; i++) {
      let attempts = 0
      let validPosition = false
      let newPos = 0
      
      while (!validPosition && attempts < 20) {
        newPos = 10 + Math.random() * 80
        
        // Check if at least 30vw away from other cards
        validPosition = positions.every(pos => Math.abs(pos - newPos) >= 30)
        attempts++
      }
      
      if (validPosition) {
        positions.push(newPos)
      }
    }
    
    // Create cards at these positions
    positions.forEach((xPos) => {
      const baseY = 15 + (y * 25)
      const randomYOffset = (Math.random() - 0.5) * 15
      const finalY = baseY + randomYOffset
      
      // Check if position would overlap with center text area
      // Center text is roughly at 50% vertical, 50% horizontal
      // Avoid area: 30-70% horizontal, 45-55% vertical
      const isInTextArea = xPos > 30 && xPos < 70 && finalY > 45 && finalY < 55
      
      if (!isInTextArea) {
        const depth = Math.floor(Math.random() * 4) // Random depth 0-3
        
        cards.push({
          id: `card-${imageIndex}`,
          src: images[imageIndex % images.length],
          xPercent: xPos,
          yPercent: finalY,
          depth: depth,
          phrase: cargoPhraases[imageIndex % cargoPhraases.length],
        })
        imageIndex++
      }
    })
  }

  return cards
}

export default function InfiniteParallax() {
  const [cardData, setCardData] = useState<CardData[]>([])
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isClosing, setIsClosing] = useState(false)
  const [showCards, setShowCards] = useState(false)
  const [isRepositioning, setIsRepositioning] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())
  const [showImages, setShowImages] = useState(false)
  const [selectedPhrase, setSelectedPhrase] = useState<string>('')
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)
  const previousPositionsRef = useRef<Map<string, { x: number, y: number }>>(new Map())
  const previousScalesRef = useRef<Map<string, number>>(new Map())
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const hasAnimatedInitially = useRef(false)

  // Memoize card data generation for performance
  const initialCardData = useMemo(() => generateCardData(), [])

  // Force preload images into memory immediately
  useEffect(() => {
    const imageCache: HTMLImageElement[] = []
    
    // Preload images synchronously
    images.forEach((src) => {
      const img = new window.Image()
      img.src = src
      imageCache.push(img)
    })

    if (typeof window !== 'undefined') {
      ;(window as any).__cardImageCache = imageCache
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).__cardImageCache
      }
    }
  }, [])

  // Initialize cards immediately on mount
  useEffect(() => {
    setCardData(initialCardData)
    setMounted(true)
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [initialCardData])

  // Optimized initial animation setup - runs immediately
  useEffect(() => {
    if (!mounted || cardData.length === 0 || selectedImage) return

    // Use requestAnimationFrame for smooth initial setup
    requestAnimationFrame(() => {
      // Only animate on initial load or explicit repositioning
      if (isRepositioning) {
        // Repositioning after clicking background: start from center
        gsap.set(cardData.map(card => cardRefs.current.get(card.id)).filter(Boolean), {
          left: '50%',
          top: '50%',
          xPercent: -50,
          yPercent: -50,
          scale: 0.5,
          opacity: 0.3,
        })

        // Animate to new positions
        cardData.forEach((card, index) => {
          const element = cardRefs.current.get(card.id)
          if (!element) return

          const newScale = 1 - (card.depth * 0.15)
          const newOpacity = 1 - (card.depth * 0.15)
          const staggerDelay = index * 0.03

          gsap.to(element, {
            left: `${card.xPercent}%`,
            top: `${card.yPercent}%`,
            scale: newScale,
            opacity: newOpacity,
            duration: 0.9,
            ease: 'power2.out',
            delay: staggerDelay,
          })
        })

        const resetTimer = setTimeout(() => {
          setIsRepositioning(false)
        }, 1500)
        return () => clearTimeout(resetTimer)
        
      } else if (!hasAnimatedInitially.current) {
        // Initial load only: animate from center once
        hasAnimatedInitially.current = true

        gsap.set(cardData.map(card => cardRefs.current.get(card.id)).filter(Boolean), {
          left: '50%',
          top: '50%',
          xPercent: -50,
          yPercent: -50,
          scale: 0.3,
          opacity: 0,
        })

        // Calculate max animation duration for image reveal timing
        const maxDelay = cardData.length * 0.05
        const totalAnimationTime = 1.0 + maxDelay

        cardData.forEach((card, index) => {
          const element = cardRefs.current.get(card.id)
          if (!element) return

          const newScale = 1 - (card.depth * 0.15)
          const newOpacity = 1 - (card.depth * 0.15)
          const staggerDelay = index * 0.05

          gsap.to(element, {
            left: `${card.xPercent}%`,
            top: `${card.yPercent}%`,
            scale: newScale,
            opacity: newOpacity,
            duration: 1.0,
            ease: 'power3.out',
            delay: staggerDelay,
          })
        })

        // Show images after animation completes
        const imageRevealTimer = setTimeout(() => {
          setShowImages(true)
        }, totalAnimationTime * 1000 + 200)

        return () => clearTimeout(imageRevealTimer)
      } else {
        // Already animated - just ensure cards are in position
        cardData.forEach((card) => {
          const element = cardRefs.current.get(card.id)
          if (!element) return

          const newScale = 1 - (card.depth * 0.15)
          const newOpacity = 1 - (card.depth * 0.15)

          gsap.set(element, {
            left: `${card.xPercent}%`,
            top: `${card.yPercent}%`,
            xPercent: -50,
            yPercent: -50,
            scale: newScale,
            opacity: newOpacity,
          })
        })
      }
    })
  }, [cardData, mounted, selectedImage, isRepositioning])

  // Optimized floating and mouse interaction - lazy loaded after initial animation
  useEffect(() => {
    if (!mounted || cardData.length === 0 || selectedImage) return

    // Delay interactive animations until after initial animation completes
    const setupTimer = setTimeout(() => {
      let mouseIdleTimeout: NodeJS.Timeout | null = null
      let isMouseActive = false

      // Simplified floating animation
      const startFloating = () => {
        cardData.forEach((card) => {
          const element = cardRefs.current.get(card.id)
          if (!element) return

          if (isRepositioning) return

          const floatAnimation = () => {
            const randomX = (Math.random() - 0.5) * 25
            const randomY = (Math.random() - 0.5) * 25
            const randomDuration = 4 + Math.random() * 2
            
            gsap.to(element, {
              x: randomX,
              y: randomY,
              duration: randomDuration,
              ease: 'sine.inOut',
              onComplete: floatAnimation,
            })
          }

          const delay = Math.random() * 2000
          setTimeout(floatAnimation, delay)
        })
      }

      // Start floating after a delay
      setTimeout(startFloating, 1500)

      // Optimized mouse interaction with throttling
      let rafId: number | null = null
      let lastMouseX = 0
      let lastMouseY = 0

      const handleMouseMove = (e: MouseEvent) => {
        lastMouseX = e.clientX
        lastMouseY = e.clientY

        if (rafId !== null) {
          cancelAnimationFrame(rafId)
        }

        rafId = requestAnimationFrame(() => {
          isMouseActive = true

          if (mouseIdleTimeout) {
            clearTimeout(mouseIdleTimeout)
          }

          mouseIdleTimeout = setTimeout(() => {
            isMouseActive = false
          }, 500)

          if (!isMouseActive) return

          cardData.forEach((card) => {
            const element = cardRefs.current.get(card.id)
            if (!element) return

            const rect = element.getBoundingClientRect()
            const cardCenterX = rect.left + rect.width / 2
            const cardCenterY = rect.top + rect.height / 2

            const deltaX = lastMouseX - cardCenterX
            const deltaY = lastMouseY - cardCenterY
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

            const attractRadius = 200
            
            if (distance < attractRadius && distance > 0) {
              const directionX = deltaX / distance
              const directionY = deltaY / distance
              const maxAttract = 40
              const attractionStrength = ((attractRadius - distance) / attractRadius) * maxAttract
              const attractX = directionX * attractionStrength
              const attractY = directionY * attractionStrength

              gsap.to(element, {
                x: attractX,
                y: attractY,
                duration: 0.5,
                ease: 'power1.out',
                overwrite: 'auto',
              })
            }
          })
        })
      }

      window.addEventListener('mousemove', handleMouseMove, { passive: true })

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        if (mouseIdleTimeout) {
          clearTimeout(mouseIdleTimeout)
        }
        if (rafId !== null) {
          cancelAnimationFrame(rafId)
        }
      }
    }, 100) // Minimal delay

    return () => {
      clearTimeout(setupTimer)
      cardData.forEach((card) => {
        const element = cardRefs.current.get(card.id)
        if (element) {
          gsap.killTweensOf(element)
        }
      })
    }
  }, [cardData, mounted, selectedImage, isRepositioning])

  // Memoize card click handler
  const handleCardClick = useCallback((imageSrc: string, phrase: string) => {
    // Use requestAnimationFrame for smoother state updates
    requestAnimationFrame(() => {
      setSelectedImage(imageSrc)
      setSelectedPhrase(phrase)
      // Don't reset showCards - keep it true to maintain positions
    })
  }, [])

  // Memoize background click handler
  const handleBackgroundClick = useCallback(() => {
    if (selectedImage && !isClosing) {
      setIsClosing(true)
      
      // Use requestAnimationFrame for smoother animation triggering
      requestAnimationFrame(() => {
        // Animate cards back to center (bulk them) before regenerating
        cardData.forEach((card) => {
          const element = cardRefs.current.get(card.id)
          if (!element) return
          
          gsap.to(element, {
            left: '50%',
            top: '50%',
            scale: 0.5,
            opacity: 0.3,
            duration: 0.5,
            ease: 'power2.in',
          })
        })
      })
      
      // Wait for fade out animation to complete before removing
      setTimeout(() => {
        setSelectedImage(null)
        setSelectedPhrase('')
        setIsClosing(false)
        
        // Generate new positions and trigger repositioning animation (lazy)
        requestAnimationFrame(() => {
          setIsRepositioning(true)
          setShowImages(false) // Hide images during repositioning
          setCardData(generateCardData())
          
          // Show images after repositioning animation
          setTimeout(() => {
            setShowImages(true)
          }, 1200) // Match repositioning animation duration
        })
      }, 500) // Match animation duration
    }
  }, [selectedImage, isClosing, cardData])

  // Memoize ref setter
  const setRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el)
    } else {
      cardRefs.current.delete(id)
    }
  }, [])

  // Don't render cards until mounted
  if (!mounted) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Spaces for cargo, made for logistics.</h1>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Full screen background image with overlay and phrase */}
      {selectedImage && (
        <div
          className={`${styles.fullscreenBackground} ${isClosing ? styles.fadeOut : ''}`}
          style={{ backgroundImage: `url(${selectedImage})` }}
          onClick={handleBackgroundClick}
        >
          {/* Black overlay */}
          <div className={styles.fullscreenOverlay} />
          
          {/* White phrase text */}
          <div className={styles.fullscreenPhrase}>
            <h2>{selectedPhrase}</h2>
          </div>
        </div>
      )}

      {/* Cards - hidden when image is selected */}
      {!selectedImage && (
        <>
          <div className={styles.cardsContainer}>
            {cardData.map((card, index) => (
              <div
                key={card.id}
                ref={setRef(card.id)}
                data-card-id={card.id}
                className={`${styles.card} ${!showImages ? styles.cardGradient : ''}`}
                onClick={() => handleCardClick(card.src, card.phrase)}
              >
                {showImages && (
                  <>
                    <img
                      src={card.src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={styles.cardImage}
                      onLoad={() => {
                        setLoadedImages((prev) => new Set([...prev, card.id]))
                      }}
                    />
                    {/* Golden overlay that fades out when image loads */}
                    <div 
                      className={`${styles.cardOverlay} ${loadedImages.has(card.id) ? styles.cardOverlayHidden : ''}`}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
          
          {/* Content overlay */}
          <div className={styles.content}>
            <h1>Spaces for cargo, made for logistics.</h1>
          </div>
        </>
      )}
    </div>
  )
}

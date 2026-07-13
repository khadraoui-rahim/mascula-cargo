"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Package, Phone } from "lucide-react";
import { useRef, useEffect } from "react";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useMotionValue(0);

  // Line thickness animation (1px to 2px)
  const lineHeight = useTransform(scrollProgress, [0, 1], [1, 2]);

  // Background image transition (bottom to top reveal)
  const imageClipPath = useTransform(
    scrollProgress,
    [0, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  );

  // Pill color transition (crimson to olive)
  const pillColor = useTransform(
    scrollProgress,
    [0, 1],
    ["rgb(220, 20, 60)", "rgb(128, 128, 0)"],
  );

  // Text opacity transitions for crossfade
  const firstTextOpacity = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [1, 0.5, 0],
  );
  const secondTextOpacity = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [0, 0.5, 1],
  );

  // Contact button opacity and pointer events - visible only at progress 0
  const buttonOpacity = useTransform(scrollProgress, [0, 0.2, 1], [1, 0, 0]);
  const buttonPointerEvents = useTransform(scrollProgress, (v) =>
    v < 0.2 ? "auto" : "none",
  );

  // Section number value
  const sectionNumber = useMotionValue(1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let locked = false;
    let animating = false;
    let progress = scrollProgress.get();
    let touchStartY = 0;
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let unlockGraceUntil = 0; // timestamp until which auto re-lock is suppressed
    const ENTER_THRESHOLD = 2; // px tolerance when detecting section boundary
    const UNLOCK_GRACE_MS = 500;

    const getSectionTop = () => section.offsetTop;

    // Lock is enforced purely by pinning window.scrollY back to lockedY on
    // every scroll event. We deliberately avoid overflow:hidden/position:fixed
    // on the body, so the scrollbar stays visible and usable-looking at all
    // times instead of disappearing while locked.
    let lockedY = 0;

    const lockScroll = (targetY: number) => {
      lockedY = targetY;
      if (!locked) {
        locked = true;
      }
      if (window.scrollY !== targetY) {
        window.scrollTo({ top: targetY, behavior: "auto" });
      }
    };

    const unlockScroll = (targetY: number) => {
      if (!locked) return;
      locked = false;
      // Give the page a short grace period before we allow re-locking, so
      // scrolling away from the section (especially upward, back towards the
      // hero) can't be immediately re-captured by the fallback scroll handler.
      unlockGraceUntil = Date.now() + UNLOCK_GRACE_MS;
      window.scrollTo({ top: targetY, behavior: "auto" });
      lastScrollY = targetY;
    };

    const goTo = (target: 0 | 1) => {
      animating = true;
      animate(scrollProgress, target, {
        duration: 1,
        ease: "easeInOut",
        onUpdate: (v) => {
          progress = v;
        },
        onComplete: () => {
          animating = false;
          progress = target;
          sectionNumber.set(target === 1 ? 2 : 1);
        },
      });
    };

    // Handles scrollbar-drag (and any other) scroll events. While unlocked,
    // detect entry into the section. While locked, keep the page pinned at
    // lockedY so dragging the scrollbar can't skip past the animation - but
    // the scrollbar itself remains fully visible and draggable, it just
    // springs back until the phase animation completes.
    const handleScrollFallback = () => {
      const top = getSectionTop();
      const currentY = window.scrollY;
      const movingDown = currentY > lastScrollY;

      if (!locked) {
        const withinGrace = Date.now() < unlockGraceUntil;
        if (movingDown && !withinGrace && currentY >= top - ENTER_THRESHOLD) {
          lockScroll(top);
          progress = 0;
          scrollProgress.set(0);
          sectionNumber.set(1);
        }
        lastScrollY = currentY;
        return;
      }

      if (currentY !== lockedY) {
        window.scrollTo({ top: lockedY, behavior: "auto" });
      }
      lastScrollY = currentY;
    };

    const handleDown = (e: { preventDefault: () => void }) => {
      const top = getSectionTop();

      if (!locked) {
        if (window.scrollY >= top - ENTER_THRESHOLD) {
          // Entering the locked section - consume this gesture just to lock in place.
          e.preventDefault();
          lockScroll(top);
        }
        return;
      }

      e.preventDefault();
      if (animating) return;

      if (progress === 0) {
        goTo(1);
      }
      // progress === 1: already fully transitioned, stay locked until the
      // user explicitly continues scrolling down again.
      else if (progress === 1) {
        unlockScroll(top + window.innerHeight);
      }
    };

    const handleUp = (e: { preventDefault: () => void }) => {
      if (!locked) return; // let native scroll happen

      e.preventDefault();
      if (animating) return;

      if (progress === 1) {
        goTo(0);
      } else if (progress === 0) {
        const top = getSectionTop();
        unlockScroll(Math.max(0, top - 1));
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        handleDown(e);
      } else if (e.deltaY < 0) {
        handleUp(e);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const delta = touchStartY - currentY;
      if (Math.abs(delta) < 10) return;

      if (delta > 0) {
        handleDown(e);
      } else {
        handleUp(e);
      }
      touchStartY = currentY;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "PageUp", "PageDown", " "].includes(e.key))
        return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        handleDown(e);
      } else {
        handleUp(e);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", handleScrollFallback, { passive: true });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScrollFallback);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollProgress, sectionNumber]);

  return (
    <section ref={sectionRef} className={styles.aboutSection}>
      {/* First Background Image (image7) */}
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: "url(/images/image7.jpg)" }}
      />

      {/* Second Background Image (image3) - Reveals from bottom */}
      <motion.div
        className={styles.backgroundImageSecond}
        style={{
          backgroundImage: "url(/images/image3.jpg)",
          clipPath: imageClipPath,
        }}
      />

      {/* Dark Overlay */}
      <div className={styles.overlay} />

      {/* Content Container */}
      <div className={styles.content}>
        {/* Section Number and Divider */}
        <div className={styles.sectionHeader}>
          {/* Animated Line - Gets thicker on scroll */}
          <motion.div
            className={styles.dividerLine}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              transformOrigin: "left",
              height: lineHeight,
            }}
          />

          {/* Animated Number - Above Line - Changes from 1 to 2 */}
          <motion.div
            className={styles.sectionNumberTop}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          >
            <motion.span>{sectionNumber}</motion.span>
          </motion.div>

          {/* Animated Scroll Text - Below Line */}
          <motion.div
            className={styles.scrollText}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
          >
            Scroll to continue
          </motion.div>
        </div>

        {/* Pill with Color Transition - Crimson to Olive */}
        <motion.div
          className={styles.aboutPill}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            delay: 1.8,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          style={{ backgroundColor: pillColor }}
        >
          <Package size={16} strokeWidth={2.5} className={styles.pillIcon} />

          <div className={styles.pillTextContainer}>
            {/* First pill text - "About Us" */}
            <motion.span
              style={{
                opacity: firstTextOpacity,
                position: "absolute",
                left: 0,
                right: 0,
                whiteSpace: "nowrap",
              }}
            >
              About Us
            </motion.span>

            {/* Second pill text - "Who We Are" */}
            <motion.span
              style={{
                opacity: secondTextOpacity,
                whiteSpace: "nowrap",
              }}
            >
              Who We Are
            </motion.span>
          </div>
        </motion.div>

        {/* Title with Text Transition */}
        <div className={styles.titleContainer}>
          {/* First Title */}
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.01, delay: 2.3 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: firstTextOpacity,
              pointerEvents: useTransform(firstTextOpacity, (v) =>
                v > 0.1 ? "auto" : "none",
              ),
            }}
          >
            Building the future of logistics infrastructure
          </motion.h2>

          {/* Second Title */}
          <motion.h2
            className={styles.title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: secondTextOpacity,
              pointerEvents: useTransform(secondTextOpacity, (v) =>
                v > 0.1 ? "auto" : "none",
              ),
            }}
          >
            Dedicated team delivering excellence in every shipment
          </motion.h2>
        </div>

        {/* Contact Us Button - Only visible in phase 1 */}
        <motion.button
          className={styles.contactButton}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.5,
            delay: 3.8,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            opacity: buttonOpacity,
            pointerEvents: buttonPointerEvents,
          }}
        >
          <div className={styles.iconBox}>
            <Phone size={18} strokeWidth={2.5} className={styles.buttonIcon} />
          </div>
          <div className={styles.buttonText}>Contact us</div>
        </motion.button>
      </div>
    </section>
  );
}

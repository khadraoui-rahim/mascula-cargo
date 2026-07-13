"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({
  onLoadingComplete,
}: LoadingScreenProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    console.log("LoadingScreen mounted");

    const loadResources = async () => {
      try {
        // Preload logo
        const logoPromise = new Promise<void>((resolve) => {
          const logoImg = new Image();
          logoImg.onload = () => {
            console.log("Logo loaded successfully");
            resolve();
          };
          logoImg.onerror = (e) => {
            console.error("Logo load error:", e);
            resolve(); // Continue anyway
          };
          logoImg.src = "/logo.svg";
        });

        // Preload all card images
        const imageUrls = [
          "/images/image1.jpg",
          "/images/image2.jpg",
          "/images/image3.jpg",
          "/images/image4.jpg",
          "/images/image5.jpg",
          "/images/image6.jpg",
          "/images/image7.jpg",
          "/images/image8.jpg",
        ];

        const imageCache: HTMLImageElement[] = [];
        const imagePromises = imageUrls.map((url, index) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              console.log(`Image ${index + 1} loaded`);
              imageCache.push(img);
              resolve();
            };
            img.onerror = () => {
              console.error(`Image ${index + 1} failed`);
              resolve();
            };
            img.src = url;
          });
        });

        // Wait for all resources
        await Promise.all([logoPromise, ...imagePromises]);

        // Keep images in memory
        if (typeof window !== "undefined") {
          (window as any).__imageCache = imageCache;
        }

        console.log("All resources loaded");
        setResourcesLoaded(true);
      } catch (error) {
        console.error("Loading error:", error);
        setResourcesLoaded(true); // Continue anyway
      }
    };

    loadResources();
  }, []);

  // Set completion timer after resources are loaded
  useEffect(() => {
    if (resourcesLoaded) {
      console.log("Starting 2 second timer");
      const timer = setTimeout(() => {
        console.log("Timer complete, setting isComplete");
        setIsComplete(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [resourcesLoaded]);

  // Call completion callback
  useEffect(() => {
    if (isComplete) {
      console.log("Fading out, will call onLoadingComplete in 800ms");
      const timer = setTimeout(() => {
        console.log("Calling onLoadingComplete");
        onLoadingComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onLoadingComplete]);

  return (
    <motion.div
      className={styles.loadingScreen}
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className={styles.logoContainer}>
        {/* Logo with drawing animation */}
        <motion.div
          className={styles.logoWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            width="200"
            height="184"
            viewBox="0 0 389 358"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main paths with stroke drawing animation, then fill */}
            <motion.path
              d="M129.524 313.862L113.87 279.423L193.705 258.29L274.323 279.423L258.073 313.862L227.197 320.906C215.822 317.514 196.955 311.357 193.705 313.862C190.574 311.357 170.224 317.514 159.266 320.906L129.524 313.862Z"
              stroke="black"
              strokeWidth="2"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, fill: "black" }}
              transition={{
                pathLength: { duration: 0.8, delay: 0.2, ease: "easeInOut" },
                fill: { duration: 0.3, delay: 1.0 },
              }}
            />
            <motion.path
              d="M42.2699 29.3301V301.065L73.3253 308.829V102.655L193.234 200.135L311.417 102.655L313.142 308.829L344.198 301.065V29.3301L193.234 153.552L42.2699 29.3301Z"
              stroke="black"
              strokeWidth="2"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, fill: "black" }}
              transition={{
                pathLength: { duration: 1.2, delay: 0.4, ease: "easeInOut" },
                fill: { duration: 0.3, delay: 1.6 },
              }}
            />
            <motion.path
              d="M248.443 182.019V248.443L284.675 261.383V151.826L248.443 182.019Z"
              stroke="black"
              strokeWidth="2"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, fill: "black" }}
              transition={{
                pathLength: { duration: 0.6, delay: 0.8, ease: "easeInOut" },
                fill: { duration: 0.3, delay: 1.4 },
              }}
            />
            <motion.path
              d="M102.655 261.383L138.024 248.443V182.019L102.655 151.826V261.383Z"
              stroke="black"
              strokeWidth="2"
              fill="transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, fill: "black" }}
              transition={{
                pathLength: { duration: 0.6, delay: 0.9, ease: "easeInOut" },
                fill: { duration: 0.3, delay: 1.5 },
              }}
            />

            {/* Stroke lines from original logo */}
            <motion.path
              d="M248.443 182.019V248.443L284.675 261.383V151.826L248.443 182.019Z"
              stroke="black"
              strokeWidth="1.7253"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
            />
            <motion.path
              d="M102.655 261.383L138.024 248.443V182.019L102.655 151.826V261.383Z"
              stroke="black"
              strokeWidth="1.7253"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeInOut" }}
            />

            {/* Decorative elements - fade in after main paths */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <path
                d="M266.559 314.005C268.943 310.036 271.317 306.061 273.68 302.081C278.484 293.992 283.246 285.881 287.965 277.748L289.063 275.854L286.849 275.193C256.361 266.075 225.734 257.484 194.97 249.419L193.245 249.413C192.84 249.516 192.436 249.619 192.031 249.722C160.805 257.67 129.717 266.16 98.7669 275.19L96.613 275.661L97.6393 277.748C102.359 285.881 107.121 293.992 111.924 302.081C114.288 306.061 116.662 310.036 119.046 314.005C117.068 309.819 115.079 305.638 113.081 301.462C109.019 292.977 104.916 284.514 100.77 276.073L99.6427 278.631C131.144 271.765 162.508 264.358 193.733 256.41C194.138 256.307 194.543 256.203 194.947 256.1L193.223 256.095C223.994 264.132 254.904 271.643 285.951 278.628L284.834 276.073C280.689 284.514 276.586 292.977 272.524 301.462C270.526 305.638 268.537 309.819 266.559 314.005Z"
                fill="#C38E4A"
              />
              <path
                d="M196.684 234.641C196.684 232.735 195.139 231.19 193.234 231.19C191.328 231.19 189.783 232.735 189.783 234.641H193.234H196.684ZM193.234 324.357H196.684V234.641H193.234H189.783V324.357H193.234Z"
                fill="#C38E4A"
              />
              <path
                d="M131.986 54.347L122.496 59.5229V45.7205L131.986 39.6819V54.347Z"
                fill="#C38E4A"
              />
              <path
                d="M144.063 45.7205L134.573 50.8964V37.094L144.063 31.0554V45.7205Z"
                fill="#C38E4A"
              />
              <path
                d="M157.865 37.094L148.376 42.2699V28.4675L157.865 22.4289V37.094Z"
                fill="#C38E4A"
              />
              <path
                d="M171.667 28.4675L162.178 33.6434V19.841L171.667 13.8024V28.4675Z"
                fill="#C38E4A"
              />
              <path
                d="M188.92 18.1157L179.431 23.2916V9.48915L188.92 3.4506V18.1157Z"
                fill="#C38E4A"
              />
              <path
                d="M131.986 75.0506L122.496 80.2265V66.4241L131.986 60.3855V75.0506Z"
                fill="#C38E4A"
              />
              <path
                d="M144.063 66.4241L134.573 71.6V57.7976L144.063 51.759V66.4241Z"
                fill="#C38E4A"
              />
              <path
                d="M157.865 57.7976L148.376 62.9735V49.1711L157.865 43.1325V57.7976Z"
                fill="#C38E4A"
              />
              <path
                d="M171.667 49.1711L162.178 54.347V40.5446L171.667 34.506V49.1711Z"
                fill="#C38E4A"
              />
              <path
                d="M188.92 38.8193L179.431 43.9952V30.1928L188.92 24.1542V38.8193Z"
                fill="#C38E4A"
              />
              <path
                d="M195.822 37.094V23.2916L219.976 32.7807L195.822 37.094Z"
                fill="#C38E4A"
              />
              <path
                d="M253.619 38.8193L196.684 17.253V0L253.619 25.0169V38.8193Z"
                fill="#C38E4A"
              />
              <path
                d="M229.465 39.7123C227.74 39.692 226.015 39.6718 224.289 39.6515C224.356 41.0877 224.405 42.5988 224.445 44.0802C224.655 60.117 224.921 76.654 220.72 91.9058C220.72 91.9058 220.72 91.9058 220.72 91.9058C220.714 91.922 220.708 91.9381 220.703 91.9541C217.169 102.054 213.896 112.228 210.875 122.499C210.454 123.933 210.037 125.368 209.624 126.81C210.2 125.425 210.77 124.043 211.334 122.659C215.378 112.746 219.164 102.753 222.7 92.6531C222.706 92.6356 222.712 92.618 222.718 92.6004C222.718 92.6004 222.718 92.6004 222.718 92.6004C227.112 76.606 227.596 60.411 229.124 44.2032C229.242 42.7067 229.358 41.2027 229.465 39.7123Z"
                fill="#C38E4A"
              />
              <path
                d="M254.063 46.4746C254.342 45.9718 254.622 45.4691 254.901 44.9664C254.764 44.9071 254.628 44.8477 254.492 44.7884C252.037 43.7207 249.582 42.6529 247.127 41.5852C246.991 41.5259 246.854 41.4665 246.718 41.4072C246.84 41.4917 246.963 41.5761 247.085 41.6606C249.289 43.1808 251.492 44.701 253.696 46.2212C253.818 46.3057 253.941 46.3901 254.063 46.4746Z"
                fill="#C38E4A"
              />
              <path
                d="M124.222 85.4024C127.298 84.221 130.371 83.0318 133.441 81.8347C161.067 71.0605 188.408 59.6481 215.466 47.5974C219.62 45.7469 223.768 43.8814 227.91 42.0008L225.549 41.8456C238.258 49.5177 251.058 57.0403 263.95 64.4134L263.36 62.147C258.632 71.2208 253.977 80.3354 249.394 89.4908C247.92 92.437 246.452 95.3875 244.993 98.3422C246.753 95.5563 248.506 92.7662 250.252 89.9719C255.676 81.2887 261.028 72.5647 266.307 63.8L267.081 62.3138L265.717 61.5336C253.305 53.3789 240.801 45.3738 228.205 37.5183L227.045 36.8179L225.844 37.363C221.676 39.1834 217.515 41.0188 213.36 42.8692C186.302 54.92 159.529 67.609 133.041 80.9363C130.098 82.4171 127.158 83.9058 124.222 85.4024Z"
                fill="#C38E4A"
              />
              <circle cx="202.723" cy="68.1494" r="2.58795" fill="#C38E4A" />
              <circle cx="244.13" cy="68.1494" r="2.58795" fill="#C38E4A" />
              <path
                d="M205.311 68.1494C205.311 69.5787 204.152 70.7373 202.723 70.7373C201.294 70.7373 200.135 69.5787 200.135 68.1494C200.135 66.7201 201.294 65.5614 202.723 65.5614C204.152 65.5614 205.311 66.7201 205.311 68.1494Z"
                stroke="#C38E4A"
                strokeWidth="5.1759"
              />
              <path
                d="M246.311 68.1494C246.311 69.5787 245.152 70.7373 243.723 70.7373C242.294 70.7373 241.135 69.5787 241.135 68.1494C241.135 66.7201 242.294 65.5614 243.723 65.5614C245.152 65.5614 246.311 66.7201 246.311 68.1494Z"
                stroke="#C38E4A"
                strokeWidth="5.1759"
              />
              <path
                d="M42.1165 341.746C47.2492 342.139 52.3418 342.448 57.4471 342.672C103.148 344.306 149.816 341.251 193.575 324.994L191.74 325.077C191.966 325.152 192.195 325.226 192.426 325.302C236.588 338.909 282.478 348.215 328.716 347.027C333.848 346.821 338.959 346.428 344.018 345.784C338.927 346.084 333.818 346.148 328.706 346.044C282.786 344.437 237.687 333.821 194.029 320.38C193.802 320.307 193.578 320.233 193.356 320.16L192.422 319.854L191.521 320.243C149.386 335.93 102.988 340.59 57.4604 341.689C52.3607 341.775 47.264 341.795 42.1165 341.746Z"
                fill="#C38E4A"
              />
              <path
                d="M0 305.378C1.97861 306.159 4.03435 306.941 6.10235 307.706C24.5187 314.493 43.3884 320.053 62.6068 324.197C81.8043 328.181 101.511 331.368 121.2 329.647C123.405 329.421 125.579 329.105 127.672 328.67C125.544 328.877 123.363 328.974 121.163 328.993C101.605 328.838 82.4248 324.779 63.3297 320.823C44.2428 316.707 25.2517 312.082 6.30076 307.082C4.17275 306.515 2.05133 305.941 0 305.378Z"
                fill="#C38E4A"
              />
              <path
                d="M388.193 305.378C386.214 306.159 384.158 306.941 382.09 307.706C363.674 314.493 344.804 320.053 325.586 324.197C306.388 328.181 286.682 331.368 266.993 329.647C264.788 329.421 262.614 329.105 260.52 328.67C262.648 328.877 264.829 328.974 267.03 328.993C286.588 328.838 305.768 324.779 324.863 320.823C343.95 316.707 362.941 312.082 381.892 307.082C384.02 306.515 386.141 305.941 388.193 305.378Z"
                fill="#C38E4A"
              />
              <path
                d="M139.749 358C139.749 358 139.749 358 139.749 358C141.458 357.369 143.264 356.777 145.018 356.252C161.028 351.599 177.606 349.578 194.113 349.439C210.63 349.354 227.172 351.441 243.14 356.283C244.924 356.825 246.671 357.388 248.443 358C248.443 358 248.443 358 248.443 358C246.759 357.176 245.087 356.407 243.365 355.668C227.954 349.031 210.976 345.889 194.095 345.988C177.221 346.122 160.303 349.175 144.795 355.636C143.1 356.359 141.365 357.159 139.749 358Z"
                fill="#C38E4A"
              />
            </motion.g>
          </svg>
        </motion.div>

        {/* Loading text */}
        <motion.div
          className={styles.loadingText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {resourcesLoaded ? "Loading" : "Preparing"}
          </motion.span>
          <motion.span
            className={styles.dots}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 0.8 }}
          >
            ...
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

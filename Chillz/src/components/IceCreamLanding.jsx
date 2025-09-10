/**
 * Chillz Ice Cream Landing Page Component
 *
 * A fully interactive ice cream showcase with smooth animations,
 * responsive design, and dynamic flavor switching capabilities.
 *
 * Features:
 * - 4 ice cream flavors with individual color schemes
 * - Smooth slide-in/slide-out animations
 * - Interactive thumbnail hover effects
 * - Responsive typography and layout
 * - Custom cursive fonts for branding
 *
 * @author Chillz Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";

// Import ice cream images - Each flavor has its own unique image
import strawberryImage from "../assets/images/Strawberry-cone.png";
import blueberryImage from "../assets/images/Blueberry-cone.png";
import chocolateImage from "../assets/images/Chocolate-cone.png";
import evergreenImage from "../assets/images/Evergreen-cone.png";

/**
 * GoogleFont Component
 * Dynamically loads Google Fonts (Poppins for UI, Caveat/Kalam for cursive title)
 * Uses useEffect to inject font links into document head
 */
const GoogleFont = () => {
  useEffect(() => {
    const poppinsLink = document.createElement("link");
    poppinsLink.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap";
    poppinsLink.rel = "stylesheet";
    document.head.appendChild(poppinsLink);

    const scriptLink = document.createElement("link");
    scriptLink.href =
      "https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&family=Caveat:wght@400;500;600;700&display=swap";
    scriptLink.rel = "stylesheet";
    document.head.appendChild(scriptLink);

    return () => {
      document.head.removeChild(poppinsLink);
      document.head.removeChild(scriptLink);
    };
  }, []);
  return null;
};

/**
 * AnimationStyles Component
 * Contains all CSS animations and styles for the ice cream landing page
 * Uses CSS-in-JS with template literals for dynamic styling
 *
 * Key Animations:
 * - slideInRight: Main image entrance animation with CSS variables
 * - slideOutLeft: Main image exit animation
 * - textSlideUp: Text entrance animations
 * - pulse: Thumbnail selection feedback
 */
const AnimationStyles = () => (
  <style>{`
    /* slideInRight uses CSS vars (so we can change translateY/scale per-flavour) */
    @keyframes slideInRight {
      from { opacity: 0; transform:
        translateX(var(--from-x, 100px))
        translateY(var(--from-y, 40px))
        scale(var(--from-s, 1));
      }
      to   { opacity: 1; transform:
        translateX(var(--to-x, 0))
        translateY(var(--to-y, 0))
        scale(var(--to-s, 1));
      }
    }

    @keyframes slideOutLeft {
      from { opacity: 1; transform: translateX(0) translateY(50px) scale(1); }
      to   { opacity: 0; transform: translateX(-150px) translateY(50px) scale(0.8); }
    }

    @keyframes textSlideUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes pulse {
      0%,100% { transform: scale(1.08); }
      50% { transform: scale(1.14); }
    }

    /* helpers */
    .animate-slide-in-right { animation: slideInRight 0.6s cubic-bezier(.22,.9,.28,1) forwards; }
    .animate-slide-out-left { animation: slideOutLeft 0.4s cubic-bezier(.7,.1,.8,.3) forwards; }
    .animate-text-slide-up { animation: textSlideUp 0.56s cubic-bezier(.22,.9,.28,1) forwards; }
    .animate-text-slide-up-delay { animation: textSlideUp 0.56s cubic-bezier(.22,.9,.28,1) 0.12s forwards; }

    body, .font-poppins { font-family: 'Poppins', sans-serif; }
    
    /* Custom cursive font for main title */
    .font-cursive { 
      font-family: 'Caveat', 'Kalam', cursive; 
      font-weight: 900;
      letter-spacing: 0.02em;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
      -webkit-text-stroke: 0.5px rgba(255,255,255,0.2);
    }

    /* Main image - responsive & consistent baseline (Evergreen as baseline) */
    .ice-cream-image {
      background: transparent !important;
      mix-blend-mode: normal !important;
      filter: none !important;
      object-fit: contain;
      display: block;

      /* consistent sizing: Evergreen baseline - larger to touch bottom */
      width: clamp(220px, 45vw, 520px);
      height: auto;
      max-height: 85vh;
      will-change: transform, opacity;
      transition: filter 220ms ease;
    }

    /* small shadow to pop from background (keeps consistent with green cone look) */
    .ice-cream-image.shadow {
      filter: drop-shadow(0 16px 30px rgba(0,0,0,0.20));
    }

    /* Thumbnails (clean) */
    .thumb-btn {
      border: none;
      background: transparent;
      padding: 0;
      border-radius: 0.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.25s cubic-bezier(.2,.9,.3,1), box-shadow 0.25s ease;
      cursor: pointer;
    }
    .thumb-btn { 
      position: relative;
      overflow: visible;
    }
    .thumb-btn img { 
      width: 100%; 
      height: 100%; 
      object-fit: contain; 
      display: block;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .thumb-btn:hover { 
      box-shadow: 0 15px 30px rgba(0,0,0,0.20);
    }
    
    .thumb-btn:hover .thumbnail-image { 
      transform: translateY(-8px) scale(1.1) !important; 
    }
    
    .thumb-btn.active { 
      animation: pulse 0.44s ease-out; 
      box-shadow: 0 12px 28px rgba(0,0,0,0.18);
    }
    
    .thumb-btn.active .thumbnail-image { 
      transform: translateY(-4px) scale(1.05); 
    }
    
    .thumb-btn.active:hover { 
      box-shadow: 0 18px 35px rgba(0,0,0,0.25);
    }
    
    .thumb-btn.active:hover .thumbnail-image { 
      transform: translateY(-10px) scale(1.15) !important; 
    }

    /* Text sizing helpers (responsive) */
    .hero-title { font-weight: 900; line-height: 0.95; letter-spacing: -0.02em; }
    .hero-sub { color: rgba(255,255,255,0.95); }

    /* small screens tune */
    @media (max-width: 640px) {
      .ice-cream-image { width: clamp(180px, 58vw, 260px); }
    }
  `}</style>
);

/**
 * Per-flavor positioning corrections to ensure visual consistency
 * Each flavor cone has different dimensions, so we adjust position and scale
 * to maintain consistent bottom alignment and overall appearance
 *
 * @constant {Object} flavourCorrections - Adjustment values for each flavor
 * @property {string} toY - Vertical offset in pixels
 * @property {number} toS - Scale multiplier for size adjustment
 */
const flavourCorrections = {
  "Strawberry cone": { toY: "-2px", toS: 1.02 },
  "Blueberry cone": { toY: "-4px", toS: 1.02 },
  "Chocolate cone": { toY: "0px", toS: 1.01 },
  "Evergreen cone": { toY: "4px", toS: 1.01 },
};

/**
 * Ice cream flavor data array
 * Contains all available flavors with their associated colors and images
 *
 * @constant {Array} iceCreams - Array of ice cream flavor objects
 * @property {string} name - Flavor name identifier
 * @property {string} bgColor - Background color hex code for that flavor
 * @property {string} mainImage - Main display image import
 * @property {string} thumbnail - Thumbnail image import (same as main for consistency)
 */
const iceCreams = [
  {
    name: "Strawberry cone",
    bgColor: "#F4557F",
    mainImage: strawberryImage,
    thumbnail: strawberryImage,
  },
  {
    name: "Blueberry cone",
    bgColor: "#4B86DE",
    mainImage: blueberryImage,
    thumbnail: blueberryImage,
  },
  {
    name: "Chocolate cone",
    bgColor: "#9F5B38",
    mainImage: chocolateImage,
    thumbnail: chocolateImage,
  },
  {
    name: "Evergreen cone",
    bgColor: "#4CAF50",
    mainImage: evergreenImage,
    thumbnail: evergreenImage,
  },
];

/**
 * Header Component
 * Renders the top navigation bar with brand name, navigation links, and CTA button
 * Responsive design that hides nav links on mobile devices
 *
 * @returns {JSX.Element} Header navigation component
 */
const Header = () => (
  <header className="absolute top-0 left-0 right-0 z-10 px-4 sm:px-8 md:px-16 py-6 font-poppins">
    <div className="container mx-auto flex justify-between items-center">
      <a
        href="#"
        className="text-2xl md:text-3xl font-bold text-white tracking-wider"
      >
        Chillz
      </a>
      <nav className="hidden md:flex items-center space-x-8">
        {["Home", "Shop", "Delivery", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-white font-medium hover:opacity-80 transition-opacity"
          >
            {item}
          </a>
        ))}
      </nav>
      <button className="bg-transparent text-white font-medium px-6 py-2 rounded-full border border-white hover:bg-white hover:text-gray-800 transition-colors">
        Order Your Ice-cream
      </button>
    </div>
  </header>
);

/**
 * Main App Component - Ice Cream Landing Page
 *
 * Features:
 * - Interactive flavor selection with smooth animations
 * - Responsive design optimized for all screen sizes
 * - Dynamic background colors based on selected flavor
 * - Slide-in/slide-out transitions for main ice cream image
 * - Thumbnail hover effects with active state management
 *
 * @returns {JSX.Element} Complete ice cream landing page
 */
export default function App() {
  // State management for flavor selection and animations
  const [activeIndex, setActiveIndex] = useState(0); // Currently selected flavor index
  const [isTransitioning, setIsTransitioning] = useState(false); // Prevents multiple transitions
  const [displayIndex, setDisplayIndex] = useState(0); // Currently displayed flavor (may lag during transitions)
  const activeFlavor = iceCreams[activeIndex];

  /**
   * Handles flavor selection with coordinated animations
   * Prevents multiple simultaneous transitions and ensures smooth visual flow
   *
   * @param {number} newIndex - Index of the newly selected flavor
   */
  const handleFlavorChange = (newIndex) => {
    // Prevent duplicate selections and overlapping animations
    if (newIndex === activeIndex || isTransitioning) return;

    setIsTransitioning(true);

    // Coordinate the slide-out → slide-in animation sequence
    // Timer matches CSS animation duration for seamless transition
    setTimeout(() => {
      setActiveIndex(newIndex);
      setDisplayIndex(newIndex);
      setIsTransitioning(false);
    }, 400); // Match slideOutLeft duration in CSS
  };

  // Apply flavor-specific positioning corrections for visual consistency
  const corr = flavourCorrections[activeFlavor.name] || { toY: "0px", toS: 1 };

  /**
   * Dynamic CSS custom properties for animation system
   * These variables are used by CSS keyframes to create smooth slide-in effects
   * Values are calculated per-flavor to maintain consistent visual alignment
   */
  const imageCssVars = {
    // Animation start positions (slide-in from right)
    ["--from-x"]: "100px",
    ["--from-y"]: "40px",
    ["--from-s"]: "1",
    // Animation end positions (final resting place) with flavor-specific adjustments
    ["--to-x"]: "0px",
    ["--to-y"]: corr.toY, // Flavor-specific vertical offset
    ["--to-s"]: String(corr.toS), // Flavor-specific scale adjustment
  };

  return (
    <>
      <GoogleFont />
      <AnimationStyles />
      <div
        className="min-h-screen relative flex items-center justify-center overflow-hidden transition-colors duration-700 ease-in-out font-poppins"
        style={{ backgroundColor: activeFlavor.bgColor }}
      >
        <Header />

        {/* optimized for no-scroll layout */}
        <main className="container mx-auto px-4 sm:px-8 pt-8 pb-6 w-full h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-6 items-center h-full">
            {/* Text + Thumbnails */}
            <div className="text-white text-center md:text-left -mt-6">
              <h1 className="font-cursive text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-2 lowercase">
                icecream
              </h1>

              <h2
                key={`name-${activeIndex}`}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-text-slide-up"
              >
                {activeFlavor.name}
              </h2>

              <div className="max-w-2xl mx-auto md:mx-0">
                <p className="mb-3 text-sm sm:text-base md:text-lg font-light leading-relaxed hero-sub">
                  Embark on a culinary journey of delight as you immerse
                  yourself in our artisan-crafted ice cream collection—each
                  flavor a story, each scoop an unforgettable chapter in your
                  sweet odyssey!
                </p>
                <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed hero-sub">
                  Indulge in a world of imagination, where every scoop unveils a
                  new taste adventure! Choose your favorite.
                </p>
              </div>

              {/* Flavor selection thumbnails with interactive hover effects */}
              <div className="flex justify-center md:justify-start space-x-10 mt-16">
                {iceCreams.map((flavor, index) => (
                  <button
                    key={index}
                    onClick={() => handleFlavorChange(index)}
                    aria-pressed={activeIndex === index}
                    className={`thumb-btn w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${
                      activeIndex === index ? "active" : ""
                    }`}
                    title={flavor.name}
                    disabled={isTransitioning} // Prevent clicks during animation
                  >
                    <img
                      src={flavor.thumbnail}
                      alt={`${flavor.name} thumbnail`}
                      className="thumbnail-image w-full h-full"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Main ice cream image with coordinated slide animations */}
            <div className="relative flex items-end justify-end pr-2 md:pr-4 pdb-6 md:pt-20">
              <img
                key={`image-${displayIndex}`} // Forces re-render for animation restart
                src={activeFlavor.mainImage}
                alt={activeFlavor.name}
                className={`ice-cream-image ${
                  isTransitioning
                    ? "animate-slide-out-left" // Exit animation
                    : "animate-slide-in-right" // Enter animation
                }`}
                style={{
                  ...imageCssVars, // Apply dynamic CSS custom properties
                  transform: "translateY(50px) translateX(20px)", // Base positioning
                }}
                draggable={false}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

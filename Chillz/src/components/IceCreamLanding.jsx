import React, { useState, useEffect } from "react";

// Component to inject the Google Font stylesheet into the document head.
const GoogleFont = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  return null;
};

// Animation styles for the transitions.
const AnimationStyles = () => (
  <style>{`
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(100px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes textSlideUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-in-right { animation: slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
    .animate-text-slide-up { animation: textSlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
    body { font-family: 'Poppins', sans-serif; }
    .font-poppins { font-family: 'Poppins', sans-serif; }
  `}</style>
);

// Data for the ice cream flavors with high-quality, reliable image links.
const iceCreams = [
  {
    name: "Strawberry cone",
    bgColor: "#F4557F",
    mainImage: "https://i.ibb.co/68K1g3w/pink-main.png",
    thumbnail: "https://i.ibb.co/SvH25zB/pink-thumb.png",
  },
  {
    name: "Blueberry cone",
    bgColor: "#4B86DE",
    mainImage: "https://i.ibb.co/yqQx1Nf/blue-main.png",
    thumbnail: "https://i.ibb.co/RzcF2rC/blue-thumb.png",
  },
  {
    name: "Chocolate cone",
    bgColor: "#9F5B38",
    mainImage: "https://i.ibb.co/pnvv1c8/chocolate-main.png",
    thumbnail: "https://i.ibb.co/L95mK4D/chocolate-thumb.png",
  },
  {
    name: "Evergreen cone",
    bgColor: "#4CAF50",
    mainImage: "https://i.ibb.co/vB04Tz4/green-main.png",
    thumbnail: "https://i.ibb.co/Y0j5YCM/green-thumb.png",
  },
];

// Header component for the top navigation.
const Header = () => (
  <header className="absolute top-0 left-0 right-0 z-10 px-4 sm:px-8 md:px-16 py-6 font-poppins">
    <div className="container mx-auto flex justify-between items-center">
      <a href="#" className="text-2xl font-bold text-white tracking-wider">
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

// Main Application component that holds the state and logic.
export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFlavor = iceCreams[activeIndex];

  return (
    <>
      <GoogleFont />
      <AnimationStyles />
      <div
        className="min-h-screen relative flex items-center justify-center overflow-hidden transition-colors duration-1000 ease-in-out font-poppins"
        style={{ backgroundColor: activeFlavor.bgColor }}
      >
        <Header />

        <main className="container mx-auto px-4 sm:px-8 pt-32 pb-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-8 items-center">
            {/* Left Side: Text Content & Thumbnails */}
            <div className="text-white text-center md:text-left">
              <h1
                className="text-6xl md:text-8xl font-black tracking-tighter mb-2"
                style={{ fontStyle: "italic" }}
              >
                icecream
              </h1>
              <h2
                key={`name-${activeIndex}`}
                className="text-3xl md:text-4xl font-bold mb-6 animate-text-slide-up"
              >
                {activeFlavor.name}
              </h2>
              <div
                key={`desc-${activeIndex}`}
                className="max-w-md mx-auto md:mx-0 animate-text-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <p className="mb-4 text-sm font-light leading-relaxed">
                  Embark on a culinary journey of delight as you immerse
                  yourself in our artisan-crafted ice cream collection—each
                  flavor a story, each scoop an unforgettable chapter in your
                  sweet odyssey!
                </p>
                <p className="text-sm font-light leading-relaxed">
                  Indulge in a world of imagination, where every scoop unveils a
                  new taste adventure! Choose your favorite.
                </p>
              </div>

              {/* Flavor Selector Thumbnails */}
              <div className="flex justify-center md:justify-start space-x-4 mt-8">
                {iceCreams.map((flavor, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl p-1 transition-all duration-300 transform hover:scale-110 focus:outline-none ${
                      activeIndex === index
                        ? "ring-4 ring-white ring-offset-2"
                        : "ring-2 ring-white/50"
                    }`}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      ringOffsetColor: activeFlavor.bgColor,
                    }}
                  >
                    <img
                      src={flavor.thumbnail}
                      alt={`${flavor.name} thumbnail`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side: Main Image */}
            <div className="relative flex items-center justify-center">
              <img
                key={`image-${activeIndex}`}
                src={activeFlavor.mainImage}
                alt={activeFlavor.name}
                className="w-full max-w-[300px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl object-contain drop-shadow-2xl animate-slide-in-right"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

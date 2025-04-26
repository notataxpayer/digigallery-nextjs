import Image from 'next/image';
import React from 'react';

const Section1 = () => {
  return (
    <div className="relative min-h-screen mx-auto flex items-center justify-center bg-gradient-to-b from-black to-purple-800 overflow-hidden">
    <div className="absolute inset-0">
      <Image
        src="https://res.cloudinary.com/dnyrrcacd/image/upload/v1745681711/porto%20commerce%20web-v1/Porto%20web/bg_i7aidp.jpg"
        alt="Background Image"
        fill
        className="object-cover opacity-10"
        priority
      />
    </div>
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat bg-[length:40px_40px]"></div>
      </div>
      <div className="container mx-auto px-8 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text content - Using CSS animations instead of Framer Motion */}
          <div className="lg:px-12 mt-20 lg:mt-12 text-center lg:text-left animate-fadeInLeft">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Discover <span className="text-indigo-400">Beautiful Art</span> in Our Digital Gallery
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Explore a curated collection of stunning artworks from talented artists worldwide. 
              From classic paintings to contemporary digital masterpieces.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover-glow"
              >
                Browse Collection
              </button>
              
              {/* <button
                className="hover-glow px-6 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Meet The Artists
              </button> */}
            </div>
          </div>

          {/* Image placeholder - Using CSS animations */}
          <div className="lg:w-1/2 relative aspect-square w-full max-w-lg animate-fadeInRight mt-12 mb-12 sm:mb-0">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-300 to-indigo-900 opacity-40"></div>
              <Image
                src="https://res.cloudinary.com/dnyrrcacd/image/upload/v1745674661/porto%20commerce%20web-v1/Porto%20web/cy1_l6vyyp.jpg"
                alt="Featured Artwork"
                fill
                className="object-cover mix-blend-overlay"
                priority
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/50 backdrop-blur-sm rounded-lg">
                <h3 className="text-white font-medium">&quot;The Cyber City&quot; by Those Who Wonder</h3>
                <p className="text-gray-300 text-sm">Digital Artwork, 2025</p>
              </div>
              
            </div>
          </div>
          
        </div>
        
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-indigo-500/20 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-purple-500/20 blur-xl"></div>
      
    </div>

  );
};

export default Section1;
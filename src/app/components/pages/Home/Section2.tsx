'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Section2 = () => {
  // Data contoh digital artwork
  const artworks = [
    {
      id: 1,
      title: "Cyberpunk Dreams",
      artist: "Jane Doe",
      year: 2023,
      url: "https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675459/porto%20commerce%20web-v1/Porto%20web/cy2_xccl6v.jpg"
    },
    {
      id: 2,
      title: "Neon Landscape",
      artist: "John Smith",
      year: 2022,
      url: "https://res.cloudinary.com/dnyrrcacd/image/upload/v1745675461/porto%20commerce%20web-v1/Porto%20web/cy3_rmugix.jpg"
    },
    {
      id: 3,
      title: "Digital Utopia",
      artist: "Alex Johnson",
      year: 2024,
      url: "https://res.cloudinary.com/dnyrrcacd/image/upload/v1745681886/porto%20commerce%20web-v1/Porto%20web/cy6_pfala8.jpg"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // 2 detik
    
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="font-bold relative min-h-screen mx-auto flex items-center justify-center py-12 px-12 bg-gradient-to-b from-purple-800 to-bkack overflow-hidden"> 
    <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dnyrrcacd/image/upload/v1745681711/porto%20commerce%20web-v1/Porto%20web/bg_i7aidp.jpg"
            alt="Background Image"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          {/* Kolom Kiri - Penjelasan */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-400 mb-6">
              Explore <span className="text-purple-200">Our Digital Artwork</span>
            </h2>
            
            <p className="text-lg text-white mb-6">
              Digital art represents a revolutionary fusion of technology and creativity. 
              Our collection showcases how artists use digital tools to push boundaries 
              of traditional art forms.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start py-2">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-400">Unlimited Possibilities</h3>
                  <p className="text-purple-200">Digital tools allow for experimentation beyond physical media constraints</p>
                </div>
              </div>
              
              <div className="flex items-start py-2">
                <div className="bg-indigo-100 p-2 rounded-full mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-400">Modern Techniques</h3>
                  <p className="text-purple-200">Incorporating 3D modeling, digital painting, and AI-assisted creation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan - Slider Artwork */}
          <div className="lg:w-1/2 w-screen px-12 sm:px-0 relative">
            <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-xl continous-pulse">
              <Image
                src={artworks[currentSlide].url}
                alt={artworks[currentSlide].title}
                fill
                className="object-cover transition-opacity duration-1000 ease-in-out"
                priority
              />
              
              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 ">
                <h3 className="text-xl font-bold text-white">{artworks[currentSlide].title}</h3>
                <p className="text-gray-300">{artworks[currentSlide].artist} • {artworks[currentSlide].year}</p>
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-center mt-6 space-x-4">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous artwork"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center space-x-2">
                {artworks.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next artwork"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-indigo-500/20 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-purple-500/20 blur-xl"></div>
      </div>
      
    </div>
  );
};

export default Section2;
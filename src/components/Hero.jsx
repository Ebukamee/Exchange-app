// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-blue-900/90 z-0"
        style={{
          backgroundImage: "url('https://barskydds.com/wp-content/uploads/2017/05/smile-dentistry-patient-smiling-barsky-dds-miami.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400 rounded-full mix-blend-soft-light filter blur-3xl"></div>
      </div>
      
      {/* Dental icon patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-10 w-16 h-16">
          <ToothIcon />
        </div>
        <div className="absolute top-20 right-20 w-12 h-12">
          <ToothIcon />
        </div>
        <div className="absolute bottom-40 left-40 w-10 h-10">
          <ToothIcon />
        </div>
        <div className="absolute bottom-20 right-40 w-14 h-14">
          <ToothIcon />
        </div>
      </div>
      
      {/* Hero content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block bg-blue-800 bg-opacity-50 rounded-full px-4 py-2 mb-6">
              <p className="text-sm font-semibold text-blue-100 tracking-wide">
                PRECISION DENTAL LABORATORY
              </p>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              <span className="block">Welcome to Princeton Dental</span>
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-100">
                Laboratory Service.
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-blue-100 max-w-2xl">
              Transform your smile with Princeton Dental clinic where advanced technology meets expert care. Our dedicated team delivers precise, personalized treatment in a comfortable environment, ensuring you live with confidence. Whether you need a routine check up or a complete smile makeover we are here to provide exceptional Dental care tailored to your needs. Book your appointment today and experience the difference.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <a 
                href="/services" 
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <span>Explore Our Services</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://wa.me/08159029243" 
                className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm border border-blue-300 border-opacity-30 text-white font-bold rounded-full hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Schedule Consultation</span>
              </a>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-700 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-2 text-blue-100">CAC Registered Laboratory</p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-700 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-2 text-blue-100">State-of-the-Art Technology</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white border-opacity-10">
              {/* Mockup of CAD/CAM interface */}
              <div className="bg-gray-900 p-6 h-96 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-blue-300 font-mono">CAD/CAM v4.2</div>
                </div>
                
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-4 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-blue-700 rounded-full w-16 h-16"></div>
                      </div>
                      <div className="relative z-10">
                        <div className="w-32 h-32 border-2 border-dashed border-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-24 h-24 border border-blue-400 rounded-full flex items-center justify-center">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg p-4">
                    <div className="text-xs text-blue-300 mb-2">3D MODEL PREVIEW</div>
                    <div className="bg-blue-950 rounded h-48 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-blue-500"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-blue-500"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500"></div>
                        
                        <div className="relative">
                          <div className="flex justify-center">
                            <div className="w-12 h-4 bg-pink-500 rounded-t-full"></div>
                          </div>
                          <div className="flex justify-center -mt-1">
                            <div className="w-16 h-8 bg-pink-400 rounded-t-full"></div>
                          </div>
                          <div className="flex justify-center -mt-1">
                            <div className="w-20 h-12 bg-pink-300 rounded-t-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <div className="text-xs text-blue-400">Princeton Dental Lab - Precision Design</div>
                  <div className="text-xs text-blue-400">Accuracy: 99.8%</div>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                SIMULATION
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 w-32 transform rotate-3">
              <div className="text-blue-900 font-bold text-sm">Digital Dentistry</div>
              <div className="mt-1 text-xs text-blue-700">CAD/CAM & 3D Printing</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4 w-32 transform -rotate-3">
              <div className="text-blue-900 font-bold text-sm">Quality Guarantee</div>
              <div className="mt-1 text-xs text-blue-700">Precision Craftsmanship</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Curved bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="fill-current text-white">
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

// Tooth icon component for decorative elements
const ToothIcon = () => (
  <svg viewBox="0 0 100 100" className="text-blue-400 fill-current">
    <path d="M50 15 C60 10, 85 15, 85 35 C85 50, 75 55, 70 65 C65 75, 60 85, 50 85 C40 85, 35 75, 30 65 C25 55, 15 50, 15 35 C15 15, 40 10, 50 15 Z" />
    <path d="M40 35 C45 35, 55 35, 60 35 C60 45, 55 50, 50 50 C45 50, 40 45, 40 35 Z" fill="#ffffff" opacity="0.7" />
  </svg>
);

export default Hero;

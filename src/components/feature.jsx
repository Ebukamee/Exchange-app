// src/components/ServicesOverview.jsx
import React from 'react';

const FeaturedSection = () => {
  // Service data with icons and descriptions
  const services = [
    {
      name: "Fixed Prosthodontics",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "Crowns, bridges, inlays, onlays, and veneers crafted with precision for lasting results.",
      items: ["PFM Crowns", "Zirconia", "E.max", "Veneers"],
      imagePlaceholder: "bg-gradient-to-br from-blue-100 to-blue-200"
    },
    {
      name: "Removable Prosthodontics",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: "Custom dentures and night guards designed for comfort and optimal function.",
      items: ["Full Dentures", "Partial Dentures", "Flexible Partials", "Night Guards"],
      imagePlaceholder: "bg-gradient-to-br from-pink-100 to-pink-200"
    },
    {
      name: "Orthodontic Appliances",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      description: "Precision appliances for alignment and maintenance of dental positioning.",
      items: ["Retainers", "Space Maintainers", "Aligners"],
      imagePlaceholder: "bg-gradient-to-br from-blue-50 to-blue-100"
    },
    {
      name: "Implant Prosthetics",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      ),
      description: "Custom implant solutions for natural-looking and functional replacements.",
      items: ["Custom Abutments", "Implant Crowns", "Implant Bridges"],
      imagePlaceholder: "bg-gradient-to-br from-pink-50 to-pink-100"
    },
    {
      name: "Digital Dentistry",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      description: "Advanced CAD/CAM and 3D printing for precision dental solutions.",
      items: ["CAD/CAM Design", "3D Printing", "Intraoral Scanning"],
      imagePlaceholder: "bg-gradient-to-br from-blue-100 to-blue-200"
    },
    {
      name: "Consultation & Support",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      description: "Expert guidance for complex cases and material selection.",
      items: ["Technical Advice", "Case Planning", "Material Guidance"],
      imagePlaceholder: "bg-gradient-to-br from-pink-100 to-pink-200"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
            Precision Dental Laboratory Services
          </h2>
          <div className="mt-6 text-xl text-gray-600">
            <p className="mb-4">
              Princeton Dental and Lab Limited is a premier dental laboratory provider in Nigeria, 
              committed to delivering exceptional quality through innovative technology and 
              meticulous craftsmanship.
            </p>
            <p>
              Registered with the Corporate Affairs Commission of Nigeria, we bridge the gap between 
              advanced dental technology and accessible, high-quality services for dental professionals 
              and patients nationwide.
            </p>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
              <div className="bg-blue-600 rounded-full p-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-blue-800">CAC Registered: #8404827</span>
            </div>
            
            <div className="flex items-center bg-pink-50 rounded-full px-4 py-2">
              <div className="bg-pink-500 rounded-full p-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-pink-800">Cutting-Edge Technology</span>
            </div>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Placeholder - Replace with actual images */}
              <div className={`h-48 ${service.imagePlaceholder} flex items-center justify-center relative`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-32 h-32 rounded-full bg-white"></div>
                </div>
                <div className="relative z-10 text-center p-4">
                  <div className="inline-flex items-center justify-center bg-white rounded-full p-3 shadow-lg">
                    {service.icon}
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-blue-900">{service.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.items.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Technology Showcase */}
        <div className="mt-20 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-white">Advanced Technology Integration</h3>
              <p className="mt-4 text-blue-100">
                At Princeton Dental, we invest in state-of-the-art technology to ensure 
                precision, efficiency, and superior outcomes. Our laboratory is equipped 
                with the latest digital dentistry solutions.
              </p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="bg-blue-700 rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-white font-medium">CAD/CAM Systems</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-700 rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-white font-medium">3D Printing</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-700 rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-white font-medium">Digital Scanners</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-700 rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-white font-medium">Quality Control</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-80 bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-64 h-64 rounded-full bg-white"></div>
              </div>
              
              <div className="relative z-10 p-8">
                <div className="bg-blue-950 rounded-lg p-6 shadow-xl border border-blue-700">
                  <div className="flex justify-between mb-4">
                    <div className="text-blue-300 font-mono">CAD/CAM DESIGN</div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-blue-500"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-blue-500"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-blue-500"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-blue-500"></div>
                      
                      <div className="w-48 h-48 border-2 border-dashed border-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-36 h-36 border border-blue-400 rounded-full flex items-center justify-center">
                          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-12 h-12 bg-blue-300 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center text-blue-300 text-sm">
                    Princeton Dental Lab - Precision Design
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

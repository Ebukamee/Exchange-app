// src/components/ServicesOverview.jsx
import React from 'react';

const FeaturedSection = () => {
  const services = [
    {
      name: "Fixed Prosthodontics",
      description: "Permanent dental restorations like crowns and bridges that restore function and aesthetics. Crafted for durability and natural appearance.",
      items: ["Crowns (PFM, Zirconia, E.max)", "Bridges", "Inlays and Onlays", "Veneers"],
      image: "https://www.dentalsmiles4kids.com/wp-content/uploads/2023/10/co02.jpg"
    },
    {
      name: "Removable Prosthodontics",
      description: "Custom dentures and night guards designed for comfort. Replace missing teeth and protect against grinding during sleep.",
      items: ["Full and Partial Dentures", "Flexible Partials", "Night Guards", "Occlusal Splints"],
      image: "https://lemaclinic.com/wp-content/uploads/2025/07/what-are-the-main-treatment-methods-in-pedodontics-768x512.webp"
    },
    {
      name: "Orthodontic Appliances",
      description: "Devices like retainers that correct teeth alignment. Maintain proper spacing and positioning for improved dental health.",
      items: ["Retainers", "Space Maintainers", "Orthodontic Devices", "Alignment Solutions"],
      image: "https://www.brightortho.com/assets/images/appliances/term-archwire.jpg"
    },
    {
      name: "Implant Prosthetics",
      description: "Artificial teeth attached to dental implants. Provides stable, natural-looking replacements for missing teeth.",
      items: ["Custom Abutments", "Implant Crowns", "Implant Bridges", "Full Arch Solutions"],
      image: "https://locustfamilydentistry.com/wp-content/uploads/2019/07/Implant-Supported-Prosthesis-Locust-NC-768x512.png"
    },
    {
      name: "Digital Dentistry",
      description: "Advanced CAD/CAM technology and 3D printing for precise dental solutions. Streamlines design and production processes.",
      items: ["CAD/CAM Design", "3D Printing", "Intraoral Scanning", "Digital Workflow"],
      image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      name: "Consultation & Support",
      description: "Expert guidance for complex cases and material selection. Technical support throughout your dental restoration journey.",
      items: ["Technical Advice", "Case Planning", "Material Guidance", "Professional Support"],
      image: "https://www.medicaim.com/uploads/b2e087f0-5a46-11e8-8fc5-bf61b50ce761/consultationdentaire.jpg"
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
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-blue-50"
            >
              {/* Service Image */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{service.name}</h3>
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
                
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-300 group">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
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
              <div className="inline-block bg-white/10 rounded-full px-4 py-2 mb-4">
                <p className="text-sm font-semibold text-blue-100 tracking-wide">
                  TECHNOLOGY SHOWCASE
                </p>
              </div>
              <h3 className="text-2xl font-bold text-white">Advanced Technology Integration</h3>
              <p className="mt-4 text-blue-100">
                At Princeton Dental, we invest in state-of-the-art technology to ensure 
                precision, efficiency, and superior outcomes. Our laboratory is equipped 
                with the latest digital dentistry solutions.
              </p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center bg-white/5 p-3 rounded-lg">
                  <div className="bg-blue-700 rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-white font-medium">CAD/CAM Systems</span>
                </div>
                
                <div className="flex items-center bg-white/5 p-3 rounded-lg">
                  <div className="bg-blue-700 rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-white font-medium">3D Printing</span>
                </div>
                
                <div className="flex items-center bg-white/5 p-3 rounded-lg">
                  <div className="bg-blue-700 rounded-lg p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-white font-medium">Digital Scanners</span>
                </div>
                
                <div className="flex items-center bg-white/5 p-3 rounded-lg">
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
        
        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white">Ready to Transform Your Dental Practice?</h3>
          <p className="mt-4 max-w-2xl mx-auto text-pink-100">
            Partner with Princeton Dental for exceptional laboratory services and technical support.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-colors">
              Request a Quote
            </button>
            <button className="px-6 py-3 bg-blue-900 text-white font-bold rounded-full shadow-lg hover:bg-blue-800 transition-colors">
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;

// src/components/TechnologyPage.jsx
import React from 'react';
import Nav from '../components/nav'
import Footer from '../components/Footer'

const TechnologyPage = () => {
  const technologies = [
    {
      title: "CAD/CAM Systems",
      description: "Our advanced CAD/CAM technology enables precise digital design and milling of dental restorations with micron-level accuracy.",
      features: ["Digital Design", "Precision Milling", "Material Versatility", "Efficient Workflow"],
      image: "https://c7.alamy.com/comp/KJ7KCX/cad-cam-dental-computer-aided-machine-in-a-highly-modern-dental-laboratory-KJ7KCX.jpg"
    },
    {
      title: "Fixed Prosthodontics",
      description: "Innovative solutions for crowns, bridges, and veneers using the latest materials and techniques for long-lasting results.",
      features: ["Zirconia Crowns", "E.max Veneers", "PFM Bridges", "Custom Abutments"],
      image: "https://www.mathemedics.com/wp-content/uploads/2020/02/3-Innovations-On-Fixed-Prosthodontics-1210x642.jpg"
    },
    {
      title: "Digital Prosthodontics",
      description: "Advanced techniques for creating precise, comfortable, and natural-looking removable dental prosthetics.",
      features: ["Digital Dentures", "Flexible Partials", "Night Guards", "Occlusal Splints"],
      image: "https://www.nucohs.com.sg/images/nucohslibraries/content/our-services/our-specialties/prosthodontics-dentistry.jpg?sfvrsn=3298ba0b_1"
    },
    {
      title: "3D Printing Solutions",
      description: "State-of-the-art additive manufacturing for creating precise dental models, surgical guides, and appliances.",
      features: ["Rapid Prototyping", "High Accuracy", "Multiple Materials", "Cost Efficiency"],
      image: "https://cdn.builtin.com/cdn-cgi/image/f=auto,fit=cover,w=1200,h=635,q=80/sites/www.builtin.com/files/2024-05/3D%20Printing%20Types.jpg"
    }
  ];

  const workflowSteps = [
    {
      title: "Digital Impression",
      description: "Intraoral scanning captures precise digital impressions",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "CAD Design",
      description: "Digital restoration design using specialized software",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "CAM Production",
      description: "Precision milling or 3D printing of restorations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Quality Control",
      description: "Rigorous inspection for fit, function, and aesthetics",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Delivery",
      description: "Careful packaging and prompt delivery to your practice",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];

  return (
    <>
      <Nav />
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Advanced Dental Technology
              </h1>
              <p className="mt-6 text-xl text-blue-100 max-w-3xl">
                At Princeton Dental, we invest in state-of-the-art technology to ensure precision, efficiency, 
                and superior outcomes for dental professionals and patients.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">CAC Registered Laboratory</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Cutting-Edge Equipment</span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img 
                src="https://c7.alamy.com/comp/KJ7KCX/cad-cam-dental-computer-aided-machine-in-a-highly-modern-dental-laboratory-KJ7KCX.jpg" 
                alt="CAD/CAM Dental Technology"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Technology Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
              Our Technology Portfolio
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Precision equipment and digital solutions for superior dental restorations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-64 relative">
                  <img 
                    src={tech.image} 
                    alt={tech.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex items-end p-6">
                    <h3 className="text-2xl font-bold text-white">{tech.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{tech.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {tech.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="flex-shrink-0 h-5 w-5 text-blue-600">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-2 text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 bg-blue-50 text-blue-900 font-medium rounded-lg hover:bg-blue-100 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Workflow */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Digital Dentistry Workflow
            </h2>
            <p className="mt-4 text-xl text-blue-100">
              Our seamless digital process ensures precision and efficiency from scan to delivery
            </p>
          </div>

          <div className="relative">
            {/* Workflow Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-700 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {workflowSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-white rounded-full p-4 shadow-lg mb-4">
                    {step.icon}
                  </div>
                  <div className="bg-blue-700 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold">{step.title}</h3>
                    <p className="mt-2 text-blue-100">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Benefits */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Precision & Accuracy
              </h3>
              <p className="mt-3 text-blue-100">
                Digital workflows eliminate traditional impression errors, ensuring perfect-fitting restorations every time.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Faster Turnaround
              </h3>
              <p className="mt-3 text-blue-100">
                Reduce wait times with our efficient digital processes, often delivering restorations in 48 hours.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Patient Comfort
              </h3>
              <p className="mt-3 text-blue-100">
                Intraoral scanning replaces uncomfortable impression materials, enhancing the patient experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
              Our Laboratory Equipment
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              State-of-the-art tools for precision dental restorations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
              <h3 className="mt-4 text-xl font-bold text-blue-900">CAD/CAM Systems</h3>
              <p className="mt-2 text-gray-600">Precision design and milling equipment</p>
            </div>
            <div className="bg-pink-50 rounded-2xl p-6 text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
              <h3 className="mt-4 text-xl font-bold text-pink-800">3D Printers</h3>
              <p className="mt-2 text-gray-600">High-resolution additive manufacturing</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
              <h3 className="mt-4 text-xl font-bold text-blue-900">Digital Scanners</h3>
              <p className="mt-2 text-gray-600">Intraoral and model scanning technology</p>
            </div>
            <div className="bg-pink-50 rounded-2xl p-6 text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
              <h3 className="mt-4 text-xl font-bold text-pink-800">Furnaces</h3>
              <p className="mt-2 text-gray-600">Modern sintering and firing equipment</p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white">Experience the Princeton Difference</h3>
            <p className="mt-4 max-w-2xl mx-auto text-blue-100">
              Our technology investment translates to better outcomes for your patients and practice
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-colors">
                Schedule a Lab Tour
              </button>
              <button className="px-6 py-3 bg-pink-600 text-white font-bold rounded-full shadow-lg hover:bg-pink-700 transition-colors">
                Request Technical Specs
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
      <Footer />
    </>
  );
};

export default TechnologyPage;

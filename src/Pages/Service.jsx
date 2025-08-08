// src/pages/ServicesPage.jsx
import React from 'react';
import Nav from '../components/nav';
import Footer from '../components/Footer';

const ServicePage = () => {
  const serviceCategories = [
    {
      name: "Fixed Prosthodontics",
      description: "Permanent dental restorations that restore function and aesthetics. Our crowns, bridges, inlays, onlays, and veneers are crafted for durability and natural appearance using advanced materials and techniques.",
      services: [
        { 
          name: "Crowns", 
          description: "Custom-made caps that cover damaged teeth, restoring shape, size, and strength. Available in PFM, Zirconia, and E.max materials.",
          // No image specified for Crowns
        },
        { 
          name: "Bridges", 
          description: "Replace missing teeth by anchoring artificial teeth to adjacent natural teeth. Restores chewing function and prevents teeth shifting.",
          image: "https://www.news-medical.net/image-handler/ts/20170817021012/ri/673/picture/2017/8/shutterstock_111748553.jpg"
        },
        { 
          name: "Veneers", 
          description: "Thin, custom-made shells that cover the front surface of teeth to improve appearance. Correct discoloration, chips, or gaps.",
          image: "https://laureloaksdental.com/wp-content/uploads/2024/12/AdobeStock_529242198-scaled.jpeg"
        },
        { 
          name: "Inlays & Onlays", 
          description: "Conservative restorations for moderately damaged teeth. Inlays fit within tooth cusps, while onlays extend over cusps.",
          image: "https://dazzledental.com.ng/wp-content/uploads/2023/09/e66e0a1f4142456996b8f2f338d3354f-768x532.png"
        }
      ]
    },
    {
      name: "Removable Prosthodontics",
      description: "Custom dentures and protective appliances designed for comfort and optimal function. We create solutions that restore your smile and protect your teeth during sleep.",
      services: [
        { 
          name: "Full Dentures", 
          description: "Replace all teeth in an arch. Our acrylic dentures provide natural appearance and comfortable fit.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvkVRpMWszs7nr9OpDTmhaA9m5_Zqm-zueC1DaUpdnhoayYViWwZ4d7eid&s=10"
        },
        { 
          name: "Partial Dentures", 
          description: "Replace multiple missing teeth using acrylic or cobalt-chrome frameworks. Flexible options available for enhanced comfort.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhf-wgwLxZtDz_5HpnrS752y2XV5_mxooILV7P8oyhNOK1_R0o3PoHjdg&s=10"
        },
        { 
          name: "Night Guards", 
          description: "Custom-fitted appliances that protect teeth from grinding during sleep. Prevent tooth damage and TMJ disorders.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbrHMyEhSlLpCYsjZU_N5YNfB5JL0Ibm7GFQ&s"
        },
        { 
          name: "Occlusal Splints", 
          description: "Treat TMJ disorders and bruxism by repositioning the jaw and reducing muscle strain during sleep.",
          // No image specified for Occlusal Splints
        }
      ]
    },
    {
      name: "Orthodontic Appliances",
      description: "Precision devices for alignment and maintenance of dental positioning. Our retainers and space maintainers ensure optimal orthodontic results.",
      services: [
        { 
          name: "Retainers", 
          description: "Maintain teeth position after orthodontic treatment. Available in fixed and removable options for long-term stability.",
          // No image specified for Retainers
        },
        { 
          name: "Space Maintainers", 
          description: "Preserve space for permanent teeth in children after premature loss of baby teeth. Prevent crowding and misalignment.",
          // No image specified for Space Maintainers
        },
        { 
          name: "Palatal Expanders", 
          description: "Widen the upper jaw to correct crossbites and create space for crowded teeth. Essential for early orthodontic intervention.",
          // No image specified for Palatal Expanders
        }
      ]
    },
    {
      name: "Implant Prosthetics",
      description: "Custom solutions for dental implants that provide stable, natural-looking replacements for missing teeth. We create abutments, crowns, and bridges specifically designed for implant integration.",
      services: [
        { 
          name: "Custom Abutments", 
          description: "Tailored connectors between implants and prosthetics. Optimize emergence profile and gingival health for natural aesthetics.",
          // No image specified for Custom Abutments
        },
        { 
          name: "Implant Crowns", 
          description: "Single-tooth replacements that attach directly to implants. Restore function and aesthetics with natural-looking results.",
          // No image specified for Implant Crowns
        },
        { 
          name: "Implant Bridges", 
          description: "Multi-tooth restorations supported by dental implants. Ideal for replacing several adjacent missing teeth.",
          // No image specified for Implant Bridges
        },
        { 
          name: "Full Arch Solutions", 
          description: "Complete restorations for patients missing all teeth in an arch. Fixed or removable options available.",
          image: "https://www.theperfectsmile.co.uk/wp-content/uploads/2024/02/all-on-4-image-768x768.jpg"
        }
      ]
    },
    {
      name: "Digital Dentistry",
      description: "Advanced CAD/CAM and 3D printing technology for precise dental solutions. Our digital workflow ensures accuracy and efficiency in every restoration.",
      services: [
        { 
          name: "CAD/CAM Design", 
          description: "Computer-aided design and manufacturing of dental restorations. Precise digital impressions for perfect-fitting prosthetics.",
          // No image specified for CAD/CAM Design
        },
        { 
          name: "3D Printing", 
          description: "Additive manufacturing of models, surgical guides, and temporary restorations. Faster turnaround with exceptional accuracy.",
          // No image specified for 3D Printing
        },
        { 
          name: "Intraoral Scanning", 
          description: "Digital impression technology that replaces traditional molds. Comfortable, precise, and efficient scanning process.",
          // No image specified for Intraoral Scanning
        },
        { 
          name: "Digital Smile Design", 
          description: "Comprehensive digital planning of cosmetic dental treatments. Preview your new smile before treatment begins.",
          // No image specified for Digital Smile Design
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Nav />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
                Comprehensive Dental Laboratory Services
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100">
                Precision-crafted solutions for dental professionals across Nigeria
              </p>
            </div>
          </div>
        </div>

        {/* Services Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
            {serviceCategories.map((category, index) => (
              <a 
                key={index}
                href={`#${category.name.replace(/\s+/g, '-').toLowerCase()}`}
                className="flex-shrink-0 px-6 py-3 bg-white text-blue-900 font-medium rounded-full shadow-sm hover:bg-blue-50 transition-colors"
              >
                {category.name}
              </a>
            ))}
            <a 
              href="#consultation"
              className="flex-shrink-0 px-6 py-3 bg-pink-500 text-white font-medium rounded-full shadow-sm hover:bg-pink-600 transition-colors"
            >
              Consultation & Support
            </a>
          </div>
        </div>

        {/* Service Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {serviceCategories.map((category, index) => (
            <section key={index} id={category.name.replace(/\s+/g, '-').toLowerCase()} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-blue-900">{category.name}</h2>
                <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.services.map((service, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-50">
                    {service.image ? (
                      <div className="h-64 overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.name} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>
                    ) : (
                      <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                        <div className="text-center p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <p className="mt-4 text-blue-500 font-medium">Precision Craftsmanship</p>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-blue-900 mb-3">{service.name}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Consultation Section */}
          <section id="consultation" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-blue-900">Consultation & Support</h2>
              <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600">
                Expert guidance for complex cases and material selection
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <h3 className="text-2xl font-bold text-white mb-4">Technical Expertise at Your Service</h3>
                  <p className="text-blue-100 mb-6">
                    Our team of experienced dental technicians provides comprehensive support for complex cases, 
                    material selection, and treatment planning. We partner with you to achieve optimal patient outcomes.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-700 rounded-full p-2 flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-blue-100">Case planning for complex restorative cases</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-700 rounded-full p-2 flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-blue-100">Material selection guidance based on clinical requirements</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-700 rounded-full p-2 flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-blue-100">Digital workflow integration and training</p>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-700 rounded-full p-2 flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-blue-100">Troubleshooting and technical advice</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center p-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-64 w-full rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicePage;

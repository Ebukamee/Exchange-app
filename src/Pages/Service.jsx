// src/pages/ServicesPage.jsx
import React from 'react';
import Nav from '../components/nav'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';

const ServicePage = () => {
  const serviceCategories = [
    {
      name: "Fixed Prosthodontics",
      description: "Permanent dental restorations that restore function and aesthetics. Our crowns, bridges, inlays, onlays, and veneers are crafted for durability and natural appearance using advanced materials and techniques.",
      services: [
        { 
          name: "Crowns", 
          description: "Custom-made caps that cover damaged teeth, restoring shape, size, and strength. Available in PFM, Zirconia, and E.max materials.",
          image: "https://www.dentalsmiles4kids.com/wp-content/uploads/2023/10/co02.jpg"
        },
        { 
          name: "Bridges", 
          description: "Replace missing teeth by anchoring artificial teeth to adjacent natural teeth. Restores chewing function and prevents teeth shifting.",
          image: "https://www.beyonddentalhealth.com/wp-content/uploads/2021/01/dental-bridge.jpg"
        },
        { 
          name: "Veneers", 
          description: "Thin, custom-made shells that cover the front surface of teeth to improve appearance. Correct discoloration, chips, or gaps.",
          image: "https://www.lajolladentalimage.com/wp-content/uploads/2020/01/veneers.jpg"
        },
        { 
          name: "Inlays & Onlays", 
          description: "Conservative restorations for moderately damaged teeth. Inlays fit within tooth cusps, while onlays extend over cusps.",
          image: "https://www.smiledentalcenterct.com/wp-content/uploads/2019/05/inlays-and-onlays.jpg"
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
          image: "https://www.portmandental.com.au/wp-content/uploads/2020/04/full-dentures.jpg"
        },
        { 
          name: "Partial Dentures", 
          description: "Replace multiple missing teeth using acrylic or cobalt-chrome frameworks. Flexible options available for enhanced comfort.",
          image: "https://www.portmandental.com.au/wp-content/uploads/2020/04/partial-dentures.jpg"
        },
        { 
          name: "Night Guards", 
          description: "Custom-fitted appliances that protect teeth from grinding during sleep. Prevent tooth damage and TMJ disorders.",
          image: "https://www.dentistindallas.com/wp-content/uploads/2020/09/night-guard.jpg"
        },
        { 
          name: "Occlusal Splints", 
          description: "Treat TMJ disorders and bruxism by repositioning the jaw and reducing muscle strain during sleep.",
          image: "https://www.advanceddentistry.co.uk/wp-content/uploads/2021/03/occlusal-splint.jpg"
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
          image: "https://www.dentalcareofmadison.com/wp-content/uploads/2020/08/retainers.jpg"
        },
        { 
          name: "Space Maintainers", 
          description: "Preserve space for permanent teeth in children after premature loss of baby teeth. Prevent crowding and misalignment.",
          image: "https://www.smilesbydixon.com/wp-content/uploads/2017/06/Space-Maintainers.jpg"
        },
        { 
          name: "Palatal Expanders", 
          description: "Widen the upper jaw to correct crossbites and create space for crowded teeth. Essential for early orthodontic intervention.",
          image: "https://www.braceplace.com/wp-content/uploads/2020/06/palatal-expander.jpg"
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
          image: "https://www.osseonews.com/wp-content/uploads/2020/06/custom-abutment.jpg"
        },
        { 
          name: "Implant Crowns", 
          description: "Single-tooth replacements that attach directly to implants. Restore function and aesthetics with natural-looking results.",
          image: "https://www.dentalimplantcenter.org/wp-content/uploads/2018/12/implant-crown.jpg"
        },
        { 
          name: "Implant Bridges", 
          description: "Multi-tooth restorations supported by dental implants. Ideal for replacing several adjacent missing teeth.",
          image: "https://www.nogapsdental.com/wp-content/uploads/2020/08/implant-bridge.jpg"
        },
        { 
          name: "Full Arch Solutions", 
          description: "Complete restorations for patients missing all teeth in an arch. Fixed or removable options available.",
          image: "https://www.centuriondental.co.za/wp-content/uploads/2021/04/full-arch-dental-implants.jpg"
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
          image: "https://www.henryschein.ch/upload/henryschein.ch/images/Produkte/Zahnmedizin/Zahntechnik/CAD-CAM/CAD-CAM-Systeme/3Shape-TRIOS-3/3Shape-TRIOS-3-Intraoralscanner-1.jpg"
        },
        { 
          name: "3D Printing", 
          description: "Additive manufacturing of models, surgical guides, and temporary restorations. Faster turnaround with exceptional accuracy.",
          image: "https://www.dentistrytoday.com/wp-content/uploads/2020/08/3d-printing.jpg"
        },
        { 
          name: "Intraoral Scanning", 
          description: "Digital impression technology that replaces traditional molds. Comfortable, precise, and efficient scanning process.",
          image: "https://www.dentalcompare.com/Assets/ProductImages/28/44048/44048_1_1.jpg"
        },
        { 
          name: "Digital Smile Design", 
          description: "Comprehensive digital planning of cosmetic dental treatments. Preview your new smile before treatment begins.",
          image: "https://www.moderndentistry.com.au/wp-content/uploads/2020/11/digital-smile-design.jpg"
        }
      ]
    }
  ];

  return (
    <>
      <Nav />
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
                <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-blue-900 mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100"
                    >
                      Request this service
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
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
                
                <div className="mt-8">
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50"
                  >
                    Schedule a Consultation
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center p-8">
                <img 
                  src="https://www.medicaim.com/uploads/b2e087f0-5a46-11e8-8fc5-bf61b50ce761/consultationdentaire.jpg" 
                  alt="Dental Consultation" 
                  className="rounded-xl shadow-xl max-w-md w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ServicePage;

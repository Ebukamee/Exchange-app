// src/pages/ServicesPage.jsx
import React from 'react';
import Nav from '../components/nav';
import Footer from '../components/Footer';

const ServicePage = () => {
  const serviceCategories = [
    {
      name: "Our Offerings",
      description: "We offer a comprehensive range of dental services designed to enhance your smile and maintain lifelong oral health. Explore our offerings:",
      services: [
        { 
          name: "Preventive Care", 
          description: "Routine cleanings, exams, and digital X-rays to keep your teeth healthy and catch issues early. This is the foundation of lifelong oral health, helping you avoid complex procedures. Our thorough cleanings remove plaque and tartar buildup, while comprehensive exams allow us to detect potential problems before they become serious.",
          image: "https://images.stockcake.com/public/d/9/e/d9e0f1cb-6bb7-406a-aa30-c72cf629d5ac_large/hospital-emergency-room-stockcake.jpg"
        },
        { 
          name: "Cosmetic Dentistry", 
          description: "Transform your smile with professional whitening, veneers, or Invisalign for a confident, radiant look. Whether you want to brighten your teeth, conceal imperfections with custom veneers, or straighten your smile discreetly, we can help you achieve the beautiful, harmonious smile you've always wanted.",
          image: "https://dentakademiglobal.com/wp-content/uploads/2024/12/smile-design-768x512.webp"
        },
        { 
          name: "Restorative Treatments", 
          description: "Precision crowns, implants, and fillings to restore function and aesthetics. When a tooth is damaged or lost, our solutions bring back its strength and natural appearance. We use durable, tooth-colored materials for fillings, create custom crowns to protect weakened teeth, and offer dental implants as a permanent solution for missing teeth.",
          image: "https://www.summervilledentalcare.com/wp-content/uploads/2023/02/Real-Life-Cosmetic-Dentistry-Transformations.jpg"
        },
        { 
          name: "Advanced Procedures", 
          description: "Pain-free laser treatments and 3D-guided implants for cutting-edge care with minimal discomfort. We utilize the latest technology to make your dental care more precise and comfortable. Laser dentistry allows for minimally invasive treatments with faster healing, while 3D-guided surgery ensures implant placement is perfectly accurate for optimal results.",
          image: "https://www.lasertechnologies.co.in/uploads/blogs/original_cover_images/laser-technolgy-web.png"
        }
      ]
    }
  ];

  const heroImageUrl = "https://plus.unsplash.com/premium_photo-1681995326134-cdc947934015?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWwlMjBiZWRzfGVufDB8fDB8fHww";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <Nav />
      
      <main className="flex-grow">
        {/* Hero Section with Background Image */}
        <div
          className="relative bg-cover bg-center py-20"
          style={{ backgroundImage: `url('${heroImageUrl}')` }}
        >
          {/* Semi-transparent overlay for text readability */}
          <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="text-center">
              <h1 className="mt-[20px] text-4xl font-extrabold text-white sm:text-5xl">
                Our Services
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100">
                Enhance your smile and maintain lifelong oral health with our comprehensive dental services.
              </p>
            </div>
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
                          <p className="mt-4 text-blue-500 font-medium">Expert Dental Care</p>
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicePage;

// src/components/AboutSection.jsx
import React from 'react';
import Nav from "../components/nav";
import Footer from "../components/Footer";

const About = () => {
  const coreValues = [
    {
      title: "Excellence",
      description: "Achieving the highest standards in all services and products",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Innovation",
      description: "Embracing new technologies to continually improve offerings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: "Integrity",
      description: "Operating with honesty, transparency, and ethical practices",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Collaboration",
      description: "Fostering strong partnerships with dental professionals",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Patient-Centricity",
      description: "Prioritizing patient well-being and satisfaction",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Professionalism",
      description: "Maintaining a highly skilled, knowledgeable team",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Adekunle Philips",
      role: "Chief Dental Surgeon",
      image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      name: "Dr. Chioma Nwosu",
      role: "Orthodontist Specialist",
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      name: "Mr. Tunde Bello",
      role: "Head Lab Technician",
      image: "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  return (
    <>
      <Nav />
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mt-[30px] text-3xl font-extrabold text-blue-900 sm:text-4xl">
            About Princeton Dental & Lab
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Pioneering excellence in dental laboratory services across Nigeria
          </p>
        </div>
        
        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://ameldental.com/wp-content/webp-express/webp-images/uploads/2020/06/02-min-scaled-e1592552627573.jpg.webp" 
                alt="Princeton Dental Laboratory"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 w-64 transform -rotate-3 border-2 border-blue-100">
              <div className="flex items-center">
                <div className="bg-blue-600 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-blue-900">Registered April 10, 2025</p>
                  <p className="text-sm text-gray-600">CAC #8404827</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100">
                To enhance oral health and well-being by providing exceptional dental and laboratory 
                services through innovative solutions, professionalism, and maintaining the highest 
                standards of quality, integrity, and patient care.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the most trusted and preferred dental and laboratory service provider in Nigeria, 
                recognized for our technological advancement, unwavering commitment to quality, and our 
                positive impact on the dental health of the communities we serve.
              </p>
            </div>
          </div>
        </div>
        
        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-blue-900 text-center mb-12">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-blue-50 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start">
                  <div className="bg-blue-50 rounded-lg p-3">
                    {value.icon}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-bold text-blue-900">{value.title}</h4>
                    <p className="mt-2 text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Technology & Expertise */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Precision Craftsmanship</h3>
            <p className="text-gray-600 mb-6">
              At Princeton Dental, our team comprises highly skilled and experienced dental technicians 
              committed to delivering meticulous craftsmanship and exceptional service. We foster a culture 
              of continuous learning and professional development to stay abreast of the latest advancements 
              in dental technology and techniques.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold text-blue-900 mb-3">Our Technology</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Advanced CAD/CAM systems
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    High-precision 3D printers
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Digital scanners
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Quality control tools
                  </li>
                </ul>
              </div>
              
              <div className="bg-pink-50 p-6 rounded-xl">
                <h4 className="font-bold text-pink-800 mb-3">Our Expertise</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Fixed Prosthodontics
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Removable Prosthodontics
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Implant Prosthetics
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Digital Dentistry
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://www.dentalsmiles4kids.com/wp-content/uploads/2023/10/co02.jpg" 
                alt="Fixed Prosthodontics by Princeton Dental"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 w-64 transform rotate-3 border-2 border-pink-100">
              <div className="flex items-center">
                <div className="bg-pink-500 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-pink-800">Precision Craftsmanship</p>
                  <p className="text-sm text-gray-600">Perfect smiles guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="py-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">Meet Our Team</h3>
            <p className="mt-4 text-xl text-gray-600">
              Our experienced dental professionals are passionate about delivering exceptional care. With specialized training in the latest techniques, we combine expertise with compassion to make every visit comfortable and effective. Learn more about our dentists and staff and see why patients trust us to transform their smiles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2">
                <img
                  src={member.image}
                  alt={`Photo of ${member.name}`}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                />
                <h4 className="text-xl font-bold text-blue-900">{member.name}</h4>
                <p className="text-pink-600 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-10 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white">Partner With Princeton Dental Today</h3>
          <p className="mt-4 max-w-2xl mx-auto text-blue-100">
            Join hundreds of dental professionals who trust us for exceptional laboratory services
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-colors">
              Request a Consultation
            </button>
            <button className="px-6 py-3 bg-pink-600 text-white font-bold rounded-full shadow-lg hover:bg-pink-700 transition-colors">
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
      <Footer />
    </>
  );
};

export default About;

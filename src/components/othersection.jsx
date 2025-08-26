// src/components/WhyChooseUs.jsx
import React from 'react';

const Other = () => {
  const features = [
    
    {
      title: "Cutting-Edge Technology",
      description:"From 3D imaging to laser dentistry we use state of the art tools for the accurate minimally invasive treatment." ,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: "Expert Team",
      description: "Our skilled dentists and hygienist bring years of expert experience to deliver precise and effective care",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Patient-Centred Approach",
      description: "We prioritize your comfort and confidence creating a stress-free experience for every visit",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Personalised Care",
      description: "Every treatment plan is tailored to your unique needs, ensuring optimal results for your oral health.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },

  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
            Why Choose Princeton Dental?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            At Princeton dental clinic, we are dedicated to leading the dental industry with innovative Solutions and genuine compassion </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://ameldental.com/wp-content/webp-express/webp-images/uploads/2020/06/02-min-scaled-e1592552627573.jpg.webp" 
                alt="Dental laboratory precision work"
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 w-64 transform rotate-3 border-2 border-blue-100">
              <div className="flex items-center">
                <div className="bg-blue-600 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-blue-900">CAC Certified Laboratory</p>
                  <p className="text-sm text-gray-600">Registration #8404827</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Grid */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-blue-50 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex">
                    <div className="flex-shrink-0 bg-blue-50 rounded-lg p-3">
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-blue-900">{feature.title}</h3>
                      <p className="mt-2 text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Testimonial */}
            <div className="mt-12 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 text-white">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div className="ml-4">
                  <blockquote className="italic">
                    "Princeton Dental's precision work and rapid turnaround have transformed our practice. 
                    Their technical expertise and commitment to quality are unmatched in Nigeria."
                  </blockquote>
                  <div className="mt-4 flex items-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="ml-4">
                      <p className="font-bold">Dr. Adebayo Johnson</p>
                      <p className="text-blue-200">Dental Surgeon, Lagos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-50">
            <div className="text-4xl font-bold text-blue-600">99.7%</div>
            <div className="mt-2 text-gray-600">Case Acceptance Rate</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-50">
            <div className="text-4xl font-bold text-pink-500">48h</div>
            <div className="mt-2 text-gray-600">Average Turnaround</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-50">
            <div className="text-4xl font-bold text-blue-600">200+</div>
            <div className="mt-2 text-gray-600">Dental Practices Served</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-50">
            <div className="text-4xl font-bold text-pink-500">24/7</div>
            <div className="mt-2 text-gray-600">Technical Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Other;

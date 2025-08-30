// src/components/TechnologyPage.jsx
import React from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const TechnologyPage = () => {
  const technologies = [
    {
      title: "3D Imaging",
      description: "High-resolution scans for precise diagnostics and treatment planning.",
      features: ["Precise Diagnostics", "Accurate Treatment Planning", "Detailed Visualizations", "Comprehensive Analysis"],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=60"
    },
    {
      title: "Laser Dentistry",
      description: "Minimally invasive procedures for faster recovery and reduced discomfort.",
      features: ["Minimally Invasive", "Faster Recovery", "Reduced Discomfort", "Precise Treatment"],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=60"
    },
    {
      title: "Intraoral Cameras",
      description: "Real-time visuals to help you understand your dental health and treatment options.",
      features: ["Real-Time Visuals", "Patient Education", "Treatment Documentation", "Enhanced Diagnostics"],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=60"
    },
    {
      title: "Digital X-Rays",
      description: "Safe, low-radiation imaging for detailed insights into your oral health.",
      features: ["Low Radiation", "Detailed Imaging", "Instant Results", "Safe Technology"],
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=60"
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
                  Our Dental Technology
                </h1>
                <p className="mt-6 text-xl text-blue-100 max-w-3xl">
                  We invest in the latest dental innovations to ensure accurate, efficient, and comfortable treatments for our patients.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Cutting-Edge Equipment</span>
                  </div>
                  <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">Patient Comfort Focused</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=60" 
                  alt="Modern Dental Technology"
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
                Our Advanced Tools
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                We utilize the latest dental technology to provide you with the best care possible
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

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Benefits of Our Technology
              </h2>
              <p className="mt-4 text-xl text-blue-100">
                How our advanced dental technology improves your experience and results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Precision & Accuracy
                </h3>
                <p className="mt-3 text-blue-100">
                  Our advanced imaging technology ensures precise diagnostics and treatment planning for optimal results.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Comfort & Safety
                </h3>
                <p className="mt-3 text-blue-100">
                  Minimally invasive procedures and low-radiation imaging ensure your comfort and safety throughout treatment.
                </p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-bold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Patient Education
                </h3>
                <p className="mt-3 text-blue-100">
                  Real-time visuals help you understand your dental health and make informed decisions about treatment options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
              Experience the Difference Our Technology Makes
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Schedule a consultation to see how our advanced dental technology can improve your smile and oral health.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                Schedule an Appointment
              </button>
              <button className="px-6 py-3 bg-white text-blue-900 border border-blue-900 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-colors">
                Learn More About Our Technology
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TechnologyPage;

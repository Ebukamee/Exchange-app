// src/components/TestimonialsSection.jsx
import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Princeton Dental Clinic made my smile makeover a breeze. The team was so caring, and the technology is amazing!",
      author: "Sarah T.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face&q=80"
    },
    {
      quote: "I was nervous about my dental visit, but their gentle approach and clear explanations put me at ease.",
      author: "Michael R.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&q=80"
    },
    {
      quote: "The best dental experience I've ever had. My Invisalign results are incredible!",
      author: "Emily K.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&q=80"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
            Patient Testimonials
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Hear from our satisfied patients about their experience at Princeton Dental Clinic
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-blue-900">{testimonial.author}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>

        {/* Appointment Booking Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 text-white mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Book Your Appointment</h3>
            <p className="text-lg text-blue-100 mb-6">
              Ready to transform your smile? Schedule your visit with Princeton Dental Clinic today. 
              Our online booking system makes it easy to find a convenient time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="px-6 py-3 bg-white text-blue-900 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-colors">
                <a href="https://wa.me/08159029243">Book Appointment Online</a>
              </button>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-lg">Call us: +234 81 5902 9243</span>
              </div>
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Our Commitment to You</h3>
            <p className="text-lg text-gray-600">
              At Princeton Dental Clinic, we're driven by a mission to lead the dental industry with innovative, 
              personalized care. We strive to inspire confidence through cutting-edge treatments and genuine compassion, 
              ensuring every patient enjoys a healthy, radiant smile for life. Join our growing community of satisfied 
              patients and experience dental care that puts you first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

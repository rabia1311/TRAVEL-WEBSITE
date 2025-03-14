import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'My trip to Japan was absolutely incredible! The itinerary was perfectly planned, and the local guides were knowledgeable and friendly. I couldn\'t have asked for a better experience.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: 'The European tour exceeded all my expectations. From the accommodations to the activities, everything was top-notch. I\'ve already booked my next adventure with them!',
      rating: 5
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'London, UK',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      text: 'As a solo traveler, I was a bit nervous, but the team made me feel safe and included throughout the entire trip. The small group size allowed for a more personalized experience.',
      rating: 4
    },
    {
      id: 4,
      name: 'David Kim',
      location: 'Sydney, Australia',
      image: 'https://randomuser.me/api/portraits/men/11.jpg',
      text: 'The Southeast Asia package was an amazing value for the price. We visited so many beautiful places and had authentic experiences that we couldn\'t have arranged on our own.',
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Travelers Say</h2>
        
        <div className="testimonials-slider">
          <div className="testimonials-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {testimonials.map(testimonial => (
              <div className="testimonial" key={testimonial.id}>
                <div className="testimonial-content">
                  <div className="testimonial-text">
                    <i className="fas fa-quote-left quote-icon"></i>
                    <p>{testimonial.text}</p>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star ${i < testimonial.rating ? 'active' : ''}`}
                      ></i>
                    ))}
                  </div>
                </div>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-location">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="slider-btn prev-btn" onClick={handlePrev}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="slider-btn next-btn" onClick={handleNext}>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div className="slider-dots">
            {testimonials.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
        
        <div className="testimonial-cta">
          <h3>Ready to create your own travel story?</h3>
          <p>Join thousands of satisfied travelers who have experienced the world with us.</p>
          <button className="btn">Start Planning Your Trip</button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
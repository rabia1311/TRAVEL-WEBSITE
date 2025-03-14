import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-logo">
                <span className="logo-text">Wanderlust</span>
              </div>
              <p className="footer-description">
                Discover the world with Wanderlust. We provide unforgettable travel experiences with personalized itineraries and exceptional service.
              </p>
              <div className="social-links">
                <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-link"><i className="fab fa-pinterest"></i></a>
              </div>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#destinations">Destinations</a></li>
                <li><a href="#travel-tips">Travel Tips</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#booking">Book Now</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Destinations</h3>
              <ul className="footer-links">
                <li><a href="#">Bali, Indonesia</a></li>
                <li><a href="#">Santorini, Greece</a></li>
                <li><a href="#">Swiss Alps</a></li>
                <li><a href="#">Kyoto, Japan</a></li>
                <li><a href="#">Paris, France</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3 className="footer-title">Contact Us</h3>
              <ul className="contact-info">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Travel Street, City, Country</span>
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>info@wanderlust.com</span>
                </li>
              </ul>
              <div className="newsletter">
                <h4>Subscribe to our Newsletter</h4>
                <form className="newsletter-form">
                  <input type="email" placeholder="Your Email Address" required />
                  <button type="submit"><i className="fas fa-paper-plane"></i></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {new Date().getFullYear()} Wanderlust. All Rights Reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
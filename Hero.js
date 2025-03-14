import React, { useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchGuests, setSearchGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real application, this would trigger a search
    console.log('Search for:', { searchQuery, searchDate, searchGuests });
    alert(`Searching for ${searchQuery} on ${searchDate} for ${searchGuests} guests`);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">Explore the World with Us</h1>
        <p className="hero-subtitle">Discover amazing places, create unforgettable memories</p>
        
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <div className="search-box">
              <div className="search-input">
                <i className="fas fa-map-marker-alt"></i>
                <input 
                  type="text" 
                  placeholder="Where do you want to go?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  required
                />
              </div>
              
              <div className="search-input">
                <i className="fas fa-calendar-alt"></i>
                <input 
                  type="date" 
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="search-input">
                <i className="fas fa-user-friends"></i>
                <select 
                  value={searchGuests}
                  onChange={(e) => setSearchGuests(e.target.value)}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests</option>
                </select>
              </div>
              
              <button type="submit" className="search-btn">
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </form>
        </div>
        
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-text">Destinations</span>
          </div>
          <div className="stat">
            <span className="stat-number">10k+</span>
            <span className="stat-text">Happy Travelers</span>
          </div>
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-text">Positive Reviews</span>
          </div>
        </div>
      </div>
      
      <div className="hero-overlay"></div>
    </section>
  );
};

export default Hero;
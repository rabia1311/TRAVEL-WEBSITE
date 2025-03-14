import React, { useState } from 'react';
import './Destinations.css';

const Destinations = () => {
  // Sample destination data
  const destinationsData = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      description: 'Tropical paradise with beautiful beaches and rich culture',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 1299,
      rating: 4.8,
      category: 'beach'
    },
    {
      id: 2,
      name: 'Santorini, Greece',
      description: 'Stunning white buildings and breathtaking ocean views',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 1599,
      rating: 4.9,
      category: 'beach'
    },
    {
      id: 3,
      name: 'Swiss Alps',
      description: 'Majestic mountains and world-class skiing opportunities',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 1899,
      rating: 4.7,
      category: 'mountain'
    },
    {
      id: 4,
      name: 'Kyoto, Japan',
      description: 'Ancient temples and beautiful cherry blossoms',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 1499,
      rating: 4.6,
      category: 'cultural'
    },
    {
      id: 5,
      name: 'Paris, France',
      description: 'City of love with iconic landmarks and cuisine',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 1399,
      rating: 4.5,
      category: 'city'
    },
    {
      id: 6,
      name: 'Machu Picchu, Peru',
      description: 'Ancient Incan citadel set among breathtaking mountains',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 1799,
      rating: 4.9,
      category: 'historical'
    }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [destinations, setDestinations] = useState(destinationsData);

  const filterDestinations = (category) => {
    setActiveFilter(category);
    
    if (category === 'all') {
      setDestinations(destinationsData);
    } else {
      const filtered = destinationsData.filter(dest => dest.category === category);
      setDestinations(filtered);
    }
  };

  return (
    <section className="destinations section" id="destinations">
      <div className="container">
        <h2 className="section-title">Popular Destinations</h2>
        
        <div className="destination-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => filterDestinations('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'beach' ? 'active' : ''}`}
            onClick={() => filterDestinations('beach')}
          >
            Beaches
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'mountain' ? 'active' : ''}`}
            onClick={() => filterDestinations('mountain')}
          >
            Mountains
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'city' ? 'active' : ''}`}
            onClick={() => filterDestinations('city')}
          >
            Cities
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'cultural' ? 'active' : ''}`}
            onClick={() => filterDestinations('cultural')}
          >
            Cultural
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'historical' ? 'active' : ''}`}
            onClick={() => filterDestinations('historical')}
          >
            Historical
          </button>
        </div>
        
        <div className="destinations-grid">
          {destinations.map(destination => (
            <div className="destination-card" key={destination.id}>
              <div className="destination-image">
                <img src={destination.image} alt={destination.name} />
                <div className="destination-price">${destination.price}</div>
              </div>
              <div className="destination-info">
                <h3 className="destination-name">{destination.name}</h3>
                <p className="destination-description">{destination.description}</p>
                <div className="destination-footer">
                  <div className="destination-rating">
                    <i className="fas fa-star"></i>
                    <span>{destination.rating}</span>
                  </div>
                  <button className="btn-details">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-more">
          <button className="btn">View All Destinations</button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
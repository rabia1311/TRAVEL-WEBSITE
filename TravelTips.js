import React, { useState } from 'react';
import './TravelTips.css';

const TravelTips = () => {
  const tipsData = [
    {
      id: 1,
      title: 'Pack Light, Travel Far',
      content: 'Learn the art of minimalist packing to make your journey more comfortable and stress-free.',
      icon: 'fas fa-suitcase'
    },
    {
      id: 2,
      title: 'Stay Safe While Traveling',
      content: 'Essential safety tips for solo travelers and families to ensure a secure and enjoyable trip.',
      icon: 'fas fa-shield-alt'
    },
    {
      id: 3,
      title: 'Budget Travel Hacks',
      content: 'Discover how to explore the world without breaking the bank with these money-saving strategies.',
      icon: 'fas fa-piggy-bank'
    },
    {
      id: 4,
      title: 'Immerse in Local Culture',
      content: 'Tips for authentic cultural experiences that will make your travels more meaningful and memorable.',
      icon: 'fas fa-globe-americas'
    }
  ];

  const [activeTip, setActiveTip] = useState(1);

  return (
    <section className="travel-tips section" id="travel-tips">
      <div className="container">
        <h2 className="section-title">Travel Tips & Advice</h2>
        
        <div className="tips-container">
          <div className="tips-tabs">
            {tipsData.map(tip => (
              <div 
                key={tip.id}
                className={`tip-tab ${activeTip === tip.id ? 'active' : ''}`}
                onClick={() => setActiveTip(tip.id)}
              >
                <div className="tip-icon">
                  <i className={tip.icon}></i>
                </div>
                <h3 className="tip-title">{tip.title}</h3>
              </div>
            ))}
          </div>
          
          <div className="tip-content">
            {tipsData.map(tip => (
              <div 
                key={tip.id}
                className={`tip-content-item ${activeTip === tip.id ? 'active' : ''}`}
              >
                <h3 className="tip-content-title">{tip.title}</h3>
                <p className="tip-content-text">{tip.content}</p>
                
                <div className="tip-details">
                  <p>
                    Traveling is not just about visiting new places; it's about experiencing new cultures, 
                    meeting new people, and creating lasting memories. {tip.title.toLowerCase()} is essential 
                    for making the most of your adventures.
                  </p>
                  <p>
                    Whether you're a seasoned traveler or planning your first trip, these tips will help you 
                    navigate the world with confidence and ease.
                  </p>
                  <ul className="tip-list">
                    <li>Research your destination thoroughly before traveling</li>
                    <li>Learn a few basic phrases in the local language</li>
                    <li>Respect local customs and traditions</li>
                    <li>Stay flexible with your itinerary</li>
                    <li>Document your journey with photos and journals</li>
                  </ul>
                </div>
                
                <button className="btn">Read Full Guide</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="travel-blog-preview">
          <h3>From Our Travel Blog</h3>
          <div className="blog-posts">
            <div className="blog-post">
              <div className="blog-image">
                <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Travel Blog" />
              </div>
              <div className="blog-info">
                <span className="blog-category">Adventure</span>
                <h4 className="blog-title">10 Hidden Gems in Southeast Asia</h4>
                <p className="blog-excerpt">Discover lesser-known destinations that offer authentic experiences...</p>
                <a href="#" className="blog-link">Read More</a>
              </div>
            </div>
            <div className="blog-post">
              <div className="blog-image">
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Travel Blog" />
              </div>
              <div className="blog-info">
                <span className="blog-category">Food</span>
                <h4 className="blog-title">Culinary Journey Through Italy</h4>
                <p className="blog-excerpt">A food lover's guide to the best regional cuisines in Italy...</p>
                <a href="#" className="blog-link">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelTips;
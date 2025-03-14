import React, { useState, useEffect } from 'react';
import './BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    travelClass: 'economy',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [formStep, setFormStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [destinations, setDestinations] = useState([]);

  // Fetch destinations from the backend
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/v1/destinations');
        const data = await response.json();

        if (data.status === 'success') {
          setDestinations(data.data.destinations);
        }
      } catch (err) {
        console.error('Error fetching destinations:', err);
      }
    };

    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const nextStep = () => {
    setFormStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setFormStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Send the form data to the backend
      const response = await fetch('/api/v1/bookings/guest-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setFormSubmitted(true);

        // Reset form after 5 seconds
        setTimeout(() => {
          setFormSubmitted(false);
          setFormStep(1);
          setFormData({
            destination: '',
            departureDate: '',
            returnDate: '',
            adults: 1,
            children: 0,
            travelClass: 'economy',
            name: '',
            email: '',
            phone: '',
            specialRequests: ''
          });
        }, 5000);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="booking-form section" id="booking">
      <div className="container">
        <h2 className="section-title">Book Your Dream Vacation</h2>
        
        <div className="booking-container">
          <div className="booking-image">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Booking" />
            <div className="booking-overlay">
              <div className="booking-promo">
                <h3>Special Offer</h3>
                <p>Book now and get up to 25% off on selected destinations!</p>
                <div className="promo-timer">
                  <div className="timer-item">
                    <span className="timer-number">15</span>
                    <span className="timer-label">Days</span>
                  </div>
                  <div className="timer-item">
                    <span className="timer-number">22</span>
                    <span className="timer-label">Hours</span>
                  </div>
                  <div className="timer-item">
                    <span className="timer-number">13</span>
                    <span className="timer-label">Minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="booking-form-container">
            {formSubmitted ? (
              <div className="form-success">
                <i className="fas fa-check-circle"></i>
                <h3>Booking Request Submitted!</h3>
                <p>Thank you for your booking request. We will contact you shortly to confirm your reservation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}
                <div className="form-steps">
                  <div className={`form-step ${formStep === 1 ? 'active' : ''} ${formStep > 1 ? 'completed' : ''}`}>
                    <span className="step-number">1</span>
                    <span className="step-text">Trip Details</span>
                  </div>
                  <div className={`form-step ${formStep === 2 ? 'active' : ''} ${formStep > 2 ? 'completed' : ''}`}>
                    <span className="step-number">2</span>
                    <span className="step-text">Personal Info</span>
                  </div>
                  <div className={`form-step ${formStep === 3 ? 'active' : ''}`}>
                    <span className="step-number">3</span>
                    <span className="step-text">Confirmation</span>
                  </div>
                </div>
                
                {formStep === 1 && (
                  <div className="form-page">
                    <div className="form-group">
                      <label htmlFor="destination">Destination</label>
                      <select
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Destination</option>
                        {destinations.map(destination => (
                          <option key={destination._id} value={destination._id}>
                            {destination.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="departureDate">Departure Date</label>
                        <input 
                          type="date" 
                          id="departureDate" 
                          name="departureDate"
                          value={formData.departureDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="returnDate">Return Date</label>
                        <input 
                          type="date" 
                          id="returnDate" 
                          name="returnDate"
                          value={formData.returnDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="adults">Adults</label>
                        <select 
                          id="adults" 
                          name="adults"
                          value={formData.adults}
                          onChange={handleChange}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5+</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="children">Children</label>
                        <select 
                          id="children" 
                          name="children"
                          value={formData.children}
                          onChange={handleChange}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4+</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="travelClass">Travel Class</label>
                      <select 
                        id="travelClass" 
                        name="travelClass"
                        value={formData.travelClass}
                        onChange={handleChange}
                      >
                        <option value="economy">Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First Class</option>
                      </select>
                    </div>
                    
                    <div className="form-buttons">
                      <button type="button" className="btn btn-next" onClick={nextStep}>
                        Next <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                )}
                
                {formStep === 2 && (
                  <div className="form-page">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="specialRequests">Special Requests (Optional)</label>
                      <textarea 
                        id="specialRequests" 
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows="4"
                      ></textarea>
                    </div>
                    
                    <div className="form-buttons">
                      <button type="button" className="btn btn-prev" onClick={prevStep}>
                        <i className="fas fa-arrow-left"></i> Previous
                      </button>
                      <button type="button" className="btn btn-next" onClick={nextStep}>
                        Next <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                )}
                
                {formStep === 3 && (
                  <div className="form-page">
                    <h3 className="summary-title">Booking Summary</h3>
                    
                    <div className="booking-summary">
                      <div className="summary-item">
                        <span className="summary-label">Destination:</span>
                        <span className="summary-value">{formData.destination}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Dates:</span>
                        <span className="summary-value">{formData.departureDate} to {formData.returnDate}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Travelers:</span>
                        <span className="summary-value">{formData.adults} Adults, {formData.children} Children</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Class:</span>
                        <span className="summary-value">{formData.travelClass.charAt(0).toUpperCase() + formData.travelClass.slice(1)}</span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Contact:</span>
                        <span className="summary-value">{formData.name}, {formData.email}</span>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div className="checkbox-group">
                        <input type="checkbox" id="terms" required />
                        <label htmlFor="terms">I agree to the terms and conditions</label>
                      </div>
                    </div>
                    
                    <div className="form-buttons">
                      <button type="button" className="btn btn-prev" onClick={prevStep}>
                        <i className="fas fa-arrow-left"></i> Previous
                      </button>
                      <button type="submit" className="btn btn-submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Confirm Booking'} {!isLoading && <i className="fas fa-check"></i>}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
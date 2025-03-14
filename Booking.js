const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  destination: {
    type: mongoose.Schema.ObjectId,
    ref: 'Destination',
    required: [true, 'Booking must belong to a Destination!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  price: {
    type: Number,
    required: [true, 'Booking must have a price.']
  },
  departureDate: {
    type: Date,
    required: [true, 'Booking must have a departure date.']
  },
  returnDate: {
    type: Date,
    required: [true, 'Booking must have a return date.']
  },
  adults: {
    type: Number,
    default: 1
  },
  children: {
    type: Number,
    default: 0
  },
  travelClass: {
    type: String,
    enum: ['economy', 'business', 'first'],
    default: 'economy'
  },
  specialRequests: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
});

// Populate destination and user when querying bookings
bookingSchema.pre(/^find/, function(next) {
  this.populate('destination').populate({
    path: 'user',
    select: 'name email phone'
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
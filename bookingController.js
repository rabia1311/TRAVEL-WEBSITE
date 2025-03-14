const Booking = require('../models/Booking');
const Destination = require('../models/Destination');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    // If user is logged in, get user ID from auth middleware
    if (req.user) {
      req.body.user = req.user.id;
    }

    // Get destination price from database
    const destination = await Destination.findOne({ 
      $or: [
        { _id: req.body.destination },
        { name: req.body.destination }
      ]
    });

    if (!destination) {
      return res.status(404).json({
        status: 'fail',
        message: 'Destination not found'
      });
    }

    // Set price from destination
    req.body.price = destination.price;
    
    // If destination was provided as name, convert to ID
    if (!req.body.destination.match(/^[0-9a-fA-F]{24}$/)) {
      req.body.destination = destination._id;
    }

    // Create booking
    const newBooking = await Booking.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        booking: newBooking
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get a single booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'No booking found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'No booking found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'No booking found with that ID'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get bookings for current user
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create booking without authentication (for non-logged in users)
exports.createGuestBooking = async (req, res) => {
  try {
    // First create a temporary user
    const User = require('../models/User');
    
    // Check if user with this email already exists
    let user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      // Create a random password for the user
      const randomPassword = Math.random().toString(36).slice(-8);
      
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: randomPassword,
        passwordConfirm: randomPassword
      });
    }
    
    // Get destination price from database
    const destination = await Destination.findOne({ 
      $or: [
        { _id: req.body.destination },
        { name: req.body.destination }
      ]
    });

    if (!destination) {
      return res.status(404).json({
        status: 'fail',
        message: 'Destination not found'
      });
    }

    // Create booking with user ID
    const newBooking = await Booking.create({
      destination: destination._id,
      user: user._id,
      price: destination.price,
      departureDate: req.body.departureDate,
      returnDate: req.body.returnDate,
      adults: req.body.adults,
      children: req.body.children,
      travelClass: req.body.travelClass,
      specialRequests: req.body.specialRequests
    });

    res.status(201).json({
      status: 'success',
      data: {
        booking: newBooking
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
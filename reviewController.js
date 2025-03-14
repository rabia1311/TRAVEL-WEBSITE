const Review = require('../models/Review');

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    let filter = {};
    if (req.params.destinationId) filter = { destination: req.params.destinationId };

    const reviews = await Review.find(filter);

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get a single review
exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'No review found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        review
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create a new review
exports.createReview = async (req, res) => {
  try {
    // Allow nested routes
    if (!req.body.destination) req.body.destination = req.params.destinationId;
    if (!req.body.user) req.body.user = req.user.id;

    const newReview = await Review.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        review: newReview
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'No review found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        review
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        status: 'fail',
        message: 'No review found with that ID'
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

// Set user ID and destination ID for nested routes
exports.setDestinationUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.destination) req.body.destination = req.params.destinationId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
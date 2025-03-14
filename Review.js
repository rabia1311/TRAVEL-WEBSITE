const mongoose = require('mongoose');
const Destination = require('./Destination');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'A review must have a rating.']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    destination: {
      type: mongoose.Schema.ObjectId,
      ref: 'Destination',
      required: [true, 'Review must belong to a destination.']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Prevent duplicate reviews from same user for same destination
reviewSchema.index({ destination: 1, user: 1 }, { unique: true });

// Populate user when querying reviews
reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

// Static method to calculate average ratings
reviewSchema.statics.calcAverageRatings = async function(destinationId) {
  const stats = await this.aggregate([
    {
      $match: { destination: destinationId }
    },
    {
      $group: {
        _id: '$destination',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Destination.findByIdAndUpdate(destinationId, {
      ratingsQuantity: stats[0].nRating,
      rating: stats[0].avgRating
    });
  } else {
    await Destination.findByIdAndUpdate(destinationId, {
      ratingsQuantity: 0,
      rating: 4.5
    });
  }
};

// Call calcAverageRatings after save
reviewSchema.post('save', function() {
  // this points to current review
  this.constructor.calcAverageRatings(this.destination);
});

// Call calcAverageRatings before findOneAndUpdate/Delete
reviewSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.destination);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
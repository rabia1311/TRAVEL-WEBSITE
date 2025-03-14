const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A destination must have a name'],
    unique: true,
    trim: true
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'A destination must have a description'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'A destination must have an image']
  },
  price: {
    type: Number,
    required: [true, 'A destination must have a price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function(val) {
        // this only points to current doc on NEW document creation
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price'
    }
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'A destination must have a category'],
    enum: {
      values: ['beach', 'mountain', 'city', 'cultural', 'historical'],
      message: 'Category is either: beach, mountain, city, cultural, or historical'
    }
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  location: {
    // GeoJSON
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    country: String
  },
  activities: [String],
  duration: Number,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'difficult']
  },
  guides: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ]
});

// Index for better search performance
destinationSchema.index({ price: 1, rating: -1 });
destinationSchema.index({ slug: 1 });
destinationSchema.index({ location: '2dsphere' });

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
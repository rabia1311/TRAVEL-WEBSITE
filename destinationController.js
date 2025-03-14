const Destination = require('../models/Destination');

// Get all destinations with optional filtering
exports.getAllDestinations = async (req, res) => {
  try {
    // BUILD QUERY
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Destination.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // EXECUTE QUERY
    const destinations = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: destinations.length,
      data: {
        destinations
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get a single destination by ID
exports.getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        status: 'fail',
        message: 'No destination found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        destination
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create a new destination
exports.createDestination = async (req, res) => {
  try {
    const newDestination = await Destination.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        destination: newDestination
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update a destination
exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!destination) {
      return res.status(404).json({
        status: 'fail',
        message: 'No destination found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        destination
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete a destination
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);

    if (!destination) {
      return res.status(404).json({
        status: 'fail',
        message: 'No destination found with that ID'
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

// Get destinations by category
exports.getDestinationsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const destinations = await Destination.find({ category });

    res.status(200).json({
      status: 'success',
      results: destinations.length,
      data: {
        destinations
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get top 5 destinations
exports.getTopDestinations = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-rating,price';
  req.query.fields = 'name,price,rating,description,image,category';
  next();
};
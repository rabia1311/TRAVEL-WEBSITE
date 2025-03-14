const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('../models/Destination');
const User = require('../models/User');
const Review = require('../models/Review');

// Load environment variables
dotenv.config({ path: './.env' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'));

// Read JSON files
const destinations = JSON.parse(fs.readFileSync(`${__dirname}/destinations.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));

// Import data into DB
const importData = async () => {
  try {
    await Destination.create(destinations);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Destination.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
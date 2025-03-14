const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

// Guest booking route (no authentication required)
router.post('/guest-booking', bookingController.createGuestBooking);

// Routes that require authentication
router.use(authController.protect);

// Get current user's bookings
router.get('/my-bookings', bookingController.getMyBookings);

// Standard CRUD routes
router
  .route('/')
  .get(
    authController.restrictTo('admin'),
    bookingController.getAllBookings
  )
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
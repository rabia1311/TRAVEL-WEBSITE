const express = require('express');
const destinationController = require('../controllers/destinationController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Nested routes for reviews
router.use('/:destinationId/reviews', reviewRouter);

// Top destinations route
router.get('/top-5', destinationController.getTopDestinations, destinationController.getAllDestinations);

// Category routes
router.get('/category/:category', destinationController.getDestinationsByCategory);

// Standard CRUD routes
router
  .route('/')
  .get(destinationController.getAllDestinations)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    destinationController.createDestination
  );

router
  .route('/:id')
  .get(destinationController.getDestination)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    destinationController.updateDestination
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    destinationController.deleteDestination
  );

module.exports = router;
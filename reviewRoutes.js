const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// Routes that require authentication
router.use(authController.protect);

// Standard CRUD routes
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    reviewController.setDestinationUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
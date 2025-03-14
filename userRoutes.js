const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// Authentication routes (no protection needed)
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Routes that require authentication
router.use(authController.protect);

// User profile routes
router.get('/me', userController.getMe);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.patch('/updateMyPassword', authController.updatePassword);

// Admin only routes
router.use(authController.restrictTo('admin'));

// Standard CRUD routes
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
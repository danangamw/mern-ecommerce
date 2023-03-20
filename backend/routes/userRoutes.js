const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controller/userController');

router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin'), getAllUsers);

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').post(authenticateUser, updateUser);
router.route('/updateUserPassword').post(authenticateUser, updateUserPassword);

// make sure to place route with parameter on bottom of all routes
router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;

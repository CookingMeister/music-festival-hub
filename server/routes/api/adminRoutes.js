import express from 'express';
import {
  generateToken,
  hashPassword,
  comparePassword,
  authMiddleware,
} from '../../utils/auth.js';
import {
  deleteUser,
  updateUserById,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../../controllers/adminController.js';
import { createUserProfile } from '../../controllers/userController.js';

const router = express.Router();

// Admin Create and Update User Routes
router.post('/users/profile', authMiddleware, createUserProfile);
router.put('/users/:userId', authMiddleware, updateUserById);

// Admin Delete User Route
router.delete('/users/profile/:userId', authMiddleware, deleteUser);

// Admin Create Products Route
router.post('/products', authMiddleware, createProduct);

// Admin Update and Delete Products Route
router
  .route('/products/:id')
    .put(authMiddleware, updateProduct)
    .delete(authMiddleware, deleteProduct);

export default router;

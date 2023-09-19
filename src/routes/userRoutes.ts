import express from 'express';
import userController from '../controllers/user/userController';
import authController from '../controllers/user/authController';
import authMiddleware from '../middleware/authMiddleware';

const userRoutes = express.Router();

userRoutes.post('/register', userController.registerUser);
userRoutes.post('/login', authController.login)




module.exports = userRoutes;
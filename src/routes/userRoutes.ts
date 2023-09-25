import express from 'express';
import userController from '../controllers/user/userController';
import authController from '../controllers/user/authController';
import {authMiddleware} from '../middleware/authMiddleware';

const userRoutes = express.Router();

userRoutes.post('/register', userController.registerUser);
userRoutes.post('/login', authController.login);
userRoutes.route('/profile').put(authMiddleware,userController.editUser).get(authMiddleware,userController.getProfile)



module.exports = userRoutes;
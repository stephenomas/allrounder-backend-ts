import express from 'express';
import userController from '../controllers/user/userController';
import authController from '../controllers/user/authController';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware';

const userRoutes = express.Router();

userRoutes.post('/register',authMiddleware,adminMiddleware,userController.registerUser);
userRoutes.post('/login', authController.login);
userRoutes.post('/logout',authMiddleware, authController.logout);
userRoutes.route('/:id').put(authMiddleware,adminMiddleware, userController.adminEditUser).get(authMiddleware,adminMiddleware,userController.adminGetUser)
userRoutes.get('/',authMiddleware,adminMiddleware,userController.getUsers)
userRoutes.route('/profile').put(authMiddleware,userController.editUser).get(authMiddleware,userController.getProfile)



export default userRoutes;
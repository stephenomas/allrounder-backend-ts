import express from 'express';
import userController from '../controllers/user/userController';
import authController from '../controllers/user/authController';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware';

const userRoutes = express.Router();

userRoutes.post('/register',adminMiddleware,userController.registerUser);
userRoutes.post('/login', authController.login);
userRoutes.post('/logout',authMiddleware, authController.logout);
userRoutes.route('/:id').put(adminMiddleware, userController.adminEditUser).get(adminMiddleware,userController.adminGetUser)
userRoutes.post('/:id/toggle', adminMiddleware, userController.toggleUser)
userRoutes.get('/',adminMiddleware,userController.getUsers)
userRoutes.route('/account/profile').put(authMiddleware,userController.editUser).get(authMiddleware,userController.getProfile)


export default userRoutes;
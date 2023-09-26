import express, { application } from 'express';
import branchRoutes from './branchRoutes';
import permissionRoutes from './permissionRoutes';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';

const appRouter = express.Router();

appRouter.use('/user', userRoutes)
appRouter.use('/branch', branchRoutes )
appRouter.use('/permission', permissionRoutes)
appRouter.use('/product', productRoutes)

export default appRouter
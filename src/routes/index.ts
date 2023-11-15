import express, { application } from 'express';
import branchRoutes from './branchRoutes';
import permissionRoutes from './permissionRoutes';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import brandRoutes from './BrandRoutes';
import specRoutes from './specRoutes';
import ckdRoutes from './ckdRoutes';

const appRouter = express.Router();

appRouter.use('/user', userRoutes)
appRouter.use('/branch', branchRoutes )
appRouter.use('/permission', permissionRoutes)
appRouter.use('/product', productRoutes)
appRouter.use('/brand', brandRoutes)
appRouter.use('/spec', specRoutes)
appRouter.use('/ckd', ckdRoutes)

export default appRouter
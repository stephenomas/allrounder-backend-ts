import express, { application } from 'express';
import branchRoutes from './branchRoutes';
import permissionRoutes from './permissionRoutes';
const userRoutes = require('./userRoutes')

const appRouter = express.Router();

appRouter.use('/user', userRoutes)
appRouter.use('/branch', branchRoutes )
appRouter.use('/permission', permissionRoutes)

export default appRouter
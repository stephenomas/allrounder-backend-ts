import express from 'express';
const userRoutes = require('./userRoutes')

const appRouter = express.Router();

appRouter.use('/user', userRoutes)


export default appRouter
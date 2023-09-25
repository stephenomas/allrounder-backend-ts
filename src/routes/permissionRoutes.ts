import express from 'express';
import permissionController from '../controllers/permissionController';


const permissionRoutes = express.Router();

permissionRoutes.post('/create', permissionController.create);
permissionRoutes.get('/', permissionController.index)

export default permissionRoutes;
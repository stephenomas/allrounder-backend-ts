import {authMiddleware, PermissionMiddleware} from "../middleware/authMiddleware";
import brandController from "../controllers/brand/brandController";
import { Router } from "express";

const brandRoutes = Router();

brandRoutes.route('/').post(PermissionMiddleware('Add Brand'), brandController.create).get(PermissionMiddleware('View Brand'), brandController.adminIndex)
brandRoutes.get('/list', brandController.index)
brandRoutes.route('/:id').get(PermissionMiddleware('View Brand'), brandController.show).put(PermissionMiddleware('Edit Brand'), brandController.edit)
brandRoutes.post('/:id/toggle', PermissionMiddleware('Edit Brand'),brandController.toggle)

export default brandRoutes;
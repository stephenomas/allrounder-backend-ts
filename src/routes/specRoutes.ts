import {authMiddleware, PermissionMiddleware} from "../middleware/authMiddleware";
import brandController from "../controllers/brand/brandController";
import { Router } from "express";
import specController from "../controllers/spec/specController";

const specRoutes = Router();

specRoutes.route('/').post(PermissionMiddleware('Add Model'), specController.create).get(PermissionMiddleware('View Model'), specController.adminIndex)
specRoutes.get('/list', specController.index)
specRoutes.route('/:id').get(PermissionMiddleware('View Model'), specController.show).put(PermissionMiddleware('Edit Model'), specController.edit)
specRoutes.post('/:id/toggle',PermissionMiddleware('Edit Model'), specController.toggle)

export default specRoutes;
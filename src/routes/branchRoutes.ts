import { Router } from "express";
import branchController from "../controllers/branch/branchController";
import {authMiddleware, PermissionMiddleware} from "../middleware/authMiddleware";


const branchRoutes = Router();

branchRoutes.route('/').post(authMiddleware, PermissionMiddleware('Add Branch'), branchController.create).get(authMiddleware, branchController.index)
branchRoutes.route('/:id').put(authMiddleware, PermissionMiddleware('View Branch'), branchController.update)
branchRoutes.post('/:id/toggle', authMiddleware, PermissionMiddleware('Add Branch'), branchController.toggle)
export default branchRoutes;
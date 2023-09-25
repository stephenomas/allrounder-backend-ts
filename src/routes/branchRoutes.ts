import { Router } from "express";
import branchController from "../controllers/branch/branchController";
import {authMiddleware, PermissionMiddleware} from "../middleware/authMiddleware";


const branchRoutes = Router();

branchRoutes.route('/').post(authMiddleware, PermissionMiddleware, branchController.create).get(authMiddleware, branchController.index)
branchRoutes.route('/:id').put(authMiddleware, PermissionMiddleware, branchController.update)
branchRoutes.post('/:id/toggle', authMiddleware, PermissionMiddleware, branchController.toggle)
export default branchRoutes;
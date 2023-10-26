import { Router } from "express";
import branchController from "../controllers/branch/branchController";
import {authMiddleware, PermissionMiddleware} from "../middleware/authMiddleware";


const branchRoutes = Router();

branchRoutes.route('/').post(PermissionMiddleware('Add Branch'), branchController.create).get(authMiddleware, branchController.index)
branchRoutes.route('/:id').put(PermissionMiddleware('View Branch'), branchController.update)
branchRoutes.post('/:id/toggle',PermissionMiddleware('Add Branch'), branchController.toggle)
export default branchRoutes;
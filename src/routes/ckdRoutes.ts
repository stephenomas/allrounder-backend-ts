import { Router } from "express";
import {authMiddleware, PermissionMiddleware} from "../middleware/authMiddleware";
import ckdController from "../controllers/ckd/ckdController";


const ckdRoutes = Router();

ckdRoutes.route('/').post(PermissionMiddleware('Add Ckd'), ckdController.create).get(PermissionMiddleware('View Ckd'), ckdController.adminIndex)
ckdRoutes.get('/list',authMiddleware, ckdController.index)
export default ckdRoutes;
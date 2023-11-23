import { Router } from "express";
import {authMiddleware, PermissionMiddleware} from "../middleware/authMiddleware";
import ckdController from "../controllers/ckd/ckdController";


const ckdRoutes = Router();


ckdRoutes.route('/').post(PermissionMiddleware('Add Ckd'), ckdController.create).get(PermissionMiddleware('View Ckd'), ckdController.adminIndex)
ckdRoutes.get('/list',authMiddleware, ckdController.index)
ckdRoutes.route('/:id').get(PermissionMiddleware('View Ckd'), ckdController.show).put(PermissionMiddleware('Edit Ckd'), ckdController.edit)
ckdRoutes.post('/:id/toggle', PermissionMiddleware('Edit Ckd'), ckdController.toggle)

export default ckdRoutes;
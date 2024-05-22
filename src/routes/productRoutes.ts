import { Router } from "express";
import productController from "../controllers/product/productController";
import { authMiddleware, PermissionMiddleware } from "../middleware/authMiddleware";

const productRoutes  = Router();

productRoutes.route('/').post(PermissionMiddleware("Add Product"), productController.create).get(PermissionMiddleware("View Product"), productController.index)
productRoutes.get('/list', authMiddleware, productController.index)
productRoutes.get('/:id', PermissionMiddleware('View Product'), productController.show)
productRoutes.put('/:id', PermissionMiddleware('Edit Product'), productController.edit)
productRoutes.post('/:id/toggle', PermissionMiddleware('Edit Product'), productController.toggle)

export default productRoutes;
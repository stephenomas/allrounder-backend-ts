import { Router } from "express";
import productController from "../controllers/product/productController";
import { authMiddleware, PermissionMiddleware } from "../middleware/authMiddleware";

const productRoutes  = Router();

productRoutes.route('/').post(PermissionMiddleware("Add Product"), productController.create).get(PermissionMiddleware("View Product"), productController.adminIndex)
productRoutes.get('/list', productController.index)
export default productRoutes;
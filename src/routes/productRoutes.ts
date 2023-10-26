import { Router } from "express";
import productController from "../controllers/product/productController";
import { authMiddleware, PermissionMiddleware } from "../middleware/authMiddleware";

const productRoutes  = Router();

productRoutes.post('/create', PermissionMiddleware("Add Product"), productController.create)

export default productRoutes;
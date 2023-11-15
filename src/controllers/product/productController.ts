import { Request, Response, NextFunction } from "express";
import { AuthRequest, Product as IProduct, ResponseBody } from "../../types";
import { ProductSchema } from "./validation";
import Product from "../../models/Product";
import { MongoError } from "mongodb";
import { paginate } from "../../utils/helpers";
import { PER_PAGE } from "../../utils/constants";
import mongoose from "mongoose";

const productController = {
    create : async (req : AuthRequest, res : Response, next : NextFunction) => {
        const {error} = ProductSchema.validate(req.body)
        if(error){
            return res.status(400).json({message: error.message} as ResponseBody)
        }
        try {
            const exists = await Product.findOne({chasisnumber: req.body.chasisnumber})
            if(exists) return res.status(400).json({message: 'Product already exists', status : 400} as ResponseBody)
            const product = await new Product({spec: req.body.spec, user:req.user!.id, ...req.body}).save()
            return res.status(200).json({message: 'Product created', status:200, data : product} as ResponseBody)

        } catch (error) {
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    
    }, 
    adminIndex :  async (req : Request, res : Response, next : NextFunction) => {
        try {
            const perPage = PER_PAGE;
            const  products =  Product.find({}).sort({ _id: -1 });
            const data = await paginate('products', products, req, perPage);
            return res.status(200).json({message: 'Products', status : 200, data } as ResponseBody)
        } catch (error) {
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
    index : async (req : Request, res : Response, next : NextFunction) => {
        try {
            const perPage = PER_PAGE;
            const  products =  Product.find({status : true}).sort({ _id: -1 });
            const data = await paginate('products', products, req, perPage);
            return res.status(200).json({message: 'Products', status : 200, data } as ResponseBody)
        } catch (error) {
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
    show : async (req: Request, res : Response, next : NextFunction) => {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Product not found' });
        }
        try {
            const product = await Product.findById(id)
            if(!product) return res.status(404).json({status: 404, message : 'Product not found'})
            return res.status(200).json({message : 'Product', status : 200,data: product } as ResponseBody)
        }catch(error){
            return res.status(400).json({message: (error as MongoError).message }as ResponseBody)
        }
    },
    edit : async (req: Request, res : Response, next : NextFunction) => {
        const {id} = req.params
        const {error} = ProductSchema.validate(req.body)
        if(error)  return res.status(400).json({message : error.message} as ResponseBody);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Product not found' });
        }
        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new:true})
            return res.status(200).json({message : 'Product Updated Successfully', status : 200,data: updatedProduct } as ResponseBody)
        }catch(error){
            return res.status(400).json({message: (error as MongoError).message }as ResponseBody)
        }
    },
    toggle : async ( req: AuthRequest, res: Response, next: NextFunction) => { 
        const {id} = req.params
        try{
            
            const product  = await Product.findById(id).orFail();
            product.status = !product.status
            await product.save()
            res.status(200).json({message:`product ${product.status ? 'Activated': 'Deactivated'} successfully`})
           }catch(error) {
            return res.status(500).json({message:(error as MongoError).message})
        }
    }
}

export default productController;
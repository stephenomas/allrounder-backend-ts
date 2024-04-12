import { Request, Response, NextFunction } from "express";
import { AuthRequest, Product as IProduct, ResponseBody } from "../../types";
import { ProductSchema } from "./validation";
import Product from "../../models/Product";
import { MongoError } from "mongodb";
import { paginate, paginate_aggregate } from "../../utils/helpers";
import { PER_PAGE } from "../../utils/constants";
import mongoose, { Model } from "mongoose";

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
    index :  async (req : AuthRequest, res : Response, next : NextFunction) => {
        
        try {
            const perPage = PER_PAGE;
            let data = {}
            let products = {}
            if(req.user!.role != 1){
               
             let pipeline =      [
                // Match products where the make's branch matches the user's branch
                {
                  $lookup: {
                    from: "specs",  // Collection to join with
                    localField: "spec",  // Field in the products collection
                    foreignField: "_id",  // Field in the makes collection
                    as: "spec"  // Alias for the joined documents
                  }
                },
                
                // Perform another lookup to populate the branch field of the make
                {
                  $lookup: {
                    from: "branches",  // Collection to join with
                    localField: "spec.branch",  // Field in the make document
                    foreignField: "_id",  // Field in the branches collection
                    as: "specBranch"  // Alias for the joined documents
                  }
                },
                
                // Match products where the make's branch matches the user's branch
                {
                  $match: {
                    "specBranch._id": req.user!.branch,
                    status: true // Assuming user.branch contains the user's branch
                  }
                }
              ]
            //   products = await Product.aggregate(pipeline).exec()
               data = await paginate_aggregate('products', Product, pipeline, req, perPage)
            }else{
                let products : any =  Product.find({}).populate([{path :'spec', select : 'name id branch'} ]).sort({ _id: -1 });
                data = await paginate('products', products, req, perPage)
            }   

         
            return res.status(200).json({message: 'Products', status : 200, data  } as ResponseBody)
        } catch (error) {
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
    // index : async (req : AuthRequest, res : Response, next : NextFunction) => {
    //     try {
    //         const perPage = PER_PAGE;
    //         let query : any = {
    //             status : true
    //         }
    //         if(req.user!.role != 1){
    //             query = {...query,'spec.branch': req.user!.branch}
    //         }
    //         const  products = await  Product.find({}).populate([{path :'spec', select : 'name id'} ]).sort({ _id: -1 });
           
    //         return res.status(200).json({message: 'Products', status : 200, data: products } as ResponseBody)
    //     } catch (error) {
    //         return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
    //     }
    // },
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
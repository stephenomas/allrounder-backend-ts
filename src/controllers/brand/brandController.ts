import { Request, Response, NextFunction } from "express";
import { BrandSchema } from "./validation";
import { AuthRequest, ResponseBody } from "../../types";
import Brand from "../../models/Brand";
import { MongoError } from 'mongodb';
import { PER_PAGE } from "../../utils/constants";
import { paginate } from "../../utils/helpers";
import mongoose from "mongoose";




const brandController = {
    create : async ( req: AuthRequest, res: Response, next: NextFunction) => {
        const {error} = BrandSchema.validate(req.body)
        if(error){
            return res.status(400).json({message: error.message} as ResponseBody)
        }
        const {name} =  req.body
        try {
            const exists = await Brand.findOne({name : { $regex: new RegExp(`^${name}$`, 'i') }});
            if(exists) {
                return res.status(400).json({message: 'Brand already exists', status : 400} as ResponseBody)
            }
            const brand = await new Brand({name, user: req.user!.id}).save();
            return res.status(200).json({message: 'Brand created', status:200, data : brand} as ResponseBody)

        }catch(error) {
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
    adminIndex : async  ( req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const perPage = PER_PAGE;
            const brands =  Brand.find({}).sort({ _id: -1 });
            const data =  await paginate('brands', brands, req, perPage)
            return res.status(200).json({message: 'Brands', status : 200, data } as ResponseBody)
        }catch(error){
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },

    index : async  ( req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const perPage = PER_PAGE;
            const brands =  Brand.find({status : {$ne : false}}).sort({ _id: -1 });
            const data =  await paginate('brands', brands, req, perPage)
            return res.status(200).json({message: 'Brands', status : 200, data } as ResponseBody)
        }catch(error){
            return res.status(500).json({message : (error as MongoError).message} as ResponseBody)
        }
    },
    show : async  ( req: AuthRequest, res: Response, next: NextFunction) => {
        const {id}  = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Brand not found' });
          }
        try {
            const brand = await Brand.findById(id)
            if(!brand) return res.status(404).json({status: 404, message : 'Brand not found'})
            return res.status(200).json({message : 'Brand', status : 200,data: brand } as ResponseBody)
        }catch(error){
            return res.status(400).json({message: (error as MongoError).message }as ResponseBody)
        }
    },
    edit : async ( req: AuthRequest, res: Response, next: NextFunction) => { 
        const {id} = req.params
        const {name} = req.body
        const {error} = BrandSchema.validate(req.body)
        if(error)  return res.status(400).json({message : error.message} as ResponseBody);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Brand not found' });
          }
        try {
            const updatedBrand = await Brand.findByIdAndUpdate(id, {name}, {new:true})
            return res.status(200).json({message : 'Brand Updated successfully',
            status : 200,
            data: updatedBrand
            } as ResponseBody)
            
        }catch(error){
            return res.status(400).json({message: (error as MongoError).message }as ResponseBody)
        }
    }, 
    toggle : async ( req: AuthRequest, res: Response, next: NextFunction) => { 
        const {id} = req.params
        try{
            
            const brand  = await Brand.findById(id).orFail();
            brand.status = !brand.status
            await brand.save()
            res.status(200).json({message:`brand ${brand.status ? 'Activated': 'Deactivated'} successfully`})
           }catch(error) {
            return res.status(500).json({message:(error as MongoError).message})
        }
    }
    
}


export default brandController